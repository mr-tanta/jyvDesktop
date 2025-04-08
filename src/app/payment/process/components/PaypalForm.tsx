'use client';

import React from 'react';
import { DollarSign, ArrowRight } from 'lucide-react';

interface PaypalFormProps {
  onSubmit: () => void;
}

const PaypalForm: React.FC<PaypalFormProps> = ({ onSubmit }) => {
  return (
    <div>
      <h3 className="font-medium text-lg mb-4 flex items-center">
        <DollarSign className="mr-2 h-5 w-5 text-blue-400" />
        Pay with PayPal
      </h3>
      
      <div className="mb-6 p-4 bg-gray-800 rounded-lg text-sm text-gray-300">
        <p>
          You'll be redirected to PayPal to complete your payment securely. Once the payment is processed, you'll be returned to our site.
        </p>
      </div>
      
      <div className="mb-4">
        <button 
          type="button"
          onClick={onSubmit}
          className="w-full py-3 px-4 bg-[#0070ba] hover:bg-[#005ea6] rounded-lg font-medium text-white transition-colors flex items-center justify-center"
        >
          <span>Continue to PayPal</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
      
      <div className="text-center text-xs text-gray-500">
        <p>
          By continuing, you agree to our terms and acknowledge that you'll be redirected to PayPal.
        </p>
      </div>
    </div>
  );
};

export default PaypalForm; 