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
  Music,
  Mic,
  Footprints,
  Wind,
  Sliders,
  Check,
  Share2,
  LayoutGrid,
  User,
  Settings,
  BadgeInfo,
  Download,
  ChevronDown,
  Lock,
  Crown
} from 'lucide-react';

// Define the audio files
const AUDIO_FILES = {
  voice: '/assets/audio/spatial-audio/voice.mp3',
  music: '/assets/audio/spatial-audio/music.mp3',
  footsteps: '/assets/audio/spatial-audio/footstep-sound-effects.mp3',
  ambience: '/assets/audio/spatial-audio/cricket-ambience.mp3'
};

// Define audio format types
const AUDIO_FORMATS = {
  STEREO: 'stereo',
  BINAURAL: 'binaural',
  DOLBY_ATMOS: 'dolby-atmos',
  SPATIAL: 'spatial'
};

// Define audio source interface
interface AudioSource {
  id: string;
  label: string;
  icon: React.ReactNode;
  file: string;
  position: Position;
  isPlaying: boolean;
  volume: number;
  color: string;
  format: string;
}

// Define position interface for 3D audio
interface Position {
  x: number; // Left (-1) to right (1)
  y: number; // Top (-1) to bottom (1)
  z: number; // Behind (1) to front (-1)
}

// Interface for head orientation
interface HeadOrientation {
  alpha: number; // Z-axis rotation (yaw) - 0 to 360 degrees
  beta: number;  // X-axis rotation (pitch) - -180 to 180 degrees
  gamma: number; // Y-axis rotation (roll) - -90 to 90 degrees
}

// Define preset scenes
const PRESET_SCENES = [
  { 
    id: "conference", 
    label: "Conference Call", 
    description: "Perfect for video meetings with speakers positioned naturally" 
  },
  { 
    id: "gaming", 
    label: "Gaming", 
    description: "Immersive sound positioning for competitive advantage" 
  },
  { 
    id: "cinema", 
    label: "Cinema", 
    description: "Recreate the movie theater experience with surround sound" 
  },
  { 
    id: "music", 
    label: "Music Studio", 
    description: "Experience music as if you were in the recording studio" 
  }
];

const SpatialAudioDemo = () => {
  // Audio context and nodes
  const audioContextRef = useRef<AudioContext | null>(null);
  const listenerRef = useRef<AudioListener | null>(null);
  
  // Track all audio sources and their nodes
  const [audioSources, setAudioSources] = useState<AudioSource[]>([
    { 
      id: 'voice', 
      label: 'Voice', 
      icon: <Mic size={18} />, 
      file: AUDIO_FILES.voice, 
      position: { x: -0.5, y: -0.3, z: -0.7 }, 
      isPlaying: false,
      volume: 0.7,
      color: 'from-blue-400 to-blue-600',
      format: AUDIO_FORMATS.SPATIAL
    },
    { 
      id: 'music', 
      label: 'Music', 
      icon: <Music size={18} />, 
      file: AUDIO_FILES.music, 
      position: { x: 0.7, y: 0.2, z: -0.5 }, 
      isPlaying: false,
      volume: 0.7,
      color: 'from-green-400 to-green-600',
      format: AUDIO_FORMATS.DOLBY_ATMOS
    },
    { 
      id: 'footsteps', 
      label: 'Footsteps', 
      icon: <Footprints size={18} />, 
      file: AUDIO_FILES.footsteps, 
      position: { x: 0.4, y: 0.6, z: 0.2 }, 
      isPlaying: false,
      volume: 0.7,
      color: 'from-amber-400 to-amber-600',
      format: AUDIO_FORMATS.BINAURAL
    },
    { 
      id: 'ambience', 
      label: 'Ambience', 
      icon: <Wind size={18} />, 
      file: AUDIO_FILES.ambience, 
      position: { x: -0.6, y: 0.5, z: 0.4 }, 
      isPlaying: false,
      volume: 0.7,
      color: 'from-purple-400 to-purple-600',
      format: AUDIO_FORMATS.SPATIAL
    }
  ]);
  
  // UI state
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [masterVolume, setMasterVolume] = useState(0.7);
  const [isMasterMuted, setIsMasterMuted] = useState(false);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const [activeTab, setActiveTab] = useState('visualizer');
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'topdown'
  const [isHeadTracking, setIsHeadTracking] = useState(false);
  const [headOrientation, setHeadOrientation] = useState<HeadOrientation>({ alpha: 0, beta: 0, gamma: 0 });
  const [activeFormat, setActiveFormat] = useState<string>(AUDIO_FORMATS.SPATIAL);
  const [isPremiumEnabled, setIsPremiumEnabled] = useState(true); // Toggle for demo purposes
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [isPresetPopupOpen, setIsPresetPopupOpen] = useState(false);
  const [roomSize, setRoomSize] = useState(0.5); // 0 to 1
  const [reverbLevel, setReverbLevel] = useState(0.3); // 0 to 1
  
  // Refs for source nodes and audio buffers
  const sourceNodesRef = useRef<Record<string, AudioBufferSourceNode | null>>({});
  const pannerNodesRef = useRef<Record<string, PannerNode | null>>({});
  const gainNodesRef = useRef<Record<string, GainNode | null>>({});
  const audioBuffersRef = useRef<Record<string, AudioBuffer | null>>({});
  const masterGainNodeRef = useRef<GainNode | null>(null);
  const convolverNodeRef = useRef<ConvolverNode | null>(null);
  const analyserNodesRef = useRef<Record<string, AnalyserNode | null>>({});
  const visualizerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Refs for the visualization container
  const visualizationRef = useRef<HTMLDivElement | null>(null);
  const presetPopupRef = useRef<HTMLDivElement | null>(null);
  
  // Initialize audio context
  useEffect(() => {
    const initContext = async () => {
      try {
        if (!audioContextRef.current) {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          if (!AudioContext) {
            throw new Error("Web Audio API is not supported in this browser");
          }
          
          const context = new AudioContext({ sampleRate: 44100 }); // Explicitly set sample rate
          audioContextRef.current = context;
          
          // Create master gain node
          const masterGain = context.createGain();
          masterGain.gain.value = isMasterMuted ? 0 : masterVolume;
          masterGain.connect(context.destination);
          masterGainNodeRef.current = masterGain;
          
          // Create convolver node for room acoustics
          const convolver = context.createConvolver();
          await loadImpulseResponse(convolver, roomSize);
          convolver.connect(masterGain);
          convolverNodeRef.current = convolver;
          
          // Set up listener
          listenerRef.current = context.listener;
          
          // Position listener at the center with improved orientation
          if (listenerRef.current.positionX) {
            // Modern API
            listenerRef.current.positionX.value = 0;
            listenerRef.current.positionY.value = 0;
            listenerRef.current.positionZ.value = 0;
            
            // Facing "forward" along the z-axis
            listenerRef.current.forwardX.value = 0;
            listenerRef.current.forwardY.value = 0;
            listenerRef.current.forwardZ.value = -1; // Negative Z is forward
            
            // "Up" is along the y-axis
            listenerRef.current.upX.value = 0;
            listenerRef.current.upY.value = 1;
            listenerRef.current.upZ.value = 0;
          } else {
            // Legacy API
            listenerRef.current.setPosition(0, 0, 0);
            listenerRef.current.setOrientation(0, 0, -1, 0, 1, 0);
          }
          
          // Resume suspended context (needed for autoplay policy)
          if (context.state === 'suspended') {
            await context.resume();
          }
          
          setIsAudioInitialized(true);
        }
      } catch (error) {
        console.error("Failed to initialize audio context:", error);
        setErrorMessage(`Audio initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };
    
    initContext();
    
    // Cleanup function
    return () => {
      // Stop all audio sources
      Object.values(sourceNodesRef.current).forEach(sourceNode => {
        if (sourceNode) {
          try {
            sourceNode.stop();
            sourceNode.disconnect();
          } catch (e) {
            // Ignore errors if already stopped
          }
        }
      });
      
      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Close audio context
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [masterVolume, isMasterMuted]);
  
  // Load impulse response for reverb
  const loadImpulseResponse = async (convolverNode: ConvolverNode, size: number) => {
    try {
      // In a real implementation, you would load different impulse responses based on room size
      // For this demo, we'll generate a better impulse response
      if (!audioContextRef.current) return;
      
      const sampleRate = audioContextRef.current.sampleRate;
      const length = Math.floor(sampleRate * (0.3 + size * 3.5)); // 0.3s to 3.8s based on size
      const impulseResponse = audioContextRef.current.createBuffer(2, length, sampleRate);
      
      for (let channel = 0; channel < 2; channel++) {
        const channelData = impulseResponse.getChannelData(channel);
        
        // Fill with improved early reflections and decay tail
        for (let i = 0; i < length; i++) {
          // Early reflections (first 50ms)
          if (i < sampleRate * 0.05) {
            // Sparse early reflections
            if (i % Math.floor(sampleRate * 0.01) < 5) {
              channelData[i] = (Math.random() * 0.75 - 0.25) * Math.pow(0.98, i);
            }
          } else {
            // Decay tail - exponential decay with some randomness
            const decay = Math.exp(-i / (sampleRate * (0.1 + size * 2)));
            channelData[i] = (Math.random() * 2 - 1) * decay * 0.5;
          }
        }
        
        // Slight coloration for more natural sound (low pass filter approximation)
        for (let i = 2; i < length - 2; i++) {
          channelData[i] = (channelData[i-2] + channelData[i-1] + channelData[i] + channelData[i+1] + channelData[i+2]) / 5;
        }
      }
      
      convolverNode.buffer = impulseResponse;
    } catch (error) {
      console.error("Error generating impulse response:", error);
    }
  };
  
  // Update room acoustics when parameters change
  useEffect(() => {
    if (convolverNodeRef.current && audioContextRef.current) {
      loadImpulseResponse(convolverNodeRef.current, roomSize);
    }
  }, [roomSize]);
  
  // Handle head tracking
  useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (!isHeadTracking) return;
      
      // Read device orientation
      const alpha = event.alpha || 0;
      const beta = event.beta || 0;
      const gamma = event.gamma || 0;
      
      setHeadOrientation({ alpha, beta, gamma });
      
      // Update audio listener orientation
      if (listenerRef.current && audioContextRef.current) {
        // Convert degrees to radians
        const alphaRad = (alpha * Math.PI) / 180;
        const betaRad = (beta * Math.PI) / 180;
        const gammaRad = (gamma * Math.PI) / 180;
        
        // Calculate orientation vectors
        // This is a simplified conversion - a full implementation would use quaternions
        const forward = {
          x: Math.sin(alphaRad) * Math.cos(betaRad),
          y: Math.sin(betaRad),
          z: -Math.cos(alphaRad) * Math.cos(betaRad)
        };
        
        const up = {
          x: Math.sin(alphaRad + Math.PI/2) * Math.sin(betaRad),
          y: Math.cos(betaRad),
          z: -Math.cos(alphaRad + Math.PI/2) * Math.sin(betaRad)
        };
        
        // Apply to listener
        if (listenerRef.current.forwardX) {
          // Modern API
          listenerRef.current.forwardX.value = forward.x;
          listenerRef.current.forwardY.value = forward.y;
          listenerRef.current.forwardZ.value = forward.z;
          listenerRef.current.upX.value = up.x;
          listenerRef.current.upY.value = up.y;
          listenerRef.current.upZ.value = up.z;
        } else {
          // Legacy API
          listenerRef.current.setOrientation(
            forward.x, forward.y, forward.z,
            up.x, up.y, up.z
          );
        }
      }
    };
    
    // Request permission for device orientation (for iOS 13+)
    const requestPermission = async () => {
      if (isHeadTracking && typeof DeviceOrientationEvent !== 'undefined' && 
          typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permissionState = await (DeviceOrientationEvent as any).requestPermission();
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
          } else {
            setIsHeadTracking(false);
            setErrorMessage("Permission for head tracking was denied");
          }
        } catch (error) {
          console.error("Error requesting device orientation permission:", error);
          setIsHeadTracking(false);
          setErrorMessage("Could not request head tracking permission");
        }
      } else if (isHeadTracking) {
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
    
    if (isHeadTracking) {
      requestPermission();
    } else {
      // Reset listener orientation
      if (listenerRef.current) {
        if (listenerRef.current.forwardX) {
          listenerRef.current.forwardX.value = 0;
          listenerRef.current.forwardY.value = 0;
          listenerRef.current.forwardZ.value = -1;
          listenerRef.current.upX.value = 0;
          listenerRef.current.upY.value = 1;
          listenerRef.current.upZ.value = 0;
        } else {
          listenerRef.current.setOrientation(0, 0, -1, 0, 1, 0);
        }
      }
    }
    
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [isHeadTracking]);
  
  // Canvas visualization
  useEffect(() => {
    if (!visualizerCanvasRef.current || !audioContextRef.current) return;
    
    const canvas = visualizerCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ensure canvas dimensions match its display size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Draw function
    const draw = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Reference dimensions
      const centerX = canvas.width / (2 * (window.devicePixelRatio || 1));
      const centerY = canvas.height / (2 * (window.devicePixelRatio || 1));
      const radius = Math.min(centerX, centerY) * 0.8;
      
      // Draw background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      
      // Draw circular grid
      for (let r = 0.25; r <= 1; r += 0.25) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * r, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Draw cross grid
      ctx.beginPath();
      ctx.moveTo(centerX - radius, centerY);
      ctx.lineTo(centerX + radius, centerY);
      ctx.moveTo(centerX, centerY - radius);
      ctx.lineTo(centerX, centerY + radius);
      ctx.stroke();
      
      // Draw listener position
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw orientation direction
      if (isHeadTracking && headOrientation) {
        // Convert from degrees to radians and calculate direction
        const alphaRad = (headOrientation.alpha * Math.PI) / 180;
        const dirX = centerX + Math.sin(alphaRad) * 30;
        const dirY = centerY - Math.cos(alphaRad) * 30;
        
        // Draw line for direction
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(dirX, dirY);
        ctx.stroke();
        
        // Draw a small circle at the end of the line
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(dirX, dirY, 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Default forward direction
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX, centerY - 20);
        ctx.stroke();
        
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(centerX, centerY - 20, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw sound sources
      audioSources.forEach(source => {
        // For 3D view, we need to calculate positions based on the view
        const scaleZ = viewMode === '3d' ? 1 - Math.min(0.5, Math.abs(source.position.z) / 2) : 1;
        const opacity = viewMode === '3d' ? (source.position.z < 0 ? 1 : 0.5) : 1;
        
        // Position in canvas
        const posX = centerX + source.position.x * radius;
        const posY = centerY + source.position.y * radius;
        
        // Draw frequency data if available and playing
        if (source.isPlaying && analyserNodesRef.current[source.id]) {
          const analyser = analyserNodesRef.current[source.id]!;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          analyser.getByteFrequencyData(dataArray);
          
          // Draw frequency rings
          const maxRadius = 30 * scaleZ;
          
          // Get average level for simple visualization
          let sum = 0;
          for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
          }
          const average = sum / bufferLength;
          const normLevel = average / 255; // 0 to 1
          
          // Draw wave circle
          const waveRadius = 10 + maxRadius * normLevel;
          
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.4})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(posX, posY, waveRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        // Get the color stops from the gradient string
        const colorMatch = source.color.match(/from-(.*?)-\d+ to-(.*?)-\d+/);
        let colorName = 'green';
        if (colorMatch && colorMatch.length >= 3) {
          colorName = colorMatch[1]; // Use the first color
        }
        
        // Draw source circle
        ctx.fillStyle = getComputedColor(colorName, opacity);
        ctx.beginPath();
        ctx.arc(posX, posY, 15 * scaleZ, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a data attribute to make the source clickable
        canvas.setAttribute(`data-source-${source.id}-x`, posX.toString());
        canvas.setAttribute(`data-source-${source.id}-y`, posY.toString());
        canvas.setAttribute(`data-source-${source.id}-radius`, (15 * scaleZ).toString());
        
        // Draw source label
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.font = `${12 * scaleZ}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(source.label, posX, posY + 25 * scaleZ);
        
        // Draw playing indicator
        if (source.isPlaying) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.7})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.arc(posX, posY, 20 * scaleZ, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }
        
        // Draw selection indicator if selected
        if (selectedSource === source.id) {
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(posX, posY, 23 * scaleZ, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
      
      // Request next frame
      animationFrameRef.current = requestAnimationFrame(draw);
    };
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(draw);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [audioSources, viewMode, isHeadTracking, headOrientation, selectedSource]);
  
  // Get computed color for canvas
  const getComputedColor = (name: string, opacity: number = 1) => {
    const colorMap: Record<string, string> = {
      'blue': `rgba(96, 165, 250, ${opacity})`,
      'green': `rgba(34, 197, 94, ${opacity})`,
      'amber': `rgba(245, 158, 11, ${opacity})`,
      'purple': `rgba(168, 85, 247, ${opacity})`,
      'red': `rgba(239, 68, 68, ${opacity})`,
    };
    
    return colorMap[name] || colorMap.green;
  };
  
  // Load audio buffer for a source
  const loadAudioBuffer = async (sourceId: string): Promise<AudioBuffer | null> => {
    if (!audioContextRef.current) return null;
    
    try {
      setIsLoading(prev => ({ ...prev, [sourceId]: true }));
      
      // Find the source
      const source = audioSources.find(s => s.id === sourceId);
      if (!source) {
        throw new Error(`Source ${sourceId} not found`);
      }
      
      // Check if we already have the buffer
      if (audioBuffersRef.current[sourceId]) {
        return audioBuffersRef.current[sourceId];
      }
      
      // Load and decode the audio file
      const response = await fetch(source.file);
      if (!response.ok) {
        throw new Error(`Failed to load audio file: ${response.status} ${response.statusText}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      
      // Store the buffer for reuse
      audioBuffersRef.current[sourceId] = audioBuffer;
      
      return audioBuffer;
    } catch (error) {
      console.error(`Error loading audio for ${sourceId}:`, error);
      setErrorMessage(`Failed to load ${sourceId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return null;
    } finally {
      setIsLoading(prev => ({ ...prev, [sourceId]: false }));
    }
  };
  
  // Set up panner node for spatial audio
  const setupPannerNode = (sourceId: string, position: Position): PannerNode | null => {
    if (!audioContextRef.current || !masterGainNodeRef.current) return null;
    
    try {
      // Create panner node
      const pannerNode = audioContextRef.current.createPanner();
      
      // Configure for 3D audio - enhanced spatial settings
      pannerNode.panningModel = 'HRTF'; // Head-related transfer function for realistic 3D
      pannerNode.distanceModel = 'inverse';
      pannerNode.refDistance = 1;
      pannerNode.maxDistance = 10000;
      pannerNode.rolloffFactor = 1.5; // Increased for more noticeable effect
      pannerNode.coneInnerAngle = 360;
      pannerNode.coneOuterAngle = 0;
      pannerNode.coneOuterGain = 0;
      
      // Set position
      updatePannerPosition(pannerNode, position);
      
      // Create gain node for this source if it doesn't exist
      if (!gainNodesRef.current[sourceId]) {
        // Find the source for its volume
        const source = audioSources.find(s => s.id === sourceId);
        const volume = source ? source.volume : 0.7;
        
        const gainNode = audioContextRef.current.createGain();
        gainNode.gain.value = volume;
        
        // Create analyzer for visualizations
        const analyser = audioContextRef.current.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.7;
        
        // Connect panner to gain node and analyser
        analyserNodesRef.current[sourceId] = analyser;
        
        // Connect to either convolver (for reverb) or directly to master gain
        if (convolverNodeRef.current && reverbLevel > 0) {
          // Split the signal for dry/wet mix
          const dryGain = audioContextRef.current.createGain();
          dryGain.gain.value = 1 - reverbLevel;
          dryGain.connect(masterGainNodeRef.current);
          
          const wetGain = audioContextRef.current.createGain();
          wetGain.gain.value = reverbLevel;
          wetGain.connect(convolverNodeRef.current);
          
          gainNode.connect(dryGain);
          gainNode.connect(wetGain);
        } else {
          gainNode.connect(masterGainNodeRef.current);
        }
        
        gainNode.connect(analyser);
        gainNodesRef.current[sourceId] = gainNode;
      }
      
      // Connect to appropriate node
      pannerNode.connect(gainNodesRef.current[sourceId]!);
      
      // Store the panner node
      pannerNodesRef.current[sourceId] = pannerNode;
      
      return pannerNode;
    } catch (error) {
      console.error(`Error setting up panner for ${sourceId}:`, error);
      return null;
    }
  };
  
  // Update panner position
  const updatePannerPosition = (panner: PannerNode, position: Position) => {
    if (panner.positionX) {
      // Modern API
      panner.positionX.value = position.x;
      panner.positionY.value = position.y;
      panner.positionZ.value = position.z;
    } else {
      // Legacy API
      panner.setPosition(position.x, position.y, position.z);
    }
  };
  
  // Toggle playback for a source
  const togglePlayback = async (sourceId: string) => {
    // Get the source
    const sourceIndex = audioSources.findIndex(s => s.id === sourceId);
    if (sourceIndex === -1) return;
    
    const source = audioSources[sourceIndex];
    
    // If already playing, stop it
    if (source.isPlaying) {
      if (sourceNodesRef.current[sourceId]) {
        try {
          sourceNodesRef.current[sourceId]?.stop();
          sourceNodesRef.current[sourceId]?.disconnect();
        } catch (e) {
          // Ignore errors if already stopped
        }
        sourceNodesRef.current[sourceId] = null;
      }
      
      // Update state
      const updatedSources = [...audioSources];
      updatedSources[sourceIndex] = { ...source, isPlaying: false };
      setAudioSources(updatedSources);
      
      return;
    }
    
    // Start playback
    try {
      // Initialize audio context if needed
      if (!audioContextRef.current) {
        try {
          // Create audio context
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          if (!AudioContext) {
            throw new Error("Web Audio API is not supported in this browser");
          }
          
          const context = new AudioContext({ sampleRate: 44100 });
          audioContextRef.current = context;
          
          // Create master gain node
          const masterGain = context.createGain();
          masterGain.gain.value = isMasterMuted ? 0 : masterVolume;
          masterGain.connect(context.destination);
          masterGainNodeRef.current = masterGain;
          
          // Create convolver node for room acoustics
          const convolver = context.createConvolver();
          await loadImpulseResponse(convolver, roomSize);
          convolver.connect(masterGain);
          convolverNodeRef.current = convolver;
          
          // Set up listener
          listenerRef.current = context.listener;
          
          // Position listener at the center with improved orientation
          if (listenerRef.current.positionX) {
            // Modern API
            listenerRef.current.positionX.value = 0;
            listenerRef.current.positionY.value = 0;
            listenerRef.current.positionZ.value = 0;
            
            // Facing "forward" along the z-axis
            listenerRef.current.forwardX.value = 0;
            listenerRef.current.forwardY.value = 0;
            listenerRef.current.forwardZ.value = -1; // Negative Z is forward
            
            // "Up" is along the y-axis
            listenerRef.current.upX.value = 0;
            listenerRef.current.upY.value = 1;
            listenerRef.current.upZ.value = 0;
          } else {
            // Legacy API
            listenerRef.current.setPosition(0, 0, 0);
            listenerRef.current.setOrientation(0, 0, -1, 0, 1, 0);
          }
          
          // Resume suspended context (needed for autoplay policy)
          if (context.state === 'suspended') {
            await context.resume();
          }
          
          setIsAudioInitialized(true);
        } catch (error) {
          console.error("Failed to initialize audio context:", error);
          setErrorMessage(`Audio initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
          return;
        }
      }
      
      // Ensure audio context is running
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      // Load audio buffer if not already loaded
      const buffer = await loadAudioBuffer(sourceId);
      if (!buffer) return;
      
      // Set up panner if not already set up
      if (!pannerNodesRef.current[sourceId]) {
        setupPannerNode(sourceId, source.position);
      }
      
      // Create source node
      const sourceNode = audioContextRef.current.createBufferSource();
      sourceNode.buffer = buffer;
      sourceNode.loop = true;
      
      // Connect source to panner
      if (pannerNodesRef.current[sourceId]) {
        sourceNode.connect(pannerNodesRef.current[sourceId]!);
      } else {
        // Fallback: connect directly to gain node if panner setup failed
        if (gainNodesRef.current[sourceId]) {
          sourceNode.connect(gainNodesRef.current[sourceId]!);
        } else {
          // If no gain node exists either, connect directly to master
          sourceNode.connect(masterGainNodeRef.current!);
        }
      }
      
      // Start playback
      sourceNode.start();
      sourceNodesRef.current[sourceId] = sourceNode;
      
      // Update state
      const updatedSources = [...audioSources];
      updatedSources[sourceIndex] = { ...source, isPlaying: true };
      setAudioSources(updatedSources);
      
      // Select the source if none is selected
      if (selectedSource === null) {
        setSelectedSource(sourceId);
      }
      
    } catch (error) {
      console.error(`Error playing audio for ${sourceId}:`, error);
      setErrorMessage(`Playback error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };
  
  // Update source volume
  const updateSourceVolume = (sourceId: string, volume: number) => {
    // Update the gain node
    if (gainNodesRef.current[sourceId]) {
      gainNodesRef.current[sourceId]!.gain.value = volume;
    }
    
    // Update state
    const sourceIndex = audioSources.findIndex(s => s.id === sourceId);
    if (sourceIndex !== -1) {
      const updatedSources = [...audioSources];
      updatedSources[sourceIndex] = { ...updatedSources[sourceIndex], volume };
      setAudioSources(updatedSources);
    }
  };
  
  // Toggle master mute
  const toggleMasterMute = () => {
    setIsMasterMuted(!isMasterMuted);
  };
  
  // Stop all sources
  const stopAllSources = () => {
    // Stop all source nodes
    Object.entries(sourceNodesRef.current).forEach(([id, sourceNode]) => {
      if (sourceNode) {
        try {
          sourceNode.stop();
          sourceNode.disconnect();
        } catch (e) {
          // Ignore errors if already stopped
        }
        sourceNodesRef.current[id] = null;
      }
    });
    
    // Update state
    const updatedSources = audioSources.map(source => ({
      ...source,
      isPlaying: false
    }));
    setAudioSources(updatedSources);
  };
  
  // Play all sources
  const playAllSources = async () => {
    // Play each source that isn't already playing
    for (const source of audioSources) {
      if (!source.isPlaying) {
        await togglePlayback(source.id);
      }
    }
  };
  
  // Handle mouse down on a sound source (start drag)
  const handleMouseDown = (event: React.MouseEvent, sourceId: string) => {
    event.preventDefault();
    setIsDragging(sourceId);
    setSelectedSource(sourceId);
  };
  
  // Handle mouse move (drag)
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || !visualizationRef.current) return;
    
    // Get the source
    const sourceIndex = audioSources.findIndex(s => s.id === isDragging);
    if (sourceIndex === -1) return;
    
    // Calculate position based on mouse coordinates
    const rect = visualizationRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate normalized position (-1 to 1)
    const x = ((event.clientX - rect.left) - centerX) / centerX;
    const y = ((event.clientY - rect.top) - centerY) / centerY;
    
    // Clamp values to stay within bounds
    const clampedX = Math.max(-1, Math.min(1, x));
    const clampedY = Math.max(-1, Math.min(1, y));
    
    // Keep z coordinate the same
    const z = audioSources[sourceIndex].position.z;
    
    // Update panner position
    if (pannerNodesRef.current[isDragging]) {
      updatePannerPosition(pannerNodesRef.current[isDragging]!, { x: clampedX, y: clampedY, z });
    }
    
    // Update state
    const updatedSources = [...audioSources];
    updatedSources[sourceIndex] = { 
      ...updatedSources[sourceIndex], 
      position: { x: clampedX, y: clampedY, z } 
    };
    setAudioSources(updatedSources);
  };
  
  // Handle mouse up (end drag)
  const handleMouseUp = () => {
    setIsDragging(null);
  };
  
  // Handle adjusting the Z position (depth)
  const adjustZPosition = (sourceId: string, z: number) => {
    // Get the source
    const sourceIndex = audioSources.findIndex(s => s.id === sourceId);
    if (sourceIndex === -1) return;
    
    // Clamp Z value
    const clampedZ = Math.max(-1, Math.min(1, z));
    
    // Update panner
    if (pannerNodesRef.current[sourceId]) {
      const { x, y } = audioSources[sourceIndex].position;
      updatePannerPosition(pannerNodesRef.current[sourceId]!, { x, y, z: clampedZ });
    }
    
    // Update state
    const updatedSources = [...audioSources];
    updatedSources[sourceIndex] = {
      ...updatedSources[sourceIndex],
      position: {
        ...updatedSources[sourceIndex].position,
        z: clampedZ
      }
    };
    setAudioSources(updatedSources);
  };
  
  // Change audio format for a source
  const changeAudioFormat = (sourceId: string, format: string) => {
    if (!isPremiumEnabled && (format === AUDIO_FORMATS.DOLBY_ATMOS || format === AUDIO_FORMATS.SPATIAL)) {
      setErrorMessage("Premium format requires Pro subscription");
      return;
    }
    
    // Get the source
    const sourceIndex = audioSources.findIndex(s => s.id === sourceId);
    if (sourceIndex === -1) return;
    
    // Update state with new format
    const updatedSources = [...audioSources];
    updatedSources[sourceIndex] = {
      ...updatedSources[sourceIndex],
      format
    };
    setAudioSources(updatedSources);
    
    // Restart playback if currently playing to apply format
    const isPlaying = updatedSources[sourceIndex].isPlaying;
    if (isPlaying) {
      // Stop
      if (sourceNodesRef.current[sourceId]) {
        try {
          sourceNodesRef.current[sourceId]?.stop();
          sourceNodesRef.current[sourceId]?.disconnect();
        } catch (e) {
          // Ignore errors if already stopped
        }
        sourceNodesRef.current[sourceId] = null;
      }
      
      // Update state to not playing
      updatedSources[sourceIndex] = { ...updatedSources[sourceIndex], isPlaying: false };
      setAudioSources(updatedSources);
      
      // Restart after a slight delay
      setTimeout(() => {
        togglePlayback(sourceId);
      }, 100);
    }
  };
  
  // Apply a preset scene
  const applyPreset = (presetId: string) => {
    setActivePreset(presetId);
    setIsPresetPopupOpen(false);
    
    // Define preset positions and settings
    let newSources = [...audioSources];
    let newRoomSize = roomSize;
    let newReverbLevel = reverbLevel;
    
    switch (presetId) {
      case "conference":
        // Position sources in a conference call layout (semicircle in front)
        newSources = audioSources.map((source, index) => {
          const angle = -Math.PI/2 + (Math.PI * index) / (audioSources.length - 1);
          return {
            ...source,
            position: {
              x: Math.cos(angle) * 0.7,
              y: 0.1,
              z: Math.sin(angle) * 0.7 - 0.3 // Slightly in front
            }
          };
        });
        newRoomSize = 0.3; // Small room
        newReverbLevel = 0.2; // Light reverb
        break;
        
      case "gaming":
        // Position sources all around for gaming
        newSources = audioSources.map((source, index) => {
          const angle = (Math.PI * 2 * index) / audioSources.length;
          const distance = 0.6 + (index % 2) * 0.3; // Vary distances
          return {
            ...source,
            position: {
              x: Math.cos(angle) * distance,
              y: (index % 3 - 1) * 0.3, // Vary heights
              z: Math.sin(angle) * distance
            }
          };
        });
        newRoomSize = 0.4;
        newReverbLevel = 0.3;
        break;
        
      case "cinema":
        // Position sources in a cinema layout (front stage, surround speakers)
        newSources = audioSources.map((source, index) => {
          if (index === 0) { // Center front
            return {
              ...source,
              position: { x: 0, y: 0, z: -0.8 }
            };
          } else if (index === 1) { // Left front
            return {
              ...source,
              position: { x: -0.7, y: 0, z: -0.6 }
            };
          } else if (index === 2) { // Right front
            return {
              ...source,
              position: { x: 0.7, y: 0, z: -0.6 }
            };
          } else { // Rear surround
            return {
              ...source,
              position: { x: (index % 2 === 0 ? -0.6 : 0.6), y: 0, z: 0.7 }
            };
          }
        });
        newRoomSize = 0.7; // Large room
        newReverbLevel = 0.4; // Medium reverb
        break;
        
      case "music":
        // Position sources like instruments in a recording studio
        newSources = audioSources.map((source, index) => {
          if (index === 0) { // Vocals (center)
            return {
              ...source,
              position: { x: 0, y: 0, z: -0.5 }
            };
          } else if (index === 1) { // Left instrument
            return {
              ...source,
              position: { x: -0.6, y: 0.2, z: -0.3 }
            };
          } else if (index === 2) { // Right instrument
            return {
              ...source,
              position: { x: 0.6, y: 0.2, z: -0.3 }
            };
          } else { // Percussion (back)
            return {
              ...source,
              position: { x: 0, y: 0.3, z: 0.5 }
            };
          }
        });
        newRoomSize = 0.5; // Medium room
        newReverbLevel = 0.6; // Strong reverb
        break;
    }
    
    // Update positions in audio processing nodes
    newSources.forEach(source => {
      if (pannerNodesRef.current[source.id]) {
        updatePannerPosition(pannerNodesRef.current[source.id]!, source.position);
      }
    });
    
    // Update state
    setAudioSources(newSources);
    setRoomSize(newRoomSize);
    setReverbLevel(newReverbLevel);
    
    // Update reverb if needed
    if (convolverNodeRef.current && (newRoomSize !== roomSize)) {
      loadImpulseResponse(convolverNodeRef.current, newRoomSize);
    }
  };
  
  // Close preset popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (presetPopupRef.current && !presetPopupRef.current.contains(event.target as Node)) {
        setIsPresetPopupOpen(false);
      }
    };
    
    if (isPresetPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPresetPopupOpen]);
  
  // Mouse event handlers for visualization area
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(null);
      }
    };
    
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);
  
  // Count playing sources
  const playingCount = audioSources.filter(s => s.isPlaying).length;
  
  // Get selected source details
  const selectedSourceDetails = selectedSource 
    ? audioSources.find(s => s.id === selectedSource) 
    : null;
  
  // Add canvas click handling
  useEffect(() => {
    const handleCanvasClick = (event: MouseEvent) => {
      if (!visualizerCanvasRef.current) return;
      
      const canvas = visualizerCanvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Check if we clicked on a source
      audioSources.forEach(source => {
        const sourceX = parseFloat(canvas.getAttribute(`data-source-${source.id}-x`) || '0');
        const sourceY = parseFloat(canvas.getAttribute(`data-source-${source.id}-y`) || '0');
        const radius = parseFloat(canvas.getAttribute(`data-source-${source.id}-radius`) || '15');
        
        // Calculate distance from click to source center
        const dist = Math.sqrt(Math.pow(x - sourceX, 2) + Math.pow(y - sourceY, 2));
        
        // If clicked within the source's circle
        if (dist <= radius) {
          // Start dragging
          const reactEvent = {
            clientX: event.clientX,
            clientY: event.clientY,
            preventDefault: () => event.preventDefault()
          } as React.MouseEvent<Element, MouseEvent>;
          
          handleMouseDown(reactEvent, source.id);
        }
      });
    };
    
    if (visualizerCanvasRef.current) {
      visualizerCanvasRef.current.addEventListener('mousedown', handleCanvasClick);
    }
    
    return () => {
      if (visualizerCanvasRef.current) {
        visualizerCanvasRef.current.removeEventListener('mousedown', handleCanvasClick);
      }
    };
  }, [audioSources]);
  
  return (
    <section className="w-full py-16 bg-black relative overflow-hidden">
      {/* Background gradients & effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl"></div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('/grid.svg')] bg-repeat"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-500/10 px-4 py-2 rounded-full mb-4 border border-green-500/30">
            <span className="text-green-400 text-sm font-medium">Enterprise-Grade 3D Audio</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Spatial Audio</span> Studio
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto">
            Design your perfect audio environment with precise 3D positioning. 
            Experience Dolby Atmos®-quality spatial audio with advanced head tracking.
          </p>
        </div>
        
        {/* Main audio studio interface */}
        <div className="max-w-6xl mx-auto">
          {/* Premium badge if enabled */}
          {isPremiumEnabled && (
            <div className="flex justify-end mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30">
                <Crown size={14} className="text-amber-400" />
                <span className="text-amber-400 text-xs font-medium">PRO FEATURES ENABLED</span>
              </div>
            </div>
          )}
          
          {/* Glowing effect wrapper */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-lg"></div>
            
            {/* Main interface container */}
            <div className="relative bg-black backdrop-blur-xl rounded-xl border border-white/10 shadow-xl overflow-hidden">
              {/* Header bar with navigation tabs */}
              <div className="bg-gradient-to-r from-gray-900 to-black p-4 border-b border-white/10">
                <div className="flex items-center gap-1 md:gap-4">
                  <button 
                    onClick={() => setActiveTab('visualizer')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'visualizer' 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Visualizer
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('controls')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'controls' 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Audio Controls
                  </button>
                  
                  <button 
                    onClick={() => setActiveTab('settings')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'settings' 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Room Settings
                  </button>
                  
                  {/* Separator */}
                  <div className="h-6 w-px bg-white/10 hidden md:block"></div>
                  
                  {/* Preset selector */}
                  <div className="relative ml-auto">
                    <button
                      onClick={() => setIsPresetPopupOpen(!isPresetPopupOpen)}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-gray-300 flex items-center gap-2"
                    >
                      <span>
                        {activePreset 
                          ? PRESET_SCENES.find(p => p.id === activePreset)?.label || 'Preset' 
                          : 'Choose Preset'}
                      </span>
                      <ChevronDown size={14} />
                    </button>
                    
                    {/* Preset popup */}
                    {isPresetPopupOpen && (
                      <div 
                        ref={presetPopupRef}
                        className="absolute right-0 top-full mt-2 w-64 bg-gray-900 rounded-lg shadow-xl border border-white/10 z-20"
                      >
                        <div className="p-2">
                          {PRESET_SCENES.map(preset => (
                            <button
                              key={preset.id}
                              onClick={() => applyPreset(preset.id)}
                              className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                                activePreset === preset.id
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'hover:bg-white/5 text-gray-300'
                              }`}
                            >
                              <div className="font-medium mb-1">{preset.label}</div>
                              <div className="text-xs opacity-70">{preset.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Master controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMasterMute}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                      aria-label={isMasterMuted ? "Unmute" : "Mute"}
                    >
                      {isMasterMuted ? <VolumeX size={16} className="text-gray-400" /> : <Volume2 size={16} className="text-white" />}
                    </button>
                    
                    <div className="w-20 bg-white/5 rounded-full p-1 hidden sm:block">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={masterVolume}
                        onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
                        className="w-full accent-green-500 h-1 rounded-full appearance-none cursor-pointer"
                        aria-label="Master Volume"
                      />
                    </div>
                    
                    {playingCount > 0 ? (
                      <button
                        onClick={stopAllSources}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                        aria-label="Stop All"
                      >
                        <Pause size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={playAllSources}
                        className="p-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors"
                        aria-label="Play All"
                      >
                        <Play size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Main content based on active tab */}
              <div className="p-6">
                {/* Visualizer Tab */}
                {activeTab === 'visualizer' && (
                  <div>
                    {/* Top controls row */}
                    <div className="flex flex-wrap gap-4 justify-between mb-4">
                      {/* Left side - view mode toggle */}
                      <div className="flex items-center">
                        <span className="text-white text-sm mr-3">View Mode:</span>
                        <div className="flex rounded-lg overflow-hidden border border-white/10">
                          <button
                            onClick={() => setViewMode('3d')}
                            className={`px-3 py-1.5 text-xs font-medium ${
                              viewMode === '3d'
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                          >
                            3D
                          </button>
                          <button
                            onClick={() => setViewMode('topdown')}
                            className={`px-3 py-1.5 text-xs font-medium ${
                              viewMode === 'topdown'
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                          >
                            Top-Down
                          </button>
                        </div>
                      </div>
                      
                      {/* Right side - head tracking toggle */}
                      <div className="flex items-center">
                        <span className="text-white text-sm mr-3">Head Tracking:</span>
                        <button
                          onClick={() => setIsHeadTracking(!isHeadTracking)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            isPremiumEnabled 
                              ? isHeadTracking ? 'bg-green-600' : 'bg-white/10' 
                              : 'bg-gray-700 cursor-not-allowed'
                          }`}
                          disabled={!isPremiumEnabled}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              isHeadTracking ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                          
                          {!isPremiumEnabled && (
                            <Lock size={10} className="absolute right-1.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* Main visualization canvas */}
                    <div 
                      ref={visualizationRef}
                      className="relative h-96 rounded-xl bg-black/40 border border-white/10 overflow-hidden cursor-grab mb-6"
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                    >
                      <canvas
                        ref={visualizerCanvasRef}
                        className="absolute inset-0 w-full h-full"
                      />
                      
                      {/* Instruction message if no audio playing */}
                      {playingCount === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <p className="text-gray-400 bg-black/50 px-4 py-2 rounded-lg">
                            Press play to start sounds and drag icons to position them
                          </p>
                        </div>
                      )}
                      
                      {/* Direction labels */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">Front</div>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">Back</div>
                      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">Left</div>
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">Right</div>
                      
                      {/* Premium indicator */}
                      {isHeadTracking && (
                        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/70 border border-green-500/30 text-xs text-green-400 flex items-center gap-1">
                          <RotateCw size={10} className="animate-spin" />
                          Head Tracking Active
                        </div>
                      )}
                    </div>
                    
                    {/* Selected source details */}
                    {selectedSourceDetails && (
                      <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${selectedSourceDetails.color} flex items-center justify-center`}>
                              {selectedSourceDetails.icon}
                            </div>
                            <h3 className="text-white font-medium">{selectedSourceDetails.label} Settings</h3>
                          </div>
                          
                          <button
                            onClick={() => togglePlayback(selectedSourceDetails.id)}
                            disabled={isLoading[selectedSourceDetails.id]}
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              selectedSourceDetails.isPlaying 
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                                : 'bg-green-500/20 text-green-400 border border-green-500/30'
                            }`}
                          >
                            {isLoading[selectedSourceDetails.id] ? (
                              <RotateCw className="animate-spin w-4 h-4" />
                            ) : selectedSourceDetails.isPlaying ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Position controls */}
                          <div className="space-y-3">
                            <h4 className="text-sm text-gray-400 font-medium">Position</h4>
                            
                            {/* X position (left/right) */}
                            <div>
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Left</span>
                                <span>X: {selectedSourceDetails.position.x.toFixed(2)}</span>
                                <span>Right</span>
                              </div>
                              <input
                                type="range"
                                min="-1"
                                max="1"
                                step="0.01"
                                value={selectedSourceDetails.position.x}
                                onChange={(e) => {
                                  const newX = parseFloat(e.target.value);
                                  const sourceIndex = audioSources.findIndex(s => s.id === selectedSourceDetails.id);
                                  if (sourceIndex !== -1) {
                                    // Update panner
                                    if (pannerNodesRef.current[selectedSourceDetails.id]) {
                                      const { y, z } = selectedSourceDetails.position;
                                      updatePannerPosition(pannerNodesRef.current[selectedSourceDetails.id]!, { x: newX, y, z });
                                    }
                                    
                                    // Update state
                                    const updatedSources = [...audioSources];
                                    updatedSources[sourceIndex] = {
                                      ...updatedSources[sourceIndex],
                                      position: {
                                        ...updatedSources[sourceIndex].position,
                                        x: newX
                                      }
                                    };
                                    setAudioSources(updatedSources);
                                  }
                                }}
                                className="w-full accent-green-500 h-1 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-blue-500 via-gray-600 to-red-500"
                              />
                            </div>
                            
                            {/* Y position (up/down) */}
                            <div>
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Down</span>
                                <span>Y: {selectedSourceDetails.position.y.toFixed(2)}</span>
                                <span>Up</span>
                              </div>
                              <input
                                type="range"
                                min="-1"
                                max="1"
                                step="0.01"
                                value={selectedSourceDetails.position.y}
                                onChange={(e) => {
                                  const newY = parseFloat(e.target.value);
                                  const sourceIndex = audioSources.findIndex(s => s.id === selectedSourceDetails.id);
                                  if (sourceIndex !== -1) {
                                    // Update panner
                                    if (pannerNodesRef.current[selectedSourceDetails.id]) {
                                      const { x, z } = selectedSourceDetails.position;
                                      updatePannerPosition(pannerNodesRef.current[selectedSourceDetails.id]!, { x, y: newY, z });
                                    }
                                    
                                    // Update state
                                    const updatedSources = [...audioSources];
                                    updatedSources[sourceIndex] = {
                                      ...updatedSources[sourceIndex],
                                      position: {
                                        ...updatedSources[sourceIndex].position,
                                        y: newY
                                      }
                                    };
                                    setAudioSources(updatedSources);
                                  }
                                }}
                                className="w-full accent-green-500 h-1 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-purple-500 via-gray-600 to-yellow-500"
                              />
                            </div>
                            
                            {/* Z position (front/back) */}
                            <div>
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Behind</span>
                                <span>Z: {selectedSourceDetails.position.z.toFixed(2)}</span>
                                <span>Front</span>
                              </div>
                              <input
                                type="range"
                                min="-1"
                                max="1"
                                step="0.01"
                                value={selectedSourceDetails.position.z}
                                onChange={(e) => adjustZPosition(selectedSourceDetails.id, parseFloat(e.target.value))}
                                className="w-full accent-green-500 h-1 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-green-500 via-gray-600 to-amber-500"
                              />
                            </div>
                          </div>
                          
                          {/* Volume and other controls */}
                          <div className="space-y-3">
                            <h4 className="text-sm text-gray-400 font-medium">Audio Settings</h4>
                            
                            {/* Volume slider */}
                            <div>
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Volume</span>
                                <span>{Math.round(selectedSourceDetails.volume * 100)}%</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Volume2 className="w-4 h-4 text-gray-400" />
                                <input
                                  type="range"
                                  min="0"
                                  max="1"
                                  step="0.01"
                                  value={selectedSourceDetails.volume}
                                  onChange={(e) => updateSourceVolume(selectedSourceDetails.id, parseFloat(e.target.value))}
                                  className="flex-1 accent-green-500 h-1 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-gray-700 to-gray-500"
                                  aria-label={`${selectedSourceDetails.label} Volume`}
                                />
                              </div>
                            </div>
                            
                            {/* Format selector */}
                            <div>
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Audio Format</span>
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                <button
                                  onClick={() => changeAudioFormat(selectedSourceDetails.id, AUDIO_FORMATS.STEREO)}
                                  className={`px-2 py-1.5 text-xs rounded ${
                                    selectedSourceDetails.format === AUDIO_FORMATS.STEREO
                                      ? 'bg-white/20 text-white'
                                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                  }`}
                                >
                                  Stereo
                                </button>
                                <button
                                  onClick={() => changeAudioFormat(selectedSourceDetails.id, AUDIO_FORMATS.BINAURAL)}
                                  className={`px-2 py-1.5 text-xs rounded ${
                                    selectedSourceDetails.format === AUDIO_FORMATS.BINAURAL
                                      ? 'bg-white/20 text-white'
                                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                  }`}
                                >
                                  Binaural
                                </button>
                                <button
                                  onClick={() => changeAudioFormat(selectedSourceDetails.id, AUDIO_FORMATS.SPATIAL)}
                                  className={`px-2 py-1.5 text-xs rounded flex items-center justify-center gap-1 ${
                                    selectedSourceDetails.format === AUDIO_FORMATS.SPATIAL
                                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                  }`}
                                  disabled={!isPremiumEnabled}
                                >
                                  <span>Spatial</span>
                                  {!isPremiumEnabled && <Lock size={10} />}
                                </button>
                                <button
                                  onClick={() => changeAudioFormat(selectedSourceDetails.id, AUDIO_FORMATS.DOLBY_ATMOS)}
                                  className={`px-2 py-1.5 text-xs rounded flex items-center justify-center gap-1 ${
                                    selectedSourceDetails.format === AUDIO_FORMATS.DOLBY_ATMOS
                                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                  }`}
                                  disabled={!isPremiumEnabled}
                                >
                                  <span>Dolby Atmos</span>
                                  {!isPremiumEnabled && <Lock size={10} />}
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Quick position buttons */}
                          <div className="space-y-3">
                            <h4 className="text-sm text-gray-400 font-medium">Quick Position</h4>
                            <div className="grid grid-cols-3 gap-1">
                              <button 
                                onClick={() => {
                                  const newPos = { x: -0.7, y: 0, z: -0.7 };
                                  const sourceIndex = audioSources.findIndex(s => s.id === selectedSourceDetails.id);
                                  if (sourceIndex !== -1 && pannerNodesRef.current[selectedSourceDetails.id]) {
                                    updatePannerPosition(pannerNodesRef.current[selectedSourceDetails.id]!, newPos);
                                    const updatedSources = [...audioSources];
                                    updatedSources[sourceIndex] = {
                                      ...updatedSources[sourceIndex],
                                      position: newPos
                                    };
                                    setAudioSources(updatedSources);
                                  }
                                }}
                                className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-xs"
                              >
                                Front Left
                              </button>
                              <button 
                                onClick={() => {
                                  const newPos = { x: 0, y: 0, z: -0.9 };
                                  const sourceIndex = audioSources.findIndex(s => s.id === selectedSourceDetails.id);
                                  if (sourceIndex !== -1 && pannerNodesRef.current[selectedSourceDetails.id]) {
                                    updatePannerPosition(pannerNodesRef.current[selectedSourceDetails.id]!, newPos);
                                    const updatedSources = [...audioSources];
                                    updatedSources[sourceIndex] = {
                                      ...updatedSources[sourceIndex],
                                      position: newPos
                                    };
                                    setAudioSources(updatedSources);
                                  }
                                }}
                                className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-xs"
                              >
                                Front Center
                              </button>
                              <button 
                                onClick={() => {
                                  const newPos = { x: 0.7, y: 0, z: -0.7 };
                                  const sourceIndex = audioSources.findIndex(s => s.id === selectedSourceDetails.id);
                                  if (sourceIndex !== -1 && pannerNodesRef.current[selectedSourceDetails.id]) {
                                    updatePannerPosition(pannerNodesRef.current[selectedSourceDetails.id]!, newPos);
                                    const updatedSources = [...audioSources];
                                    updatedSources[sourceIndex] = {
                                      ...updatedSources[sourceIndex],
                                      position: newPos
                                    };
                                    setAudioSources(updatedSources);
                                  }
                                }}
                                className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-xs"
                              >
                                Front Right
                              </button>
                              <button 
                                onClick={() => {
                                  const newPos = { x: -0.9, y: 0, z: 0 };
                                  const sourceIndex = audioSources.findIndex(s => s.id === selectedSourceDetails.id);
                                  if (sourceIndex !== -1 && pannerNodesRef.current[selectedSourceDetails.id]) {
                                    updatePannerPosition(pannerNodesRef.current[selectedSourceDetails.id]!, newPos);
                                    const updatedSources = [...audioSources];
                                    updatedSources[sourceIndex] = {
                                      ...updatedSources[sourceIndex],
                                      position: newPos
                                    };
                                    setAudioSources(updatedSources);
                                  }
                                }}
                                className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-xs"
                              >
                                Left
                              </button>
                              <button 
                                onClick={() => {
                                  const newPos = { x: 0, y: 0, z: 0 };
                                  const sourceIndex = audioSources.findIndex(s => s.id === selectedSourceDetails.id);
                                  if (sourceIndex !== -1 && pannerNodesRef.current[selectedSourceDetails.id]) {
                                    updatePannerPosition(pannerNodesRef.current[selectedSourceDetails.id]!, newPos);
                                    const updatedSources = [...audioSources];
                                    updatedSources[sourceIndex] = {
                                      ...updatedSources[sourceIndex],
                                      position: newPos
                                    };
                                    setAudioSources(updatedSources);
                                  }
                                }}
                                className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-xs"
                              >
                                Center
                              </button>
                              <button 
                                onClick={() => {
                                  const newPos = { x: 0.9, y: 0, z: 0 };
                                  const sourceIndex = audioSources.findIndex(s => s.id === selectedSourceDetails.id);
                                  if (sourceIndex !== -1 && pannerNodesRef.current[selectedSourceDetails.id]) {
                                    updatePannerPosition(pannerNodesRef.current[selectedSourceDetails.id]!, newPos);
                                    const updatedSources = [...audioSources];
                                    updatedSources[sourceIndex] = {
                                      ...updatedSources[sourceIndex],
                                      position: newPos
                                    };
                                    setAudioSources(updatedSources);
                                  }
                                }}
                                className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-xs"
                              >
                                Right
                              </button>
                              <button 
                                onClick={() => {
                                  const newPos = { x: -0.7, y: 0, z: 0.7 };
                                  const sourceIndex = audioSources.findIndex(s => s.id === selectedSourceDetails.id);
                                  if (sourceIndex !== -1 && pannerNodesRef.current[selectedSourceDetails.id]) {
                                    updatePannerPosition(pannerNodesRef.current[selectedSourceDetails.id]!, newPos);
                                    const updatedSources = [...audioSources];
                                    updatedSources[sourceIndex] = {
                                      ...updatedSources[sourceIndex],
                                      position: newPos
                                    };
                                    setAudioSources(updatedSources);
                                  }
                                }}
                                className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-xs"
                              >
                                Rear Left
                              </button>
                              <button 
                                onClick={() => {
                                  const newPos = { x: 0, y: 0, z: 0.9 };
                                  const sourceIndex = audioSources.findIndex(s => s.id === selectedSourceDetails.id);
                                  if (sourceIndex !== -1 && pannerNodesRef.current[selectedSourceDetails.id]) {
                                    updatePannerPosition(pannerNodesRef.current[selectedSourceDetails.id]!, newPos);
                                    const updatedSources = [...audioSources];
                                    updatedSources[sourceIndex] = {
                                      ...updatedSources[sourceIndex],
                                      position: newPos
                                    };
                                    setAudioSources(updatedSources);
                                  }
                                }}
                                className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-xs"
                              >
                                Rear Center
                              </button>
                              <button 
                                onClick={() => {
                                  const newPos = { x: 0.7, y: 0, z: 0.7 };
                                  const sourceIndex = audioSources.findIndex(s => s.id === selectedSourceDetails.id);
                                  if (sourceIndex !== -1 && pannerNodesRef.current[selectedSourceDetails.id]) {
                                    updatePannerPosition(pannerNodesRef.current[selectedSourceDetails.id]!, newPos);
                                    const updatedSources = [...audioSources];
                                    updatedSources[sourceIndex] = {
                                      ...updatedSources[sourceIndex],
                                      position: newPos
                                    };
                                    setAudioSources(updatedSources);
                                  }
                                }}
                                className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-xs"
                              >
                                Rear Right
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Controls Tab */}
                {activeTab === 'controls' && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {audioSources.map((source) => (
                        <div
                          key={source.id}
                          className={`p-4 rounded-xl ${
                            selectedSource === source.id
                              ? 'bg-green-500/10 border border-green-500/30'
                              : 'bg-black/30 border border-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${source.color} flex items-center justify-center`}>
                                {source.icon}
                              </div>
                              <span className="text-white font-medium">{source.label}</span>
                            </div>
                            
                            <button
                              onClick={() => togglePlayback(source.id)}
                              disabled={isLoading[source.id]}
                              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                source.isPlaying 
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                                  : 'bg-green-500/20 text-green-400 border border-green-500/30'
                              }`}
                            >
                              {isLoading[source.id] ? (
                                <RotateCw className="animate-spin w-4 h-4" />
                              ) : source.isPlaying ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          
                          {/* Volume slider */}
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Volume</span>
                              <span>{Math.round(source.volume * 100)}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Volume2 className="w-4 h-4 text-gray-400" />
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={source.volume}
                                onChange={(e) => updateSourceVolume(source.id, parseFloat(e.target.value))}
                                className="flex-1 accent-green-500 h-1 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-gray-700 to-gray-500"
                                aria-label={`${source.label} Volume`}
                              />
                            </div>
                          </div>
                          
                          {/* Z-position (depth) slider */}
                          <div className="mb-4">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Position (Front/Back)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400">Behind</span>
                              <input
                                type="range"
                                min="-1"
                                max="1"
                                step="0.01"
                                value={source.position.z}
                                onChange={(e) => adjustZPosition(source.id, parseFloat(e.target.value))}
                                className="flex-1 accent-green-500 h-1 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-green-700 to-green-500"
                                aria-label={`${source.label} Depth`}
                              />
                              <span className="text-xs text-gray-400">Front</span>
                            </div>
                          </div>
                          
                          {/* Format badge */}
                          <div className="flex justify-between items-center">
                            <div className={`px-2 py-1 rounded-full text-xs ${
                              source.format === AUDIO_FORMATS.SPATIAL || source.format === AUDIO_FORMATS.DOLBY_ATMOS
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-white/10 text-gray-300'
                            }`}>
                              {source.format === AUDIO_FORMATS.DOLBY_ATMOS ? 'Dolby Atmos®' : 
                               source.format === AUDIO_FORMATS.SPATIAL ? 'Spatial' :
                               source.format === AUDIO_FORMATS.BINAURAL ? 'Binaural' : 'Stereo'}
                            </div>
                            
                            <button
                              onClick={() => setSelectedSource(source.id)}
                              className="px-2 py-1 rounded text-xs bg-white/5 hover:bg-white/10 text-gray-300"
                            >
                              {selectedSource === source.id ? 'Editing' : 'Edit'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-black/30 border border-white/10 rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                          <Info className="w-4 h-4 text-gray-300" />
                        </div>
                        <h3 className="text-white font-medium">Audio Source Controls</h3>
                      </div>
                      
                      <ul className="text-sm text-gray-300 list-disc list-inside space-y-2">
                        <li>Click on any source card to select it for detailed editing</li>
                        <li>Use the volume sliders to adjust relative loudness</li>
                        <li>The position slider quickly adjusts front/back placement</li>
                        <li>For more precise control, use the Visualizer tab and drag sources</li>
                        <li>Premium formats (Spatial, Dolby Atmos) are available with Pro subscription</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Room Acoustics */}
                      <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                            <Settings className="w-4 h-4 text-gray-300" />
                          </div>
                          <h3 className="text-white font-medium">Room Acoustics</h3>
                        </div>
                        
                        {/* Room Size */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Room Size</span>
                            <span>{roomSize < 0.3 ? 'Small' : roomSize < 0.6 ? 'Medium' : 'Large'}</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={roomSize}
                            onChange={(e) => setRoomSize(parseFloat(e.target.value))}
                            className="w-full accent-green-500 h-1 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-green-700 to-green-500"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Small Room</span>
                            <span>Large Hall</span>
                          </div>
                        </div>
                        
                        {/* Reverb Level */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Reverb Amount</span>
                            <span>{Math.round(reverbLevel * 100)}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={reverbLevel}
                            onChange={(e) => setReverbLevel(parseFloat(e.target.value))}
                            className="w-full accent-green-500 h-1 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-green-700 to-green-500"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Dry</span>
                            <span>Wet</span>
                          </div>
                        </div>
                        
                        {/* Sample Room Types */}
                        <div>
                          <div className="text-xs text-gray-400 mb-2">Quick Room Presets</div>
                          <div className="grid grid-cols-3 gap-2">
                            <button
                              onClick={() => {
                                setRoomSize(0.2);
                                setReverbLevel(0.1);
                              }}
                              className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-xs"
                            >
                              Office
                            </button>
                            <button
                              onClick={() => {
                                setRoomSize(0.4);
                                setReverbLevel(0.3);
                              }}
                              className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-xs"
                            >
                              Living Room
                            </button>
                            <button
                              onClick={() => {
                                setRoomSize(0.65);
                                setReverbLevel(0.4);
                              }}
                              className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-xs"
                            >
                              Concert Hall
                            </button>
                            <button
                              onClick={() => {
                                setRoomSize(0.3);
                                setReverbLevel(0.25);
                              }}
                              className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-xs"
                            >
                              Studio
                            </button>
                            <button
                              onClick={() => {
                                setRoomSize(0.8);
                                setReverbLevel(0.6);
                              }}
                              className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-xs"
                            >
                              Cathedral
                            </button>
                            <button
                              onClick={() => {
                                setRoomSize(0.1);
                                setReverbLevel(0.05);
                              }}
                              className="p-2 rounded bg-white/5 hover:bg-white/10 text-gray-300 text-xs"
                            >
                              Anechoic
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Head Tracking Settings */}
                      <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                              <User className="w-4 h-4 text-gray-300" />
                            </div>
                            <h3 className="text-white font-medium">Head Tracking</h3>
                          </div>
                          
                          <div className="flex items-center">
                            <button
                              onClick={() => setIsHeadTracking(!isHeadTracking)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                isPremiumEnabled 
                                  ? isHeadTracking ? 'bg-green-600' : 'bg-white/10' 
                                  : 'bg-gray-700 cursor-not-allowed'
                              }`}
                              disabled={!isPremiumEnabled}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  isHeadTracking ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                              
                              {!isPremiumEnabled && (
                                <Lock size={10} className="absolute right-1.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        {!isPremiumEnabled ? (
                          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-4">
                            <div className="flex items-start gap-3">
                              <Crown size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm text-amber-200 mb-2">Premium Feature</p>
                                <p className="text-xs text-amber-100/80">
                                  Head tracking is available with a Pro subscription. 
                                  Upgrade to track your movements in real-time for immersive audio experiences.
                                </p>
                              </div>
                            </div>
                            
                            <button className="mt-3 w-full py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium">
                              Upgrade to Pro
                            </button>
                          </div>
                        ) : (
                          <div className={`bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4 ${
                            isHeadTracking ? '' : 'opacity-50'
                          }`}>
                            <p className="text-sm text-green-200 mb-2">
                              {isHeadTracking ? 'Head Tracking Active' : 'Head Tracking Disabled'}
                            </p>
                            <p className="text-xs text-green-100/80">
                              {isHeadTracking 
                                ? 'Move your head to change the listening orientation. Your device orientation is being used to adjust the audio field in real-time.'
                                : 'Toggle to enable head tracking. This uses your device orientation sensors to adjust the audio field as you move your head.'}
                            </p>
                            
                            {isHeadTracking && (
                              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs text-gray-300">
                                <div>
                                  <div className="text-green-400 mb-1">Yaw (α)</div>
                                  <div>{Math.round(headOrientation.alpha)}°</div>
                                </div>
                                <div>
                                  <div className="text-green-400 mb-1">Pitch (β)</div>
                                  <div>{Math.round(headOrientation.beta)}°</div>
                                </div>
                                <div>
                                  <div className="text-green-400 mb-1">Roll (γ)</div>
                                  <div>{Math.round(headOrientation.gamma)}°</div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Sensitivity control (only if premium and tracking enabled) */}
                        {isPremiumEnabled && isHeadTracking && (
                          <div className="mb-4">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                              <span>Head Tracking Sensitivity</span>
                            </div>
                            <input
                              type="range"
                              min="0.1"
                              max="2"
                              step="0.1"
                              value="1"
                              className="w-full accent-green-500 h-1 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-green-700 to-green-500"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>Low</span>
                              <span>High</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Notes on device compatibility */}
                        <div className="text-xs text-gray-400">
                          <p className="mb-2">Device Compatibility:</p>
                          <ul className="list-disc list-inside space-y-1 text-gray-500">
                            <li>Requires modern device with orientation sensors</li>
                            <li>Works best on mobile devices and laptops with gyroscope</li>
                            <li>May require permission for motion & orientation access</li>
                            <li>For optimal experience, use headphones</li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Additional settings */}
                      <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                            <Sliders className="w-4 h-4 text-gray-300" />
                          </div>
                          <h3 className="text-white font-medium">Audio Processing</h3>
                        </div>
                        
                        {/* Audio Format Selection */}
                        <div className="mb-4">
                          <div className="text-xs text-gray-400 mb-2">Default Audio Format</div>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => setActiveFormat(AUDIO_FORMATS.STEREO)}
                              className={`p-2 rounded ${
                                activeFormat === AUDIO_FORMATS.STEREO
                                  ? 'bg-white/20 text-white'
                                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                              }`}
                            >
                              <div className="text-sm font-medium">Stereo</div>
                              <div className="text-xs opacity-70 mt-1">Standard audio processing</div>
                            </button>
                            <button
                              onClick={() => setActiveFormat(AUDIO_FORMATS.BINAURAL)}
                              className={`p-2 rounded ${
                                activeFormat === AUDIO_FORMATS.BINAURAL
                                  ? 'bg-white/20 text-white'
                                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                              }`}
                            >
                              <div className="text-sm font-medium">Binaural</div>
                              <div className="text-xs opacity-70 mt-1">Enhanced 3D audio</div>
                            </button>
                            <button
                              onClick={() => {
                                if (isPremiumEnabled) {
                                  setActiveFormat(AUDIO_FORMATS.SPATIAL);
                                } else {
                                  setErrorMessage("Premium format requires Pro subscription");
                                }
                              }}
                              className={`p-2 rounded ${
                                activeFormat === AUDIO_FORMATS.SPATIAL
                                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                              }`}
                              disabled={!isPremiumEnabled}
                            >
                              <div className="text-sm font-medium flex items-center gap-1">
                                <span>Spatial</span>
                                {!isPremiumEnabled && <Lock size={12} />}
                              </div>
                              <div className="text-xs opacity-70 mt-1">Premium 3D positioning</div>
                            </button>
                            <button
                              onClick={() => {
                                if (isPremiumEnabled) {
                                  setActiveFormat(AUDIO_FORMATS.DOLBY_ATMOS);
                                } else {
                                  setErrorMessage("Premium format requires Pro subscription");
                                }
                              }}
                              className={`p-2 rounded ${
                                activeFormat === AUDIO_FORMATS.DOLBY_ATMOS
                                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                              }`}
                              disabled={!isPremiumEnabled}
                            >
                              <div className="text-sm font-medium flex items-center gap-1">
                                <span>Dolby Atmos</span>
                                {!isPremiumEnabled && <Lock size={12} />}
                              </div>
                              <div className="text-xs opacity-70 mt-1">High-definition spatial</div>
                            </button>
                          </div>
                        </div>
                        
                        {/* Sample Rate */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Sample Rate</span>
                            <span>48 kHz</span>
                          </div>
                          <div className="grid grid-cols-4 gap-1">
                            <button className="p-1 rounded text-xs bg-white/5 text-gray-400">
                              44.1 kHz
                            </button>
                            <button className="p-1 rounded text-xs bg-white/20 text-white">
                              48 kHz
                            </button>
                            <button className="p-1 rounded text-xs bg-white/5 text-gray-400">
                              96 kHz
                            </button>
                            <button className="p-1 rounded text-xs bg-white/5 text-gray-400">
                              192 kHz
                            </button>
                          </div>
                        </div>
                        
                        {/* Buffer Size */}
                        <div>
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Buffer Size</span>
                            <span>256 samples</span>
                          </div>
                          <div className="grid grid-cols-4 gap-1">
                            <button className="p-1 rounded text-xs bg-white/5 text-gray-400">
                              128
                            </button>
                            <button className="p-1 rounded text-xs bg-white/20 text-white">
                              256
                            </button>
                            <button className="p-1 rounded text-xs bg-white/5 text-gray-400">
                              512
                            </button>
                            <button className="p-1 rounded text-xs bg-white/5 text-gray-400">
                              1024
                            </button>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Low Latency</span>
                            <span>High Stability</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Export/Share Settings */}
                      <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                            <Share2 className="w-4 h-4 text-gray-300" />
                          </div>
                          <h3 className="text-white font-medium">Save & Share</h3>
                        </div>
                        
                        <div className="space-y-3">
                          <button className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 flex items-center justify-center gap-2">
                            <Download size={16} />
                            <span>Export Current Configuration</span>
                          </button>
                          
                          <button className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 flex items-center justify-center gap-2">
                            <BadgeInfo size={16} />
                            <span>View Performance Metrics</span>
                          </button>
                          
                          <button className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 flex items-center justify-center gap-2">
                            <LayoutGrid size={16} />
                            <span>Browse Community Presets</span>
                          </button>
                        </div>
                        
                        <div className="mt-4 text-center">
                          <div className="text-xs text-gray-500">
                            Current CPU Usage: <span className="text-white">4.2%</span> • Latency: <span className="text-white">5.3ms</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Premium feature banner */}
                    {!isPremiumEnabled && (
                      <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-xl">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                            <Crown className="w-6 h-6 text-white" />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-amber-300 font-medium text-lg mb-1">Unlock Pro Features</h3>
                            <p className="text-amber-100/80 text-sm mb-0">
                              Upgrade to JyvDesktop Pro to access premium formats, head tracking, and advanced room acoustics. 
                              Experience studio-quality spatial audio with Dolby Atmos® integration.
                            </p>
                          </div>
                          
                          <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium">
                            Upgrade Now
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Error message display */}
                {errorMessage && (
                  <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <Info className="w-4 h-4 text-red-400" />
                    </div>
                    {errorMessage}
                    <button 
                      onClick={() => setErrorMessage(null)}
                      className="ml-auto text-red-400 hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                )}
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
          
          {/* Technical highlights section */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise-Grade Audio Technology</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                JyvDesktop uses advanced spatial audio processing to deliver immersive, realistic 3D sound
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500/20 to-green-600/20 flex items-center justify-center mb-4">
                  <Headphones className="text-green-400 w-6 h-6" />
                </div>
                <h4 className="text-white font-medium text-lg mb-2">HRTF Technology</h4>
                <p className="text-gray-400 text-sm">
                  Precise head-related transfer functions (HRTF) model how sound waves interact with your head and ears for accurate spatial positioning.
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500/20 to-green-600/20 flex items-center justify-center mb-4">
                  <User className="text-green-400 w-6 h-6" />
                </div>
                <h4 className="text-white font-medium text-lg mb-2">Dynamic Head Tracking</h4>
                <p className="text-gray-400 text-sm">
                  Real-time orientation sensors adjust the audio field as you move, maintaining accurate sound positioning for complete immersion.
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500/20 to-green-600/20 flex items-center justify-center mb-4">
                  <Settings className="text-green-400 w-6 h-6" />
                </div>
                <h4 className="text-white font-medium text-lg mb-2">Room Acoustics</h4>
                <p className="text-gray-400 text-sm">
                  Advanced convolution reverb simulates real acoustic spaces, from intimate studios to concert halls, for realistic environmental audio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpatialAudioDemo;