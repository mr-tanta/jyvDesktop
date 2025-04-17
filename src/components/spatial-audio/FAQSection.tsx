'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Info, ChevronDown, MessageSquare } from 'lucide-react';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    faqs: FAQ[];
    expandedFaq: number | null;
    toggleFaq: (index: number) => void;
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

const FAQSection = ({ faqs, expandedFaq, toggleFaq }: FAQSectionProps) => {
    return (
        <section className="py-24 bg-gradient-to-b from-black to-gray-900/70">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUpVariant}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
                        <Info size={14} className="text-green-400 mr-2" />
                        <span className="text-sm text-green-400 font-medium">Common Questions</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
                    <p className="text-gray-300 max-w-3xl mx-auto">
                        Find answers to common questions about JyvDesktop's spatial audio capabilities.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="flex w-full justify-between items-center py-5 px-6 text-left font-medium text-white hover:text-green-400 transition-colors"
                            >
                                <span>{faq.question}</span>
                                <motion.div
                                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown size={20} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {expandedFaq === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden border-t border-gray-800"
                                    >
                                        <div className="p-6 text-gray-300">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-300 mb-6">Have more questions about JyvDesktop's spatial audio?</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/docs/spatial-audio"
                            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            <Info size={18} />
                            <span>Read Documentation</span>
                        </Link>

                        <Link
                            href="/support"
                            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            <MessageSquare size={18} />
                            <span>Contact Support</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection; 