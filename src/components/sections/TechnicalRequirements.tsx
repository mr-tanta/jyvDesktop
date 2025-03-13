'use client';

import { motion } from 'framer-motion';
import { FiDownload, FiCpu, FiHardDrive, FiWifi, FiHeadphones, FiShield } from 'react-icons/fi';

export default function TechnicalRequirements() {
  return (
    <section id="technical" className="py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-[80px]"></div>
        
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
            <span className="text-green-400 text-sm font-medium">Technical Specifications</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            JyvDesktop <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Technical Requirements</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Comprehensive documentation of system requirements, performance specifications, 
            and technical architecture for enterprise deployment.
          </motion.p>
        </div>
        
        {/* Main TRD Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* System Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 lg:col-span-1"
          >
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 mb-4">
              <FiCpu className="text-xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">System Requirements</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-medium mb-2 text-sm uppercase tracking-wider">Minimum Requirements</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>CPU: 4 cores, 2.0 GHz (Intel Core i5-8xxx or equivalent)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>RAM: 4GB</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Storage: 500MB free space</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>OS: Windows 10 (20H2+) or macOS 11 (Big Sur) or newer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Network: Broadband internet connection</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-2 text-sm uppercase tracking-wider">Recommended Requirements</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>CPU: 8+ cores, 3.0+ GHz (Intel Core i7/i9 or AMD Ryzen 7/9)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>RAM: 8GB+</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Storage: 2GB+ free space (SSD recommended)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Audio: ASIO/CoreAudio compatible interface</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Network: High-speed internet connection (10+ Mbps)</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Performance Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 lg:col-span-2"
          >
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 mb-4">
              <FiHeadphones className="text-xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Performance Specifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-2 text-sm uppercase tracking-wider">Audio Processing</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Sample Rates: 44.1/48/96/192 kHz</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Bit Depth: 16/24/32-bit float</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Latency: &lt;10ms end-to-end</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Noise Reduction: Up to 25dB</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Echo Cancellation: Up to 40dB</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Voice Enhancement: Adaptive frequency response</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-2 text-sm uppercase tracking-wider">System Performance</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>CPU Usage: &lt;10% on recommended hardware</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Memory Footprint: &lt;300MB</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Startup Time: &lt;3 seconds</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Simultaneous Audio Streams: Up to 16</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Profile Switching: &lt;50ms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>Background Processing: Optimized thread management</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Technical Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-sm rounded-2xl border border-green-500/20 p-8 md:p-12 mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Technical Architecture</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-medium mb-4 text-lg">Core Components</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 mr-4 flex-shrink-0">
                    <span className="text-sm font-medium">01</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Audio Engine</h5>
                    <p className="text-gray-400 text-sm">Low-level audio processing core with optimized DSP algorithms</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 mr-4 flex-shrink-0">
                    <span className="text-sm font-medium">02</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Virtual Audio Device</h5>
                    <p className="text-gray-400 text-sm">System-level audio routing with minimal latency</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 mr-4 flex-shrink-0">
                    <span className="text-sm font-medium">03</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">AI Processing Module</h5>
                    <p className="text-gray-400 text-sm">Neural network-based audio enhancement and noise removal</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 mr-4 flex-shrink-0">
                    <span className="text-sm font-medium">04</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">User Interface</h5>
                    <p className="text-gray-400 text-sm">Electron-based cross-platform UI with real-time visualization</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4 text-lg">Integration Capabilities</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 mr-4 flex-shrink-0">
                    <span className="text-sm font-medium">01</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">API Access</h5>
                    <p className="text-gray-400 text-sm">RESTful API for remote control and integration with third-party applications</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 mr-4 flex-shrink-0">
                    <span className="text-sm font-medium">02</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Plugin Support</h5>
                    <p className="text-gray-400 text-sm">VST3/AU/AAX plugin compatibility for DAW integration</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 mr-4 flex-shrink-0">
                    <span className="text-sm font-medium">03</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Cloud Synchronization</h5>
                    <p className="text-gray-400 text-sm">Profile and settings synchronization across multiple devices</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 mr-4 flex-shrink-0">
                    <span className="text-sm font-medium">04</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Enterprise Management</h5>
                    <p className="text-gray-400 text-sm">Centralized deployment and license management for organizations</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
        
        {/* Security & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-16"
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 mr-4">
              <FiShield className="text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-white">Security & Compliance</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-medium mb-4">Data Security</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>End-to-end encryption for all audio data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Local processing with no cloud transmission of audio</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Secure authentication with optional 2FA</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Regular security audits and penetration testing</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Compliance</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>GDPR compliant data handling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>HIPAA compatible for healthcare settings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>SOC 2 Type II certified infrastructure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Accessibility compliance with WCAG 2.1 AA standards</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
        
        {/* Download TRD Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/20 transition-all">
            <FiDownload className="mr-2" />
            Download Full Technical Requirements Document
          </button>
          <p className="text-gray-400 text-sm mt-4">PDF format, 2.4MB</p>
        </motion.div>
      </div>
    </section>
  );
} 