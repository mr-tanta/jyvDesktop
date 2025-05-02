'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiGlobe } from 'react-icons/fi';
import { FaHeadphones, FaLaptop, FaGamepad, FaMusic, FaVideo } from 'react-icons/fa';
import { DownloadCloudIcon } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

// Import feature data
import { spatialAudioFeatures } from '../../data/spatialAudioData';
import { audioControlFeatures } from '../../data/audioControlData';
import intlConfig from '../../../next-intl.config.js';

// Language options
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
];

// Feature categories for simple dropdown menu
const getFeatureCategories = (t: any) => [
  {
    name: t('featureCategories.audioControl'),
    href: '/audio-control',
    icon: audioControlFeatures[0].icon
  },
  {
    name: t('featureCategories.audioEnhancement'),
    href: '/audio-enhancement',
    icon: audioControlFeatures[3].icon
  },
  {
    name: t('featureCategories.spatialAudio'),
    href: '/spatial-audio',
    icon: spatialAudioFeatures[0].icon
  },
  {
    name: t('featureCategories.advancedFeatures'),
    href: '/advanced-features',
    icon: spatialAudioFeatures[6].icon
  }
];

// Main navigation items
const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'Features', 
    href: '#features',
    hasMegaMenu: true 
  },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Use Cases', href: '/use-cases' },
  { name: 'Blog', href: '/blog' },
];

export default function Navbar() {
  // Get translations and locale
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  // Create localized navigation items
  const localizedNavigation = [
    { name: t('nav.home'), href: '/' },
    { 
      name: t('nav.features'), 
      href: '#features',
      hasMegaMenu: true 
    },
    { name: t('nav.pricing'), href: '/pricing' },
    { name: t('nav.useCases'), href: '/use-cases' },
    { name: t('nav.blog'), href: '/blog' },
  ];

  // States
  const [isOpen, setIsOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languages.find(lang => lang.code === locale) || languages[0]);
  const [isScrolled, setIsScrolled] = useState(false);

  // Refs for dropdown menus
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setShowMegaMenu(false);
      }
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll to section function
  const scrollToSection = (href: string) => {
    setIsOpen(false);
    setShowMegaMenu(false);

    // Only use querySelector for anchor links that start with #
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // For regular page links, use Next.js router or let the Link component handle it
      window.location.href = href;
    }
  };

  // Set selected language and change locale
  const changeLanguage = (language: typeof languages[0]) => {
    setCurrentLanguage(language);
    setShowLanguageMenu(false);

    // Get the path without the locale prefix
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

    // Navigate to the same page with the new locale
    router.push(`/${language.code}${pathWithoutLocale}`);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-lg py-2 shadow-lg shadow-black/20' 
          : 'bg-black/70 backdrop-blur-md py-4'
      } border-b border-white/10`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 relative z-20">
            <Image src="/logo.svg" alt="JyvStream Logo" width={122} height={62} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {localizedNavigation.map((item) => (
              <div key={item.name} className="relative group" ref={item.hasMegaMenu ? megaMenuRef : null}>
                {item.hasMegaMenu ? (
                  <button
                    onClick={() => setShowMegaMenu(!showMegaMenu)}
                    className="flex items-center px-4 py-2 text-gray-300 hover:text-white group-hover:text-green-400 transition-colors"
                  >
                    {item.name}
                    <FiChevronDown className={`ml-2 transition-transform ${showMegaMenu ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  item.href.startsWith('#') ? (
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="px-4 py-2 text-gray-300 hover:text-white hover:text-green-400 transition-colors"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-4 py-2 text-gray-300 hover:text-white hover:text-green-400 transition-colors block"
                    >
                      {item.name}
                    </Link>
                  )
                )}

                {/* Simple Dropdown Menu for Features */}
                {item.hasMegaMenu && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 z-50">
                    {showMegaMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                      >
                        <div className="py-2 w-48">
                          {getFeatureCategories(t).map((category) => (
                            <Link 
                              key={category.name} 
                              href={category.href}
                              className="flex items-center px-4 py-2 text-gray-300 hover:bg-white/5 hover:text-green-400 transition-colors"
                              onClick={() => setShowMegaMenu(false)}
                            >
                              <span className="mr-2 text-green-400">{category.icon}</span>
                              <span>{category.name}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative" ref={languageMenuRef}>
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white"
              >
                <span>{currentLanguage.flag}</span>
                <span>{currentLanguage.name}</span>
                <FiChevronDown className={`transition-transform ${showLanguageMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Language dropdown */}
              <AnimatePresence>
                {showLanguageMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                  >
                    <div className="py-1">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          className={`flex items-center w-full px-4 py-2 text-sm hover:bg-white/5 transition-colors ${
                            currentLanguage.code === language.code ? 'text-green-400' : 'text-gray-300'
                          }`}
                          onClick={() => changeLanguage(language)}
                        >
                          <span className="mr-2">{language.flag}</span>
                          <span>{language.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Get Started button */}
            <Link
              href="/download"
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/20 transition transform hover:scale-105 flex items-center gap-2"
            >
              <DownloadCloudIcon size={16} />
              {t('nav.download')} JyvStream Desktop
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            {/* Language Selector (Mobile) */}
            <div className="relative" ref={languageMenuRef}>
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center text-gray-300 hover:text-white"
              >
                <span>{currentLanguage.flag}</span>
              </button>

              <AnimatePresence>
                {showLanguageMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-2xl z-50"
                  >
                    <div className="py-2">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => changeLanguage(language)}
                          className={`flex items-center w-full px-4 py-2 text-left ${
                            currentLanguage.code === language.code
                              ? 'bg-green-500/20 text-green-400'
                              : 'hover:bg-white/5 text-gray-300 hover:text-white'
                          }`}
                        >
                          <span className="mr-3">{language.flag}</span>
                          <span>{language.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 border-b border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-4">
                {localizedNavigation.map((item) => (
                  <div key={item.name}>
                    {item.hasMegaMenu ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{item.name}</span>
                        </div>
                        <div className="pl-4 border-l border-white/10 space-y-6">
                          {getFeatureCategories(t).map((category) => (
                            <div key={category.name} className="py-2">
                              <Link 
                                href={category.href}
                                className="flex items-center text-gray-300 hover:text-green-400"
                                onClick={() => setIsOpen(false)}
                              >
                                <span className="mr-2 text-green-400">{category.icon}</span>
                                <span>{category.name}</span>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      item.href.startsWith('#') ? (
                        <button
                          onClick={() => scrollToSection(item.href)}
                          className="block w-full text-left text-gray-300 hover:text-green-400 transition-colors py-2"
                        >
                          {item.name}
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className="block w-full text-left text-gray-300 hover:text-green-400 transition-colors py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )
                    )}
                  </div>
                ))}

                {/* Mobile action buttons */}
                <div className="pt-4 space-y-3">
                  <Link 
                    href="#contact"
                    className="block w-full text-left text-gray-300 hover:text-green-400 transition-colors py-2"
                  >
                    {t('nav.contactSales')}
                  </Link>

                  <Link 
                    href="/download"
                    className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all text-center shadow-lg shadow-green-500/20 flex items-center justify-center space-x-2"
                  >
                    <DownloadCloudIcon size={18} />
                    <span>{t('cta.downloadNow')}</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 
