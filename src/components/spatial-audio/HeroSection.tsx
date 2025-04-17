'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import { Headphones, Download } from 'lucide-react';

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

const HeroSection = () => {
    const heroRef = useRef<HTMLElement>(null);
    const isHeroInView = useInView(heroRef, { once: false });

    return (
        <section ref={heroRef} className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <motion.div
                    initial="hidden"
                    animate={isHeroInView ? "visible" : "hidden"}
                    variants={fadeInUpVariant}
                    className="max-w-3xl mx-auto text-center"
                >
                    <div className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-green-400 font-medium">Immersive Audio Experience</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                        Experience <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Spatial Audio</span> Like
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
                            <Headphones size={20} />
                            <span>Experience Spatial Audio</span>
                        </a>

                        <Link
                            href="/download"
                            className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            <Download size={20} />
                            <span>Download JyvDesktop</span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection; 