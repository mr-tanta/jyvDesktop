'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlay, 
  FiPause, 
  FiVolume2, 
  FiVolumeX, 
  FiChevronRight, 
  FiCheck, 
  FiInfo, 
  FiHeadphones, 
  FiDownload,
  FiHelpCircle
} from 'react-icons/fi';

export default function EnhancedAudioDemo() {
  // State management
  const [isPlaying, setIsPlaying] = useState(null);
  const [activeTab, setActiveTab] = useState('comparison');
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [animateWave, setAnimateWave] = useState(false);
  
  // References
  const originalAudioRef = useRef(null);
  const enhancedAudioRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const tooltipTimeoutRef = useRef(null);
  
  // Audio files
  const demoAudio = {
    original: '/assets/audio/noisy.m4a',
    enhanced: '/assets/audio/cleaned-demo.wav'
  };
  
  // Audio metrics for comparison
  const audioMetrics = {
    original: {
      noiseLevel: 72,
      clarity: 34,
      background: 68,
      voice: 42
    },
    enhanced: {
      noiseLevel: 3,
      clarity: 98,
      background: 2,
      voice: 99
    }
  };

  // Benefits of enhanced audio
  const benefits = [
    {
      title: "Crystal Clear Voice",
      description: "Voice isolation technology that enhances human voice while suppressing everything else",
      icon: "FiMic"
    },
    {
      title: "Background Noise Removal",
      description: "Intelligent algorithms detect and eliminate unwanted background sounds",
      icon: "FiSlash"
    },
    {
      title: "Echo Cancellation",
      description: "Advanced processing removes echo and reverberation from any environment",
      icon: "FiRepeat"
    }
  ];

  // Handle play/pause for comparison mode
  const togglePlay = () => {
    if (isPlaying) {
      // Pause currently playing audio
      if (isPlaying === 'original' && originalAudioRef.current) {
        originalAudioRef.current.pause();
      } else if (isPlaying === 'enhanced' && enhancedAudioRef.current) {
        enhancedAudioRef.current.pause();
      }
      
      setIsPlaying(null);
      setAnimateWave(false);
      
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    } else {
      // By default, play the enhanced audio
      playEnhancedAudio();
    }
  };
  
  // Play original audio
  const playOriginalAudio = () => {
    if (!originalAudioRef.current) return;
    
    // Pause enhanced audio if playing
    if (isPlaying === 'enhanced' && enhancedAudioRef.current) {
      enhancedAudioRef.current.pause();
    }
    
    // Set up original audio
    originalAudioRef.current.volume = isMuted ? 0 : volume;
    originalAudioRef.current.currentTime = 0;
    originalAudioRef.current.play().catch(err => {
      console.error('Error playing original audio:', err);
    });
    
    setIsPlaying('original');
    setAnimateWave(true);
    updateProgressBar(originalAudioRef);
  };
  
  // Play enhanced audio
  const playEnhancedAudio = () => {
    if (!enhancedAudioRef.current) return;
    
    // Pause original audio if playing
    if (isPlaying === 'original' && originalAudioRef.current) {
      originalAudioRef.current.pause();
    }
    
    // Set up enhanced audio
    enhancedAudioRef.current.volume = isMuted ? 0 : volume;
    enhancedAudioRef.current.currentTime = 0;
    enhancedAudioRef.current.play().catch(err => {
      console.error('Error playing enhanced audio:', err);
    });
    
    setIsPlaying('enhanced');
    setAnimateWave(true);
    updateProgressBar(enhancedAudioRef);
  };
  
  // Update progress bar
  const updateProgressBar = (audioRef) => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    progressIntervalRef.current = setInterval(() => {
      if (audioRef.current) {
        const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(currentProgress);
        
        if (currentProgress >= 100) {
          setIsPlaying(null);
          setAnimateWave(false);
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      }
    }, 50);
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
  const handleVolumeChange = (e) => {
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
  
  // Show tooltip with explanation
  const handleShowTooltip = () => {
    setShowTooltip(true);
    
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
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
    const handleAudioEnded = () => {
      setIsPlaying(null);
      setAnimateWave(false);
      setProgress(0);
      
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
    
    if (originalAudioRef.current) {
      originalAudioRef.current.addEventListener('ended', handleAudioEnded);
    }
    
    if (enhancedAudioRef.current) {
      enhancedAudioRef.current.addEventListener('ended', handleAudioEnded);
    }
    
    return () => {
      if (originalAudioRef.current) {
        originalAudioRef.current.removeEventListener('ended', handleAudioEnded);
      }
      
      if (enhancedAudioRef.current) {
        enhancedAudioRef.current.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, []);

  // Initialize animation when component mounts
  useEffect(() => {
    // Briefly animate the wave to show it's interactive
    setAnimateWave(true);
    setTimeout(() => {
      setAnimateWave(false);
    }, 2000);
  }, []);
  
  return (
    <section id="audio-demo" className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-green-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/4 right-1/4 w-60 h-60 bg-emerald-500/5 rounded-full blur-[80px]"></div>
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-[0.02]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Title section */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-green-500/10 px-4 py-2 rounded-full mb-4 border border-green-500/20">
            <span className="text-green-400 text-sm font-medium">Experience the Difference</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Audio <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Clarity</span> Redefined
          </h2>
          
          <p className="text-gray-300 mx-auto leading-relaxed">
            Hear how JyvDesktop transforms noisy, distracting audio into crystal clear communication.
            Compare the difference with our interactive demo below.
          </p>
        </motion.div>
        
        {/* Main audio player component */}
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            {/* Subtle glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl opacity-50 blur-xl"></div>
            
            {/* Main player container */}
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
              {/* Tabs navigation */}
              <div className="flex border-b border-gray-800">
                <button 
                  className={`px-8 py-5 text-sm font-medium transition-colors ${
                    activeTab === 'comparison'
                      ? 'text-green-400 border-b-2 border-green-500'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('comparison')}
                >
                  Audio Comparison
                </button>
                <button 
                  className={`px-8 py-5 text-sm font-medium transition-colors ${
                    activeTab === 'waveform'
                      ? 'text-green-400 border-b-2 border-green-500'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('waveform')}
                >
                  Waveform Analysis
                </button>
                <button 
                  className={`px-8 py-5 text-sm font-medium transition-colors ${
                    activeTab === 'metrics'
                      ? 'text-green-400 border-b-2 border-green-500'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('metrics')}
                >
                  Audio Metrics
                </button>
              </div>
              
              {/* Content area */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {/* Comparison tab content */}
                  {activeTab === 'comparison' && (
                    <motion.div 
                      key="comparison"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col md:flex-row gap-8">
                        {/* Original Audio Card */}
                        <div className="flex-1 bg-black/40 rounded-2xl p-6 border border-gray-800 transition-transform hover:scale-[1.02] relative">
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">Unprocessed</span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-white mb-1">Original Recording</h3>
                          <p className="text-gray-400 text-sm mb-6">Raw audio with background noise</p>
                          
                          {/* Visualization */}
                          <div className="relative h-32 mb-6 flex items-center justify-center">
                            {/* Stylized waveform */}
                            <div className="absolute inset-0 flex items-center">
                              {Array.from({ length: 50 }).map((_, i) => (
                                <motion.div 
                                  key={i}
                                  className="flex-1 mx-px h-1 bg-red-500/40 rounded-full"
                                  style={{ 
                                    height: `${10 + Math.sin(i * 0.2) * 10 + Math.random() * 30}%`,
                                  }}
                                  animate={animateWave && isPlaying === 'original' ? {
                                    height: [
                                      `${10 + Math.sin(i * 0.2) * 10 + Math.random() * 30}%`,
                                      `${10 + Math.sin((i + 1) * 0.2) * 10 + Math.random() * 30}%`,
                                      `${10 + Math.sin((i + 2) * 0.2) * 10 + Math.random() * 30}%`
                                    ]
                                  } : {}}
                                  transition={{ 
                                    duration: 0.5, 
                                    repeat: Infinity, 
                                    repeatType: 'mirror'
                                  }}
                                />
                              ))}
                            </div>
                            
                            {/* Play button overlay */}
                            <button 
                              onClick={playOriginalAudio}
                              className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-red-500/30 text-red-400 hover:bg-white/10 transition-colors group"
                            >
                              <FiPlay size={24} className="group-hover:scale-110 transition-transform" />
                            </button>
                          </div>
                          
                          {/* Audio metrics */}
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <p className="text-gray-400 text-xs">Noise Level</p>
                                <p className="text-white font-medium text-xs">{audioMetrics.original.noiseLevel}%</p>
                              </div>
                              <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-red-500"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${audioMetrics.original.noiseLevel}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <p className="text-gray-400 text-xs">Voice Clarity</p>
                                <p className="text-white font-medium text-xs">{audioMetrics.original.clarity}%</p>
                              </div>
                              <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-yellow-500"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${audioMetrics.original.clarity}%` }}
                                  transition={{ duration: 1, delay: 0.3 }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Enhanced Audio Card */}
                        <div className="flex-1 bg-black/40 rounded-2xl p-6 border border-gray-800 transition-transform hover:scale-[1.02] relative">
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs flex items-center">
                              <FiCheck size={10} className="mr-1" /> Processed
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-white mb-1">JYV Enhanced</h3>
                          <p className="text-gray-400 text-sm mb-6">Crystal clear audio with AI processing</p>
                          
                          {/* Visualization */}
                          <div className="relative h-32 mb-6 flex items-center justify-center">
                            {/* Stylized waveform */}
                            <div className="absolute inset-0 flex items-center">
                              {Array.from({ length: 50 }).map((_, i) => (
                                <motion.div 
                                  key={i}
                                  className="flex-1 mx-px h-1 bg-green-500/60 rounded-full"
                                  style={{ 
                                    height: `${20 + Math.sin(i * 0.3) * 15}%`,
                                  }}
                                  animate={animateWave && isPlaying === 'enhanced' ? {
                                    height: [
                                      `${20 + Math.sin(i * 0.3) * 15}%`,
                                      `${20 + Math.sin((i + 1) * 0.3) * 15}%`,
                                      `${20 + Math.sin((i + 2) * 0.3) * 15}%`
                                    ]
                                  } : {}}
                                  transition={{ 
                                    duration: 0.5, 
                                    repeat: Infinity, 
                                    repeatType: 'mirror'
                                  }}
                                />
                              ))}
                            </div>
                            
                            {/* Play button overlay */}
                            <button 
                              onClick={playEnhancedAudio}
                              className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-green-500/30 text-green-400 hover:bg-white/10 transition-colors group"
                            >
                              <FiPlay size={24} className="group-hover:scale-110 transition-transform" />
                            </button>
                          </div>
                          
                          {/* Audio metrics */}
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <p className="text-gray-400 text-xs">Noise Level</p>
                                <p className="text-white font-medium text-xs">{audioMetrics.enhanced.noiseLevel}%</p>
                              </div>
                              <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-green-500"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${audioMetrics.enhanced.noiseLevel}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <p className="text-gray-400 text-xs">Voice Clarity</p>
                                <p className="text-white font-medium text-xs">{audioMetrics.enhanced.clarity}%</p>
                              </div>
                              <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-green-500"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${audioMetrics.enhanced.clarity}%` }}
                                  transition={{ duration: 1, delay: 0.3 }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Waveform tab content */}
                  {activeTab === 'waveform' && (
                    <motion.div 
                      key="waveform"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-96 flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white">Waveform Comparison</h3>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-gray-300 text-sm">Original</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-gray-300 text-sm">Enhanced</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Advanced waveform visualization */}
                      <div className="flex-1 bg-black/40 rounded-2xl border border-gray-800 p-6 relative">
                        {/* Grid lines */}
                        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={`h-${i}`} className="w-full h-px bg-gray-800" style={{ top: `${((i + 1) / 6) * 100}%` }}></div>
                          ))}
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={`v-${i}`} className="h-full w-px bg-gray-800" style={{ left: `${((i + 1) / 6) * 100}%` }}></div>
                          ))}
                        </div>
                        
                        {/* Original waveform path */}
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                          <path 
                            d="M0,50 C5,80 10,40 15,60 C20,80 25,30 30,50 C35,70 40,20 45,60 C50,80 55,30 60,70 C65,20 70,60 75,30 C80,70 85,20 90,50 C95,80 100,30 105,70" 
                            stroke="#ef4444" 
                            strokeWidth="1.5" 
                            fill="none" 
                            vectorEffect="non-scaling-stroke"
                            className="opacity-70"
                            strokeDasharray="1000"
                            strokeDashoffset="1000"
                            style={{
                              animation: isPlaying ? 'stroke-dash 15s linear forwards' : 'none'
                            }}
                          />
                        </svg>
                        
                        {/* Enhanced waveform path */}
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                          <path 
                            d="M0,50 C5,60 10,40 15,50 C20,60 25,40 30,50 C35,60 40,40 45,50 C50,60 55,40 60,50 C65,60 70,40 75,50 C80,60 85,40 90,50 C95,60 100,40 105,50" 
                            stroke="#22c55e" 
                            strokeWidth="2" 
                            fill="none" 
                            vectorEffect="non-scaling-stroke"
                            strokeDasharray="1000"
                            strokeDashoffset="1000"
                            style={{
                              animation: isPlaying ? 'stroke-dash 15s linear forwards' : 'none'
                            }}
                          />
                        </svg>
                        
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button 
                            onClick={togglePlay}
                            className={`flex items-center justify-center w-16 h-16 rounded-full transition-all ${
                              isPlaying
                                ? 'bg-white/20 text-white hover:bg-white/30'
                                : 'bg-emerald-500 text-white hover:bg-emerald-600'
                            } shadow-lg`}
                          >
                            {isPlaying ? <FiPause size={28} /> : <FiPlay size={28} className="ml-1" />}
                          </button>
                        </div>
                        
                        {/* Labels */}
                        <div className="absolute bottom-2 left-6 flex items-center gap-2">
                          <span className="text-gray-400 text-xs">Time</span>
                        </div>
                        <div className="absolute top-6 left-2 flex flex-col items-start rotate-90 origin-left">
                          <span className="text-gray-400 text-xs">Amplitude</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Metrics tab content */}
                  {activeTab === 'metrics' && (
                    <motion.div 
                      key="metrics"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-white mb-6">Detailed Audio Analysis</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Metrics cards */}
                        <div className="bg-black/40 rounded-2xl p-6 border border-gray-800">
                          <h4 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                            Original Audio
                          </h4>
                          
                          <div className="space-y-5">
                            {/* Noise Level */}
                            <div>
                              <div className="flex justify-between mb-2">
                                <p className="text-gray-300">Noise Level</p>
                                <div className="flex items-center">
                                  <span className="text-white font-medium">{audioMetrics.original.noiseLevel}%</span>
                                  <div 
                                    className="ml-2 text-gray-400 cursor-help"
                                    onMouseEnter={handleShowTooltip}
                                    onMouseLeave={() => setShowTooltip(false)}
                                  >
                                    <FiHelpCircle size={14} />
                                    
                                    {showTooltip && (
                                      <div className="absolute bg-gray-800 text-white text-xs p-2 rounded w-48 -mt-16 ml-2">
                                        Percentage of audio affected by background noise
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-red-600 to-red-400"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${audioMetrics.original.noiseLevel}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                />
                              </div>
                            </div>
                            
                            {/* Voice Clarity */}
                            <div>
                            <div className="flex justify-between mb-2">
                                <p className="text-gray-300">Voice Clarity</p>
                                <p className="text-white font-medium">{audioMetrics.original.clarity}%</p>
                              </div>
                              <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${audioMetrics.original.clarity}%` }}
                                  transition={{ duration: 1, delay: 0.3 }}
                                />
                              </div>
                            </div>
                            
                            {/* Background Noise */}
                            <div>
                              <div className="flex justify-between mb-2">
                                <p className="text-gray-300">Background Sounds</p>
                                <p className="text-white font-medium">{audioMetrics.original.background}%</p>
                              </div>
                              <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${audioMetrics.original.background}%` }}
                                  transition={{ duration: 1, delay: 0.4 }}
                                />
                              </div>
                            </div>
                            
                            {/* Voice Detection */}
                            <div>
                              <div className="flex justify-between mb-2">
                                <p className="text-gray-300">Voice Isolation</p>
                                <p className="text-white font-medium">{audioMetrics.original.voice}%</p>
                              </div>
                              <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${audioMetrics.original.voice}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Enhanced metrics card */}
                        <div className="bg-black/40 rounded-2xl p-6 border border-gray-800">
                          <h4 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            Enhanced Audio
                          </h4>
                          
                          <div className="space-y-5">
                            {/* Noise Level */}
                            <div>
                              <div className="flex justify-between mb-2">
                                <p className="text-gray-300">Noise Level</p>
                                <p className="text-white font-medium">{audioMetrics.enhanced.noiseLevel}%</p>
                              </div>
                              <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-green-600 to-green-400"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${audioMetrics.enhanced.noiseLevel}%` }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                />
                              </div>
                            </div>
                            
                            {/* Voice Clarity */}
                            <div>
                              <div className="flex justify-between mb-2">
                                <p className="text-gray-300">Voice Clarity</p>
                                <p className="text-white font-medium">{audioMetrics.enhanced.clarity}%</p>
                              </div>
                              <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-green-600 to-green-400"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${audioMetrics.enhanced.clarity}%` }}
                                  transition={{ duration: 1, delay: 0.3 }}
                                />
                              </div>
                            </div>
                            
                            {/* Background Noise */}
                            <div>
                              <div className="flex justify-between mb-2">
                                <p className="text-gray-300">Background Sounds</p>
                                <p className="text-white font-medium">{audioMetrics.enhanced.background}%</p>
                              </div>
                              <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-green-600 to-green-400"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${audioMetrics.enhanced.background}%` }}
                                  transition={{ duration: 1, delay: 0.4 }}
                                />
                              </div>
                            </div>
                            
                            {/* Voice Detection */}
                            <div>
                              <div className="flex justify-between mb-2">
                                <p className="text-gray-300">Voice Isolation</p>
                                <p className="text-white font-medium">{audioMetrics.enhanced.voice}%</p>
                              </div>
                              <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-green-600 to-green-400"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${audioMetrics.enhanced.voice}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Improvement analysis */}
                        <div className="md:col-span-2 bg-green-500/10 rounded-2xl p-6 border border-green-500/20">
                          <h4 className="text-lg font-semibold text-white mb-4">JyvDesktop Enhancement Analysis</h4>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300">Noise Reduction</span>
                              <span className="text-green-400 font-medium">
                                {audioMetrics.original.noiseLevel - audioMetrics.enhanced.noiseLevel}% Improvement
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300">Clarity Improvement</span>
                              <span className="text-green-400 font-medium">
                                {audioMetrics.enhanced.clarity - audioMetrics.original.clarity}% Improvement
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300">Voice Isolation Enhancement</span>
                              <span className="text-green-400 font-medium">
                                {audioMetrics.enhanced.voice - audioMetrics.original.voice}% Improvement
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Player Controls */}
              <div className="p-6 border-t border-gray-800 bg-black/20">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  {/* Progress bar */}
                  <div className="w-full sm:w-auto flex-1">
                    <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-green-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center gap-4">
                    {/* Main play button */}
                    <motion.button
                      onClick={togglePlay}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-full shadow-lg ${
                        isPlaying
                          ? 'bg-green-500 text-white'
                          : 'bg-white/5 text-green-400 hover:bg-white/10 border border-green-500/30'
                      }`}
                    >
                      {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
                    </motion.button>
                    
                    {/* Volume control */}
                    <button 
                      onClick={toggleMute}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
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
                        onChange={handleVolumeChange}
                        className="w-full accent-green-500 h-1 rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                    
                    {/* Download sample button */}
                    <a
                      href={demoAudio.enhanced}
                      download="jyvdesktop-enhanced-sample.wav"
                      className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      <FiDownload size={14} />
                      <span>Download Sample</span>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Info section */}
              <div className="p-6 bg-gradient-to-r from-black/40 to-black/20 border-t border-gray-800">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <FiInfo className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">
                      JyvDesktop uses advanced AI algorithms to remove background noise, echo, and unwanted sounds from your audio in real-time. 
                      Experience crystal clear communication without distractions in any environment.
                    </p>
                    <div className="mt-3">
                      <motion.button 
                        onClick={() => {
                          const element = document.getElementById('tech-section');
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
        
        {/* Key Features/Benefits section */}
        <motion.div 
          className="mt-20 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">Key Audio Enhancement Benefits</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-gradient-to-b from-black/60 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                  {/* We're using the FiInfo icon as a placeholder, you can replace with actual icons */}
                  <FiInfo className="text-green-400 text-xl" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{benefit.title}</h4>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA section */}
        <motion.div 
          className="mt-20 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-3xl p-10 border border-green-500/20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Transform Your Audio Experience?</h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Download JyvDesktop now and experience the difference. Our free trial lets you discover crystal clear audio without any commitment.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a 
                href="#download"
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-black font-bold shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:scale-105 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Free Trial
              </motion.a>
              
              <a 
                href="#pricing"
                className="px-8 py-4 bg-white/5 border border-green-500/30 rounded-full text-green-400 hover:bg-white/10 transition-colors"
              >
                View Pricing Plans
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* CSS animation for the waveform */}
      <style jsx>{`
        @keyframes stroke-dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}