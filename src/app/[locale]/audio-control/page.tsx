'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';

import FeaturesOverview from '@/components/audio-control/features/FeaturesOverview';
import FeatureDetail from '@/components/audio-control/features/FeatureDetail';
import InteractiveDemo from '@/components/audio-control/demo/InteractiveDemo';
import UseCasesSection from '@/components/audio-control/use-cases/UseCasesSection';
import FAQSection from '@/components/audio-control/FAQSection';
import { HeroSection } from '@/components/audio-control/HeroSection';

/**
 * Localized Audio Control Page
 * 
 * This page is placed under the [locale] directory structure to ensure it has access
 * to the NextIntlClientProvider context from the [locale]/layout.tsx file.
 * 
 * The Navbar is automatically included via the [locale]/layout.tsx wrapper.
 */
export default function AudioControlPage() {
    // Initialize translations - using the page-specific namespace
    const t = useTranslations('audioControl');

    const [activeFeature, setActiveFeature] = useState('per-app-volume');
    const demoRef = useRef<HTMLDivElement>(null);

    const scrollToDemo = useCallback(() => {
        demoRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // Extract translations for the components
    const heroTranslations = {
        badge: t('hero.badge'),
        title: t('hero.title'),
        description: t('hero.description'),
        demoButton: t('hero.demoButton'),
        downloadButton: t('hero.downloadButton')
    };

    const featuresTranslations = {
        title: t('featuresSection.title'),
        description: t('featuresSection.description')
    };

    // Feature detail translations
    const featureDetailTranslations = {
        audioControlFeature: t('featureDetail.audioControlFeature'),
        keyCapabilities: t('featureDetail.keyCapabilities'),
        tryDemo: t('featureDetail.tryDemo'),
        readDocumentation: t('featureDetail.readDocumentation')
    };

    // Interactive demo translations
    const demoTranslations = {
        title: t('demoSection.title'),
        subtitle: t('demoSection.subtitle'),
        description: t('demoSection.description'),
        masterVolume: t('demoSection.masterVolume'),
        profiles: t('demoSection.profiles'),
        focusMode: t('demoSection.focusMode'),
        notificationReduction: t('demoSection.notificationReduction'),
        downloadNow: t('demoSection.downloadNow'),
        learnMore: t('demoSection.learnMore')
    };

    // Use cases section translations
    const useCasesTranslations = {
        title: t('useCasesSection.title'),
        description: t('useCasesSection.description')
    };

    // FAQ section translations
    const faqTranslations = {
        title: t('faqSection.title'),
        description: t('faqSection.description')
    };

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

            <HeroSection 
                scrollToDemo={scrollToDemo} 
                translations={heroTranslations} 
            />

            <FeaturesOverview 
                setActiveFeature={setActiveFeature}
                translations={featuresTranslations}
            />

            <FeatureDetail 
                activeFeature={activeFeature} 
                translations={featureDetailTranslations}
            />

            <div ref={demoRef}>
                <InteractiveDemo 
                    translations={demoTranslations}
                />
            </div>

            <UseCasesSection 
                translations={useCasesTranslations}
            />

            <FAQSection 
                translations={faqTranslations}
            />
        </main>
    );
}
