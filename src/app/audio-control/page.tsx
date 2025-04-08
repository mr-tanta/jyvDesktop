'use client';

import React, { useState, useRef, useCallback } from 'react';

import HeroSection from '@/components/audio-control/HeroSection';
import FeaturesOverview from '@/components/audio-control/features/FeaturesOverview';
import FeatureDetail from '@/components/audio-control/features/FeatureDetail';
import InteractiveDemo from '@/components/audio-control/demo/InteractiveDemo';
import UseCasesSection from '@/components/audio-control/use-cases/UseCasesSection';
import FAQSection from '@/components/audio-control/FAQSection';

export default function AudioControlPage() {
    const [activeFeature, setActiveFeature] = useState('per-app-volume');
    const demoRef = useRef<HTMLDivElement>(null);

    const scrollToDemo = useCallback(() => {
        demoRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // Animated background elements for the page
    const AnimatedBackground = () => (
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-green-500/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
                <div className="absolute top-20 left-1/4 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[120px]"></div>
                <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px]"></div>

                {/* Audio waveform ambient pattern */}
                <div className="absolute inset-y-1/3 inset-x-0 h-40 opacity-10">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60" stroke="#22c55e" strokeWidth="2" fill="none">
                            <animate attributeName="d" values="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60; M0,60 Q150,100 300,60 T600,60 T900,60 T1200,60; M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60" dur="10s" repeatCount="indefinite" />
                        </path>
                        <path d="M0,60 Q150,100 300,60 T600,60 T900,60 T1200,60" stroke="#22c55e" strokeWidth="2" fill="none">
                            <animate attributeName="d" values="M0,60 Q150,100 300,60 T600,60 T900,60 T1200,60; M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60; M0,60 Q150,100 300,60 T600,60 T900,60 T1200,60" dur="10s" repeatCount="indefinite" />
                        </path>
                    </svg>
                </div>
            </div>
    );

    return (
        <main className="bg-black text-white min-h-screen">
            <AnimatedBackground />
            
            <HeroSection scrollToDemo={scrollToDemo} />
            
            <FeaturesOverview setActiveFeature={setActiveFeature} />
            
            <FeatureDetail activeFeature={activeFeature} />
            
            <div ref={demoRef}>
                <InteractiveDemo />
                    </div>

            <UseCasesSection />
            
            <FAQSection />
        </main>
    );
}