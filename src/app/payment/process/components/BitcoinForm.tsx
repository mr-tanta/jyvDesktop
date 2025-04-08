'use client';

import React, { useState } from 'react';
import { Bitcoin, Copy, Check } from 'lucide-react';

interface BitcoinFormProps {
  onSubmit: () => void;
}

const BitcoinForm: React.FC<BitcoinFormProps> = ({ onSubmit }) => {
  const [copied, setCopied] = useState(false);
  
  // This would typically be generated on the server
  const bitcoinAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
  const paymentAmount = 0.00045;
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(bitcoinAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div>
      <h3 className="font-medium text-lg mb-4 flex items-center">
        <Bitcoin className="mr-2 h-5 w-5 text-blue-400" />
        Pay with Bitcoin
      </h3>
      
      <div className="mb-6 p-5 bg-gray-800 rounded-lg text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white p-3 rounded-lg mb-4">
            <svg
              className="mx-auto h-40 w-40"
              viewBox="0 0 256 256"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="256" height="256" fill="white" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M128 256C198.692 256 256 198.692 256 128C256 57.3075 198.692 0 128 0C57.3075 0 0 57.3075 0 128C0 198.692 57.3075 256 128 256Z"
                fill="white"
              />
              <rect x="16" y="16" width="14" height="14" fill="black" />
              <rect x="16" y="30" width="14" height="14" fill="black" />
              <rect x="16" y="44" width="14" height="14" fill="black" />
              <rect x="16" y="58" width="14" height="14" fill="black" />
              <rect x="16" y="72" width="14" height="14" fill="black" />
              <rect x="16" y="86" width="14" height="14" fill="black" />
              <rect x="16" y="100" width="14" height="14" fill="black" />
              <rect x="16" y="142" width="14" height="14" fill="black" />
              <rect x="16" y="156" width="14" height="14" fill="black" />
              <rect x="16" y="170" width="14" height="14" fill="black" />
              <rect x="16" y="184" width="14" height="14" fill="black" />
              <rect x="16" y="198" width="14" height="14" fill="black" />
              <rect x="16" y="212" width="14" height="14" fill="black" />
              <rect x="16" y="226" width="14" height="14" fill="black" />
              <rect x="30" y="16" width="14" height="14" fill="black" />
              <rect x="30" y="100" width="14" height="14" fill="black" />
              <rect x="30" y="142" width="14" height="14" fill="black" />
              <rect x="30" y="226" width="14" height="14" fill="black" />
              <rect x="44" y="16" width="14" height="14" fill="black" />
              <rect x="44" y="44" width="14" height="14" fill="black" />
              <rect x="44" y="58" width="14" height="14" fill="black" />
              <rect x="44" y="72" width="14" height="14" fill="black" />
              <rect x="44" y="100" width="14" height="14" fill="black" />
              <rect x="44" y="142" width="14" height="14" fill="black" />
              <rect x="44" y="170" width="14" height="14" fill="black" />
              <rect x="44" y="184" width="14" height="14" fill="black" />
              <rect x="44" y="198" width="14" height="14" fill="black" />
              <rect x="44" y="226" width="14" height="14" fill="black" />
              <rect x="58" y="16" width="14" height="14" fill="black" />
              <rect x="58" y="44" width="14" height="14" fill="black" />
              <rect x="58" y="58" width="14" height="14" fill="black" />
              <rect x="58" y="72" width="14" height="14" fill="black" />
              <rect x="58" y="100" width="14" height="14" fill="black" />
              <rect x="58" y="142" width="14" height="14" fill="black" />
              <rect x="58" y="170" width="14" height="14" fill="black" />
              <rect x="58" y="184" width="14" height="14" fill="black" />
              <rect x="58" y="198" width="14" height="14" fill="black" />
              <rect x="58" y="226" width="14" height="14" fill="black" />
              <rect x="72" y="16" width="14" height="14" fill="black" />
              <rect x="72" y="44" width="14" height="14" fill="black" />
              <rect x="72" y="58" width="14" height="14" fill="black" />
              <rect x="72" y="72" width="14" height="14" fill="black" />
              <rect x="72" y="100" width="14" height="14" fill="black" />
              <rect x="72" y="142" width="14" height="14" fill="black" />
              <rect x="72" y="170" width="14" height="14" fill="black" />
              <rect x="72" y="184" width="14" height="14" fill="black" />
              <rect x="72" y="198" width="14" height="14" fill="black" />
              <rect x="72" y="226" width="14" height="14" fill="black" />
              <rect x="86" y="16" width="14" height="14" fill="black" />
              <rect x="86" y="100" width="14" height="14" fill="black" />
              <rect x="86" y="142" width="14" height="14" fill="black" />
              <rect x="86" y="226" width="14" height="14" fill="black" />
              <rect x="100" y="16" width="14" height="14" fill="black" />
              <rect x="100" y="30" width="14" height="14" fill="black" />
              <rect x="100" y="44" width="14" height="14" fill="black" />
              <rect x="100" y="58" width="14" height="14" fill="black" />
              <rect x="100" y="72" width="14" height="14" fill="black" />
              <rect x="100" y="86" width="14" height="14" fill="black" />
              <rect x="100" y="100" width="14" height="14" fill="black" />
              <rect x="100" y="142" width="14" height="14" fill="black" />
              <rect x="100" y="156" width="14" height="14" fill="black" />
              <rect x="100" y="170" width="14" height="14" fill="black" />
              <rect x="100" y="184" width="14" height="14" fill="black" />
              <rect x="100" y="198" width="14" height="14" fill="black" />
              <rect x="100" y="212" width="14" height="14" fill="black" />
              <rect x="100" y="226" width="14" height="14" fill="black" />
            </svg>
          </div>
          
          <p className="text-gray-300 mb-2">Send exactly</p>
          <p className="text-xl font-bold mb-2">{paymentAmount} BTC</p>
          <p className="text-gray-300 mb-4">to the address below</p>
          
          <div className="flex items-center space-x-2 bg-gray-700 p-3 rounded-lg w-full">
            <p className="font-mono text-xs text-gray-300 flex-1 break-all">{bitcoinAddress}</p>
            <button 
              onClick={handleCopyAddress}
              className="p-1.5 bg-gray-600 hover:bg-gray-500 rounded-md flex-shrink-0 transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-400">
          * The payment typically takes up to 30 minutes to be fully confirmed on the blockchain.
        </p>
        
        <button 
          type="button"
          onClick={onSubmit}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white transition-colors"
        >
          I've Sent the Payment
        </button>
      </div>
    </div>
  );
};

export default BitcoinForm; 