'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiRefreshCw } from 'react-icons/fi';

interface SubmissionStatusProps {
  status: 'success' | 'error' | null;
  onRetry?: () => void;
}

export default function SubmissionStatus({ status, onRetry }: SubmissionStatusProps) {
  if (!status) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`bg-black/90 backdrop-blur-lg border ${
            status === 'success' ? 'border-green-500/30' : 'border-red-500/30'
          } rounded-2xl p-8 flex flex-col items-center max-w-sm w-full pointer-events-auto`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              status === 'success' 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <FiCheck size={32} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FiX size={32} />
              </motion.div>
            )}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-white mb-2 text-center"
          >
            {status === 'success' ? 'Application Submitted!' : 'Submission Failed'}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-center mb-6"
          >
            {status === 'success'
              ? 'Thank you for your interest! We\'ll review your application and get back to you soon.'
              : 'There was an error submitting your application. Please try again.'}
          </motion.p>

          {status === 'error' && onRetry && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={onRetry}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-colors"
            >
              <FiRefreshCw className="animate-spin" />
              Try Again
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 