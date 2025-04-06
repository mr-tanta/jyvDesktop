'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { audioControlFeatures } from '@/data/audioControlData';

interface FeatureCardProps {
  feature: typeof audioControlFeatures[0];
  index: number;
  setActiveFeature: (id: string) => void;
  itemVariant: any;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  feature, 
  index, 
  setActiveFeature, 
  itemVariant 
}) => {
  return (
    <motion.div
      key={feature.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={itemVariant}
      custom={index}
      className={`bg-gradient-to-b ${feature.color} border ${feature.borderColor} rounded-xl p-6 cursor-pointer transition-all hover:translate-y-[-4px]`}
      onClick={() => setActiveFeature(feature.id)}
    >
      <div className={`${feature.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
        {feature.icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
      <p className="text-gray-300 text-sm">{feature.description.split('.')[0]}.</p>
    </motion.div>
  );
};

export default FeatureCard; 