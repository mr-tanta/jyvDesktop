'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface UseCase {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    benefits: string[];
}

interface UseCasesSectionProps {
    useCases: UseCase[];
}

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

const UseCasesSection = ({ useCases }: UseCasesSectionProps) => {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUpVariant}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Spatial Audio for Every Experience</h2>
                    <p className="text-gray-300 max-w-3xl mx-auto">
                        Discover how JyvDesktop's spatial audio technology can transform different
                        types of audio content into immersive 3D experiences.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {useCases.map((useCase, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={itemVariant}
                            custom={index}
                            className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden"
                        >
                            <div className="h-48 relative">
                                <Image
                                    src={`/assets/images/use-cases/${useCase.title.toLowerCase().replace(/\s+/g, '-')}.webp`}
                                    alt={useCase.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`${useCase.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                                            {useCase.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-white">{useCase.title}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-gray-300 mb-6">{useCase.description}</p>

                                <div className="mb-6">
                                    <div className="text-sm text-gray-400 mb-3">Key Benefits:</div>
                                    <ul className="space-y-2">
                                        {useCase.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                                <span className="text-sm text-gray-300">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href={`/use-cases/${useCase.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors text-sm"
                                >
                                    <span>Learn more</span>
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UseCasesSection; 