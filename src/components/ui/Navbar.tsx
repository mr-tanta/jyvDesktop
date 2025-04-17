'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown, FiGlobe } from 'react-icons/fi';
import { FaHeadphones, FaLaptop, FaGamepad, FaMusic, FaVideo } from 'react-icons/fa';
import { DownloadCloudIcon } from 'lucide-react';

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

// Feature categories for mega menu
const featureCategories = [
  {
    name: 'Audio Control',
    icon: <FaHeadphones className="text-emerald-500 text-xl mr-2" />,
    features: [
      { name: 'Volume Normalization', description: 'Consistent audio levels across applications', href: '/audio-control#volume' },
      { name: 'Device Management', description: 'Manage multiple input and output devices', href: '/audio-control#devices' },
      { name: 'Audio Routing', description: 'Route different apps to different devices', href: '/audio-control#routing' },
    ]
  },
  {
    name: 'Audio Enhancement',
    icon: <FaMusic className="text-emerald-500 text-xl mr-2" />,
    features: [
      { name: 'Voice Clarity', description: 'Crystal clear voice for meetings and streams', href: '/audio-enhancement#voice' },
      { name: 'Noise Suppression', description: 'Remove background noise and distractions', href: '/audio-enhancement#noise' },
      { name: 'Equalizer', description: 'Fine-tune your audio experience', href: '/audio-enhancement#eq' },
    ]
  },
  {
    name: 'Spatial Audio',
    icon: <FaGamepad className="text-emerald-500 text-xl mr-2" />,
    features: [
      { name: '3D Positional Audio', description: 'Hear sounds from exact locations', href: '/spatial-audio#positional' },
      { name: 'Immersive Music', description: 'Experience music in 360° soundscapes', href: '/spatial-audio#music' },
      { name: 'Custom HRTF', description: 'Personalized sound profiles for your ears', href: '/spatial-audio#hrtf' },
    ]
  },
  {
    name: 'Advanced Features',
    icon: <FaLaptop className="text-emerald-500 text-xl mr-2" />,
    features: [
      { name: 'Voice Changer', description: 'Real-time voice effects and transformations', href: '#voice-changer' },
      { name: 'Auto Ducking', description: 'Automatically lower music when speaking', href: '#ducking' },
      { name: 'Audio Recording', description: 'High-quality multi-track recording', href: '#recording' },
    ]
  },
];

export default function Navbar() {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
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
  
  // Set selected language
  const changeLanguage = (language: typeof languages[0]) => {
    setCurrentLanguage(language);
    setShowLanguageMenu(false);
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
            {navigation.map((item) => (
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
                
                {/* Mega Menu for Features */}
                {item.hasMegaMenu && (
                  <AnimatePresence>
                    {showMegaMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-screen max-w-7xl bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                        style={{ width: 'calc(100vw - 4rem)', maxWidth: '1000px' }}
                      >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                          {featureCategories.map((category) => (
                            <div key={category.name} className="p-6 hover:bg-white/5 transition-colors">
                              <div className="flex items-center mb-4 font-medium text-green-400">
                                {category.icon}
                                {category.name}
                              </div>
                              <ul className="space-y-4">
                                {category.features.map((feature) => (
                                  <li key={feature.name}>
                                    <Link 
                                      href={feature.href}
                                      className="block group"
                                      onClick={() => setShowMegaMenu(false)}
                                    >
                                      <span className="block text-white group-hover:text-green-400 transition-colors">
                                        {feature.name}
                                      </span>
                                      <span className="block text-sm text-gray-400">
                                        {feature.description}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 px-6 py-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-white font-medium">Want to experience all features?</h3>
                              <p className="text-gray-300 text-sm">Download JyvDesktop today and transform your audio experience</p>
                            </div>
                            <Link 
                              href="/download" 
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2"
                            >
                              <DownloadCloudIcon size={16} />
                              Download Now
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              Download JyvStream Desktop
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
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.hasMegaMenu ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{item.name}</span>
                        </div>
                        <div className="pl-4 border-l border-white/10 space-y-6">
                          {featureCategories.map((category) => (
                            <div key={category.name} className="space-y-2">
                              <div className="flex items-center text-green-400 font-medium">
                                {category.icon}
                                {category.name}
                              </div>
                              <ul className="space-y-4 pl-6">
                                {category.features.map((feature) => (
                                  <li key={feature.name}>
                                    <Link 
                                      href={feature.href}
                                      className="block"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      <span className="block text-white">{feature.name}</span>
                                      <span className="block text-sm text-gray-400">{feature.description}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
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
                    Contact Sales
                  </Link>
                  
                  <Link 
                    href="/download"
                    className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all text-center shadow-lg shadow-green-500/20 flex items-center justify-center space-x-2"
                  >
                    <DownloadCloudIcon size={18} />
                    <span>Download Now</span>
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