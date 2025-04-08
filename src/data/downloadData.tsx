'use client';

import React from 'react';
import { 
  Download,
  Check,
  Cpu,
  Headphones,
  Star,
  Zap,
  ShieldCheck,
  Volume2,
  Sliders,
  Layers,
  Music
} from 'lucide-react';
import { FaWindows, FaApple, FaChrome } from 'react-icons/fa';
import { ReactNode } from 'react';

export interface Platform {
  id: string;
  name: string;
  icon: ReactNode;
  logo: ReactNode;
  directDownload: {
    url: string;
    version: string;
    size: string;
    requirements: string;
    architecture: string[];
    releaseDate: string;
  };
  storeUrl: string;
  storeName: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  platform: string;
  avatar: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

// Platform data for download options
export const platforms: Platform[] = [
  {
    id: 'macos',
    name: 'macOS',
    icon: <FaApple size={24} />,
    logo: <FaApple size={32} className="text-white" />,
    directDownload: {
      url: '#download-macos',
      version: '1.2.5',
      size: '32 MB',
      requirements: 'macOS 11+ (Big Sur or later)',
      architecture: ['Intel', 'Apple Silicon'],
      releaseDate: 'June 12, 2023'
    },
    storeUrl: 'https://apps.apple.com',
    storeName: 'App Store',
    gradientFrom: 'from-emerald-500/20',
    gradientTo: 'to-emerald-700/20',
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: <FaWindows size={24} />,
    logo: <FaWindows size={32} className="text-white" />,
    directDownload: {
      url: '#download-windows',
      version: '1.2.5',
      size: '38 MB',
      requirements: 'Windows 10/11 (64-bit)',
      architecture: ['x64'],
      releaseDate: 'June 12, 2023'
    },
    storeUrl: 'https://apps.microsoft.com',
    storeName: 'Microsoft Store',
    gradientFrom: 'from-emerald-600/20',
    gradientTo: 'to-emerald-800/20',
  },
  {
    id: 'chromebook',
    name: 'Chromebook',
    icon: <FaChrome size={24} />,
    logo: <FaChrome size={32} className="text-white" />,
    directDownload: {
      url: '#download-chromebook',
      version: '1.2.5',
      size: '26 MB',
      requirements: 'ChromeOS 88+',
      architecture: ['ARM', 'x64'],
      releaseDate: 'June 12, 2023'
    },
    storeUrl: 'https://chrome.google.com/webstore',
    storeName: 'Chrome Web Store',
    gradientFrom: 'from-emerald-500/20',
    gradientTo: 'to-emerald-700/20',
  }
];

// Key features for highlight
export const keyFeatures: Feature[] = [
  {
    icon: <Zap className="text-green-500" size={20} />,
    title: 'AI-Powered Noise Cancellation',
    description: 'Advanced algorithms remove background noise, echo, and unwanted sounds in real-time.'
  },
  {
    icon: <Volume2 className="text-green-500" size={20} />,
    title: 'Voice Enhancement',
    description: 'Adaptive voice isolation technology separates your voice from background noise.'
  },
  {
    icon: <Headphones className="text-green-500" size={20} />,
    title: 'Spatial Audio Rendering',
    description: 'Create immersive 3D audio experiences with customizable HRTF models.'
  },
  {
    icon: <Sliders className="text-green-500" size={20} />,
    title: 'Advanced DSP Effects',
    description: 'Professional-grade equalization, compression, and audio effects with presets.'
  },
  {
    icon: <ShieldCheck className="text-green-500" size={20} />,
    title: 'Secure Audio Routing',
    description: 'Route audio between applications with end-to-end encryption for privacy.'
  },
  {
    icon: <Layers className="text-green-500" size={20} />,
    title: 'Multi-Application Support',
    description: 'Apply different audio profiles to different applications simultaneously.'
  }
];

// Testimonials with platform mentions for social proof
export const testimonials: Testimonial[] = [
  {
    quote: "Finally, a solution that makes my voice sound professional during podcasts. The audio enhancement is subtle but makes a huge difference for my listeners.",
    author: "Sarah J.",
    role: "Podcast Host",
    platform: "macOS",
    avatar: "/assets/avatars/sarah.webp"
  },
  {
    quote: "JyvDesktop transformed my online meetings. No more asking 'can you hear me?' or apologizing for background noise. My team can finally focus on what matters.",
    author: "Michael T.",
    role: "Project Manager",
    platform: "Windows",
    avatar: "/assets/avatars/michael.webp"
  },
  {
    quote: "As a student, having clear audio during online classes makes all the difference. JyvDesktop on my Chromebook ensures I never miss important instructions.",
    author: "Jason K.",
    role: "Student",
    platform: "Chromebook",
    avatar: "/assets/avatars/jason.webp"
  }
];

// FAQ items related to download and installation
export const faqs: FAQ[] = [
  {
    question: "Which version should I download?",
    answer: "Choose the version that matches your operating system. If you have an Apple Silicon Mac (M1/M2/M3), the macOS version supports both Intel and Apple Silicon. For Windows, we recommend the 64-bit version for best performance."
  },
  {
    question: "Is there a difference between the store version and direct download?",
    answer: "The functionality is identical. Store versions receive automatic updates through the respective app stores, while direct downloads will notify you when updates are available. Choose whichever method is most convenient for you."
  },
  {
    question: "Do I need to uninstall the previous version before updating?",
    answer: "No, the installer will automatically upgrade your existing installation while preserving your settings and preferences."
  },
  {
    question: "I'm having trouble with the download. What should I do?",
    answer: "Try using a different browser or temporarily disable your antivirus software during installation. If issues persist, contact our support team for assistance."
  },
  {
    question: "Is my license valid across different platforms?",
    answer: "Yes, your license is tied to your account, not your device. You can use JyvDesktop on any supported platform with the same license, up to the number of devices included in your subscription."
  }
];

// Pricing tiers
export const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    description: "Basic audio enhancement",
    features: [
      "Per-application volume control",
      "Basic noise suppression",
      "Standard equalizer",
      "Limited preset library"
    ],
    cta: "Download Free",
    highlight: false
  },
  {
    name: "Pro",
    price: "$8.99",
    period: "/month",
    description: "Advanced audio enhancement",
    features: [
      "All Free features",
      "Advanced AI noise suppression",
      "Voice isolation technology",
      "Detailed audio analytics",
      "Unlimited application profiles",
      "Full preset library"
    ],
    cta: "Start Pro Trial",
    highlight: true
  },
  {
    name: "Studio",
    price: "$14.99",
    period: "/month",
    description: "Professional audio suite",
    features: [
      "All Pro features",
      "VST/AU plugin support",
      "Advanced spatial audio",
      "Custom effect creation",
      "DAW integration",
      "Multi-channel audio support"
    ],
    cta: "Start Studio Trial",
    highlight: false
  }
]; 