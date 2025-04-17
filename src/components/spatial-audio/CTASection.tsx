'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Play, CheckCircle2, Crown } from 'lucide-react';

// Animation variants
const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

const CTASection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-40 left-1/3 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[150px]"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
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
                                    <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium text-white">True 3D Positioning</h4>
                                        <p className="text-sm text-gray-400">Experience sound from any direction,
                                            including above and below</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium text-white">Advanced Room Simulation</h4>
                                        <p className="text-sm text-gray-400">Immersive acoustic environments from
                                            small rooms to concert halls</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
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
                                    <Download size={20} />
                                    <span>Download Now</span>
                                </Link>

                                <Link
                                    href="#interactive-demo"
                                    className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <Play size={20} />
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
                                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-black"></div>
                            </div>

                            {/* Pricing Badge */}
                            <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-gray-700 shadow-xl">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Crown size={16} className="text-green-400" />
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
    );
};

export default CTASection; 