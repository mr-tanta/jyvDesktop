import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UseCaseType } from '@/data/useCasesData';

interface OverviewTabProps {
  useCase: UseCaseType;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export const OverviewTab: React.FC<OverviewTabProps> = ({ useCase }) => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="space-y-8 py-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">About this use case</h3>
          <p className="text-gray-300 leading-relaxed">{useCase.description}</p>
          
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {useCase.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 h-6 w-6 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full flex items-center justify-center mt-0.5">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="12" 
                      height="12" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#ffffff" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <blockquote className="bg-gradient-to-tr from-green-900/20 to-emerald-900/20 border-l-4 border-green-500 p-4 rounded-r-lg mt-8">
            <p className="text-gray-300 italic">"{useCase.quote.text}"</p>
            <footer className="mt-2">
              <cite className="not-italic font-medium text-white">
                {useCase.quote.author}, <span className="text-gray-400">{useCase.quote.role}</span>
              </cite>
            </footer>
          </blockquote>
        </div>
        
        <div className="space-y-8">
          <div className="rounded-xl overflow-hidden shadow-lg bg-gray-900 border border-gray-800">
            <div className="relative h-64 w-full">
              <Image 
                src={useCase.image} 
                alt={useCase.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {useCase.statistics.map((stat, index) => (
              <div key={index} className="p-4 bg-gray-900 border border-gray-800 rounded-lg shadow text-center">
                <span className="block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
          
          {(useCase.compatibleApps || useCase.compatibleGames) && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg shadow p-5 mt-6">
              <h4 className="text-lg font-semibold text-white mb-4">
                Compatible {useCase.compatibleGames ? 'Games' : 'Applications'}
              </h4>
              <div className="flex flex-wrap gap-4">
                {(useCase.compatibleApps || useCase.compatibleGames)?.map((app, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative h-12 w-12 mb-2 bg-gray-800 p-2 rounded-full">
                      <Image 
                        src={app.logo} 
                        alt={app.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <span className="text-xs text-gray-400">{app.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OverviewTab; 