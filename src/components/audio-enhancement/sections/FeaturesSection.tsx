'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Wand2,
  Play,
  Pause,
  ChevronRight,
  Info,
  VolumeX as NoiseIcon,
  Mic,
  Activity,
  Sliders,
  BrainCircuit,
  Ear,
  Headphones
} from 'lucide-react';

const FeaturesSection = () => {
  const t = useTranslations('audioEnhancement');
  
  // State for interactive features
  const [activeFeature, setActiveFeature] = useState('noise-suppression');
  const [isPlaying, setIsPlaying] = useState({
    before: false,
    after: false
  });
  const [audioInitialized, setAudioInitialized] = useState(false);
  
  // Animation variants
  const fadeInUpVariant = {
    hidden: {opacity: 0, y: 20},
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
    hidden: {opacity: 0, y: 20},
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  const staggerChildrenVariant = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Get features data from translations
  const getAudioEnhancementFeatures = (t) => [
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
  
  const audioEnhancementFeatures = getAudioEnhancementFeatures(t);
  const currentFeature = audioEnhancementFeatures.find(feature => feature.id === activeFeature) || audioEnhancementFeatures[0];
  
  // Toggle audio playback
  const toggleAudioPlayback = async (type) => {
    console.log(`Toggling ${type} audio`);
    // This is a placeholder - in the real component, this would be implemented
    setIsPlaying(prev => ({...prev, [type]: !prev[type]}));
  };

    
    return (
        <>
               
                <section className="py-16 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, margin: "-100px"}}
                variants={fadeInUpVariant}
                className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('featuresSection.title')}</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                {t('featuresSection.description')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {audioEnhancementFeatures.slice(0, 4).map((feature, index) => (
                  <motion.div
                      key={feature.id}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{once: true}}
                      variants={itemVariant}
                      custom={index}
                      className={`bg-gradient-to-b ${feature.color} border ${feature.borderColor} rounded-xl p-6 cursor-pointer transition-all hover:translate-y-[-4px]`}
                      onClick={() => setActiveFeature(feature.id)}
                  >
                    <div
                        className={`${feature.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.description.split('.')[0]}.</p>
                  </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {audioEnhancementFeatures.slice(4).map((feature, index) => (
                  <motion.div
                      key={feature.id}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{once: true}}
                      variants={itemVariant}
                      custom={index + 4}
                      className={`bg-gradient-to-b ${feature.color} border ${feature.borderColor} rounded-xl p-6 cursor-pointer transition-all hover:translate-y-[-4px]`}
                      onClick={() => setActiveFeature(feature.id)}
                  >
                    <div
                        className={`${feature.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.description.split('.')[0]}.</p>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

         {/* Feature Detail Section */}
         <section className="py-16 bg-gray-900/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                  key={activeFeature}
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -20}}
                  transition={{duration: 0.5}}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Feature Image */}
                <div className="order-2 lg:order-1">
                  <div className="relative rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
                    <div className="aspect-video">
                      <Image
                          src={currentFeature.image}
                          alt={currentFeature.title}
                          fill
                          className="object-cover"
                      />
                    </div>

                    {/* Animated overlay highlights */}
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    <motion.div
                        className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md rounded-lg p-3 border border-green-500/20"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3, duration: 0.5}}
                    >
                      <div className="flex items-center gap-2">
                        <div
                            className={`${currentFeature.iconBg} w-8 h-8 rounded-lg flex items-center justify-center`}>
                          {currentFeature.icon}
                        </div>
                        <span
                            className="text-sm text-white font-medium">{currentFeature.title}</span>
                      </div>
                    </motion.div>
                  </div>

                  {currentFeature.beforeAfterAudio && (
                      <div className="mt-8">
                        <div className="text-sm text-gray-400 mb-2">Hear the difference:</div>
                        <div className="grid grid-cols-2 gap-3">
                          {/* Before Audio Control */}
                          <button
                              onClick={() => toggleAudioPlayback('before')}
                              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            {isPlaying.before ? <Pause size={18}/> : <Play size={18}/>}
                            <span className="text-sm">Before Enhancement</span>
                          </button>

                          {/* After Audio Control */}
                          <button
                              onClick={() => toggleAudioPlayback('after')}
                              className="flex items-center gap-2 bg-gradient-to-r from-green-500/30 to-emerald-600/30 hover:from-green-500/40 hover:to-emerald-600/40 border border-green-500/30 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            {isPlaying.after ? <Pause size={18}/> : <Play size={18}/>}
                            <span className="text-sm">After Enhancement</span>
                          </button>
                        </div>

                        {!audioInitialized && (
                            <div className="mt-2 text-xs text-yellow-400 flex items-center gap-1">
                              <Info size={12} />
                              <span>Click to enable audio playback</span>
                            </div>
                        )}
                      </div>
                  )}
                </div>

                {/* Feature Details */}
                <div className="order-1 lg:order-2">
                  <div
                      className="inline-flex items-center py-1 px-3 mb-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
                    <Wand2 size={14} className="text-green-400 mr-2"/>
                    <span
                        className="text-xs text-green-400 font-medium">Audio Enhancement Feature</span>
                  </div>

                  <h2 className="text-3xl font-bold mb-4">{currentFeature.title}</h2>
                  <p className="text-gray-300 mb-8 leading-relaxed">{currentFeature.description}</p>

                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <div
                        className={`${currentFeature.iconBg} w-8 h-8 rounded-lg flex items-center justify-center mr-3`}>
                      <Wand2 size={20} className="text-white"/>
                    </div>
                    Key Capabilities
                  </h3>

                  <motion.ul
                      className="space-y-3 mb-8"
                      initial="hidden"
                      animate="visible"
                      variants={staggerChildrenVariant}
                  >
                    {currentFeature.details.map((detail, index) => (
                        <motion.li key={index} variants={itemVariant}
                                   className="flex items-start gap-2">
                          <ChevronRight size={18} className="text-green-500 mt-1 flex-shrink-0"/>
                          <span className="text-gray-300">{detail}</span>
                        </motion.li>
                    ))}
                  </motion.ul>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="#interactive-demo"
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <Wand2 size={18}/>
                      <span>Try It in Demo</span>
                    </a>

                    <Link
                        href={`/docs/audio-enhancement/${currentFeature.id}`}
                        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Info size={18}/>
                      <span>Technical Details</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
        </>
        
    )
}

export default FeaturesSection;
