'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Define types for audio sources and environments
type AudioSource = {
    id: string;
    name: string;
    position: { x: number; y: number };
    color: string;
    icon: string;
    audioSrc: string;
};

type Environment = {
    id: string;
    name: string;
    description: string;
    image: string;
    reverbLevel: number;
    roomSize: number;
};

const SpatialAudioVisualization = () => {
    // State for intersection observer (animation trigger)
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // State for active environment and playing audio
    const [activeEnvironment, setActiveEnvironment] = useState('concert-hall');
    const [playingSource, setPlayingSource] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedSource, setDraggedSource] = useState<string | null>(null);

    // Ref for the visualization area dimensions
    const visualizationRef = useRef<HTMLDivElement>(null);

    // Audio source data
    const audioSources: AudioSource[] = [
        {
            id: 'music',
            name: 'Music',
            position: { x: 70, y: 30 },
            color: 'from-green-500 to-emerald-400',
            icon: '/assets/images/music.svg',
            audioSrc: '/audio/music-sample.mp3'
        },
        {
            id: 'voice',
            name: 'Voice',
            position: { x: 30, y: 40 },
            color: 'from-blue-500 to-indigo-400',
            icon: '/assets/images/voice.svg',
            audioSrc: '/audio/voice-sample.mp3'
        },
        {
            id: 'effects',
            name: 'Effects',
            position: { x: 75, y: 75 },
            color: 'from-amber-500 to-orange-400',
            icon: '/assets/images/effect.svg',
            audioSrc: '/audio/effects-sample.mp3'
        }
    ];

    // Environment presets
    const environments: Environment[] = [
        {
            id: 'concert-hall',
            name: 'Concert Hall',
            description: 'Large reverberant space with rich acoustics',
            image: '/assets/images/concert-hall.jpg',
            reverbLevel: 0.8,
            roomSize: 0.9
        },
        {
            id: 'gaming',
            name: 'Gaming',
            description: 'Precise positional audio for competitive edge',
            image: '/assets/images/gaming.webp',
            reverbLevel: 0.3,
            roomSize: 0.5
        },
        {
            id: 'studio',
            name: 'Recording Studio',
            description: 'Acoustically treated space for clarity',
            image: '/images/env-studio.webp',
            reverbLevel: 0.2,
            roomSize: 0.4
        },
        {
            id: 'theater',
            name: 'Theater',
            description: 'Balanced acoustics with moderate reverb',
            image: '/images/env-theater.webp',
            reverbLevel: 0.6,
            roomSize: 0.7
        }
    ];

    // Set up intersection observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Handle audio playback
    const playAudio = (sourceId: string) => {
        // In a real implementation, this would use the Web Audio API
        // to position the sound in 3D space with proper HRTF processing
        setPlayingSource(sourceId === playingSource ? null : sourceId);

        // Here you would actually play the audio with spatialization
        console.log(`Playing audio source: ${sourceId} in ${activeEnvironment} environment`);
    };

    // Handle source drag start
    const handleDragStart = (sourceId: string) => {
        setIsDragging(true);
        setDraggedSource(sourceId);
    };

    // Handle source dragging
    const handleDrag = (e: React.MouseEvent | React.TouchEvent, sourceId: string) => {
        if (!isDragging || draggedSource !== sourceId || !visualizationRef.current) return;

        // Get mouse/touch position relative to the visualization area
        const rect = visualizationRef.current.getBoundingClientRect();
        let clientX, clientY;

        if ('touches' in e) {
            // Touch event
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            // Mouse event
            clientX = e.clientX;
            clientY = e.clientY;
        }

        // Calculate position as percentage of container
        const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));

        // Update the source position
        const updatedSources = audioSources.map(source =>
            source.id === sourceId ? { ...source, position: { x, y } } : source
        );

        // In a real implementation, you would update state with the new positions
        console.log(`Moved source ${sourceId} to position (${x.toFixed(0)}%, ${y.toFixed(0)}%)`);
    };

    // Handle drag end
    const handleDragEnd = () => {
        setIsDragging(false);
        setDraggedSource(null);
    };

    // Get active environment data
    const activeEnv = environments.find(env => env.id === activeEnvironment) || environments[0];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    // Calculate distance from center for audio sources (for visualization purposes)
    const getDistanceFromCenter = (x: number, y: number) => {
        // Distance from center (50%, 50%)
        const dx = x - 50;
        const dy = y - 50;
        return Math.sqrt(dx * dx + dy * dy) / 50; // Normalized to 0-1 range
    };

    return (
        <section ref={sectionRef} className="py-24 bg-black overflow-hidden relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/3 w-1/3 h-1/3 rounded-full bg-gradient-to-br from-green-500/5 to-emerald-500/5 blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-1/4 h-1/4 rounded-full bg-gradient-to-br from-green-500/5 to-emerald-500/5 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7 }}
                >
          <span className="inline-block mb-3 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-medium rounded-full px-3 py-1 text-sm border border-green-500/20 bg-black">
            IMMERSIVE AUDIO
          </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Feel the sound all around you
                    </h2>
                    <p className="text-gray-300 max-w-3xl mx-auto text-lg">
                        JyvDesktop's advanced spatial audio processing creates an immersive 3D soundscape,
                        positioning each sound source precisely where you want it.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-5 gap-8 items-start">
                    {/* Environment selection - 1 column on mobile, 1 column on desktop */}
                    <motion.div
                        className="md:col-span-1"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                    >
                        <motion.div variants={itemVariants} className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-3">Audio Environments</h3>
                            <p className="text-gray-400 text-sm">
                                Select an environment to hear how JyvDesktop transforms your audio
                            </p>
                        </motion.div>

                        <div className="space-y-3">
                            {environments.map((env) => (
                                <motion.button
                                    key={env.id}
                                    variants={itemVariants}
                                    onClick={() => setActiveEnvironment(env.id)}
                                    className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 border ${
                                        activeEnvironment === env.id
                                            ? "bg-gradient-to-r from-green-500/20 to-emerald-500/10 border-green-500/30"
                                            : "bg-gray-900 border-gray-800 hover:bg-gray-800"
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-lg overflow-hidden ${
                                        activeEnvironment === env.id ? "ring-2 ring-green-500" : ""
                                    }`}>
                                        <Image
                                            src={env.image}
                                            alt={env.name}
                                            width={40}
                                            height={40}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="ml-3 text-left">
                                        <div className={`font-medium ${
                                            activeEnvironment === env.id ? "text-green-400" : "text-white"
                                        }`}>
                                            {env.name}
                                        </div>
                                        <div className="text-xs text-gray-400 line-clamp-1">
                                            {env.description}
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        {/* Environment parameters */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-6 p-4 bg-gray-900 rounded-xl border border-gray-800"
                        >
                            <h4 className="text-sm font-medium text-white mb-4">Environment Settings</h4>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">Reverb Level</span>
                                        <span className="text-green-400">{Math.round(activeEnv.reverbLevel * 100)}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                                            style={{ width: `${activeEnv.reverbLevel * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">Room Size</span>
                                        <span className="text-green-400">{Math.round(activeEnv.roomSize * 100)}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                                            style={{ width: `${activeEnv.roomSize * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* 3D Audio visualization - 3 columns on desktop */}
                    <motion.div
                        className="md:col-span-3 min-h-[500px]"
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="relative bg-gray-900 rounded-xl border border-gray-800 overflow-hidden h-full min-h-[500px] backdrop-blur-sm">
                            {/* Environment visualization background */}
                            <div className="absolute inset-0 opacity-20">
                                <Image
                                    src={activeEnv.image}
                                    alt={activeEnv.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            </div>

                            {/* Sound stage visualization area */}
                            <div
                                ref={visualizationRef}
                                className="absolute inset-0 p-6"
                                onMouseUp={handleDragEnd}
                                onMouseLeave={handleDragEnd}
                                onTouchEnd={handleDragEnd}
                            >
                                {/* Concentric circles representing sound field */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute rounded-full border border-green-500/10"
                                            style={{
                                                width: `${(i + 1) * 25}%`,
                                                height: `${(i + 1) * 25}%`,
                                                opacity: 1 - (i * 0.2)
                                            }}
                                        ></div>
                                    ))}
                                </div>

                                {/* Listener position (center) */}
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                    <div className="relative">
                                        {/* Listener icon */}
                                        <div className="w-16 h-16 rounded-full bg-black/50 border border-green-500/30 flex items-center justify-center shadow-lg shadow-green-900/20">
                                            <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M19 14C19 11.2386 15.866 9 12 9C8.13401 9 5 11.2386 5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M12 19C13.1046 19 14 18.1046 14 17C14 15.8954 13.1046 15 12 15C10.8954 15 10 15.8954 10 17C10 18.1046 10.8954 19 12 19Z" fill="currentColor"/>
                                            </svg>
                                        </div>

                                        {/* Pulse animation */}
                                        <div className="absolute inset-0 rounded-full border border-green-500/30 animate-ping-slow opacity-60"></div>
                                    </div>
                                </div>

                                {/* Audio sources */}
                                {audioSources.map((source) => {
                                    // Distance from center affects visual properties
                                    const distance = getDistanceFromCenter(source.position.x, source.position.y);
                                    const isPlaying = playingSource === source.id;

                                    return (
                                        <div
                                            key={source.id}
                                            className="absolute cursor-move"
                                            style={{
                                                left: `${source.position.x}%`,
                                                top: `${source.position.y}%`,
                                                transform: 'translate(-50%, -50%)',
                                                zIndex: isPlaying ? 20 : 10
                                            }}
                                            onMouseDown={() => handleDragStart(source.id)}
                                            onTouchStart={() => handleDragStart(source.id)}
                                            onMouseMove={(e) => handleDrag(e, source.id)}
                                            onTouchMove={(e) => handleDrag(e, source.id)}
                                        >
                                            {/* Source icon button */}
                                            <motion.div
                                                className={`relative bg-gradient-to-br ${source.color} p-0.5 rounded-full shadow-lg shadow-black/30`}
                                                animate={{
                                                    scale: isPlaying ? [1, 1.05, 1] : 1
                                                }}
                                                transition={{
                                                    repeat: isPlaying ? Infinity : 0,
                                                    duration: 1.5
                                                }}
                                            >
                                                <button
                                                    onClick={() => playAudio(source.id)}
                                                    className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center relative hover:bg-black/60 transition-colors"
                                                >
                                                    <Image
                                                        src={source.icon}
                                                        alt={source.name}
                                                        width={24}
                                                        height={24}
                                                        className="w-6 h-6 object-contain"
                                                    />

                                                    {/* Playing indicator */}
                                                    {isPlaying && (
                                                        <div className="absolute -right-1 -top-1 w-4 h-4 bg-green-500 rounded-full"></div>
                                                    )}
                                                </button>
                                            </motion.div>

                                            {/* Sound waves visualization for playing sources */}
                                            {isPlaying && (
                                                <div className="absolute inset-0 pointer-events-none">
                                                    {[...Array(3)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`absolute inset-0 rounded-full border bg-gradient-to-br ${source.color} opacity-0`}
                                                            style={{
                                                                animationName: 'soundWave',
                                                                animationDuration: '2s',
                                                                animationTimingFunction: 'ease-out',
                                                                animationIterationCount: 'infinite',
                                                                animationDelay: `${i * 0.5}s`
                                                            }}
                                                        ></div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Source label */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-black/70 text-white border border-gray-800">
                          {source.name}
                        </span>
                                            </div>

                                            {/* Connection line to listener */}
                                            <svg
                                                className="absolute top-1/2 left-1/2 -z-10 pointer-events-none"
                                                width={Math.abs(50 - source.position.x) * 2}
                                                height={Math.abs(50 - source.position.y) * 2}
                                                style={{
                                                    transformOrigin: 'center',
                                                    transform: `rotate(${Math.atan2(50 - source.position.y, 50 - source.position.x) * (180 / Math.PI)}deg)`
                                                }}
                                            >
                                                <defs>
                                                    <linearGradient id={`line-gradient-${source.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor={isPlaying ? '#22C55E' : '#374151'} stopOpacity="0.6" />
                                                        <stop offset="100%" stopColor={isPlaying ? '#22C55E' : '#374151'} stopOpacity="0.1" />
                                                    </linearGradient>
                                                </defs>
                                                <line
                                                    x1="0"
                                                    y1="0"
                                                    x2="100%"
                                                    y2="0"
                                                    stroke={`url(#line-gradient-${source.id})`}
                                                    strokeWidth="1"
                                                    strokeDasharray={isPlaying ? "3 3" : "2 4"}
                                                    strokeDashoffset={isPlaying ? -300 : 0}
                                                    style={{
                                                        animation: isPlaying ? 'lineDash 20s linear infinite' : 'none'
                                                    }}
                                                />
                                            </svg>
                                        </div>
                                    );
                                })}

                                {/* Instructions overlay */}
                                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-gray-800">
                                    <div className="flex items-center text-sm text-gray-300">
                                        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Click sources to play audio samples. Drag them to reposition in 3D space.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Audio controls and info panel - 1 column on desktop */}
                    <motion.div
                        className="md:col-span-1"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                    >
                        <motion.div variants={itemVariants} className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-3">Source Controls</h3>
                            <p className="text-gray-400 text-sm">
                                Adjust individual audio sources in your spatial environment
                            </p>
                        </motion.div>

                        {/* Audio source controls */}
                        <div className="space-y-4">
                            {audioSources.map((source) => (
                                <motion.div
                                    key={source.id}
                                    variants={itemVariants}
                                    className={`p-4 rounded-xl transition-all duration-300 ${
                                        playingSource === source.id
                                            ? "bg-gradient-to-r from-gray-900 to-gray-900/80 border border-green-500/30"
                                            : "bg-gray-900 border border-gray-800"
                                    }`}
                                >
                                    <div className="flex items-center mb-3">
                                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${source.color} p-1 mr-3`}>
                                            <Image
                                                src={source.icon}
                                                alt={source.name}
                                                width={24}
                                                height={24}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="font-medium text-white">{source.name}</div>
                                        </div>
                                        <button
                                            onClick={() => playAudio(source.id)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                                playingSource === source.id
                                                    ? "bg-green-500 text-black"
                                                    : "bg-gray-800 text-white hover:bg-gray-700"
                                            }`}
                                        >
                                            {playingSource === source.id ? (
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <rect x="6" y="6" width="12" height="12" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>

                                    {/* Volume control */}
                                    <div className="mb-3">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-gray-400">Volume</span>
                                            <span className="text-green-400">85%</span>
                                        </div>
                                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${source.color}`}
                                                style={{ width: "85%" }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Distance from listener */}
                                    <div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-gray-400">Distance</span>
                                            <span className="text-green-400">
                        {Math.round(getDistanceFromCenter(source.position.x, source.position.y) * 100)}%
                      </span>
                                        </div>
                                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${source.color}`}
                                                style={{
                                                    width: `${getDistanceFromCenter(source.position.x, source.position.y) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Spatial Audio Benefits */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-6 p-4 bg-gradient-to-br from-black to-gray-900 rounded-xl border border-green-500/20"
                        >
                            <h4 className="text-green-500 font-medium mb-3">Spatial Audio Benefits</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-300">Improved focus with positional separation</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-300">Reduced listening fatigue during long sessions</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-300">Enhanced gaming awareness with precise positioning</span>
                                </li>
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Before/After comparison */}
                <motion.div
                    className="mt-24 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-white mb-4">Standard Audio vs. JyvDesktop Spatial Audio</h3>
                        <p className="text-gray-300">
                            Experience the transformative difference of JyvDesktop's spatial audio technology
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Standard Audio */}
                        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
                            <div className="p-4 border-b border-gray-800 flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-800 mr-3 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-medium">Standard Audio</h4>
                                    <p className="text-xs text-gray-400">Flat, overlapping sound</p>
                                </div>
                            </div>

                            <div className="relative h-48 bg-gray-950">
                                {/* Sound visualization for standard audio */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-full h-20" viewBox="0 0 500 100" preserveAspectRatio="none">
                                        <path
                                            d="M0,50 Q25,30 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50 T450,50 T500,50"
                                            stroke="#4B5563"
                                            strokeWidth="1"
                                            fill="none"
                                        />
                                        <path
                                            d="M0,50 Q25,70 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50 T450,50 T500,50"
                                            stroke="#4B5563"
                                            strokeWidth="1"
                                            fill="none"
                                        />

                                        <path
                                            d="M0,50 Q25,10 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50 T450,50 T500,50"
                                            stroke="#9CA3AF"
                                            strokeWidth="1"
                                            fill="none"
                                        />
                                        <path
                                            d="M0,50 Q25,90 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50 T450,50 T500,50"
                                            stroke="#9CA3AF"
                                            strokeWidth="1"
                                            fill="none"
                                        />
                                    </svg>
                                </div>

                                {/* Sound icons stacked on top of each other */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                                    {audioSources.map((source) => (
                                        <div key={source.id} className="flex items-center bg-gray-800/50 rounded-full px-3 py-1">
                                            <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${source.color} mr-2`}></div>
                                            <span className="text-xs text-gray-300">{source.name}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Audio player bar */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="bg-gray-800 h-1 w-full rounded-full overflow-hidden">
                                        <div className="bg-gray-600 h-full w-3/4"></div>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span className="text-xs text-gray-500">0:45</span>
                                        <span className="text-xs text-gray-500">1:00</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 border-t border-gray-800">
                                <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm">
                                    Listen to standard audio
                                </button>
                            </div>
                        </div>

                        {/* JyvDesktop Spatial Audio */}
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-green-500/30 shadow-lg shadow-green-900/10">
                            <div className="p-4 border-b border-gray-800 flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mr-3 flex items-center justify-center text-black">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17 20c-.29 0-.56-.06-.76-.15-.71-.37-1.21-.88-1.71-2.38-.51-1.56-1.47-2.29-2.39-3-.79-.61-1.61-1.24-2.32-2.53C9.29 10.98 9 9.93 9 9c0-2.8 2.2-5 5-5s5 2.2 5 5h2c0-3.93-3.07-7-7-7S7 5.07 7 9c0 1.26.38 2.65 1.07 3.9.91 1.65 1.98 2.48 2.85 3.15.81.62 1.39 1.07 1.71 2.05.6 1.82 1.37 2.84 2.73 3.55.51.23 1.07.35 1.64.35 2.21 0 4-1.79 4-4h-2c0 1.1-.9 2-2 2zM7.64 2.64L6.22 1.22C4.23 3.21 3 5.96 3 9s1.23 5.79 3.22 7.78l1.41-1.41C6.01 13.74 5 11.49 5 9s1.01-4.74 2.64-6.36zM11.5 9c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-medium">JyvDesktop Spatial Audio</h4>
                                    <p className="text-xs text-green-400">3D positioned sound</p>
                                </div>
                            </div>

                            <div className="relative h-48 bg-black">
                                {/* 3D Sound visualization for JyvDesktop */}
                                <div className="absolute inset-0">
                                    {/* Concentric circles */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {[...Array(3)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute rounded-full border border-green-500/10"
                                                style={{
                                                    width: `${(i + 1) * 30}%`,
                                                    height: `${(i + 1) * 30}%`,
                                                    opacity: 0.5 - i * 0.1
                                                }}
                                            ></div>
                                        ))}
                                    </div>

                                    {/* Sound wave visualization */}
                                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                        <svg className="w-full h-40" viewBox="0 0 500 200" preserveAspectRatio="none">
                                            {/* First source waves */}
                                            <g className="opacity-60">
                                                <path
                                                    d="M0,100 Q70,50 125,100 T250,100"
                                                    stroke="url(#wave-gradient-1)"
                                                    strokeWidth="1.5"
                                                    fill="none"
                                                />
                                                <path
                                                    d="M0,100 Q70,150 125,100 T250,100"
                                                    stroke="url(#wave-gradient-1)"
                                                    strokeWidth="1.5"
                                                    fill="none"
                                                />
                                            </g>

                                            {/* Second source waves */}
                                            <g className="opacity-60">
                                                <path
                                                    d="M500,100 Q430,30 375,100 T250,100"
                                                    stroke="url(#wave-gradient-2)"
                                                    strokeWidth="1.5"
                                                    fill="none"
                                                />
                                                <path
                                                    d="M500,100 Q430,170 375,100 T250,100"
                                                    stroke="url(#wave-gradient-2)"
                                                    strokeWidth="1.5"
                                                    fill="none"
                                                />
                                            </g>

                                            {/* Third source waves */}
                                            <g className="opacity-60">
                                                <path
                                                    d="M250,200 Q250,160 250,100"
                                                    stroke="url(#wave-gradient-3)"
                                                    strokeWidth="1.5"
                                                    fill="none"
                                                />
                                                <path
                                                    d="M270,200 Q270,160 270,130 Q270,100 250,100"
                                                    stroke="url(#wave-gradient-3)"
                                                    strokeWidth="1.5"
                                                    fill="none"
                                                />
                                                <path
                                                    d="M230,200 Q230,160 230,130 Q230,100 250,100"
                                                    stroke="url(#wave-gradient-3)"
                                                    strokeWidth="1.5"
                                                    fill="none"
                                                />
                                            </g>

                                            {/* Gradients */}
                                            <defs>
                                                <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#22C55E" stopOpacity="0.1" />
                                                    <stop offset="50%" stopColor="#22C55E" stopOpacity="0.7" />
                                                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0.1" />
                                                </linearGradient>
                                                <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
                                                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.7" />
                                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                                                </linearGradient>
                                                <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.1" />
                                                    <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.7" />
                                                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>

                                    {/* Positioned sound icons */}
                                    <div className="absolute left-1/4 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
                                        <div className="bg-gradient-to-br from-green-500 to-emerald-400 rounded-full p-0.5">
                                            <div className="bg-black/70 rounded-full p-1.5">
                                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute right-1/4 top-1/4 transform translate-x-1/2 -translate-y-1/2">
                                        <div className="bg-gradient-to-br from-blue-500 to-indigo-400 rounded-full p-0.5">
                                            <div className="bg-black/70 rounded-full p-1.5">
                                                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                                                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute right-1/3 bottom-1/4 transform translate-x-1/2 translate-y-1/2">
                                        <div className="bg-gradient-to-br from-amber-500 to-orange-400 rounded-full p-0.5">
                                            <div className="bg-black/70 rounded-full p-1.5">
                                                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M7.76 16.24C6.67 15.16 6 13.66 6 12s.67-3.16 1.76-4.24l1.42 1.42C8.45 9.9 8 10.9 8 12c0 1.1.45 2.1 1.17 2.83l-1.41 1.41zm8.48 0C17.33 15.16 18 13.66 18 12s-.67-3.16-1.76-4.24l-1.42 1.42C15.55 9.9 16 10.9 16 12c0 1.1-.45 2.1-1.17 2.83l1.41 1.41zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Listener position (center) */}
                                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-black border border-green-500/30 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M12 19C13.1046 19 14 18.1046 14 17C14 15.8954 13.1046 15 12 15C10.8954 15 10 15.8954 10 17C10 18.1046 10.8954 19 12 19Z" fill="currentColor"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Audio player bar */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="bg-gray-800 h-1 w-full rounded-full overflow-hidden">
                                        <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-full w-3/4"></div>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span className="text-xs text-gray-400">0:45</span>
                                        <span className="text-xs text-gray-400">1:00</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 border-t border-gray-800">
                                <button className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-medium rounded-lg transition-colors text-sm">
                                    Experience spatial audio
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Technology explanation */}
                <motion.div
                    className="mt-24 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
              <span className="inline-block mb-3 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-medium px-3 py-1 text-sm border border-green-500/20 bg-black rounded-full">
                THE TECHNOLOGY
              </span>
                            <h3 className="text-2xl font-bold text-white mb-6">
                                How JyvDesktop's Spatial Audio Works
                            </h3>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    Our advanced HRTF (Head-Related Transfer Function) technology simulates how sound interacts
                                    with your head and ears, creating a precise three-dimensional audio experience.
                                </p>
                                <p>
                                    Unlike standard stereo, JyvDesktop processes each sound source independently, applying complex
                                    binaural algorithms that replicate natural acoustic properties.
                                </p>
                            </div>

                            {/* Technology highlights */}
                            <div className="mt-8 space-y-4">
                                {[
                                    {
                                        title: "Personalized HRTF Processing",
                                        description: "Customized audio filtering based on ear and head anatomy"
                                    },
                                    {
                                        title: "Real-time Dynamic Positioning",
                                        description: "Sound sources adapt instantly as you reposition them"
                                    },
                                    {
                                        title: "Environmental Acoustics",
                                        description: "Accurate simulation of different acoustic spaces"
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-400">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            {/* Technology visualization */}
                            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-green-500/10 p-6 shadow-xl">
                                {/* Top right decorative element */}
                                <div className="absolute -top-10 -right-10 w-20 h-20 bg-green-500/10 rounded-full blur-xl"></div>

                                {/* Audio processing diagram */}
                                <div className="relative z-10">
                                    <div className="flex flex-col items-center">
                                        {/* Sound source icons */}
                                        <div className="grid grid-cols-3 gap-6 w-full mb-8">
                                            {audioSources.map((source) => (
                                                <div key={source.id} className="flex flex-col items-center">
                                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${source.color} p-0.5 mb-2`}>
                                                        <div className="w-full h-full rounded-full bg-black/80 flex items-center justify-center">
                                                            <Image
                                                                src={source.icon}
                                                                alt={source.name}
                                                                width={24}
                                                                height={24}
                                                                className="w-6 h-6 object-contain"
                                                            />
                                                        </div>
                                                    </div>
                                                    <span className="text-gray-400 text-sm">{source.name}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Arrows down */}
                                        <div className="flex justify-center space-x-12 mb-4">
                                            {[...Array(3)].map((_, i) => (
                                                <svg key={i} className="w-6 h-8 text-green-500" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            ))}
                                        </div>

                                        {/* Processing unit */}
                                        <div className="w-full p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20 mb-8">
                                            <div className="flex items-center justify-center mb-3">
                                                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                                </svg>
                                                <h4 className="text-white font-medium">HRTF Processing Engine</h4>
                                            </div>

                                            <div className="grid grid-cols-3 gap-2 text-xs text-center">
                                                <div className="bg-black/50 rounded p-2 text-green-400">
                                                    <span>Position</span>
                                                </div>
                                                <div className="bg-black/50 rounded p-2 text-green-400">
                                                    <span>Distance</span>
                                                </div>
                                                <div className="bg-black/50 rounded p-2 text-green-400">
                                                    <span>Environment</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Arrow down */}
                                        <svg className="w-8 h-8 text-green-500 mb-4" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                        {/* Headphones/speakers output */}
                                        <div className="flex items-center space-x-6">
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-black border border-green-500/30 flex items-center justify-center mb-2">
                                                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-400 text-sm">Headphones</span>
                                            </div>

                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-black border border-green-500/30 flex items-center justify-center mb-2">
                                                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l3.536-3.536M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-400 text-sm">Speakers</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative code snippet */}
                            <div className="absolute -bottom-8 -right-8 max-w-xs bg-gray-900 rounded-lg border border-gray-800 shadow-lg p-4 text-sm font-mono text-gray-300 transform rotate-3">
                                <div className="text-gray-500 mb-2">{/* HRTF processing snippet */}</div>
                                <div><span className="text-purple-400">function</span> <span className="text-blue-400">processHRTF</span>(source, listener) {'{'}</div>
                                <div className="pl-4"><span className="text-purple-400">const</span> azimuth = <span className="text-blue-400">calculateAzimuth</span>(source, listener);</div>
                                <div className="pl-4"><span className="text-purple-400">const</span> elevation = <span className="text-blue-400">calculateElevation</span>(source, listener);</div>
                                <div className="pl-4"><span className="text-purple-400">return</span> <span className="text-blue-400">applyBinauralFilters</span>(source.<span className="text-yellow-400">buffer</span>, azimuth, elevation);</div>
                                <div>{'}'}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA section */}
                <motion.div
                    className="mt-24 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 1 }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                        Experience true spatial audio today
                    </h3>
                    <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                        Transform how you hear digital audio with JyvDesktop's advanced spatial audio technology.
                        Try it free for 14 days with full access to all features.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="#download"
                            className="inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-bold rounded-full transition-all duration-300 shadow-lg shadow-green-900/20 group"
                        >
                            <span>Download JyvDesktop</span>
                            <svg
                                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>

                        <a
                            href="#learn-more"
                            className="inline-flex items-center gap-2 px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-full transition-all duration-300 border border-gray-800"
                        >
                            <span>Learn more about spatial audio</span>
                        </a>
                    </div>
                </motion.div>

                {/* FAQ Accordion */}
                <motion.div
                    className="mt-24 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 1.1 }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h3>
                        <p className="text-gray-300">
                            Everything you need to know about JyvDesktop's spatial audio technology
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                question: "Do I need special headphones to experience spatial audio?",
                                answer: "No, JyvDesktop's spatial audio works with any headphones or earbuds. However, higher quality headphones will deliver a more immersive experience. For best results, we recommend using over-ear headphones with a wide frequency response."
                            },
                            {
                                question: "How is this different from surround sound?",
                                answer: "Traditional surround sound relies on multiple physical speakers positioned around you. JyvDesktop's spatial audio creates a fully three-dimensional sound field using just two channels (stereo), precisely calculating how sound waves interact with your head and ears to create a natural, immersive experience."
                            },
                            {
                                question: "Can I use spatial audio for gaming?",
                                answer: "Absolutely! In fact, gaming is one of the best applications for spatial audio. JyvDesktop can enhance your gaming experience by providing precise audio positioning, helping you locate enemies, identify environmental cues, and immerse yourself more deeply in game worlds."
                            },
                            {
                                question: "Does spatial audio work with all applications?",
                                answer: "Yes, JyvDesktop processes audio at the system level, which means it works with virtually any application that produces sound. This includes streaming services, video conferencing tools, games, media players, and more."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                                <details className="group">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                                        <h4 className="text-white font-medium text-lg">{faq.question}</h4>
                                        <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                      <svg className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0 transition-opacity text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <svg className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100 transition-opacity text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                      </svg>
                    </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-300">
                                        <p>{faq.answer}</p>
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Add necessary CSS for animations */}
            <style jsx global>{`
        @keyframes soundWave {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
        
        @keyframes lineDash {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          70% {
            transform: scale(2);
            opacity: 0;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
        </section>
    );
};

export default SpatialAudioVisualization;
