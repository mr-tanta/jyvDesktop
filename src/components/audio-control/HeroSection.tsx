'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import { Sliders, Download } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface HeroSectionProps {
  scrollToDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollToDemo }) => {
  // Get translations for the hero section
  const t = useTranslations('hero');
  const locale = useLocale();
  
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: false });

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

  return (
    <section className="relative py-24 overflow-hidden" ref={heroRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
          variants={fadeInUpVariant}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-green-400 font-medium">{t('badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            {t('title')}
          </h1>

          <p className="text-lg text-gray-300 mb-12">
            {t('description')}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={scrollToDemo}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <Sliders size={20} />
              <span>{t('demoButton')}</span>
            </button>

            <Link
              href={`/${locale}/download`}
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Download size={20} />
              <span>{t('downloadButton')}</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 