import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import SpatialAudioDemo from "@/components/sections/SpatialAudioDemo";
import FeatureShowcase from "@/components/sections/Features";
import MultiplatformSupport from "@/components/sections/MultiPlatformSupport";
import SpatialAudioVisualization from "@/components/sections/SpatialAudioVisualization";
import SecurityPrivacy from "@/components/sections/SecurityPrivacy";
import IntegrationEcosystem from "@/components/sections/IntegrationEcosystem";

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
  return (
    <main className="relative overflow-hidden bg-black">
      {/* Hero Section with integrated AudioVisualizer */}
      <HeroSection />

      {/* Content Sections */}
      <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
        <FeatureShowcase/>
        <MultiplatformSupport />
        <SpatialAudioVisualization />
        <IntegrationEcosystem />
        <SecurityPrivacy />


        {/*<InteractiveDemo />*/}
        {/*<SpatialAudioDemo />*/}
        {/*<TestimonialCarousel />*/}
        {/*<TechnicalRequirements />*/}
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
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Transform</span> Your Audio Experience?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/20 transition transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="border border-green-500/30 bg-green-500/10 text-green-400 px-8 py-4 rounded-lg font-bold hover:bg-green-500/20 transition transform hover:scale-105">
                Talk to Sales
              </button>
            </div>
          </div>
        </section>
      </Suspense>
    </main>
  );
}