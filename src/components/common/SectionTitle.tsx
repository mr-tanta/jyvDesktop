import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  description?: string;
  badge?: {
    text: string;
    icon?: ReactNode;
  };
  className?: string;
}

export const sectionVariants = {
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

const SectionTitle = ({ title, description, badge, className = '' }: SectionTitleProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className={`text-center mb-16 ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 backdrop-blur-sm rounded-full">
          {badge.icon ? (
            <span className="mr-2">{badge.icon}</span>
          ) : (
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
          )}
          <span className="text-sm text-emerald-400 font-medium">{badge.text}</span>
        </div>
      )}
      
      <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
      
      {description && (
        <p className="text-gray-400 max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle; 