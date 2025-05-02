'use client';

import { useState, useEffect, useRef, SetStateAction} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
    Volume2,
    Sliders,
    Wand2,
    Headphones,
    BarChart3,
    Check
} from 'lucide-react';

// Feature data structure - we'll use translation keys instead of hardcoded text
const featureIds = [
    {
        id: "audio-control",
        icon: <Sliders className="h-6 w-6"/>,
        image: "/features/audio-control.svg",
        statsKeys: ["apps", "profiles", "devices"]
    },
    {
        id: "noise-suppression",
        icon: <Volume2 className="h-6 w-6"/>,
        image: "/features/noise-suppression.svg",
        statsKeys: ["reduction", "latency", "modes"]
    },
    {
        id: "spatial-audio",
        icon: <Headphones className="h-6 w-6"/>,
        image: "/features/spatial-audio.svg", 
        statsKeys: ["positioning", "profiles", "compatibility"]
    },
    {
        id: "audio-enhancement",
        icon: <Wand2 className="h-6 w-6"/>,
        image: "/features/audio-enhancement.svg",
        statsKeys: ["presets", "effects", "customization"]
    },
    {
        id: "analytics",
        icon: <BarChart3 className="h-6 w-6"/>,
        image: "/features/analytics.svg",
        statsKeys: ["metrics", "reports", "history"]
    }
];

export default function FeatureShowcase() {
    // Get translations with proper namespace
    const t = useTranslations('features');
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
                setActiveTab((prev) => (prev + 1) % featureIds.length);
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
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-green-500/10 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-4">
                {/* Section header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                        {t('description')}
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row">
                    {/* Feature tabs - sidebar for desktop */}
                    <div className="lg:w-1/4 mb-8 lg:mb-0 lg:pr-8">
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-2 lg:sticky lg:top-24">
                            {featureIds.map((feature, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => handleTabClick(index)}
                                    className={`w-full text-left p-3 rounded-xl mb-2 flex items-center transition-all duration-300 ${
                                        activeTab === index
                                            ? 'bg-gray-800 text-white'
                                            : 'hover:bg-gray-800/50 text-gray-400'
                                    }`}
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                  <span className={`mr-4 p-2 rounded-lg ${
                                      activeTab === index
                                          ? 'bg-green-500/20 text-green-400'
                                          : 'bg-gray-800/80 text-gray-500'
                                  }`}>
                                    {feature.icon}
                                  </span>
                                    <span className="font-medium">
                                    {t(`${feature.id}.title`)}
                                  </span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Feature content - main area */}
                    <div className="lg:w-3/4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, y: 20 }}
                                variants={containerVariants}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden"
                            >
                                {/* Feature image */}
                                <motion.div
                                    variants={imageVariants}
                                    className="relative h-64 md:h-80 lg:h-96 overflow-hidden"
                                >
                                    <Image
                                        src={featureIds[activeTab].image}
                                        alt={t(`${featureIds[activeTab].id}.title`)}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                                </motion.div>

                                <div className="p-8">
                                    {/* Feature content */}
                                    <motion.div variants={itemVariants} className="mb-8">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                            {t(`${featureIds[activeTab].id}.title`)}
                                        </h3>
                                        <p className="text-gray-300 text-lg mb-6">
                                            {t(`${featureIds[activeTab].id}.description`)}
                                        </p>
                                    </motion.div>

                                    {/* Key benefits */}
                                    <motion.div variants={itemVariants} className="mb-8">
                                        <h4 className="text-xl font-semibold text-white mb-4">{t('keyBenefits')}</h4>
                                        <ul className="space-y-3">
                                            {[0, 1, 2, 3].map((i) => (
                                                <li key={i} className="flex items-start">
                                                    <Check size={20} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                                                    <span className="text-gray-300">{t(`${featureIds[activeTab].id}.benefits.${i}`)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>

                                    {/* Stats */}
                                    <motion.div
                                        variants={itemVariants}
                                        className="grid grid-cols-3 gap-4 mb-6"
                                    >
                                        {featureIds[activeTab].statsKeys.map((key, i) => (
                                            <div key={i} className="bg-black/30 rounded-lg p-4 text-center">
                                                <div className="text-green-400 font-bold text-2xl">{t(`${featureIds[activeTab].id}.stats.${key}`)}</div>
                                                <div className="text-gray-500 text-sm capitalize">{t(`${featureIds[activeTab].id}.statsLabels.${key}`)}</div>
                                            </div>
                                        ))}
                                    </motion.div>

                                    {/* CTA Button */}
                                    <motion.div variants={itemVariants}>
                                        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                                            {t('learnMoreAbout')} {t(`${featureIds[activeTab].id}.title`)}
                                        </button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Progress dots for mobile */}
                <div className="flex justify-center mt-8 lg:hidden">
                    {featureIds.map((_, index) => (
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
