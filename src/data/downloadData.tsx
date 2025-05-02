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

export interface InstallStep {
  title: string;
  description: string;
  image: string;
}

export interface TroubleshootingItem {
  title: string;
  description: string;
  steps: string[];
}

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
  installSteps: InstallStep[];
  troubleshooting?: TroubleshootingItem[];
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
    installSteps: [
      {
        title: 'Download the Installer',
        description: 'Download the disk image (.dmg) file from our website or the App Store.',
        image: '/assets/images/install/macos-download.webp'
      },
      {
        title: 'Open the Disk Image',
        description: 'Double-click the downloaded .dmg file to mount it and open the installer.',
        image: '/assets/images/install/macos-open.webp'
      },
      {
        title: 'Drag to Applications',
        description: 'Drag the JyvDesktop icon to the Applications folder shortcut.',
        image: '/assets/images/install/macos-drag.webp'
      },
      {
        title: 'Security Verification',
        description: 'If prompted about security, open System Preferences > Security & Privacy and click "Open Anyway".',
        image: '/assets/images/install/macos-security.webp'
      },
      {
        title: 'Launch JyvDesktop',
        description: 'Open JyvDesktop from your Applications folder or Launchpad.',
        image: '/assets/images/install/macos-launch.webp'
      }
    ],
    troubleshooting: [
      {
        title: 'App Cannot Be Opened',
        description: 'If you see a message that JyvDesktop cannot be opened because it is from an unidentified developer:',
        steps: [
          'Right-click (or Control-click) the app icon',
          'Select "Open" from the context menu',
          'Click "Open" in the dialog box',
          'If that doesn\'t work, go to System Preferences > Security & Privacy',
          'Click the lock icon to make changes',
          'Click "Open Anyway" next to the message about JyvDesktop'
        ]
      },
      {
        title: 'Audio Permissions Required',
        description: 'JyvDesktop needs access to your microphone and audio devices:',
        steps: [
          'When prompted, click "OK" to allow microphone access',
          'If you accidentally denied access, go to System Preferences > Security & Privacy > Privacy',
          'Select "Microphone" from the left sidebar',
          'Ensure JyvDesktop is checked in the list of allowed apps'
        ]
      }
    ]
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
    installSteps: [
      {
        title: 'Download the Installer',
        description: 'Download the installer (.exe) file from our website or the Microsoft Store.',
        image: '/assets/images/install/windows-download.webp'
      },
      {
        title: 'Run the Installer',
        description: 'Right-click the downloaded file and select "Run as administrator" for the best installation experience.',
        image: '/assets/images/install/windows-run.webp'
      },
      {
        title: 'Security Prompt',
        description: 'If prompted by Windows Defender, click "More info" then "Run anyway" to proceed with installation.',
        image: '/assets/images/install/windows-security.webp'
      },
      {
        title: 'Installation Wizard',
        description: 'Follow the on-screen installation wizard, selecting your preferred options.',
        image: '/assets/images/install/windows-wizard.webp'
      },
      {
        title: 'Launch JyvDesktop',
        description: 'Once installation is complete, launch JyvDesktop from your Start menu or desktop shortcut.',
        image: '/assets/images/install/windows-launch.webp'
      }
    ],
    troubleshooting: [
      {
        title: 'Windows Defender Blocking Installation',
        description: 'If Windows Defender SmartScreen prevents the installation:',
        steps: [
          'Click "More info" on the SmartScreen popup',
          'Select "Run anyway"',
          'If that doesn\'t work, temporarily disable real-time protection in Windows Security settings',
          'After installation, remember to re-enable real-time protection'
        ]
      },
      {
        title: 'Missing Audio Devices',
        description: 'If JyvDesktop cannot detect your audio devices:',
        steps: [
          'Right-click the sound icon in your system tray',
          'Select "Sound settings"',
          'Ensure your devices are not disabled',
          'Try unplugging and reconnecting your audio devices',
          'Restart JyvDesktop after connecting devices'
        ]
      },
      {
        title: 'Installation Fails',
        description: 'If the installation process fails to complete:',
        steps: [
          'Ensure you have administrator privileges',
          'Temporarily disable antivirus software',
          'Run the installer in compatibility mode (right-click > Properties > Compatibility)',
          'Try the alternative Microsoft Store version'
        ]
      }
    ]
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
    installSteps: [
      {
        title: 'Download the Package',
        description: 'Download the Chrome OS package (.crx) file from our website or the Chrome Web Store.',
        image: '/assets/images/install/chrome-download.webp'
      },
      {
        title: 'Open Extensions Page',
        description: 'Open Chrome and navigate to chrome://extensions or select Menu > More Tools > Extensions.',
        image: '/assets/images/install/chrome-extensions.webp'
      },
      {
        title: 'Enable Developer Mode',
        description: 'Enable "Developer mode" using the toggle in the top-right corner of the extensions page.',
        image: '/assets/images/install/chrome-developer.webp'
      },
      {
        title: 'Install the Extension',
        description: 'Drag the downloaded .crx file onto the extensions page and click "Add extension" when prompted.',
        image: '/assets/images/install/chrome-install.webp'
      },
      {
        title: 'Launch JyvDesktop',
        description: 'Click the JyvDesktop icon in your Chrome toolbar or app launcher to start using it.',
        image: '/assets/images/install/chrome-launch.webp'
      }
    ],
    troubleshooting: [
      {
        title: 'Extension Cannot Be Added',
        description: 'If Chrome prevents you from adding the extension:',
        steps: [
          'Make sure Developer mode is enabled in chrome://extensions',
          'Try downloading directly from the Chrome Web Store instead',
          'If using an organization-managed Chromebook, contact your administrator',
          'Check that your ChromeOS version is 88 or newer'
        ]
      },
      {
        title: 'Microphone Access Issues',
        description: 'If JyvDesktop cannot access your microphone:',
        steps: [
          'Click the JyvDesktop icon and select "Site settings"',
          'Ensure microphone access is set to "Allow"',
          'Check Chrome\'s site settings for microphone permissions',
          'Restart your Chromebook if permissions don\'t apply correctly'
        ]
      }
    ]
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
  },
  {
    question: "How do I verify the download is authentic?",
    answer: "All our downloads are digitally signed. On Windows, you can right-click the installer, select Properties, and check the Digital Signatures tab. On macOS, you can verify the signature using the 'codesign -v' command in Terminal. We also provide SHA-256 checksums on our security page for manual verification."
  },
  {
    question: "Can I install JyvDesktop on multiple computers?",
    answer: "Yes, your license allows installation on up to 3 devices simultaneously with the Pro plan, and up to 5 devices with the Studio plan. The Free version can be installed on unlimited devices but with limited functionality."
  },
  {
    question: "What happens if I exceed my device limit?",
    answer: "If you attempt to activate JyvDesktop on more devices than your license allows, you'll be prompted to deactivate it on one of your existing devices first. You can manage your active devices through your account dashboard."
  },
  {
    question: "Does JyvDesktop work with all audio interfaces?",
    answer: "JyvDesktop is compatible with most ASIO, CoreAudio, and WASAPI audio interfaces. For optimal performance, we recommend interfaces with sample rates of 44.1kHz or higher and buffer sizes of 256 samples or lower."
  },
  {
    question: "How do I transfer my settings to a new computer?",
    answer: "JyvDesktop includes a built-in profile export/import feature. Go to Settings > Profiles > Export to save your settings as a .jyvprofile file, then import this file on your new installation using Settings > Profiles > Import."
  },
  {
    question: "Is an internet connection required?",
    answer: "An internet connection is required for the initial activation and for certain features like cloud profile sync and updates. However, once activated, JyvDesktop can operate offline for up to 30 days before requiring revalidation."
  },
  {
    question: "What should I do if my audio device isn't detected?",
    answer: "First, ensure your device is properly connected and powered on. Try disconnecting and reconnecting the device. On Windows, check Device Manager to verify the device is working properly. On macOS, check Audio MIDI Setup. If problems persist, try installing the latest drivers for your audio device from the manufacturer's website."
  },
  {
    question: "How often are updates released?",
    answer: "We release major feature updates quarterly and minor updates with bug fixes and performance improvements monthly. Security updates are released as needed. All users receive notifications when updates are available, and Pro/Studio subscribers get early access to new features."
  },
  {
    question: "Can I downgrade to a previous version?",
    answer: "Yes, previous versions are available in the downloads archive section of your account dashboard. However, note that profile data created in newer versions may not be fully compatible with older versions."
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
