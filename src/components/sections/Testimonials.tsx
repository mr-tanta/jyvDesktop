'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function TestimonialCarousel() {
  const t = useTranslations('testimonials');
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Testimonial data with translations
  const testimonials = [
    {
      id: 1,
      name: t('people.sarah.name'),
      role: t('people.sarah.role'),
      company: t('people.sarah.company'),
      image: "/testimonials/sarah.jpg",
      quote: t('people.sarah.quote'),
      rating: 5
    },
    {
      id: 2,
      name: t('people.michael.name'),
      role: t('people.michael.role'),
      company: t('people.michael.company'),
      image: "/testimonials/michael.jpg",
      quote: t('people.michael.quote'),
      rating: 5
    },
    {
      id: 3,
      name: t('people.emily.name'),
      role: t('people.emily.role'),
      company: t('people.emily.company'),
      image: "/testimonials/emily.jpg",
      quote: t('people.emily.quote'),
      rating: 5
    },
    {
      id: 4,
      name: t('people.david.name'),
      role: t('people.david.role'),
      company: t('people.david.company'),
      image: "/testimonials/david.jpg",
      quote: t('people.david.quote'),
      rating: 4
    },
    {
      id: 5,
      name: t('people.aisha.name'),
      role: t('people.aisha.role'),
      company: t('people.aisha.company'),
      image: "/testimonials/aisha.jpg",
      quote: t('people.aisha.quote'),
      rating: 5
    }
  ];
  
  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);
  
  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);
  
  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);
  
  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);
  
  return (
    <section id="testimonials" className="py-24 bg-black relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-emerald-500/10 rounded-full blur-[80px]"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-green-500/10 px-4 py-2 rounded-full mb-4 border border-green-500/30"
          >
            <span className="text-green-400 text-sm font-medium">{t('subtitle')}</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {t('title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            {t('description')}
          </motion.p>
        </div>
        
        {/* Testimonial Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-10">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-green-500/20 hover:border-green-500/30 transition-colors"
              aria-label={t('prevButton')}
            >
              <FiChevronLeft className="text-xl" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-10">
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-green-500/20 hover:border-green-500/30 transition-colors"
              aria-label={t('nextButton')}
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
          
          {/* Testimonial Cards */}
          <div className="overflow-hidden relative">
            <div className="flex items-center justify-center">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-gradient-to-br from-black/80 to-green-900/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-green-500/30 relative">
                      {/* Placeholder for image - in production, use real images */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-600/30"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                        {testimonials[activeIndex].name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={`${i < testimonials[activeIndex].rating ? 'text-green-400 fill-green-400' : 'text-gray-600'} w-5 h-5`} 
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-xl md:text-2xl text-white italic mb-6 leading-relaxed">
                      "{testimonials[activeIndex].quote}"
                    </blockquote>
                    
                    <div>
                      <h4 className="text-lg font-bold text-white">{testimonials[activeIndex].name}</h4>
                      <p className="text-green-400">{testimonials[activeIndex].role}</p>
                      <p className="text-gray-400 text-sm">{testimonials[activeIndex].company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-green-500 w-8' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={t('goToTestimonial', { number: index + 1 })}
              />
            ))}
          </div>
        </div>
        
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 text-center"
        >
          <div>
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">{t('stats.activeUsers.value')}</div>
            <p className="text-gray-400">{t('stats.activeUsers.label')}</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">{t('stats.averageRating.value')}</div>
            <p className="text-gray-400">{t('stats.averageRating.label')}</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">{t('stats.hoursProcessed.value')}</div>
            <p className="text-gray-400">{t('stats.hoursProcessed.label')}</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">{t('stats.satisfactionRate.value')}</div>
            <p className="text-gray-400">{t('stats.satisfactionRate.label')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}