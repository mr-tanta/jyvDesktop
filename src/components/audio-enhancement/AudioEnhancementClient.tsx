'use client';

import React, {useState, useRef, useEffect} from 'react';
import {motion, AnimatePresence, useScroll, useTransform, useInView} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';
import {
  Wand2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowRight,
  Download,
  ChevronRight,
  ChevronDown,
  Mic,
  Activity,
  Zap,
  Headphones,
  Radio,
  MessageSquare,
  Music,
  CheckCircle2,
  Info,
  RefreshCw,
  SlidersHorizontal,
  Settings,
  Sliders,
  BarChart3,
  Star,
  Crown,
  BrainCircuit,
  Ear,
  VolumeX as NoiseIcon,
  Waves,
  PieChart,
  PlaySquare,
  Clock
} from 'lucide-react';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';

// Audio Enhancement Features Data
// This function will be called inside the component to access translations
const getAudioEnhancementFeatures = (t: any) => [
  {
    id: 'noise-suppression',
    title: t('featureItems.aiNoiseSuppression.title'),
    description: t('featureItems.aiNoiseSuppression.description'),
    icon: <NoiseIcon size={24}/>,
    details: [
      t('featureItems.aiNoiseSuppression.details.1'),
      t('featureItems.aiNoiseSuppression.details.2'),
      t('featureItems.aiNoiseSuppression.details.3'),
      t('featureItems.aiNoiseSuppression.details.4'),
      t('featureItems.aiNoiseSuppression.details.5')
    ],
    image: '/assets/images/audio-enhancement/noise-suppression.webp',
    color: 'from-blue-500/10 to-blue-600/5',
    borderColor: 'border-blue-500/20',
    iconBg: 'bg-blue-500/20',
    beforeAfterAudio: {
      before: '/assets/audio/noise-before.mp3',
      after: '/assets/audio/noise-after.mp3',
    }
  },
  {
    id: 'voice-enhancement',
    title: t('featureItems.voiceEnhancement.title'),
    description: t('featureItems.voiceEnhancement.description'),
    icon: <Mic size={24}/>,
    details: [
      t('featureItems.voiceEnhancement.details.1'),
      t('featureItems.voiceEnhancement.details.2'),
      t('featureItems.voiceEnhancement.details.3'),
      t('featureItems.voiceEnhancement.details.4'),
      t('featureItems.voiceEnhancement.details.5')
    ],
    image: '/assets/images/audio-enhancement/voice-enhancement.webp',
    color: 'from-purple-500/10 to-purple-600/5',
    borderColor: 'border-purple-500/20',
    iconBg: 'bg-purple-500/20',
    beforeAfterAudio: {
      before: '/assets/audio/voice-before.mp3',
      after: '/assets/audio/voice-after.mp3',
    }
  },
  {
    id: 'dynamic-processor',
    title: t('featureItems.dynamicProcessor.title'),
    description: t('featureItems.dynamicProcessor.description'),
    icon: <Activity size={24}/>,
    details: [
      t('featureItems.dynamicProcessor.details.1'),
      t('featureItems.dynamicProcessor.details.2'),
      t('featureItems.dynamicProcessor.details.3'),
      t('featureItems.dynamicProcessor.details.4'),
      t('featureItems.dynamicProcessor.details.5')
    ],
    image: '/assets/images/audio-enhancement/dynamic-processor.webp',
    color: 'from-amber-500/10 to-amber-600/5',
    borderColor: 'border-amber-500/20',
    iconBg: 'bg-amber-500/20',
    beforeAfterAudio: {
      before: '/assets/audio/dynamics-before.mp3',
      after: '/assets/audio/dynamics-after.mp3',
    }
  },
  {
    id: 'equalizer',
    title: t('featureItems.equalizer.title'),
    description: t('featureItems.equalizer.description'),
    icon: <Sliders size={24}/>,
    details: [
      t('featureItems.equalizer.details.1'),
      t('featureItems.equalizer.details.2'),
      t('featureItems.equalizer.details.3'),
      t('featureItems.equalizer.details.4'),
      t('featureItems.equalizer.details.5')
    ],
    image: '/assets/images/audio-enhancement/equalizer.webp',
    color: 'from-green-500/10 to-green-600/5',
    borderColor: 'border-green-500/20',
    iconBg: 'bg-green-500/20',
    beforeAfterAudio: {
      before: '/assets/audio/eq-before.mp3',
      after: '/assets/audio/eq-after.mp3',
    }
  },
  {
    id: 'clarity-enhancer',
    title: t('featureItems.clarityEnhancer.title'),
    description: t('featureItems.clarityEnhancer.description'),
    icon: <Ear size={24}/>,
    details: [
      t('featureItems.clarityEnhancer.details.1'),
      t('featureItems.clarityEnhancer.details.2'),
      t('featureItems.clarityEnhancer.details.3'),
      t('featureItems.clarityEnhancer.details.4'),
      t('featureItems.clarityEnhancer.details.5')
    ],
    image: '/assets/images/audio-enhancement/clarity-enhancer.webp',
    color: 'from-indigo-500/10 to-indigo-600/5',
    borderColor: 'border-indigo-500/20',
    iconBg: 'bg-indigo-500/20',
    beforeAfterAudio: {
      before: '/assets/audio/clarity-before.mp3',
      after: '/assets/audio/clarity-after.mp3',
    }
  },
  {
    id: 'neural-processor',
    title: t('featureItems.neuralProcessor.title'),
    description: t('featureItems.neuralProcessor.description'),
    icon: <BrainCircuit size={24}/>,
    details: [
      t('featureItems.neuralProcessor.details.1'),
      t('featureItems.neuralProcessor.details.2'),
      t('featureItems.neuralProcessor.details.3'),
      t('featureItems.neuralProcessor.details.4'),
      t('featureItems.neuralProcessor.details.5')
    ],
    image: '/assets/images/audio-enhancement/neural-processor.webp',
    color: 'from-pink-500/10 to-pink-600/5',
    borderColor: 'border-pink-500/20',
    iconBg: 'bg-pink-500/20',
    beforeAfterAudio: {
      before: '/assets/audio/neural-before.mp3',
      after: '/assets/audio/neural-after.mp3',
    }
  },
  {
    id: 'speaker-optimizer',
    title: t('featureItems.speakerOptimizer.title'),
    description: t('featureItems.speakerOptimizer.description'),
    icon: <Headphones size={24}/>,
    details: [
      t('featureItems.speakerOptimizer.details.1'),
      t('featureItems.speakerOptimizer.details.2'),
      t('featureItems.speakerOptimizer.details.3'),
      t('featureItems.speakerOptimizer.details.4'),
      t('featureItems.speakerOptimizer.details.5')
    ],
    image: '/assets/images/audio-enhancement/speaker-optimizer.webp',
    color: 'from-cyan-500/10 to-cyan-600/5',
    borderColor: 'border-cyan-500/20',
    iconBg: 'bg-cyan-500/20',
    beforeAfterAudio: {
      before: '/assets/audio/speaker-before.mp3',
      after: '/assets/audio/speaker-after.mp3',
    }
  },
  {
    id: 'content-detection',
    title: t('featureItems.contentDetection.title'),
    description: t('featureItems.contentDetection.description'),
    icon: <Waves size={24}/>,
    details: [
      t('featureItems.contentDetection.details.1'),
      t('featureItems.contentDetection.details.2'),
      t('featureItems.contentDetection.details.3'),
      t('featureItems.contentDetection.details.4'),
      t('featureItems.contentDetection.details.5')
    ],
    image: '/assets/images/audio-enhancement/content-detection.webp',
    color: 'from-red-500/10 to-red-600/5',
    borderColor: 'border-red-500/20',
    iconBg: 'bg-red-500/20'
  }
];

// Use cases specific to Audio Enhancement
const useCases = [
  {
    title: 'Video Conferencing',
    description: 'Ensure crystal clear communication with noise suppression, voice enhancement, and consistent audio levels during virtual meetings.',
    icon: <MessageSquare size={24}/>,
    color: 'bg-blue-500/20',
    benefits: [
      'Remove background noise from home or office environments',
      'Make your voice sound clear and professional',
      'Prevent sudden volume changes from notifications',
      'Easy preset switching for different meeting scenarios'
    ]
  },
  {
    title: 'Content Creation',
    description: 'Achieve professional-grade audio for videos, podcasts, and streams without expensive equipment or complex setups.',
    icon: <PlaySquare size={24}/>,
    color: 'bg-purple-500/20',
    benefits: [
      'Studio-quality voice enhancement for recordings',
      'Real-time processing eliminates post-production time',
      'Content-aware optimization for different audio sources',
      'Consistent audio quality across all your content'
    ]
  },
  {
    title: 'Music Listening',
    description: 'Transform your music experience with enhanced clarity, balanced frequency response, and optimized sound for your specific headphones or speakers.',
    icon: <Music size={24}/>,
    color: 'bg-green-500/20',
    benefits: [
      "Hear details in music you've never noticed before",
      'Custom profiles for your specific audio devices',
      'Intelligent equalization for different music genres',
      'Dynamic range optimization for any listening environment'
    ]
  },
  {
    title: 'Gaming Audio',
    description: 'Gain a competitive edge with enhanced spatial awareness, clearer in-game communication, and optimized game audio.',
    icon: <Headphones size={24}/>,
    color: 'bg-amber-500/20',
    benefits: [
      'Better positional audio awareness in games',
      'Crystal clear team communication',
      'Reduce ear fatigue during long gaming sessions',
      'Custom profiles for different game genres'
    ]
  }
];

// Demo settings for Before/After comparison
const demoSettings = {
  'noise-suppression': {
    name: 'Noise Suppression',
    settings: [
      {name: 'Suppression Strength', value: 80},
      {name: 'Focus on Voice', value: true},
      {name: 'Preserve Ambience', value: 20},
      {name: 'AI Processing Level', value: 'High'}
    ],
    noiseTypes: ['Keyboard', 'Fan', 'Background Voices', 'Street Noise', 'Office Ambient']
  },
  'voice-enhancement': {
    name: 'Voice Enhancement',
    settings: [
      {name: 'Clarity', value: 75},
      {name: 'Warmth', value: 60},
      {name: 'De-essing', value: 40},
      {name: 'De-reverb', value: 50}
    ]
  },
  'dynamic-processor': {
    name: 'Dynamic Processing',
    settings: [
      {name: 'Compression', value: 60},
      {name: 'Limiting', value: 50},
      {name: 'Dynamic Range', value: 70},
      {name: 'Normalization Target', value: -14}
    ]
  },
  'equalizer': {
    name: 'Adaptive EQ',
    settings: [
      {name: 'Bass', value: 60},
      {name: 'Midrange', value: 50},
      {name: 'Treble', value: 65},
      {name: 'Brilliance', value: 55}
    ],
    activePreset: 'Voice Clarity'
  }
};

// FAQ data
// This function will be called inside the component to access translations
const getFaqs = (t: any) => [
  {
    question: t('faq.questions.1'),
    answer: t('faq.answers.1')
  },
  {
    question: t('faq.questions.2'),
    answer: t('faq.answers.2')
  },
  {
    question: t('faq.questions.3'),
    answer: t('faq.answers.3')
  },
  {
    question: t('faq.questions.4'),
    answer: t('faq.answers.4')
  },
  {
    question: t('faq.questions.5'),
    answer: t('faq.answers.5')
  },
  {
    question: t('faq.questions.6'),
    answer: t('faq.answers.6')
  }
];

// Enhancement presets for the interactive demo
// This function will be called inside the component to access translations
const getEnhancementPresets = (t: any) => [
  {id: 'default', name: t('demoItems.presets.default'), icon: <Settings size={16}/>},
  {id: 'voice-clarity', name: t('demoItems.presets.voiceClarity'), icon: <Mic size={16}/>},
  {id: 'music', name: t('demoItems.presets.music'), icon: <Music size={16}/>},
  {id: 'gaming', name: t('demoItems.presets.gaming'), icon: <Headphones size={16}/>},
  {id: 'noise-elimination', name: t('demoItems.presets.noiseReduction'), icon: <VolumeX size={16}/>}
];

export default function AudioEnhancementPage() {
  // Initialize translations
  const t = useTranslations('audioEnhancement');
  
  // Get localized features data
  const audioEnhancementFeatures = getAudioEnhancementFeatures(t);
  
  // Get localized FAQ data
  const faqs = getFaqs(t);
  
  // Get localized enhancement presets
  const enhancementPresets = getEnhancementPresets(t);
  
  // State for interactive demo
  const [activeFeature, setActiveFeature] = useState('noise-suppression');
  const [enhancementLevel, setEnhancementLevel] = useState(75);
  const [activePreset, setActivePreset] = useState('default');
  const [aiProcessingEnabled, setAiProcessingEnabled] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [isPlaying, setIsPlaying] = useState({
    before: false,
    after: false
  });

  // Audio refs
  const audioRefBefore = useRef<HTMLAudioElement | null>(null);
  const audioRefAfter = useRef<HTMLAudioElement | null>(null);

  // Demo settings
  const demoSettings = {
    'noise-suppression': {
      before: 'High background noise, distracting elements',
      after: 'Crystal clear audio with minimal noise'
    },
    'voice-enhancement': {
      before: 'Muffled speech with poor articulation',
      after: 'Clear, professional voice quality'
    },
    'dynamic-processor': {
      before: 'Inconsistent volume levels with peaks and dips',
      after: 'Balanced, consistent audio levels'
    },
    'equalizer': {
      before: 'Unbalanced frequency response',
      after: 'Rich, full-spectrum sound'
    }
  };

  // Refs for scroll animations
  const heroRef = useRef(null);
  const demoRef = useRef(null);
  const featuresRef = useRef(null);
  const techRef = useRef(null);

  // Check if sections are in view
  const isHeroInView = useInView(heroRef, {once: false, margin: "-100px 0px"});
  const isInView = useInView(demoRef, {once: false, margin: "-100px 0px"});

  // Use local state for cross-compatibility with Next.js async APIs
  const [isDemoInView, setIsDemoInView] = useState(false);

  // Update isDemoInView when isInView changes
  useEffect(() => {
    setIsDemoInView(isInView);
  }, [isInView]);

  // Audio Context and processing nodes
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeBeforeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const sourceNodeAfterRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const compressorNodeRef = useRef<DynamicsCompressorNode | null>(null);

  // Initialize audio on component mount
  useEffect(() => {
    // Create audio elements
    if (!audioRefBefore.current) {
      audioRefBefore.current = new Audio();
      audioRefBefore.current.preload = 'metadata';
    }

    if (!audioRefAfter.current) {
      audioRefAfter.current = new Audio();
      audioRefAfter.current.preload = 'metadata';
    }

    // Set initial sources based on active feature
    updateAudioSources(activeFeature);

    // Initialize Audio Context and processing nodes
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();

        // Create analyzer nodes for visualizations
        if (audioContextRef.current) {
          analyzerBeforeRef.current = audioContextRef.current.createAnalyser();
          analyzerBeforeRef.current.fftSize = 256;

          analyzerAfterRef.current = audioContextRef.current.createAnalyser();
          analyzerAfterRef.current.fftSize = 256;
        }
      } catch (error) {
        console.error("Failed to create Audio Context:", error);
      }
    }

    // Set up animation frame for visualization
    let animationFrameId: number;

    if (audioInitialized && analyzerBeforeRef.current && analyzerAfterRef.current) {
      const beforeCanvas = beforeCanvasRef.current;
      const afterCanvas = afterCanvasRef.current;

      if (beforeCanvas && afterCanvas) {
        const beforeCtx = beforeCanvas.getContext('2d');
        const afterCtx = afterCanvas.getContext('2d');

        if (beforeCtx && afterCtx) {
          const drawVisualizer = () => {
            // Draw visualization only if canvas is visible
            if (isDemoInView) {
              // Before audio visualization
              const beforeBufferLength = analyzerBeforeRef.current!.frequencyBinCount;
              const beforeDataArray = new Uint8Array(beforeBufferLength);
              analyzerBeforeRef.current!.getByteFrequencyData(beforeDataArray);

              beforeCtx.clearRect(0, 0, beforeCanvas.width, beforeCanvas.height);
              beforeCtx.fillStyle = 'rgba(30, 30, 30, 0.2)';
              beforeCtx.fillRect(0, 0, beforeCanvas.width, beforeCanvas.height);

              const beforeBarWidth = (beforeCanvas.width / beforeBufferLength) * 2.5;
              let beforeX = 0;

              for (let i = 0; i < beforeBufferLength; i++) {
                const beforeBarHeight = beforeDataArray[i] / 2;

                beforeCtx.fillStyle = `rgba(75, 85, 99, ${isPlaying.before ? 0.8 : 0.4})`;
                beforeCtx.fillRect(beforeX, beforeCanvas.height - beforeBarHeight, beforeBarWidth, beforeBarHeight);

                beforeX += beforeBarWidth + 1;
              }

              // After audio visualization with enhancement-based colors
              const afterBufferLength = analyzerAfterRef.current!.frequencyBinCount;
              const afterDataArray = new Uint8Array(afterBufferLength);
              analyzerAfterRef.current!.getByteFrequencyData(afterDataArray);

              afterCtx.clearRect(0, 0, afterCanvas.width, afterCanvas.height);
              afterCtx.fillStyle = 'rgba(30, 30, 30, 0.2)';
              afterCtx.fillRect(0, 0, afterCanvas.width, afterCanvas.height);

              const afterBarWidth = (afterCanvas.width / afterBufferLength) * 2.5;
              let afterX = 0;

              // Enhancement level affects color intensity
              const greenIntensity = Math.min(100, 20 + enhancementLevel);
              const alpha = isPlaying.after ? 0.8 : 0.4;

              for (let i = 0; i < afterBufferLength; i++) {
                // Enhancement level affects bar height boost
                const heightBoost = 1 + (enhancementLevel / 100);
                const afterBarHeight = (afterDataArray[i] / 2) * heightBoost;

                afterCtx.fillStyle = `rgba(34, ${greenIntensity}, 94, ${alpha})`;
                afterCtx.fillRect(afterX, afterCanvas.height - afterBarHeight, afterBarWidth, afterBarHeight);

                afterX += afterBarWidth + 1;
              }
            }

            animationFrameId = requestAnimationFrame(drawVisualizer);
          };

          drawVisualizer();
        }
      }
    }

    // Clean up on unmount
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      if (audioRefBefore.current) {
        audioRefBefore.current.pause();
        audioRefBefore.current.src = '';
      }
      if (audioRefAfter.current) {
        audioRefAfter.current.pause();
        audioRefAfter.current.src = '';
      }

      // Disconnect and close audio nodes
      if (sourceNodeBeforeRef.current) {
        sourceNodeBeforeRef.current.disconnect();
      }
      if (sourceNodeAfterRef.current) {
        sourceNodeAfterRef.current.disconnect();
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
      }
      if (filterNodeRef.current) {
        filterNodeRef.current.disconnect();
      }
      if (compressorNodeRef.current) {
        compressorNodeRef.current.disconnect();
      }
      if (analyzerBeforeRef.current) {
        analyzerBeforeRef.current.disconnect();
      }
      if (analyzerAfterRef.current) {
        analyzerAfterRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isDemoInView]);

  // Set up audio processing nodes after user interaction
  const setupAudioProcessing = () => {
    if (!audioContextRef.current ||
        !audioRefBefore.current ||
        !audioRefAfter.current ||
        !analyzerBeforeRef.current ||
        !analyzerAfterRef.current) return;

    try {
      // Create audio source nodes if they don't exist
      if (!sourceNodeBeforeRef.current) {
        sourceNodeBeforeRef.current = audioContextRef.current.createMediaElementSource(audioRefBefore.current);
        // Connect "Before" audio to analyzer and then to destination
        sourceNodeBeforeRef.current.connect(analyzerBeforeRef.current);
        analyzerBeforeRef.current.connect(audioContextRef.current.destination);
      }

      if (!sourceNodeAfterRef.current) {
        sourceNodeAfterRef.current = audioContextRef.current.createMediaElementSource(audioRefAfter.current);

        // Create processing nodes for "after" audio
        // 1. Gain node for volume control
        gainNodeRef.current = audioContextRef.current.createGain();

        // 2. Filter node for clarity/EQ
        filterNodeRef.current = audioContextRef.current.createBiquadFilter();
        filterNodeRef.current.type = 'highshelf';
        filterNodeRef.current.frequency.value = 1000;

        // 3. Compressor for dynamics processing
        compressorNodeRef.current = audioContextRef.current.createDynamicsCompressor();

        // Connect "after" audio through processing chain
        sourceNodeAfterRef.current.connect(filterNodeRef.current);
        filterNodeRef.current.connect(compressorNodeRef.current);
        compressorNodeRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(analyzerAfterRef.current);
        analyzerAfterRef.current.connect(audioContextRef.current.destination);

        // Apply initial enhancement level
        applyEnhancementLevel(enhancementLevel);
      }
    } catch (error) {
      console.error("Failed to set up audio processing:", error);
    }
  };

  // Apply enhancement level to audio processing nodes
  const applyEnhancementLevel = (level: number) => {
    if (!filterNodeRef.current || !compressorNodeRef.current || !gainNodeRef.current) return;

    // Update the "after" audio source based on enhancement level
    if (audioRefAfter.current && activeFeature === 'noise-suppression') {
      // Select appropriate audio file based on enhancement level
      let audioFile = '/assets/audio/audio-enhancements/with-full-enhancement.mp3';

      if (level < 25) {
        audioFile = '/assets/audio/audio-enhancements/minus-12db-backgound-noise.mp3';
      } else if (level < 50) {
        audioFile = '/assets/audio/audio-enhancements/minus-15db-backgound-noise.mp3';
      } else if (level < 75) {
        audioFile = '/assets/audio/audio-enhancements/minus-26db-backgound-noise.mp3';
      } else if (level < 90) {
        audioFile = '/assets/audio/audio-enhancements/minus-34db-backgound-noise.mp3';
      } else {
        audioFile = '/assets/audio/audio-enhancements/with-full-enhancement.mp3';
      }

      // Only update the source if it's different
      if (audioRefAfter.current.src !== new URL(audioFile, window.location.href).href) {
        // Store current time and playing state
        const currentTime = audioRefAfter.current.currentTime;
        const wasPlaying = !audioRefAfter.current.paused;

        // Update source
        audioRefAfter.current.src = audioFile;

        // If it was playing, reload and continue from same position
        if (wasPlaying) {
          audioRefAfter.current.load();
          audioRefAfter.current.currentTime = currentTime;
          audioRefAfter.current.play().catch(e => console.error("Error restarting audio:", e));
        }
      }
    }

    // Map enhancement level (0-100) to audio parameters for Web Audio API nodes
    // Higher enhancement means:
    // 1. More gain for clarity
    const normalizedGain = 1 + (level * 0.01); // 1.0 to 2.0
    gainNodeRef.current.gain.value = normalizedGain;

    // 2. Higher clarity (filter boost)
    const filterGain = level * 0.1; // 0 to 10 dB
    filterNodeRef.current.gain.value = filterGain;

    // 3. More compression for consistent sound
    const compressionRatio = 1 + (level * 0.09); // 1 to 10
    const threshold = -40 + (level * 0.2); // -40 to -20 dB
    compressorNodeRef.current.ratio.value = compressionRatio;
    compressorNodeRef.current.threshold.value = threshold;

    // Different processing based on active feature/preset
    if (activeFeature === 'noise-suppression') {
      // More aggressive noise filtering
      const filterFreq = 200 + (level * 5); // 200 to 700 Hz
      filterNodeRef.current.type = 'highpass';
      filterNodeRef.current.frequency.value = filterFreq;
    }
    else if (activeFeature === 'voice-enhancement') {
      // Voice enhancement (mid boost)
      filterNodeRef.current.type = 'peaking';
      filterNodeRef.current.frequency.value = 1000 + (level * 10); // Voice frequencies
      filterNodeRef.current.Q.value = 1.0;
    }
    else if (activeFeature === 'dynamic-processor') {
      // Stronger compression for dynamics
      compressorNodeRef.current.ratio.value = 2 + (level * 0.18); // 2 to 20
      compressorNodeRef.current.knee.value = 30 - (level * 0.25); // 30 to 5
    }
    else if (activeFeature === 'equalizer') {
      // EQ enhancement
      filterNodeRef.current.type = 'highshelf';
      filterNodeRef.current.frequency.value = 2000;
      filterNodeRef.current.gain.value = level * 0.15; // 0 to 15 dB
    }
  };

  // Update enhancement level and apply changes to audio processing
  const handleEnhancementLevelChange = (newLevel: number) => {
    console.log("Changing enhancement level to:", newLevel);
    setEnhancementLevel(newLevel);

    // If we're on noise suppression feature, update the audio file based on level
    if (activeFeature === 'noise-suppression' && audioRefAfter.current) {
      const currentlyPlaying = isPlaying.after;
      const currentTime = audioRefAfter.current.currentTime;

      let audioFile = '/assets/audio/audio-enhancements/with-full-enhancement.mp3';

      if (newLevel < 25) {
        audioFile = '/assets/audio/audio-enhancements/minus-12db-backgound-noise.mp3';
      } else if (newLevel < 50) {
        audioFile = '/assets/audio/audio-enhancements/minus-15db-backgound-noise.mp3';
      } else if (newLevel < 75) {
        audioFile = '/assets/audio/audio-enhancements/minus-26db-backgound-noise.mp3';
      } else if (newLevel < 90) {
        audioFile = '/assets/audio/audio-enhancements/minus-34db-backgound-noise.mp3';
      }

      // Only update if source is different
      if (audioRefAfter.current.src !== new URL(audioFile, window.location.href).href) {
        console.log("Updating after audio source to:", audioFile);
        audioRefAfter.current.src = audioFile;

        // If it was playing, try to maintain state
        if (currentlyPlaying) {
          audioRefAfter.current.currentTime = currentTime;
          audioRefAfter.current.play().catch(e => {
            console.error("Error restarting audio after source change:", e);
          });
        }
      }
    }

    // Update audio characteristics based on enhancement level
    setAudioCharacteristics({
      noiseReduction: activeFeature === 'noise-suppression' ? newLevel : newLevel * 0.7,
      clarity: activeFeature === 'voice-enhancement' ? newLevel : newLevel * 0.6,
      dynamics: activeFeature === 'dynamic-processor' ? newLevel : newLevel * 0.5,
      balance: activeFeature === 'equalizer' ? newLevel : newLevel * 0.4
    });
  };

  // Handle user interaction to initialize audio
  const handleUserInteraction = async () => {
    console.log("User interaction triggered");
    // This function will be called on user click to enable audio
    if (!audioInitialized) {
      try {
        // Create audio elements if they don't exist
        if (!audioRefBefore.current) {
          audioRefBefore.current = new Audio();
          audioRefBefore.current.preload = 'metadata';
        }

        if (!audioRefAfter.current) {
          audioRefAfter.current = new Audio();
          audioRefAfter.current.preload = 'metadata';
        }

        // Set sources
        updateAudioSources(activeFeature);

        // Initialize Audio Context if needed
        if (typeof window !== 'undefined' && !audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        // Resume audio context if needed
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        // Try to play and immediately pause to initialize audio
        if (audioRefBefore.current) {
          console.log("Initializing before audio with source:", audioRefBefore.current.src);
          const playPromise = audioRefBefore.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            audioRefBefore.current.pause();
            audioRefBefore.current.currentTime = 0;
          }
        }

        if (audioRefAfter.current) {
          console.log("Initializing after audio with source:", audioRefAfter.current.src);
          const playPromise = audioRefAfter.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            audioRefAfter.current.pause();
            audioRefAfter.current.currentTime = 0;
          }
        }

        setAudioInitialized(true);
        console.log("Audio initialized successfully");
      } catch (error) {
        console.error("Failed to initialize audio:", error);
      }
    }
  };

  // Toggle audio playback with proper error handling
  const toggleAudioPlayback = async (type: 'before' | 'after') => {
    console.log(`Toggling ${type} audio`);

    // Ensure audio is initialized
    if (!audioInitialized) {
      await handleUserInteraction();
    }

    const audioRef = type === 'before' ? audioRefBefore : audioRefAfter;

    if (!audioRef.current) {
      console.error(`${type} audio reference is null`);
      return;
    }

    try {
      if (isPlaying[type]) {
        console.log(`Pausing ${type} audio`);
        audioRef.current.pause();
        setIsPlaying(prev => ({...prev, [type]: false}));
      } else {
        // Pause the other audio if it's playing
        if (type === 'before' && isPlaying.after && audioRefAfter.current) {
          console.log("Pausing after audio");
          audioRefAfter.current.pause();
          setIsPlaying(prev => ({...prev, after: false}));
        } else if (type === 'after' && isPlaying.before && audioRefBefore.current) {
          console.log("Pausing before audio");
          audioRefBefore.current.pause();
          setIsPlaying(prev => ({...prev, before: false}));
        }

        // Try to play the audio
        console.log(`Playing ${type} audio with source:`, audioRef.current.src);
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
              .then(() => {
                console.log(`${type} audio playback started`);
                setIsPlaying(prev => ({...prev, [type]: true}));
              })
              .catch(error => {
                console.error(`${type} audio playback prevented:`, error);
              });
        }
      }
    } catch (error) {
      console.error(`Error toggling ${type} audio playback:`, error);
    }
  };

  // Handle audio end event
  useEffect(() => {
    const handleBeforeAudioEnd = () => {
      setIsPlaying(prev => ({...prev, before: false}));
    };

    const handleAfterAudioEnd = () => {
      setIsPlaying(prev => ({...prev, after: false}));
    };

    if (audioRefBefore.current) {
      audioRefBefore.current.addEventListener('ended', handleBeforeAudioEnd);
    }

    if (audioRefAfter.current) {
      audioRefAfter.current.addEventListener('ended', handleAfterAudioEnd);
    }

    return () => {
      if (audioRefBefore.current) {
        audioRefBefore.current.removeEventListener('ended', handleBeforeAudioEnd);
      }

      if (audioRefAfter.current) {
        audioRefAfter.current.removeEventListener('ended', handleAfterAudioEnd);
      }
    };
  }, []);

  // Apply enhancement preset
  const applyPreset = (presetId: string) => {
    setActivePreset(presetId);

    // Simulate different preset behaviors
    if (presetId === 'voice-clarity') {
      setEnhancementLevel(85);
    } else if (presetId === 'music') {
      setEnhancementLevel(70);
    } else if (presetId === 'gaming') {
      setEnhancementLevel(80);
    } else if (presetId === 'noise-elimination') {
      setEnhancementLevel(100);
    } else {
      // Default preset
      setEnhancementLevel(75);
    }
  };

  // Toggle FAQ expansion
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Animation variants
  const fadeInUpVariant = {
    hidden: {opacity: 0, y: 20},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const staggerChildrenVariant = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariant = {
    hidden: {opacity: 0, y: 20},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Find active feature
  const currentFeature = audioEnhancementFeatures.find(feature => feature.id === activeFeature) || audioEnhancementFeatures[0];

  // Helper function to update audio sources
  const updateAudioSources = (featureId: string) => {
    const currentFeature = audioEnhancementFeatures.find(feature => feature.id === featureId) || audioEnhancementFeatures[0];

    // Always use audio-enhancements folder files for noise suppression
    if (featureId === 'noise-suppression') {
      // For noise suppression, always use the files from audio-enhancements folder
      if (audioRefBefore.current) {
        audioRefBefore.current.src = '/assets/audio/audio-enhancements/without-enhancement.mp3';
      }

      // Select the appropriate "after" file based on enhancement level
      if (audioRefAfter.current) {
        let audioFile = '/assets/audio/audio-enhancements/with-full-enhancement.mp3';

        if (enhancementLevel < 25) {
          audioFile = '/assets/audio/audio-enhancements/minus-12db-backgound-noise.mp3';
        } else if (enhancementLevel < 50) {
          audioFile = '/assets/audio/audio-enhancements/minus-15db-backgound-noise.mp3';
        } else if (enhancementLevel < 75) {
          audioFile = '/assets/audio/audio-enhancements/minus-26db-backgound-noise.mp3';
        } else if (enhancementLevel < 90) {
          audioFile = '/assets/audio/audio-enhancements/minus-34db-backgound-noise.mp3';
        }

        audioRefAfter.current.src = audioFile;
      }
    } else if (currentFeature.beforeAfterAudio) {
      // For other features, use the predefined audio files
      if (audioRefBefore.current) {
        audioRefBefore.current.src = currentFeature.beforeAfterAudio.before;
      }
      if (audioRefAfter.current) {
        audioRefAfter.current.src = currentFeature.beforeAfterAudio.after;
      }
    } else {
      // Fallback to files from audio-enhancements folder
      if (audioRefBefore.current) {
        audioRefBefore.current.src = '/assets/audio/audio-enhancements/without-enhancement.mp3';
      }
      if (audioRefAfter.current) {
        audioRefAfter.current.src = '/assets/audio/audio-enhancements/with-full-enhancement.mp3';
      }
    }

    // Reset playing state when changing sources
    setIsPlaying({
      before: false,
      after: false
    });
  };

  // Update audio sources when active feature changes
  useEffect(() => {
    updateAudioSources(activeFeature);

    // If audio is already initialized, update the processing parameters
    if (audioInitialized && filterNodeRef.current && compressorNodeRef.current) {
      applyEnhancementLevel(enhancementLevel);
    }
  }, [activeFeature]);

  // Before the declaration of audioContextRef, add these new refs:
  const analyzerBeforeRef = useRef<AnalyserNode | null>(null);
  const analyzerAfterRef = useRef<AnalyserNode | null>(null);
  const beforeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const afterCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Add a new state for audio characteristics:
  const [audioCharacteristics, setAudioCharacteristics] = useState({
    noiseReduction: 0,
    clarity: 0,
    dynamics: 0,
    balance: 0
  });

  return (
      <main className="bg-black text-white min-h-screen">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div
              className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-green-500/20 to-transparent"></div>
          <div
              className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
          <div
              className="absolute top-20 left-1/4 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[120px]"></div>
          <div
              className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px]"></div>

          {/* Audio waveform ambient pattern */}
          <div className="absolute inset-y-1/3 inset-x-0 h-40 opacity-10">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60" stroke="#22c55e" strokeWidth="2"
                    fill="none">
                <animate attributeName="d"
                         values="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60; M0,60 Q150,100 300,60 T600,60 T900,60 T1200,60; M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60"
                         dur="10s" repeatCount="indefinite"/>
              </path>
              <path d="M0,60 Q150,100 300,60 T600,60 T900,60 T1200,60" stroke="#22c55e" strokeWidth="2"
                    fill="none">
                <animate attributeName="d"
                         values="M0,60 Q150,100 300,60 T600,60 T900,60 T1200,60; M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60; M0,60 Q150,100 300,60 T600,60 T900,60 T1200,60"
                         dur="10s" repeatCount="indefinite"/>
              </path>
            </svg>
          </div>
        </div>

        {/* Hero Section */}
       <HeroSection heroRef={heroRef} isHeroInView={isHeroInView} fadeInUpVariant={fadeInUpVariant}/>

          {/* Features Section */}
       <FeaturesSection/>

       

        {/* Before/After Interactive Demo Section */}
        <section id="interactive-demo" className="py-24 relative" ref={demoRef}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
                initial="hidden"
                animate={isDemoInView ? "visible" : "hidden"}
                variants={fadeInUpVariant}
                className="text-center mb-16"
            >
              <div
                  className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
                <Wand2 size={14} className="text-green-400 mr-2"/>
                <span className="text-sm text-green-400 font-medium">{t('interactiveDemo.badge')}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('interactiveDemo.title')}</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                {t('interactiveDemo.description')}
              </p>
            </motion.div>

            <motion.div
                initial={{opacity: 0, y: 40}}
                animate={isDemoInView ? {opacity: 1, y: 0} : {opacity: 0, y: 40}}
                transition={{duration: 0.8, delay: 0.2}}
                className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Demo Header with Controls */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Audio Enhancement Demo</h3>
                    <p className="text-green-400 text-sm">Interactive Before & After Comparison</p>
                  </div>

                  <div className="flex flex-wrap gap-4 items-center">
                    {/* Enhancement Level Slider */}
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                      <Wand2 size={20} className="text-green-500"/>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">{t('demoItems.interface.enhancementLevel')}</div>
                        <div className="flex items-center gap-2">
                          <input
                              type="range"
                              min="0"
                              max="100"
                              value={enhancementLevel}
                              onChange={(e) => handleEnhancementLevelChange(parseInt(e.target.value))}
                              className="w-32 accent-green-500"
                          />
                          <span className="text-sm font-medium w-8 text-white">{enhancementLevel}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Preset Selector */}
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-gray-800">
                      <div className="text-xs text-gray-400 mb-2">{t('demoItems.interface.enhancementPreset')}</div>
                      <div className="flex flex-wrap gap-2">
                        {enhancementPresets.map(preset => (
                            <button
                                key={preset.id}
                                onClick={() => applyPreset(preset.id)}
                                className={`px-3 py-1.5 text-xs rounded-md flex items-center gap-1.5 transition-colors ${
                                    activePreset === preset.id
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                            >
                              {preset.icon}
                              <span>{preset.name}</span>
                            </button>
                        ))}
                      </div>
                    </div>

                    {/* AI Processing Toggle */}
                    <div
                        className="bg-black/30 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{t('interactiveDemo.aiProcessing')}</span>
                        <label className="relative inline-flex items-center cursor-pointer ml-2">
                          <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={aiProcessingEnabled}
                              onChange={() => setAiProcessingEnabled(!aiProcessingEnabled)}
                          />
                          <div
                              className="w-9 h-5 bg-gray-700 rounded-full peer peer-focus:ring-1 peer-focus:ring-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Enhancement Type */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {audioEnhancementFeatures.slice(0, 4).map(feature => (
                      <button
                          key={feature.id}
                          onClick={() => setActiveFeature(feature.id)}
                          className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                              activeFeature === feature.id
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                                  : 'bg-black/30 text-gray-300 hover:bg-gray-800'
                          }`}
                      >
                        <div
                            className={`${activeFeature === feature.id ? 'bg-white/20' : feature.iconBg} w-6 h-6 rounded-md flex items-center justify-center`}>
                          {feature.icon}
                        </div>
                        <span>{feature.title}</span>
                      </button>
                  ))}
                </div>
              </div>

              {/* Before/After Comparison */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Before Panel */}
                  <div className="bg-gray-900/70 border border-gray-800 rounded-xl overflow-hidden">
                    <div
                        className="bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <VolumeX size={20} className="text-gray-400"/>
                        <h4 className="font-medium text-white">{t('interactiveDemo.beforeEnhancement')}</h4>
                      </div>
                      <div className="text-xs text-gray-400">{t('interactiveDemo.originalAudio')}</div>
                    </div>

                    <div className="p-5">
                      {/* Waveform Visualization - Original */}
                      <div
                          className="h-48 bg-black/50 rounded-lg border border-gray-700 overflow-hidden mb-4 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-gray-500 mb-8">Original Audio</div>
                        </div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                              onClick={() => {
                                console.log("Before audio button clicked");
                                handleUserInteraction();
                                toggleAudioPlayback('before');
                              }}
                              className="w-16 h-16 bg-gray-800/80 hover:bg-gray-700/80 transition-colors backdrop-blur-sm rounded-full flex items-center justify-center"
                          >
                            {isPlaying.before ? <Pause size={32}/> :
                                <Play size={32} className="ml-1"/>}
                          </button>
                        </div>

                        {!audioInitialized && (
                            <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                              <div className="bg-yellow-600/50 text-yellow-200 text-xs px-2 py-1 rounded">
                                Click to enable audio
                              </div>
                            </div>
                        )}
                      </div>

                      {/* Audio Characteristics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <div className="bg-gray-800 p-1.5 rounded-lg">
                            <VolumeX size={16} className="text-gray-400"/>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">
                              {t('interactiveDemo.characteristics.backgroundNoise')}
                            </div>
                            <div className="text-xs text-gray-400">{t('interactiveDemo.characteristics.high')}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="bg-gray-800 p-1.5 rounded-lg">
                            <Activity size={16} className="text-gray-400"/>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{t('interactiveDemo.characteristics.dynamicRange')}</div>
                            <div className="text-xs text-gray-400">{t('interactiveDemo.characteristics.inconsistent')}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="bg-gray-800 p-1.5 rounded-lg">
                            <Sliders size={16} className="text-gray-400"/>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Frequency Balance
                            </div>
                            <div className="text-xs text-gray-400">Unoptimized</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="bg-gray-800 p-1.5 rounded-lg">
                            <Mic size={16} className="text-gray-400"/>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Vocal Clarity</div>
                            <div className="text-xs text-gray-400">Poor</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* After Panel */}
                  <div
                      className="bg-gradient-to-b from-green-900/20 to-black/70 border border-green-800/30 rounded-xl overflow-hidden shadow-lg shadow-green-900/10">
                    <div
                        className="bg-gradient-to-r from-green-900/40 to-green-800/30 p-4 border-b border-green-800/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wand2 size={20} className="text-green-400"/>
                        <h4 className="font-medium text-white">{t('interactiveDemo.afterEnhancement')}</h4>
                      </div>
                      <div className="text-xs text-green-400 flex items-center gap-1">
                        <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        {t('interactiveDemo.processingActive')}
                      </div>
                    </div>

                    <div className="p-5">
                      {/* Waveform Visualization - Enhanced */}
                      <div className="h-48 bg-black/50 rounded-lg border border-green-800/30 overflow-hidden mb-4 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-green-500 mb-8">{t('interactiveDemo.enhancedAudio')}</div>
                        </div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                              onClick={() => {
                                console.log("After audio button clicked");
                                handleUserInteraction();
                                toggleAudioPlayback('after');
                              }}
                              className="w-16 h-16 bg-gradient-to-r from-green-500/30 to-emerald-600/30 hover:from-green-500/40 hover:to-emerald-600/40 transition-colors backdrop-blur-sm rounded-full flex items-center justify-center"
                          >
                            {isPlaying.after ? <Pause size={32}/> :
                                <Play size={32} className="ml-1"/>}
                          </button>
                        </div>

                        {!audioInitialized && (
                            <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                              <div className="bg-yellow-600/50 text-yellow-200 text-xs px-2 py-1 rounded">
                                Click to enable audio
                              </div>
                            </div>
                        )}
                      </div>

                      {/* Audio Characteristics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <div className="bg-green-800/50 p-1.5 rounded-lg">
                            <VolumeX size={16} className="text-green-400"/>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">
                              {t('interactiveDemo.characteristics.backgroundNoise')}
                            </div>
                            <div className="text-xs text-green-400">{t('interactiveDemo.characteristics.removed')}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="bg-green-800/50 p-1.5 rounded-lg">
                            <Activity size={16} className="text-green-400"/>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{t('interactiveDemo.characteristics.dynamicRange')}</div>
                            <div className="text-xs text-green-400">{t('interactiveDemo.characteristics.optimized')}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="bg-green-800/50 p-1.5 rounded-lg">
                            <Sliders size={16} className="text-green-400"/>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">
                              {t('interactiveDemo.characteristics.frequencyBalance')}
                            </div>
                            <div className="text-xs text-green-400">{t('interactiveDemo.characteristics.enhanced')}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="bg-green-800/50 p-1.5 rounded-lg">
                            <Mic size={16} className="text-green-400"/>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{t('interactiveDemo.characteristics.vocalClarity')}</div>
                            <div className="text-xs text-green-400">{t('interactiveDemo.characteristics.crystalClear')}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add an interactive comparison tool below the waveform visualization in the After Panel */}
                <div className="mt-6 mb-8">
                  <div className="text-sm font-medium text-white mb-2">Enhancement Characteristics</div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="text-xs text-gray-400 w-32">Noise Reduction</div>
                      <div className="flex-1 bg-gray-800 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full"
                            style={{ width: `${audioCharacteristics.noiseReduction}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-white w-8 text-right">{Math.round(audioCharacteristics.noiseReduction)}%</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-xs text-gray-400 w-32">Voice Clarity</div>
                      <div className="flex-1 bg-gray-800 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full"
                            style={{ width: `${audioCharacteristics.clarity}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-white w-8 text-right">{Math.round(audioCharacteristics.clarity)}%</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-xs text-gray-400 w-32">Dynamic Range</div>
                      <div className="flex-1 bg-gray-800 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full"
                            style={{ width: `${audioCharacteristics.dynamics}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-white w-8 text-right">{Math.round(audioCharacteristics.dynamics)}%</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-xs text-gray-400 w-32">Frequency Balance</div>
                      <div className="flex-1 bg-gray-800 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full"
                            style={{ width: `${audioCharacteristics.balance}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-white w-8 text-right">{Math.round(audioCharacteristics.balance)}%</div>
                    </div>
                  </div>
                </div>

                {/* Add an A/B Comparison button to the controls section */}
                <div className="mt-4 flex justify-center">
                  <button
                      onClick={() => {
                        console.log("A/B comparison button clicked");
                        handleUserInteraction();

                        // Pause any currently playing audio
                        if (audioRefBefore.current && isPlaying.before) {
                          audioRefBefore.current.pause();
                        }
                        if (audioRefAfter.current && isPlaying.after) {
                          audioRefAfter.current.pause();
                        }

                        // Reset state
                        setIsPlaying({ before: false, after: false });

                        // Play before audio for 3 seconds, then after audio
                        setTimeout(() => {
                          if (audioRefBefore.current) {
                            audioRefBefore.current.currentTime = 0;
                            audioRefBefore.current.play()
                                .then(() => {
                                  setIsPlaying(prev => ({ ...prev, before: true }));

                                  // After 3 seconds, switch to after audio
                                  setTimeout(() => {
                                    if (audioRefBefore.current) {
                                      audioRefBefore.current.pause();
                                      setIsPlaying(prev => ({ ...prev, before: false }));

                                      // Play after audio
                                      if (audioRefAfter.current) {
                                        audioRefAfter.current.currentTime = 0;
                                        audioRefAfter.current.play()
                                            .then(() => {
                                              setIsPlaying(prev => ({ ...prev, after: true }));
                                            })
                                            .catch(e => console.error("Error playing after audio:", e));
                                      }
                                    }
                                  }, 3000);
                                })
                                .catch(e => console.error("Error playing before audio:", e));
                          }
                        }, 300);
                      }}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <RefreshCw size={16} />
                    <span className="text-sm font-medium">A/B Compare</span>
                  </button>
                </div>

                {/* Audio Demo Status */}
                <div className="mt-6 bg-black/30 border border-gray-800 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${audioInitialized ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <span className="text-sm text-gray-400">Audio Engine Status:</span>
                      <span className={`text-sm font-medium ${audioInitialized ? 'text-green-400' : 'text-yellow-400'}`}>
                                            {audioInitialized ? 'Ready' : 'Click to Initialize Audio'}
                                        </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {enhancementLevel}% Enhancement • {activePreset} Profile
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo Footer */}
              <div className="border-t border-gray-800 p-4 bg-black/30">
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">Interactive demo - enhancement quality in the
                    actual application will be even better
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">AI Engine:</span>
                    <span className="text-xs text-green-500 flex items-center gap-1">
                    <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    Active
                  </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="mt-12 text-center">
              <p className="text-gray-300 mb-6">Ready to enhance your audio experience?</p>
              <Link
                  href="/download"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-all"
              >
                <Download size={20}/>
                <span>Download JyvDesktop</span>
              </Link>
            </div>
          </div>
        </section>

        {/* AI Technology Section */}
        <section className="py-24 bg-gray-900/30 relative overflow-hidden">
          <div
              className="absolute -top-40 right-0 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[150px]"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, margin: "-100px"}}
                variants={fadeInUpVariant}
                className="text-center mb-16"
            >
              <div
                  className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
                <BrainCircuit size={14} className="text-green-400 mr-2"/>
                <span className="text-sm text-green-400 font-medium">Advanced Technology</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">Powered by AI, Refined by Experts</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Our audio enhancement system combines cutting-edge artificial intelligence
                with professional audio engineering expertise to deliver unparalleled results.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                  <div className="aspect-video">
                    <Image
                        src="/assets/images/audio-enhancement/ai-technology.webp"
                        alt="AI Audio Enhancement Technology"
                        fill
                        className="object-cover"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-500/20 p-2 rounded-lg">
                        <BrainCircuit size={24} className="text-green-400"/>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">Neural Audio
                          Processing</h4>
                        <p className="text-sm text-gray-300">Deep learning models trained on
                          thousands of hours of audio</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">How Our AI Enhancement Works</h3>

                <div className="space-y-6">
                  <motion.div
                      className="flex items-start gap-4"
                      initial={{opacity: 0, x: 20}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={{once: true}}
                      transition={{duration: 0.5}}
                  >
                    <div className="bg-green-500/20 p-2 rounded-lg flex-shrink-0">
                      <PieChart size={24} className="text-green-400"/>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Intelligent Analysis</h4>
                      <p className="text-gray-300">Our AI analyzes audio in real-time, identifying
                        voice patterns, noise types, and acoustic characteristics with incredible
                        precision.</p>
                    </div>
                  </motion.div>

                  <motion.div
                      className="flex items-start gap-4"
                      initial={{opacity: 0, x: 20}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={{once: true}}
                      transition={{duration: 0.5, delay: 0.1}}
                  >
                    <div className="bg-green-500/20 p-2 rounded-lg flex-shrink-0">
                      <BrainCircuit size={24} className="text-green-400"/>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Neural Processing</h4>
                      <p className="text-gray-300">Advanced neural networks apply targeted
                        enhancements specifically tuned to the content type, whether it's voice,
                        music, or environmental sounds.</p>
                    </div>
                  </motion.div>

                  <motion.div
                      className="flex items-start gap-4"
                      initial={{opacity: 0, x: 20}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={{once: true}}
                      transition={{duration: 0.5, delay: 0.2}}
                  >
                    <div className="bg-green-500/20 p-2 rounded-lg flex-shrink-0">
                      <Waves size={24} className="text-green-400"/>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Adaptive Enhancement</h4>
                      <p className="text-gray-300">The system continually adapts in real-time,
                        responding to changing audio conditions and content to maintain optimal
                        quality.</p>
                    </div>
                  </motion.div>

                  <motion.div
                      className="flex items-start gap-4"
                      initial={{opacity: 0, x: 20}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={{once: true}}
                      transition={{duration: 0.5, delay: 0.3}}
                  >
                    <div className="bg-green-500/20 p-2 rounded-lg flex-shrink-0">
                      <Clock size={24} className="text-green-400"/>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Ultra-Low Latency</h4>
                      <p className="text-gray-300">All processing happens with less than 10ms latency,
                        ensuring perfect synchronization for real-time applications like calls and
                        streaming.</p>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-8">
                  <Link
                      href="/technology"
                      className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <span>Learn more about our AI technology</span>
                    <ArrowRight size={14}/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, margin: "-100px"}}
                variants={fadeInUpVariant}
                className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Audio Enhancement for Every Scenario</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                JyvDesktop's enhancement technology adapts to your specific needs, providing
                optimal audio quality for any use case.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                  <motion.div
                      key={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{once: true}}
                      variants={itemVariant}
                      custom={index}
                      className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden"
                  >
                    <div className="h-48 relative">
                      <Image
                          src={`/assets/images/use-cases/${useCase.title.toLowerCase().replace(/\s+/g, '-')}.webp`}
                          alt={useCase.title}
                          fill
                          className="object-cover"
                      />
                      <div
                          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-3">
                          <div
                              className={`${useCase.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                            {useCase.icon}
                          </div>
                          <h3 className="text-lg font-bold text-white">{useCase.title}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-300 mb-6">{useCase.description}</p>

                      <div className="mb-6">
                        <div className="text-sm text-gray-400 mb-3">Key Benefits:</div>
                        <ul className="space-y-2">
                          {useCase.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <ChevronRight size={16}
                                              className="text-green-500 mt-1 flex-shrink-0"/>
                                <span className="text-sm text-gray-300">{benefit}</span>
                              </li>
                          ))}
                        </ul>
                      </div>

                      <Link
                          href={`/use-cases/${useCase.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors text-sm"
                      >
                        <span>Learn more</span>
                        <ArrowRight size={14}/>
                      </Link>
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Performance Stats */}
        <section className="py-24 bg-gray-900/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, margin: "-100px"}}
                variants={fadeInUpVariant}
                className="text-center mb-16"
            >
              <div
                  className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
                <BarChart3 size={14} className="text-green-400 mr-2"/>
                <span className="text-sm text-green-400 font-medium">Performance</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">Engineered for Efficiency</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                JyvDesktop's audio enhancement delivers professional results while
                maintaining exceptional performance on any system.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true}}
                  transition={{duration: 0.5}}
                  className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6 text-center"
              >
                <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                  <Clock size={32} className="text-green-400"/>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">&lt;10ms</h3>
                <p className="text-gray-400">Processing Latency</p>
              </motion.div>

              <motion.div
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true}}
                  transition={{duration: 0.5, delay: 0.1}}
                  className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6 text-center"
              >
                <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                  <Zap size={32} className="text-green-400"/>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">3-8%</h3>
                <p className="text-gray-400">CPU Usage</p>
              </motion.div>

              <motion.div
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true}}
                  transition={{duration: 0.5, delay: 0.2}}
                  className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6 text-center"
              >
                <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                  <VolumeX size={32} className="text-green-400"/>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">98%</h3>
                <p className="text-gray-400">Noise Reduction</p>
              </motion.div>

              <motion.div
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true}}
                  transition={{duration: 0.5, delay: 0.3}}
                  className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6 text-center"
              >
                <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                  <Settings size={32} className="text-green-400"/>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">200+</h3>
                <p className="text-gray-400">Device-Specific Profiles</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-gradient-to-b from-black to-gray-900/70">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, margin: "-100px"}}
                variants={fadeInUpVariant}
                className="text-center mb-16"
            >
              <div
                  className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
                <Info size={14} className="text-green-400 mr-2"/>
                <span className="text-sm text-green-400 font-medium">{t('faq.badge')}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('faq.title')}</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                {t('faq.description')}
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                  <motion.div
                      key={index}
                      initial={{opacity: 0, y: 10}}
                      whileInView={{opacity: 1, y: 0}}
                      transition={{duration: 0.4, delay: index * 0.05}}
                      viewport={{once: true}}
                      className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden"
                  >
                    <button
                        onClick={() => toggleFaq(index)}
                        className="flex w-full justify-between items-center py-5 px-6 text-left font-medium text-white hover:text-green-400 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <motion.div
                          animate={{rotate: expandedFaq === index ? 180 : 0}}
                          transition={{duration: 0.3}}
                      >
                        <ChevronDown size={20}/>
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {expandedFaq === index && (
                          <motion.div
                              initial={{height: 0, opacity: 0}}
                              animate={{height: 'auto', opacity: 1}}
                              exit={{height: 0, opacity: 0}}
                              transition={{duration: 0.3}}
                              className="overflow-hidden border-t border-gray-800"
                          >
                            <div className="p-6 text-gray-300">
                              {faq.answer}
                            </div>
                          </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-300 mb-6">Have more questions about JyvDesktop's audio enhancement?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="/docs/audio-enhancement"
                    className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Info size={18}/>
                  <span>Read Documentation</span>
                </Link>

                <Link
                    href="/support"
                    className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare size={18}/>
                  <span>Contact Support</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div
                className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-green-500/20 to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, margin: "-100px"}}
                variants={fadeInUpVariant}
                className="text-center mb-16"
            >
              <div
                  className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
                <Star size={14} className="text-green-400 mr-2"/>
                <span className="text-sm text-green-400 font-medium">{t('testimonials.badge')}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('testimonials.title')}</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                {t('testimonials.description')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <motion.div
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true}}
                  transition={{duration: 0.5}}
                  className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="flex gap-1 text-green-500 mb-4">
                      {[...Array(5)].map((_, i) => (
                          <Star key={i} size={18} fill="currentColor"/>
                      ))}
                    </div>
                    <p className="text-gray-300 italic">
                      {t('testimonials.testimonial1.content')}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden relative">
                        <Image
                            src="/assets/images/testimonials/james.webp"
                            alt="James T."
                            fill
                            className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white">{t('testimonials.testimonial1.name')}</p>
                        <p className="text-sm text-gray-400">{t('testimonials.testimonial1.role')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true}}
                  transition={{duration: 0.5, delay: 0.1}}
                  className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="flex gap-1 text-green-500 mb-4">
                      {[...Array(5)].map((_, i) => (
                          <Star key={i} size={18} fill="currentColor"/>
                      ))}
                    </div>
                    <p className="text-gray-300 italic">
                      {t('testimonials.testimonial2.content')}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden relative">
                        <Image
                            src="/assets/images/testimonials/emma.webp"
                            alt="Emma L."
                            fill
                            className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white">{t('testimonials.testimonial2.name')}</p>
                        <p className="text-sm text-gray-400">{t('testimonials.testimonial2.role')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 3 */}
              <motion.div
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true}}
                  transition={{duration: 0.5, delay: 0.2}}
                  className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="flex gap-1 text-green-500 mb-4">
                      {[...Array(5)].map((_, i) => (
                          <Star key={i} size={18} fill="currentColor"/>
                      ))}
                    </div>
                    <p className="text-gray-300 italic">
                      {t('testimonials.testimonial3.content')}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden relative">
                        <Image
                            src="/assets/images/testimonials/ryan.webp"
                            alt="Ryan K."
                            fill
                            className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white">{t('testimonials.testimonial3.name')}</p>
                        <p className="text-sm text-gray-400">{t('testimonials.testimonial3.role')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div
                className="absolute -top-40 left-1/3 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[150px]"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, margin: "-100px"}}
                variants={fadeInUpVariant}
                className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="p-8 lg:p-12 lg:col-span-3">
                  <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {t('cta.description')}
                  </p>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0"/>
                      <div>
                        <h4 className="font-medium text-white">{t('cta.features.1.title')}</h4>
                        <p className="text-sm text-gray-400">{t('cta.features.1.description')}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0"/>
                      <div>
                        <h4 className="font-medium text-white">{t('cta.features.2.title')}</h4>
                        <p className="text-sm text-gray-400">{t('cta.features.2.description')}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0"/>
                      <div>
                        <h4 className="font-medium text-white">{t('cta.features.3.title')}</h4>
                        <p className="text-sm text-gray-400">{t('cta.features.3.description')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/download"
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-green-900/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Download size={20}/>
                      <span>{t('cta.downloadButton')}</span>
                    </Link>

                    <Link
                        href="#interactive-demo"
                        className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Play size={20}/>
                      <span>{t('cta.tryDemoButton')}</span>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-2 relative">
                  <div className="h-full">
                    <Image
                        src="/assets/images/audio-enhancement/enhancement.webp"
                        alt="JyvDesktop Audio Enhancement"
                        fill
                        className="object-cover"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-black"></div>
                  </div>

                  {/* Pricing Badge */}
                  <div
                      className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-gray-700 shadow-xl">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Crown size={16} className="text-green-400"/>
                        <span className="text-xs text-green-400">{t('cta.pricing.proFeature')}</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-1">Included in</p>
                      <div className="flex items-end justify-center gap-1">
                        <span className="text-3xl font-bold text-white">Pro</span>
                        <span className="text-gray-400 text-sm mb-1">& Enterprise</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
  );
}