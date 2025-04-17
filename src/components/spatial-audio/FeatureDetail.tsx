'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Headphones, Info, ChevronRight, CheckCircle2 } from 'lucide-react';

interface Feature {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    borderColor: string;
    iconBg: string;
    details: string[];
    image: string;
}

interface FeatureDetailProps {
    feature: Feature;
}

// Animation variants
const staggerChildrenVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

const FeatureDetail = ({ feature }: FeatureDetailProps) => {
    return (
        <section className="py-16 bg-gray-900/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Feature Image */}
                        <div className="order-2 lg:order-1">
                            <div className="relative rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
                                <div className="aspect-video">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Animated overlay highlights */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                                <motion.div
                                    className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md rounded-lg p-3 border border-green-500/20"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className={`${feature.iconBg} w-8 h-8 rounded-lg flex items-center justify-center`}>
                                            {feature.icon}
                                        </div>
                                        <span className="text-sm text-white font-medium">{feature.title}</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Feature Details */}
                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center py-1 px-3 mb-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
                                <Headphones size={14} className="text-green-400 mr-2" />
                                <span className="text-xs text-green-400 font-medium">Spatial Audio Feature</span>
                            </div>

                            <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
                            <p className="text-gray-300 mb-8 leading-relaxed">{feature.description}</p>

                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <div className={`${feature.iconBg} w-8 h-8 rounded-lg flex items-center justify-center mr-3`}>
                                    <CheckCircle2 size={20} className="text-white" />
                                </div>
                                Key Capabilities
                            </h3>

                            <motion.ul
                                className="space-y-3 mb-8"
                                initial="hidden"
                                animate="visible"
                                variants={staggerChildrenVariant}
                            >
                                {feature.details.map((detail, index) => (
                                    <motion.li key={index} variants={itemVariant} className="flex items-start gap-2">
                                        <ChevronRight size={18} className="text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-gray-300">{detail}</span>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#interactive-demo"
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                                >
                                    <Headphones size={18} />
                                    <span>Try It in Demo</span>
                                </a>

                                <Link
                                    href={`/docs/spatial-audio/${feature.id}`}
                                    className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <Info size={18} />
                                    <span>Technical Details</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default FeatureDetail; 