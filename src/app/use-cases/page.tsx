import React from 'react';

import {Download, ArrowRight} from 'lucide-react';
import {Metadata} from 'next';
import {ClientSideUseCases} from "@/components/use-cases/ClientSideUseCases";

export const metadata: Metadata = {
    title: 'Use Cases - JyvDesktop',
    description: 'Explore how JyvDesktop can enhance your audio experience for remote work, content creation, gaming, entertainment, and professional audio production.',
};

export default function UseCasesPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative pt-24 pb-16 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-green-900/20 to-black"></div>
                <div className="absolute top-0 right-0 -z-10 w-full h-full">
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 1000 1000"
                        xmlns="http://www.w3.org/2000/svg"
                        opacity="0.05"
                    >
                        <defs>
                            <pattern
                                id="grid"
                                width="40"
                                height="40"
                                patternUnits="userSpaceOnUse"
                            >
                                <path
                                    d="M 40 0 L 0 0 0 40"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                ></path>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)"></rect>
                    </svg>
                </div>

                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div
                            className="inline-block mb-6 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium border border-green-500/30">
                            Use Cases & Applications
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Transform Your Audio Experience
                        </h1>
                        <p className="text-xl text-gray-400 mb-10">
                            Discover how JyvDesktop enhances your audio for every situation, from professional meetings
                            to immersive gaming sessions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/download"
                                className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                                <Download size={20}/>
                                Download JyvDesktop
                            </a>
                            <a
                                href="#use-cases"
                                className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                            >
                                Explore Use Cases
                                <ArrowRight size={18}/>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Use Cases Section */}
            <section id="use-cases" className="py-16">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">How JyvDesktop Enhances Your Audio</h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Select a category below to discover specific use cases tailored to your needs
                        </p>
                    </div>

                    {/* Client-side component with state management */}
                    <ClientSideUseCases/>

                    {/* More Use Cases CTA */}
                    <div className="mt-24 text-center">
                        <h2 className="text-2xl font-bold text-white mb-3">Want to learn more?</h2>
                        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                            Download JyvDesktop today and discover how it can enhance your specific audio needs.
                        </p>
                        <div className="flex justify-center gap-4">
                            <a
                                href="/download"
                                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                            >
                                Download Now
                            </a>
                            <a
                                href="/contact"
                                className="px-6 py-3 border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition-all"
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-gray-900 border-t border-gray-800">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Loved by Professionals</h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            See what professionals across different industries are saying about JyvDesktop
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-black border border-gray-800 p-6 rounded-xl shadow-md">
                                <div className="flex items-center mb-4">
                                    <div className="mr-4">
                                        <div
                                            className="h-12 w-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 flex items-center justify-center text-white font-bold">
                                            {testimonial.author.split(' ').map(name => name[0]).join('')}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">{testimonial.author}</h4>
                                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                                    </div>
                                </div>
                                <blockquote className="text-gray-300 italic">"{testimonial.text}"</blockquote>
                                <div className="mt-4 flex">
                                    {Array.from({length: 5}).map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-green-500"
                                        >
                                            <polygon
                                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

// Testimonials data
const testimonials = [
    {
        author: "Michael Zhang",
        role: "Senior Sound Engineer",
        text: "JyvDesktop has revolutionized my workflow. The ability to enhance audio in real-time while maintaining natural sound quality is unprecedented for a desktop application."
    },
    {
        author: "Sophia Miller",
        role: "Content Creator",
        text: "My viewers constantly comment on how professional my audio sounds now. JyvDesktop makes my voice sound better than expensive microphones I've tried in the past."
    },
    {
        author: "David Johnson",
        role: "Remote Team Manager",
        text: "Our team meetings are so much more productive since we started using JyvDesktop. No more 'can you repeat that' or background noise disruptions."
    }
];

