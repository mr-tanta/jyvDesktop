import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UseCaseType } from '@/data/useCasesData';
import { Play, Pause, Volume2 } from 'lucide-react';

interface BeforeAfterTabProps {
  useCase: UseCaseType;
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const BeforeAfterTab: React.FC<BeforeAfterTabProps> = ({ useCase }) => {
  const [playingBefore, setPlayingBefore] = useState(false);
  const [playingAfter, setPlayingAfter] = useState(false);
  
  // This would be replaced with actual audio player implementation
  const togglePlay = (type: 'before' | 'after') => {
    if (type === 'before') {
      setPlayingBefore(!playingBefore);
      if (playingAfter) setPlayingAfter(false);
    } else {
      setPlayingAfter(!playingAfter);
      if (playingBefore) setPlayingBefore(false);
    }
  };

  if (!useCase.beforeAfterAudio) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-xl text-gray-400">No audio comparison available for this use case.</h3>
        <p className="mt-2 text-gray-500">Try another use case or visit our demo page for more examples.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="py-6 max-w-4xl mx-auto"
    >
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-white mb-3">Hear the difference</h3>
        <p className="text-gray-400 max-w-xl mx-auto">
          Listen to these audio samples to experience how JyvDesktop enhances audio quality for this use case.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Before Audio */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-md">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-5">
            <h4 className="text-xl font-bold text-white flex items-center">
              <span className="flex-shrink-0 h-6 w-6 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-xs">1</span>
              </span>
              Before JyvDesktop
            </h4>
            <p className="text-gray-400 mt-2">Standard audio with common issues and limitations</p>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center border border-gray-800 rounded-lg p-4 bg-black/40">
              <div className="flex-1">
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="h-2 rounded-full bg-gray-700" 
                      style={{ 
                        width: `${Math.random() * 10 + 2}px`,
                      }}
                    ></div>
                  ))}
                </div>
                <div className="h-2 bg-gray-800 rounded-full w-full overflow-hidden">
                  <div 
                    className="h-full bg-gray-600 rounded-full" 
                    style={{ width: playingBefore ? '100%' : '0%', transition: 'width 15s linear' }}
                  ></div>
                </div>
              </div>
              <button 
                onClick={() => togglePlay('before')}
                className="ml-4 h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center text-white transition-colors hover:bg-gray-600"
              >
                {playingBefore ? <Pause size={20} /> : <Play size={20} />}
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 flex items-center gap-2">
                  <Volume2 size={16} /> Audio quality
                </span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-2 w-2 rounded-full ${i < 2 ? 'bg-gray-600' : 'bg-gray-800'}`}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 flex items-center gap-2">
                  <Volume2 size={16} /> Clarity
                </span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-2 w-2 rounded-full ${i < 2 ? 'bg-gray-600' : 'bg-gray-800'}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-5 italic">
              Common issues: background noise, poor dynamics, limited frequency range
            </p>
          </div>
        </div>
        
        {/* After Audio */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-md">
          <div className="bg-gradient-to-r from-green-900 to-emerald-900 p-5">
            <h4 className="text-xl font-bold text-white flex items-center">
              <span className="flex-shrink-0 h-6 w-6 bg-black rounded-full flex items-center justify-center mr-3">
                <span className="text-green-500 text-xs">2</span>
              </span>
              With JyvDesktop
            </h4>
            <p className="text-green-200 mt-2">Enhanced audio with professional-grade quality</p>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-center border border-green-900/30 rounded-lg p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
              <div className="flex-1">
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="h-2 rounded-full bg-green-600/50" 
                      style={{ 
                        width: `${Math.random() * 15 + 5}px`,
                      }}
                    ></div>
                  ))}
                </div>
                <div className="h-2 bg-green-900/50 rounded-full w-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" 
                    style={{ width: playingAfter ? '100%' : '0%', transition: 'width 15s linear' }}
                  ></div>
                </div>
              </div>
              <button 
                onClick={() => togglePlay('after')}
                className="ml-4 h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white transition-transform hover:scale-105"
              >
                {playingAfter ? <Pause size={20} /> : <Play size={20} />}
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 flex items-center gap-2">
                  <Volume2 size={16} /> Audio quality
                </span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-2 w-2 rounded-full bg-green-500`}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 flex items-center gap-2">
                  <Volume2 size={16} /> Clarity
                </span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-2 w-2 rounded-full bg-green-500`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-green-500 mt-5 italic">
              Improvements: noise reduction, enhanced clarity, balanced dynamics, wider frequency range
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-10 bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-sm">
        <h4 className="text-lg font-semibold text-white mb-3">Technical improvements</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-800 rounded-lg p-4">
            <h5 className="font-medium text-green-400 mb-2">Noise Reduction</h5>
            <p className="text-sm text-gray-400">Background noise and interference reduced by up to 95%, resulting in crystal clear audio.</p>
          </div>
          <div className="border border-gray-800 rounded-lg p-4">
            <h5 className="font-medium text-green-400 mb-2">Dynamic Range</h5>
            <p className="text-sm text-gray-400">Balanced audio dynamics ensure consistent volume levels without clipping or distortion.</p>
          </div>
          <div className="border border-gray-800 rounded-lg p-4">
            <h5 className="font-medium text-green-400 mb-2">Frequency Response</h5>
            <p className="text-sm text-gray-400">Enhanced frequency range delivers fuller, more natural sound with improved detail.</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg">
          Try JyvDesktop Free
        </button>
      </div>
    </motion.div>
  );
};

export default BeforeAfterTab; 