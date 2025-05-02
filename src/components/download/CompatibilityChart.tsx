import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import { FaWindows, FaApple, FaChrome } from 'react-icons/fa';

// Feature compatibility data
const features = [
  {
    name: "AI Noise Suppression",
    windows: true,
    macos: true,
    chromebook: true,
    description: "Remove background noise in real-time"
  },
  {
    name: "Spatial Audio",
    windows: true,
    macos: true,
    chromebook: false,
    description: "3D audio positioning and environment simulation"
  },
  {
    name: "Per-App Volume Control",
    windows: true,
    macos: true,
    chromebook: true,
    description: "Control volume levels for individual applications"
  },
  {
    name: "Voice Enhancement",
    windows: true,
    macos: true,
    chromebook: true,
    description: "Improve voice clarity and presence"
  },
  {
    name: "VST Plugin Support",
    windows: true,
    macos: true,
    chromebook: false,
    description: "Use third-party audio processing plugins"
  },
  {
    name: "Hardware Acceleration",
    windows: true,
    macos: true,
    chromebook: false,
    description: "GPU-accelerated audio processing"
  },
  {
    name: "Multi-Device Routing",
    windows: true,
    macos: true,
    chromebook: false,
    description: "Route audio between multiple devices"
  },
  {
    name: "Audio Visualization",
    windows: true,
    macos: true,
    chromebook: true,
    description: "Real-time visual representation of audio"
  }
];

const CompatibilityChart = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Platform Feature Compatibility"
          description="Feature availability may vary by platform. Check which features are available for your system."
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 overflow-x-auto"
        >
          <table className="w-full min-w-[768px] border-collapse">
            <thead>
              <tr className="bg-gray-900">
                <th className="p-4 text-left text-white">Feature</th>
                <th className="p-4 text-center text-white">
                  <div className="flex flex-col items-center">
                    <FaWindows size={24} className="mb-2" />
                    <span>Windows</span>
                  </div>
                </th>
                <th className="p-4 text-center text-white">
                  <div className="flex flex-col items-center">
                    <FaApple size={24} className="mb-2" />
                    <span>macOS</span>
                  </div>
                </th>
                <th className="p-4 text-center text-white">
                  <div className="flex flex-col items-center">
                    <FaChrome size={24} className="mb-2" />
                    <span>Chromebook</span>
                  </div>
                </th>
                <th className="p-4 text-left text-white">Description</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-black/40' : 'bg-gray-900/40'}>
                  <td className="p-4 text-gray-300 border-t border-gray-800 font-medium">{feature.name}</td>
                  <td className="p-4 text-center border-t border-gray-800">
                    {feature.windows ? 
                      <Check size={18} className="text-green-500 mx-auto" /> : 
                      <X size={18} className="text-red-500 mx-auto" />
                    }
                  </td>
                  <td className="p-4 text-center border-t border-gray-800">
                    {feature.macos ? 
                      <Check size={18} className="text-green-500 mx-auto" /> : 
                      <X size={18} className="text-red-500 mx-auto" />
                    }
                  </td>
                  <td className="p-4 text-center border-t border-gray-800">
                    {feature.chromebook ? 
                      <Check size={18} className="text-green-500 mx-auto" /> : 
                      <X size={18} className="text-red-500 mx-auto" />
                    }
                  </td>
                  <td className="p-4 text-gray-400 border-t border-gray-800 text-sm">{feature.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>* Feature availability may change with future updates. Check our release notes for the latest information.</p>
        </div>
      </div>
    </section>
  );
};

export default CompatibilityChart;