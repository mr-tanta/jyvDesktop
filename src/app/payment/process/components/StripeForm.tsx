'use client';

import React, { useState } from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';

interface StripeFormProps {
  onSubmit: () => void;
}

const StripeForm: React.FC<StripeFormProps> = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: Record<string, string> = {};
    
    if (!cardNumber.trim() || cardNumber.replace(/\s+/g, '').length < 16) {
      newErrors.cardNumber = 'Valid card number is required';
    }
    
    if (!cardExpiry.trim() || cardExpiry.length < 5) {
      newErrors.cardExpiry = 'Valid expiry date is required';
    }
    
    if (!cardCvc.trim() || cardCvc.length < 3) {
      newErrors.cardCvc = 'Valid CVC is required';
    }
    
    if (!cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
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
        Pay with Card
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-gray-400">Card Number</label>
          <div className="relative">
            <input
              type="text"
              className={`w-full px-4 py-3 bg-gray-800 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-gray-400">Expiry Date</label>
            <div className="relative">
              <input
                type="text"
                className={`w-full px-4 py-3 bg-gray-800 border ${errors.cardExpiry ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="MM/YY"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                maxLength={5}
              />
              {errors.cardExpiry && (
                <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm mb-1 text-gray-400">CVC</label>
            <div className="relative">
              <input
                type="text"
                className={`w-full px-4 py-3 bg-gray-800 border ${errors.cardCvc ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="123"
                value={cardCvc}
                onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={4}
              />
              {errors.cardCvc && (
                <p className="text-red-500 text-xs mt-1">{errors.cardCvc}</p>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm mb-1 text-gray-400">Cardholder Name</label>
          <input
            type="text"
            className={`w-full px-4 py-3 bg-gray-800 border ${errors.cardName ? 'border-red-500' : 'border-gray-700'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="John Smith"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          {errors.cardName && (
            <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
          )}
        </div>
        
        <div className="pt-4">
          <button 
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-colors"
          >
            Pay Now
          </button>
        </div>
        
        <div className="flex items-center justify-center text-xs text-gray-500 mt-4">
          <Lock className="h-3 w-3 mr-1" />
          Secure payment processed by Stripe
        </div>
      </form>
    </div>
  );
};

export default StripeForm; 