'use client';

import React, { useState } from 'react';
import { CreditCard, Mail, User } from 'lucide-react';

interface PaystackFormProps {
  onSubmit: () => void;
}

const PaystackForm: React.FC<PaystackFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: Record<string, string> = {};
    
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Valid email address is required';
    }
    
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Process payment
    onSubmit();
  };
  
  return (
    <div>
      <h3 className="font-medium text-lg mb-4 flex items-center">
        <CreditCard className="mr-2 h-5 w-5 text-blue-400" />
        Pay with Paystack
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-gray-400">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="email"
              className={`w-full pl-10 pr-4 py-3 bg-gray-800 border ${
                errors.email ? 'border-red-500' : 'border-gray-700'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm mb-1 text-gray-400">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              className={`w-full pl-10 pr-4 py-3 bg-gray-800 border ${
                errors.fullName ? 'border-red-500' : 'border-gray-700'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="John Smith"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-colors"
          >
            Continue to Pay
          </button>
        </div>
        
        <div className="flex items-center justify-center mt-4">
          <div className="flex items-center justify-center space-x-2">
            <img src="/visa.svg" alt="Visa" className="h-6" />
            <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
            <img src="/verve.svg" alt="Verve" className="h-6" />
          </div>
        </div>
        
        <div className="text-xs text-center text-gray-500">
          Secured by Paystack. Your payment information is securely processed.
        </div>
      </form>
    </div>
  );
};

export default PaystackForm; 