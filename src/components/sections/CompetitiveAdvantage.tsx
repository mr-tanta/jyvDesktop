'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Check, X, BarChart3, ArrowUpRight } from 'lucide-react';

const CompetitiveAdvantage = () => {
  const t = useTranslations('competitiveAdvantage');
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Define feature data structure from translations
  const features = [
    // Core Technology features
    { 
      category: t('categories.coreTechnology'), 
      name: t('features.aiNoiseCancellation'), 
      jyv: true, krisp: true, rtxVoice: true, voiceMeeter: false, soundSource: false 
    },
    { 
      category: t('categories.coreTechnology'), 
      name: t('features.appLevelAudioControl'), 
      jyv: true, krisp: false, rtxVoice: false, voiceMeeter: true, soundSource: true 
    },
    { 
      category: t('categories.coreTechnology'), 
      name: t('features.spatialAudio'), 
      jyv: true, krisp: false, rtxVoice: false, voiceMeeter: false, soundSource: false 
    },
    // Platform Support features
    { 
      category: t('categories.platformSupport'), 
      name: t('features.windows'), 
      jyv: true, krisp: true, rtxVoice: true, voiceMeeter: true, soundSource: false 
    },
    { 
      category: t('categories.platformSupport'), 
      name: t('features.macOS'), 
      jyv: true, krisp: true, rtxVoice: false, voiceMeeter: false, soundSource: true 
    },
    { 
      category: t('categories.platformSupport'), 
      name: t('features.linux'), 
      jyv: true, krisp: false, rtxVoice: false, voiceMeeter: false, soundSource: false 
    },
    // Hardware features
    { 
      category: t('categories.hardware'), 
      name: t('features.worksOnAnyDevice'), 
      jyv: true, krisp: true, rtxVoice: false, voiceMeeter: true, soundSource: true 
    },
    { 
      category: t('categories.hardware'), 
      name: t('features.noSpecialHardware'), 
      jyv: true, krisp: true, rtxVoice: false, voiceMeeter: true, soundSource: true 
    },
    // User Experience features
    { 
      category: t('categories.userExperience'), 
      name: t('features.intuitiveInterface'), 
      jyv: true, krisp: true, rtxVoice: true, voiceMeeter: false, soundSource: true 
    },
    { 
      category: t('categories.userExperience'), 
      name: t('features.customizableProfiles'), 
      jyv: true, krisp: false, rtxVoice: false, voiceMeeter: true, soundSource: true 
    },
    // Enterprise features
    { 
      category: t('categories.enterprise'), 
      name: t('features.centralizedManagement'), 
      jyv: true, krisp: false, rtxVoice: false, voiceMeeter: false, soundSource: false 
    },
    { 
      category: t('categories.enterprise'), 
      name: t('features.policyControls'), 
      jyv: true, krisp: false, rtxVoice: false, voiceMeeter: false, soundSource: false 
    }
  ];
  
  // Define differentiators with translations
  const differentiators = [
    {
      id: 1,
      title: t('differentiators.0.title'),
      description: t('differentiators.0.description')
    },
    {
      id: 2,
      title: t('differentiators.1.title'),
      description: t('differentiators.1.description')
    },
    {
      id: 3,
      title: t('differentiators.2.title'),
      description: t('differentiators.2.description')
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // Group features by category
  const categories = [...new Set(features.map(feature => feature.category))];

  return (
    <section 
      id="competitive-advantage" 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-medium tracking-widest uppercase">
              <BarChart3 className="w-3.5 h-3.5 mr-2" />
              {t('subtitle')}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-20 overflow-x-auto"
        >
          <div className="min-w-[800px] lg:min-w-0">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-4 px-4 text-left text-gray-300 font-medium w-1/4">{t('featureComparison')}</th>
                  <th className="py-4 px-4 text-center text-green-500 font-semibold w-1/6">
                    <div className="flex flex-col items-center">
                      <span className="text-lg">JyvDesktop</span>
                      <div className="mt-1 px-2 py-1 bg-green-500/10 rounded-full text-xs">{t('jyvAdvantage')}</div>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-center text-gray-300 font-medium w-1/6">{t('competitor')}: {t('competitors.krisp')}</th>
                  <th className="py-4 px-4 text-center text-gray-300 font-medium w-1/6">{t('competitor')}: {t('competitors.rtxVoice')}</th>
                  <th className="py-4 px-4 text-center text-gray-300 font-medium w-1/6">{t('competitor')}: {t('competitors.voiceMeeter')}</th>
                  <th className="py-4 px-4 text-center text-gray-300 font-medium w-1/6">{t('competitor')}: {t('competitors.soundSource')}</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, categoryIndex) => (
                  <React.Fragment key={`category-${categoryIndex}`}>
                    <tr className="bg-green-500/5">
                      <td colSpan={6} className="py-3 px-4 text-green-400 font-medium">{category}</td>
                    </tr>
                    {features
                      .filter(feature => feature.category === category)
                      .map((feature, featureIndex) => (
                        <motion.tr 
                          key={`feature-${categoryIndex}-${featureIndex}`}
                          variants={itemVariants}
                          className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors"
                        >
                          <td className="py-3 px-4 text-gray-200">{feature.name}</td>
                          <td className="py-3 px-4 text-center">
                            {feature.jyv ? 
                              <Check className="w-5 h-5 text-green-500 mx-auto" /> : 
                              <X className="w-5 h-5 text-red-500 mx-auto" />}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {feature.krisp ? 
                              <Check className="w-5 h-5 text-green-400/70 mx-auto" /> : 
                              <X className="w-5 h-5 text-red-500/70 mx-auto" />}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {feature.rtxVoice ? 
                              <Check className="w-5 h-5 text-green-400/70 mx-auto" /> : 
                              <X className="w-5 h-5 text-red-500/70 mx-auto" />}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {feature.voiceMeeter ? 
                              <Check className="w-5 h-5 text-green-400/70 mx-auto" /> : 
                              <X className="w-5 h-5 text-red-500/70 mx-auto" />}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {feature.soundSource ? 
                              <Check className="w-5 h-5 text-green-400/70 mx-auto" /> : 
                              <X className="w-5 h-5 text-red-500/70 mx-auto" />}
                          </td>
                        </motion.tr>
                      ))
                    }
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Key Differentiators */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">{t('keyDifferentiators')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differentiators.map((item) => (
              <motion.div 
                key={item.id}
                variants={itemVariants}
                className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-green-500/30 transition-colors"
              >
                <h4 className="text-xl font-semibold text-green-400 mb-3">{item.title}</h4>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <a 
              href="#" 
              className="inline-flex items-center px-6 py-3 rounded-full bg-green-500 text-black font-medium hover:bg-green-400 transition-colors"
            >
              {t('ctaText')}
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetitiveAdvantage;
