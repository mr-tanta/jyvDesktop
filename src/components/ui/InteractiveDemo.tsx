'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiChevronRight, FiCheck, FiInfo, FiHeadphones } from 'react-icons/fi';

export default function InteractiveDemo() {
    const [isPlaying, setIsPlaying] = useState<'original' | 'enhanced' | null>(null);
    const [activeTab, setActiveTab] = useState<'original' | 'enhanced'>('original');
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [isMuted, setIsMuted] = useState(false);
    const [particles, setParticles] = useState<Array<{ top: number; left: number; delay: number }>>([]);
    
    const originalAudioRef = useRef<HTMLAudioElement>(null);
    const enhancedAudioRef = useRef<HTMLAudioElement>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    

    const demoAudio = {
        original: '/assets/audio/noisy.m4a',
        enhanced: '/assets/audio/cleaned-demo.wav'
    };
    
    // Frequency data for visualization
    const originalFrequencyData = [0.3, 0.5, 0.7, 0.8, 0.6, 0.4, 0.7, 0.8, 0.9, 0.7, 0.6, 0.5, 0.8, 0.7, 0.6];
    const enhancedFrequencyData = [0.2, 0.3, 0.4, 0.5, 0.3, 0.2, 0.4, 0.5, 0.6, 0.4, 0.3, 0.2, 0.5, 0.4, 0.3];
    
    // Audio metrics for comparison
    const audioMetrics = {
        original: {
            noiseLevel: '72%',
            clarity: '34%',
            background: '68%',
            voice: '42%'
        },
        enhanced: {
            noiseLevel: '3%',
            clarity: '98%',
            background: '2%',
            voice: '99%'
        }
    };
    
    // Handle play/pause for original audio
    const togglePlayOriginal = () => {
        if (!originalAudioRef.current) return;
        
        if (isPlaying === 'original') {
            originalAudioRef.current.pause();
            setIsPlaying(null);
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
            }
        } else {
            if (isPlaying === 'enhanced' && enhancedAudioRef.current) {
                enhancedAudioRef.current.pause();
            }
            
            originalAudioRef.current.volume = isMuted ? 0 : volume;
            originalAudioRef.current.currentTime = 0;
            originalAudioRef.current.play().catch(err => {
                console.error('Error playing original audio:', err);
            });
            
            setIsPlaying('original');
            setActiveTab('original');
            
            // Update progress bar
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
            
            progressIntervalRef.current = setInterval(() => {
                if (originalAudioRef.current) {
                    const currentProgress = (originalAudioRef.current.currentTime / originalAudioRef.current.duration) * 100;
                    setProgress(currentProgress);
                    
                    if (currentProgress >= 100) {
                        setIsPlaying(null);
                        clearInterval(progressIntervalRef.current!);
                        progressIntervalRef.current = null;
                    }
                }
            }, 100);
        }
    };
    
    // Handle play/pause for enhanced audio
    const togglePlayEnhanced = () => {
        if (!enhancedAudioRef.current) return;
        
        if (isPlaying === 'enhanced') {
            enhancedAudioRef.current.pause();
            setIsPlaying(null);
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
            }
        } else {
            if (isPlaying === 'original' && originalAudioRef.current) {
                originalAudioRef.current.pause();
            }
            
            enhancedAudioRef.current.volume = isMuted ? 0 : volume;
            enhancedAudioRef.current.currentTime = 0;
            enhancedAudioRef.current.play().catch(err => {
                console.error('Error playing enhanced audio:', err);
            });
            
            setIsPlaying('enhanced');
            setActiveTab('enhanced');
            
            // Update progress bar
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
            
            progressIntervalRef.current = setInterval(() => {
                if (enhancedAudioRef.current) {
                    const currentProgress = (enhancedAudioRef.current.currentTime / enhancedAudioRef.current.duration) * 100;
                    setProgress(currentProgress);
                    
                    if (currentProgress >= 100) {
                        setIsPlaying(null);
                        clearInterval(progressIntervalRef.current!);
                        progressIntervalRef.current = null;
                    }
                }
            }, 100);
        }
    };
    
    // Toggle mute
    const toggleMute = () => {
        setIsMuted(!isMuted);
        
        if (originalAudioRef.current) {
            originalAudioRef.current.muted = !isMuted;
        }
        
        if (enhancedAudioRef.current) {
            enhancedAudioRef.current.muted = !isMuted;
        }
    };
    
    // Handle volume change
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        
        if (!isMuted) {
            if (originalAudioRef.current) {
                originalAudioRef.current.volume = newVolume;
            }
            
            if (enhancedAudioRef.current) {
                enhancedAudioRef.current.volume = newVolume;
            }
        }
    };
    
    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
            
            if (originalAudioRef.current) {
                originalAudioRef.current.pause();
            }
            
            if (enhancedAudioRef.current) {
                enhancedAudioRef.current.pause();
            }
        };
    }, []);
    
    // Handle audio ended events
    useEffect(() => {
        const handleOriginalEnded = () => {
            setIsPlaying(null);
            setProgress(0);
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
            }
        };
        
        const handleEnhancedEnded = () => {
            setIsPlaying(null);
            setProgress(0);
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
            }
        };
        
        if (originalAudioRef.current) {
            originalAudioRef.current.addEventListener('ended', handleOriginalEnded);
        }
        
        if (enhancedAudioRef.current) {
            enhancedAudioRef.current.addEventListener('ended', handleEnhancedEnded);
        }
        
        return () => {
            if (originalAudioRef.current) {
                originalAudioRef.current.removeEventListener('ended', handleOriginalEnded);
            }
            
            if (enhancedAudioRef.current) {
                enhancedAudioRef.current.removeEventListener('ended', handleEnhancedEnded);
            }
        };
    }, []);

    // Generate particles on client side
    useEffect(() => {
        const newParticles = Array(20).fill(0).map(() => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            delay: Math.random() * 5
        }));
        setParticles(newParticles);
    }, []);
    
    return (
        <section id="demo" className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute top-1/2 right-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-green-500/10 rounded-full blur-[60px]"></div>
                
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]"></div>
            </div>
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                {particles.map((particle, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-green-400"
                        style={{
                            top: `${particle.top}%`,
                            left: `${particle.left}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 5,
                            repeat: Infinity,
                            delay: particle.delay,
                        }}
                    />
                ))}
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
                        <span className="text-green-400 text-sm font-medium">Interactive Demo</span>
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Magic</span>
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-gray-300 max-w-2xl mx-auto"
                    >
                        Hear the dramatic difference our AI makes to your audio quality.
                        Crystal clear sound, free from background noise and distractions.
                    </motion.p>
                </div>
                
                <motion.div 
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="relative">
                        {/* Glow effect behind the player */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-20 blur-xl"></div>
                        
                        <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                            {/* Audio Player Header */}
                            <div className="bg-gradient-to-r from-green-900/80 via-emerald-900/80 to-green-900/80 p-8 border-b border-white/10">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                                                <FiHeadphones className="text-white text-2xl" />
                                            </div>
                                            {isPlaying && (
                                                <>
                                                    <motion.div 
                                                        className="absolute inset-0 rounded-full border-2 border-green-400"
                                                        initial={{ scale: 1, opacity: 1 }}
                                                        animate={{ scale: 1.4, opacity: 0 }}
                                                        transition={{ duration: 1.5, repeat: Infinity }}
                                                    />
                                                    <motion.div 
                                                        className="absolute inset-0 rounded-full border-2 border-emerald-400"
                                                        initial={{ scale: 1, opacity: 1 }}
                                                        animate={{ scale: 1.8, opacity: 0 }}
                                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                                    />
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white">Audio Enhancement</h3>
                                            <p className="text-green-300 text-sm mt-1">Experience the difference with JyvDesktop</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={toggleMute}
                                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors shadow-inner shadow-white/5"
                                        >
                                            {isMuted ? <FiVolumeX className="text-white" /> : <FiVolume2 className="text-white" />}
                                        </button>
                                        
                                        <div className="w-32 md:w-40 bg-white/5 rounded-full p-1">
                                            <input 
                                                type="range" 
                                                min="0" 
                                                max="1" 
                                                step="0.01" 
                                                value={volume} 
                                                onChange={handleVolumeChange}
                                                className="w-full accent-green-500 h-1 rounded-full appearance-none cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Comparison Tabs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                                {/* Original Audio Panel */}
                                <div className={`p-8 transition-colors ${activeTab === 'original' ? 'bg-black/50' : 'bg-black/80'}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h4 className="text-xl font-bold text-white flex items-center">
                                                Original Recording
                                                <span className="ml-3 text-xs font-normal px-2 py-1 bg-red-500/20 text-red-400 rounded-full">Unprocessed</span>
                                            </h4>
                                            <p className="text-gray-400 text-sm mt-1">Raw audio with background noise</p>
                                        </div>
                                        <motion.button
                                            onClick={togglePlayOriginal}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`p-4 rounded-full shadow-lg ${
                                                isPlaying === 'original'
                                                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-500/30'
                                                    : 'bg-white/5 text-green-400 hover:bg-white/10 border border-green-500/30'
                                            }`}
                                        >
                                            {isPlaying === 'original' ? <FiPause size={24} /> : <FiPlay size={24} />}
                                        </motion.button>
                                    </div>
                                    
                                    {/* Original Audio Visualization */}
                                    <div className="h-40 bg-black/50 rounded-xl p-4 flex items-end justify-between gap-1 border border-white/5 shadow-inner shadow-black/50">
                                        {originalFrequencyData.map((value, index) => (
                                            <motion.div
                                                key={index}
                                                className="bg-gradient-to-t from-green-600 to-green-400 rounded-t w-full"
                                                initial={{ height: 0 }}
                                                animate={{ 
                                                    height: isPlaying === 'original' 
                                                        ? `${value * 100}%` 
                                                        : `${value * 40}%` 
                                                }}
                                                transition={{ 
                                                    duration: 0.5, 
                                                    repeat: isPlaying === 'original' ? Infinity : 0,
                                                    repeatType: 'reverse'
                                                }}
                                            />
                                        ))}
                                    </div>
                                    
                                    {/* Audio Metrics */}
                                    <div className="mt-6 space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <p className="text-gray-400 text-xs">Noise Level</p>
                                                <p className="text-white font-medium text-xs">{audioMetrics.original.noiseLevel}</p>
                                            </div>
                                            <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                                                <motion.div 
                                                    className="h-full bg-gradient-to-r from-red-500 to-red-400"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: audioMetrics.original.noiseLevel }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <p className="text-gray-400 text-xs">Voice Clarity</p>
                                                <p className="text-white font-medium text-xs">{audioMetrics.original.clarity}</p>
                                            </div>
                                            <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                                                <motion.div 
                                                    className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: audioMetrics.original.clarity }}
                                                    transition={{ duration: 1, delay: 0.3 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Enhanced Audio Panel */}
                                <div className={`p-8 transition-colors ${activeTab === 'enhanced' ? 'bg-black/50' : 'bg-black/80'}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h4 className="text-xl font-bold text-white flex items-center">
                                                JYV Enhanced
                                                <span className="ml-3 text-xs font-normal px-2 py-1 bg-green-500/20 text-green-400 rounded-full flex items-center">
                                                    <FiCheck size={10} className="mr-1" /> Processed
                                                </span>
                                            </h4>
                                            <p className="text-gray-400 text-sm mt-1">Crystal clear audio with AI processing</p>
                                        </div>
                                        <motion.button
                                            onClick={togglePlayEnhanced}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`p-4 rounded-full shadow-lg ${
                                                isPlaying === 'enhanced'
                                                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-500/30'
                                                    : 'bg-white/5 text-emerald-400 hover:bg-white/10 border border-emerald-500/30'
                                            }`}
                                        >
                                            {isPlaying === 'enhanced' ? <FiPause size={24} /> : <FiPlay size={24} />}
                                        </motion.button>
                                    </div>
                                    
                                    {/* Enhanced Audio Visualization */}
                                    <div className="h-40 bg-black/50 rounded-xl p-4 flex items-end justify-between gap-1 border border-white/5 shadow-inner shadow-black/50">
                                        {enhancedFrequencyData.map((value, index) => (
                                            <motion.div
                                                key={index}
                                                className="bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t w-full"
                                                initial={{ height: 0 }}
                                                animate={{ 
                                                    height: isPlaying === 'enhanced' 
                                                        ? `${value * 100}%` 
                                                        : `${value * 40}%` 
                                                }}
                                                transition={{ 
                                                    duration: 0.5, 
                                                    repeat: isPlaying === 'enhanced' ? Infinity : 0,
                                                    repeatType: 'reverse'
                                                }}
                                            />
                                        ))}
                                    </div>
                                    
                                    {/* Audio Metrics */}
                                    <div className="mt-6 space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <p className="text-gray-400 text-xs">Noise Level</p>
                                                <p className="text-white font-medium text-xs">{audioMetrics.enhanced.noiseLevel}</p>
                                            </div>
                                            <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                                                <motion.div 
                                                    className="h-full bg-gradient-to-r from-green-500 to-green-400"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: audioMetrics.enhanced.noiseLevel }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <p className="text-gray-400 text-xs">Voice Clarity</p>
                                                <p className="text-white font-medium text-xs">{audioMetrics.enhanced.clarity}</p>
                                            </div>
                                            <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                                                <motion.div 
                                                    className="h-full bg-gradient-to-r from-green-500 to-green-400"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: audioMetrics.enhanced.clarity }}
                                                    transition={{ duration: 1, delay: 0.3 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="px-8 py-4 bg-black/50 border-t border-white/5">
                                <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden">
                                    <motion.div 
                                        className={`h-full ${isPlaying === 'original' ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-emerald-500 to-emerald-400'}`}
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                
                                {/* Info Box */}
                                <div className="mt-6 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <FiInfo className="text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-300 text-sm">
                                            JyvDesktop uses advanced AI algorithms to remove background noise, echo, and unwanted sounds from your audio in real-time. 
                                            Experience crystal clear communication without distractions.
                                        </p>
                                        <div className="mt-3">
                                            <motion.button 
                                                onClick={() => {
                                                    const element = document.querySelector('#technical');
                                                    if (element) {
                                                        element.scrollIntoView({ behavior: 'smooth' });
                                                    }
                                                }}
                                                className="text-green-400 text-sm flex items-center hover:text-green-300 transition-colors"
                                                whileHover={{ x: 5 }}
                                                transition={{ type: "spring", stiffness: 400 }}
                                            >
                                                Learn more about our technology <FiChevronRight className="ml-1" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Hidden audio elements */}
                    <audio 
                        ref={originalAudioRef}
                        src={demoAudio.original}
                        preload="auto"
                        className="hidden"
                    />
                    <audio 
                        ref={enhancedAudioRef}
                        src={demoAudio.enhanced}
                        preload="auto"
                        className="hidden"
                    />
                </motion.div>
            </div>
        </section>
    );
}