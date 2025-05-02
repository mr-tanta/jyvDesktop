import { Platform } from '@/data/downloadData';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Cpu, ExternalLink, RefreshCw, Download, FileText, ShieldAlert } from 'lucide-react';

interface DownloadCardProps {
  platform: Platform;
  downloadStarted: string | null;
  handleDownload: (platformId: string) => void;
}

const cardHoverVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02, 
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { type: "spring", stiffness: 300, damping: 15 }
  }
};

const DownloadCard = ({ platform, downloadStarted, handleDownload }: DownloadCardProps) => {
  return (
    <motion.div 
      variants={cardHoverVariants}
      initial="initial"
      whileHover="hover"
      className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl max-w-3xl mx-auto"
    >
      <div className={`bg-gradient-to-r ${platform.gradientFrom} ${platform.gradientTo} p-8 border-b border-gray-800/50`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center">
            <div className="p-4 rounded-xl bg-black/50 border border-green-500/20 mr-4">
              {platform.logo}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">JyvDesktop for {platform.name}</h2>
              <p className="text-green-400 text-sm">Version {platform.directDownload.version} • Released {platform.directDownload.releaseDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <a 
            href={platform.directDownload.url} 
            onClick={() => handleDownload(platform.id)}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all text-white px-5 py-4 rounded-xl font-medium shadow-lg shadow-green-900/20 relative overflow-hidden group"
          >
            {downloadStarted === platform.id ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download size={20} />
                <span>Direct Download ({platform.directDownload.size})</span>
              </>
            )}
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full"
              animate={{ translateX: downloadStarted === platform.id ? 500 : -500 }}
              transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
            />
          </a>
          <a 
            href={platform.storeUrl}
            target="_blank"
            rel="noopener noreferrer" 
            className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 transition-all text-white px-5 py-4 rounded-xl font-medium"
          >
            <span>Get from {platform.storeName}</span>
            <ExternalLink size={16} />
          </a>
        </div>

        <div className="flex items-center mb-4">
          <Cpu size={18} className="text-green-500 mr-2" />
          <h3 className="text-lg font-semibold text-white">System Requirements</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-4">
          <div className="flex items-center">
            <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
            <span className="text-gray-300 text-sm">OS: {platform.directDownload.requirements}</span>
          </div>
          <div className="flex items-center">
            <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
            <span className="text-gray-300 text-sm">CPU: Quad-core processor or better</span>
          </div>
          <div className="flex items-center">
            <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
            <span className="text-gray-300 text-sm">RAM: 4GB minimum (8GB recommended)</span>
          </div>
          <div className="flex items-center">
            <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
            <span className="text-gray-300 text-sm">Storage: 500MB free space</span>
          </div>
          <div className="flex items-center">
            <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
            <span className="text-gray-300 text-sm">Architecture: {platform.directDownload.architecture.join(', ')}</span>
          </div>
          <div className="flex items-center">
            <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
            <span className="text-gray-300 text-sm">GPU: DirectX 11 / Metal compatible</span>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-800 pt-6">
          <div className="flex items-center mb-4">
            <FileText size={18} className="text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-white">Installation Guide</h3>
          </div>

          <div className="space-y-4">
            <ol className="list-decimal list-inside space-y-3 text-gray-300">
              {platform.installSteps.map((step, index) => (
                <li key={index} className="pl-2">
                  <span className="font-medium text-white">{step.title}:</span> {step.description}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-800 pt-6">
          <div className="flex items-center mb-4">
            <ShieldAlert size={18} className="text-amber-500 mr-2" />
            <h3 className="text-lg font-semibold text-white">Common Issues & Solutions</h3>
          </div>

          {platform.troubleshooting && platform.troubleshooting.length > 0 && (
            <div className="space-y-4">
              {platform.troubleshooting.map((item, index) => (
                <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                    {item.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By downloading, you agree to our <Link href="/terms" className="text-green-500 hover:text-green-400">Terms of Service</Link> and <Link href="/privacy" className="text-green-500 hover:text-green-400">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DownloadCard; 
