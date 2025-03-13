'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FiArrowRight, FiPlay, FiUsers, FiCheck, FiRefreshCw } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

// Dynamically import the 3D audio visualizer for better performance
const AudioVisualizer = dynamic(
  () => import('@/components/ui/AudioVisualizer').then(mod => ({ default: mod.AudioVisualizer })),
  { loading: () => <AudioVisualizerFallback /> }
);

// Dynamically import the audio comparison component
const AudioComparison = dynamic(
  () => import('@/components/ui/AudioComparison'),
  { loading: () => <AudioComparisonFallback /> }
);

// Loading animation component
const LoadingSignature = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    aria-label="Loading animation"
  >
    <div className="relative">
      <svg className="w-24 h-24" viewBox="0 0 100 100" aria-hidden="true">
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(34, 197, 94, 0.2)"
          strokeWidth="8"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>
      </svg>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-white font-bold text-xl">JD</span>
      </motion.div>
      
      {/* Floating particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-green-400 rounded-full"
          initial={{
            x: 0,
            y: 0,
            scale: 0
          }}
          animate={{
            x: [0, Math.cos((i * 120 * Math.PI) / 180) * 40],
            y: [0, Math.sin((i * 120 * Math.PI) / 180) * 40],
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3
          }}
        />
      ))}
    </div>
  </motion.div>
);

// Fallback for the audio visualizer while loading
const AudioVisualizerFallback = () => (
  <div className="w-full h-64 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center">
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="text-green-400"
    >
      <FiRefreshCw className="w-8 h-8 animate-spin" />
    </motion.div>
  </div>
);

// Fallback for the audio comparison component while loading
const AudioComparisonFallback = () => (
  <div className="w-full rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 p-6">
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="h-8 bg-green-500/20 rounded-lg w-1/3"></div>
      <div className="h-4 bg-green-500/20 rounded-lg w-2/3"></div>
      <div className="h-32 bg-green-500/10 rounded-lg w-full"></div>
      <div className="flex gap-4">
        <div className="h-10 bg-green-500/20 rounded-lg w-1/4"></div>
        <div className="h-10 bg-green-500/20 rounded-lg w-1/4"></div>
      </div>
    </div>
  </div>
);

// Feature list for the hero section
const features = [
  { text: "AI-powered noise cancellation", delay: 0 },
  { text: "Voice modulation & effects", delay: 0.1 },
  { text: "Multi-platform compatibility", delay: 0.2 },
  { text: "Low-latency processing", delay: 0.3 }
];

// Animation variants for staggered animations
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

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [demoProcessed, setDemoProcessed] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(true);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Audio context for cleanup
  const audioContextRef = useRef<AudioContext | null>(null);
  
  // Simulate loading completion and handle animations
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    // Start animations when in view
    if (inView) {
      controls.start('visible');
    }
    
    // Cleanup function
    return () => {
      clearTimeout(timer);
      // Clean up audio context if it exists
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [controls, inView]);

  // Handle demo processing completion
  const handleProcessingComplete = () => {
    setDemoProcessed(true);
  };

  // Start recording and switch to comparison view
  const handleStartRecording = () => {
    setShowVisualizer(false);
    setIsRecording(true);
  };

  // Reset to visualizer view
  const handleReset = () => {
    setShowVisualizer(true);
    setIsRecording(false);
    setDemoProcessed(false);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingSignature />}
      </AnimatePresence>

      <section 
        className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20 overflow-hidden"
        ref={ref}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/20 rounded-full blur-[100px] will-change-transform"
            style={{ 
              animation: 'pulse-slow 15s infinite alternate',
              transform: 'translate3d(0, 0, 0)'
            }}
          />
          <div 
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px] will-change-transform"
            style={{ 
              animation: 'pulse-slow 15s infinite alternate-reverse',
              transform: 'translate3d(0, 0, 0)'
            }}
          />
          <div 
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-60 h-60 bg-green-400/10 rounded-full blur-[80px] will-change-transform"
            style={{ 
              animation: 'float 20s infinite ease-in-out',
              transform: 'translate3d(-50%, 0, 0)'
            }}
          />
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]"></div>
        </div>

        <div className="container relative mx-auto px-4 py-12 md:py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center bg-green-500/10 px-4 py-2 rounded-full mb-6 border border-green-500/30 backdrop-blur-sm"
              aria-label="Beta badge"
            >
              <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-green-400"></span>
              <span className="text-green-400 text-sm font-medium">Beta Now Live!</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
            >
              Transform Your Sound,{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Own Every Moment
                </span>
                <motion.span
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Professional-grade audio control 
              <br className="hidden md:block" />
              Perfect for creators, gamers, and remote teams
            </motion.p>

            {/* Feature list */}
            <motion.ul
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-2xl mx-auto"
            >
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  custom={feature.delay}
                  className="flex items-center bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-lg p-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <FiCheck className="text-green-400 text-sm" />
                  </span>
                  <span className="text-gray-300">{feature.text}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
            <Link href="/#pricing" className="pointer-events-auto motion-safe:hover:scale-105 motion-safe:hover:shadow-lg transition-all duration-300">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 shadow-xl shadow-green-500/20 transform-gpu"
                aria-label="Start free trial"
              >
                Start Free 14-Day Trial
                <FiArrowRight className="inline-block" />
              </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group border border-green-500/30 bg-green-500/10 text-green-400 px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-500/20 transition-colors transform-gpu"
                aria-label="Watch demo video"
              >
                <FiPlay className="group-hover:animate-pulse" />
                Watch 90-Second Demo
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 text-gray-400 text-sm flex items-center justify-center gap-2"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-8 h-8 rounded-full border-2 border-gray-800 bg-gradient-to-r from-green-400 to-emerald-500 transform-gpu"
                  />
                ))}
              </div>
              <div className="flex items-center">
                <FiUsers className="mr-1" />
                <p>Join 12,500+ beta testers →</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Audio Demo with Visualizer */}
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 w-full max-w-4xl mx-auto transform-gpu"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {showVisualizer ? "Experience Real-Time Audio Processing" : "Try It Yourself"}
              </h2>
              <p className="text-gray-300">
                {showVisualizer 
                  ? "See how our AI responds to audio in real-time" 
                  : "Record your voice and hear the difference our AI makes"}
                {demoProcessed && (
                  <span className="ml-2 inline-flex items-center bg-green-500/20 px-2 py-1 rounded-full text-green-400 text-xs">
                    <FiCheck className="mr-1" size={10} /> Processing Complete
                  </span>
                )}
              </p>
            </div>

            <div className="relative bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden shadow-xl">
              {showVisualizer ? (
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AudioVisualizer />
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    
                    <span className="absolute bottom-4 text-xs text-white/70 bg-black/50 px-3 py-1 rounded-full">
                      Click to try it yourself
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-1">
                  <AudioComparison onProcessingComplete={handleProcessingComplete} />
                  
                  <div className="p-4 flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReset}
                      className="text-green-400 flex items-center gap-2 px-4 py-2 rounded-lg border border-green-500/30 hover:bg-green-500/10"
                    >
                      <FiRefreshCw size={16} />
                      Back to Visualizer
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}