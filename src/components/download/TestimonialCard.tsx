import { Testimonial } from '@/data/downloadData';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaWindows, FaApple, FaChrome } from 'react-icons/fa';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl p-8 relative"
    >
      {/* Platform badge */}
      <div className="absolute top-6 right-6 py-1 px-3 bg-gray-800 rounded-full border border-gray-700">
        <div className="flex items-center gap-1.5">
          {testimonial.platform === 'macOS' && <FaApple size={12} className="text-gray-400" />}
          {testimonial.platform === 'Windows' && <FaWindows size={12} className="text-gray-400" />}
          {testimonial.platform === 'Chromebook' && <FaChrome size={12} className="text-gray-400" />}
          <span className="text-xs text-gray-400">{testimonial.platform}</span>
        </div>
      </div>
      
      {/* Quote indicator */}
      <div className="text-green-500 opacity-30 mb-4">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.33333 21.3333C11.9107 21.3333 14 19.244 14 16.6667C14 14.0893 11.9107 12 9.33333 12C6.75596 12 4.66667 14.0893 4.66667 16.6667L4.66667 18.6667C4.66667 23.8213 8.84536 28 14 28V25.3333C10.3181 25.3333 7.33333 22.3486 7.33333 18.6667V16.6667C7.33333 15.5621 8.22876 14.6667 9.33333 14.6667C10.4379 14.6667 11.3333 15.5621 11.3333 16.6667C11.3333 17.7712 10.4379 18.6667 9.33333 18.6667V21.3333ZM22.6667 21.3333C25.244 21.3333 27.3333 19.244 27.3333 16.6667C27.3333 14.0893 25.244 12 22.6667 12C20.0893 12 18 14.0893 18 16.6667L18 18.6667C18 23.8213 22.1787 28 27.3333 28V25.3333C23.6514 25.3333 20.6667 22.3486 20.6667 18.6667V16.6667C20.6667 15.5621 21.5621 14.6667 22.6667 14.6667C23.7712 14.6667 24.6667 15.5621 24.6667 16.6667C24.6667 17.7712 23.7712 18.6667 22.6667 18.6667V21.3333Z" fill="currentColor"/>
        </svg>
      </div>
      
      <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>
      
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-800 mr-3 relative overflow-hidden">
          {testimonial.avatar && (
            <Image 
              src={testimonial.avatar} 
              alt={testimonial.author} 
              fill 
              className="object-cover"
            />
          )}
        </div>
        <div>
          <h4 className="font-bold text-white">{testimonial.author}</h4>
          <p className="text-xs text-gray-400">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard; 