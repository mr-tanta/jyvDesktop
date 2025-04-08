'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In a real app, this would be an API call to your auth endpoint
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // For demo purposes, just redirect to dashboard
      window.location.href = '/dashboard/licenses';
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#1a2331] text-white">
      {/* Left panel - Product info */}
      <div className="hidden md:flex md:w-1/2 bg-black flex-col p-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black text-2xl font-bold">
              J
            </div>
            <h1 className="text-2xl font-bold ml-4">JyvDesktop</h1>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-6">Audio control with precision</h2>
            
            <ul className="space-y-4 mt-8">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Advanced audio management</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>AI-powered noise suppression</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Spatial audio enhancement</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Per-application audio control</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Right panel - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-3 text-center">Sign In</h2>
          <p className="text-gray-400 text-center mb-8">Welcome back! Please enter your details.</p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#2a3441] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-gray-400">Password</label>
                <Link href="/auth/forgot-password" className="text-green-400 hover:text-green-300 text-sm">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#2a3441] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your password"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 rounded border-gray-700 bg-[#2a3441] text-green-500 focus:ring-green-500"
              />
              <label htmlFor="remember-me" className="ml-2 text-gray-400">
                Remember me
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              Sign In
            </button>
          </form>
          
          <div className="mt-8">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-700 w-full"></div>
              <div className="absolute bg-[#1a2331] px-4 text-sm text-gray-400">or continue with</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <button className="flex items-center justify-center py-2.5 px-4 bg-[#2a3441] hover:bg-gray-700 rounded-lg transition-colors">
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center py-2.5 px-4 bg-[#2a3441] hover:bg-gray-700 rounded-lg transition-colors">
                <span>Apple</span>
              </button>
              <button className="flex items-center justify-center py-2.5 px-4 bg-[#2a3441] hover:bg-gray-700 rounded-lg transition-colors">
                <span>Microsoft</span>
              </button>
            </div>
          </div>
          
          <p className="text-center mt-8 text-gray-400">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-green-400 hover:text-green-300">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
} 