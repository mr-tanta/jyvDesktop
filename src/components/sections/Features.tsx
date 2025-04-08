'use client';

import { useState, useEffect, useRef, SetStateAction} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import Image from 'next/image';
import {
    Volume2,
    Sliders,
    Wand2,
    Headphones,
    BarChart3,
    Check
} from 'lucide-react';

// Feature data
const features = [
    {
        id: "audio-control",
        icon: <Sliders className="h-6 w-6"/>,
        title: "App-Level Audio Control",
        description: "Control volume levels independently for each application with precision. Create custom profiles for different scenarios and never worry about sudden volume changes again.",
        benefits: [
            "Independent volume control for each application",
            "Automatic volume balancing between apps",
            "Custom profiles for different scenarios",
            "Seamless audio routing between devices"
        ],
        image: "/features/audio-control.webp",
        stats: {
            apps: "32+",
            profiles: "Unlimited",
            devices: "All major brands"
        }
    },
    {
        id: "noise-suppression",
        icon: <Volume2 className="h-6 w-6"/>,
        title: "AI Noise Suppression",
        description: "Our advanced AI-driven technology removes background noise with 95% accuracy. Enjoy crystal clear audio calls, recordings, and gaming sessions without distractions.",
        benefits: [
            "95% noise reduction in real-time",
            "AI that adapts to your environment",
            "Preserves natural voice characteristics",
            "Removes keyboard sounds, fan noise, and background chatter"
        ],
        image: "/features/noise-suppression.webp",
        stats: {
            reduction: "95%",
            latency: "<10ms",
            modes: "5 specialized models"
        }
    },
    {
        id: "spatial-audio",
        icon: <Headphones className="h-6 w-6"/>,
        title: "Spatial Audio",
        description: "Transform your audio experience with immersive 3D sound. Position audio sources anywhere in virtual space and create a truly immersive listening experience.",
        benefits: [
            "Position sound sources in 3D space",
            "Custom HRTF (Head-Related Transfer Function) profiles",
            "Immersive gaming and movie experience",
            "Compatible with all stereo headphones"
        ],
        image: "/features/spatial-audio.webp",
        stats: {
            positioning: "360° precision",
            profiles: "Custom HRTF",
            compatibility: "Universal"
        }
    },
    {
        id: "audio-enhancement",
        icon: <Wand2 className="h-6 w-6"/>,
        title: "Audio Enhancement",
        description: "Enhance your audio with professional-grade effects and processing. Apply parametric EQ, compression, and other effects to get the perfect sound for any situation.",
        benefits: [
            "10-band parametric equalizer",
            "Multi-band compression",
            "Loudness normalization",
            "Voice enhancement for clarity and presence"
        ],
        image: "/features/audio-enhancement.webp",
        stats: {
            presets: "20+ included",
            effects: "Professional-grade",
            customization: "Unlimited"
        }
    },
    {
        id: "analytics",
        icon: <BarChart3 className="h-6 w-6"/>,
        title: "Audio Analytics",
        description: "Gain insights into your audio environment with comprehensive analytics. Monitor performance, track usage patterns, and optimize your audio setup for the best experience.",
        benefits: [
            "Real-time audio quality metrics",
            "Performance monitoring and optimization",
            "Usage patterns and statistics",
            "Recommendations for improved audio experience"
        ],
        image: "/features/analytics.webp",
        stats: {
            metrics: "25+ data points",
            reports: "Custom insights",
            history: "30-day tracking"
        }
    }
];

export default function FeatureShowcase() {
    const [activeTab, setActiveTab] = useState(0);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const sectionRef = useRef(null);

    // Intersection observer to trigger animations when section is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            {threshold: 0.1}
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

    // Auto-rotate tabs every 8 seconds if not manually interacted
    const [userInteracted, setUserInteracted] = useState(false);

    useEffect(() => {
        if (!userInteracted && isIntersecting) {
            const interval = setInterval(() => {
                setActiveTab((prev) => (prev + 1) % features.length);
            }, 8000);

            return () => clearInterval(interval);
        }
    }, [userInteracted, isIntersecting]);

    const handleTabClick = (index: SetStateAction<number>) => {
        setActiveTab(index);
        setUserInteracted(true);

        // Reset auto-rotation after 30 seconds of inactivity
        const timer = setTimeout(() => {
            setUserInteracted(false);
        }, 30000);

        return () => clearTimeout(timer);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-500/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-emerald-500/5 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
            </div>

            <div className="container mx-auto px-4">
                {/* Section header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Powerful Features for Complete Audio Control
                    </h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                        Explore JyvDesktop's powerful capabilities that give you unprecedented control over your audio environment
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                    {/* Left side tabs */}
                    <div className="lg:w-1/3">
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-2 sticky top-24">
                            {features.map((feature, index) => (
                                <motion.button
                                    key={feature.id}
                                    className={`w-full text-left px-6 py-5 rounded-lg flex items-center mb-2 transition-all ${
                                        activeTab === index
                                            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/10 border-l-4 border-green-500 text-white'
                                            : 'hover:bg-gray-800/50 text-gray-400'
                                    }`}
                                    onClick={() => handleTabClick(index)}
                                    whileHover={{ x: activeTab !== index ? 5 : 0 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                  <span className={`mr-4 p-2 rounded-lg ${
                      activeTab === index
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-800/80 text-gray-500'
                  }`}>
                    {feature.icon}
                  </span>
                                    <div>
                                        <h3 className={`font-semibold ${activeTab === index ? 'text-white' : 'text-gray-300'}`}>
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 hidden md:block mt-1 line-clamp-1">
                                            {feature.description.split('.')[0]}
                                        </p>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Right side feature details */}
                    <div className="lg:w-2/3">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial="hidden"
                                animate={isIntersecting ? "visible" : "hidden"}
                                exit={{ opacity: 0, y: 20 }}
                                variants={containerVariants}
                                className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-md rounded-xl overflow-hidden shadow-xl shadow-black/20 border border-gray-800/50"
                            >
                                {/* Feature image */}
                                <motion.div
                                    variants={imageVariants}
                                    className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden"
                                >
                                    <Image
                                        src={features[activeTab].image || '/placeholder-feature.jpg'}
                                        alt={features[activeTab].title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-90"></div>

                                    {/* Highlight points on the image */}
                                    <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-green-400/70 animate-pulse shadow-lg shadow-green-400/50"></div>
                                    <div className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-green-400/70 animate-pulse shadow-lg shadow-green-400/50"></div>
                                    <div className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-green-400/70 animate-pulse shadow-lg shadow-green-400/50"></div>
                                </motion.div>

                                <div className="p-8">
                                    {/* Feature content */}
                                    <motion.div variants={itemVariants} className="mb-8">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                            {features[activeTab].title}
                                        </h3>
                                        <p className="text-gray-300 text-lg mb-6">
                                            {features[activeTab].description}
                                        </p>
                                    </motion.div>

                                    {/* Key benefits */}
                                    <motion.div variants={itemVariants} className="mb-8">
                                        <h4 className="text-xl font-semibold text-white mb-4">Key Benefits</h4>
                                        <ul className="space-y-3">
                                            {features[activeTab].benefits.map((benefit, i) => (
                                                <li key={i} className="flex items-start">
                                                    <Check size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                                                    <span className="text-gray-300">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>

                                    {/* Stats */}
                                    <motion.div
                                        variants={itemVariants}
                                        className="grid grid-cols-3 gap-4 mb-6"
                                    >
                                        {Object.entries(features[activeTab].stats).map(([key, value], i) => (
                                            <div key={i} className="bg-black/30 rounded-lg p-4 text-center">
                                                <div className="text-green-400 font-bold text-2xl">{value}</div>
                                                <div className="text-gray-500 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                                            </div>
                                        ))}
                                    </motion.div>

                                    {/* CTA Button */}
                                    <motion.div variants={itemVariants}>
                                        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                                            Learn More About {features[activeTab].title}
                                        </button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Progress dots for mobile */}
                <div className="flex justify-center mt-8 lg:hidden">
                    {features.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleTabClick(index)}
                            className={`w-3 h-3 mx-1 rounded-full ${
                                activeTab === index ? 'bg-green-500' : 'bg-gray-700'
                            }`}
                            aria-label={`Go to feature ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}