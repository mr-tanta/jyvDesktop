import { motion } from 'framer-motion';
import { Platform } from '@/data/downloadData';
import SectionTitle from '../common/SectionTitle';
import { AlertTriangle, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface TroubleshootingSectionProps {
  platform: Platform;
}

const TroubleshootingSection = ({ platform }: TroubleshootingSectionProps) => {
  return (
    <section className="py-16 bg-gray-900/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionTitle 
          title="Troubleshooting Installation Issues"
          description="Encountering problems? Here are solutions to common installation issues"
        />
        
        <div className="mt-12 space-y-6">
          {platform.troubleshooting && platform.troubleshooting.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black/40 border border-gray-800 rounded-xl p-6 relative overflow-hidden"
            >
              {/* Background accent */}
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex-shrink-0 flex items-center justify-center text-amber-500">
                  <AlertTriangle size={20} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Solution Steps:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                      {item.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional general troubleshooting tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-semibold text-white mb-4">General Troubleshooting Tips</h3>
          
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex-shrink-0 flex items-center justify-center text-green-500 mt-0.5">
                <span className="text-xs">✓</span>
              </div>
              <span>Ensure your system meets the minimum requirements for JyvDesktop</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex-shrink-0 flex items-center justify-center text-green-500 mt-0.5">
                <span className="text-xs">✓</span>
              </div>
              <span>Close any other audio applications that might be using your audio devices</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex-shrink-0 flex items-center justify-center text-green-500 mt-0.5">
                <span className="text-xs">✓</span>
              </div>
              <span>Restart your computer before installation to clear any system processes</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex-shrink-0 flex items-center justify-center text-green-500 mt-0.5">
                <span className="text-xs">✓</span>
              </div>
              <span>Check for system updates that might be required for compatibility</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex-shrink-0 flex items-center justify-center text-green-500 mt-0.5">
                <span className="text-xs">✓</span>
              </div>
              <span>Verify that you have administrator privileges on your system</span>
            </li>
          </ul>
        </motion.div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">Still having issues? Our support team is here to help.</p>
          <Link 
            href="/support" 
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <HelpCircle size={18} />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TroubleshootingSection;