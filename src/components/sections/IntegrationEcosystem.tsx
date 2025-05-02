'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const IntegrationEcosystem = () => {
    const t = useTranslations('integrations');
    const controls = useAnimation();
    const sectionRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState('applications');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    controls.start('visible');
                }
            },
            { threshold: 0.1 }
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

    // Define integration categories
    const categories = [
        {
            id: 'applications',
            name: t('categories.applications.name'),
            description: t('categories.applications.description')
        },
        {
            id: 'plugins',
            name: t('categories.plugins.name'),
            description: t('categories.plugins.description')
        },
        {
            id: 'daw',
            name: t('categories.daw.name'),
            description: t('categories.daw.description')
        },
        {
            id: 'streaming',
            name: t('categories.streaming.name'),
            description: t('categories.streaming.description')
        }
    ];

    // Define integrations data
    const integrations = {
        applications: [
            {
                name: 'Zoom',
                icon: '/images/integrations/zoom.svg',
                description: t('applications.zoom'),
                category: 'Communication',
                highlight: false
            },
            {
                name: 'Discord',
                icon: '/images/integrations/discord.svg',
                description: t('applications.discord'),
                category: 'Communication',
                highlight: true
            },
            {
                name: 'Microsoft Teams',
                icon: '/images/integrations/ms-teams.svg',
                description: t('applications.teams'),
                category: 'Communication',
                highlight: false
            },
            {
                name: 'Slack',
                icon: '/images/integrations/slack.svg',
                description: t('applications.slack'),
                category: 'Communication',
                highlight: false
            },
            {
                name: 'Spotify',
                icon: '/images/integrations/spotify.svg',
                description: t('applications.spotify'),
                category: 'Entertainment',
                highlight: false
            },
            {
                name: 'Chrome',
                icon: '/images/integrations/chrome.svg',
                description: t('applications.chrome'),
                category: 'Browser',
                highlight: true
            },
            {
                name: 'Safari',
                icon: '/images/integrations/safari.svg',
                description: t('applications.safari'),
                category: 'Browser',
                highlight: false
            },
            {
                name: 'VLC',
                icon: '/images/integrations/vlc.svg',
                description: t('applications.vlc'),
                category: 'Entertainment',
                highlight: false
            }
        ],
        plugins: [
            {
                name: 'VST3 Plugins',
                icon: '/images/integrations/vst.svg',
                description: t('plugins.vst3'),
                category: 'Plugin Format',
                highlight: true,
                tierBadge: 'Pro'
            },
            {
                name: 'Audio Units',
                icon: '/images/integrations/au.svg',
                description: t('plugins.au'),
                category: 'Plugin Format',
                highlight: true,
                tierBadge: 'Pro'
            },
            {
                name: 'FabFilter',
                icon: '/images/integrations/fabfilter.svg',
                description: t('plugins.fabfilter'),
                category: 'Third-Party Plugins',
                highlight: false,
                tierBadge: 'Pro'
            },
            {
                name: 'iZotope',
                icon: '/images/integrations/izotope.svg',
                description: t('plugins.izotope'),
                category: 'Third-Party Plugins',
                highlight: false,
                tierBadge: 'Pro'
            },
            {
                name: 'Waves',
                icon: '/images/integrations/waves.svg',
                description: t('plugins.waves'),
                category: 'Third-Party Plugins',
                highlight: false,
                tierBadge: 'Pro'
            },
            {
                name: 'Soundtoys',
                icon: '/images/integrations/soundtoys.svg',
                description: t('plugins.soundtoys'),
                category: 'Third-Party Plugins',
                highlight: false,
                tierBadge: 'Pro'
            }
        ],
        daw: [
            {
                name: 'Ableton Live',
                icon: '/images/integrations/ableton.svg',
                description: t('daw.ableton'),
                category: 'Professional DAW',
                highlight: true,
                tierBadge: 'Pro'
            },
            {
                name: 'Logic Pro',
                icon: '/images/integrations/logic.svg',
                description: t('daw.logic'),
                category: 'Professional DAW',
                highlight: true,
                tierBadge: 'Pro'
            },
            {
                name: 'Pro Tools',
                icon: '/images/integrations/protools.svg',
                description: t('daw.protools'),
                category: 'Professional DAW',
                highlight: false,
                tierBadge: 'Pro'
            },
            {
                name: 'FL Studio',
                icon: '/images/integrations/fl-studio.svg',
                description: t('daw.flstudio'),
                category: 'Professional DAW',
                highlight: false,
                tierBadge: 'Pro'
            },
            {
                name: 'Cubase',
                icon: '/images/integrations/cubase.svg',
                description: t('daw.cubase'),
                category: 'Professional DAW',
                highlight: false,
                tierBadge: 'Pro'
            },
            {
                name: 'Reaper',
                icon: '/images/integrations/reaper.svg',
                description: t('daw.reaper'),
                category: 'Professional DAW',
                highlight: false,
                tierBadge: 'Pro'
            }
        ],
        streaming: [
            {
                name: 'OBS Studio',
                icon: '/images/integrations/obs.svg',
                description: t('streaming.obs'),
                category: 'Streaming Software',
                highlight: true
            },
            {
                name: 'Streamlabs',
                icon: '/images/integrations/streamlabs.svg',
                description: t('streaming.streamlabs'),
                category: 'Streaming Software',
                highlight: false
            },
            {
                name: 'Twitch',
                icon: '/images/integrations/twitch.svg',
                description: t('streaming.twitch'),
                category: 'Streaming Platform',
                highlight: true
            },
            {
                name: 'YouTube',
                icon: '/assets/images/logos/youtube.svg',
                description: t('streaming.youtube'),
                category: 'Streaming Platform',
                highlight: false
            },
            {
                name: 'XSplit',
                icon: '/images/integrations/xsplit.svg',
                description: t('streaming.xsplit'),
                category: 'Streaming Software',
                highlight: false
            },
            {
                name: 'Elgato Stream Deck',
                icon: '/images/integrations/streamdeck.svg',
                description: t('streaming.streamdeck'),
                category: 'Streaming Hardware',
                highlight: false
            }
        ]
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
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

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        hover: {
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.2)",
            borderColor: "rgba(34, 197, 94, 0.5)",
            transition: { duration: 0.3 }
        }
    };

    // Featured integration showcase component
    const FeaturedIntegration = ({ category }) => {
        const featured = integrations[category].find(item => item.highlight) || integrations[category][0];

        return (
            <motion.div
                className="bg-gradient-to-br from-black to-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.5 }}
            >
                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                        <div className="w-24 h-24 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-700">
                            <Image
                                src={featured.icon}
                                alt={featured.name}
                                width={64}
                                height={64}
                                className="w-16 h-16 object-contain"
                            />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                <h3 className="text-2xl font-bold text-white">{featured.name}</h3>
                                {featured.tierBadge && (
                                    <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30">
                    {featured.tierBadge} {t('tierLabel')}
                  </span>
                                )}
                            </div>

                            <p className="text-gray-400 mb-4">{featured.description}</p>

                            <div className="hidden md:block">
                                <a href="#" className="inline-flex items-center gap-2 text-green-500 hover:text-green-400">
                                    <span>{t('learnMore')}</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Integration details section */}
                    <div className="mt-8 grid md:grid-cols-2 gap-4">
                        <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
                            <h4 className="text-white font-medium mb-2">{t('details.keyBenefits')}</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-300 text-sm">{t('details.benefit1')}</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-300 text-sm">{t('details.benefit2')}</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-300 text-sm">{t('details.benefit3')}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
                            <h4 className="text-white font-medium mb-2">{t('details.setupRequirements')}</h4>
                            <div className="flex gap-3 flex-wrap">
                <span className="inline-block px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                  {t('details.requirement1')}
                </span>
                                <span className="inline-block px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                  {t('details.requirement2')}
                </span>
                                <span className="inline-block px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                  {t('details.requirement3')}
                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center md:text-left">
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-400 text-black font-medium rounded-lg transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>{t('details.quickSetupGuide')}</span>
                        </button>
                    </div>
                </div>

                {/* Visual diagram of connection */}
                <div className="relative h-32 bg-black flex items-center justify-center overflow-hidden border-t border-gray-800">
                    {/* Flow diagram */}
                    <div className="flex items-center w-full justify-around px-4">
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-800">
                                <Image
                                    src="/images/integrations/app-icon.svg"
                                    alt="App"
                                    width={24}
                                    height={24}
                                    className="w-6 h-6 object-contain"
                                />
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{t('details.application')}</span>
                        </div>

                        <svg className="w-16 h-8 text-green-500" viewBox="0 0 64 32" fill="none">
                            <motion.path
                                d="M2 16 L62 16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                animate={{
                                    strokeDashoffset: [0, -16]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1,
                                    ease: "linear"
                                }}
                            />
                            <path d="M54 10 L62 16 L54 22" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>

                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{t('details.jyvDesktop')}</span>
                        </div>

                        <svg className="w-16 h-8 text-green-500" viewBox="0 0 64 32" fill="none">
                            <motion.path
                                d="M2 16 L62 16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                animate={{
                                    strokeDashoffset: [0, -16]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1,
                                    ease: "linear"
                                }}
                            />
                            <path d="M54 10 L62 16 L54 22" stroke="currentColor" strokeWidth="2" fill="none"/>
                        </svg>

                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-800">
                                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{t('details.output')}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-24 bg-black overflow-hidden"
            id="integrations"
        >
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-2/3 h-1/3 bg-gradient-to-b from-green-500/5 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-2/3 h-1/3 bg-gradient-to-t from-green-500/5 to-transparent rounded-full blur-3xl"></div>

                {/* Connection lines background */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,0 L100,100" stroke="#22c55e" strokeWidth="0.2" />
                        <path d="M100,0 L0,100" stroke="#22c55e" strokeWidth="0.2" />
                        <path d="M50,0 L50,100" stroke="#22c55e" strokeWidth="0.2" />
                        <path d="M0,50 L100,50" stroke="#22c55e" strokeWidth="0.2" />
                        {[...Array(5)].map((_, i) => (
                            <circle
                                key={i}
                                cx={10 + i * 20}
                                cy={10 + i * 20}
                                r="0.5"
                                fill="#22c55e"
                            />
                        ))}
                        {[...Array(5)].map((_, i) => (
                            <circle
                                key={i}
                                cx={90 - i * 20}
                                cy={10 + i * 20}
                                r="0.5"
                                fill="#22c55e"
                            />
                        ))}
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="inline-block mb-3 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-medium rounded-full px-3 py-1 text-sm border border-green-500/20 bg-black">
                        {t('subtitle')}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        {t('title')}
                    </h2>
                    <p className="text-gray-300 max-w-3xl mx-auto text-lg">
                        {t('description')}
                    </p>
                </motion.div>

                {/* Integration Categories */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-5 py-3 rounded-lg transition-all duration-300 border ${
                                activeCategory === category.id
                                    ? "bg-green-500 text-black font-semibold border-transparent"
                                    : "bg-gray-900 hover:bg-gray-800 text-white border-gray-800"
                            }`}
                            variants={itemVariants}
                        >
                            {category.name}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Featured integration showcase for current category */}
                <FeaturedIntegration category={activeCategory} />

                {/* Integration grid */}
                <div className="mt-16">
                    <motion.h3
                        className="text-2xl font-bold text-white mb-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                    >
                        {t('moreIntegrations', { category: categories.find(c => c.id === activeCategory)?.name })}
                    </motion.h3>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                    >
                        {integrations[activeCategory]
                            .filter(item => !item.highlight)
                            .map((integration, index) => (
                                <motion.div
                                    key={integration.name}
                                    className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500/30 transition-all"
                                    variants={cardVariants}
                                    whileHover="hover"
                                >
                                    <div className="flex flex-col items-center text-center h-full">
                                        <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mb-4 border border-gray-800">
                                            <Image
                                                src={integration.icon}
                                                alt={integration.name}
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 object-contain"
                                            />
                                        </div>

                                        <h4 className="text-white font-medium mb-2">{integration.name}</h4>

                                        {integration.tierBadge && (
                                            <span className="mb-2 inline-block px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                        {integration.tierBadge}
                      </span>
                                        )}

                                        <p className="text-gray-400 text-sm mt-auto">{integration.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                    </motion.div>
                </div>

                {/* Integration benefits section */}
                <motion.div
                    className="mt-24 grid md:grid-cols-3 gap-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                >
                    <div className="bg-gradient-to-br from-green-500/10 to-black rounded-xl p-6 border border-green-500/20">
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{t('benefits.plugAndPlay.title')}</h3>
                        <p className="text-gray-300">
                            {t('benefits.plugAndPlay.description')}
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-500/10 to-black rounded-xl p-6 border border-green-500/20">
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{t('benefits.customization.title')}</h3>
                        <p className="text-gray-300">
                            {t('benefits.customization.description')}
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-500/10 to-black rounded-xl p-6 border border-green-500/20">
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{t('benefits.performance.title')}</h3>
                        <p className="text-gray-300">
                            {t('benefits.performance.description')}
                        </p>
                    </div>
                </motion.div>

                {/* Professional integration showcase */}
                <motion.div
                    className="mt-24"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 1 }}
                >
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800">
                        <div className="grid md:grid-cols-2 items-center">
                            <div className="p-8 md:p-12">
                                <div className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full border border-green-500/30 mb-6">
                                    {t('proTier.title')}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('proTier.heading')}</h3>
                                <p className="text-gray-300 mb-6">
                                    {t('proTier.description')}
                                </p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">{t('proTier.features.pluginsTitle')}</h4>
                                            <p className="text-gray-400 text-sm mt-1">
                                                {t('proTier.features.plugins')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">{t('proTier.features.dawTitle')}</h4>
                                            <p className="text-gray-400 text-sm mt-1">
                                                {t('proTier.features.daw')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">{t('proTier.features.processingTitle')}</h4>
                                            <p className="text-gray-400 text-sm mt-1">
                                                {t('proTier.features.processing')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-medium rounded-lg transition-colors">
                                    <span>{t('proTier.upgradeButton')}</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>

                            <div className="relative h-full min-h-[320px] bg-black border-t md:border-t-0 md:border-l border-gray-800">
                                {/* Visual representation of pro integration */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative w-full max-w-md p-6">
                                        {/* Plugin chain visualization */}
                                        <div className="flex flex-col space-y-4">
                                            {/* DAW Component */}
                                            <motion.div
                                                className="flex items-center bg-gray-900 p-3 rounded-lg border border-gray-800"
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={isVisible ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                                                transition={{ duration: 0.5, delay: 1.2 }}
                                            >
                                                <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center mr-4">
                                                    <Image
                                                        src="/images/integrations/daw-icon.svg"
                                                        alt="DAW"
                                                        width={24}
                                                        height={24}
                                                        className="w-6 h-6 object-contain"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-white text-sm font-medium">{t('details.digitalAudioWorkstation')}</div>
                                                    <div className="text-gray-500 text-xs">{t('details.audioSource')}</div>
                                                </div>
                                            </motion.div>

                                            {/* Arrow */}
                                            <motion.div
                                                className="flex justify-center"
                                                initial={{ opacity: 0 }}
                                                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                                                transition={{ duration: 0.5, delay: 1.3 }}
                                            >
                                                <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                    <path d="M7 14l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </motion.div>

                                            {/* JyvDesktop */}
                                            <motion.div
                                                className="flex items-center bg-gradient-to-r from-green-500/20 to-emerald-500/10 p-3 rounded-lg border border-green-500/30"
                                                initial={{ scale: 0.9, opacity: 0 }}
                                                animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                                                transition={{ duration: 0.5, delay: 1.4 }}
                                            >
                                                <div className="w-10 h-10 bg-black rounded flex items-center justify-center mr-4">
                                                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-white text-sm font-medium">{t('details.jyvDesktop')}</div>
                                                    <div className="text-green-400 text-xs">{t('details.processingAudio')}</div>
                                                </div>
                                            </motion.div>

                                            {/* VST Plugins */}
                                            <motion.div
                                                className="grid grid-cols-3 gap-3 my-1"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                                                transition={{ duration: 0.5, delay: 1.5 }}
                                            >
                                                {[1, 2, 3].map((index) => (
                                                    <div key={index} className="bg-gray-900 p-2 rounded border border-gray-800 flex flex-col items-center">
                                                        <div className="w-8 h-8 bg-black rounded flex items-center justify-center mb-1">
                                                            <div className="w-5 h-5 rounded-sm bg-gradient-to-br from-gray-700 to-gray-800"></div>
                                                        </div>
                                                        <div className="text-gray-400 text-xs">VST {index}</div>
                                                    </div>
                                                ))}
                                            </motion.div>

                                            {/* Arrow */}
                                            <motion.div
                                                className="flex justify-center"
                                                initial={{ opacity: 0 }}
                                                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                                                transition={{ duration: 0.5, delay: 1.6 }}
                                            >
                                                <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                    <path d="M7 14l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </motion.div>

                                            {/* Output */}
                                            <motion.div
                                                className="flex items-center bg-gray-900 p-3 rounded-lg border border-gray-800"
                                                initial={{ x: 20, opacity: 0 }}
                                                animate={isVisible ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                                                transition={{ duration: 0.5, delay: 1.7 }}
                                            >
                                                <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center mr-4">
                                                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l3.536-3.536M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-white text-sm font-medium">{t('details.enhancedOutput')}</div>
                                                    <div className="text-gray-500 text-xs">{t('details.professionalQuality')}</div>
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* VST Plugin label */}
                                        <motion.div
                                            className="absolute -right-2 top-1/3 bg-green-500 text-xs font-bold text-black px-2 py-1 rounded transform rotate-90 origin-left"
                                            initial={{ opacity: 0 }}
                                            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                                            transition={{ duration: 0.5, delay: 1.8 }}
                                        >
                                            {t('details.vstAuPlugins')}
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Integration workflow */}
                <motion.div
                    className="mt-24 max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 1.2 }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-white mb-4">{t('integrationProcess.title')}</h3>
                        <p className="text-gray-300">
                            {t('integrationProcess.description')}
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connection line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/50 via-green-500/30 to-green-500/10 transform -translate-x-1/2 z-0"></div>

                        <div className="relative z-10 space-y-12">
                            {/* Step 1 */}
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="md:w-1/2 flex justify-end order-1 md:order-1">
                                    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 max-w-sm">
                                        <h4 className="text-xl font-bold text-white mb-3">{t('integrationProcess.step1.title')}</h4>
                                        <p className="text-gray-300">
                                            {t('integrationProcess.step1.description')}
                                        </p>
                                    </div>
                                </div>

                                <div className="relative order-0 md:order-0">
                                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center font-bold text-black">1</div>
                                </div>

                                <div className="md:w-1/2 md:hidden order-2"></div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="md:w-1/2 order-1 md:order-0"></div>

                                <div className="relative order-0 md:order-1">
                                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center font-bold text-black">2</div>
                                </div>

                                <div className="md:w-1/2 order-2 md:order-2">
                                    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 max-w-sm">
                                        <h4 className="text-xl font-bold text-white mb-3">{t('integrationProcess.step2.title')}</h4>
                                        <p className="text-gray-300">
                                            {t('integrationProcess.step2.description')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="md:w-1/2 flex justify-end order-1 md:order-1">
                                    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 max-w-sm">
                                        <h4 className="text-xl font-bold text-white mb-3">{t('integrationProcess.step3.title')}</h4>
                                        <p className="text-gray-300">
                                            {t('integrationProcess.step3.description')}
                                        </p>
                                    </div>
                                </div>

                                <div className="relative order-0 md:order-0">
                                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center font-bold text-black">3</div>
                                </div>

                                <div className="md:w-1/2 md:hidden order-2"></div>
                            </div>

                            {/* Step 4 */}
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="md:w-1/2 order-1 md:order-0"></div>

                                <div className="relative order-0 md:order-1">
                                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center font-bold text-black">4</div>
                                </div>

                                <div className="md:w-1/2 order-2 md:order-2">
                                    <div className="bg-gradient-to-br from-green-500/10 to-black p-6 rounded-xl border border-green-500/20 max-w-sm">
                                        <h4 className="text-xl font-bold text-white mb-3">{t('integrationProcess.step4.title')}</h4>
                                        <p className="text-gray-300">
                                            {t('integrationProcess.step4.description')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Logo cloud */}
                <motion.div
                    className="mt-24"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 1.4 }}
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            {t('trustedBrands.title')}
                        </h3>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            {t('trustedBrands.description')}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center justify-center h-16 bg-gray-900/50 rounded-lg border border-gray-800"
                                initial={{ opacity: 0, y: 10 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.3, delay: 1.5 + index * 0.05 }}
                            >
                                <div className="w-20 h-8 bg-gray-800/80 rounded"></div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    className="mt-24 max-w-5xl mx-auto text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.7, delay: 1.6 }}
                >
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 border border-gray-800 relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-500/10 blur-3xl rounded-full"></div>
                        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-green-500/10 blur-3xl rounded-full"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('cta.title')}</h3>
                            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                                {t('cta.description')}
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="#download"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-bold rounded-full transition-all duration-300 shadow-lg shadow-green-900/20 group"
                                >
                                    <span>{t('cta.downloadButton')}</span>
                                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>

                                <a
                                    href="#integrations-guide"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 rounded-full transition-all duration-300"
                                >
                                    <span>{t('cta.guideButton')}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default IntegrationEcosystem;