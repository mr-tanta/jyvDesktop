import React from 'react';
import { motion } from 'framer-motion';
import { audioControlFeatures } from '@/data/audioControlData';
import FeatureCard from './FeatureCard';

interface FeaturesOverviewProps {
  setActiveFeature: (id: string) => void;
}

export const FeaturesOverview: React.FC<FeaturesOverviewProps> = ({ setActiveFeature }) => {
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

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUpVariant}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Complete Audio Control System</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            JyvDesktop gives you unprecedented control over every aspect of your system's audio,
            from individual application volumes to complex routing scenarios and custom profiles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {audioControlFeatures.slice(0, 4).map((feature, index) => (
            <FeatureCard 
              key={feature.id}
              feature={feature}
              index={index}
              setActiveFeature={setActiveFeature}
              itemVariant={itemVariant}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {audioControlFeatures.slice(4).map((feature, index) => (
            <FeatureCard 
              key={feature.id}
              feature={feature}
              index={index + 4}
              setActiveFeature={setActiveFeature}
              itemVariant={itemVariant}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview; 