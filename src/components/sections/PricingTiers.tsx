'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiArrowRight, FiStar, FiUsers, FiServer, FiShield, FiHeadphones, FiSettings, FiGlobe } from 'react-icons/fi';
import BetaApplicationForm from '../ui/BetaApplicationForm';

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

// Feature lists for each plan
const basicFeatures = [
  "AI-powered noise cancellation",
  "Voice modulation (3 presets)",
  "Basic audio enhancement",
  "Single device support",
  "Early access to new features",
  "Beta tester community access"
];

const proFeatures = [
  "Everything in Basic",
  "Advanced noise removal algorithms",
  "Voice modulation (10+ presets)",
  "Multi-device support (up to 3)",
  "Priority beta access",
  "Custom audio profiles",
  "Direct feedback channel"
];

const enterpriseFeatures = [
  "Everything in Pro",
  "Unlimited device licenses",
  "Custom deployment options",
  "Dedicated beta support",
  "Private beta builds",
  "Custom AI model training",
  "API access for testing",
  "Advanced analytics dashboard",
  "Enterprise security features",
  "Priority feature requests"
];

export default function PricingTiers() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [formOpen, setFormOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'basic' | 'pro' | 'enterprise'>('basic');

  const openForm = (tier: 'basic' | 'pro' | 'enterprise') => {
    setSelectedTier(tier);
    setFormOpen(true);
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]"></div>
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
            <FiStar className="text-green-400 mr-2" />
            <span className="text-green-400 text-sm font-medium">Limited Beta Access</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Beta Program</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Be among the first to experience our revolutionary AI-powered audio enhancement technology.
            Apply now for exclusive beta access.
          </motion.p>
          
          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-black/30 p-1 rounded-full border border-white/10 mb-12"
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly <span className="text-xs text-green-400 ml-1">Save 58%</span>
            </button>
          </motion.div>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Basic Plan */}
          <motion.div
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-transform hover:transform hover:scale-[1.02]"
          >
            <div className="p-8 border-b border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Basic Beta</h3>
              <p className="text-gray-400 mb-6">For individual creators</p>
              
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold text-white">
                  {billingCycle === 'monthly' ? '$5.99' : '$29.99'}
                </span>
                <span className="text-gray-400 ml-2 mb-1">
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              </div>

              <div className="mb-6">
                <span className="text-sm text-green-400 bg-green-500/10 px-3 py-1 rounded-full">Beta Access Required</span>
              </div>
              
              <button 
                onClick={() => openForm('basic')}
                className="w-full py-3 px-4 rounded-lg bg-white/5 text-white border border-green-500/30 hover:bg-green-500/10 transition-colors font-medium"
              >
                Apply for Beta
              </button>
            </div>

            <div className="p-8">
              <p className="text-sm text-gray-400 mb-6">Includes:</p>
              <ul className="space-y-4">
                {basicFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheck className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          {/* Pro Plan */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-b from-green-900/30 to-black/40 backdrop-blur-sm rounded-2xl border border-green-500/20 overflow-hidden shadow-xl shadow-green-500/10 relative transform transition-transform hover:scale-[1.02]"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
            <div className="absolute top-6 right-6">
              <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full">Popular</span>
            </div>
            
            <div className="p-8 border-b border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Pro Beta</h3>
              <p className="text-gray-400 mb-6">For serious content creators</p>
              
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold text-white">
                  {billingCycle === 'monthly' ? '$9.99' : '$59.99'}
                </span>
                <span className="text-gray-400 ml-2 mb-1">
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              </div>

              <div className="mb-6">
                <span className="text-sm text-green-400 bg-green-500/10 px-3 py-1 rounded-full">Priority Beta Access</span>
              </div>
              
              <button 
                onClick={() => openForm('pro')}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/20 transition-all font-medium"
              >
                Apply for Priority Beta
              </button>
            </div>

            <div className="p-8">
              <p className="text-sm text-gray-400 mb-6">Everything in Basic, plus:</p>
              <ul className="space-y-4">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheck className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          {/* Enterprise Plan */}
          <motion.div
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-transform hover:transform hover:scale-[1.02]"
          >
            <div className="p-8 border-b border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">Enterprise Beta</h3>
              <p className="text-gray-400 mb-6">For teams and organizations</p>
              
              <div className="flex items-end mb-6">
                <span className="text-4xl font-bold text-white">$299.99</span>
                <span className="text-gray-400 ml-2 mb-1">/year</span>
              </div>

              <div className="mb-6">
                <span className="text-sm text-green-400 bg-green-500/10 px-3 py-1 rounded-full">Custom Beta Access</span>
              </div>
              
              <button 
                onClick={() => openForm('enterprise')}
                className="w-full py-3 px-4 rounded-lg bg-white/5 text-white border border-green-500/30 hover:bg-green-500/10 transition-colors font-medium flex items-center justify-center"
              >
                <span>Contact for Enterprise Beta</span>
                <FiArrowRight className="ml-2" />
              </button>
            </div>

            <div className="p-8">
              <p className="text-sm text-gray-400 mb-6">Everything in Pro, plus:</p>
              <ul className="space-y-4">
                {enterpriseFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheck className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
        
        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-8 text-center"
          >
            Frequently Asked Questions
          </motion.h3>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="bg-black/20 border border-white/10 rounded-lg p-6">
              <h4 className="text-white font-medium mb-2">How does the beta program work?</h4>
              <p className="text-gray-400">After applying, our team will review your application and contact you if selected. Beta testers receive early access to features and are expected to provide feedback to help improve the product.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-black/20 border border-white/10 rounded-lg p-6">
              <h4 className="text-white font-medium mb-2">How long is the beta period?</h4>
              <p className="text-gray-400">The beta program runs for 3 months, with the possibility of extension. Selected participants will be notified of any changes or updates to the program.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-black/20 border border-white/10 rounded-lg p-6">
              <h4 className="text-white font-medium mb-2">What are the requirements for beta testers?</h4>
              <p className="text-gray-400">Beta testers should have the minimum system requirements, be willing to provide regular feedback, and report any issues they encounter during testing.</p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="text-gray-300 mb-6">
            Limited spots available. Apply now to secure your place in the beta program.
          </p>
          <button 
            onClick={() => openForm('basic')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/20 transition-all"
          >
            Apply for Beta Access
          </button>
        </motion.div>
      </div>

      {/* Beta Application Form */}
      <BetaApplicationForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        tier={selectedTier}
      />
    </section>
  );
}
