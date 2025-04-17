'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Headphones, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Info,
  RotateCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Define the audio files
const AUDIO_FILES = {
  voice: '/assets/audio/spatial-audio/voice.mp3',
  music: '/assets/audio/spatial-audio/music.mp3',
  footsteps: '/assets/audio/spatial-audio/footstep-sound-effects.mp3',
  ambience: '/assets/audio/spatial-audio/cricket-ambience.mp3'
};

// Define audio source interface
interface AudioSource {
  id: keyof typeof AUDIO_FILES;
  label: string;
}

// Define position interface for 3D audio
interface Position {
  x: number;
  y: number;
  z: number;
}

const SpatialAudioDemo = () => {
  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSource, setCurrentSource] = useState<AudioSource['id']>('voice');
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [spatialIntensity, setSpatialIntensity] = useState(0.5);
  const [audioPosition, setAudioPosition] = useState<Position>({ x: 0, y: 0, z: -1 });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // UI state
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [isContextInitialized, setIsContextInitialized] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);

  // Audio refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const pannerNodeRef = useRef<PannerNode | null>(null);
  const movementIntervalRef = useRef<number | null>(null);

  // Audio sources
  const audioSources: AudioSource[] = [
    { id: 'voice', label: 'Voice' },
    { id: 'music', label: 'Music' },
    { id: 'footsteps', label: 'Footsteps' },
    { id: 'ambience', label: 'Ambience' }
  ];

  // Cleanup function for audio resources
  const cleanupAudio = () => {
    // Stop and disconnect any playing audio
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      } catch (e) {
        // Ignore errors if already stopped
      }
      sourceNodeRef.current = null;
    }

    // Clear any movement intervals
    if (movementIntervalRef.current) {
      window.clearInterval(movementIntervalRef.current);
      movementIntervalRef.current = null;
    }
  };

  // Initialize audio context on component mount
  useEffect(() => {
    return () => {
      cleanupAudio();
      // Close audio context when component unmounts
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Update gain when volume or mute state changes
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Update audio position when spatial intensity changes
  useEffect(() => {
    if (isPlaying) {
      updateAudioPosition();
    }
  }, [spatialIntensity, isPlaying]);

  // Initialize or resume audio context
  const initializeAudioContext = async () => {
    try {
      if (!audioContextRef.current) {
        // Create new audio context
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) {
          throw new Error("Web Audio API is not supported in this browser");
        }
        
        const context = new AudioContext();
        audioContextRef.current = context;
        
        // Create gain node for volume control
        const gainNode = context.createGain();
        gainNode.gain.value = isMuted ? 0 : volume;
        gainNode.connect(context.destination);
        gainNodeRef.current = gainNode;
        
        // Create panner node for spatial effects
        const pannerNode = context.createPanner();
        pannerNode.panningModel = 'HRTF'; // Use HRTF for realistic 3D audio
        pannerNode.distanceModel = 'inverse';
        pannerNode.refDistance = 1;
        pannerNode.maxDistance = 10000;
        pannerNode.rolloffFactor = 1;
        pannerNode.coneInnerAngle = 360;
        pannerNode.coneOuterAngle = 0;
        pannerNode.coneOuterGain = 0;
        
        // Set initial position
        pannerNode.setPosition(audioPosition.x, audioPosition.y, audioPosition.z);
        
        // Connect panner to gain node
        pannerNode.connect(gainNode);
        pannerNodeRef.current = pannerNode;
        
        setIsContextInitialized(true);
        
        // Force resume if context starts in suspended state
        if (context.state === 'suspended') {
          await context.resume();
        }
        
        setIsAudioReady(true);
        setErrorMessage(null);
        return true;
      } else if (audioContextRef.current.state === 'suspended') {
        // Resume suspended context
        await audioContextRef.current.resume();
        setIsAudioReady(true);
        return true;
      }
      
      return true;
    } catch (error) {
      console.error("Failed to initialize audio context:", error);
      setErrorMessage(`Audio initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false;
    }
  };

  // Load audio buffer from file
  const loadAudioBuffer = async (sourceId: AudioSource['id']) => {
    if (!audioContextRef.current) return null;
    
    try {
      setIsLoading(true);
      const response = await fetch(AUDIO_FILES[sourceId]);
      if (!response.ok) {
        throw new Error(`Failed to load audio file: ${response.status} ${response.statusText}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      return audioBuffer;
    } catch (error) {
      console.error("Error loading audio:", error);
      setErrorMessage(`Failed to load audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update audio position based on spatial intensity
  const updateAudioPosition = () => {
    if (!pannerNodeRef.current) return;
    
    // Generate a position based on the spatial intensity
    // Higher intensity = more movement and variation
    const angle = Math.random() * Math.PI * 2; // Random angle around the listener
    const distance = 1 + spatialIntensity * 3; // Distance increases with intensity
    
    // Convert from polar to cartesian coordinates
    const newPosition: Position = {
      x: Math.cos(angle) * distance,
      y: (Math.random() - 0.5) * spatialIntensity * 2, // Random height
      z: Math.sin(angle) * distance - 1, // Negative Z is in front of the listener
    };
    
    // Update panner node position
    pannerNodeRef.current.setPosition(newPosition.x, newPosition.y, newPosition.z);
    setAudioPosition(newPosition);
  };

  // Toggle audio playback
  const togglePlayback = async () => {
    if (isPlaying) {
      // Stop playback
      cleanupAudio();
      setIsPlaying(false);
      return;
    }
    
    // Initialize audio context if needed
    const contextReady = await initializeAudioContext();
    if (!contextReady || !audioContextRef.current) {
      return;
    }
    
    try {
      // Load audio if not already loaded or if source changed
      if (!audioBufferRef.current) {
        const buffer = await loadAudioBuffer(currentSource);
        if (!buffer) return;
        audioBufferRef.current = buffer;
      }
      
      // Create source node
      const sourceNode = audioContextRef.current.createBufferSource();
      sourceNode.buffer = audioBufferRef.current;
      sourceNode.loop = true;
      
      // Connect source to panner (or gain if panner not available)
      if (pannerNodeRef.current) {
        sourceNode.connect(pannerNodeRef.current);
      } else if (gainNodeRef.current) {
        sourceNode.connect(gainNodeRef.current);
      }
      
      // Start playback
      sourceNode.start();
      sourceNodeRef.current = sourceNode;
      setIsPlaying(true);
      
      // Set up movement interval if spatial intensity is high enough
      if (spatialIntensity > 0.1) {
        updateAudioPosition(); // Initial position
        // Update position every 3 seconds
        movementIntervalRef.current = window.setInterval(() => {
          updateAudioPosition();
        }, 3000);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setErrorMessage(`Playback error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsPlaying(false);
    }
  };

  // Change audio source
  const changeAudioSource = async (sourceId: AudioSource['id']) => {
    if (sourceId === currentSource) return;
    
    const wasPlaying = isPlaying;
    
    // Stop current playback
    cleanupAudio();
    setIsPlaying(false);
    
    // Clear buffer to force reload
    audioBufferRef.current = null;
    
    // Update source
    setCurrentSource(sourceId);
    
    // If was playing, restart with new source
    if (wasPlaying) {
      // Pre-load the buffer
      if (await initializeAudioContext()) {
        const buffer = await loadAudioBuffer(sourceId);
        if (buffer) {
          audioBufferRef.current = buffer;
          // Resume playback after a brief delay
          setTimeout(() => togglePlayback(), 100);
        }
      }
    }
  };

  // Toggle mute state
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Render the component
  return (
    <div className="w-full py-16 bg-black relative">
      {/* Background gradients & effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-green-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-10 left-1/4 w-40 h-40 bg-green-500/10 rounded-full blur-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-500/10 px-4 py-2 rounded-full mb-4 border border-green-500/30">
            <span className="text-green-400 text-sm font-medium">3D Sound Experience</span>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Spatial Audio</span>
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto">
            Put on your headphones and immerse yourself in our spatial audio technology.
            Hear the difference as sound moves naturally around you in three-dimensional space.
          </p>
        </div>
        
        {/* Main audio player */}
        <div className="max-w-4xl mx-auto">
          {/* Glowing effect wrapper */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-lg"></div>
            
            {/* Player container */}
            <div className="relative bg-black backdrop-blur-xl rounded-xl border border-white/10 shadow-xl overflow-hidden">
              {/* Header bar */}
              <div className="bg-gradient-to-r from-green-900/80 via-emerald-900/80 to-green-900/80 p-6 border-b border-white/10">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                        <Headphones className="text-white" />
                      </div>
                      
                      {isPlaying && (
                        <div className="absolute inset-0 rounded-full animate-ping border-2 border-green-400 opacity-75"></div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white">Spatial Audio Demo</h3>
                      <p className="text-green-300 text-sm">Best experienced with headphones</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label={isMuted ? "Unmute" : "Mute"}>
                      {isMuted ? <VolumeX className="text-white" /> : <Volume2 className="text-white" />}
                    </button>
                    
                    <div className="w-24 sm:w-32 bg-white/5 rounded-full p-1">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-full accent-green-500 h-1 rounded-full appearance-none cursor-pointer"
                        aria-label="Volume"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left column: Control panel */}
                  <div>
                    <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
                      <h4 className="text-white font-medium mb-4">Select Audio Source</h4>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {audioSources.map((source) => (
                          <button
                            key={source.id}
                            onClick={() => changeAudioSource(source.id)}
                            disabled={isLoading}
                            className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                              currentSource === source.id
                                ? 'bg-green-500 text-white'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            {source.label}
                          </button>
                        ))}
                      </div>
                      
                      <h4 className="text-white font-medium mb-4">Spatial Intensity</h4>
                      
                      <div className="relative mb-2">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={spatialIntensity}
                          onChange={(e) => setSpatialIntensity(parseFloat(e.target.value))}
                          className="w-full accent-green-500 h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-green-700/50 to-green-500"
                          aria-label="Spatial Intensity"
                        />
                        
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>Subtle</span>
                          <span>Intense</span>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button
                          onClick={togglePlayback}
                          disabled={isLoading}
                          className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                            isPlaying
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                              : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:brightness-110'
                          }`}
                        >
                          {isLoading ? (
                            <>
                              <RotateCw className="animate-spin" />
                              Loading...
                            </>
                          ) : isPlaying ? (
                            <>
                              <Pause />
                              Stop Playback
                            </>
                          ) : (
                            <>
                              <Play />
                              Start Spatial Audio
                            </>
                          )}
                        </button>
                      </div>
                      
                      {/* Error message display */}
                      {errorMessage && (
                        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                          {errorMessage}
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                          <Info className="text-green-400" />
                        </div>
                        <p className="text-sm text-gray-300">
                          Our spatial audio technology creates an immersive 3D sound field using custom HRTF models.
                          Move the intensity slider to experience different levels of spatial positioning.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right column: Visualization */}
                  <div>
                    <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full relative">
                      <h4 className="text-white font-medium mb-4">Spatial Audio Visualization</h4>
                      
                      <div className="relative h-64 rounded-lg bg-black/70 border border-white/5 overflow-hidden">
                        {/* Reference grid lines */}
                        <div className="absolute inset-0">
                          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10"></div>
                          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/10"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white/10"></div>
                        </div>
                        
                        {/* Listener position (center) */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center">
                            <Headphones className="text-white" />
                          </div>
                          
                          {/* Ripple effect around listener */}
                          {isPlaying && (
                            <>
                              <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" style={{ animationDuration: '3s' }}></div>
                              <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
                            </>
                          )}
                        </div>
                        
                        {/* Sound source position indicator */}
                        {isPlaying && (
                          <div 
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                              marginLeft: `${audioPosition.x * 40}%`,
                              marginTop: `${audioPosition.y * 40}%`,
                              zIndex: audioPosition.z > 0 ? 0 : 10,
                              transition: 'margin 1s ease-out'
                            }}
                          >
                            <div 
                              className={`w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30 ${
                                audioPosition.z < 0 ? 'opacity-100' : 'opacity-50'
                              }`} 
                              style={{
                                transform: `scale(${1 - Math.min(0.5, Math.abs(audioPosition.z) / 10)})`,
                                transition: 'transform 0.5s ease-out, opacity 0.5s ease-out'
                              }}
                            >
                              <Volume2 className="text-white" />
                            </div>
                            
                            {/* Sound waves */}
                            <div className="absolute inset-0 rounded-full border-2 border-green-400/60 animate-ping"></div>
                          </div>
                        )}
                        
                        {/* Movement indicator */}
                        {isPlaying && spatialIntensity > 0.1 && (
                          <div className="absolute bottom-2 right-2 bg-black/70 text-xs text-green-400 px-2 py-1 rounded-full flex items-center">
                            <RotateCw className="mr-1 animate-spin" style={{ animationDuration: '3s' }} />
                            Moving
                          </div>
                        )}
                        
                        {/* Not playing message */}
                        {!isPlaying && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-gray-400 bg-black/50 px-4 py-2 rounded-lg">
                              Press play to start the spatial audio demo
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {/* Z-axis indicator (depth) */}
                      {isPlaying && (
                        <div className="mt-6">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-400">Behind You</span>
                            <span className="text-xs text-gray-400">In Front</span>
                          </div>
                          <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-700 to-green-500 rounded-full transition-all duration-1000"
                              style={{
                                width: '100%',
                                transformOrigin: audioPosition.z < 0 ? 'right' : 'left',
                                transform: `scaleX(${
                                  audioPosition.z < 0
                                    ? Math.min(1, Math.abs(audioPosition.z) / 3)
                                    : Math.min(1, audioPosition.z / 3)
                                })`,
                                marginLeft: audioPosition.z < 0 ? '0%' : '50%',
                                marginRight: audioPosition.z < 0 ? '50%' : '0%',
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommendation for headphones */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center bg-green-500/20 px-5 py-3 rounded-full border border-green-500/30">
              <Headphones className="text-green-400 mr-2" />
              <span className="text-green-300 text-sm">For the best experience, use headphones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpatialAudioDemo;