import React from 'react';
import { Volume2, RotateCcw, BellOff, Headphones } from 'lucide-react';
import { usePresetProfiles } from '@/data/audioControlData';
import { useTranslations } from 'next-intl';

interface DemoHeaderProps {
  masterVolume: number;
  setMasterVolume: (volume: number) => void;
  activeProfile: string;
  applyProfile: (profileId: string) => void;
  resetDemo: () => void;
  focusModeEnabled: boolean;
  setFocusModeEnabled: (enabled: boolean) => void;
  notificationVolumeReduction: number;
  setNotificationVolumeReduction: (reduction: number) => void;
}

export const DemoHeader: React.FC<DemoHeaderProps> = ({
  masterVolume,
  setMasterVolume,
  activeProfile,
  applyProfile,
  resetDemo,
  focusModeEnabled,
  setFocusModeEnabled,
  notificationVolumeReduction,
  setNotificationVolumeReduction,
}) => {
  const presetProfiles = usePresetProfiles();
  const t = useTranslations('audioControl.demo');
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{t('audioControlCenter')}</h3>
          <p className="text-green-400 text-sm">{t('interactiveDemo')}</p>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          {/* Master Volume */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
            <Volume2 size={20} className="text-green-500" />
            <div>
              <div className="text-xs text-gray-400 mb-1">{t('masterVolume')}</div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={masterVolume}
                  onChange={(e) => setMasterVolume(parseInt(e.target.value))}
                  className="w-32 accent-green-500"
                />
                <span className="text-sm font-medium w-8 text-white">{masterVolume}%</span>
              </div>
            </div>
          </div>

          {/* Profile Selector */}
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-gray-800">
            <div className="text-xs text-gray-400 mb-2">{t('activeProfile')}</div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyProfile('default')}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  activeProfile === 'default'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {t('default')}
              </button>

              {presetProfiles.map(profile => (
                <button
                  key={profile.id}
                  onClick={() => applyProfile(profile.id)}
                  className={`px-3 py-1.5 text-xs rounded-md flex items-center gap-1.5 transition-colors ${
                    activeProfile === profile.id
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {profile.icon}
                  <span>{profile.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetDemo}
            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg text-gray-300 transition-colors"
            title={t('resetDemo')}
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      {/* Interactive Demo Features */}
      <div className="mt-6 flex flex-wrap gap-3">
        <div className="px-4 py-2 bg-black/30 rounded-full text-sm flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${focusModeEnabled ? 'bg-green-500' : 'bg-gray-500'}`}></div>
          <span className="text-gray-300">{t('focusMode')}</span>
          <label className="relative inline-flex items-center cursor-pointer ml-2">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={focusModeEnabled}
              onChange={() => setFocusModeEnabled(!focusModeEnabled)}
            />
            <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-focus:ring-1 peer-focus:ring-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>

        <div className="px-4 py-2 bg-black/30 rounded-full text-sm flex items-center gap-2">
          <BellOff size={16} className="text-gray-400" />
          <span className="text-gray-300">{t('notificationReduction')}</span>
          <select
            value={notificationVolumeReduction}
            onChange={(e) => setNotificationVolumeReduction(parseInt(e.target.value))}
            className="bg-gray-800 text-white rounded-md text-xs py-0.5 px-1 ml-2"
          >
            <option value="0">0%</option>
            <option value="25">25%</option>
            <option value="50">50%</option>
            <option value="75">75%</option>
            <option value="100">100%</option>
          </select>
        </div>

        <div className="px-4 py-2 bg-black/30 rounded-full text-sm flex items-center gap-2">
          <Headphones size={16} className="text-gray-400" />
          <span className="text-gray-300">{t('audioEnhancement')}</span>
          <div className="relative inline-flex items-center cursor-pointer ml-2">
            <div className="w-8 h-4 bg-green-500/30 rounded-full flex items-center">
              <div className="h-3 w-3 bg-green-500 rounded-full ml-0.5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoHeader; 