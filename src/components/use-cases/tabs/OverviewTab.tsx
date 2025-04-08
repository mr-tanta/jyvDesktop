import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UseCaseType } from '@/data/useCasesData';
import { ExternalLink, Check } from 'lucide-react';

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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <motion.div className="space-y-4" variants={staggerContainer}>
            <motion.h3 variants={itemFadeIn} className="text-2xl font-bold text-white">About this use case</motion.h3>
            <motion.p variants={itemFadeIn} className="text-gray-300 leading-relaxed">{useCase.description}</motion.p>
          </motion.div>
          
          <motion.div className="mt-6" variants={staggerContainer}>
            <motion.h4 variants={itemFadeIn} className="text-lg font-semibold text-white mb-4">Key Features</motion.h4>
            <motion.ul className="grid grid-cols-1 md:grid-cols-2 gap-3" variants={staggerContainer}>
              {useCase.features.map((feature, index) => (
                <motion.li key={index} className="flex items-start gap-3" variants={itemFadeIn}>
                  <span className="flex-shrink-0 h-6 w-6 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full flex items-center justify-center mt-0.5">
                    <Check size={12} className="text-white" />
                  </span>
                  <span className="text-gray-300">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          <motion.blockquote 
            variants={itemFadeIn}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gradient-to-tr from-green-900/20 to-emerald-900/20 border-l-4 border-green-500 p-5 rounded-r-lg mt-8 shadow-md"
          >
            <p className="text-gray-300 italic">"{useCase.quote.text}"</p>
            <footer className="mt-3">
              <cite className="not-italic font-medium text-white">
                {useCase.quote.author}, <span className="text-gray-400">{useCase.quote.role}</span>
              </cite>
            </footer>
          </motion.blockquote>
        </div>
        
        <div className="space-y-8">
          <motion.div 
            className="rounded-xl overflow-hidden shadow-xl bg-gray-900/50 border border-gray-800"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative h-72 w-full">
              <Image 
                src={useCase.image} 
                alt={useCase.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2">
                  <span className="h-8 w-8 flex items-center justify-center bg-green-500 rounded-full">
                    {useCase.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{useCase.title}</h3>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {useCase.statistics.map((stat, index) => (
              <motion.div 
                key={index} 
                variants={itemFadeIn}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="p-4 bg-gray-900/70 backdrop-blur border border-gray-800 rounded-lg shadow-md text-center"
              >
                <span className="block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-400">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {(useCase.compatibleApps || useCase.compatibleGames) && (
            <motion.div 
              variants={itemFadeIn}
              className="bg-gray-900/70 backdrop-blur border border-gray-800 rounded-lg shadow-md p-5 mt-6"
            >
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                Compatible {useCase.compatibleGames ? 'Games' : 'Applications'}
                <span className="ml-2 text-xs font-normal bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                  {(useCase.compatibleApps || useCase.compatibleGames)?.length} Total
                </span>
              </h4>
              <div className="flex flex-wrap gap-4">
                {(useCase.compatibleApps || useCase.compatibleGames)?.map((app, index) => (
                  <motion.div 
                    key={index} 
                    className="flex flex-col items-center"
                    whileHover={{ y: -3, scale: 1.05 }}
                  >
                    <div className="relative h-14 w-14 mb-2 bg-gray-800 p-2 rounded-full shadow-md">
                      <Image 
                        src={app.logo} 
                        alt={app.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <span className="text-xs text-gray-400">{app.name}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800">
                <a href="#" className="text-sm text-green-400 hover:text-green-300 flex items-center justify-end">
                  View all compatible apps
                  <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OverviewTab; 