import React from 'react';
import { motion } from 'framer-motion';
import { UseCaseType } from '@/data/useCasesData';

interface HowToTabProps {
  useCase: UseCaseType;
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const HowToTab: React.FC<HowToTabProps> = ({ useCase }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="py-6 max-w-3xl mx-auto"
    >
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-white mb-3">
          How to set up {useCase.title}
        </h3>
        <p className="text-gray-400">
          Follow these simple steps to optimize JyvDesktop for this use case
        </p>
      </div>

      <div className="space-y-6">
        {useCase.steps.map((step, index) => (
          <motion.div
            key={index}
            variants={item}
            className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-lg p-5 shadow-sm"
          >
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
              {index + 1}
            </div>
            <div>
              <p className="text-gray-300">{step}</p>
              
              {index === 0 && (
                <div className="mt-4 grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-sm text-gray-400">Recommended setting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="text-sm text-gray-400">Alternative option for older systems</span>
                  </div>
                </div>
              )}
              
              {index === 1 && (
                <div className="mt-3 p-3 bg-gray-800 rounded border border-gray-700 text-sm text-gray-400">
                  <p className="font-medium text-white">Pro tip:</p>
                  <p>Every voice and microphone is unique. Take a few minutes to test different 
                  settings to find what works best for your specific setup.</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-5 rounded-lg border border-green-700/30">
        <h4 className="font-semibold text-white mb-2">Need more help?</h4>
        <p className="text-gray-300">Check out our detailed guides and video tutorials in the 
        <a href="#" className="text-green-400 font-medium hover:text-green-300 transition-colors"> Help Center</a>, 
        or <a href="#" className="text-green-400 font-medium hover:text-green-300 transition-colors">contact our support team</a> for personalized assistance.</p>
      </div>
    </motion.div>
  );
};

export default HowToTab; 