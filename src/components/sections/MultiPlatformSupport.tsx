'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MultiplatformSupport = () => {
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

    const platforms = [
        {
            id: "windows",
            name: "Windows",
            icon: "/assets/images/logos/windows.svg",
            device: "/images/windows-device.webp",
            color: "from-green-500 to-emerald-600",
            codeSnippet: `// Windows-optimized audio routing
IAudioSessionManager* pSessionManager;
hr = pDevice->Activate(__uuidof(IAudioSessionManager),
                      CLSCTX_ALL, nullptr,
                      (void**)&pSessionManager);`,
            features: [
                "WASAPI integration for ultra-low latency audio processing",
                "DirectML acceleration for AI-powered noise suppression",
                "ASIO driver support for professional audio interfaces",
                "Optimized performance on Windows 10 & 11"
            ],
            stats: [
                { label: "Latency", value: "<5ms" },
                { label: "CPU Usage", value: "~3%" },
                { label: "RAM Usage", value: "<300MB" }
            ],
            testimonial: {
                text: "JyvStream Desktop transformed my Windows gaming setup. The spatial audio gives me a competitive edge in FPS games.",
                author: "Alex Morgan",
                title: "Professional Gamer"
            }
        },
        {
            id: "macos",
            name: "macOS",
            icon: "/assets/images/logos/macos.svg",
            device: "/images/macos-device.webp",
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
                "Native CoreAudio integration for pristine sound quality",
                "Metal Performance Shaders for accelerated AI processing",
                "Audio Units (AU) plugin support for custom audio chains",
                "Universal app for Apple Silicon and Intel Macs"
            ],
            stats: [
                { label: "Latency", value: "<7ms" },
                { label: "CPU Usage", value: "~4%" },
                { label: "RAM Usage", value: "<350MB" }
            ],
            testimonial: {
                text: "As a music producer, JyvStream Desktop's AU plugin support on macOS is indispensable for my workflow.",
                author: "Sophia Chen",
                title: "Music Producer"
            }
        },
        {
            id: "chromebook",
            name: "Chrome OS",
            icon: "/assets/images/logos/chrome.svg",
            device: "/images/chromebook-device.webp",
            color: "from-green-500 to-teal-500",
            codeSnippet: `// Chrome OS WebAudio optimization
const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);`,
            features: [
                "Progressive Web App integration for seamless ChromeOS experience",
                "WebAudio API optimization for browser-based audio processing",
                "Chrome extension for advanced audio routing between tabs",
                "Lightweight design optimized for Chromebook hardware"
            ],
            stats: [
                { label: "Latency", value: "<12ms" },
                { label: "CPU Usage", value: "~5%" },
                { label: "RAM Usage", value: "<200MB" }
            ],
            testimonial: {
                text: "JyvStream Desktop finally makes my Chromebook viable for video conferencing. The noise cancellation is exceptional.",
                author: "David Wu",
                title: "Remote Educator"
            }
        }
    ];

    // Handle platform tab switching
    const handleTabChange = (platformId: any) => {
        setActiveTab(platformId);
    };

    // Get active platform data
    const activePlatform = platforms.find(p => p.id === activeTab) || platforms[0];

    return (
        <section id="multiplatform-section" className="relative w-full py-24 overflow-hidden bg-black">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-green-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-green-500/5 blur-[100px] rounded-full"></div>
                <div className="absolute top-[60%] left-[30%] w-[20%] h-[20%] bg-emerald-500/5 blur-[80px] rounded-full"></div>
            </div>

            {/* Audio wave decoration */}
            <div className="absolute w-full h-32 bottom-0 left-0 opacity-30">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
                    <path
                        d="M0,0 C150,90 350,0 500,30 C650,60 700,0 900,40 C1050,70 1150,10 1200,0 V120 H0 Z"
                        className="fill-green-500/10"
                    ></path>
                </svg>
            </div>

            <div className="container relative z-10 mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="inline-block mb-3 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-medium rounded-full px-3 py-1 text-sm border border-green-500/20 bg-black">
                        CROSS-PLATFORM EXCELLENCE
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        One powerful solution, <br/>
                        <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        any device you choose
                        </span>
                    </h2>
                    <p className="text-gray-300 max-w-3xl mx-auto text-lg">
                        JyvStream Desktop delivers consistent, high-performance audio enhancement across all major platforms,
                        with native optimization for each operating system's unique audio architecture.
                    </p>
                </motion.div>

                {/* Platform tabs */}
                <motion.div
                    className="flex flex-wrap justify-center mb-12 gap-2 md:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    {platforms.map((platform) => (
                        <button
                            key={platform.id}
                            onClick={() => handleTabChange(platform.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                                activeTab === platform.id
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold shadow-lg shadow-green-900/20"
                                    : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                            }`}
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
                            <span>{platform.name}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Main content area - active platform */}
                <motion.div
                    className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center"
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Left column - Device visual */}
                    <div className="relative order-2 md:order-1">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-3xl opacity-20 rounded-full"></div>

                        <motion.div
                            className="relative z-10"
                            initial={{ opacity: 0, y: 20, rotateY: 10 }}
                            animate={{ opacity: 1, y: 0, rotateY: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="relative">
                                {/* Platform specific decorations */}
                                {activeTab === 'windows' && (
                                    <div className="absolute -right-6 -top-6 w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-full blur-md"></div>
                                )}
                                {activeTab === 'macos' && (
                                    <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-gradient-to-br from-green-400/20 to-green-500/5 rounded-full blur-md"></div>
                                )}
                                {activeTab === 'chromebook' && (
                                    <div className="absolute right-1/4 -bottom-6 w-24 h-12 bg-gradient-to-br from-teal-500/20 to-green-500/5 rounded-full blur-md"></div>
                                )}

                                {/* Device image */}
                                <div className="relative rounded-xl overflow-hidden border border-green-500/10 shadow-xl shadow-green-900/20 bg-gradient-to-br from-gray-900 to-black">
                                    <Image
                                        src={activePlatform.device}
                                        alt={`JyvStream Desktop on ${activePlatform.name}`}
                                        width={600}
                                        height={400}
                                        className="w-full h-auto"
                                    />

                                    {/* Animated overlay effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent opacity-40"></div>

                                    {/* Floating platform icon */}
                                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/70 backdrop-blur-sm p-2 border border-green-500/20 shadow-lg">
                                        <Image
                                            src={activePlatform.icon}
                                            alt={activePlatform.name}
                                            width={32}
                                            height={32}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Code snippet */}
                            <motion.div
                                className="mt-6 bg-gray-900 rounded-lg border border-gray-800 shadow-lg max-w-md overflow-hidden"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                            >
                                <div className="bg-black/40 px-4 py-2 border-b border-gray-800 flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="text-gray-400 text-xs ml-2">jyvstream_{activePlatform.id}.cpp</span>
                                </div>
                                <div className="px-4 py-3 max-h-32 overflow-y-auto text-sm font-mono">
                  <pre className="text-gray-300 whitespace-pre-wrap">
                    {activePlatform.codeSnippet}
                  </pre>
                                </div>
                            </motion.div>

                            {/* Performance metrics */}
                            <div className="flex gap-4 mt-6">
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
                    </div>

                    {/* Right column - Platform features */}
                    <motion.div
                        className="order-1 md:order-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                    >
                        <motion.div variants={itemVariants}>
                            <div className="inline-block mb-3 bg-black border border-green-500/20 text-green-500 font-medium rounded-full px-3 py-1 text-sm">
                                {activePlatform.name} EDITION
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">
                                Native {activePlatform.name} Integration
                            </h3>
                            <p className="text-gray-300 mb-8">
                                Experience JyvStream Desktop optimized specifically for {activePlatform.name}, leveraging the unique
                                audio architecture to deliver uncompromising performance and reliability.
                            </p>
                        </motion.div>

                        {/* Feature list */}
                        <div className="space-y-4 mb-8">
                            {activePlatform.features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-start"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-900/20 mr-4">
                                        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white text-lg">{feature}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Testimonial */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gray-900 border border-gray-800 rounded-xl p-6 relative"
                        >
                            <div className="absolute -top-3 -left-3">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M9.33333 21.3333V16C9.33333 13.0545 11.7212 10.6667 14.6667 10.6667H16V8C16 7.26667 16.6 6.66667 17.3333 6.66667C18.0667 6.66667 18.6667 7.26667 18.6667 8V10.6667H20C22.9455 10.6667 25.3333 13.0545 25.3333 16V21.3333C25.3333 24.2788 22.9455 26.6667 20 26.6667H14.6667C11.7212 26.6667 9.33333 24.2788 9.33333 21.3333Z" fill="url(#quote-gradient)"/>
                                </svg>
                                <defs>
                                    <linearGradient id="quote-gradient" x1="9.33333" y1="6.66667" x2="25.3333" y2="26.6667" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#22C55E"/>
                                        <stop offset="1" stopColor="#10B981"/>
                                    </linearGradient>
                                </defs>
                            </div>
                            <p className="text-gray-300 italic mb-4 mt-2">{activePlatform.testimonial.text}</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-black font-bold">
                                    {activePlatform.testimonial.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-white font-medium">{activePlatform.testimonial.author}</p>
                                    <p className="text-gray-400 text-sm">{activePlatform.testimonial.title}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Cross-platform benefit callout */}
                <motion.div
                    className="mt-20 max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    <div className="bg-gradient-to-r from-gray-900 to-black border border-green-500/10 rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-xl">
                        {/* Background decoration */}
                        <div className="absolute -right-24 -top-24 w-64 h-64 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl"></div>
                        <div className="absolute -left-24 -bottom-24 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row items-center gap-10">
                                <div className="md:w-1/2">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                        Seamless cross-platform workflow
                                    </h3>
                                    <p className="text-gray-300 mb-6">
                                        Your audio settings, profiles, and presets synchronize perfectly between all your devices,
                                        ensuring a consistent premium audio experience wherever your work takes you.
                                    </p>

                                    {/* Cross-platform benefits */}
                                    <div className="space-y-4">
                                        {[
                                            "Profile sync between all your devices",
                                            "Identical interface across platforms",
                                            "Consistent audio quality and processing",
                                            "License works on all supported operating systems"
                                        ].map((benefit, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <p className="text-gray-200">{benefit}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Cross-platform visualization */}
                                <div className="md:w-1/2 relative">
                                    <div className="relative bg-black/50 backdrop-blur-sm rounded-xl border border-green-500/10 p-5 shadow-xl">
                                        {/* Devices arrangement */}
                                        <div className="relative h-64">
                                            {platforms.map((platform, index) => (
                                                <div
                                                    key={platform.id}
                                                    className="absolute transition-all duration-500"
                                                    style={{
                                                        top: `${index * 20}px`,
                                                        left: `${index * 10}%`,
                                                        zIndex: activeTab === platform.id ? 10 : 3 - index,
                                                        transform: activeTab === platform.id ? 'scale(1.05)' : 'scale(1)',
                                                        opacity: activeTab === platform.id ? 1 : 0.7,
                                                    }}
                                                >
                                                    <div className={`bg-gradient-to-br ${platform.color} p-0.5 rounded-xl shadow-lg`}>
                                                        <div className="bg-gray-900 rounded-lg p-3">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Image
                                                                    src={platform.icon}
                                                                    alt={platform.name}
                                                                    width={20}
                                                                    height={20}
                                                                    className="w-5 h-5"
                                                                />
                                                                <span className="text-white text-sm font-medium">{platform.name}</span>
                                                            </div>
                                                            <div className="h-24 rounded-lg overflow-hidden relative">
                                                                <Image
                                                                    src={`/images/${platform.id}-preview.webp`}
                                                                    alt={`JyvStream Desktop on ${platform.name}`}
                                                                    width={250}
                                                                    height={96}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Connecting lines */}
                                            <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 250 200" fill="none">
                                                <path d="M125,20 C180,50 150,80 200,100" stroke="url(#line-gradient)" strokeWidth="1.5" strokeDasharray="4 2"/>
                                                <path d="M125,20 C70,50 100,80 50,100" stroke="url(#line-gradient)" strokeWidth="1.5" strokeDasharray="4 2"/>
                                                <path d="M125,20 C125,50 125,80 125,150" stroke="url(#line-gradient)" strokeWidth="1.5" strokeDasharray="4 2"/>
                                                <defs>
                                                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
                                                        <stop stopColor="#22C55E" stopOpacity="0.1"/>
                                                        <stop offset="0.5" stopColor="#22C55E" stopOpacity="0.8"/>
                                                        <stop offset="1" stopColor="#10B981" stopOpacity="0.1"/>
                                                    </linearGradient>
                                                </defs>
                                            </svg>

                                            {/* Central node */}
                                            <div className="absolute left-1/2 top-5 transform -translate-x-1/2 z-20">
                                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 p-0.5 shadow-lg shadow-green-500/30">
                                                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M21 16V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H6.2C5.07989 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.0799 3 7.2V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path d="M3.5 20.5L4.90857 19.0914C5.57111 18.4289 6.4289 18.4289 7.09143 19.0914L8.09143 20.0914C8.75397 20.754 9.6118 20.754 10.2743 20.0914L11.2743 19.0914C11.9369 18.4289 12.8047 18.4289 13.4673 19.0914L14.4673 20.0914C15.1298 20.754 15.9976 20.754 16.6602 20.0914L17.6602 19.0914C18.3227 18.4289 19.1905 18.4289 19.8531 19.0914L21.2617 20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path d="M10.5 13.5C10.5 12.5 11.1 11.5 12.5 11.5C13.9 11.5 14.5 12.5 14.5 13.5C14.5 14.5 13.9 15.5 12.5 15.5C11.1 15.5 10.5 14.5 10.5 13.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path d="M7.5 11.5L9.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path d="M7.5 15.5L9.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path d="M15.5 11.5L17.5 11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            <path d="M15.5 15.5L17.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap rounded-full bg-black/80 border border-green-500/20 px-3 py-1 text-xs text-green-500 font-medium">
                                                    JyvStream Desktop Cloud
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* CTA section */}
                <div className="text-center mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">Experience JyvStream Desktop on any device</h3>
                        <p className="text-gray-300 mb-8">
                            One license gives you access across all supported platforms. Download now to transform your audio experience everywhere.
                        </p>

                        {/* Platform-specific download buttons */}
                        <div className="flex flex-wrap justify-center gap-4">
                            {platforms.map((platform) => (
                                <a
                                    key={platform.id}
                                    href={`#download-${platform.id}`}
                                    className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-bold rounded-full transition-all duration-300 shadow-lg shadow-green-900/20 group"
                                >
                                    <div className="w-6 h-6 relative bg-black/20 rounded-full p-1">
                                        <Image
                                            src={platform.icon}
                                            alt={platform.name}
                                            width={24}
                                            height={24}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <span>Download for {platform.name}</span>
                                    <svg
                                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Platform comparison table */}
                <motion.div
                    className="mt-24 max-w-5xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                >
                    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                        <div className="p-6 border-b border-gray-800">
                            <h3 className="text-xl font-bold text-white">Platform Comparison</h3>
                            <p className="text-gray-400">See how JyvStream Desktop performs across different operating systems</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-max">
                                <thead>
                                <tr className="bg-black/30">
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Feature</th>
                                    {platforms.map((platform) => (
                                        <th key={platform.id} className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="w-8 h-8 mb-2 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-full p-1.5">
                                                    <Image
                                                        src={platform.icon}
                                                        alt={platform.name}
                                                        width={24}
                                                        height={24}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-white">{platform.name}</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                {[
                                    {
                                        feature: "Audio API",
                                        windows: "WASAPI & ASIO",
                                        macos: "CoreAudio",
                                        chromebook: "WebAudio"
                                    },
                                    {
                                        feature: "Minimum Latency",
                                        windows: "<5ms",
                                        macos: "<7ms",
                                        chromebook: "<12ms"
                                    },
                                    {
                                        feature: "AI Processing",
                                        windows: "DirectML",
                                        macos: "Metal",
                                        chromebook: "TensorFlow.js"
                                    },
                                    {
                                        feature: "Plugin Support",
                                        windows: "VST2/VST3",
                                        macos: "AU/VST",
                                        chromebook: "Web Extensions"
                                    },
                                    {
                                        feature: "System Integration",
                                        windows: "Deep",
                                        macos: "Deep",
                                        chromebook: "Standard"
                                    }
                                ].map((row: any, index) => (
                                    <tr key={index} className="hover:bg-black/30 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-white">{row.feature}</td>
                                        {platforms.map((platform: any) => (
                                            <td key={platform.id} className="px-6 py-4 text-center text-sm text-gray-300">
                                                {row[platform.id]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>

                {/* "Works with" ecosystem */}
                <motion.div
                    className="mt-24"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-white mb-3">Works with your favorite apps</h3>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            JyvStream Desktop seamlessly integrates with popular applications across all platforms
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                        {[
                            { name: "Zoom", icon: "/assets/images/logos/zoom.svg" },
                            { name: "Discord", icon: "/assets/images/logos/discord.svg" },
                            { name: "Slack", icon: "/assets/images/logos/slack.svg" },
                            { name: "Teams", icon: "/assets/images/logos/microsoft-teams.svg" },
                            { name: "Chrome", icon: "/assets/images/logos/chrome.svg" },
                            { name: "Safari", icon: "/assets/images/logos/safari.svg" },
                            { name: "Spotify", icon: "/assets/images/logos/spotify.svg" },
                            { name: "Google Meetings", icon: "/assets/images/logos/google-meet.svg" },
                            { name: "YouTube", icon: "/assets/images/logos/youtube.svg" },
                            { name: "ProTools", icon: "/assets/images/logos/protools.svg" },
                            { name: "Ableton", icon: "/assets/images/logos/ableton.svg" },
                            { name: "Twitch", icon: "/assets/images/logos/twitch.svg" },
                            { name: "OBS", icon: "/assets/images/logos/obs.png" }
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
                </motion.div>
            </div>
        </section>
    );
};

export default MultiplatformSupport;