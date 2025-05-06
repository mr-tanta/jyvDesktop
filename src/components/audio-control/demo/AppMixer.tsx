import React from 'react';
import { motion } from 'framer-motion';
import { VolumeX, Volume1, PlusCircle, Settings } from 'lucide-react';
import { useAudioDevices } from '@/data/audioControlData';
import { useTranslations } from 'next-intl';

interface AppMixerProps {
  demoApps: {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
    volume: number;
    type: string;
    device: string;
    muted: boolean;
  }[];
  handleVolumeChange: (appId: string, newVolume: number) => void;
  handleMuteToggle: (appId: string) => void;
  handleDeviceChange: (appId: string, deviceId: string) => void;
}

export const AppMixer: React.FC<AppMixerProps> = ({
  demoApps,
  handleVolumeChange,
  handleMuteToggle,
  handleDeviceChange,
}) => {
  const audioDevices = useAudioDevices();
  const t = useTranslations('audioControl');
  return (
    <div className="p-6">
      <div className="mb-4">
        <h4 className="text-xl font-semibold text-white">{t('demo.applicationMixer')}</h4>
        <p className="text-sm text-gray-400">{t('demo.adjustVolume')}</p>
      </div>

      {/* App Controls */}
      <div className="space-y-6">
        {demoApps.map(app => (
          <div key={app.id} className="bg-gray-900/70 border border-gray-800 rounded-xl p-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* App Info */}
              <div className="flex items-center gap-3">
                <div className={`${app.color} h-10 w-10 rounded-lg flex items-center justify-center`}>
                  {app.icon}
                </div>
                <div>
                  <div className="font-medium text-white">{app.name}</div>
                  <div className="text-xs text-gray-400">{app.type}</div>
                </div>
              </div>

              {/* App Controls */}
              <div className="flex items-center gap-6 flex-wrap">
                {/* Volume Slider */}
                <div className="flex items-center gap-3 min-w-[180px]">
                  <button
                    onClick={() => handleMuteToggle(app.id)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {app.muted ? <VolumeX size={20} /> : <Volume1 size={20} />}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={app.muted ? 0 : app.volume}
                    onChange={(e) => handleVolumeChange(app.id, parseInt(e.target.value))}
                    disabled={app.muted}
                    className={`flex-1 accent-green-500 ${app.muted ? 'opacity-50' : ''}`}
                  />

                  <span className="text-sm font-medium w-8 text-white">
                    {app.muted ? '0%' : `${app.volume}%`}
                  </span>
                </div>

                {/* Device Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{t('output')}:</span>
                  <select
                    value={audioDevices.find(d => d.name === app.device)?.id || 'default'}
                    onChange={(e) => handleDeviceChange(app.id, e.target.value)}
                    className="bg-gray-800 text-white rounded-md text-xs py-1.5 px-2 border border-gray-700"
                  >
                    {audioDevices.map(device => (
                      <option key={device.id} value={device.id}>
                        {device.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Settings Button */}
                <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-md text-gray-300 transition-colors">
                  <Settings size={16} />
                </button>
              </div>
            </div>

            {/* Volume Meter - Animated based on volume */}
            <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${app.color}`}
                initial={{ width: 0 }}
                animate={{
                  width: app.muted ? '0%' : `${app.volume}%`,
                  opacity: app.muted ? 0.3 : 1
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Application Button */}
      <div className="mt-6">
        <button className="w-full py-3 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-lg text-gray-300 transition-colors flex items-center justify-center gap-2">
          <PlusCircle size={16} />
          <span>{t('demo.addApplication')}</span>
        </button>
      </div>
    </div>
  );
};

export default AppMixer; 