import React, { useState } from 'react';
import { UseCaseType } from '@/data/useCasesData';
import TabSelector from './TabSelector';
import OverviewTab from './tabs/OverviewTab';
import HowToTab from './tabs/HowToTab';
import BeforeAfterTab from './tabs/BeforeAfterTab';
import { AnimatePresence, motion } from 'framer-motion';

interface UseCaseDetailProps {
  useCase: UseCaseType;
}

export const UseCaseDetail: React.FC<UseCaseDetailProps> = ({ useCase }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const hasBeforeAfterAudio = !!useCase.beforeAfterAudio;

  return (
    <div className="bg-black border border-gray-800 rounded-xl p-6 md:p-8 shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center text-white mb-3">{useCase.title}</h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto">{useCase.description}</p>
      </div>

      <TabSelector 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        hasBeforeAfterAudio={hasBeforeAfterAudio} 
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          {activeTab === 'overview' && <OverviewTab useCase={useCase} />}
          {activeTab === 'how-to' && <HowToTab useCase={useCase} />}
          {activeTab === 'before-after' && <BeforeAfterTab useCase={useCase} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default UseCaseDetail; 