import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAudioControlFaqs } from '@/data/audioControlData';
import { useTranslations } from 'next-intl';

interface FAQSectionProps {
  translations: {
    title: string;
    description: string;
  };
}

export const FAQSection: React.FC<FAQSectionProps> = ({ translations }) => {
  const faqs = useAudioControlFaqs();
  const t = useTranslations('audioControl');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Toggle FAQ expansion
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">{translations.title}</h2>
          <p className="text-gray-300">
            {translations.description}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <h3 className="font-medium text-lg text-white pr-8">
                  {faq.question}
                </h3>
                <div className="bg-gray-800 rounded-full p-1.5 flex-shrink-0">
                  {expandedFaq === index ? (
                    <ChevronUp size={20} className="text-green-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-300 border-t border-gray-800 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-300 mb-4">Still have questions?</p>
          <a 
            href="/contact" 
            className="inline-flex bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 