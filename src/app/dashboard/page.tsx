'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Check, 
  Calendar, 
  Download, 
  RefreshCw, 
  Key, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle,
  Settings,
  CreditCard,
  User,
  LogOut,
  HelpCircle
} from 'lucide-react';

interface License {
  key: string;
  plan: string;
  status: 'active' | 'expired' | 'pending';
  validUntil: string;
  devices: string[];
  billingPeriod: 'monthly' | 'annual';
  nextBillingDate: string;
  autoRenew: boolean;
}

const Dashboard = () => {
  // In a real app, this would be fetched from a backend
  const [license, setLicense] = useState<License | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRenewOptions, setShowRenewOptions] = useState(false);
  const [activeTab, setActiveTab] = useState('license');

  useEffect(() => {
    // Simulate loading license data
    setTimeout(() => {
      const mockLicense: License = {
        key: 'ABCDE-12345-FGHIJ-67890-KLMNO',
        plan: 'Pro',
        status: 'active',
        validUntil: '2025-04-07',
        devices: ['MacBook Pro', 'iMac'],
        billingPeriod: 'annual',
        nextBillingDate: '2025-04-07',
        autoRenew: true
      };
      
      setLicense(mockLicense);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleAutoRenew = () => {
    if (license) {
      setLicense({
        ...license,
        autoRenew: !license.autoRenew
      });
    }
  };
  
  const calculateDaysRemaining = (dateString: string) => {
    const today = new Date();
    const expiryDate = new Date(dateString);
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  const renewLicense = (period: 'monthly' | 'annual') => {
    // In a real app, this would redirect to payment page or process payment
    if (license) {
      window.location.href = `/payment?plan=${license.plan.toLowerCase()}&billing=${period}`;
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!license) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-8 flex flex-col items-center justify-center">
        <AlertCircle className="h-16 w-16 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">No Active License Found</h1>
        <p className="text-gray-400 mb-6 text-center max-w-md">
          You don't have any active licenses. Please purchase a license to use JyvDesktop.
        </p>
        <Link href="/pricing" className="py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium">
          View Pricing Plans
        </Link>
      </div>
    );
  }
  
  const daysRemaining = calculateDaysRemaining(license.validUntil);
  const isCloseToExpiry = daysRemaining <= 30;
  
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">JyvDesktop</div>
            <div className="px-2 py-1 bg-blue-900 text-blue-300 text-xs rounded-md">{license.plan}</div>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link href="/download" className="text-gray-300 hover:text-white flex items-center">
              <Download className="h-5 w-5 mr-1" />
              <span>Downloads</span>
            </Link>
            <div className="relative group">
              <button className="text-gray-300 hover:text-white flex items-center">
                <User className="h-5 w-5 mr-1" />
                <span>Account</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  Profile Settings
                </Link>
                <Link href="/billing" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  Billing History
                </Link>
                <Link href="/logout" className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-700">
                  Sign Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-gray-400">Manage your JyvDesktop license and account</p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-800 mb-6">
          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === 'license' 
                ? 'text-blue-400 border-b-2 border-blue-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('license')}
          >
            License Information
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === 'devices' 
                ? 'text-blue-400 border-b-2 border-blue-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('devices')}
          >
            Devices
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === 'billing' 
                ? 'text-blue-400 border-b-2 border-blue-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('billing')}
          >
            Billing & Renewal
          </button>
        </div>
        
        {/* License Tab Content */}
        {activeTab === 'license' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">License Information</h2>
                    <p className="text-gray-400 text-sm">Details about your current license</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    license.status === 'active' 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-red-900/30 text-red-400'
                  }`}>
                    {license.status === 'active' ? 'Active' : 'Expired'}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">License Key:</div>
                    <div className="font-mono bg-gray-800 p-3 rounded-md text-blue-300 text-sm break-all flex justify-between items-center">
                      {license.key}
                      <button 
                        className="p-1.5 hover:bg-gray-700 rounded-md transition-colors"
                        onClick={() => navigator.clipboard.writeText(license.key)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Plan:</div>
                      <div className="font-medium">{license.plan}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Billing Period:</div>
                      <div className="font-medium capitalize">{license.billingPeriod}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Valid Until:</div>
                      <div className="font-medium">{formatDate(license.validUntil)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Auto-Renew:</div>
                      <div className="font-medium">{license.autoRenew ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h2 className="text-xl font-semibold mb-4">License Status</h2>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Validity Period:</span>
                    <span className="font-medium">{daysRemaining} days remaining</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${isCloseToExpiry ? 'bg-yellow-500' : 'bg-blue-500'}`}
                      style={{ width: `${Math.min(100, (daysRemaining / 365) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Quick Actions</h3>
                  
                  <div className="space-y-2">
                    <Link href="/download" className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium flex items-center justify-center">
                      <Download className="h-4 w-4 mr-2" />
                      Download Software
                    </Link>
                    
                    <button onClick={() => setShowRenewOptions(true)} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center justify-center">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Renew License
                    </button>
                    
                    <Link href="/support" className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium flex items-center justify-center">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Get Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Devices Tab Content */}
        {activeTab === 'devices' && (
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">Registered Devices</h2>
                <p className="text-gray-400 text-sm">Manage devices using your license</p>
              </div>
              
              <button className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium">
                Add New Device
              </button>
            </div>
            
            <div className="space-y-4">
              {license.devices.map((device, index) => (
                <div key={index} className="p-4 border border-gray-800 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 p-3 bg-gray-800 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">{device}</div>
                      <div className="text-xs text-gray-400">Last used: Today at 2:30 PM</div>
                    </div>
                  </div>
                  
                  <button className="text-red-400 hover:text-red-300 text-sm">
                    Deactivate
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 border border-gray-800 rounded-lg bg-gray-900/50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Device Limit</h3>
                <span className="text-sm text-gray-400">{license.devices.length} / 3 devices</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${(license.devices.length / 3) * 100}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Your {license.plan} plan allows activation on up to 3 devices simultaneously.
              </p>
            </div>
          </div>
        )}
        
        {/* Billing Tab Content */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Subscription Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-gray-400 text-sm mb-1">Current Plan:</div>
                  <div className="font-medium text-lg">{license.plan}</div>
                </div>
                
                <div>
                  <div className="text-gray-400 text-sm mb-1">Billing Cycle:</div>
                  <div className="font-medium text-lg capitalize">{license.billingPeriod}</div>
                </div>
                
                <div>
                  <div className="text-gray-400 text-sm mb-1">Next Billing Date:</div>
                  <div className="font-medium text-lg">{formatDate(license.nextBillingDate)}</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 border border-gray-800 rounded-lg bg-gray-900/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <RefreshCw className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <div className="font-medium">Auto-Renewal</div>
                      <div className="text-sm text-gray-400">Your subscription will {license.autoRenew ? 'automatically renew' : 'not renew'}</div>
                    </div>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={license.autoRenew}
                      onChange={toggleAutoRenew}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Renew Your License</h2>
                  <p className="text-gray-400 text-sm">Extend your subscription before it expires</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-800 rounded-lg p-4 hover:border-blue-500/50 hover:bg-blue-900/10 transition-colors cursor-pointer" onClick={() => renewLicense('monthly')}>
                  <div className="font-medium mb-1">Monthly Plan</div>
                  <div className="text-2xl font-bold mb-2">$19.99 <span className="text-sm font-normal text-gray-400">/month</span></div>
                  <p className="text-sm text-gray-400 mb-4">Renew on a monthly basis with maximum flexibility</p>
                  <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium">
                    Renew Monthly
                  </button>
                </div>
                
                <div className="border border-gray-800 rounded-lg p-4 hover:border-green-500/50 hover:bg-green-900/10 transition-colors cursor-pointer relative" onClick={() => renewLicense('annual')}>
                  <div className="absolute -top-3 right-4 bg-green-600 text-xs px-2 py-1 rounded-md font-medium">SAVE 20%</div>
                  <div className="font-medium mb-1">Annual Plan</div>
                  <div className="text-2xl font-bold mb-2">$15.99 <span className="text-sm font-normal text-gray-400">/month</span></div>
                  <p className="text-sm text-gray-400 mb-4">$191.88 billed annually. Our most popular option!</p>
                  <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium">
                    Renew Annually
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
              
              <div className="border border-gray-800 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-gray-800 rounded-lg">
                    <CreditCard className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium">Visa ending in 4242</div>
                    <div className="text-xs text-gray-400">Expires 12/2025</div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-400">
                  Default
                </div>
              </div>
              
              <button className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Payment Method
              </button>
            </div>
          </div>
        )}
        
        {/* Renewal Modal */}
        {showRenewOptions && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-xl max-w-md w-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Renew Your License</h3>
                <button 
                  onClick={() => setShowRenewOptions(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-400 mb-6">Choose a renewal option below:</p>
              
              <div className="space-y-4">
                <div 
                  onClick={() => renewLicense('monthly')}
                  className="border border-gray-800 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-900/20 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Monthly Plan</div>
                    <div className="text-blue-400">$19.99/month</div>
                  </div>
                  <p className="text-sm text-gray-400">Renew on a monthly basis</p>
                </div>
                
                <div 
                  onClick={() => renewLicense('annual')}
                  className="border border-gray-800 rounded-lg p-4 hover:border-green-500 hover:bg-green-900/20 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Annual Plan</div>
                    <div>
                      <span className="text-green-400">$15.99/month</span>
                      <span className="text-xs text-gray-400 ml-1">($191.88 billed annually)</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Save 20% with annual billing</p>
                </div>
              </div>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                Click on a plan to proceed to payment
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 