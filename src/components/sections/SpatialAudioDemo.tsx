'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiHeadphones, FiInfo, FiRotateCw } from 'react-icons/fi';

// Type definitions
interface AudioPosition {
    x: number;
    y: number;
    z: number;
}

interface AudioSource {
    id: string;
    label: string;
    file: string;
}

const SpatialAudioDemo = () => {
    // State for audio playback and controls
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
    const [spatialIntensity, setSpatialIntensity] = useState(0.5);
    const [currentAudioSource, setCurrentAudioSource] = useState('voice');
    const [audioPosition, setAudioPosition] = useState<AudioPosition>({ x: 0, y: 0, z: -1 });
    const [showTooltip, setShowTooltip] = useState(false);

    // Refs for audio context and nodes - using proper typing
    const audioContextRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const pannerNodeRef = useRef<PannerNode | null>(null);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
    const audioBufferRef = useRef<AudioBuffer | null>(null);

    // Interval ref for cleanup
    const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Audio source options
    const audioSources = useMemo<AudioSource[]>(() => [
        { id: 'voice', label: 'Voice', file: '/assets/audio/voice-sample.mp3' },
        { id: 'music', label: 'Music', file: '/assets/audio/music-sample.wav' },
        { id: 'ambience', label: 'Ambience', file: '/assets/audio/ambience-sample.mp3' },
    ], []);

    // Set up audio context and nodes
    useEffect(() => {
        return () => {
            // Clean up on unmount
            if (sourceNodeRef.current) {
                try {
                    sourceNodeRef.current.stop();
                } catch (e) {
                    // Ignore errors during cleanup
                }
            }

            if (rotationIntervalRef.current) {
                clearInterval(rotationIntervalRef.current);
            }

            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                void audioContextRef.current.close();
            }
        };
    }, []);

    // Handle volume changes
    useEffect(() => {
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.value = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    // Handle spatial intensity changes
    useEffect(() => {
        if (isPlaying) {
            updateAudioPosition();
        }
    }, [spatialIntensity, isPlaying]);

    // Get current audio file
    const getCurrentAudioFile = (): string => {
        const source = audioSources.find(src => src.id === currentAudioSource);
        return source ? source.file : audioSources[0].file;
    };

    // Initialize audio context if needed
    const initializeAudioContext = (): boolean => {
        if (!audioContextRef.current) {
            try {
                audioContextRef.current = new window.AudioContext();

                // Create gain node for volume control
                gainNodeRef.current = audioContextRef.current.createGain();
                gainNodeRef.current.gain.value = isMuted ? 0 : volume;

                // Create panner node for spatial audio
                pannerNodeRef.current = audioContextRef.current.createPanner();
                pannerNodeRef.current.panningModel = 'HRTF'; // Head Related Transfer Function
                pannerNodeRef.current.distanceModel = 'inverse';
                pannerNodeRef.current.refDistance = 1;
                pannerNodeRef.current.maxDistance = 10000;
                pannerNodeRef.current.rolloffFactor = 1;
                pannerNodeRef.current.coneInnerAngle = 360;
                pannerNodeRef.current.coneOuterAngle = 360;
                pannerNodeRef.current.coneOuterGain = 0;

                // Set initial position
                updatePositionForPanner(audioPosition);

                // Connect nodes
                pannerNodeRef.current.connect(gainNodeRef.current);
                gainNodeRef.current.connect(audioContextRef.current.destination);

                return true;
            } catch (error) {
                console.error('Failed to set up audio context:', error);
                return false;
            }
        }
        return true;
    };

    // Update panner node with position
    const updatePositionForPanner = (position: AudioPosition): void => {
        if (!pannerNodeRef.current) return;

        // Standard method that works across browsers
        pannerNodeRef.current.setPosition(position.x, position.y, position.z);
    };

    // Update audio position based on spatial intensity
    const updateAudioPosition = (): void => {
        if (!pannerNodeRef.current) return;

        // Calculate position based on intensity
        const angle = Math.PI * 2 * Math.random(); // Random angle
        const distance = 1 + spatialIntensity * 5; // Distance gets larger with higher intensity

        const newPosition: AudioPosition = {
            x: Math.cos(angle) * distance,
            y: (Math.random() - 0.5) * spatialIntensity * 2,
            z: Math.sin(angle) * distance - 1, // Negative Z is in front of the listener
        };

        setAudioPosition(newPosition);
        updatePositionForPanner(newPosition);
    };

    // Play/pause audio
    const togglePlayback = async (): Promise<void> => {
        // Initialize context if not already initialized
        if (!initializeAudioContext()) return;

        if (!audioContextRef.current) return;

        if (isPlaying) {
            // Stop playback
            if (sourceNodeRef.current) {
                try {
                    sourceNodeRef.current.stop();
                    sourceNodeRef.current.disconnect();
                } catch (e) {
                    // Ignore errors during stopping
                }
                sourceNodeRef.current = null;
            }

            // Clear rotation interval
            if (rotationIntervalRef.current) {
                clearInterval(rotationIntervalRef.current);
                rotationIntervalRef.current = null;
            }

            setIsPlaying(false);
            return;
        }

        try {
            // Resume context if needed
            if (audioContextRef.current.state === 'suspended') {
                await audioContextRef.current.resume();
            }

            // Either use cached buffer or load new one
            let audioBuffer = audioBufferRef.current;

            if (!audioBuffer) {
                // Load and decode audio file
                const response = await fetch(getCurrentAudioFile());
                const arrayBuffer = await response.arrayBuffer();
                audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
                audioBufferRef.current = audioBuffer;
            }

            // Create and connect source node
            sourceNodeRef.current = audioContextRef.current.createBufferSource();
            sourceNodeRef.current.buffer = audioBuffer;
            sourceNodeRef.current.loop = true;

            if (pannerNodeRef.current) {
                sourceNodeRef.current.connect(pannerNodeRef.current);
            } else if (gainNodeRef.current) {
                // Fallback if panner not available
                sourceNodeRef.current.connect(gainNodeRef.current);
            }

            // Start playback
            sourceNodeRef.current.start();
            setIsPlaying(true);

            // Set up sound movement if intensity is high enough
            if (spatialIntensity > 0.1) {
                rotationIntervalRef.current = setInterval(() => {
                    updateAudioPosition();
                }, 3000);
            }
        } catch (error) {
            console.error('Error playing audio:', error);
            setIsPlaying(false);
        }
    };

    // Toggle mute
    const toggleMute = (): void => {
        setIsMuted(!isMuted);
    };

    // Handle audio source change
    const changeAudioSource = (sourceId: string): void => {
        if (sourceId === currentAudioSource) return;

        // Stop current playback if active
        if (isPlaying && sourceNodeRef.current) {
            try {
                sourceNodeRef.current.stop();
                sourceNodeRef.current.disconnect();
            } catch (e) {
                // Ignore errors during stopping
            }
            sourceNodeRef.current = null;

            // Clear buffer cache to force reload for new source
            audioBufferRef.current = null;

            setIsPlaying(false);
        }

        setCurrentAudioSource(sourceId);
    };

    return (
        <section id="spatial-audio" className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute top-1/2 right-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-green-500/10 rounded-full blur-[60px]"></div>

                {/* Grid overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center bg-green-500/10 px-4 py-2 rounded-full mb-4 border border-green-500/30"
                    >
                        <span className="text-green-400 text-sm font-medium">3D Audio Experience</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Spatial Audio</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-gray-300 max-w-2xl mx-auto"
                    >
                        Put on your headphones and immerse yourself in our spatial audio technology.
                        Hear the difference as sound moves naturally around you in three-dimensional space.
                    </motion.p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Glowing effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>

                        <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-green-900/80 via-emerald-900/80 to-green-900/80 p-6 border-b border-white/10">
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                                                <FiHeadphones className="text-white text-xl" />
                                            </div>

                                            {isPlaying && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full border-2 border-green-400"
                                                    initial={{ scale: 1, opacity: 1 }}
                                                    animate={{ scale: 1.5, opacity: 0 }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                />
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
                                        >
                                            {isMuted ? <FiVolumeX className="text-white" /> : <FiVolume2 className="text-white" />}
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

                                            <div className="grid grid-cols-3 gap-3 mb-6">
                                                {audioSources.map((source) => (
                                                    <button
                                                        key={source.id}
                                                        onClick={() => changeAudioSource(source.id)}
                                                        className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                                                            currentAudioSource === source.id
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
                                                />

                                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                                    <span>Subtle</span>
                                                    <span>Intense</span>
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <motion.button
                                                    onClick={() => void togglePlayback()}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                                                        isPlaying
                                                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                            : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                                                    }`}
                                                >
                                                    {isPlaying ? (
                                                        <>
                                                            <FiPause /> Stop Playback
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FiPlay /> Start Spatial Audio
                                                        </>
                                                    )}
                                                </motion.button>
                                            </div>
                                        </div>

                                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                                            <div className="flex gap-3">
                                                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                                    <FiInfo className="text-green-400" />
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
                                                {/* Animated spatial audio visualization */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="relative w-full h-full">
                                                        {/* Listener position (center) */}
                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center">
                                                                <FiHeadphones className="text-white" />
                                                            </div>

                                                            {/* Ripple effect around listener */}
                                                            {isPlaying && (
                                                                <>
                                                                    <motion.div
                                                                        className="absolute inset-0 rounded-full border border-white/20"
                                                                        initial={{ scale: 1, opacity: 0.5 }}
                                                                        animate={{ scale: 3, opacity: 0 }}
                                                                        transition={{ duration: 2, repeat: Infinity }}
                                                                    />
                                                                    <motion.div
                                                                        className="absolute inset-0 rounded-full border border-white/20"
                                                                        initial={{ scale: 1, opacity: 0.5 }}
                                                                        animate={{ scale: 2, opacity: 0 }}
                                                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                                                    />
                                                                </>
                                                            )}
                                                        </div>

                                                        {/* Sound source position indicator */}
                                                        {isPlaying && (
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0 }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    scale: 1
                                                                }}
                                                                transition={{ duration: 0.5 }}
                                                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                                                style={{
                                                                    marginLeft: `${audioPosition.x * 40}%`,
                                                                    marginTop: `${audioPosition.y * 40}%`,
                                                                    zIndex: audioPosition.z > 0 ? 0 : 10
                                                                }}
                                                            >
                                                                <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30 ${
                                                                    audioPosition.z < 0 ? 'opacity-100' : 'opacity-50'
                                                                }`} style={{
                                                                    transform: `scale(${1 - Math.min(0.5, Math.abs(audioPosition.z) / 10)})`
                                                                }}>
                                                                    <FiVolume2 className="text-white" />
                                                                </div>

                                                                {/* Sound waves from source */}
                                                                <motion.div
                                                                    className="absolute inset-0 rounded-full border-2 border-green-400/60"
                                                                    initial={{ scale: 1, opacity: 0.8 }}
                                                                    animate={{ scale: 2.5, opacity: 0 }}
                                                                    transition={{ duration: 1, repeat: Infinity }}
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Movement indicator */}
                                                {isPlaying && spatialIntensity > 0.1 && (
                                                    <div className="absolute bottom-2 right-2 bg-black/70 text-xs text-green-400 px-2 py-1 rounded-full flex items-center">
                                                        <FiRotateCw className="mr-1 animate-spin" style={{ animationDuration: '3s' }} />
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
                                                        <motion.div
                                                            className="h-full bg-gradient-to-r from-green-700 to-green-500 rounded-full"
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
                    </motion.div>

                    {/* Information box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center"
                    >
                        <div className="inline-flex items-center bg-green-500/20 px-5 py-3 rounded-full border border-green-500/30">
                            <FiHeadphones className="text-green-400 mr-2" />
                            <span className="text-green-300 text-sm">For the best experience, use headphones</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SpatialAudioDemo;