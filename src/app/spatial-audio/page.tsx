'use client';

import React, {useState, useRef, useEffect} from 'react';
import {motion, AnimatePresence, useScroll, useTransform, useInView} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    Headphones,
    Volume2,
    Play,
    Pause,
    ArrowRight,
    Download,
    ChevronRight,
    ChevronDown,
    Mic,
    Radio,
    Zap,
    Speaker,
    Music,
    Gamepad,
    MessageSquare,
    Info,
    RefreshCw,
    SlidersHorizontal,
    CheckCircle2,
    Settings,
    Sliders,
    BarChart3,
    Star,
    Video,
    Gauge,
    Box,
    Ear,
    Orbit,
    PinIcon,
    Move3d,
    Sofa,
    Maximize,
    Boxes,
    FilmIcon,
    Compass,
    Crown
} from 'lucide-react';

// Spatial Audio Features
const spatialAudioFeatures = [
    {
        id: '3d-positioning',
        title: '3D Audio Positioning',
        description: "Experience true spatial awareness with precise positional audio. JyvDesktop's 3D audio engine creates an immersive sound field that accurately places sounds in virtual space around you.",
        icon: <Orbit size={24}/>,
        details: [
            'Precise object-based audio positioning in 3D space',
            'Up to 128 virtual sound sources with individual control',
            'Accurate distance modeling with natural attenuation',
            'Head-tracking support for compatible devices',
            'Virtual room modeling with realistic acoustics'
        ],
        image: '/assets/images/spatial-audio/3d-positioning.webp',
        color: 'from-blue-500/10 to-blue-600/5',
        borderColor: 'border-blue-500/20',
        iconBg: 'bg-blue-500/20'
    },
    {
        id: 'hrtf-processing',
        title: 'Custom HRTF Processing',
        description: "Our advanced Head-Related Transfer Function (HRTF) processing creates a personalized spatial audio experience tailored to your unique hearing profile for unparalleled realism.",
        icon: <Ear size={24}/>,
        details: [
            'Personalized HRTF profiles for individualized listening',
            'Database of over 200 HRTF models for different head shapes',
            'Custom profile creation through measurement process',
            'Optimized for headphones, earbuds, and speaker systems',
            'Continuous adaptation based on listening patterns'
        ],
        image: '/assets/images/spatial-audio/hrtf-processing.webp',
        color: 'from-purple-500/10 to-purple-600/5',
        borderColor: 'border-purple-500/20',
        iconBg: 'bg-purple-500/20'
    },
    {
        id: 'format-support',
        title: 'Multi-Format Support',
        description: 'JyvDesktop supports a wide range of spatial audio formats, ensuring compatibility with all your content. From stereo to Dolby Atmos and beyond, everything sounds better with JyvDesktop.',
        icon: <Boxes size={24}/>,
        details: [
            'Support for Dolby Atmos, DTS:X, Sony 360 Reality Audio',
            'Conversion between different spatial audio formats',
            'Stereo-to-spatial upmixing with AI-powered processing',
            'Binaural rendering for headphone optimization',
            'Channel-based and object-based audio support'
        ],
        image: '/assets/images/spatial-audio/format-support.webp',
        color: 'from-amber-500/10 to-amber-600/5',
        borderColor: 'border-amber-500/20',
        iconBg: 'bg-amber-500/20'
    },
    {
        id: 'virtual-environments',
        title: 'Virtual Acoustic Environments',
        description: 'Create immersive acoustic spaces with realistic room simulation. Experience your audio as if you were in a concert hall, theater, studio, or any custom environment you can imagine.',
        icon: <Box size={24}/>,
        details: [
            'Realistic room modeling with accurate acoustics',
            'Dozens of presets including concert halls, theaters, stadiums',
            'Custom environment creation with adjustable parameters',
            'Material-based acoustic properties for realistic reflections',
            'Real-time environment morphing for dynamic experiences'
        ],
        image: '/assets/images/spatial-audio/virtual-environments.webp',
        color: 'from-green-500/10 to-green-600/5',
        borderColor: 'border-green-500/20',
        iconBg: 'bg-green-500/20'
    },
    {
        id: 'smart-presence',
        title: 'Smart Presence Enhancement',
        description: 'Our intelligent presence enhancement algorithm analyses audio content and intelligently adjusts spatial characteristics to create a more immersive, engaging listening experience.',
        icon: <Maximize size={24}/>,
        details: [
            'Content-aware spatial enhancement for different audio types',
            'Widened soundstage for music without artificial artifacts',
            'Focused dialogue positioning for videos and games',
            'Adaptive ambience extraction and enhancement',
            'Spatial consistency preservation across content'
        ],
        image: '/assets/images/spatial-audio/smart-presence.webp',
        color: 'from-indigo-500/10 to-indigo-600/5',
        borderColor: 'border-indigo-500/20',
        iconBg: 'bg-indigo-500/20'
    },
    {
        id: 'personalization',
        title: 'Personalized Listening Profiles',
        description: 'Create custom spatial audio profiles for different content types, devices, and preferences. JyvDesktop remembers your preferences and automatically applies the right settings.',
        icon: <Sliders size={24}/>,
        details: [
            'User-specific spatial profiles based on listening preferences',
            'Content-specific presets for music, movies, games, and calls',
            'Device-optimized settings for headphones, speakers, earbuds',
            'Quick switching between profiles with hotkeys',
            'Automatic profile selection based on content detection'
        ],
        image: '/assets/images/spatial-audio/personalization.webp',
        color: 'from-pink-500/10 to-pink-600/5',
        borderColor: 'border-pink-500/20',
        iconBg: 'bg-pink-500/20'
    },
    {
        id: 'headtracking',
        title: 'Dynamic Head Tracking',
        description: 'Experience next-level immersion with dynamic head tracking. As you move your head, the audio field stays fixed in virtual space, creating a startlingly realistic sense of presence.',
        icon: <Compass size={24}/>,
        details: [
            'Support for accelerometer-equipped headphones',
            'Camera-based head tracking option for standard headphones',
            'Ultra-responsive with <5ms latency',
            'Customizable tracking sensitivity and response curve',
            'Calibration wizard for optimal performance'
        ],
        image: '/assets/images/spatial-audio/headtracking.webp',
        color: 'from-cyan-500/10 to-cyan-600/5',
        borderColor: 'border-cyan-500/20',
        iconBg: 'bg-cyan-500/20'
    },
    {
        id: 'integration',
        title: 'Seamless Application Integration',
        description: "JyvDesktop's spatial audio technology integrates with all your applications, from video conferencing and streaming services to games and productivity tools.",
        icon: <Boxes size={24}/>,
        details: [
            'Works with streaming platforms like Netflix, Spotify, YouTube',
            'Gaming engine integration for titles using standard audio APIs',
            'Video conferencing optimization for spatial participant positioning',
            'DAW plugins for professional audio production',
            'API for third-party application integration (Studio tier)'
        ],
        image: '/assets/images/spatial-audio/integration.webp',
        color: 'from-red-500/10 to-red-600/5',
        borderColor: 'border-red-500/20',
        iconBg: 'bg-red-500/20'
    }
];

// Use cases specific to Spatial Audio
const useCases = [
    {
        title: 'Gaming & Esports',
        description: 'Gain a competitive edge with pinpoint audio positioning. Hear exactly where enemies are coming from and immerse yourself fully in game environments.',
        icon: <Gamepad size={24}/>,
        color: 'bg-blue-500/20',
        benefits: [
            'Precise spatial awareness of game sounds',
            "Hear opponents positions with pinpoint accuracy",
            'Immersive environmental sound effects',
            'Customized profiles for different game genres',
            'Balance between game audio and team communication'
        ]
    },
    {
        title: 'Movies & Entertainment',
        description: 'Transform your laptop or desktop into a complete home theater with immersive surround sound using any headphones or speakers.',
        icon: <FilmIcon size={24}/>,
        color: 'bg-purple-500/20',
        benefits: [
            'Theater-like experience with any headphones',
            'Enhanced dialogue clarity and positioning',
            'Immersive environmental effects',
            'Support for Dolby Atmos and other formats',
            'Custom room simulation for different content'
        ]
    },
    {
        title: 'Music Listening',
        description: 'Experience your music collection in a new dimension with expanded soundstage, precise instrument positioning, and customizable acoustic environments.',
        icon: <Music size={24}/>,
        color: 'bg-green-500/20',
        benefits: [
            'Expanded soundstage for stereo recordings',
            'Concert hall and studio acoustic simulations',
            'Detailed instrument separation and positioning',
            'Genre-specific spatial enhancement profiles',
            'Preservation of original mixing intentions'
        ]
    },
    {
        title: 'Virtual Meetings',
        description: 'Make virtual meetings feel more natural with spatial positioning of participants and acoustic environments that reduce fatigue and improve comprehension.',
        icon: <MessageSquare size={24}/>,
        color: 'bg-amber-500/20',
        benefits: [
            'Position different participants in virtual space',
            'Reduce listening fatigue during long meetings',
            'Improve speech intelligibility and focus',
            'Create sense of shared virtual space',
            'Balanced acoustic environment for professional calls'
        ]
    }
];

// Visual positions for the 3D audio demo
const soundPositions = [
    {id: 'music', name: 'Music', icon: <Music size={20}/>, x: 65, y: 35, z: 0, color: 'bg-blue-500'},
    {id: 'speech', name: 'Voice', icon: <Mic size={20}/>, x: 30, y: 40, z: 0, color: 'bg-green-500'},
    {id: 'effects', name: 'Effects', icon: <Volume2 size={20}/>, x: 80, y: 65, z: 0, color: 'bg-purple-500'},
    {id: 'ambience', name: 'Ambience', icon: <Radio size={20}/>, x: 20, y: 70, z: 0, color: 'bg-amber-500'}
];

// Environment presets for the demo
const environmentPresets = [
    {id: 'default', name: 'Default', icon: <Settings size={16}/>},
    {id: 'studio', name: 'Studio', icon: <Mic size={16}/>},
    {id: 'theater', name: 'Theater', icon: <FilmIcon size={16}/>},
    {id: 'arena', name: 'Arena', icon: <Maximize size={16}/>},
    {id: 'hall', name: 'Concert Hall', icon: <Music size={16}/>}
];

// FAQ data
const faqs = [
        {
            question: 'Do I need special headphones to experience spatial audio?',
            answer: 'No, JyvDesktop works with any headphones or earbuds. While higher quality headphones will provide better overall sound, our spatial audio processing works with everything from budget earbuds to premium studio headphones. For the absolute best experience, we recommend open-back headphones with a neutral frequency response.'
        },
        {
            question: "How is JyvDesktop's spatial audio different from built - in surround features? ",
            answer: 'Unlike basic surround sound solutions, JyvDesktop uses advanced HRTF processing, personalized acoustic profiles, and intelligent content analysis to create truly immersive 3D audio. Our technology not only positions sounds horizontally around you, but also provides precise vertical positioning and distance perception, creating a full hemisphere of sound that reacts naturally to your movements with compatible head-tracking devices.'
        },
        {
            question: 'Will spatial audio work with my existing music, games, and videos?',
            answer: 'Yes! While JyvDesktop fully supports dedicated spatial audio formats like Dolby Atmos and Sony 360 Reality Audio, it also enhances standard stereo content through intelligent upmixing. Our AI-powered algorithms analyze stereo audio in real-time, extracting spatial cues and repositioning elements to create a natural, immersive experience from any content.'
        },
        {
            question: 'Does spatial audio processing add latency to games or video calls?',
            answer: "JyvDesktop's spatial audio processing is optimized for ultra - low latency, typically adding less than 8 ms of processing time, which is imperceptible in most applications.For competitive gaming or other latency - sensitive applications, we offer a special low - latency mode that further reduces processing time to under 5 ms while maintaining excellent spatial positioning.",
        },
        {
            question: 'Can I customize the spatial audio experience?',
            answer:
                'Absolutely! JyvDesktop offers extensive customization options for spatial audio, from choosing different HRTF models to match your hearing characteristics to adjusting room size, material properties, and reverb characteristics. You can save custom profiles for different content types and applications, and even create your own virtual environments from scratch.'
        }
        ,
        {
            question: 'Does spatial audio work with speakers as well as headphones?',
            answer:
                'Yes, JyvDesktop includes specialized processing for speaker systems that creates an expanded soundstage and enhanced spatial imaging from any speaker configuration. While headphones provide the most precise 3D positioning due to their isolated ear channels, our speaker optimization technology significantly improves the spatial qualities of any speaker setup from laptop speakers to multi-channel systems.'
        }
    ]
;

export default function SpatialAudioPage() {
    // State for interactive demo
    const [activeFeature, setActiveFeature] = useState('3d-positioning');
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeEnvironment, setActiveEnvironment] = useState('default');
    const [spatializationLevel, setSpatialization] = useState(75);
    const [roomSize, setRoomSize] = useState(60);
    const [activeSoundSource, setActiveSoundSource] = useState<string | null>(null);
    const [soundPositionState, setSoundPositionState] = useState(soundPositions);
    const [headTracking, setHeadTracking] = useState(false);
    const [listenerRotation, setListenerRotation] = useState(0);

    // Refs for scroll animations
    const heroRef = useRef<HTMLElement>(null);
    const demoRef = useRef<HTMLElement>(null);
    const isHeroInView = useInView(heroRef, {once: false});
    const isDemoInView = useInView(demoRef, {once: false, margin: "-100px 0px"});

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
    const currentFeature = spatialAudioFeatures.find(feature => feature.id === activeFeature) || spatialAudioFeatures[0];

    // Toggle play state
    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    // Apply environment preset
    const applyEnvironment = (presetId: string) => {
        setActiveEnvironment(presetId);

        // Simulate different environment settings
        if (presetId === 'studio') {
            setRoomSize(20);
            setSpatialization(60);
        } else if (presetId === 'theater') {
            setRoomSize(70);
            setSpatialization(85);
        } else if (presetId === 'arena') {
            setRoomSize(100);
            setSpatialization(90);
        } else if (presetId === 'hall') {
            setRoomSize(80);
            setSpatialization(75);
        } else {
            // Default environment
            setRoomSize(60);
            setSpatialization(75);
        }
    };

    // Handle sound source drag in demo
    const handleSoundPositionChange = (id: string, newX: number, newY: number) => {
        setSoundPositionState(prev =>
            prev.map(source =>
                source.id === id ? {...source, x: newX, y: newY} : source
            )
        );
    };

    // Update listener rotation based on mouse position in demo
    useEffect(() => {
        if (headTracking && isDemoInView) {
            const handleMouseMove = (e: MouseEvent) => {
                // Get the center of the viewport
                const centerX = window.innerWidth / 2;

                // Calculate the angle based on mouse position relative to center
                const mouseX = e.clientX;
                const deltaX = mouseX - centerX;

                // Convert to degrees, max ±45 degrees
                const rotation = Math.max(-45, Math.min(45, deltaX / 10));

                setListenerRotation(rotation);
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        } else {
            setListenerRotation(0);
        }
    }, [headTracking, isDemoInView]);

    // Toggle FAQ expansion
    const toggleFaq = (index: number) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    const handleSourceClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const target = e.target as HTMLElement;
        if (target.parentElement) {
            const sourceId = target.parentElement.getAttribute('data-id');
            if (sourceId) {
                setActiveSoundSource(sourceId);
            }
        }
    };

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
                                     dur="15s" repeatCount="indefinite"/>
                        </path>
                        <path d="M0,60 Q150,100 300,60 T600,60 T900,60 T1200,60" stroke="#22c55e" strokeWidth="2"
                              fill="none">
                            <animate attributeName="d"
                                     values="M0,60 Q150,100 300,60 T600,60 T900,60 T1200,60; M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60; M0,60 Q150,100 300,60 T600,60 T900,60 T1200,60"
                                     dur="15s" repeatCount="indefinite"/>
                        </path>
                    </svg>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative py-40 overflow-hidden" ref={heroRef}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div
                        initial="hidden"
                        animate={isHeroInView ? "visible" : "hidden"}
                        variants={fadeInUpVariant}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div
                            className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm text-green-400 font-medium">Immersive Audio Experience</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                            Experience <span
                            className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Spatial Audio</span> Like
                            Never Before
                        </h1>

                        <p className="text-lg text-gray-300 mb-12">
                            Transform your audio into a three-dimensional experience with JyvDesktop's
                            advanced spatial audio technology. Hear sound all around you with unparalleled precision.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="#interactive-demo"
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
                            >
                                <Headphones size={20}/>
                                <span>Experience Spatial Audio</span>
                            </a>

                            <Link
                                href="/download"
                                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <Download size={20}/>
                                <span>Download JyvDesktop</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Overview */}
            <section className="py-16 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, margin: "-100px"}}
                        variants={fadeInUpVariant}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Complete Spatial Audio Suite</h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            JyvDesktop offers a comprehensive set of spatial audio technologies
                            that transform standard audio into immersive three-dimensional experiences.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                        {spatialAudioFeatures.slice(0, 4).map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{once: true}}
                                variants={itemVariant}
                                custom={index}
                                className={`bg-gradient-to-b ${feature.color} border ${feature.borderColor} rounded-xl p-6 cursor-pointer transition-all hover:translate-y-[-4px]`}
                                onClick={() => setActiveFeature(feature.id)}
                            >
                                <div
                                    className={`${feature.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                <p className="text-gray-300 text-sm">{feature.description.split('.')[0]}.</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {spatialAudioFeatures.slice(4).map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{once: true}}
                                variants={itemVariant}
                                custom={index + 4}
                                className={`bg-gradient-to-b ${feature.color} border ${feature.borderColor} rounded-xl p-6 cursor-pointer transition-all hover:translate-y-[-4px]`}
                                onClick={() => setActiveFeature(feature.id)}
                            >
                                <div
                                    className={`${feature.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                <p className="text-gray-300 text-sm">{feature.description.split('.')[0]}.</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Detail Section */}
            <section className="py-16 bg-gray-900/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFeature}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.5}}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            {/* Feature Image */}
                            <div className="order-2 lg:order-1">
                                <div className="relative rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
                                    <div className="aspect-video">
                                        <Image
                                            src={currentFeature.image}
                                            alt={currentFeature.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Animated overlay highlights */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                                    <motion.div
                                        className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md rounded-lg p-3 border border-green-500/20"
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: 0.3, duration: 0.5}}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`${currentFeature.iconBg} w-8 h-8 rounded-lg flex items-center justify-center`}>
                                                {currentFeature.icon}
                                            </div>
                                            <span
                                                className="text-sm text-white font-medium">{currentFeature.title}</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Feature Details */}
                            <div className="order-1 lg:order-2">
                                <div
                                    className="inline-flex items-center py-1 px-3 mb-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
                                    <Headphones size={14} className="text-green-400 mr-2"/>
                                    <span className="text-xs text-green-400 font-medium">Spatial Audio Feature</span>
                                </div>

                                <h2 className="text-3xl font-bold mb-4">{currentFeature.title}</h2>
                                <p className="text-gray-300 mb-8 leading-relaxed">{currentFeature.description}</p>

                                <h3 className="text-xl font-semibold mb-4 flex items-center">
                                    <div
                                        className={`${currentFeature.iconBg} w-8 h-8 rounded-lg flex items-center justify-center mr-3`}>
                                        <CheckCircle2 size={20} className="text-white"/>
                                    </div>
                                    Key Capabilities
                                </h3>

                                <motion.ul
                                    className="space-y-3 mb-8"
                                    initial="hidden"
                                    animate="visible"
                                    variants={staggerChildrenVariant}
                                >
                                    {currentFeature.details.map((detail, index) => (
                                        <motion.li key={index} variants={itemVariant}
                                                   className="flex items-start gap-2">
                                            <ChevronRight size={18} className="text-green-500 mt-1flex-shrink-0"/>
                                            <span className="text-gray-300">{detail}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="#interactive-demo"
                                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                                    >
                                        <Headphones size={18}/>
                                        <span>Try It in Demo</span>
                                    </a>

                                    <Link
                                        href={`/docs/spatial-audio/${currentFeature.id}`}
                                        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Info size={18}/>
                                        <span>Technical Details</span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Interactive 3D Audio Demo Section */}
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
                            <Headphones size={14} className="text-green-400 mr-2"/>
                            <span className="text-sm text-green-400 font-medium">Interactive Experience</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience 3D Spatial Sound</h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            Explore JyvDesktop's spatial audio capabilities with our interactive 3D sound demo.
                            Position sounds in virtual space and experience how they change with different environments.
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
                                    <h3 className="text-2xl font-bold text-white mb-1">3D Spatial Audio Demo</h3>
                                    <p className="text-green-400 text-sm">Interactive Sound Positioning</p>
                                </div>

                                <div className="flex flex-wrap gap-4 items-center">
                                    {/* Spatialization Level Slider */}
                                    <div
                                        className="bg-black/30 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                                        <Orbit size={20} className="text-green-500"/>
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">Spatialization Level</div>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={spatializationLevel}
                                                    onChange={(e) => setSpatialization(parseInt(e.target.value))}
                                                    className="w-32 accent-green-500"
                                                />
                                                <span
                                                    className="text-sm font-medium w-8 text-white">{spatializationLevel}%</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Environment Preset Selector */}
                                    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-gray-800">
                                        <div className="text-xs text-gray-400 mb-2">Acoustic Environment</div>
                                        <div className="flex flex-wrap gap-2">
                                            {environmentPresets.map(preset => (
                                                <button
                                                    key={preset.id}
                                                    onClick={() => applyEnvironment(preset.id)}
                                                    className={`px-3 py-1.5 text-xs rounded-md flex items-center gap-1.5 transition-colors ${
                                                        activeEnvironment === preset.id
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

                                    {/* Head Tracking Toggle */}
                                    <div
                                        className="bg-black/30 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400">Head Tracking</span>
                                            <label className="relative inline-flex items-center cursor-pointer ml-2">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={headTracking}
                                                    onChange={() => setHeadTracking(!headTracking)}
                                                />
                                                <div
                                                    className="w-9 h-5 bg-gray-700 rounded-full peer peer-focus:ring-1 peer-focus:ring-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Demo Instructions */}
                            <div
                                className="mt-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-gray-300">
                                <div className="flex items-start gap-2">
                                    <Info size={18} className="text-green-400 flex-shrink-0 mt-0.5"/>
                                    <p>
                                        {headTracking
                                            ? "Mouse tracking enabled. Move your mouse from side to side to simulate head movements and hear how the audio field stays fixed in space."
                                            : "Drag sound sources to position them in 3D space. Click Play to hear how they sound from your perspective."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 3D Sound Stage Visualization */}
                        <div className="p-6">
                            <div
                                className="aspect-[16/10] w-full bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden relative">
                                {/* Room visualization with grid */}
                                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                    {/* Circular reference lines */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            className="w-[80%] h-[80%] border border-gray-800/50 rounded-full"
                                            animate={{scale: [1, 1.02, 1]}}
                                            transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
                                        />
                                        <motion.div
                                            className="w-[60%] h-[60%] border border-gray-800/60 rounded-full"
                                            animate={{scale: [1, 1.03, 1]}}
                                            transition={{duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5}}
                                        />
                                        <motion.div
                                            className="w-[40%] h-[40%] border border-gray-800/70 rounded-full"
                                            animate={{scale: [1, 1.04, 1]}}
                                            transition={{duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1}}
                                        />
                                        <motion.div
                                            className="w-[20%] h-[20%] border border-gray-800/80 rounded-full"
                                            animate={{scale: [1, 1.05, 1]}}
                                            transition={{duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5}}
                                        />
                                    </div>

                                    {/* Grid lines */}
                                    <div className="absolute inset-0">
                                        <div
                                            className="absolute top-0 left-0 right-0 bottom-0 border-t border-l border-r border-b border-gray-800/30"></div>
                                        <div
                                            className="absolute top-[25%] left-0 right-0 border-t border-gray-800/20"></div>
                                        <div
                                            className="absolute top-[50%] left-0 right-0 border-t border-gray-800/30"></div>
                                        <div
                                            className="absolute top-[75%] left-0 right-0 border-t border-gray-800/20"></div>
                                        <div
                                            className="absolute top-0 bottom-0 left-[25%] border-l border-gray-800/20"></div>
                                        <div
                                            className="absolute top-0 bottom-0 left-[50%] border-l border-gray-800/30"></div>
                                        <div
                                            className="absolute top-0 bottom-0 left-[75%] border-l border-gray-800/20"></div>
                                    </div>
                                </div>

                                {/* Directional markers */}
                                <div
                                    className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">Front
                                </div>
                                <div
                                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">Rear
                                </div>
                                <div
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">Left
                                </div>
                                <div
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">Right
                                </div>

                                {/* Sound Sources */}
                                {soundPositionState.map((source) => (
                                    <motion.div
                                        key={source.id}
                                        className={`absolute w-10 h-10 ${source.color} rounded-full flex items-center justify-center cursor-move shadow-lg shadow-black/50 z-10`}
                                        style={{
                                            left: `${source.x}%`,
                                            top: `${source.y}%`
                                        }}
                                        drag
                                        dragConstraints={{left: 5, right: 95, top: 5, bottom: 95}}
                                        dragMomentum={false}
                                        onClick={handleSourceClick}
                                        onDrag={(e, info) => {
                                            // Calculate new position as percentage of container
                                            if (!e.target) return;
                                            const container = (e.target as HTMLElement).parentElement;
                                            if (!container) return;
                                            const rect = container.getBoundingClientRect();
                                            const x = Math.max(5, Math.min(95, (info.point.x - rect.left) / rect.width * 100));
                                            const y = Math.max(5, Math.min(95, (info.point.y - rect.top) / rect.height * 100));
                                            handleSoundPositionChange(source.id, x, y);
                                        }}
                                        whileHover={{scale: 1.1}}
                                        whileTap={{scale: 0.95}}
                                    >
                                        {source.icon}

                                        {/* Sound wave animation */}
                                        {isPlaying && (
                                            <motion.div
                                                className={`absolute inset-0 ${source.color}/80 rounded-full`}
                                                animate={{scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7]}}
                                                transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}
                                            />
                                        )}

                                        {/* Source label */}
                                        <div
                                            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white whitespace-nowrap bg-black/50 px-1.5 py-0.5 rounded-md">
                                            {source.name}
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Listener Position (You) */}
                                <motion.div
                                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                                    animate={{rotateY: listenerRotation}}
                                    transition={{type: "spring", stiffness: 100, damping: 10}}
                                >
                                    <div className="relative">
                                        {/* Head icon */}
                                        <div
                                            className="w-16 h-16 bg-gradient-to-b from-green-500/30 to-emerald-600/30 rounded-full border-2 border-green-500/50 flex items-center justify-center shadow-lg shadow-green-900/20">
                                            <Headphones size={30} className="text-green-400"/>
                                        </div>

                                        {/* Directional indicator */}
                                        <div
                                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <div className="relative w-20 h-20">
                                                <motion.div
                                                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"
                                                    animate={{opacity: [0.3, 0.8, 0.3]}}
                                                    transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}
                                                >
                                                    <div
                                                        className="w-0 h-0 border-l-8 border-r-8 border-b-[16px] border-l-transparent border-r-transparent border-b-green-500/50"></div>
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* Listener label */}
                                        <div
                                            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-0.5 rounded-md whitespace-nowrap">
                                            You (Listener)
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Play/Pause Button */}
                                <div className="absolute bottom-4 right-4">
                                    <button
                                        onClick={togglePlay}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                            isPlaying
                                                ? 'bg-gray-800 hover:bg-gray-700'
                                                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                                        } transition-colors shadow-lg shadow-black/30`}
                                    >
                                        {isPlaying ?
                                            <Pause size={24} className="text-white"/> :
                                            <Play size={24} className="text-white ml-1"/>
                                        }
                                    </button>
                                </div>

                                {/* Environment Indicator */}
                                <div
                                    className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm text-white border border-gray-800/50">
                                    <div className="flex items-center gap-2">
                                        <Box size={16} className="text-green-500"/>
                                        <span>
                      {environmentPresets.find(preset => preset.id === activeEnvironment)?.name || 'Default'} Environment
                    </span>
                                    </div>
                                </div>

                                {/* Room Size Visualization */}
                                <div
                                    className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1 border border-gray-800/50">
                                    <div className="text-xs text-gray-400 mb-1">Room Size</div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="range"
                                            min="10"
                                            max="100"
                                            value={roomSize}
                                            onChange={(e) => setRoomSize(parseInt(e.target.value))}
                                            className="w-32 accent-green-500"
                                        />
                                        <span className="text-sm font-medium w-8 text-white">{roomSize}%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Sound Source Controls */}
                            {activeSoundSource && (
                                <div className="mt-6 bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <div
                                            className={`${soundPositionState.find(s => s.id === activeSoundSource)?.color || 'bg-gray-700'} w-6 h-6 rounded-lg flex items-center justify-center`}>
                                            {soundPositionState.find(s => s.id === activeSoundSource)?.icon}
                                        </div>
                                        <span>{soundPositionState.find(s => s.id === activeSoundSource)?.name || 'Sound'} Source Controls</span>
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* X Position (Left/Right) */}
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-300">Left/Right Position</span>
                                                <span className="text-sm text-green-400">
                          {Math.round((soundPositionState.find(s => s.id === activeSoundSource)?.x || 50) - 50)}
                        </span>
                                            </div>
                                            <input
                                                type="range"
                                                min="5"
                                                max="95"
                                                value={soundPositionState.find(s => s.id === activeSoundSource)?.x || 50}
                                                onChange={(e) => {
                                                    const source = soundPositionState.find(s => s.id === activeSoundSource);
                                                    if (source) {
                                                        handleSoundPositionChange(source.id, parseInt(e.target.value), source.y);
                                                    }
                                                }}
                                                className="w-full accent-green-500"
                                            />
                                        </div>

                                        {/* Y Position (Front/Back) */}
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-300">Front/Back Position</span>
                                                <span className="text-sm text-green-400">
                          {Math.round((soundPositionState.find(s => s.id === activeSoundSource)?.y || 50) - 50)}
                        </span>
                                            </div>
                                            <input
                                                type="range"
                                                min="5"
                                                max="95"
                                                value={soundPositionState.find(s => s.id === activeSoundSource)?.y || 50}
                                                onChange={(e) => {
                                                    const source = soundPositionState.find(s => s.id === activeSoundSource);
                                                    if (source) {
                                                        handleSoundPositionChange(source.id, source.x, parseInt(e.target.value));
                                                    }
                                                }}
                                                className="w-full accent-green-500"
                                            />
                                        </div>

                                        {/* Source Volume */}
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-300">Source Volume</span>
                                                <span className="text-sm text-green-400">80%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                defaultValue={80}
                                                className="w-full accent-green-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Room Acoustics Preview */}
                        <div className="p-6 border-t border-gray-800 bg-black/30">
                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Box size={18} className="text-green-500"/>
                                <span>Room Acoustics Preview</span>
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <div
                                        className="h-20 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden relative">
                                        {/* Reverb visualization */}
                                        <div className="absolute inset-0 flex items-center">
                                            <svg width="100%" height="100%" viewBox="0 0 600 80"
                                                 preserveAspectRatio="none">
                                                {/* Early reflections */}
                                                <motion.path
                                                    d="M0,40 L20,40 L20,20 L40,20 L40,40 L60,40 L60,30 L80,30 L80,40 L100,40 L100,35 L120,35 L120,40 L140,40 L140,38 L160,38 L160,40 L180,40 L180,39 L200,39 L200,40 L220,40 L220,39.5 L240,39.5 L240,40 L260,40 L260,39.8 L280,39.8 L280,40 L600,40"
                                                    stroke="#22c55e"
                                                    strokeWidth="1.5"
                                                    fill="none"
                                                    animate={{opacity: isPlaying ? [0, 1, 0] : 0}}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: isPlaying ? Infinity : 0,
                                                        repeatDelay: 0.5
                                                    }}
                                                />

                                                {/* Late reverb */}
                                                <motion.path
                                                    d="M0,40 L600,40"
                                                    stroke="#22c55e"
                                                    strokeWidth="1"
                                                    strokeDasharray="1,3"
                                                    fill="none"
                                                    animate={{opacity: isPlaying ? [0, 0.7, 0] : 0}}
                                                    transition={{
                                                        duration: 3,
                                                        delay: 0.2,
                                                        repeat: isPlaying ? Infinity : 0,
                                                        repeatDelay: 0.5
                                                    }}
                                                />
                                            </svg>
                                        </div>

                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-sm text-gray-400">
                                                {!isPlaying && "Press Play to visualize room acoustics"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-6">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-xs text-gray-400">Reverb Time</span>
                                                <span
                                                    className="text-xs text-green-400">{(roomSize / 100 * 3).toFixed(1)}s</span>
                                            </div>
                                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                                                    initial={{width: 0}}
                                                    animate={{width: `${roomSize}%`}}
                                                    transition={{duration: 0.8, ease: "easeOut"}}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-xs text-gray-400">Reflection Density</span>
                                                <span className="text-xs text-green-400">{100 - roomSize}%</span>
                                            </div>
                                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                                                    initial={{width: 0}}
                                                    animate={{width: `${100 - roomSize}%`}}
                                                    transition={{duration: 0.8, ease: "easeOut"}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-300 mb-3">Current Environment Properties:</div>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2">
                                            <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0"/>
                                            <span className="text-sm text-gray-300">
                        <span
                            className="text-white">Room Size:</span> {roomSize < 30 ? 'Small' : roomSize < 70 ? 'Medium' : 'Large'}
                                                {roomSize < 30 ? ' (like a studio booth or small room)' : roomSize < 70 ? ' (like a living room or small hall)' : ' (like a concert hall or arena)'}
                      </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0"/>
                                            <span className="text-sm text-gray-300">
                        <span
                            className="text-white">Surface Materials:</span> {activeEnvironment === 'studio' ? 'Acoustic treatment (highly absorptive)' : activeEnvironment === 'hall' ? 'Wood and plaster (moderately reflective)' : activeEnvironment === 'arena' ? 'Concrete and metal (highly reflective)' : 'Balanced materials'}
                      </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0"/>
                                            <span className="text-sm text-gray-300">
                        <span
                            className="text-white">Spatial Qualities:</span> {spatializationLevel < 40 ? 'Subtle positioning' : spatializationLevel < 70 ? 'Natural spatial field' : 'Enhanced spatial field with exaggerated positioning'}
                      </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Demo Footer */}
                        <div className="border-t border-gray-800 p-4 bg-black/30">
                            <div className="flex justify-between items-center">
                                <div className="text-xs text-gray-500">Interactive demo - spatial audio in the actual
                                    application will be even more immersive
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400">Spatial Engine:</span>
                                    <span className="text-xs text-green-500 flex items-center gap-1">
                    <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    Active
                  </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-300 mb-6">Ready to experience true spatial audio on your device?</p>
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

            {/* How It Works Section */}
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
                            <Ear size={14} className="text-green-400 mr-2"/>
                            <span className="text-sm text-green-400 font-medium">Technology Explained</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-6">How Spatial Audio Works</h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            Understand the technology behind JyvDesktop's immersive spatial audio system
                            and how it creates a three-dimensional soundscape around you.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                                <div className="aspect-video">
                                    <Image
                                        src="/assets/images/spatial-audio/how-it-works.webp"
                                        alt="Spatial Audio Technology"
                                        fill
                                        className="object-cover"
                                    />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                </div>

                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-green-500/20 p-2 rounded-lg">
                                            <Ear size={24} className="text-green-400"/>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-1">Head-Related Transfer
                                                Function</h4>
                                            <p className="text-sm text-gray-300">The science of how your ears perceive
                                                directional sound</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-6">The Science of Spatial Sound</h3>

                            <div className="space-y-6">
                                <motion.div
                                    className="flex items-start gap-4"
                                    initial={{opacity: 0, x: 20}}
                                    whileInView={{opacity: 1, x: 0}}
                                    viewport={{once: true}}
                                    transition={{duration: 0.5}}
                                >
                                    <div className="bg-green-500/20 p-2 rounded-lg flex-shrink-0">
                                        <Ear size={24} className="text-green-400"/>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">HRTF Technology</h4>
                                        <p className="text-gray-300">JyvDesktop uses Head-Related Transfer Functions
                                            (HRTF) to simulate how sounds from different directions reach your ears,
                                            creating precise spatial positioning.</p>
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
                                        <Box size={24} className="text-green-400"/>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Room Acoustics Modeling</h4>
                                        <p className="text-gray-300">Our advanced algorithms simulate how sound waves
                                            interact with different room materials and geometries, creating realistic
                                            environmental acoustics.</p>
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
                                        <Orbit size={24} className="text-green-400"/>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Object-Based Rendering</h4>
                                        <p className="text-gray-300">Instead of fixed audio channels, JyvDesktop treats
                                            sounds as individual objects that can be placed anywhere in 3D space,
                                            creating a true spatial experience.</p>
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
                                        <Compass size={24} className="text-green-400"/>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Dynamic Head Tracking</h4>
                                        <p className="text-gray-300">When enabled, our system continuously adjusts the
                                            audio field based on your head movements, maintaining the illusion that
                                            sounds are fixed in space around you.</p>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="mt-8">
                                <Link
                                    href="/technology/spatial-audio"
                                    className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors"
                                >
                                    <span>Learn more about our spatial audio technology</span>
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
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Spatial Audio for Every Experience</h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            Discover how JyvDesktop's spatial audio technology can transform different
                            types of audio content into immersive 3D experiences.
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
                            <Gauge size={14} className="text-green-400 mr-2"/>
                            <span className="text-sm text-green-400 font-medium">Performance</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-6">High Performance Spatial Audio</h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            JyvDesktop's spatial audio delivers immersive experiences without
                            compromising performance or adding noticeable latency.
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
                                <Gauge size={32} className="text-green-400"/>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">&lt;8ms</h3>
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
                                <Orbit size={32} className="text-green-400"/>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">128</h3>
                            <p className="text-gray-400">Sound Sources</p>
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
                                <Box size={32} className="text-green-400"/>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">32</h3>
                            <p className="text-gray-400">Environment Presets</p>
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
                            <p className="text-gray-400">HRTF Models</p>
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
                            <span className="text-sm text-green-400 font-medium">Common Questions</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            Find answers to common questions about JyvDesktop's spatial audio capabilities.
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
                        <p className="text-gray-300 mb-6">Have more questions about JyvDesktop's spatial audio?</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/docs/spatial-audio"
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
                            <span className="text-sm text-green-400 font-medium">User Stories</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Users Say</h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            Hear from users who've transformed their audio experience with JyvDesktop's spatial audio
                            technology.
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
                                        "The spatial audio features in JyvDesktop have completely changed how I
                                        experience games. I can precisely pinpoint enemy positions and immerse myself
                                        fully in the game world. It's like having a superpower."
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-gray-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden relative">
                                            <Image
                                                src="/assets/images/testimonials/mark.webp"
                                                alt="Mark T."
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">Mark T.</p>
                                            <p className="text-sm text-gray-400">Competitive Gamer</p>
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
                                        "I was skeptical about how much difference spatial audio would make for music,
                                        but JyvDesktop blew me away. My favorite albums sound like I'm hearing them for
                                        the first time—so much detail and space I never noticed before."
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-gray-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden relative">
                                            <Image
                                                src="/assets/images/testimonials/lisa.webp"
                                                alt="Lisa J."
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">Lisa J.</p>
                                            <p className="text-sm text-gray-400">Music Enthusiast</p>
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
                                        "With JyvDesktop's spatial audio, virtual meetings are so much less fatiguing.
                                        Being able to position different participants around me creates a natural
                                        conversational feel that makes long meetings much more bearable."
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-gray-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden relative">
                                            <Image
                                                src="/assets/images/testimonials/david.webp"
                                                alt="David R."
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">David R.</p>
                                            <p className="text-sm text-gray-400">Senior Manager, Remote Team</p>
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
                                <h2 className="text-3xl font-bold mb-4">Transform your audio into 3D today</h2>
                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    Experience the future of audio with JyvDesktop's spatial audio technology.
                                    Download now and immerse yourself in a three-dimensional soundscape that will
                                    transform how you experience music, games, movies, and more.
                                </p>

                                <div className="space-y-6 mb-8">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <h4 className="font-medium text-white">True 3D Positioning</h4>
                                            <p className="text-sm text-gray-400">Experience sound from any direction,
                                                including above and below</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <h4 className="font-medium text-white">Advanced Room Simulation</h4>
                                            <p className="text-sm text-gray-400">Immersive acoustic environments from
                                                small rooms to concert halls</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0"/>
                                        <div>
                                            <h4 className="font-medium text-white">Works with Any Headphones</h4>
                                            <p className="text-sm text-gray-400">No special hardware required for
                                                incredible spatial audio</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href="/download"
                                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-green-900/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Download size={20}/>
                                        <span>Download Now</span>
                                    </Link>

                                    <Link
                                        href="#interactive-demo"
                                        className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Play size={20}/>
                                        <span>Try Demo Again</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="lg:col-span-2 relative">
                                <div className="h-full">
                                    <Image
                                        src="/assets/images/spatial-audio/spatial-audio.png"
                                        alt="JyvDesktop Spatial Audio"
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
                                            <span className="text-xs text-green-400">PRO FEATURE</span>
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
