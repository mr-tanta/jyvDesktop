'use client';

import React, {useState, useEffect, useRef} from 'react';
import {motion, useAnimation, AnimatePresence} from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// Client-side only binary data streams component
const BinaryDataStreams = () => {
    const [isClient, setIsClient] = useState(false);
    const [leftBinaryData, setLeftBinaryData] = useState<string[]>([]);
    const [rightBinaryData, setRightBinaryData] = useState<string[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Generate binary data on client side only
            const leftData = Array(10).fill(0).map(() => 
                Array.from({length: 20}, () => Math.round(Math.random())).join('')
            );
            
            const rightData = Array(10).fill(0).map(() => 
                Array.from({length: 20}, () => Math.round(Math.random())).join('')
            );
            
            setLeftBinaryData(leftData);
            setRightBinaryData(rightData);
            setIsClient(true);
        }
    }, []);

    if (!isClient) {
        return null; // Return nothing during server-side rendering
    }

    return (
        <>
            <div className="absolute inset-y-0 left-12 flex flex-col opacity-20 overflow-hidden">
                {leftBinaryData.map((binaryString, i) => (
                    <div
                        key={i}
                        className="text-xs font-mono text-green-500"
                        style={{
                            animation: `dataStream ${10 + i * 2}s linear infinite`,
                            animationDelay: `${i * 0.5}s`
                        }}
                    >
                        {binaryString}
                    </div>
                ))}
            </div>

            <div className="absolute inset-y-0 right-12 flex flex-col opacity-20 overflow-hidden">
                {rightBinaryData.map((binaryString, i) => (
                    <div
                        key={i}
                        className="text-xs font-mono text-green-500"
                        style={{
                            animation: `dataStream ${15 + i * 2}s linear infinite`,
                            animationDelay: `${i * 0.7}s`
                        }}
                    >
                        {binaryString}
                    </div>
                ))}
            </div>
        </>
    );
};

const SecurityPrivacy = () => {
    const t = useTranslations('securityPrivacy');
    const controls = useAnimation();
    const sectionRef = useRef(null);
    const [activeTab, setActiveTab] = useState('privacy');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    controls.start('visible');
                }
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
    }, [controls]);

    // Define security certifications
    const certifications = [
        {
            id: 'soc2',
            title: t('certifications.soc2.title'),
            description: t('certifications.soc2.description'),
            icon: '/assets/icons/soc2.svg',
            details: t('certifications.soc2.details')
        },
        {
            id: 'gdpr',
            title: t('certifications.gdpr.title'),
            description: t('certifications.gdpr.description'),
            icon: '/assets/icons/gdpr.svg',
            details: t('certifications.gdpr.details')
        },
        {
            id: 'hipaa',
            title: t('certifications.hipaa.title'),
            description: t('certifications.hipaa.description'),
            icon: '/assets/icons/hipaa.svg',
            details: t('certifications.hipaa.details')
        },
        {
            id: 'encryption',
            title: t('certifications.encryption.title'),
            description: t('certifications.encryption.description'),
            icon: '/assets/icons/encryption.svg',
            details: t('certifications.encryption.details')
        }
    ];

    // Define security features
    const securityFeatures = [
        {
            title: t('features.zeroCollection.title'),
            description: t('features.zeroCollection.description'),
            icon: (
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
                </svg>
            )
        },
        {
            title: t('features.transparentCode.title'),
            description: t('features.transparentCode.description'),
            icon: (
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
            )
        },
        {
            title: t('features.dataMinimization.title'),
            description: t('features.dataMinimization.description'),
            icon: (
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
            )
        }
    ];

    // Define privacy tabs
    const privacyTabs = [
        {
            id: 'privacy',
            title: t('tabs.privacy.title'),
            description: t('tabs.privacy.description')
        },
        {
            id: 'local',
            title: t('tabs.local.title'),
            description: t('tabs.local.description')
        },
        {
            id: 'control',
            title: t('tabs.control.title'),
            description: t('tabs.control.description')
        },
        {
            id: 'compliance',
            title: t('tabs.compliance.title'),
            description: t('tabs.compliance.description')
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {y: 20, opacity: 0},
        visible: {
            y: 0,
            opacity: 1,
            transition: {duration: 0.6, ease: "easeOut"}
        }
    };

    const tabContentVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
        exit: {opacity: 0, y: -20, transition: {duration: 0.3}}
    };

    // Custom shield animation for the hero section
    const ShieldAnimation = () => {
        return (
            <div className="relative w-64 h-64 mx-auto">
                {/* Outer glow */}
                <div className="absolute inset-0 bg-green-500/10 rounded-full blur-2xl animate-pulse"></div>

                {/* Shield base */}
                <motion.div
                    className="absolute inset-4 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full shadow-lg shadow-green-900/30"
                    initial={{scale: 0.8, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{duration: 1, ease: "easeOut"}}
                >
                    <div
                        className="absolute inset-1 bg-black rounded-full flex items-center justify-center overflow-hidden">
                        {/* Data flow animation */}
                        <div className="absolute w-full h-full">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute bg-green-500/20 w-1 h-8 rounded-full"
                                    style={{
                                        left: `${20 + i * 15}%`,
                                        top: '-20px',
                                        animation: `dataFlow ${1 + i * 0.2}s linear infinite`,
                                        animationDelay: `${i * 0.3}s`
                                    }}
                                ></div>
                            ))}
                        </div>

                        {/* Lock icon */}
                        <motion.div
                            className="relative z-10"
                            initial={{scale: 0, rotate: -20}}
                            animate={{scale: 1, rotate: 0}}
                            transition={{delay: 0.5, duration: 0.5, type: "spring"}}
                        >
                            <svg className="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Orbiting security elements */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute w-8 h-8 rounded-full bg-black border border-green-500/30 flex items-center justify-center"
                        initial={{rotate: i * 120, opacity: 0}}
                        animate={{rotate: i * 120 + 360, opacity: 1}}
                        transition={{
                            rotate: {
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            },
                            opacity: {duration: 1, delay: 0.7 + i * 0.2}
                        }}
                        style={{
                            transformOrigin: 'center center',
                            left: 'calc(50% - 16px)',
                            top: 'calc(50% - 16px)',
                            translate: '0 -60px'
                        }}
                    >
                        {i === 0 && (
                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                            </svg>
                        )}
                        {i === 1 && (
                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                            </svg>
                        )}
                        {i === 2 && (
                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                            </svg>
                        )}
                    </motion.div>
                ))}

                {/* Pulse rings */}
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 rounded-full border border-green-500/60"
                        style={{
                            animation: `pulseRing 3s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                            animationDelay: `${i * 1}s`,
                            opacity: 0
                        }}
                    ></div>
                ))}
            </div>
        );
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-24 overflow-hidden bg-black"
            id="security-privacy"
        >
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 bg-gradient-to-b from-green-500/5 to-transparent rounded-full blur-3xl"></div>
                <div
                    className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 bg-gradient-to-t from-green-500/5 to-transparent rounded-full blur-3xl"></div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-20"></div>

                {/* Security icons scattered in background */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-green-500/10"
                        style={{
                            top: `${10 + (i * 15)}%`,
                            left: `${5 + (i * 15)}%`,
                            fontSize: `${2 + (i % 3)}rem`,
                            rotate: `${(i * 20) - 30}deg`
                        }}
                        animate={{
                            y: [0, 10, 0],
                            rotate: [`${(i * 20) - 30}deg`, `${(i * 20) - 30 + 5}deg`, `${(i * 20) - 30}deg`]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 5 + (i % 3),
                            ease: "easeInOut"
                        }}
                    >
                        {i % 3 === 0 && '🔒'}
                        {i % 3 === 1 && '🛡️'}
                        {i % 3 === 2 && '🔐'}
                    </motion.div>
                ))}

                {/* Binary data streams */}
                <BinaryDataStreams />

            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{opacity: 0, y: 20}}
                    animate={isVisible ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                    transition={{duration: 0.7}}
                >
                    <div
                        className="inline-block mb-3 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-medium rounded-full px-3 py-1 text-sm border border-green-500/20 bg-black">
                        {t('badge')}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        {t('title')}
                    </h2>
                    <p className="text-gray-300 max-w-3xl mx-auto text-lg">
                        {t('description')}
                    </p>
                </motion.div>

                {/* Animated shield visualization */}
                <motion.div
                    initial={{opacity: 0}}
                    animate={isVisible ? {opacity: 1} : {opacity: 0}}
                    transition={{duration: 1, delay: 0.3}}
                    className="mb-24"
                >
                    <ShieldAnimation/>
                </motion.div>

                {/* Privacy tabs */}
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="flex flex-wrap justify-center gap-4 mb-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                    >
                        {privacyTabs.map((tab) => (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 border ${
                                    activeTab === tab.id
                                        ? "bg-green-500 text-black font-semibold border-transparent"
                                        : "bg-gray-900 hover:bg-gray-800 text-white border-gray-800"
                                }`}
                                variants={itemVariants}
                            >
                                {tab.id === 'privacy' && (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                    </svg>
                                )}
                                {tab.id === 'local' && (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                )}
                                {tab.id === 'control' && (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                )}
                                {tab.id === 'compliance' && (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                    </svg>
                                )}
                                <span>{tab.title}</span>
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Tab content */}
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-16 relative overflow-hidden">
                        {/* Background effect */}
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-50"></div>

                        {/* Tab content with animations */}
                        <AnimatePresence mode="wait">
                            {activeTab === 'privacy' && (
                                <motion.div
                                    key="privacy"
                                    className="relative"
                                    variants={tabContentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className="grid md:grid-cols-2 gap-12 items-center">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-6">{t('tabs.privacy.heading')}</h3>
                                            <p className="text-gray-300 mb-6">
                                                {t('tabs.privacy.content')}
                                            </p>
                                            <div className="space-y-4">
                                                {securityFeatures.map((feature, index) => (
                                                    <div key={index} className="flex items-start">
                                                        <div className="flex-shrink-0 mt-1 mr-4">
                                                            {feature.icon}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-white font-medium">{feature.title}</h4>
                                                            <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div
                                                className="relative bg-black/50 rounded-xl overflow-hidden border border-gray-800 shadow-lg h-80">
                                                {/* Animated data flow visualization */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="relative w-64 h-64">
                                                        {/* Central device */}
                                                        <div
                                                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black border border-green-500/30 rounded-xl flex items-center justify-center z-20">
                                                            <svg className="w-10 h-10 text-green-500" fill="none"
                                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      strokeWidth={1.5}
                                                                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                                            </svg>
                                                        </div>

                                                        {/* Data packets that move around the device but never leave */}
                                                        {[...Array(8)].map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className="absolute w-4 h-4 bg-green-500/80 rounded-full flex items-center justify-center text-xs text-black font-bold"
                                                                style={{
                                                                    top: '50%',
                                                                    left: '50%',
                                                                    marginTop: '-8px',
                                                                    marginLeft: '-8px'
                                                                }}
                                                                animate={{
                                                                    x: [0, Math.cos(i * Math.PI / 4) * 80, 0],
                                                                    y: [0, Math.sin(i * Math.PI / 4) * 80, 0],
                                                                    opacity: [0, 1, 0]
                                                                }}
                                                                transition={{
                                                                    repeat: Infinity,
                                                                    duration: 3,
                                                                    delay: i * 0.5,
                                                                    ease: "easeInOut"
                                                                }}
                                                            >
                                                                {i % 4 === 0 && '0'}
                                                                {i % 4 === 1 && '1'}
                                                                {i % 4 === 2 && '0'}
                                                                {i % 4 === 3 && '1'}
                                                            </motion.div>
                                                        ))}

                                                        {/* Protection shield */}
                                                        <motion.div
                                                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-green-500/30 z-10"
                                                            animate={{
                                                                scale: [1, 1.05, 1],
                                                                borderColor: ['rgba(34, 197, 94, 0.3)', 'rgba(34, 197, 94, 0.6)', 'rgba(34, 197, 94, 0.3)']
                                                            }}
                                                            transition={{
                                                                repeat: Infinity,
                                                                duration: 3,
                                                                ease: "easeInOut"
                                                            }}
                                                        ></motion.div>

                                                        {/* "No cloud" indicator */}
                                                        <div
                                                            className="absolute -top-4 right-0 px-3 py-1 bg-black border border-red-500 rounded-full text-xs text-red-500 font-medium">
                                                            {t('tabs.local.noCloud')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'local' && (
                                <motion.div
                                    key="local"
                                    className="relative"
                                    variants={tabContentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className="grid md:grid-cols-2 gap-12 items-center">
                                        <div className="relative order-2 md:order-1">
                                            <div
                                                className="relative bg-black/50 rounded-xl overflow-hidden border border-gray-800 shadow-lg p-6">
                                                {/* Local processing visualization with CPU and GPU */}
                                                <div className="relative h-72 flex items-center justify-center">
                                                    {/* CPU visualization */}
                                                    <motion.div
                                                        className="absolute top-0 left-0 w-32 h-32 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden"
                                                        animate={{
                                                            boxShadow: ['0 0 0 rgba(34, 197, 94, 0)', '0 0 20px rgba(34, 197, 94, 0.3)', '0 0 0 rgba(34, 197, 94, 0)']
                                                        }}
                                                        transition={{
                                                            repeat: Infinity,
                                                            duration: 2,
                                                            ease: "easeInOut"
                                                        }}
                                                    >
                                                        <div
                                                            className="p-2 border-b border-gray-800 bg-black text-xs text-green-500 font-medium">{t('tabs.local.cpu')}
                                                        </div>
                                                        <div className="p-2">
                                                            <div className="grid grid-cols-4 gap-1">
                                                                {[...Array(16)].map((_, i) => (
                                                                    <motion.div
                                                                        key={i}
                                                                        className="aspect-square bg-green-500/20 rounded-sm"
                                                                        animate={{
                                                                            backgroundColor: ['rgba(34, 197, 94, 0.1)', 'rgba(34, 197, 94, 0.3)', 'rgba(34, 197, 94, 0.1)']
                                                                        }}
                                                                        transition={{
                                                                            repeat: Infinity,
                                                                            duration: 1 + (i % 4) * 0.2,
                                                                            delay: i * 0.05,
                                                                            ease: "easeInOut"
                                                                        }}
                                                                    ></motion.div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    {/* GPU visualization */}
                                                    <motion.div
                                                        className="absolute bottom-0 right-0 w-40 h-24 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden"
                                                        animate={{
                                                            boxShadow: ['0 0 0 rgba(34, 197, 94, 0)', '0 0 20px rgba(34, 197, 94, 0.3)', '0 0 0 rgba(34, 197, 94, 0)']
                                                        }}
                                                        transition={{
                                                            repeat: Infinity,
                                                            duration: 2.5,
                                                            delay: 0.5,
                                                            ease: "easeInOut"
                                                        }}
                                                    >
                                                        <div
                                                            className="p-2 border-b border-gray-800 bg-black text-xs text-green-500 font-medium">{t('tabs.local.gpu')}
                                                        </div>
                                                        <div className="p-2">
                                                            <div className="grid grid-cols-5 gap-1">
                                                                {[...Array(15)].map((_, i) => (
                                                                    <motion.div
                                                                        key={i}
                                                                        className="aspect-square bg-green-500/20 rounded-sm"
                                                                        animate={{
                                                                            backgroundColor: ['rgba(34, 197, 94, 0.1)', 'rgba(34, 197, 94, 0.4)', 'rgba(34, 197, 94, 0.1)']
                                                                        }}
                                                                        transition={{
                                                                            repeat: Infinity,
                                                                            duration: 0.8 + (i % 5) * 0.15,
                                                                            delay: i * 0.03,
                                                                            ease: "easeInOut"
                                                                        }}
                                                                    ></motion.div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    {/* Memory block */}
                                                    <motion.div
                                                        className="absolute top-1/4 right-1/4 w-36 h-10 bg-gray-900 border border-gray-800 rounded-md overflow-hidden"
                                                        animate={{
                                                            boxShadow: ['0 0 0 rgba(34, 197, 94, 0)', '0 0 10px rgba(34, 197, 94, 0.3)', '0 0 0 rgba(34, 197, 94, 0)']
                                                        }}
                                                        transition={{
                                                            repeat: Infinity,
                                                            duration: 3,
                                                            delay: 1,
                                                            ease: "easeInOut"
                                                        }}
                                                    >
                                                        <div
                                                            className="h-full flex items-center justify-center text-xs text-green-500 font-mono">
                                                            <motion.div
                                                                animate={{
                                                                    opacity: [0.5, 1, 0.5]
                                                                }}
                                                                transition={{
                                                                    repeat: Infinity,
                                                                    duration: 2,
                                                                    ease: "easeInOut"
                                                                }}
                                                            >
                                                                {t('tabs.local.localMemory')}
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>

                                                    {/* Audio waves */}
                                                    <div
                                                        className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-center">
                                                        <svg className="w-full h-16" viewBox="0 0 200 50">
                                                            <motion.path
                                                                d="M0,25 Q10,10 20,25 T40,25 T60,25 T80,25 T100,25 T120,25 T140,25 T160,25 T180,25 T200,25"
                                                                stroke="#22c55e"
                                                                strokeWidth="1"
                                                                fill="none"
                                                                animate={{
                                                                    d: [
                                                                        "M0,25 Q10,10 20,25 T40,25 T60,25 T80,25 T100,25 T120,25 T140,25 T160,25 T180,25 T200,25",
                                                                        "M0,25 Q10,40 20,25 T40,25 T60,25 T80,25 T100,25 T120,25 T140,25 T160,25 T180,25 T200,25",
                                                                        "M0,25 Q10,10 20,25 T40,25 T60,25 T80,25 T100,25 T120,25 T140,25 T160,25 T180,25 T200,25"
                                                                    ]
                                                                }}
                                                                transition={{
                                                                    repeat: Infinity,
                                                                    duration: 2,
                                                                    ease: "easeInOut"
                                                                }}
                                                            />
                                                            <motion.path
                                                                d="M0,25 Q10,20 20,25 T40,25 T60,25 T80,25 T100,25 T120,25 T140,25 T160,25 T180,25 T200,25"
                                                                stroke="#22c55e"
                                                                strokeWidth="1"
                                                                strokeOpacity="0.5"
                                                                fill="none"
                                                                animate={{
                                                                    d: [
                                                                        "M0,25 Q10,5 20,25 T40,25 T60,25 T80,25 T100,25 T120,25 T140,25 T160,25 T180,25 T200,25",
                                                                        "M0,25 Q10,45 20,25 T40,25 T60,25 T80,25 T100,25 T120,25 T140,25 T160,25 T180,25 T200,25",
                                                                        "M0,25 Q10,5 20,25 T40,25 T60,25 T80,25 T100,25 T120,25 T140,25 T160,25 T180,25 T200,25"
                                                                    ]
                                                                }}
                                                                transition={{
                                                                    repeat: Infinity,
                                                                    duration: 1.5,
                                                                    ease: "easeInOut"
                                                                }}
                                                            />
                                                        </svg>
                                                    </div>

                                                    {/* Connection lines */}
                                                    <svg className="absolute inset-0 w-full h-full"
                                                         viewBox="0 0 300 200" fill="none">
                                                        <motion.path
                                                            d="M40,40 C80,80 100,100 150,100 C200,100 220,80 260,40"
                                                            stroke="#22c55e"
                                                            strokeWidth="1"
                                                            strokeDasharray="3 3"
                                                            strokeOpacity="0.7"
                                                            animate={{
                                                                strokeDashoffset: [0, -20]
                                                            }}
                                                            transition={{
                                                                repeat: Infinity,
                                                                duration: 2,
                                                                ease: "linear"
                                                            }}
                                                        />
                                                        <motion.path
                                                            d="M40,160 C80,120 100,100 150,100 C200,100 220,120 260,160"
                                                            stroke="#22c55e"
                                                            strokeWidth="1"
                                                            strokeDasharray="3 3"
                                                            strokeOpacity="0.7"
                                                            animate={{
                                                                strokeDashoffset: [0, -20]
                                                            }}
                                                            transition={{
                                                                repeat: Infinity,
                                                                duration: 2,
                                                                ease: "linear"
                                                            }}
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="order-1 md:order-2">
                                            <h3 className="text-2xl font-bold text-white mb-6">{t('tabs.local.heading')}</h3>
                                            <p className="text-gray-300 mb-6">
                                                {t('tabs.local.content')}
                                            </p>

                                            <div className="space-y-6 mt-6">
                                                <div className="bg-black/30 rounded-lg p-4 border border-green-500/20">
                                                    <h4 className="text-green-400 font-medium mb-2">{t('tabs.local.features.zeroDependency.title')}</h4>
                                                    <p className="text-gray-300 text-sm">
                                                        {t('tabs.local.features.zeroDependency.description')}
                                                    </p>
                                                </div>

                                                <div className="bg-black/30 rounded-lg p-4 border border-green-500/20">
                                                    <h4 className="text-green-400 font-medium mb-2">{t('tabs.local.features.optimizedPerformance.title')}</h4>
                                                    <p className="text-gray-300 text-sm">
                                                        {t('tabs.local.features.optimizedPerformance.description')}
                                                    </p>
                                                </div>

                                                <div className="bg-black/30 rounded-lg p-4 border border-green-500/20">
                                                    <h4 className="text-green-400 font-medium mb-2">{t('tabs.local.features.lowResource.title')}</h4>
                                                    <p className="text-gray-300 text-sm">
                                                        {t('tabs.local.features.lowResource.description')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'control' && (
                                <motion.div
                                    key="control"
                                    className="relative"
                                    variants={tabContentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className="grid md:grid-cols-2 gap-12 items-center">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-6">{t('tabs.control.heading')}</h3>
                                            <p className="text-gray-300 mb-6">
                                                {t('tabs.control.content')}
                                            </p>

                                            <div className="space-y-4">
                                                <div className="flex items-start">
                                                    <div
                                                        className="flex-shrink-0 mt-1 w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4">
                                                        <svg className="w-6 h-6 text-green-500" fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-medium">{t('tabs.control.features.optIn.title')}</h4>
                                                        <p className="text-gray-400 text-sm mt-1">
                                                            {t('tabs.control.features.optIn.description')}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start">
                                                    <div
                                                        className="flex-shrink-0 mt-1 w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4">
                                                        <svg className="w-6 h-6 text-green-500" fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-medium">{t('tabs.control.features.dataExport.title')}</h4>
                                                        <p className="text-gray-400 text-sm mt-1">
                                                            {t('tabs.control.features.dataExport.description')}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start">
                                                    <div
                                                        className="flex-shrink-0 mt-1 w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-4">
                                                        <svg className="w-6 h-6 text-green-500" fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-medium">{t('tabs.control.features.permissions.title')}</h4>
                                                        <p className="text-gray-400 text-sm mt-1">
                                                            {t('tabs.control.features.permissions.description')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div
                                                className="relative bg-black/50 rounded-xl overflow-hidden border border-gray-800 shadow-lg p-8">
                                                {/* Privacy controls visualization */}
                                                <div className="space-y-6">
                                                    {/* Toggle switch */}
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-white">{t('tabs.privacy.controlPanel.dataCollection')}</span>
                                                        <motion.div
                                                            className="w-12 h-6 flex items-center bg-gray-800 rounded-full p-1 cursor-pointer"
                                                            animate={{
                                                                backgroundColor: ['rgba(31, 41, 55, 1)', 'rgba(31, 41, 55, 1)']
                                                            }}
                                                        >
                                                            <motion.div
                                                                className="bg-gray-600 w-4 h-4 rounded-full shadow-md transform"
                                                                animate={{x: 0}}
                                                            />
                                                        
                                                        </motion.div>
                                                    </div>

                                                    {/* App permission */}
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <div
                                                                className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center mr-3">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none"
                                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2}
                                                                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                                </svg>
                                                            </div>
                                                            <span className="text-white">{t('tabs.privacy.controlPanel.browserAccess')}</span>
                                                        </div>
                                                        <motion.div
                                                            className="w-12 h-6 flex items-center bg-green-500 rounded-full p-1 cursor-pointer"
                                                            animate={{
                                                                backgroundColor: ['rgba(34, 197, 94, 1)', 'rgba(34, 197, 94, 0.8)', 'rgba(34, 197, 94, 1)']
                                                            }}
                                                            transition={{
                                                                repeat: Infinity,
                                                                duration: 2,
                                                                ease: "easeInOut"
                                                            }}
                                                        >
                                                            <motion.div
                                                                className="bg-white w-4 h-4 rounded-full shadow-md transform ml-4"
                                                                animate={{x: 6}}
                                                            />
                                                            
                                                        </motion.div>
                                                    </div>

                                                    {/* App permission */}
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <div
                                                                className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center mr-3">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none"
                                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2}
                                                                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                                                </svg>
                                                            </div>
                                                            <span className="text-white">{t('tabs.privacy.controlPanel.chatApps')}</span>
                                                        </div>
                                                        <motion.div
                                                            className="w-12 h-6 flex items-center bg-green-500 rounded-full p-1 cursor-pointer"
                                                            animate={{
                                                                backgroundColor: ['rgba(34, 197, 94, 1)', 'rgba(34, 197, 94, 0.8)', 'rgba(34, 197, 94, 1)']
                                                            }}
                                                            transition={{
                                                                repeat: Infinity,
                                                                duration: 2,
                                                                delay: 0.3,
                                                                ease: "easeInOut"
                                                            }}
                                                        >
                                                            <motion.div
                                                                className="bg-white w-4 h-4 rounded-full shadow-md transform ml-4"
                                                                animate={{x: 6}}
                                                            />
                                                          
                                                        </motion.div>
                                                    </div>

                                                    {/* Data management buttons */}
                                                    <div className="pt-4 border-t border-gray-800 space-y-3">
                                                        <button
                                                            className="w-full p-2 bg-gray-800 rounded-md text-white text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center">
                                                            <svg className="w-4 h-4 mr-2" fill="none"
                                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      strokeWidth={2}
                                                                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                                                            </svg>
                                                            {t('tabs.privacy.controlPanel.exportData')}
                                                        </button>
                                                        <button
                                                            className="w-full p-2 bg-black rounded-md text-red-500 text-sm font-medium hover:bg-red-500/10 transition-colors border border-red-500/30 flex items-center justify-center">
                                                            <svg className="w-4 h-4 mr-2" fill="none"
                                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      strokeWidth={2}
                                                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                            </svg>
                                                            {t('tabs.privacy.controlPanel.deleteData')}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Control panel label */}
                                                <div
                                                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-green-500 text-black text-xs font-bold rounded-full">
                                                    {t('tabs.privacy.controlPanel.title')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'compliance' && (
                                <motion.div
                                    key="compliance"
                                    className="relative"
                                    variants={tabContentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className="grid md:grid-cols-2 gap-12 items-center">
                                        <div className="order-2 md:order-1">
                                            <div className="grid grid-cols-2 gap-4">
                                                {certifications.map((cert) => (
                                                    <motion.div
                                                        key={cert.id}
                                                        className="bg-black/50 p-4 rounded-lg border border-gray-800 hover:border-green-500/30 transition-colors"
                                                        whileHover={{
                                                            y: -5,
                                                            boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.1)'
                                                        }}
                                                    >
                                                        <div className="h-12 mb-3 flex items-center">
                                                            <div
                                                                className="rounded-lg flex items-center justify-center mr-3">
                                                                <Image
                                                                    src={cert.icon}
                                                                    alt={cert.title}
                                                                    width={30}
                                                                    height={30}
                                                                    className="w-11 h-11 object-contain"
                                                                />
                                                            </div>
                                                            <div
                                                                className="flex-1 text-sm font-medium text-white">{cert.title}</div>
                                                        </div>
                                                        <p className="text-xs text-gray-400">{cert.description}</p>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {/* Additional compliance info */}
                                            <div
                                                className="mt-6 bg-gradient-to-br from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/20">
                                                <h4 className="text-white font-medium mb-2 flex items-center">
                                                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                                    </svg>
                                                    {t('tabs.compliance.thirdPartyAudits')}
                                                </h4>
                                                <p className="text-gray-300 text-sm">
                                                    {t('tabs.compliance.auditDescription')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="order-1 md:order-2">
                                            <h3 className="text-2xl font-bold text-white mb-6">{t('tabs.compliance.heading')}</h3>
                                            <p className="text-gray-300 mb-6">
                                                {t('tabs.compliance.content')}
                                            </p>

                                            <div className="space-y-4">
                                                <div className="flex items-start">
                                                    <div
                                                        className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3">
                                                        <svg className="w-3 h-3 text-black" fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={3} d="M5 13l4 4L19 7"/>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-white">{t('tabs.compliance.points.localFirst')}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start">
                                                    <div
                                                        className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3">
                                                        <svg className="w-3 h-3 text-black" fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={3} d="M5 13l4 4L19 7"/>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-white">{t('tabs.compliance.points.minimalData')}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start">
                                                    <div
                                                        className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1 mr-3">
                                                        <svg className="w-3 h-3 text-black" fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={3} d="M5 13l4 4L19 7"/>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-white">{t('tabs.compliance.points.enterprise')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Security certifications/badges */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                variants={itemVariants}
                                className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-green-500/20 transition-all group"
                                whileHover={{y: -5, boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.1)'}}
                            >
                                <div
                                    className=" rounded-xl flex items-center justify-center mb-4 group-hover:from-green-500/30 group-hover:to-emerald-500/20 transition-all">
                                    <Image
                                        src={cert.icon}
                                        alt={cert.title}
                                        width={30}
                                        height={30}
                                        className="w-20 h-20 object-contain"
                                    />
                                </div>
                                <h3 className="text-white font-medium mb-2">{cert.title}</h3>
                                <p className="text-gray-400 text-sm">{cert.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* End quote */}
                <motion.div
                    className="max-w-3xl mx-auto mt-24 text-center"
                    initial={{opacity: 0, y: 30}}
                    animate={isVisible ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
                    transition={{duration: 0.7, delay: 0.8}}
                >
                    <div
                        className="bg-gradient-to-br from-gray-900 to-black p-8 md:p-10 rounded-2xl border border-green-500/10 relative">
                        <div
                            className="absolute -top-10 -left-10 text-green-500 text-opacity-10 text-7xl font-serif">"
                        </div>
                        <div
                            className="absolute -bottom-10 -right-10 text-green-500 text-opacity-10 text-7xl font-serif">"
                        </div>

                        <svg className="w-12 h-12 mx-auto mb-6 text-green-500 opacity-80" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"/>
                        </svg>

                        <blockquote className="text-xl md:text-2xl text-white font-medium italic mb-6">
                            {t('quote.title')}
                        </blockquote>
                        <p className="text-gray-300">
                            {t('quote.description')}
                        </p>

                        <div className="mt-8 flex items-center justify-center">
                            <div
                                className="h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent w-full"></div>
                            <div className="px-4">
                                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"/>
                                </svg>
                            </div>
                            <div
                                className="h-px bg-gradient-to-r from-green-500/30 via-transparent to-transparent w-full"></div>
                        </div>
                    </div>
                </motion.div>

                {/* Privacy comparison */}
                <motion.div
                    className="max-w-5xl mx-auto mt-24"
                    initial={{opacity: 0, y: 30}}
                    animate={isVisible ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
                    transition={{duration: 0.7, delay: 1}}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-white mb-4">{t('comparison.title')}</h3>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            {t('comparison.description')}
                        </p>
                    </div>

                    <div className="relative overflow-hidden bg-gray-900 rounded-xl border border-gray-800">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-max">
                                <thead>
                                <tr className="bg-black/30 text-left">
                                    <th className="p-6 text-gray-300 font-medium">{t('comparison.privacyFeature')}</th>
                                    <th className="p-6 text-center">
                                        <div className="flex flex-col items-center">
                                            <div
                                                className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-2 flex items-center justify-center">
                                                <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M5 13l4 4L19 7"/>
                                                </svg>
                                            </div>
                                            <span className="text-white font-medium">{t('comparison.jyvdesktop')}</span>
                                        </div>
                                    </th>
                                    <th className="p-6 text-center">
                                        <div className="flex flex-col items-center">
                                            <div
                                                className="w-10 h-10 rounded-full bg-gray-800 mb-2 flex items-center justify-center">
                                                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                                                     stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z"/>
                                                </svg>
                                            </div>
                                            <span className="text-white font-medium">{t('comparison.cloudSolutions')}</span>
                                        </div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                {[
                                    {
                                        feature: t('comparison.features.localProcessing.title'),
                                        jyvdesktop: true,
                                        cloud: false,
                                        description: t('comparison.features.localProcessing.description')
                                    },
                                    {
                                        feature: t('comparison.features.worksOffline.title'),
                                        jyvdesktop: true,
                                        cloud: false,
                                        description: t('comparison.features.worksOffline.description')
                                    },
                                    {
                                        feature: t('comparison.features.noDataCollection.title'),
                                        jyvdesktop: true,
                                        cloud: false,
                                        description: t('comparison.features.noDataCollection.description')
                                    },
                                    {
                                        feature: t('comparison.features.transparentPrivacy.title'),
                                        jyvdesktop: true,
                                        cloud: false,
                                        description: t('comparison.features.transparentPrivacy.description')
                                    },
                                    {
                                        feature: t('comparison.features.gdprCompliant.title'),
                                        jyvdesktop: true,
                                        cloud: true,
                                        description: t('comparison.features.gdprCompliant.description')
                                    }
                                ].map((row, index) => (
                                    <tr key={index} className="hover:bg-black/40 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-start">
                                                <div className="text-white font-medium">{row.feature}</div>
                                                <div className="ml-2 text-gray-400 text-xs">{row.description}</div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-center">
                                            {row.jyvdesktop ? (
                                                <div
                                                    className="inline-flex items-center justify-center w-8 h-8 bg-green-500/20 rounded-full">
                                                    <svg className="w-5 h-5 text-green-500" fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div
                                                    className="inline-flex items-center justify-center w-8 h-8 bg-red-500/10 rounded-full">
                                                    <svg className="w-5 h-5 text-red-500" fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                                    </svg>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-6 text-center">
                                            {row.cloud ? (
                                                <div
                                                    className="inline-flex items-center justify-center w-8 h-8 bg-green-500/20 rounded-full">
                                                    <svg className="w-5 h-5 text-green-500" fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2} d="M5 13l4 4L19 7"/>
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div
                                                    className="inline-flex items-center justify-center w-8 h-8 bg-red-500/10 rounded-full">
                                                    <svg className="w-5 h-5 text-red-500" fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                                    </svg>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>

                {/* FAQ Accordion */}
                <motion.div
                    className="max-w-4xl mx-auto mt-24"
                    initial={{opacity: 0, y: 30}}
                    animate={isVisible ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
                    transition={{duration: 0.7, delay: 1.2}}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-white mb-4">{t('faq.title')}</h3>
                        <p className="text-gray-300">
                            {t('faq.description')}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                question: t('faq.questions.recording.question'),
                                answer: t('faq.questions.recording.answer')
                            },
                            {
                                question: t('faq.questions.dataCollection.question'),
                                answer: t('faq.questions.dataCollection.answer')
                            },
                            {
                                question: t('faq.questions.localProcessing.question'),
                                answer: t('faq.questions.localProcessing.answer')
                            },
                            {
                                question: t('faq.questions.internetConnection.question'),
                                answer: t('faq.questions.internetConnection.answer')
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                                <details className="group">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer">
                                        <h4 className="text-white font-medium text-lg">{faq.question}</h4>
                                        <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                                                            <svg
                                                                className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0 transition-opacity text-green-500"
                                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                              <path strokeLinecap="round" strokeLinejoin="round"
                                                                    strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                                            </svg>
                                                            <svg
                                                                className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100 transition-opacity text-green-500"
                                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                              <path strokeLinecap="round" strokeLinejoin="round"
                                                                    strokeWidth={2} d="M18 12H6"/>
                                                            </svg>
                                                          </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-300">
                                        <p>{faq.answer}</p>
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="max-w-3xl mx-auto mt-24 text-center"
                    initial={{opacity: 0, y: 30}}
                    animate={isVisible ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
                    transition={{duration: 0.7, delay: 1.4}}
                >
                    <div
                        className="bg-gradient-to-br from-green-500/10 to-black/80 rounded-xl p-8 border border-green-500/20 relative overflow-hidden">
                        {/* Background elements */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                            <svg className="absolute right-0 bottom-0 w-64 h-64 text-green-500 opacity-10"
                                 viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            <div
                                className="absolute -left-10 -top-10 w-40 h-40 bg-green-500/10 rounded-full blur-2xl"></div>
                        </div>

                        <div className="relative z-10">
                            <svg className="w-16 h-16 mx-auto mb-6 text-green-500" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                            </svg>

                            <h3 className="text-2xl font-bold text-white mb-4">{t('cta.title')}</h3>
                            <p className="text-gray-300 mb-8">
                                {t('cta.description')}
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="#download"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-bold rounded-full transition-all duration-300 shadow-lg shadow-green-900/20 group"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"/>
                                    </svg>
                                    <span>{t('cta.downloadButton')}</span>
                                </a>

                                <a
                                    href="#privacy-policy"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-black/50 hover:bg-black/80 text-white border border-green-500/30 font-medium rounded-full transition-all duration-300"
                                >
                                    <span>{t('cta.privacyButton')}</span>
                                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* CSS for animations */}
            <style jsx global>{`
                @keyframes dataFlow {
                    0% {
                        transform: translateY(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.8;
                    }
                    90% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(300px);
                        opacity: 0;
                    }
                }

                @keyframes dataStream {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-500px);
                    }
                }

                @keyframes pulseRing {
                    0% {
                        transform: scale(0.8);
                        opacity: 0;
                    }
                    40% {
                        opacity: 0.3;
                    }
                    100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `}</style>
        </section>
    );
};

export default SecurityPrivacy;