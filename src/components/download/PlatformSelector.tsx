import { Platform } from '@/data/downloadData';

interface PlatformSelectorProps {
  platforms: Platform[];
  activePlatform: Platform;
  setActivePlatform: (platform: Platform) => void;
}

const PlatformSelector = ({ platforms, activePlatform, setActivePlatform }: PlatformSelectorProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-16">
      {platforms.map((platform) => (
        <button
          key={platform.id}
          onClick={() => setActivePlatform(platform)}
          className={`flex items-center px-6 py-3 rounded-full transition-all ${
            activePlatform.id === platform.id
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl shadow-green-900/20'
              : 'bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white border border-gray-800'
          }`}
        >
          <span className="mr-2">{platform.icon}</span>
          <span className="font-medium">{platform.name}</span>
        </button>
      ))}
    </div>
  );
};

export default PlatformSelector; 