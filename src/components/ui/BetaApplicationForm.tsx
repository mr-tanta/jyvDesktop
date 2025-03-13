'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';
import SubmissionStatus from './SubmissionStatus';

interface BetaApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  tier: 'basic' | 'pro' | 'enterprise';
}

export default function BetaApplicationForm({ isOpen, onClose, tier }: BetaApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    useCase: '',
    experience: '',
    systemSpecs: '',
    feedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/submit-beta-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tier
        }),
      });

      if (!response.ok) throw new Error('Submission failed');
      
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
        setFormData({
          name: '',
          email: '',
          company: '',
          role: '',
          useCase: '',
          experience: '',
          systemSpecs: '',
          feedback: ''
        });
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSubmitStatus(null);
    handleSubmit(new Event('submit') as any);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-black/90 border border-white/10 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>

          <h2 className="text-2xl font-bold text-white mb-2">
            Apply for {tier.charAt(0).toUpperCase() + tier.slice(1)} Beta Access
          </h2>
          <p className="text-gray-400 mb-6">
            Please fill out the form below to apply for our beta program.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Company name"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                  Role/Occupation *
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                >
                  <option value="">Select your role</option>
                  <option value="content_creator">Content Creator</option>
                  <option value="streamer">Streamer</option>
                  <option value="podcaster">Podcaster</option>
                  <option value="musician">Musician</option>
                  <option value="developer">Developer</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="useCase" className="block text-sm font-medium text-gray-300 mb-2">
                How do you plan to use JyvDesktop? *
              </label>
              <textarea
                id="useCase"
                name="useCase"
                required
                value={formData.useCase}
                onChange={handleChange}
                rows={3}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                placeholder="Describe your intended use case..."
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
                Experience with similar tools
              </label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows={2}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                placeholder="Tell us about your experience with similar audio tools..."
              />
            </div>

            <div>
              <label htmlFor="systemSpecs" className="block text-sm font-medium text-gray-300 mb-2">
                System Specifications *
              </label>
              <textarea
                id="systemSpecs"
                name="systemSpecs"
                required
                value={formData.systemSpecs}
                onChange={handleChange}
                rows={2}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                placeholder="CPU, RAM, OS version..."
              />
            </div>

            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-300 mb-2">
                Additional Comments
              </label>
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                rows={2}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                placeholder="Any additional information you'd like to share..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  isSubmitting
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/20'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </motion.div>

        <SubmissionStatus 
          status={submitStatus} 
          onRetry={handleRetry}
        />
      </div>
    </AnimatePresence>
  );
} 