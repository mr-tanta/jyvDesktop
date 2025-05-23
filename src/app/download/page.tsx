'use client';

import React, { useState, useEffect } from 'react';
import { platforms, keyFeatures, testimonials, faqs } from '@/data/downloadData';
import { trackDownload } from '@/lib/analytics';

// Import components
import AnimatedBackground from '@/components/download/AnimatedBackground';
import HeroSection from '@/components/download/HeroSection';
import ScreenshotsSection from '@/components/download/ScreenshotsSection';
import FeaturesSection from '@/components/download/FeaturesSection';
import InstallationSteps from '@/components/download/InstallationSteps';
import TroubleshootingSection from '@/components/download/TroubleshootingSection';
import CompatibilityChart from '@/components/download/CompatibilityChart';
import TestimonialsSection from '@/components/download/TestimonialsSection';
import FAQSection from '@/components/download/FAQSection';
import DownloadBanner from '@/components/download/DownloadBanner';

export default function DownloadPage() {
    const [activePlatform, setActivePlatform] = useState(platforms[0]);
    const [downloadStarted, setDownloadStarted] = useState<string | null>(null);

    // Detect user's platform on load
    useEffect(() => {
        // Simple platform detection - could be enhanced
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('mac') !== -1) {
            setActivePlatform(platforms[0]); // macOS
        } else if (userAgent.indexOf('chrome') !== -1 && userAgent.indexOf('android') !== -1) {
            setActivePlatform(platforms[2]); // Chromebook
        } else {
            setActivePlatform(platforms[1]); // Default to Windows
        }
    }, []);

    // Handle download button click with visual feedback
    const handleDownload = (platformId: string) => {
        setDownloadStarted(platformId);

        // Find the platform object to get details for analytics
        const platform = platforms.find(p => p.id === platformId);
        if (platform) {
            // Track download event in analytics
            trackDownload(platform.name, platform.directDownload.version);
        }

        // Reset the state after animation completes
        setTimeout(() => {
            setDownloadStarted(null);
        }, 3000);
    };

    return (
        <main className="bg-black text-white min-h-screen">
            {/* Animated background shapes */}
            <AnimatedBackground />

            {/* Hero Section */}
            <HeroSection
                platforms={platforms}
                activePlatform={activePlatform}
                setActivePlatform={setActivePlatform}
                downloadStarted={downloadStarted}
                handleDownload={handleDownload}
            />

            {/* Product Screenshots Carousel */}
            <ScreenshotsSection />

            {/* Features Section */}
            <FeaturesSection features={keyFeatures} />

            {/* Installation Steps Section */}
            <InstallationSteps platform={activePlatform} />

            {/* Troubleshooting Section */}
            <TroubleshootingSection platform={activePlatform} />

            {/* Compatibility Chart */}
            <CompatibilityChart />

            {/* Testimonials Section */}
            <TestimonialsSection testimonials={testimonials} />

            {/* FAQ Section */}
            <FAQSection faqs={faqs} />

            {/* Download Banner (Sticky) */}
            <DownloadBanner
                activePlatform={activePlatform}
                handleDownload={handleDownload}
            />
        </main>
    );
}
