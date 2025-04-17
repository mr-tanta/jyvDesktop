'use client';

import React from 'react';
import { motion } from 'framer-motion';

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

interface FeaturesOverviewProps {
    features: Feature[];
    setActiveFeature: (id: string) => void;
}

const FeaturesOverview = ({ features, setActiveFeature }: FeaturesOverviewProps) => {
    return (
        <section className="py-16 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUpVariant}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Complete Spatial Audio Suite</h2>
                    <p className="text-gray-300 max-w-3xl mx-auto">
                        JyvDesktop offers a comprehensive set of spatial audio technologies
                        that transform standard audio into immersive three-dimensional experiences.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {features.slice(0, 4).map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={itemVariant}
                            custom={index}
                            className={`bg-gradient-to-b ${feature.color} border ${feature.borderColor} rounded-xl p-6 cursor-pointer transition-all hover:translate-y-[-4px]`}
                            onClick={() => setActiveFeature(feature.id)}
                        >
                            <div
                                className={`${feature.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                                {feature.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                            <p className="text-gray-300 text-sm">{feature.description.split('.')[0]}.</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.slice(4).map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={itemVariant}
                            custom={index + 4}
                            className={`bg-gradient-to-b ${feature.color} border ${feature.borderColor} rounded-xl p-6 cursor-pointer transition-all hover:translate-y-[-4px]`}
                            onClick={() => setActiveFeature(feature.id)}
                        >
                            <div
                                className={`${feature.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                                {feature.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                            <p className="text-gray-300 text-sm">{feature.description.split('.')[0]}.</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesOverview; 