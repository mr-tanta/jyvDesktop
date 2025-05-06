'use client';
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Wand2, Download } from "lucide-react";

const HeroSection = ({heroRef, isHeroInView, fadeInUpVariant}: {heroRef: React.RefObject<HTMLElement>, isHeroInView: boolean, fadeInUpVariant: any}) => {
    const t = useTranslations('audioEnhancement');
    return (
        
        <section className="relative py-24 overflow-hidden" ref={heroRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              variants={fadeInUpVariant}
              className="max-w-3xl mx-auto text-center"
          >
            <div
                className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-green-400 font-medium">{t('hero.badge')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              {t('hero.title')}
            </h1>

            <p className="text-lg text-gray-300 mb-12">
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                  href="#interactive-demo"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <Wand2 size={20}/>
                <span>{t('hero.demoButton')}</span>
              </a>

              <Link
                  href="/download"
                  className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Download size={20}/>
                <span>{t('hero.downloadButton')}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    )
}

export default HeroSection;