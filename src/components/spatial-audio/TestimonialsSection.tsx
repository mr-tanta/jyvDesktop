'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

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

const TestimonialsSection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-green-500/20 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUpVariant}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
                        <Star size={14} className="text-green-400 mr-2" />
                        <span className="text-sm text-green-400 font-medium">User Stories</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Users Say</h2>
                    <p className="text-gray-300 max-w-3xl mx-auto">
                        Hear from users who've transformed their audio experience with JyvDesktop's spatial audio
                        technology.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Testimonial 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6"
                    >
                        <div className="flex flex-col h-full">
                            <div className="mb-6">
                                <div className="flex gap-1 text-green-500 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} fill="currentColor" />
                                    ))}
                                </div>
                                <p className="text-gray-300 italic">
                                    "The spatial audio features in JyvDesktop have completely changed how I
                                    experience games. I can precisely pinpoint enemy positions and immerse myself
                                    fully in the game world. It's like having a superpower."
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden relative">
                                        <Image
                                            src="/assets/images/testimonials/mark.webp"
                                            alt="Mark T."
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Mark T.</p>
                                        <p className="text-sm text-gray-400">Competitive Gamer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Testimonial 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6"
                    >
                        <div className="flex flex-col h-full">
                            <div className="mb-6">
                                <div className="flex gap-1 text-green-500 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} fill="currentColor" />
                                    ))}
                                </div>
                                <p className="text-gray-300 italic">
                                    "I was skeptical about how much difference spatial audio would make for music,
                                    but JyvDesktop blew me away. My favorite albums sound like I'm hearing them for
                                    the first time—so much detail and space I never noticed before."
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden relative">
                                        <Image
                                            src="/assets/images/testimonials/lisa.webp"
                                            alt="Lisa J."
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Lisa J.</p>
                                        <p className="text-sm text-gray-400">Music Enthusiast</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Testimonial 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6"
                    >
                        <div className="flex flex-col h-full">
                            <div className="mb-6">
                                <div className="flex gap-1 text-green-500 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} fill="currentColor" />
                                    ))}
                                </div>
                                <p className="text-gray-300 italic">
                                    "With JyvDesktop's spatial audio, virtual meetings are so much less fatiguing.
                                    Being able to position different participants around me creates a natural
                                    conversational feel that makes long meetings much more bearable."
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden relative">
                                        <Image
                                            src="/assets/images/testimonials/david.webp"
                                            alt="David R."
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">David R.</p>
                                        <p className="text-sm text-gray-400">Senior Manager, Remote Team</p>
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

export default TestimonialsSection; 