import { motion } from 'framer-motion';
import { Platform } from '@/data/downloadData';
import { sectionVariants } from '../common/SectionTitle';
import PlatformSelector from './PlatformSelector';
import DownloadCard from './DownloadCard';

interface HeroSectionProps {
  platforms: Platform[];
  activePlatform: Platform;
  setActivePlatform: (platform: Platform) => void;
  downloadStarted: string | null;
  handleDownload: (platformId: string) => void;
}

const HeroSection = ({ 
  platforms, 
  activePlatform, 
  setActivePlatform, 
  downloadStarted, 
  handleDownload 
}: HeroSectionProps) => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center py-1 px-4 mb-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-green-400 font-medium">Available for all platforms</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Experience <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">professional audio</span> on every device
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed">
            Download JyvDesktop and transform your audio experience with AI-powered 
            enhancements, spatial audio, and precision control.
          </p>
          
          {/* Platform Selection Tabs */}
          <PlatformSelector 
            platforms={platforms} 
            activePlatform={activePlatform} 
            setActivePlatform={setActivePlatform} 
          />
          
          {/* Download Card */}
          <DownloadCard 
            platform={activePlatform} 
            downloadStarted={downloadStarted} 
            handleDownload={handleDownload} 
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 