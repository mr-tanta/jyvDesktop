import React from 'react';
import { Info, ListChecks, ArrowLeftRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface TabSelectorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hasBeforeAfterAudio: boolean;
}

export const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, setActiveTab, hasBeforeAfterAudio }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Info size={18} /> },
    { id: 'how-to', label: 'How To', icon: <ListChecks size={18} /> },
    ...(hasBeforeAfterAudio ? [{ id: 'before-after', label: 'Before & After', icon: <ArrowLeftRight size={18} /> }] : [])
  ];

  return (
    <div className="flex justify-center">
      <div className="inline-flex rounded-lg p-1 bg-gray-800/70 backdrop-blur shadow-inner">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`
              relative flex items-center px-6 py-3 rounded-md text-sm font-medium transition-all duration-200
              ${activeTab === tab.id
                ? 'bg-gray-900 text-green-400 shadow-sm'
                : 'text-gray-400 hover:text-gray-200'}
            `}
          >
            <span className={`mr-2.5 ${activeTab === tab.id ? 'text-green-500' : 'text-gray-500'}`}>
              {tab.icon}
            </span>
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600"
                initial={false}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TabSelector; 