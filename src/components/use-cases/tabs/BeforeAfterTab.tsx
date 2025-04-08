import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UseCaseType } from '@/data/useCasesData';
import { Play, Pause, Volume2, Music, VolumeX, Info, BarChart2, SpeakerIcon } from 'lucide-react';

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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
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

export const BeforeAfterTab: React.FC<BeforeAfterTabProps> = ({ useCase }) => {
  const [playingBefore, setPlayingBefore] = useState(false);
  const [playingAfter, setPlayingAfter] = useState(false);
  const [activeComparison, setActiveComparison] = useState('audio-quality');
  
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-10 text-center"
      >
        <SpeakerIcon size={48} className="mx-auto text-gray-500 mb-4" />
        <h3 className="text-xl text-gray-400">No audio comparison available for this use case yet.</h3>
        <p className="mt-2 text-gray-500">Try another use case or visit our demo page for more examples.</p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-sm font-medium"
        >
          View available audio demos
        </motion.button>
      </motion.div>
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
        <motion.h3 variants={itemFadeIn} className="text-2xl font-bold text-white mb-3">Hear the difference</motion.h3>
        <motion.p variants={itemFadeIn} className="text-gray-400 max-w-xl mx-auto">
          Listen to these audio samples to experience how JyvDesktop enhances audio quality for this use case.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Before Audio */}
        <motion.div 
          variants={itemFadeIn}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-md"
        >
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
            <div className="flex justify-between items-center border border-gray-800 rounded-lg p-4 bg-black/40 hover:border-gray-700 transition-colors">
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
                  <motion.div 
                    className="h-full bg-gray-600 rounded-full origin-left" 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: playingBefore ? 1 : 0 }}
                    transition={{ duration: 15, ease: "linear" }}
                  ></motion.div>
                </div>
              </div>
              <motion.button 
                onClick={() => togglePlay('before')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center text-white transition-colors hover:bg-gray-600 shadow-md"
              >
                {playingBefore ? <Pause size={20} /> : <Play size={20} />}
              </motion.button>
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
                  <Music size={16} /> Clarity
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
                  <VolumeX size={16} /> Noise reduction
                </span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-2 w-2 rounded-full ${i < 1 ? 'bg-gray-600' : 'bg-gray-800'}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
              <div className="flex items-start gap-2">
                <Info size={14} className="text-gray-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 italic">
                  Common issues: background noise, poor dynamics, limited frequency range
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* After Audio */}
        <motion.div 
          variants={itemFadeIn}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-md"
        >
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
            <div className="flex justify-between items-center border border-green-900/30 rounded-lg p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 hover:border-green-500/50 transition-colors">
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
                  <motion.div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full origin-left" 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: playingAfter ? 1 : 0 }}
                    transition={{ duration: 15, ease: "linear" }}
                  ></motion.div>
                </div>
              </div>
              <motion.button 
                onClick={() => togglePlay('after')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white transition-transform shadow-md"
              >
                {playingAfter ? <Pause size={20} /> : <Play size={20} />}
              </motion.button>
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
                  <Music size={16} /> Clarity
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
                  <VolumeX size={16} /> Noise reduction
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
            <div className="mt-5 p-3 bg-green-900/30 rounded-lg border border-green-700/30">
              <div className="flex items-start gap-2">
                <Info size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-green-500 italic">
                  Improvements: noise reduction, enhanced clarity, balanced dynamics, wider frequency range
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div variants={staggerContainer} className="mt-12 space-y-6">
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-gray-900 rounded-lg p-1 shadow-inner">
            {['audio-quality', 'noise-reduction', 'frequency-response'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveComparison(item)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeComparison === item 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item === 'audio-quality' && 'Audio Quality'}
                {item === 'noise-reduction' && 'Noise Reduction'}
                {item === 'frequency-response' && 'Frequency Response'}
              </button>
            ))}
          </div>
        </div>
        
        <motion.div 
          key={activeComparison}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900 border border-gray-800 p-6 rounded-xl shadow-md"
        >
          {activeComparison === 'audio-quality' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-green-400">Dynamic Range</h5>
                  <div className="flex gap-1">
                    <span className="inline-block w-2 h-2 bg-gray-700 rounded-full"></span>
                    <span className="inline-block w-2 h-2 bg-gray-600 rounded-full"></span>
                    <span className="inline-block w-2 h-2 bg-gray-700 rounded-full"></span>
                  </div>
                </div>
                <p className="text-sm text-gray-300">Balanced audio dynamics ensure consistent volume levels without clipping or distortion.</p>
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Before</span>
                    <span>+196% improvement</span>
                  </div>
                </div>
              </div>
              <div className="border border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-green-400">Clarity</h5>
                  <div className="flex gap-1">
                    <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
                  </div>
                </div>
                <p className="text-sm text-gray-300">Enhanced vocal clarity and definition with improved intelligibility and detail.</p>
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Before</span>
                    <span>+214% improvement</span>
                  </div>
                </div>
              </div>
              <div className="border border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-green-400">Presence</h5>
                  <div className="flex gap-1">
                    <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
                  </div>
                </div>
                <p className="text-sm text-gray-300">Enhanced sense of space and dimension for a more immersive listening experience.</p>
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Before</span>
                    <span>+185% improvement</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeComparison === 'noise-reduction' && (
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2">
                <h5 className="font-medium text-green-400 mb-3 flex items-center gap-2">
                  <VolumeX size={18} /> Noise Reduction Technology
                </h5>
                <p className="text-gray-300 mb-4">JyvDesktop's AI-powered noise reduction intelligently identifies and removes unwanted background sounds while preserving voice quality.</p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Background elimination</span>
                      <span className="text-sm text-green-400">95%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Voice preservation</span>
                      <span className="text-sm text-green-400">99%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ width: '99%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-400">Processing efficiency</span>
                      <span className="text-sm text-green-400">90%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 p-4 bg-black/30 rounded-lg border border-gray-800">
                <h6 className="text-sm font-medium text-gray-300 mb-3">Noise Types Eliminated:</h6>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-gray-400">Background chatter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-gray-400">Keyboard typing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-gray-400">Fan/HVAC noise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-gray-400">Traffic sounds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-gray-400">Echo/reverb</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-gray-400">Pet sounds</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeComparison === 'frequency-response' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <BarChart2 size={24} className="text-green-500" />
                <h5 className="font-medium text-white">Enhanced Frequency Response</h5>
              </div>
              
              <div className="h-48 relative bg-black/30 rounded-lg border border-gray-800 p-4">
                <div className="absolute inset-0 flex items-end p-4">
                  {/* Simulated frequency response graph */}
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div 
                      key={i} 
                      style={{ 
                        height: `${Math.sin(i/3) * 30 + 40}%`,
                        width: '2%',
                        marginRight: '0.1rem',
                        backgroundColor: i < 25 ? 'rgba(74, 222, 128, 0.3)' : 'rgba(16, 185, 129, 0.3)',
                        position: 'relative'
                      }}
                    >
                      <div 
                        style={{ 
                          height: `${Math.sin(i/3) * 20 + 20}%`,
                          width: '100%',
                          position: 'absolute',
                          bottom: 0,
                          backgroundColor: i < 25 ? 'rgb(74, 222, 128)' : 'rgb(16, 185, 129)'
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs text-gray-500">
                  <span>20Hz</span>
                  <span>1kHz</span>
                  <span>20kHz</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-900/20 rounded-lg">
                  <h6 className="text-green-400 font-medium mb-1">Low Frequency</h6>
                  <p className="text-xs text-gray-400">Enhanced bass response with better definition</p>
                </div>
                <div className="p-3 bg-green-900/20 rounded-lg">
                  <h6 className="text-green-400 font-medium mb-1">Mid Frequency</h6>
                  <p className="text-xs text-gray-400">Improved vocal clarity and presence</p>
                </div>
                <div className="p-3 bg-green-900/20 rounded-lg">
                  <h6 className="text-green-400 font-medium mb-1">High Frequency</h6>
                  <p className="text-xs text-gray-400">Extended detail without harshness</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      <div className="text-center mt-10">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          Try JyvDesktop Free
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BeforeAfterTab; 