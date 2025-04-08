import { FAQ } from '@/data/downloadData';
import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import FAQItem from './FAQItem';

interface FAQSectionProps {
  faqs: FAQ[];
}

const FAQSection = ({ faqs }: FAQSectionProps) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  
  return (
    <section className="py-24 relative" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <SectionTitle
          title="Frequently Asked Questions"
          description="Still have questions about JyvDesktop? Check out these commonly asked questions or reach out to our support team."
        />
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              faq={faq} 
              index={index} 
              isExpanded={expandedFaq === index}
              toggleExpand={toggleFaq}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">Still have questions? We're here to help.</p>
          <Link
            href="/support"
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors text-white px-6 py-3 rounded-xl"
          >
            <HelpCircle size={18} />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 