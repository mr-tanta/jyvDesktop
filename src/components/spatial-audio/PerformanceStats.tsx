'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Orbit, Box, Settings } from 'lucide-react';

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

const PerformanceStats = () => {
    return (
        <section className="py-24 bg-gray-900/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUpVariant}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
                        <Gauge size={14} className="text-green-400 mr-2" />
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
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6 text-center"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                            <Gauge size={32} className="text-green-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">&lt;8ms</h3>
                        <p className="text-gray-400">Processing Latency</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6 text-center"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                            <Orbit size={32} className="text-green-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">128</h3>
                        <p className="text-gray-400">Sound Sources</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6 text-center"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                            <Box size={32} className="text-green-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">32</h3>
                        <p className="text-gray-400">Environment Presets</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6 text-center"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                            <Settings size={32} className="text-green-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">200+</h3>
                        <p className="text-gray-400">HRTF Models</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PerformanceStats; 