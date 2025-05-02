'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const MultiplatformSupport = () => {
    const t = useTranslations('platforms');
    const [activeTab, setActiveTab] = useState('windows');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById('multiplatform-section');
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, []);

    // Animation variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };
    
    // Platform IDs for mapping to translations
    const platformIds = ['windows', 'macos', 'chromebook'];
    
    // Platform data with translations
    const platforms = [
        {
            id: "windows",
            name: t('windows.name'),
            icon: "/assets/images/logos/windows.svg",
            device: "/assets/windows/windows-dashboard.png",
            color: "from-green-500 to-emerald-600",
            codeSnippet: `// Windows-optimized audio routing
IAudioSessionManager* pSessionManager;
hr = pDevice->Activate(__uuidof(IAudioSessionManager),
                      CLSCTX_ALL, nullptr,
                      (void**)&pSessionManager);`,
            features: [
                t('windows.features.0'),
                t('windows.features.1'),
                t('windows.features.2'),
                t('windows.features.3')
            ],
            stats: [
                { label: t('statsLabels.latency'), value: t('windows.stats.latency') },
                { label: t('statsLabels.cpuUsage'), value: t('windows.stats.cpuUsage') },
                { label: t('statsLabels.ramUsage'), value: t('windows.stats.ramUsage') }
            ],
            testimonial: {
                text: t('windows.testimonial.text'),
                author: t('windows.testimonial.author'),
                title: t('windows.testimonial.title')
            }
        },
        {
            id: "macos",
            name: t('macos.name'),
            icon: "/assets/images/logos/macos-logo.svg",
            device: "/assets/windows/mac-screen.png",
            color: "from-green-500 to-green-400",
            codeSnippet: `// macOS CoreAudio implementation
AudioObjectPropertyAddress propAddress = {
    kAudioHardwarePropertyDevices,
    kAudioObjectPropertyScopeGlobal,
    kAudioObjectPropertyElementMain
};
OSStatus status = AudioObjectGetPropertyDataSize(
    kAudioObjectSystemObject, &propAddress, 0, NULL, &dataSize);`,
            features: [
                t('macos.features.0'),
                t('macos.features.1'),
                t('macos.features.2'),
                t('macos.features.3')
            ],
            stats: [
                { label: t('statsLabels.latency'), value: t('macos.stats.latency') },
                { label: t('statsLabels.cpuUsage'), value: t('macos.stats.cpuUsage') },
                { label: t('statsLabels.ramUsage'), value: t('macos.stats.ramUsage') }
            ],
            testimonial: {
                text: t('macos.testimonial.text'),
                author: t('macos.testimonial.author'),
                title: t('macos.testimonial.title')
            }
        },
        {
            id: "chromebook",
            name: t('chromebook.name'),
            icon: "/assets/images/logos/chrome.svg",
            device: "/assets/windows/windows-dashboard.png",
            color: "from-green-500 to-teal-500",
            codeSnippet: `// Chrome OS WebAudio API
const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);`,
            features: [
                t('chromebook.features.0'),
                t('chromebook.features.1'),
                t('chromebook.features.2'),
                t('chromebook.features.3')
            ],
            stats: [
                { label: t('statsLabels.latency'), value: t('chromebook.stats.latency') },
                { label: t('statsLabels.cpuUsage'), value: t('chromebook.stats.cpuUsage') },
                { label: t('statsLabels.ramUsage'), value: t('chromebook.stats.ramUsage') }
            ],
            testimonial: {
                text: t('chromebook.testimonial.text'),
                author: t('chromebook.testimonial.author'),
                title: t('chromebook.testimonial.title')
            }
        }
    ];

    // Find the active platform
    const activePlatform = platforms.find(p => p.id === activeTab) || platforms[0];

    // Handle platform tab switching
    const handleTabChange = (platformId) => {
        setActiveTab(platformId);
    };

    return (
        <section id="multiplatform-section" className="py-20 bg-gray-950 overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        {t('description')}
                    </p>
                </motion.div>

                {/* Platform tabs */}
                <div className="flex justify-center mb-12 space-x-2 md:space-x-4">
                    {platforms.map((platform) => (
                        <motion.button
                            key={platform.id}
                            onClick={() => handleTabChange(platform.id)}
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                                activeTab === platform.id
                                    ? 'bg-gray-800 border border-green-500/50'
                                    : 'bg-gray-900 border border-gray-800 hover:border-green-500/30'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="w-6 h-6 relative">
                                <Image
                                    src={platform.icon}
                                    alt={platform.name}
                                    width={24}
                                    height={24}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className={`text-sm font-medium ${
                                activeTab === platform.id ? 'text-white' : 'text-gray-400'
                            }`}>
                                {platform.name}
                            </span>
                        </motion.button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left column - Device image and stats */}
                    <div className="order-2 md:order-1">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            {/* Platform device image */}
                            <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
                                <Image
                                    src={activePlatform.device}
                                    alt={`${activePlatform.name} Device`}
                                    width={600}
                                    height={500}
                                    className="object-contain max-h-full"
                                    priority
                                />
                            </div>

                            {/* Platform info card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="absolute bottom-0 left-0 right-0 bg-gray-900 border border-gray-800 rounded-lg p-4 md:p-6 shadow-xl"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 relative mr-3">
                                        <Image
                                            src={activePlatform.icon}
                                            alt={activePlatform.name}
                                            width={40}
                                            height={40}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-400">
                                            {t('productFor')}
                                        </div>
                                        <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                            {activePlatform.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Performance metrics */}
                                <h4 className="text-sm uppercase text-gray-500 font-medium mb-3">
                                    {t('performanceMetrics')}
                                </h4>
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    {activePlatform.stats.map((stat, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-gray-900 rounded-lg px-4 py-3 border border-gray-800 flex-1 text-center"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                                        >
                                            <div className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                                {stat.value}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                            
                        </motion.div>
                         {/* App integration */}
                         <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-2">
                                {t('worksWithFavoriteApps')}
                            </h3>
                            <p className="text-gray-400 text-sm mb-6">
                                {t('integrationDescription')}
                            </p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                {[
                                    { name: "Slack", icon: "/assets/images/logos/slack.svg" },
                                    { name: "Teams", icon: "/assets/images/logos/microsoft-teams.svg" },
                                    { name: "Chrome", icon: "/assets/images/logos/chrome.svg" },
                                    { name: "Safari", icon: "/assets/images/logos/safari.svg" },
                                    { name: "Google Meetings", icon: "/assets/images/logos/google-meet.svg" },
                                    { name: "YouTube", icon: "/assets/images/logos/youtube.svg" },
                                ].map((app, index) => (
                                    <motion.div
                                        key={app.name}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3, delay: 1 + (index * 0.05) }}
                                        className="w-20 h-20 bg-gray-900 rounded-xl flex items-center justify-center border border-gray-800 hover:border-green-500/50 transition-all duration-300 group"
                                    >
                                        <div className="relative w-10 h-10">
                                            <Image
                                                src={app.icon}
                                                alt={app.name}
                                                width={40}
                                                height={40}
                                                className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                                            />
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                    

                    {/* Right column - Platform features */}
                    <motion.div
                        className="order-1 md:order-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                    >
                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 md:p-8 mb-8">
                            <h3 className="text-xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                    {t('optimizedFor')} {activePlatform.name}
                                </span>
                            </h3>
                            <p className="text-gray-400 mb-6">
                                {t('withNativeIntegration')}
                            </p>

                            {/* Code snippet */}
                            <div className="bg-gray-950 rounded-lg p-4 mb-6 overflow-x-auto">
                                <pre className="text-sm text-gray-400 font-mono">
                                    {activePlatform.codeSnippet}
                                </pre>
                            </div>

                            {/* Features list */}
                            <h4 className="text-sm uppercase text-gray-500 font-medium mb-4">
                                {t('keyFeatures')}
                            </h4>
                            <ul className="space-y-3 mb-6">
                                {activePlatform.features.map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        variants={itemVariants}
                                        className="flex items-start"
                                    >
                                        <div className="mr-3 mt-1">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM6.4 12L2.4 8L3.8 6.6L6.4 9.2L12.2 3.4L13.6 4.8L6.4 12Z" fill="#10B981"/>
                                            </svg>
                                        </div>
                                        <span className="text-gray-300">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Testimonial */}
                            <h4 className="text-sm uppercase text-gray-500 font-medium mb-4">
                                {t('userTestimonial')}
                            </h4>
                            <div className="bg-gray-950 rounded-lg p-5 border border-gray-800">
                                <div className="mb-4">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <linearGradient id="quote-gradient" x1="9.33333" y1="6.66667" x2="25.3333" y2="26.6667" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#22C55E"/>
                                                <stop offset="1" stopColor="#10B981"/>
                                            </linearGradient>
                                        </defs>
                                        <path d="M9.33333 21.3333V16C9.33333 13.0545 11.7212 10.6667 14.6667 10.6667H16V8C16 7.26667 16.6 6.66667 17.3333 6.66667C18.0667 6.66667 18.6667 7.26667 18.6667 8V10.6667H20C22.9455 10.6667 25.3333 13.0545 25.3333 16V21.3333C25.3333 24.2788 22.9455 26.6667 20 26.6667H14.6667C11.7212 26.6667 9.33333 24.2788 9.33333 21.3333Z" fill="url(#quote-gradient)"/>
                                    </svg>
                                </div>
                                <p className="text-gray-300 italic mb-4">"{activePlatform.testimonial.text}"</p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-green-500 font-bold text-lg">
                                            {activePlatform.testimonial.author.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">
                                            {activePlatform.testimonial.author}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {activePlatform.testimonial.title}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                       
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MultiplatformSupport;
