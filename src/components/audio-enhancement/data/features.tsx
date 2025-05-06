'use client';

import React from 'react';
import {
  VolumeX as NoiseIcon,
  Mic,
  Activity,
  Sliders,
  BrainCircuit,
  Ear,
  Headphones,
  Waves
} from 'lucide-react';

// Define the type for our feature items
export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  image: string;
  color: string;
  borderColor: string;
  iconBg: string;
  beforeAfterAudio?: {
    before: string;
    after: string;
  };
}

// Create icon components to avoid JSX in .ts file
const createNoiseIcon = () => <NoiseIcon size={24} />;
const createMicIcon = () => <Mic size={24} />;
const createActivityIcon = () => <Activity size={24} />;
const createSlidersIcon = () => <Sliders size={24} />;
const createBrainCircuitIcon = () => <BrainCircuit size={24} />;
const createHeadphonesIcon = () => <Headphones size={24} />;
const createEarIcon = () => <Ear size={24} />;
const createWavesIcon = () => <Waves size={24} />;

// Audio Enhancement Features Data
// This function will be called inside the component to access translations
export const getAudioEnhancementFeatures = (t: any): FeatureItem[] => {  
  return [
  {
    id: 'noise-suppression',
    title: t('featureItems.aiNoiseSuppression.title'),
    description: t('featureItems.aiNoiseSuppression.description'),
    icon: <NoiseIcon size={24}/>,
    details: [
      t('featureItems.aiNoiseSuppression.details.1'),
      t('featureItems.aiNoiseSuppression.details.2'),
      t('featureItems.aiNoiseSuppression.details.3'),
      t('featureItems.aiNoiseSuppression.details.4'),
      t('featureItems.aiNoiseSuppression.details.5')
    ],
    image: '/assets/images/audio-enhancement/noise-suppression.webp',
    color: 'from-blue-500/10 to-blue-600/5',
    borderColor: 'border-blue-500/20',
    iconBg: 'bg-blue-500/20',
    beforeAfterAudio: {
      before: '/assets/audio/noise-before.mp3',
      after: '/assets/audio/noise-after.mp3',
    }
  },
  {
    id: 'voice-enhancement',
    title: t('featureItems.voiceEnhancement.title'),
    description: t('featureItems.voiceEnhancement.description'),
    icon: <Mic size={24}/>,
    details: [
      t('featureItems.voiceEnhancement.details.1'),
      t('featureItems.voiceEnhancement.details.2'),
      t('featureItems.voiceEnhancement.details.3'),
      t('featureItems.voiceEnhancement.details.4'),
      t('featureItems.voiceEnhancement.details.5')
    ],
    image: '/assets/images/audio-enhancement/voice-enhancement.webp',
    color: 'from-purple-500/10 to-purple-600/5',
    borderColor: 'border-purple-500/20',
    iconBg: 'bg-purple-500/20',
    beforeAfterAudio: {
      before: '/assets/audio/voice-before.mp3',
      after: '/assets/audio/voice-after.mp3',
    }
  },
  {
    id: 'dynamic-processor',
    title: t('featureItems.dynamicProcessor.title'),
    description: t('featureItems.dynamicProcessor.description'),
    icon: <Activity size={24}/>,
    details: [
      t('featureItems.dynamicProcessor.details.1'),
      t('featureItems.dynamicProcessor.details.2'),
      t('featureItems.dynamicProcessor.details.3'),
      t('featureItems.dynamicProcessor.details.4'),
      t('featureItems.dynamicProcessor.details.5')
    ],
    image: '/assets/images/audio-enhancement/dynamic-processor.webp',
    color: 'from-amber-500/10 to-amber-600/5',
    borderColor: 'border-amber-500/20',
    iconBg: 'bg-amber-500/20',
    beforeAfterAudio: {
      before: '/assets/audio/dynamics-before.mp3',
      after: '/assets/audio/dynamics-after.mp3',
    }
  },
  {
    id: 'equalizer',
    title: t('featureItems.equalizer.title'),
    description: t('featureItems.equalizer.description'),
    icon: <Sliders size={24}/>,
    details: [
      t('featureItems.equalizer.details.1'),
      t('featureItems.equalizer.details.2'),
      t('featureItems.equalizer.details.3'),
      t('featureItems.equalizer.details.4'),
      t('featureItems.equalizer.details.5')
    ],
    image: '/assets/images/audio-enhancement/equalizer.webp',
    color: 'from-green-500/10 to-green-600/5',
    borderColor: 'border-green-500/20',
    iconBg: 'bg-green-500/20',
    beforeAfterAudio: {
      before: '/assets/audio/eq-before.mp3',
      after: '/assets/audio/eq-after.mp3',
    }
  },
  {
    id: 'neural-processor',
    title: t('featureItems.neuralProcessor.title'),
    description: t('featureItems.neuralProcessor.description'),
    icon: <BrainCircuit size={24}/>,
    details: [
      t('featureItems.neuralProcessor.details.1'),
      t('featureItems.neuralProcessor.details.2'),
      t('featureItems.neuralProcessor.details.3'),
      t('featureItems.neuralProcessor.details.4'),
      t('featureItems.neuralProcessor.details.5')
    ],
    image: '/assets/images/audio-enhancement/neural-processor.webp',
    color: 'from-pink-500/10 to-pink-600/5',
    borderColor: 'border-pink-500/20',
    iconBg: 'bg-pink-500/20',
    beforeAfterAudio: {
      before: '/assets/audio/neural-before.mp3',
      after: '/assets/audio/neural-after.mp3',
    }
  },
  {
    id: 'speaker-optimizer',
    title: t('featureItems.speakerOptimizer.title'),
    description: t('featureItems.speakerOptimizer.description'),
    icon: <Headphones size={24}/>,
    details: [
      t('featureItems.speakerOptimizer.details.1'),
      t('featureItems.speakerOptimizer.details.2'),
      t('featureItems.speakerOptimizer.details.3'),
      t('featureItems.speakerOptimizer.details.4'),
      t('featureItems.speakerOptimizer.details.5')
    ],
    image: '/assets/images/audio-enhancement/speaker-optimizer.webp',
    color: 'from-orange-500/10 to-orange-600/5',
    borderColor: 'border-orange-500/20',
    iconBg: 'bg-orange-500/20',
    beforeAfterAudio: {
      before: '/assets/audio/speaker-before.mp3',
      after: '/assets/audio/speaker-after.mp3',
    }
  },
  {
    id: 'clarity-enhancer',
    title: t('featureItems.clarityEnhancer.title'),
    description: t('featureItems.clarityEnhancer.description'),
    icon: <Ear size={24}/>,
    details: [
      t('featureItems.clarityEnhancer.details.1'),
      t('featureItems.clarityEnhancer.details.2'),
      t('featureItems.clarityEnhancer.details.3'),
      t('featureItems.clarityEnhancer.details.4'),
      t('featureItems.clarityEnhancer.details.5')
    ],
    image: '/assets/images/audio-enhancement/clarity-enhancer.webp',
    color: 'from-indigo-500/10 to-indigo-600/5',
    borderColor: 'border-indigo-500/20',
    iconBg: 'bg-indigo-500/20',
    beforeAfterAudio: {
      before: '/assets/audio/clarity-before.mp3',
      after: '/assets/audio/clarity-after.mp3',
    }
  }
];
};
