'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Users,
  UserPlus, 
  Trash2, 
  Search, 
  Download, 
  MoreHorizontal,
  Mail,
  Copy,
  CheckCircle,
  PlusCircle,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';

interface LicenseAssignment {
  id: string;
  email: string;
  status: 'active' | 'pending' | 'expired';
  assignedAt: string;
  lastActive?: string;
}

interface EnterpriseLicense {
  id: string;
  key: string;
  plan: string;
  totalSeats: number;
  usedSeats: number;
  status: 'active' | 'expired';
  issuedAt: string;
  expiresAt: string;
  assignments: LicenseAssignment[];
}

const EnterpriseDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [license, setLicense] = useState<EnterpriseLicense | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignError, setAssignError] = useState('');
  const [assignSuccess, setAssignSuccess] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if user just completed payment by looking for a query parameter
    const hasJustPaid = window.location.search.includes('newPurchase=true');
    if (hasJustPaid) {
      setShowWelcome(true);
      // Remove the query parameter to avoid showing the welcome message on refresh
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Simulate API call to fetch license data
    setTimeout(() => {
      const mockLicense: EnterpriseLicense = {
        id: 'ent-12345',
        key: 'JYVDS-ENT47-86GHT-PLM31-65QRT',
        plan: 'Enterprise',
        totalSeats: 25,
        usedSeats: 18,
        status: 'active',
        issuedAt: '2023-11-15',
        expiresAt: '2024-11-15',
        assignments: [
          { id: 'a1', email: 'john.smith@company.com', status: 'active', assignedAt: '2023-11-16', lastActive: '2024-05-22' },
          { id: 'a2', email: 'sarah.jones@company.com', status: 'active', assignedAt: '2023-11-16', lastActive: '2024-05-24' },
          { id: 'a3', email: 'raj.patel@company.com', status: 'active', assignedAt: '2023-11-17', lastActive: '2024-05-23' },
          { id: 'a4', email: 'emma.wilson@company.com', status: 'active', assignedAt: '2023-11-18', lastActive: '2024-05-21' },
          { id: 'a5', email: 'david.chen@company.com', status: 'active', assignedAt: '2023-11-20', lastActive: '2024-05-20' },
          { id: 'a6', email: 'maria.garcia@company.com', status: 'active', assignedAt: '2023-11-21', lastActive: '2024-05-19' },
          { id: 'a7', email: 'james.kim@company.com', status: 'active', assignedAt: '2023-11-22', lastActive: '2024-05-22' },
          { id: 'a8', email: 'olivia.brown@company.com', status: 'active', assignedAt: '2023-11-25', lastActive: '2024-05-18' },
          { id: 'a9', email: 'michael.taylor@company.com', status: 'active', assignedAt: '2023-11-28', lastActive: '2024-05-21' },
          { id: 'a10', email: 'sophia.nguyen@company.com', status: 'active', assignedAt: '2023-12-01', lastActive: '2024-05-23' },
          { id: 'a11', email: 'thomas.miller@company.com', status: 'active', assignedAt: '2023-12-05', lastActive: '2024-05-22' },
          { id: 'a12', email: 'isabella.williams@company.com', status: 'active', assignedAt: '2023-12-10', lastActive: '2024-05-20' },
          { id: 'a13', email: 'ethan.johnson@company.com', status: 'active', assignedAt: '2023-12-15', lastActive: '2024-05-21' },
          { id: 'a14', email: 'ava.martinez@company.com', status: 'active', assignedAt: '2024-01-05', lastActive: '2024-05-23' },
          { id: 'a15', email: 'noah.anderson@company.com', status: 'active', assignedAt: '2024-01-10', lastActive: '2024-05-22' },
          { id: 'a16', email: 'alex.roberts@company.com', status: 'pending', assignedAt: '2024-05-22' },
          { id: 'a17', email: 'grace.thompson@company.com', status: 'pending', assignedAt: '2024-05-23' },
          { id: 'a18', email: 'jason.clark@company.com', status: 'expired', assignedAt: '2023-11-18' }
        ]
      };
      
      setLicense(mockLicense);
      setLoading(false);
    }, 1500);
  }, []);
  
  const handleAssignLicense = () => {
    if (!newEmail) {
      setAssignError('Email address is required');
      return;
    }
    
    if (!isValidEmail(newEmail)) {
      setAssignError('Please enter a valid email address');
      return;
    }
    
    if (license && license.usedSeats >= license.totalSeats) {
      setAssignError('No available seats. Please upgrade your plan or revoke unused licenses.');
      return;
    }
    
    if (license && license.assignments.some(a => a.email === newEmail)) {
      setAssignError('This email already has a license assigned');
      return;
    }
    
    setIsAssigning(true);
    setAssignError('');
    
    // Simulate API call
    setTimeout(() => {
      if (license) {
        const newAssignment: LicenseAssignment = {
          id: `a${license.assignments.length + 1}`,
          email: newEmail,
          status: 'pending',
          assignedAt: new Date().toISOString().split('T')[0]
        };
        
        setLicense({
          ...license,
          usedSeats: license.usedSeats + 1,
          assignments: [...license.assignments, newAssignment]
        });
        
        setNewEmail('');
        setIsAssigning(false);
        setAssignSuccess(true);
        
        // Reset success message after 3 seconds
        setTimeout(() => {
          setAssignSuccess(false);
          setShowAssignModal(false);
        }, 3000);
      }
    }, 1500);
  };
  
  const handleRevokeLicense = () => {
    if (!selectedEmail) return;
    
    // Simulate API call
    setTimeout(() => {
      if (license) {
        const updatedAssignments = license.assignments.filter(a => a.email !== selectedEmail);
        
        setLicense({
          ...license,
          usedSeats: license.usedSeats - 1,
          assignments: updatedAssignments
        });
        
        setSelectedEmail('');
        setShowRevokeModal(false);
      }
    }, 1000);
  };
  
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const fadeUpVariant = {
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
  
  // Filter assignments based on search term
  const filteredAssignments = license?.assignments.filter(assignment => 
    assignment.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  if (!license) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">No Enterprise License Found</h2>
          <p className="text-gray-400 mb-6">You don't have an active enterprise license.</p>
          <Link href="/pricing" className="py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors">
            View Enterprise Plans
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-black text-white pb-12">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
        <div className="absolute top-20 left-1/4 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start">
              <div className="bg-purple-500/20 p-3 rounded-full mr-4">
                <CheckCircle className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Welcome to your Enterprise Dashboard!</h2>
                <p className="text-gray-300 mb-4">
                  Your enterprise license has been activated. You can now start assigning licenses to your team members.
                </p>
                <button 
                  onClick={() => setShowWelcome(false)}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariant}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 backdrop-blur-sm rounded-full">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-sm text-purple-400 font-medium">Enterprise Dashboard</span>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">License Management</h1>
              <p className="text-gray-400">Manage your team's JyvDesktop licenses</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowAssignModal(true)}
                className="py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-lg font-medium transition-all flex items-center justify-center"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Assign License
              </button>
              
              <Link href="/download" className="py-2 px-4 bg-gradient-to-b from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-medium transition-all border border-gray-700 flex items-center justify-center">
                <Download className="mr-2 h-5 w-5" />
                Download Installer
              </Link>
            </div>
          </div>
          
          {/* License summary card */}
          <motion.div 
            variants={fadeUpVariant}
            className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl p-6 shadow-xl mb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="text-gray-400 text-sm mb-1">License Key</h3>
                <div className="flex items-center">
                  <div className="font-mono text-sm mr-2 truncate">{license.key}</div>
                  <button 
                    onClick={() => navigator.clipboard.writeText(license.key)}
                    className="text-purple-400 hover:text-purple-300"
                    title="Copy license key"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Plan</h3>
                <div className="flex items-center">
                  <Building className="h-5 w-5 mr-2 text-purple-400" />
                  <span className="font-medium">{license.plan}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Status</h3>
                <div className="flex items-center">
                  {license.status === 'active' ? (
                    <div className="flex items-center bg-green-500/10 text-green-400 border border-green-500/20 py-1 px-3 rounded-full text-sm">
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      <span>Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center bg-amber-500/10 text-amber-400 border border-amber-500/20 py-1 px-3 rounded-full text-sm">
                      <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                      <span>Expired</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Valid Until</h3>
                <div className="font-medium">{formatDate(license.expiresAt)}</div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-purple-400 mr-2" />
                  <span className="text-gray-300">License Seats</span>
                </div>
                
                <div className="flex items-center">
                  <div className="mr-4 text-sm">
                    <span className="text-white font-medium">{license.usedSeats}</span>
                    <span className="text-gray-400 mx-1">/</span>
                    <span className="text-gray-400">{license.totalSeats} used</span>
                  </div>
                  
                  <div className="w-48 bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${(license.usedSeats / license.totalSeats) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* License Assignments */}
          <motion.div
            variants={fadeUpVariant}
            className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden shadow-xl"
          >
            <div className="p-6 border-b border-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-bold">Team Members</h2>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
                  />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/30 text-left">
                  <tr>
                    <th className="px-6 py-3 text-sm font-medium text-gray-400">Email</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-400">Status</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-400">Assigned On</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-400">Last Active</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredAssignments && filteredAssignments.length > 0 ? (
                    filteredAssignments.map((assignment) => (
                      <motion.tr 
                        key={assignment.id} 
                        className="transition-colors hover:bg-gray-800/20"
                        variants={fadeUpVariant}
                        initial="hidden"
                        animate="visible"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-500 mr-2" />
                            <span>{assignment.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {assignment.status === 'active' && (
                            <div className="bg-green-500/10 text-green-400 border border-green-500/20 py-1 px-3 rounded-full text-sm inline-flex items-center">
                              <CheckCircle className="h-3.5 w-3.5 mr-1" />
                              <span>Active</span>
                            </div>
                          )}
                          {assignment.status === 'pending' && (
                            <div className="bg-blue-500/10 text-blue-400 border border-blue-500/20 py-1 px-3 rounded-full text-sm inline-flex items-center">
                              <RefreshCw className="h-3.5 w-3.5 mr-1" />
                              <span>Pending</span>
                            </div>
                          )}
                          {assignment.status === 'expired' && (
                            <div className="bg-amber-500/10 text-amber-400 border border-amber-500/20 py-1 px-3 rounded-full text-sm inline-flex items-center">
                              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                              <span>Expired</span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-300">{formatDate(assignment.assignedAt)}</td>
                        <td className="px-6 py-4 text-gray-300">
                          {assignment.lastActive ? formatDate(assignment.lastActive) : 'Never'}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              setSelectedEmail(assignment.email);
                              setShowRevokeModal(true);
                            }}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Revoke license"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                        {searchTerm ? 'No results found. Try a different search term.' : 'No licenses assigned yet.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Assign License Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-xl max-w-md w-full overflow-hidden shadow-xl"
          >
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-xl font-bold">Assign License</h3>
            </div>
            
            <div className="p-6">
              {assignSuccess ? (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-full mb-4">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">License Assigned!</h4>
                  <p className="text-gray-400">An invitation has been sent to {newEmail}</p>
                </div>
              ) : (
                <>
                  <p className="text-gray-400 mb-6">
                    Assign a license to a team member. They will receive an email with instructions to activate their license.
                  </p>
                  
                  {assignError && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                      {assignError}
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-400 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="team.member@company.com"
                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-4">
                    <div className="text-sm text-gray-400">
                      {license.totalSeats - license.usedSeats} seats remaining
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setShowAssignModal(false)}
                        className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      
                      <button
                        onClick={handleAssignLicense}
                        disabled={isAssigning}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-lg transition-colors flex items-center"
                      >
                        {isAssigning ? (
                          <>
                            <RefreshCw className="animate-spin mr-2 h-4 w-4" />
                            Assigning...
                          </>
                        ) : (
                          <>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Assign License
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Revoke License Modal */}
      {showRevokeModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-xl max-w-md w-full overflow-hidden shadow-xl"
          >
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-xl font-bold">Revoke License</h3>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mx-auto mb-6">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              
              <h4 className="text-lg font-medium mb-2 text-center">Are you sure?</h4>
              <p className="text-gray-400 text-center mb-6">
                You are about to revoke the license from <span className="text-white font-medium">{selectedEmail}</span>. 
                They will immediately lose access to JyvDesktop.
              </p>
              
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setShowRevokeModal(false)}
                  className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleRevokeLicense}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Revoke License
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
};

export default EnterpriseDashboard; 