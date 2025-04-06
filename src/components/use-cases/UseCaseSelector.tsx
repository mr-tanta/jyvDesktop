import React from 'react';
import { motion } from 'framer-motion';
import { UseCaseType } from '@/data/useCasesData';

interface UseCaseSelectorProps {
  useCases: UseCaseType[];
  activeUseCaseIndex: number;
  setActiveUseCaseIndex: (index: number) => void;
}

export const UseCaseSelector: React.FC<UseCaseSelectorProps> = ({ 
  useCases, 
  activeUseCaseIndex, 
  setActiveUseCaseIndex 
}) => {
  return (
    <div className="mb-8">
      <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-3 px-4 md:px-0 md:justify-center">
        {useCases.map((useCase, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveUseCaseIndex(index)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className={`
              flex-shrink-0 max-w-xs h-24 px-5 rounded-xl shadow-sm flex items-center gap-3 border transition-all duration-200
              ${activeUseCaseIndex === index 
                ? 'border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10' 
                : 'border-gray-800 bg-gray-900 hover:border-green-500/20'}
            `}
          >
            <div className={`
              flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center
              ${activeUseCaseIndex === index 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                : 'bg-gray-800 text-green-500'}
            `}>
              {useCase.icon}
            </div>
            <div className="text-left">
              <h3 className={`font-semibold leading-snug ${activeUseCaseIndex === index ? 'text-green-400' : 'text-white'}`}>
                {useCase.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                {useCase.features.join(' • ')}
              </p>
            </div>
            {activeUseCaseIndex === index && (
              <motion.div
                layoutId="useCaseIndicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-b-xl"
                initial={false}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default UseCaseSelector; 