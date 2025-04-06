'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { FaHeadphones, FaLaptop, FaGamepad, FaMusic, FaVideo } from 'react-icons/fa';
import { DownloadCloudIcon } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Main navigation items
const navigation = [
  { name: 'Features', href: '#features' },
  { 
    name: 'Products', 
    href: '#products',
    hasMegaMenu: true 
  },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Use Cases', href: '#use-cases' },
  { name: 'Blog', href: '#blog' },
];

// Product categories for mega menu
const productCategories = [
  {
    name: 'For Remote Workers',
    icon: <FaLaptop className="text-emerald-500 text-xl mr-2" />,
    products: [
      { name: 'JyvDesktop Pro', description: 'Complete audio solution for professionals' },
      { name: 'Meeting Enhancer', description: 'Crystal clear conference calls' },
    ]
  },
  {
    name: 'For Gamers',
    icon: <FaGamepad className="text-emerald-500 text-xl mr-2" />,
    products: [
      { name: 'JyvDesktop Gaming', description: '3D audio with minimal latency' },
      { name: 'Voice Changer Pro', description: 'Real-time voice effects' },
    ]
  },
  {
    name: 'For Content Creators',
    icon: <FaVideo className="text-emerald-500 text-xl mr-2" />,
    products: [
      { name: 'Studio Suite', description: 'Broadcast-quality audio processing' },
      { name: 'Podcast Master', description: 'One-click podcast optimization' },
    ]
  },
  {
    name: 'For Music Listeners',
    icon: <FaMusic className="text-emerald-500 text-xl mr-2" />,
    products: [
      { name: 'JyvDesktop Acoustics', description: 'Enhanced music playback' },
      { name: 'Spatial Audio Pro', description: 'Immersive 360° sound' },
    ]
  },
];

interface NavbarProps {
  locale?: string;
}

export default function Navbar({ locale = 'en' }: NavbarProps) {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Refs for dropdown menus
  const megaMenuRef = useRef<HTMLDivElement>(null);
  
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
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll to section function
  const scrollToSection = (href: string) => {
    setIsOpen(false);
    setShowMegaMenu(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
          <Link href={`/${locale}`} className="flex items-center space-x-2 relative z-20">
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
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="px-4 py-2 text-gray-300 hover:text-white hover:text-green-400 transition-colors"
                  >
                    {item.name}
                  </button>
                )}
                
                {/* Mega Menu for Products */}
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
                          {productCategories.map((category) => (
                            <div key={category.name} className="p-6 hover:bg-white/5 transition-colors">
                              <div className="flex items-center mb-4 font-medium text-green-400">
                                {category.icon}
                                {category.name}
                              </div>
                              <ul className="space-y-4">
                                {category.products.map((product) => (
                                  <li key={product.name}>
                                    <Link 
                                      href="#" 
                                      className="block group"
                                      onClick={() => setShowMegaMenu(false)}
                                    >
                                      <span className="block text-white group-hover:text-green-400 transition-colors">
                                        {product.name}
                                      </span>
                                      <span className="block text-sm text-gray-400">
                                        {product.description}
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
                              <h3 className="text-white font-medium">Need Help Finding the Right Product?</h3>
                              <p className="text-gray-300 text-sm">Our team can guide you to the perfect solution</p>
                            </div>
                            <Link 
                              href="#contact" 
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                            >
                              Contact Sales
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
            {/* Language Switcher */}
            <LanguageSwitcher locale={locale} />
            
            {/* Contact Sales Button */}
            <Link 
              href="#contact"
              className="text-white hover:text-green-400 transition-colors py-2"
            >
              Contact Sales
            </Link>
            
            {/* Download Button */}
            <Link 
              href={`/${locale}/download`}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 shadow-lg shadow-green-500/20"
            >
              <DownloadCloudIcon size={18} />
              <span>Download</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            {/* Language Switcher (Mobile) */}
            <LanguageSwitcher locale={locale} />
            
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
                          {productCategories.map((category) => (
                            <div key={category.name} className="space-y-2">
                              <div className="flex items-center text-green-400 font-medium">
                                {category.icon}
                                {category.name}
                              </div>
                              <ul className="space-y-4 pl-6">
                                {category.products.map((product) => (
                                  <li key={product.name}>
                                    <Link 
                                      href="#" 
                                      className="block"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      <span className="block text-white">{product.name}</span>
                                      <span className="block text-sm text-gray-400">{product.description}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className="block w-full text-left text-gray-300 hover:text-green-400 transition-colors py-2"
                      >
                        {item.name}
                      </button>
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
                    href={`/${locale}/download`}
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