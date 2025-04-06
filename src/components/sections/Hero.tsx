'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {LucidePlay, X, Volume2, Wand2, Headphones, Activity, DownloadCloudIcon} from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const imageContainerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }
  }
};

// Enhanced Particle component
const Particle = ({ size, color, duration, delay, left, top, mouseX, mouseY }: 
  { size: number; color: string; duration: number; delay: number; left: string; top: string; mouseX: any; mouseY: any }) => {
  
  // Increased mouse interaction range
  const x = useTransform(mouseX, [-1000, 1000], ["-15px", "15px"], { clamp: false });
  const y = useTransform(mouseY, [-1000, 1000], ["-15px", "15px"], { clamp: false });

  return (
    <motion.div
      style={{
        position: 'absolute',
        left,
        top,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        x,
        y,
      }}
      animate={{
        // Enhanced movement pattern
        y: ["0%", "-20%", "0%", "20%", "0%"],
        x: ["0%", "15%", "-15%", "0%"],
        opacity: [0.2, 0.8, 0.8, 0.2],
        scale: [1, 1.1, 1, 0.9, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 0.5 // Small pause between cycles
      }}
    />
  );
};

// New Audio Wave component for background
const AudioWave = ({ top, left, color, size, mouseX }: 
  { top: string; left: string; color: string; size: number; mouseX: any }) => {
  
  // Subtle horizontal movement based on mouse
  const x = useTransform(mouseX, [-1000, 1000], ["-10px", "10px"], { clamp: false });
  
  return (
    <motion.div
      className="absolute pointer-events-none hidden md:block opacity-30"
      style={{ top, left, x }}
    >
      <svg width={size} height={size/2} viewBox={`0 0 ${size} ${size/2}`} fill="none">
        {/* Sound wave circles */}
        {[...Array(4)].map((_, i) => (
          <motion.circle
            key={i}
            cx={size/2}
            cy={size/2}
            r={20 + i * 15}
            stroke={color}
            strokeWidth="1"
            fill="transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

// Waveform component - animated audio waves
const Waveform = ({ left, bottom, color, mouseX }: { left: string; bottom: string; color: string; mouseX: any }) => {
  const x = useTransform(
    mouseX,
    [-1000, 1000], 
    ["-5%", "5%"], 
    { clamp: false }
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        left,
        bottom,
        x
      }}
      className="opacity-30 pointer-events-none hidden md:block"
    >
      <svg width="300" height="70" viewBox="0 0 300 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M0,35 Q37.5,10 75,35 Q112.5,60 150,35 Q187.5,10 225,35 Q262.5,60 300,35"
          stroke={color}
          strokeWidth="2"
          fill="transparent"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 4, 
            ease: "easeInOut", 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      </svg>
    </motion.div>
  );
};

// EQ Bars component - animated equalizer bars
const EQBars = ({ top, right, mouseY }: { top: string; right: string; mouseY: any }) => {
  const y = useTransform(
    mouseY,
    [-1000, 1000], 
    ["-10px", "10px"], 
    { clamp: false }
  );

  const bars = Array.from({ length: 5 }, (_, i) => {
    const initialHeight = 15 + Math.random() * 30;
    return {
      initialHeight,
      delay: i * 0.15
    };
  });

  return (
    <motion.div 
      style={{ 
        position: 'absolute', 
        top, 
        right,
        display: 'flex',
        gap: '4px',
        y
      }}
      className="opacity-30 pointer-events-none hidden md:flex"
    >
      {bars.map((bar, index) => (
        <motion.div
          key={index}
          style={{
            width: '3px',
            height: bar.initialHeight,
            backgroundColor: '#22c55e',
            borderRadius: '2px'
          }}
          animate={{
            height: [
              bar.initialHeight,
              bar.initialHeight + 20 + Math.random() * 10,
              bar.initialHeight
            ],
          }}
          transition={{
            duration: 1.5 + Math.random(),
            repeat: Infinity,
            delay: bar.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
};

// Feature pills data
const featurePills = [
  "Audio Control",
  "AI Noise Suppression",
  "Spatial Audio",
  "Low Latency"
];

// Noise texture overlay component
const NoiseOverlay = () => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.015] mix-blend-overlay">
      <svg className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.1 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Add new state for alternating headline
  const [headlineIndex, setHeadlineIndex] = useState(0);
  
  // Headline content options
  const headlines = [
    {
      topLine: "Complete Control Over",
      bottomLine: "Your Audio Environment."
    },
    {
      topLine: "Experience Sound",
      bottomLine: "The way it's meant to be."
    }
  ];

  // Set up headline rotation timer
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setHeadlineIndex(current => (current === 0 ? 1 : 0));
      }, 5000); // Change every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [isInView]);

  // Check if mobile view on client side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse position trackers for background interactions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring-based smoothing for mouse values
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  // Track mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  // Scroll-based animations
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end end'] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  // Add new transform effects based on scroll
  const featurePillsX = useTransform(scrollYProgress, [0, 0.5], ['0%', '-5%']);
  const logosX = useTransform(scrollYProgress, [0, 0.5], ['0%', '5%']);
  
  // Adjust scale animation for better mobile experience
  const imageScale = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    isMobile ? [0.95, 1.02, 0.95] : [0.9, 1.05, 0.9]
  );
  
  // Adjust opacity ranges for slower fading - use higher minimum value (0.6 -> 0.75) and extend full opacity range (0.1-0.9)
  const imageOpacity = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.9, 1], 
    [0.75, 1, 1, 0.75]
  );

  // Text reveal animation for the headline
  const [textRevealed, setTextRevealed] = useState(false);
  useEffect(() => {
    if (isInView && !textRevealed) {
      const timer = setTimeout(() => {
        setTextRevealed(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, textRevealed]);

  // Generate fewer particles for mobile
  const particleCount = isMobile ? 8 : 15;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 4,
    color: i % 3 === 0 ? 'rgba(34, 197, 94, 0.4)' : 'rgba(255, 255, 255, 0.2)',
    duration: 4 + Math.random() * 6, // Slightly slower, more varied durations
    delay: Math.random() * 6,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`
  }));

  // App compatibility icons at the top
  const appColors = [
    "bg-indigo-600", // Discord/Teams
    "bg-amber-500",  // Yellow app
    "bg-red-500",    // YouTube/Zoom
    "bg-teal-500",   // Spotify-like
    "bg-green-500",  // Green app
  ];

  // Feature data for the numbered circles
  const featureCircles = [
    { id: 1, number: 1, title: "AI Noise Removal" },
    { id: 2, number: 2, title: "Spatial Processing" },
    { id: 3, number: 3, title: "App-Level Control" },
  ];

  // Generate waveforms at different positions
  const waveforms = [
    { id: 1, left: '5%', bottom: '20%', color: 'rgba(34, 197, 94, 0.5)' },
    { id: 2, left: '60%', bottom: '60%', color: 'rgba(255, 255, 255, 0.3)' }
  ];

  // Generate audio waves
  const audioWaves = [
    { id: 1, top: '25%', left: '15%', color: 'rgba(34, 197, 94, 0.4)', size: 120 },
    { id: 2, top: '65%', left: '75%', color: 'rgba(255, 255, 255, 0.3)', size: 150 },
  ];

  // Select company logos
  const companyLogos = [
    { name: 'Spotify', file: '/assets/companies/spotify.svg', width: 90 },
    { name: 'Apple', file: '/assets/companies/apple.svg', width: 28 },
    { name: 'Microsoft', file: '/assets/companies/microsoft.svg', width: 90 },
    { name: 'Netflix', file: '/assets/companies/netflix.svg', width: 90 },
    { name: 'Google', file: '/assets/companies/google.svg', width: 80 },
    { name: 'Forbes', file: '/assets/companies/forbes.svg', width: 75 },
    { name: 'Oracle', file: '/assets/companies/oracle.svg', width: 90 },
    { name: 'TikTok', file: '/assets/companies/tiktok.svg', width: 90 },
    { name: 'Amazon', file: '/assets/companies/amazon.svg', width: 90 }
  ];

  // NEW: Get window dimensions for 3D effects
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    // Only run on client
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
      
      // Initial size
      handleResize();
      
      // Update on resize
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // NEW: Mouse-based transforms for 3D effect
  const gridRotateX = useTransform(
    smoothMouseY, 
    [0, windowSize.height], 
    [5, -5]
  );
  
  const gridRotateY = useTransform(
    smoothMouseX, 
    [0, windowSize.width], 
    [-5, 5]
  );

  // NEW: Transforms for blob parallax
  const blob1X = useTransform(
    smoothMouseX, 
    [0, windowSize.width], 
    ["-3%", "3%"]
  );
  
  const blob1Y = useTransform(
    smoothMouseY, 
    [0, windowSize.height], 
    ["-3%", "3%"]
  );
  
  const blob2X = useTransform(
    smoothMouseX, 
    [0, windowSize.width], 
    ["2%", "-2%"]
  );
  
  const blob2Y = useTransform(
    smoothMouseY, 
    [0, windowSize.height], 
    ["2%", "-2%"]
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-black via-gray-950 to-black pt-20 md:pt-36 pb-20 md:pb-32 overflow-hidden flex flex-col justify-start"
      onMouseMove={handleMouseMove}
      style={{ perspective: '1000px' }}
    >
      {/* Add animated noise texture overlay */}
      <NoiseOverlay />

      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Interactive Gradient blobs */}
        <motion.div
          className="absolute -top-1/3 -right-1/4 w-[80vw] sm:w-[70vw] h-[80vw] sm:h-[70vw] max-w-[900px] max-h-[900px] bg-green-700/5 rounded-full blur-[200px] opacity-60 animate-pulse-slow"
          style={{ x: blob1X, y: blob1Y }}
        />
        <motion.div
          className="absolute -bottom-1/3 -left-1/4 w-[70vw] sm:w-[60vw] h-[70vw] sm:h-[60vw] max-w-[800px] max-h-[800px] bg-emerald-800/5 rounded-full blur-[180px] opacity-50 animate-pulse-slow animation-delay-2000"
          style={{ x: blob2X, y: blob2Y }}
        />
        
        {/* Interactive Grid background */}
        <motion.div 
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]"
          style={{
            rotateX: gridRotateX,
            rotateY: gridRotateY
          }}
        />
        
        {/* Interactive Particles */}
        {particles.map(particle => (
          <Particle
            key={particle.id}
            size={particle.size}
            color={particle.color}
            duration={particle.duration}
            delay={particle.delay}
            left={particle.left}
            top={particle.top}
            mouseX={smoothMouseX}
            mouseY={smoothMouseY}
          />
        ))}
        
        {/* Animated Waveforms */}
        {waveforms.map(wave => (
          <Waveform
            key={wave.id}
            left={wave.left}
            bottom={wave.bottom}
            color={wave.color}
            mouseX={smoothMouseX}
          />
        ))}
        
        {/* Add new Audio Waves */}
        {audioWaves.map(wave => (
          <AudioWave
            key={wave.id}
            top={wave.top}
            left={wave.left}
            color={wave.color}
            size={wave.size}
            mouseX={smoothMouseX}
          />
        ))}
        
        {/* Animated EQ Bars */}
        <EQBars top="15%" right="15%" mouseY={smoothMouseY} />
        <EQBars top="75%" right="75%" mouseY={smoothMouseY} />
      </motion.div>

      {/* Main content container - Adjusted for mobile */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center mt-6 md:mt-0"
      >
        {/* App compatibility banner - NEW */}
        <motion.div
            variants={itemVariants}
            className=" flex flex-col items-center"
        >
          <div className="flex space-x-2 mb-3">
            {appColors.map((color, index) => (
                <motion.div
                    key={index}
                    className={`w-6 h-6 rounded ${color}`}
                    whileHover={{ y: -2 }}
                />
            ))}
          </div>
          <p className="text-gray-400 text-sm md:text-base">
            Compatible with your favorite apps
          </p>
        </motion.div>

        {/* Headline with rotating effect */}
        <motion.div
          variants={itemVariants}
          className="mb-4  h-[10rem] md:h-[12rem] flex flex-col justify-center items-center"
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={headlineIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tighter max-w-4xl"
            >
              <span className="inline-block leading-[0.9] text-3xl md:text-5xl lg:text-6xl">
                {headlines[headlineIndex].topLine}
              </span>
              <div className="relative mt-[-0.2em]">
                <span className="block text-green-400 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                  {headlines[headlineIndex].bottomLine}
                </span>
                {!textRevealed && headlineIndex === 0 && (
                  <motion.span 
                    className="absolute -right-4 bottom-0 w-0.5 h-[0.8em] bg-green-400 inline-block"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.h1>
          </AnimatePresence>
        </motion.div>

        {/* Description - Adjusted for mobile */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-10 max-w-2xl"
        >
          Manage applications, enhance sound quality, and create immersive spatial audio experiences with AI-powered precision.
        </motion.p>

        {/* CTA Buttons - Adjusted for mobile */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8  w-full sm:w-auto"
        >
          <Link href="/#pricing" className="block w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(34, 197, 94, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold text-base sm:text-lg shadow-md shadow-green-800/40 relative overflow-hidden group"
            >
              <div className={'flex gap-4 items-center justify-center'}>
                <DownloadCloudIcon />
                <span className="relative z-10"> Download Now</span>
              </div>
              {/* Animated highlight effect */}
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full"
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto border border-white/15 bg-white/5 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 text-base sm:text-lg transition-colors duration-300 relative group"
            onClick={() => setShowVideo(true)}
          >
            <motion.span
              className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-green-500/20 flex items-center justify-center relative"
              whileHover={{ scale: 1.1 }}
            >
              <LucidePlay size={16} className="text-green-400/90 ml-0.5" />
              {/* Pulse effect */}
              <span className="absolute inset-0 rounded-full bg-green-500/20 animate-ping opacity-70" />
            </motion.span>
            <span className="relative">Watch Demo</span>
          </motion.button>
        </motion.div>

        {/* Feature Pills - Now with subtle parallax */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-2 mb-6 max-w-3xl"
          style={{ x: featurePillsX }} // Add subtle movement on scroll
        >
          {featurePills.map((pill, index) => (
            <motion.span
              key={index}
              className="inline-block bg-gray-800/60 border border-gray-700/80 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-300 backdrop-blur-sm"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                borderColor: "rgba(34, 197, 94, 0.3)",
                color: "#ffffff"
              }}
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.6 + (index * 0.1) }
              }}
            >
              {pill}
            </motion.span>
          ))}
        </motion.div>

        {/* Social Proof - Now with subtle parallax */}
        <motion.div 
          variants={itemVariants} 
          className="mb-8 md:mb-20"
          style={{ x: logosX }} // Add subtle movement on scroll
        >
          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Trusted by professionals at top companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-8 lg:gap-x-12 gap-y-4 md:gap-y-6">
            {companyLogos.map((logo, index) => (
              <motion.div
                key={index}
                className="relative transition-all duration-300 flex items-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={logo.file}
                  alt={`${logo.name} logo`}
                  width={logo.width}
                  height={60}
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* App Screenshot - Enhanced for mobile */}
        <motion.div
          variants={imageContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ scale: imageScale, opacity: imageOpacity }}
          className="w-full px-2 sm:px-4 md:px-8 lg:px-12 relative"
        >
          {/* Optimize container for better mobile display */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-green-900/50 border border-white/10 transform-gpu">
            {/* Glow Effects - Reduced for mobile */}
            <div className="absolute -inset-2 bg-gradient-radial from-green-600/15 via-transparent to-transparent blur-2xl opacity-70 animate-pulse-slow animation-delay-1000 z-0"></div>
            <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-gradient-to-t from-emerald-700/10 to-transparent blur-xl opacity-60 rounded-full z-0"></div>

            {/* Responsive Image with correct display */}
            <Image
              src="/assets/images/dashboard.webp"
              alt="JyvDesktop App Interface"
              width={1600}
              height={1000}
              className="w-full h-auto rounded-lg relative z-[1]"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
              style={{ display: 'block' }} // Explicit display block to fix layout issues
            />

            {/* Hotspots - Properly positioned for mobile */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-400/30 z-10"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60"></span>
              <span className="absolute inset-1/4 w-1/2 h-1/2 rounded-full bg-green-400"></span>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-1/3 right-1/3 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-400/30 z-10"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            >
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60"></span>
              <span className="absolute inset-1/4 w-1/2 h-1/2 rounded-full bg-green-400"></span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Video Modal with improved animations */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
             <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-gray-900/80 border border-white/10 rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                onClick={() => setShowVideo(false)}
                aria-label="Close video"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} />
              </motion.button>
              <div className="aspect-video">
                <div className="w-full h-full bg-black flex items-center justify-center">
                   <div className="text-center text-gray-400">
                     <motion.div 
                       className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 mx-auto"
                       animate={{ 
                         scale: [1, 1.1, 1],
                         backgroundColor: ["rgba(34, 197, 94, 0.2)", "rgba(34, 197, 94, 0.3)", "rgba(34, 197, 94, 0.2)"]
                       }}
                       transition={{ duration: 2, repeat: Infinity }}
                     >
                       <LucidePlay size={24} className="text-green-400 ml-1" />
                     </motion.div>
                     <p className="text-sm sm:text-base">Loading Video...</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}