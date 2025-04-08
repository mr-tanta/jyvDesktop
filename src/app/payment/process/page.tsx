'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, Bitcoin, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';

const PaymentProcessContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get('plan');
  const billingPeriod = searchParams.get('billing') || 'monthly';
  const paymentMethod = searchParams.get('method');
  const users = searchParams.get('users') ? parseInt(searchParams.get('users') || '10', 10) : null;
  
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const [bitcoinAddress, setBitcoinAddress] = useState('');
  
  useEffect(() => {
    // Simulate loading payment processor
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Generate a random Bitcoin address for demo
      if (paymentMethod === 'bitcoin') {
        setBitcoinAddress('bc1q84n0spauvmkd4c38qjp8d80jgr9xqrz5jfzh9p');
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [paymentMethod]);
  
  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessingPayment(true);
    setError(null);
    
    // Simulate payment processing
    setTimeout(() => {
      // Simulate successful payment
      const success = Math.random() > 0.2; // 80% chance of success for demo
      
      if (success) {
        setPaymentComplete(true);
        
        // Redirect to appropriate dashboard after 2 seconds
        setTimeout(() => {
          // If enterprise plan, redirect to enterprise dashboard
          if (planId === 'enterprise') {
            router.push('/dashboard/enterprise?newPurchase=true');
          } else {
            router.push('/dashboard/licenses');
          }
        }, 2000);
      } else {
        setError('Payment processing failed. Please try again.');
      }
      
      setProcessingPayment(false);
    }, 2000);
  };
  
  // Animation variants
  const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };
  
  const slideUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  const getPaymentMethodIcon = () => {
    switch (paymentMethod) {
      case 'bitcoin':
        return <Bitcoin className="h-6 w-6" />;
      default:
        return <CreditCard className="h-6 w-6" />;
    }
  };
  
  const getPaymentMethodName = () => {
    switch (paymentMethod) {
      case 'stripe':
        return 'Stripe';
      case 'paystack':
        return 'Paystack';
      case 'flutterwave':
        return 'Flutterwave';
      case 'bitcoin':
        return 'Bitcoin';
      case 'paypal':
        return 'PayPal';
      default:
        return 'Credit Card';
    }
  };
  
  const getPaymentMethodColor = () => {
    switch (paymentMethod) {
      case 'stripe':
        return 'from-blue-500/10 to-blue-600/5';
      case 'paystack':
        return 'from-purple-500/10 to-purple-600/5';
      case 'flutterwave':
        return 'from-amber-500/10 to-amber-600/5';
      case 'bitcoin':
        return 'from-green-500/10 to-green-600/5';
      case 'paypal':
        return 'from-indigo-500/10 to-indigo-600/5';
      default:
        return 'from-blue-500/10 to-blue-600/5';
    }
  };
  
  const getPaymentMethodBorderColor = () => {
    switch (paymentMethod) {
      case 'stripe':
        return 'border-blue-500/20';
      case 'paystack':
        return 'border-purple-500/20';
      case 'flutterwave':
        return 'border-amber-500/20';
      case 'bitcoin':
        return 'border-green-500/20';
      case 'paypal':
        return 'border-indigo-500/20';
      default:
        return 'border-blue-500/20';
    }
  };
  
  const getPaymentMethodIconBg = () => {
    switch (paymentMethod) {
      case 'stripe':
        return 'bg-blue-500/20';
      case 'paystack':
        return 'bg-purple-500/20';
      case 'flutterwave':
        return 'bg-amber-500/20';
      case 'bitcoin':
        return 'bg-green-500/20';
      case 'paypal':
        return 'bg-indigo-500/20';
      default:
        return 'bg-blue-500/20';
    }
  };
  
  const renderPaymentForm = () => {
    if (paymentComplete) {
      return (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={slideUpVariant}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-6">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-gray-400 mb-6">Thank you for your purchase. Your license key has been generated.</p>
          <p className="text-sm text-gray-500 mb-6">
            You will be redirected to your {planId === 'enterprise' ? 'enterprise dashboard' : 'dashboard'} in a moment...
          </p>
        </motion.div>
      );
    }
    
    if (paymentMethod === 'bitcoin') {
      return (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideUpVariant}
        >
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Pay with Bitcoin</h2>
            <p className="text-gray-400 mb-6">Send the exact amount to the following address:</p>
            
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Bitcoin Address:</span>
                <button 
                  className="text-xs text-green-400 hover:text-green-300"
                  onClick={() => navigator.clipboard.writeText(bitcoinAddress)}
                >
                  Copy
                </button>
              </div>
              <div className="font-mono text-sm break-all select-all text-white">{bitcoinAddress}</div>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-sm text-gray-400 mb-1">Amount to send:</p>
              <p className="text-2xl font-bold text-white">0.0042 BTC</p>
              <p className="text-xs text-gray-500 mt-1">Equivalent to $149.99 USD</p>
            </div>
            
            <div className="text-center text-sm text-gray-400">
              <p>Once payment is confirmed, your license will be automatically generated.</p>
              <p className="mt-2">This usually takes 1-3 blockchain confirmations (10-30 minutes).</p>
            </div>
            
            <button
              className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-all flex items-center justify-center"
              onClick={handleSubmit}
            >
              I've Sent the Payment
            </button>
          </div>
        </motion.div>
      );
    }
    
    return (
      <motion.form
        initial="hidden"
        animate="visible"
        variants={slideUpVariant}
        onSubmit={handleSubmit}
        className="max-w-md mx-auto"
      >
        <h2 className="text-xl font-bold mb-4">Payment Details</h2>
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Cardholder Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={cardDetails.name}
              onChange={handleCardInputChange}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="John Smith"
            />
          </div>
          
          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-300 mb-1">Card Number</label>
            <input
              id="number"
              name="number"
              type="text"
              required
              value={cardDetails.number}
              onChange={handleCardInputChange}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="4242 4242 4242 4242"
              maxLength={19}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="block text-sm font-medium text-gray-300 mb-1">Expiry Date</label>
              <input
                id="expiry"
                name="expiry"
                type="text"
                required
                value={cardDetails.expiry}
                onChange={handleCardInputChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            
            <div>
              <label htmlFor="cvc" className="block text-sm font-medium text-gray-300 mb-1">CVC</label>
              <input
                id="cvc"
                name="cvc"
                type="text"
                required
                value={cardDetails.cvc}
                onChange={handleCardInputChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="123"
                maxLength={3}
              />
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={processingPayment}
          className="w-full py-3 px-4 mb-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-all flex items-center justify-center"
        >
          {processingPayment ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            'Pay Now'
          )}
        </button>
      </motion.form>
    );
  };
  
  return (
    <main className="min-h-screen bg-black text-white pb-12">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-green-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
        <div className="absolute top-20 left-1/4 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-40 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInVariant}
          className="mb-12"
        >
          <Link href={`/payment?plan=${planId}&billing=${billingPeriod}${paymentMethod ? `&method=${paymentMethod}` : ''}${users ? `&users=${users}` : ''}`} className="inline-flex items-center mb-8 text-sm font-medium text-green-400 hover:text-green-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to payment methods
          </Link>
          
          <div className="max-w-md mx-auto text-center mb-8">
            <div className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
              <div className="flex items-center">
                <div className={`${getPaymentMethodIconBg()} w-6 h-6 rounded-full flex items-center justify-center mr-2`}>
                  {getPaymentMethodIcon()}
                </div>
                <span className="text-sm text-green-400 font-medium">{getPaymentMethodName()}</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Complete Your Payment</h1>
            <p className="text-gray-400">Enter your payment details to finalize your purchase</p>
          </div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={slideUpVariant}
                className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6 shadow-xl"
              >
                {renderPaymentForm()}
              </motion.div>
            </div>
            
            <div>
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={slideUpVariant}
                className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6 shadow-xl sticky top-6"
              >
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className={`flex items-center p-3 mb-6 rounded-lg bg-gradient-to-b ${getPaymentMethodColor()} border ${getPaymentMethodBorderColor()}`}>
                  <div className={`${getPaymentMethodIconBg()} w-10 h-10 rounded-lg flex items-center justify-center mr-3`}>
                    {getPaymentMethodIcon()}
                  </div>
                  <div>
                    <p className="font-medium">{getPaymentMethodName()}</p>
                    <p className="text-xs text-gray-400">Selected payment method</p>
                  </div>
                </div>
                
                <div className="border-b border-gray-800 pb-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Plan:</span>
                    <span className="font-medium">{planId ? `${planId.charAt(0).toUpperCase()}${planId.slice(1)}` : 'Standard'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Billing period:</span>
                    <span className="font-medium">{billingPeriod === 'annual' ? 'Annual' : 'Monthly'}</span>
                  </div>
                  
                  {users && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Users:</span>
                      <span className="font-medium">{users}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total:</span>
                  <span className="font-bold text-lg">
                    $149.99 USD
                    {billingPeriod === 'annual' && <span className="text-green-400 text-xs ml-2">(Saved 20%)</span>}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const PaymentProcessPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    }>
      <PaymentProcessContent />
    </Suspense>
  );
};

export default PaymentProcessPage; 