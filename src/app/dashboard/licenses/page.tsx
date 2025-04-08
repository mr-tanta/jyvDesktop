'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Key, Download, RefreshCw, Clock, Check, X, AlertTriangle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface License {
  id: string;
  key: string;
  product: string;
  plan: string;
  status: 'active' | 'expired' | 'revoked';
  issued: string;
  expires: string;
  activations: number;
  maxActivations: number;
  renewalPrice: number;
  currency: string;
}

const LicensesDashboard = () => {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLicense, setSelectedLicense] = useState<string | null>(null);
  const [renewingLicense, setRenewingLicense] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate API call to fetch licenses
    setTimeout(() => {
      const mockLicenses: License[] = [
        {
          id: '1',
          key: 'JYVDS-X7TYH-P9M2K-3F5RT-QWE45',
          product: 'JyvDesktop',
          plan: 'Pro',
          status: 'active',
          issued: '2023-12-15',
          expires: '2024-12-15',
          activations: 2,
          maxActivations: 3,
          renewalPrice: 149.99,
          currency: 'USD'
        },
        {
          id: '2',
          key: 'JYVDS-ZX98Y-45THR-87UIK-PLM23',
          product: 'JyvDesktop',
          plan: 'Enterprise',
          status: 'active',
          issued: '2023-11-10',
          expires: '2024-11-10',
          activations: 8,
          maxActivations: 10,
          renewalPrice: 299.99,
          currency: 'USD'
        },
        {
          id: '3',
          key: 'JYVDS-QW456-ER789-TY123-UI789',
          product: 'JyvDesktop',
          plan: 'Standard',
          status: 'expired',
          issued: '2023-05-20',
          expires: '2024-05-20',
          activations: 1,
          maxActivations: 1,
          renewalPrice: 99.99,
          currency: 'USD'
        }
      ];
      
      setLicenses(mockLicenses);
      setLoading(false);
    }, 1500);
  }, []);
  
  const handleRenewLicense = (licenseId: string) => {
    setRenewingLicense(licenseId);
    
    // Simulate renewal process
    setTimeout(() => {
      setLicenses(licenses.map(license => {
        if (license.id === licenseId) {
          const expiryDate = new Date(license.expires);
          expiryDate.setFullYear(expiryDate.getFullYear() + 1);
          
          return {
            ...license,
            status: 'active',
            expires: expiryDate.toISOString().split('T')[0]
          };
        }
        return license;
      }));
      
      setRenewingLicense(null);
    }, 2000);
  };
  
  const toggleLicenseDetails = (licenseId: string) => {
    if (selectedLicense === licenseId) {
      setSelectedLicense(null);
    } else {
      setSelectedLicense(licenseId);
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'expired':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'revoked':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Check className="h-4 w-4" />;
      case 'expired':
        return <Clock className="h-4 w-4" />;
      case 'revoked':
        return <X className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };
  
  const getDaysRemaining = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
  
  const staggerContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const licenseItemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-green-400 font-medium">My Licenses</span>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">License Management</h1>
              <p className="text-gray-400">Manage your JyvDesktop licenses and activations</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/pricing" className="py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-all flex items-center justify-center">
                <Key className="mr-2 h-5 w-5" />
                Purchase New License
              </Link>
              
              <Link href="/download" className="py-2 px-4 bg-gradient-to-b from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-medium transition-all border border-gray-700 flex items-center justify-center">
                <Download className="mr-2 h-5 w-5" />
                Download JyvDesktop
              </Link>
            </div>
          </div>
          
          {licenses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-8 shadow-xl text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-6">
                <Key className="h-8 w-8 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No Licenses Found</h2>
              <p className="text-gray-400 mb-6">You don't have any licenses yet. Purchase a license to get started.</p>
              <Link href="/pricing" className="py-2 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-all inline-flex items-center">
                Browse Plans
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainerVariant}
              className="space-y-6"
            >
              {licenses.map(license => (
                <motion.div
                  key={license.id}
                  variants={licenseItemVariant}
                  className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl shadow-xl overflow-hidden"
                >
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-800/20 transition-colors flex flex-col md:flex-row md:items-center md:justify-between"
                    onClick={() => toggleLicenseDetails(license.id)}
                  >
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center mb-2">
                        <div className="mr-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 p-2 rounded-lg">
                          <Key className="h-6 w-6 text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{license.product} {license.plan}</h3>
                          <p className="text-gray-400 text-sm">License ID: {license.id}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <div className={`inline-flex items-center py-1 px-3 rounded-full ${getStatusColor(license.status)}`}>
                          {getStatusIcon(license.status)}
                          <span className="ml-1 capitalize">{license.status}</span>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Activations</p>
                        <p className="font-medium">{license.activations}/{license.maxActivations}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Issued</p>
                        <p className="font-medium">{formatDate(license.issued)}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Expires</p>
                        <p className={`font-medium ${getDaysRemaining(license.expires) < 30 ? 'text-amber-400' : ''}`}>
                          {formatDate(license.expires)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center md:justify-end mt-4 md:mt-0">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <ChevronRight className={`h-6 w-6 transform transition-transform ${selectedLicense === license.id ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  </div>
                  
                  {selectedLicense === license.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-800 p-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-4 text-lg">License Details</h4>
                          
                          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-400">License Key:</span>
                              <button 
                                className="text-xs text-green-400 hover:text-green-300"
                                onClick={() => navigator.clipboard.writeText(license.key)}
                              >
                                Copy
                              </button>
                            </div>
                            <div className="font-mono text-sm break-all select-all text-white">{license.key}</div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                              <p className="text-sm text-gray-400 mb-1">Product</p>
                              <p className="font-medium">{license.product}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400 mb-1">Plan</p>
                              <p className="font-medium">{license.plan}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400 mb-1">Status</p>
                              <div className={`inline-flex items-center py-1 px-3 rounded-full ${getStatusColor(license.status)}`}>
                                {getStatusIcon(license.status)}
                                <span className="ml-1 capitalize">{license.status}</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400 mb-1">Activations</p>
                              <p className="font-medium">{license.activations}/{license.maxActivations}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-4 text-lg">Validity</h4>
                          
                          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-400 mb-1">Issue Date</p>
                                <p className="font-medium">{formatDate(license.issued)}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400 mb-1">Expiry Date</p>
                                <p className={`font-medium ${getDaysRemaining(license.expires) < 30 ? 'text-amber-400' : ''}`}>
                                  {formatDate(license.expires)}
                                </p>
                              </div>
                            </div>
                            
                            {license.status === 'active' && (
                              <div className="mt-2">
                                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                    style={{ 
                                      width: `${Math.max(0, Math.min(100, (getDaysRemaining(license.expires) / 365) * 100))}%` 
                                    }}
                                  ></div>
                                </div>
                                <div className="flex justify-between mt-1">
                                  <span className="text-xs text-gray-500">
                                    {getDaysRemaining(license.expires)} days remaining
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    1 year
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {(license.status === 'expired' || getDaysRemaining(license.expires) < 30) && (
                            <div>
                              <h4 className="font-medium mb-4 text-lg">Renewal</h4>
                              
                              <div className="bg-gradient-to-b from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-lg p-4 mb-6">
                                {license.status === 'expired' ? (
                                  <p className="text-sm text-amber-300 mb-3">
                                    Your license has expired. Renew now to continue using {license.product}.
                                  </p>
                                ) : (
                                  <p className="text-sm text-amber-300 mb-3">
                                    Your license will expire soon. Renew early to avoid interruption.
                                  </p>
                                )}
                                
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-white font-medium">Renewal Price:</span>
                                  <span className="font-bold">${license.renewalPrice} {license.currency}</span>
                                </div>
                                
                                <button
                                  onClick={() => handleRenewLicense(license.id)}
                                  disabled={renewingLicense === license.id}
                                  className="w-full py-2 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-medium transition-all flex items-center justify-center"
                                >
                                  {renewingLicense === license.id ? (
                                    <>
                                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                      Processing...
                                    </>
                                  ) : (
                                    'Renew License'
                                  )}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mt-6 border-t border-gray-800 pt-6">
                        <button className="py-2 px-4 bg-gradient-to-b from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-medium transition-all border border-gray-700 flex items-center justify-center">
                          <Download className="mr-2 h-5 w-5" />
                          Download License File
                        </button>
                        
                        <button className="py-2 px-4 bg-gradient-to-b from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-medium transition-all border border-gray-700 flex items-center justify-center">
                          View Devices
                        </button>
                        
                        <button className="py-2 px-4 bg-gradient-to-b from-red-900/50 to-red-950/50 hover:from-red-800/50 hover:to-red-900/50 text-red-400 rounded-lg font-medium transition-all border border-red-800/30 flex items-center justify-center ml-auto">
                          Deactivate License
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default LicensesDashboard; 