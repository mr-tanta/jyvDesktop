'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, Bitcoin, Wand2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PlanDetails {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  currency: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  borderColor: string;
  iconBg: string;
}

const PaymentContent = () => {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan');
  const billingPeriod = searchParams.get('billing') || 'monthly';
  const returnMethod = searchParams.get('method');
  const returnUsers = searchParams.get('users') ? parseInt(searchParams.get('users') || '10', 10) : 10;
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(returnMethod);
  const [planDetails, setPlanDetails] = useState<PlanDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [enterpriseUsers, setEnterpriseUsers] = useState(planId === 'enterprise' && returnUsers ? returnUsers : 10);
  
  useEffect(() => {
    // In a real app, you'd fetch this from an API
    const plans: Record<string, PlanDetails> = {
      basic: {
        id: 'basic',
        name: 'Standard',
        monthlyPrice: 9.99,
        annualPrice: 7.99 * 12,
        currency: 'USD'
      },
      pro: {
        id: 'pro',
        name: 'Pro',
        monthlyPrice: 19.99,
        annualPrice: 15.99 * 12,
        currency: 'USD'
      },
      enterprise: {
        id: 'enterprise',
        name: 'Enterprise',
        monthlyPrice: 14.99,
        annualPrice: 11.99 * 12,
        currency: 'USD'
      }
    };
    
    if (planId && plans[planId]) {
      setPlanDetails(plans[planId]);
    } else {
      // Redirect to pricing if no valid plan
      window.location.href = '/pricing';
    }
    
    setLoading(false);
  }, [planId]);
  
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'stripe',
      name: 'Stripe',
      icon: <CreditCard className="h-6 w-6" />,
      description: 'Pay with credit or debit card via Stripe',
      color: 'from-blue-500/10 to-blue-600/5',
      borderColor: 'border-blue-500/20',
      iconBg: 'bg-blue-500/20'
    },
    {
      id: 'paystack',
      name: 'Paystack',
      icon: <CreditCard className="h-6 w-6" />,
      description: 'Secure payment with Paystack',
      color: 'from-purple-500/10 to-purple-600/5',
      borderColor: 'border-purple-500/20',
      iconBg: 'bg-purple-500/20'
    },
    {
      id: 'flutterwave',
      name: 'Flutterwave',
      icon: <DollarSign className="h-6 w-6" />,
      description: 'Fast and secure payments with Flutterwave',
      color: 'from-amber-500/10 to-amber-600/5',
      borderColor: 'border-amber-500/20',
      iconBg: 'bg-amber-500/20'
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      icon: <Bitcoin className="h-6 w-6" />,
      description: 'Pay with cryptocurrency',
      color: 'from-green-500/10 to-green-600/5',
      borderColor: 'border-green-500/20',
      iconBg: 'bg-green-500/20'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <CreditCard className="h-6 w-6" />,
      description: 'Pay with your PayPal account',
      color: 'from-indigo-500/10 to-indigo-600/5',
      borderColor: 'border-indigo-500/20',
      iconBg: 'bg-indigo-500/20'
    }
  ];
  
  const selectPaymentMethod = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };
  
  const handleEnterpriseUsersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 5) {
      setEnterpriseUsers(value);
    }
  };
  
  // Animation variants
  const fadeInUpVariant = {
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
  
  if (!planDetails) {
    return null;
  }
  
  const price = billingPeriod === 'annual' ? planDetails.annualPrice : planDetails.monthlyPrice;
  const enterpriseTotalCost = planId === 'enterprise' ? (billingPeriod === 'annual' ? planDetails.annualPrice / 12 : planDetails.monthlyPrice) * enterpriseUsers : 0;
  
  return (
    <main className="min-h-screen bg-black text-white pb-12">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-green-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
        <div className="absolute top-20 left-1/4 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariant}
          className="mb-12"
        >
          <Link href="/pricing" className="inline-flex items-center mb-8 text-sm font-medium text-green-400 hover:text-green-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to pricing
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-green-400 font-medium">Complete Your Purchase</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Checkout</h1>
            <p className="text-gray-400 mb-10">Choose your payment method to complete your purchase and get immediate access to JyvDesktop</p>
          </div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6 shadow-xl mb-8"
            >
              <h2 className="text-xl font-bold mb-6">Select Payment Method</h2>
              
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id}
                    className={`bg-gradient-to-b ${method.color} border ${
                      selectedPaymentMethod === method.id 
                        ? 'border-green-500' 
                        : method.borderColor
                    } rounded-xl p-5 cursor-pointer transition-all hover:border-green-500/50`}
                    onClick={() => selectPaymentMethod(method.id)}
                  >
                    <div className="flex items-center mb-3">
                      <div className={`${method.iconBg} w-10 h-10 rounded-lg flex items-center justify-center mr-3`}>
                        {method.icon}
                      </div>
                      <h3 className="font-bold">{method.name}</h3>
                    </div>
                    <p className="text-sm text-gray-300">{method.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {planId === 'enterprise' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6 shadow-xl"
              >
                <h2 className="text-xl font-bold mb-4">Number of Users</h2>
                <p className="text-gray-400 text-sm mb-6">Enterprise licenses are priced per user. Adjust the number of users for your organization.</p>
                
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Users:</span>
                    <span className="font-medium">{enterpriseUsers} users</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    value={enterpriseUsers}
                    onChange={handleEnterpriseUsersChange}
                    className="w-full h-2 rounded-full appearance-none bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    style={{
                      backgroundImage: `linear-gradient(to right, #22c55e ${(enterpriseUsers - 5) / 95 * 100}%, #374151 ${(enterpriseUsers - 5) / 95 * 100}%)`
                    }}
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>5 users</span>
                    <span>100 users</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6 shadow-xl sticky top-6"
            >
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="border-b border-gray-800 pb-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Plan:</span>
                  <span className="font-medium">{planDetails.name}</span>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Billing period:</span>
                  <span className="font-medium">{billingPeriod === 'annual' ? 'Annual' : 'Monthly'}</span>
                </div>
                
                {planId === 'enterprise' && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Number of users:</span>
                    <span className="font-medium">{enterpriseUsers}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
                  <span className="text-gray-400">Total:</span>
                  <span className="font-bold text-lg">
                    ${planId === 'enterprise' ? enterpriseTotalCost.toFixed(2) : price.toFixed(2)} {planDetails.currency}
                    {billingPeriod === 'annual' && <span className="text-green-400 text-xs ml-2">(Save 20%)</span>}
                  </span>
                </div>
              </div>
              
              <button
                disabled={!selectedPaymentMethod}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center ${
                  selectedPaymentMethod 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white cursor-pointer' 
                    : 'bg-gray-800 text-gray-400 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (selectedPaymentMethod) {
                    window.location.href = `/payment/process?plan=${planId}&billing=${billingPeriod}&method=${selectedPaymentMethod}${planId === 'enterprise' ? `&users=${enterpriseUsers}` : ''}`;
                  }
                }}
              >
                <Wand2 className="mr-2 h-5 w-5" />
                Proceed to Payment
              </button>
              
              <div className="flex items-center justify-center mt-6 text-xs text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure payment processing
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  By completing this purchase, you agree to our 
                  <a href="#" className="text-green-400 hover:text-green-300 ml-1">Terms of Service</a> and 
                  <a href="#" className="text-green-400 hover:text-green-300 ml-1">Privacy Policy</a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

const PaymentPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
};

export default PaymentPage; 