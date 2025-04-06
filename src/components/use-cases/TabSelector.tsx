import React from 'react';
import { Info, ListChecks, ArrowLeftRight } from 'lucide-react';

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
      <div className="inline-flex rounded-lg p-1 bg-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gray-900 text-green-500 shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <span className={`mr-2 ${activeTab === tab.id ? 'text-green-500' : 'text-gray-500'}`}>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabSelector; 