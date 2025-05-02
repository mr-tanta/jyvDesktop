'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import SpatialAudioDemo from "@/components/sections/SpatialAudioDemo";
import FeatureShowcase from "@/components/sections/Features";
import MultiplatformSupport from "@/components/sections/MultiPlatformSupport";
import SpatialAudioVisualization from "@/components/sections/SpatialAudioVisualization";
import SecurityPrivacy from "@/components/sections/SecurityPrivacy";
import IntegrationEcosystem from "@/components/sections/IntegrationEcosystem";
import CompetitiveAdvantage from "@/components/sections/CompetitiveAdvantage";
import Link from 'next/link';

// Dynamically load heavy components with proper loading states
const HeroSection = dynamic(() => import('@/components/sections/Hero'), {
  loading: () => (
    <div className="h-screen bg-gradient-to-b from-black to-black/90 flex items-center justify-center">
      <div className="w-16 h-16 relative">
        <div className="absolute inset-0 rounded-full border-4 border-green-500/20 animate-ping"></div>
        <div className="absolute inset-0 rounded-full border-t-4 border-green-500 animate-spin"></div>
      </div>
    </div>
  )
});

const FeaturesGrid = dynamic(() => import('@/components/sections/FeaturesGrid'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />
});

const PricingTiers = dynamic(() => import('@/components/sections/PricingTiers'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />
});

const TestimonialCarousel = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />
});

const InteractiveDemo = dynamic(() => import('@/components/ui/InteractiveDemo'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />
});

const TechnicalRequirements = dynamic(() => import('@/components/sections/TechnicalRequirements'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />
});

const FeaturedBlogPosts = dynamic(() => import('@/components/sections/FeaturedBlogPosts'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />
});

export default function Home() {
  const t = useTranslations();

  return (
    <main className="relative overflow-hidden bg-black">
      {/* Hero Section with integrated AudioVisualizer */}
      <HeroSection />

      {/* Content Sections - organized for proper narrative flow */}
      <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
        {/* Core Features - highlighting what our product does */}
        <FeatureShowcase/>

        {/* Show how it works on different platforms */}
        <MultiplatformSupport />

        {/* Technical highlights with visualization */}
        <SpatialAudioVisualization />

        {/* Integration with other tools users may have */}
        <IntegrationEcosystem />

        {/* Competitive advantage section */}
        <CompetitiveAdvantage />

        {/* Build trust by highlighting security/privacy */}
        <SecurityPrivacy />

        {/* Testimonials to build social proof */}
        <TestimonialCarousel />

        {/* Interactive demo to let users experience the product */}
        {/* <InteractiveDemo /> */}

        {/* Technical specs for those who want to know more */}
        {/* <TechnicalRequirements /> */}
      
        {/* Content marketing with related blog posts */}
        <FeaturedBlogPosts />

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-b from-black to-black relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-[80px]"></div>

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]"></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6">
              {t('cta.readyToTransform')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">{t('hero.subtitle')}</span>?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/download" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/20 transition transform hover:scale-105 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download-cloud"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m8 17 4 4 4-4"></path></svg>
                {t('nav.download')} JyvStream Desktop
              </Link>
              <Link href="/pricing" className="border border-green-500/30 bg-green-500/10 text-green-400 px-8 py-4 rounded-lg font-bold hover:bg-green-500/20 transition transform hover:scale-105 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tag"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path><path d="M7 7h.01"></path></svg>
                {t('nav.pricing')}
              </Link>
            </div>
          </div>
        </section>
      </Suspense>
    </main>
  );
}
