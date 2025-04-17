'use client';

import React, { useState } from 'react';

// Components
import HeroSection from '@/components/spatial-audio/HeroSection';
import DemoSection from '@/components/spatial-audio/DemoSection';
import FeaturesOverview from '@/components/spatial-audio/FeaturesOverview';
import FeatureDetail from '@/components/spatial-audio/FeatureDetail';
import UseCasesSection from '@/components/spatial-audio/UseCasesSection';
import PerformanceStats from '@/components/spatial-audio/PerformanceStats';
import FAQSection from '@/components/spatial-audio/FAQSection';
import TestimonialsSection from '@/components/spatial-audio/TestimonialsSection';
import CTASection from '@/components/spatial-audio/CTASection';

// Data
import { spatialAudioFeatures, useCases, faqs } from '@/data/spatialAudioData';

export default function SpatialAudioPage() {
    // State for interactive demo
    const [activeFeature, setActiveFeature] = useState('3d-positioning');
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    
    // Find active feature
    const currentFeature = spatialAudioFeatures.find(feature => feature.id === activeFeature) || spatialAudioFeatures[0];

    // Toggle FAQ expansion
    const toggleFaq = (index: number) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white overflow-x-hidden">
            <HeroSection />
            
            <DemoSection />
            
            <FeaturesOverview 
                features={spatialAudioFeatures} 
                setActiveFeature={setActiveFeature} 
            />
            
            <FeatureDetail 
                feature={currentFeature} 
            />
            
            <UseCasesSection 
                useCases={useCases} 
            />
            
            <PerformanceStats />
            
            <FAQSection 
                faqs={faqs} 
                expandedFaq={expandedFaq} 
                toggleFaq={toggleFaq} 
            />
            
            <TestimonialsSection />
            
            <CTASection />
        </div>
    );
} 