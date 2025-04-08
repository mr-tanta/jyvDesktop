'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Check,
    X,
    HelpCircle,
    Building,
    User,
    CreditCard,
    Shield,
    Star,
    Download,
    FileText,
    MessageSquare,
    Zap,
    Settings,
    Users,
    Workflow,
    ClipboardCheck,
    Volume2,
    Crown,
    Headphones,
    ArrowRight,
    BarChart4
} from 'lucide-react';

// Pricing plans data structure
const plans = [
    {
        id: 'basic',
        name: 'Standard',
        for: 'For individual creators & professionals',
        monthlyPrice: 9.99,
        annualPrice: 7.99, // 20% off
        description: 'Perfect for solo content creators, remote workers, and gamers.',
        cta: 'Get Started',
        ctaLink: '/payment?plan=basic&billing=monthly',
        popular: false,
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-blue-400',
        icon: <User size={24} />,
        borderColor: 'border-blue-500/20',
        gradientFrom: 'from-blue-950/30',
        highlightPoints: [
            'AI Noise Suppression (70% reduction)',
            'Basic EQ & Audio Enhancement',
            '2 Device Support',
            'Regular Updates'
        ],
        features: [] // Will be populated
    },
    {
        id: 'pro',
        name: 'Pro',
        for: 'For serious content creators & audiophiles',
        monthlyPrice: 19.99,
        annualPrice: 15.99, // 20% off
        description: 'Advanced audio tools for professionals who need the best sound quality.',
        cta: 'Get Pro',
        ctaLink: '/payment?plan=pro&billing=monthly',
        popular: true,
        iconBg: 'bg-green-500/10',
        iconColor: 'text-green-400',
        icon: <Crown size={24} />,
        borderColor: 'border-green-500/20',
        gradientFrom: 'from-green-950/30',
        highlightPoints: [
            'AI Noise Suppression (95% reduction)',
            'Advanced 10-band Parametric EQ',
            'Multi-device & VST Support',
            'Priority Support & Updates'
        ],
        features: [] // Will be populated
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        for: 'For teams & organizations',
        monthlyPrice: 14.99, // per user
        annualPrice: 11.99, // per user, 20% off
        description: 'Custom deployment with team management and advanced security features.',
        cta: 'Select Users & Continue',
        ctaLink: '/payment?plan=enterprise&billing=monthly',
        popular: false,
        minUsers: 5,
        iconBg: 'bg-purple-500/10',
        iconColor: 'text-purple-400',
        icon: <Building size={24} />,
        borderColor: 'border-purple-500/20',
        gradientFrom: 'from-purple-950/30',
        highlightPoints: [
            'Team License Management',
            'Centralized Deployment',
            'SSO & Admin Controls',
            'Dedicated Support & Training'
        ],
        features: [] // Will be populated
    }
];

// Feature details organized by category
const featuresByCategory = [
    {
        category: 'Core Audio Tools',
        icon: <Headphones size={20} className="text-gray-400" />,
        features: [
            { name: 'Application Volume Control', basic: true, pro: true, enterprise: true },
            { name: 'AI Noise Suppression', basic: '70% reduction', pro: '95% reduction', enterprise: '95% reduction' },
            { name: 'Spatial Audio', basic: 'Basic positioning', pro: 'Advanced HRTF profiles', enterprise: 'Advanced HRTF profiles' },
            { name: 'Voice Isolation', basic: true, pro: 'Enhanced', enterprise: 'Enhanced' },
            { name: 'Audio Enhancement', basic: '5-band EQ', pro: '10-band parametric EQ', enterprise: '10-band parametric EQ' },
            { name: 'Auto-level balancing', basic: true, pro: true, enterprise: true }
        ]
    },
    {
        category: 'Performance & Profiles',
        icon: <Zap size={20} className="text-gray-400" />,
        features: [
            { name: 'Processing Latency', basic: '<20ms', pro: '<10ms', enterprise: '<10ms' },
            { name: 'Custom Audio Profiles', basic: '3 profiles', pro: 'Unlimited', enterprise: 'Unlimited' },
            { name: 'Audio Routing', basic: 'Basic', pro: 'Advanced', enterprise: 'Advanced cross-app routing' },
            { name: 'Custom DSP Chain', basic: false, pro: true, enterprise: true },
            { name: 'Room Acoustics Simulation', basic: false, pro: true, enterprise: true },
            { name: 'Multi-device Support', basic: '2 devices', pro: 'Unlimited devices', enterprise: 'Unlimited devices' }
        ]
    },
    {
        category: 'Professional Tools',
        icon: <Settings size={20} className="text-gray-400" />,
        features: [
            { name: 'VST/AU Plugin Support', basic: false, pro: true, enterprise: true },
            { name: 'Compressor/Limiter/Gate', basic: 'Basic', pro: 'Multi-band', enterprise: 'Multi-band' },
            { name: 'De-esser & De-reverb', basic: false, pro: true, enterprise: true },
            { name: 'Audio Analytics Dashboard', basic: 'Basic metrics', pro: 'Advanced analytics', enterprise: 'Advanced analytics' },
            { name: 'Remote Device Control', basic: false, pro: true, enterprise: true },
            { name: 'API Access', basic: false, pro: 'Limited', enterprise: 'Full access' }
        ]
    },
    {
        category: 'Collaboration & Team',
        icon: <Users size={20} className="text-gray-400" />,
        features: [
            { name: 'Team Presets Sharing', basic: false, pro: 'Limited', enterprise: true },
            { name: 'User Roles & Permissions', basic: false, pro: false, enterprise: true },
            { name: 'Centralized Deployment', basic: false, pro: false, enterprise: true },
            { name: 'Admin Dashboard', basic: false, pro: false, enterprise: true },
            { name: 'Usage Analytics', basic: false, pro: 'Personal only', enterprise: true },
            { name: 'SSO Integration', basic: false, pro: false, enterprise: true }
        ]
    },
    {
        category: 'Support & Updates',
        icon: <MessageSquare size={20} className="text-gray-400" />,
        features: [
            { name: 'Customer Support', basic: 'Email support', pro: 'Priority support', enterprise: '24/7 dedicated support' },
            { name: 'Updates & New Features', basic: 'Regular updates', pro: 'Priority access', enterprise: 'Priority access' },
            { name: 'Knowledge Base Access', basic: true, pro: true, enterprise: true },
            { name: 'Onboarding', basic: 'Self-service', pro: 'Guided setup', enterprise: 'Dedicated specialist' },
            { name: 'Training Sessions', basic: false, pro: '1 session included', enterprise: '3 sessions included' },
            { name: 'SLA Response Time', basic: false, pro: 'Within 24 hours', enterprise: 'Within 4 hours' }
        ]
    }
];

// Populate plans with features
plans.forEach(plan => {
    featuresByCategory.forEach(category => {
        category.features.forEach(feature => {
            (plan.features as any[]).push({
                ...feature,
                value: feature[plan.id as keyof typeof feature]
            });
        });
    });
});

// FAQ items
const faqs = [
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also support PayPal and corporate purchase orders for Enterprise customers.'
    },
    {
        question: 'Is there a money-back guarantee?',
        answer: "Yes, we offer a 30-day money-back guarantee for Basic licenses. If you're not satisfied with JyvDesktop for any reason, contact our support team within 30 days of purchase for a full refund."
    },
    {
        question: 'Can I upgrade or downgrade my plan?',
        answer: 'Absolutely. You can upgrade at any time, and your new billing cycle will be prorated based on your remaining subscription. Downgrades take effect at the end of your current billing cycle.'
    },
    {
        question: 'Do you offer academic or non-profit discounts?',
        answer: 'Yes, we offer special pricing for educational institutions, non-profit organizations, and students. Please contact our sales team with verification of your status to receive information about our discount programs.'
    },
    {
        question: 'What are the minimum system requirements?',
        answer: 'JyvDesktop requires Windows 10/11 (64-bit) or macOS 11+ with at least a quad-core CPU, 4GB RAM, and 500MB of free storage space. For optimal performance, we recommend 8GB+ RAM and a modern multi-core processor.'
    },
    {
        question: 'Is my payment information secure?',
        answer: 'Yes, all payment information is processed through secure, PCI-compliant payment processors. We never store your full credit card information on our servers.'
    }
];

// Success stories for social proof
const successStories = [
    {
        name: "Sarah Johnson",
        role: "Podcast Host",
        quote: "JyvDesktop completely eliminated background noise in my home recording setup. My listeners notice the difference!",
        image: "/assets/testimonials/sarah.jpg",
        plan: "Pro"
    },
    {
        name: "TechStart Inc.",
        role: "Tech Company",
        quote: "Rolling this out to our remote teams improved meeting quality by 80%. Worth every penny.",
        image: "/assets/testimonials/techstart.jpg",
        plan: "Enterprise"
    },
    {
        name: "Alex Rivera",
        role: "Twitch Streamer",
        quote: "I've tried everything to improve my stream audio. Nothing comes close to JyvDesktop. Game changer!",
        image: "/assets/testimonials/alex.jpg",
        plan: "Standard"
    }
];

export default function PricingPage() {
    const [viewMode, setViewMode] = useState('plans'); // 'plans' or 'comparison'
    const [billingPeriod, setBillingPeriod] = useState('annual'); // 'monthly' or 'annual'
    const [enterpriseUsers, setEnterpriseUsers] = useState(10);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState('All');

    // Animate when scrolled into view
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setHasScrolled(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate enterprise total cost
    const enterpriseTotalCost = billingPeriod === 'monthly'
        ? plans[2].monthlyPrice * enterpriseUsers
        : plans[2].annualPrice * enterpriseUsers;

    const handleEnterpriseUsersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (value >= 5) {
            setEnterpriseUsers(value);
        }
    };

    // Toggle FAQ item expansion
    const toggleFaqItem = (index: number) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
        }
    };

    // Calculate annual savings for each plan
    const calculateSavings = (plan: any) => {
        const monthlyCost = plan.monthlyPrice * 12;
        const annualCost = plan.annualPrice * 12;
        return monthlyCost - annualCost;
    };

    // Update CTA buttons to link to payment page
    plans.forEach(plan => {
        if (plan.id === 'enterprise') {
            plan.ctaLink = `/payment?plan=${plan.id}&billing=monthly&users=${enterpriseUsers}`;
        } else {
            plan.ctaLink = `/payment?plan=${plan.id}&billing=monthly`;
        }
    });

    // Update the renderPricingCard function
    const renderPricingCard = (plan: any) => {
        const isAnnual = billingPeriod === 'annual';
        const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
        const savings = calculateSavings(plan);
        const perUser = plan.id === 'enterprise' ? '/user' : '';
        
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: plan.id === 'pro' ? 0.1 : plan.id === 'enterprise' ? 0.2 : 0 }}
                className={`relative w-full rounded-xl overflow-hidden border ${
                    plan.popular 
                        ? 'border-green-500/30 shadow-lg shadow-green-900/20' 
                        : 'border-gray-800'
                } bg-gradient-to-b ${plan.gradientFrom} to-gray-900`}
            >
                {plan.popular && (
                    <div className="absolute top-0 right-0 bg-green-500 text-gray-900 font-medium text-xs px-3 py-1 rounded-bl-lg">
                        MOST POPULAR
                    </div>  
                )}
                
                <div className="p-6">
                    <div className={`inline-flex p-2 rounded-full ${plan.iconBg} mb-4`}>
                        <div className={`${plan.iconColor}`}>{plan.icon}</div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{plan.for}</p>
                    
                    <div className="mb-6">
                        <div className="flex items-baseline mb-1">
                            <span className="text-3xl font-bold">${price.toFixed(2)}</span>
                            <span className="text-gray-400 ml-1">{perUser}/{billingPeriod === 'annual' ? 'mo' : 'month'}</span>
                        </div>
                        
                        {isAnnual && savings > 0 && (
                            <div className="text-green-400 text-sm">
                                Save ${savings.toFixed(2)} per year
                            </div>
                        )}
                        
                        {plan.id === 'enterprise' && (
                            <div className="text-gray-400 text-sm mt-1">
                                {`Minimum ${plan.minUsers} users`}
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-3 mb-6">
                        {plan.highlightPoints.map((point: any, idx: any) => (
                            <div className="flex items-start" key={idx}>
                                <Check size={18} className="text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-300">{point}</span>
                            </div>
                        ))}
                    </div>
                    
                    {plan.id === 'enterprise' ? (
                        <div className="mb-4">
                            <label htmlFor="enterprise-users" className="block text-sm font-medium text-gray-300 mb-2">
                                Number of Users: {enterpriseUsers}
                            </label>
                            <input
                                id="enterprise-users"
                                type="range"
                                min="5"
                                max="100"
                                step="1"
                                value={enterpriseUsers}
                                onChange={handleEnterpriseUsersChange}
                                className="w-full h-2 rounded-full appearance-none bg-gray-700 focus:outline-none"
                                style={{
                                    backgroundImage: `linear-gradient(to right, #a855f7 ${(enterpriseUsers - 5) / 95 * 100}%, #374151 ${(enterpriseUsers - 5) / 95 * 100}%)`
                                }}
                            />
                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                                <span>5 users</span>
                                <span>100 users</span>
                            </div>
                            <div className="mt-3 text-right text-sm font-medium text-purple-400">
                                Total: ${isAnnual ? (plan.annualPrice * enterpriseUsers).toFixed(2) : (plan.monthlyPrice * enterpriseUsers).toFixed(2)}/{billingPeriod === 'annual' ? 'mo' : 'month'}
                            </div>
                        </div>
                    ) : null}
                    
                    <Link 
                        href={isAnnual 
                            ? plan.id === 'enterprise' 
                                ? `${plan.ctaLink.split('?')[0]}?plan=${plan.id}&billing=annual&users=${enterpriseUsers}`
                                : `${plan.ctaLink.split('?')[0]}?plan=${plan.id}&billing=annual`
                            : plan.id === 'enterprise'
                                ? `${plan.ctaLink.split('?')[0]}?plan=${plan.id}&billing=monthly&users=${enterpriseUsers}`
                                : plan.ctaLink
                        }
                        className={`w-full flex items-center justify-center py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
                            plan.popular 
                                ? 'bg-green-600 hover:bg-green-700 text-white' 
                                : plan.id === 'enterprise'
                                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                        }`}
                    >
                        {plan.cta}
                        <ArrowRight size={16} className="ml-1" />
                    </Link>
                </div>
                
                {/* Feature list section */}
                <div className="border-t border-gray-800 p-6 bg-gray-900/30">
                    <h4 className="font-medium mb-3 text-sm">What's included:</h4>
                    <ul className="space-y-2">
                        {plan.features.slice(0, 6).map((feature: any, idx: number) => {
                            let value = feature.value;
                            let displayValue = value === true ? <Check size={14} className="text-green-400" /> : 
                                            value === false ? <X size={14} className="text-gray-500" /> : value;
                            
                            return (
                                <li key={idx} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">{feature.name}</span>
                                    <span className="flex-shrink-0">{displayValue}</span>
                                </li>
                            );
                        })}
                    </ul>
                    
                    {viewMode === 'plans' && (
                        <button 
                            onClick={() => setViewMode('comparison')}
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-4 flex items-center"
                        >
                            See all features <ArrowRight size={14} className="ml-1" />
                        </button>
                    )}
                </div>
            </motion.div>
        );
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white pb-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-40 pb-20">
                {/* Background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px]"></div>
                    <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]"></div>
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50 animate-ping opacity-75" style={{animationDuration: '3s',}}></div>
                    <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-ping opacity-75" style={{animationDuration: '4s',}}></div>
                </div>

                <div className="container mx-auto px-4 relative">
                    <motion.div
                        className="text-center max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center mb-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            <Volume2 size={16} className="text-green-400 mr-2" />
                            <span className="text-sm text-gray-200">Transform your audio experience</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 text-transparent bg-clip-text">
                            Choose the perfect audio solution
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                            From casual users to professional teams, we have a plan that fits your needs.
                            All plans include our core AI-powered audio enhancement technology.
                        </p>

                        {/* Billing Toggle */}
                        <div className="inline-flex items-center p-1 bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-700 mb-10">
                            <button
                                onClick={() => setBillingPeriod('monthly')}
                                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all ${
                                    billingPeriod === 'monthly'
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl shadow-green-900/20'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingPeriod('annual')}
                                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all ${
                                    billingPeriod === 'annual'
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl shadow-green-900/20'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Annual
                                <span className="absolute -top-3 -right-2 bg-green-500 text-black text-xs px-2 py-0.5 rounded-full font-bold">
                                    -20%
                                </span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Cards Section */}
            <section className="container mx-auto px-4 relative z-10 -mt-4">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate={hasScrolled ? "visible" : "hidden"}
                >
                    {plans.map((plan, index) => (
                        renderPricingCard(plan)
                    ))}
                </motion.div>
            </section>

            {/* Feature Comparison Section */}
            <section className="container mx-auto px-4 mt-24">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-6">Detailed Feature Comparison</h2>
                        <p className="text-gray-400 max-w-3xl mx-auto mb-8">
                            Compare all features across our plans to find the perfect fit for your audio needs
                        </p>

                        {/* Category Navigation */}
                        <div className="flex flex-wrap justify-center gap-2 mb-12">
                            <button
                                key="all-features"
                                onClick={() => setActiveCategory('All')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    activeCategory === 'All'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                <div className="flex items-center">
                                    <ClipboardCheck size={20} className="text-gray-400" />
                                    <span className="ml-1.5">All Features</span>
                                </div>
                            </button>
                            {featuresByCategory.map((category) => (
                                <button
                                    key={category.category}
                                    onClick={() => setActiveCategory(category.category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                        activeCategory === category.category
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        {category.icon}
                                        <span className="ml-1.5">{category.category}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Feature Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                            <tr className="border-b border-gray-800">
                                <th className="py-4 px-4 text-left text-gray-400 font-medium">Feature</th>
                                {plans.map((plan) => (
                                    <th key={plan.id} className="py-4 px-4 text-center">
                                        <div className={`inline-flex px-3 py-1 rounded-full text-sm ${
                                            plan.popular ? 'bg-green-500/20 text-green-400' : `${plan.iconBg} ${plan.iconColor}`
                                        }`}>
                                            {plan.name}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {activeCategory === 'All' ? (
                                // Render all features from all categories
                                featuresByCategory.map((category) => (
                                    <React.Fragment key={category.category}>
                                        {/* Category header row */}
                                        <tr className="bg-gray-800/70">
                                            <td colSpan={4} className="py-3 px-4 text-sm font-medium text-gray-300">
                                                <div className="flex items-center">
                                                    {category.icon}
                                                    <span className="ml-2">{category.category}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* Category features */}
                                        {category.features.map((feature, index) => (
                                            <tr key={`${category.category}-${feature.name}`} className="border-b border-gray-800/50">
                                                <td className="py-4 px-4 text-sm text-gray-300">
                                                    <div className="flex items-center">
                                                        <span>{feature.name}</span>
                                                        <HelpCircle size={14} className="text-gray-500 ml-1.5 cursor-help" />
                                                    </div>
                                                </td>
                                                {plans.map((plan) => {
                                                    const value = feature[plan.id as keyof typeof feature];
                                                    return (
                                                        <td key={`${plan.id}-${feature.name}`} className="py-4 px-4 text-center text-sm">
                                                            {typeof value === 'boolean' ? (
                                                                value ? (
                                                                    <Check size={18} className="mx-auto text-green-400" />
                                                                ) : (
                                                                    <X size={18} className="mx-auto text-gray-500" />
                                                                )
                                                            ) : (
                                                                <span className={`${
                                                                    value && typeof value === 'string' && value.includes('Advanced')
                                                                        ? 'text-green-400'
                                                                        : 'text-gray-300'
                                                                }`}>
                                                                        {value}
                                                                    </span>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))
                            ) : (
                                // Render features for the selected category only
                                featuresByCategory
                                    .find(cat => cat.category === activeCategory)
                                    ?.features.map((feature, index) => (
                                    <tr key={feature.name} className={`border-b border-gray-800/50 ${index % 2 === 0 ? '' : 'bg-gray-900/30'}`}>
                                        <td className="py-4 px-4 text-sm text-gray-300">
                                            <div className="flex items-center">
                                                <span>{feature.name}</span>
                                                <HelpCircle size={14} className="text-gray-500 ml-1.5 cursor-help" />
                                            </div>
                                        </td>
                                        {plans.map((plan) => {
                                            const value = feature[plan.id as keyof typeof feature];
                                            return (
                                                <td key={`${plan.id}-${feature.name}`} className="py-4 px-4 text-center text-sm">
                                                    {typeof value === 'boolean' ? (
                                                        value ? (
                                                            <Check size={18} className="mx-auto text-green-400" />
                                                        ) : (
                                                            <X size={18} className="mx-auto text-gray-500" />
                                                        )
                                                    ) : (
                                                        <span className={`${
                                                            value && typeof value === 'string' && value.includes('Advanced')
                                                                ? 'text-green-400'
                                                                : 'text-gray-300'
                                                        }`}>
                                                                {value}
                                                            </span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="container mx-auto px-4 mt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center mb-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        <Star size={16} className="text-purple-400 mr-2" />
                        <span className="text-sm text-gray-200">From our customers</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">What users are saying</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who have transformed their audio experience
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {successStories.map((story, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                        >
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden relative mr-4">
                                    {/* Replace with actual images if available */}
                                    <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
                                        {story.name.charAt(0)}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{story.name}</h3>
                                    <p className="text-sm text-gray-400">{story.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm italic mb-3">"{story.quote}"</p>
                            <div className="flex items-center">
                                <Star size={14} className="text-yellow-400" />
                                <Star size={14} className="text-yellow-400" />
                                <Star size={14} className="text-yellow-400" />
                                <Star size={14} className="text-yellow-400" />
                                <Star size={14} className="text-yellow-400" />
                                <span className="text-xs text-gray-500 ml-2">{story.plan} user</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FAQs Section */}
            <section className="container mx-auto px-4 mt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Find answers to common questions about our plans, billing, and features
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="mb-4 border-b border-gray-800 pb-4 last:border-none"
                        >
                            <button
                                onClick={() => toggleFaqItem(index)}
                                className="flex w-full justify-between items-center py-4 text-left font-medium text-white hover:text-green-400 transition-colors"
                            >
                                <span>{faq.question}</span>
                                <span className={`transform transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 10.5L1.5 5L2.9 3.6L7 7.7L11.1 3.6L12.5 5L7 10.5Z" fill="currentColor"/>
                                    </svg>
                                </span>
                            </button>
                            <AnimatePresence>
                                {expandedFaq === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-4 text-gray-400">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 mt-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-2xl overflow-hidden border border-gray-700 p-8 md:p-12 max-w-6xl mx-auto relative"
                >
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-[100px]"></div>
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]"></div>
                    </div>

                    <div className="relative z-10 text-center md:text-left md:flex justify-between items-center">
                        <div className="mb-8 md:mb-0 md:mr-12">
                            <h2 className="text-3xl font-bold mb-4">Ready to transform your audio experience?</h2>
                            <p className="text-gray-300 max-w-xl">
                                Download now and experience professional-grade audio enhancement for your desktop.
                                Choose the plan that fits your needs.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="#download"
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-all"
                            >
                                Download
                            </a>
                            <a
                                href="#contact"
                                className="border border-white/20 bg-white/5 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-all"
                            >
                                Contact Sales
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}