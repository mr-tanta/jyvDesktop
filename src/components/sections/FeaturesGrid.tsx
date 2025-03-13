'use client';

import { motion } from 'framer-motion';
import { 
  FiMic, FiCpu, FiZap, FiHeadphones, FiSliders, 
  FiShield, FiGlobe, FiUsers, FiServer, FiSettings, FiCheck 
} from 'react-icons/fi';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// Feature data
const features = [
  {
    icon: <FiMic />,
    title: "AI-Powered Noise Cancellation",
    description: "Advanced algorithms remove background noise, echo, and unwanted sounds in real-time, ensuring crystal clear audio in any environment."
  },
  {
    icon: <FiCpu />,
    title: "Real-Time Processing",
    description: "Ultra-low latency audio processing with <10ms end-to-end latency, perfect for live streaming, gaming, and video conferencing."
  },
  {
    icon: <FiZap />,
    title: "Voice Enhancement",
    description: "Adaptive voice isolation technology separates your voice from background noise, enhancing clarity and presence."
  },
  {
    icon: <FiHeadphones />,
    title: "Spatial Audio Rendering",
    description: "Create immersive 3D audio experiences with customizable HRTF models and precise virtual sound positioning."
  },
  {
    icon: <FiSliders />,
    title: "Advanced DSP Effects",
    description: "Professional-grade equalization, compression, and audio effects with customizable presets for different scenarios."
  },
  {
    icon: <FiShield />,
    title: "Secure Audio Routing",
    description: "Route audio between applications with end-to-end encryption, ensuring your conversations remain private and secure."
  },
  {
    icon: <FiGlobe />,
    title: "Cross-Platform Compatibility",
    description: "Seamlessly works across Windows and macOS with optimized performance for each platform's audio architecture."
  },
  {
    icon: <FiUsers />,
    title: "Multi-Application Support",
    description: "Apply different audio profiles to different applications simultaneously, perfect for streamers and content creators."
  },
  {
    icon: <FiServer />,
    title: "Resource Efficient",
    description: "Optimized for low CPU usage (<10% average) and minimal memory footprint, preserving system resources for your other tasks."
  },
  {
    icon: <FiSettings />,
    title: "Customizable Workflows",
    description: "Create and save custom audio processing chains and profiles for different scenarios and applications."
  }
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 right-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-green-500/10 rounded-full blur-[60px]"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-green-500/10 px-4 py-2 rounded-full mb-4 border border-green-500/30"
          >
            <span className="text-green-400 text-sm font-medium">Powerful Features</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Professional-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Audio Control</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            JyvDesktop delivers enterprise-level audio processing technology in an intuitive, 
            user-friendly package. Discover how our features can transform your audio experience.
          </motion.p>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-green-500/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 mb-4 group-hover:bg-green-500/20 transition-colors">
                <span className="text-xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-sm rounded-2xl border border-green-500/20 p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Technical Excellence</h3>
              <p className="text-gray-300 mb-8">
                JyvDesktop is built on a foundation of technical excellence, with a focus on 
                performance, reliability, and flexibility. Our advanced audio processing engine 
                delivers professional-grade results with minimal system impact.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">
                    <FiCheck className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Low Latency Processing</h4>
                    <p className="text-gray-400 text-sm">End-to-end latency under 10ms for real-time applications</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">
                    <FiCheck className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Optimized Resource Usage</h4>
                    <p className="text-gray-400 text-sm">Less than 10% CPU usage and 300MB memory footprint</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mr-3 flex-shrink-0">
                    <FiCheck className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">High-Quality Audio</h4>
                    <p className="text-gray-400 text-sm">Support for 44.1/48/96/192 kHz sample rates and 24-bit depth</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">System Requirements</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-2">Minimum Requirements</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• CPU: 4 cores, 2.0 GHz (Intel Core i5-8xxx or equivalent)</li>
                    <li>• RAM: 4GB</li>
                    <li>• Storage: 500MB free space</li>
                    <li>• OS: Windows 10 (20H2+) or macOS 11 (Big Sur) or newer</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Recommended Requirements</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• CPU: 8+ cores, 3.0+ GHz (Intel Core i7/i9 or AMD Ryzen 7/9)</li>
                    <li>• RAM: 8GB+</li>
                    <li>• Storage: 2GB+ free space</li>
                    <li>• Audio: ASIO/CoreAudio compatible interface</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Ready to Transform Your Audio Experience?</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of content creators, gamers, and professionals who have 
            elevated their audio quality with JyvDesktop.
          </p>
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/20 transition-all">
            Download Free Trial
          </button>
        </motion.div>
      </div>
    </section>
  );
}