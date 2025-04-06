import { Platform } from '@/data/downloadData';
import { Download, ArrowUpRight } from 'lucide-react';

interface DownloadBannerProps {
  activePlatform: Platform;
  handleDownload: (platformId: string) => void;
}

const DownloadBanner = ({ activePlatform, handleDownload }: DownloadBannerProps) => {
  return (
    <section className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-lg border-t border-gray-800 py-4 shadow-2xl shadow-black/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4">
              <Download size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Ready to get started?</h3>
              <p className="text-sm text-gray-300">Download JyvDesktop for {activePlatform.name}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <a 
              href={activePlatform.directDownload.url} 
              onClick={() => handleDownload(activePlatform.id)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 py-2 rounded-lg font-medium shadow-lg shadow-green-900/20 transition-all flex items-center gap-2"
            >
              <Download size={18} />
              <span>Download Now</span>
            </a>
            
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <ArrowUpRight size={18} />
              <span>View All Options</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadBanner; 