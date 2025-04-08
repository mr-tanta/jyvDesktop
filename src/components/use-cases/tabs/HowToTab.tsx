import React from 'react';
import { motion } from 'framer-motion';
import { UseCaseType } from '@/data/useCasesData';
import { LightbulbIcon, AlertCircle, DownloadCloud } from 'lucide-react';

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
        <motion.h3 variants={item} className="text-2xl font-bold text-white mb-3">
          How to set up {useCase.title}
        </motion.h3>
        <motion.p variants={item} className="text-gray-400">
          Follow these simple steps to optimize JyvDesktop for this use case
        </motion.p>
      </div>

      <div className="space-y-6">
        {useCase.steps.map((step, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.01, y: -2 }}
            className="flex items-start gap-4 bg-gradient-to-r from-gray-900 to-gray-900/70 backdrop-blur border border-gray-800 rounded-lg p-5 shadow-md"
          >
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {index + 1}
            </div>
            <div className="flex-1">
              <p className="text-gray-300">{step}</p>
              
              {index === 0 && (
                <div className="mt-4 grid grid-cols-1 gap-2 border-l-2 border-green-500/50 pl-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-sm text-gray-300">Recommended setting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="text-sm text-gray-300">Alternative option for older systems</span>
                  </div>
                </div>
              )}
              
              {index === 1 && (
                <div className="mt-3 p-4 bg-green-900/20 rounded-lg border border-green-700/30 flex gap-3 items-start">
                  <LightbulbIcon size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-400 mb-1">Pro tip:</p>
                    <p className="text-sm text-gray-300">Every voice and microphone is unique. Take a few minutes to test different 
                    settings to find what works best for your specific setup.</p>
                  </div>
                </div>
              )}
              
              {index === useCase.steps.length - 1 && (
                <div className="mt-3 flex items-center justify-end gap-2">
                  <span className="text-xs text-gray-400">Estimated setup time: 5 mins</span>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={item} className="mt-10 bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-6 rounded-lg border border-green-700/30 shadow-md">
        <div className="flex items-start gap-4">
          <AlertCircle size={22} className="text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-white mb-2">Need more help?</h4>
            <p className="text-gray-300">Check out our detailed guides and video tutorials in the 
            <a href="#" className="text-green-400 font-medium hover:text-green-300 transition-colors"> Help Center</a>, 
            or <a href="#" className="text-green-400 font-medium hover:text-green-300 transition-colors">contact our support team</a> for personalized assistance.</p>
            
            <div className="mt-5 flex justify-end">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md"
              >
                <DownloadCloud size={16} />
                Download setup guide PDF
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HowToTab; 