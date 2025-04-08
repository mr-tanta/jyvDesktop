import React from 'react';
import {
    Volume2,
    Router,
    Layers,
    SlidersHorizontal,
    Laptop,
    BellRing,
    BellOff,
    BarChart3,
    MessageSquare,
    PanelRight,
    Headphones,
    Zap,
    Video,
    Music,
    Globe
} from 'lucide-react';

// Audio Control Features Data
export const audioControlFeatures = [
    {
        id: 'per-app-volume',
        title: 'Per-Application Volume Control',
        description: 'Independently adjust the volume of each application running on your system. Never again will your music be too loud during calls or game audio drown out your teammates.',
        icon: <Volume2 size={24} />,
        details: [
            'Independent volume sliders for each application',
            'Quick mute/unmute toggles',
            'Visual volume level indicators',
            'Volume normalization across applications',
            'Per-application audio routing to different output devices'
        ],
        image: '/assets/images/audio-control/per-app-volume.webp',
        color: 'from-blue-500/10 to-blue-600/5',
        borderColor: 'border-blue-500/20',
        iconBg: 'bg-blue-500/20'
    },
    {
        id: 'audio-routing',
        title: 'Advanced Audio Routing',
        description: 'Direct audio from any application to any output device. Send your music to speakers while keeping alerts on your headphones, or route communication apps to a different device than your media.',
        icon: <Router size={24} />,
        details: [
            'Route individual applications to different audio devices',
            'Create virtual audio paths between applications',
            'Configure automatic routing based on application type',
            'Save routing presets for different scenarios',
            'Split audio streams to multiple destinations'
        ],
        image: '/assets/images/audio-control/audio-routing.webp',
        color: 'from-purple-500/10 to-purple-600/5',
        borderColor: 'border-purple-500/20',
        iconBg: 'bg-purple-500/20'
    },
    {
        id: 'application-profiles',
        title: 'Custom Application Profiles',
        description: 'Create and save custom audio profiles for each application. Define the perfect settings for your video conferencing, gaming, music production, and media consumption apps.',
        icon: <Layers size={24} />,
        details: [
            'Persistent application profiles that remember settings',
            'Quick switching between multiple profiles',
            'Application-specific equalizer settings',
            'Automatic profile activation when applications launch',
            'Profile templates for common application types'
        ],
        image: '/assets/images/audio-control/app-profiles.webp',
        color: 'from-amber-500/10 to-amber-600/5',
        borderColor: 'border-amber-500/20',
        iconBg: 'bg-amber-500/20'
    },
    {
        id: 'audio-mixer',
        title: 'Real-Time Audio Mixer',
        description: 'Control your audio experience like a professional sound engineer with our intuitive real-time mixer. Balance multiple audio streams with precision and create the perfect audio mix for any situation.',
        icon: <SlidersHorizontal size={24} />,
        details: [
            'Multi-channel mixing console interface',
            'Real-time level meters and peak indicators',
            'Balance adjustment (L/R) per application',
            'Grouping capabilities for related applications',
            'Visual feedback for audio changes'
        ],
        image: '/assets/images/audio-control/audio-mixer.webp',
        color: 'from-red-500/10 to-red-600/5',
        borderColor: 'border-red-500/20',
        iconBg: 'bg-red-500/20'
    },
    {
        id: 'priority-management',
        title: 'Smart Priority Management',
        description: 'Define which applications take audio priority. Automatically lower music volume during calls, ensure game chat is always audible over gameplay, or make sure you never miss important notifications.',
        icon: <Layers size={24} />,
        details: [
            'Ducking control for background applications',
            'Automatic volume adjustment based on activity',
            'Priority levels for different application types',
            'Configurable threshold for volume reduction',
            'Temporary vs. persistent priority settings'
        ],
        image: '/assets/images/audio-control/priority-management.webp',
        color: 'from-green-500/10 to-green-600/5',
        borderColor: 'border-green-500/20',
        iconBg: 'bg-green-500/20'
    },
    {
        id: 'hotkeys-gestures',
        title: 'Hotkeys & Gesture Controls',
        description: 'Control your audio without interrupting your workflow using customizable keyboard shortcuts and gesture commands. Adjust volumes, mute applications, and switch audio profiles on the fly.',
        icon: <Laptop size={24} />,
        details: [
            'Customizable global hotkeys for volume control',
            'Multi-key combinations for complex actions',
            'Mouse gestures for quick adjustments',
            'Integration with media keys',
            'Application-specific shortcut configurations'
        ],
        image: '/assets/images/audio-control/hotkeys.webp',
        color: 'from-indigo-500/10 to-indigo-600/5',
        borderColor: 'border-indigo-500/20',
        iconBg: 'bg-indigo-500/20'
    },
    {
        id: 'notification-control',
        title: 'Intelligent Notification Control',
        description: 'Take control of your notification sounds with intelligent management. Choose which apps can play notification sounds, when they can play them, and at what volume relative to your other audio.',
        icon: <BellRing size={24} />,
        details: [
            'Application-specific notification settings',
            'Time-based notification rules',
            'Focus mode to suppress non-essential notifications',
            'Custom notification sounds for different apps',
            'Volume scaling for notification audio'
        ],
        image: '/assets/images/audio-control/notification-control.webp',
        color: 'from-cyan-500/10 to-cyan-600/5',
        borderColor: 'border-cyan-500/20',
        iconBg: 'bg-cyan-500/20'
    },
    {
        id: 'analytics-visualization',
        title: 'Audio Analytics & Visualization',
        description: 'Gain insights into your audio environment with detailed analytics and visualizations. Monitor levels, identify problematic frequencies, and optimize your audio experience with data-driven adjustments.',
        icon: <BarChart3 size={24} />,
        details: [
            'Real-time spectrum analyzer for frequency visualization',
            'Historical usage data for application audio',
            'Peak level tracking and warnings',
            'Loudness normalization metrics',
            'Audio quality scoring and recommendations'
        ],
        image: '/assets/images/audio-control/analytics.webp',
        color: 'from-pink-500/10 to-pink-600/5',
        borderColor: 'border-pink-500/20',
        iconBg: 'bg-pink-500/20'
    }
];

// Use cases specific to Audio Control
export const useCases = [
    {
        title: 'Professional Video Calls',
        description: 'Balance your video conferencing app, background music, and system notifications perfectly for distraction-free meetings.',
        icon: <MessageSquare size={24} />,
        color: 'bg-blue-500/20',
        apps: ['Zoom', 'Microsoft Teams', 'Google Meet']
    },
    {
        title: 'Gaming & Streaming',
        description: 'Maintain the perfect balance between game audio, voice chat, streaming software, and background music.',
        icon: <PanelRight size={24} />,
        color: 'bg-purple-500/20',
        apps: ['Discord', 'OBS Studio', 'Game clients']
    },
    {
        title: 'Content Consumption',
        description: 'Watch videos and listen to music without being interrupted by loud notifications or background applications.',
        icon: <Headphones size={24} />,
        color: 'bg-amber-500/20',
        apps: ['Spotify', 'Netflix', 'YouTube']
    },
    {
        title: 'Focus & Productivity',
        description: 'Create the perfect audio environment for deep work while ensuring you only hear the notifications that matter.',
        icon: <Zap size={24} />,
        color: 'bg-green-500/20',
        apps: ['Slack', 'Email clients', 'Productivity tools']
    }
];

// Simulated applications for the interactive demo
export const demoApplications = [
    {
        id: 'videocall',
        name: 'Video Call',
        icon: <Video size={20} />,
        color: 'bg-blue-500',
        volume: 80,
        type: 'Communication',
        device: 'Default Output',
        muted: false
    },
    {
        id: 'music',
        name: 'Music Player',
        icon: <Music size={20} />,
        color: 'bg-green-500',
        volume: 60,
        type: 'Entertainment',
        device: 'Default Output',
        muted: false
    },
    {
        id: 'browser',
        name: 'Web Browser',
        icon: <Globe size={20} />,
        color: 'bg-purple-500',
        volume: 70,
        type: 'General',
        device: 'Default Output',
        muted: false
    },
    {
        id: 'chat',
        name: 'Chat App',
        icon: <MessageSquare size={20} />,
        color: 'bg-yellow-500',
        volume: 75,
        type: 'Communication',
        device: 'Default Output',
        muted: false
    },
    {
        id: 'game',
        name: 'Game',
        icon: <PanelRight size={20} />,
        color: 'bg-red-500',
        volume: 65,
        type: 'Entertainment',
        device: 'Default Output',
        muted: false
    }
];

// Audio devices for the demo
export const audioDevices = [
    { id: 'default', name: 'Default Output', type: 'System Default' },
    { id: 'headphones', name: 'Headphones', type: 'Output Device' },
    { id: 'speakers', name: 'Speakers', type: 'Output Device' },
    { id: 'bluetooth', name: 'Bluetooth Headset', type: 'Wireless Output' }
];

// Preset profiles for the demo
export const presetProfiles = [
    { id: 'meeting', name: 'Video Meeting', icon: <MessageSquare size={16} /> },
    { id: 'gaming', name: 'Gaming Session', icon: <PanelRight size={16} /> },
    { id: 'music', name: 'Music Listening', icon: <Music size={16} /> },
    { id: 'focus', name: 'Focus Mode', icon: <BellOff size={16} /> }
];

// FAQ data
export const faqs = [
    {
        question: 'Does the audio control work with all applications?',
        answer: 'Yes, JyvDesktop works with virtually all applications on your system, including web browsers, communication tools, media players, and games. It intercepts audio at the system level, providing universal compatibility with applications that use standard audio APIs.'
    },
    {
        question: 'How much system resources does the audio control feature use?',
        answer: 'JyvDesktop is designed to be extremely efficient, typically using less than 2% CPU and about 150MB of RAM. The audio control features are optimized for real-time processing with minimal overhead, ensuring they don\'t impact your system performance even when managing multiple audio streams simultaneously.'
    },
    {
        question: 'Can I save different audio configurations for different scenarios?',
        answer: 'Absolutely! JyvDesktop allows you to create, save, and instantly switch between custom profiles for different scenarios like meetings, gaming, music production, or focused work. You can even set profiles to activate automatically when specific applications launch.'
    },
    {
        question: 'Does audio control work with wireless headphones and Bluetooth devices?',
        answer: 'Yes, JyvDesktop works with all audio output devices recognized by your operating system, including wireless headphones, Bluetooth devices, HDMI audio, and multi-channel speaker setups. You can route different applications to different devices simultaneously.'
    },
    {
        question: 'Can I control microphone inputs as well as audio outputs?',
        answer: 'Yes, JyvDesktop provides comprehensive control over both audio outputs and microphone inputs. You can adjust input gain, apply noise suppression, enable voice enhancement, and route microphone inputs to different applications independently.'
    },
    {
        question: 'Is there any audio quality loss when using the control features?',
        answer: 'No, JyvDesktop processes audio in high-resolution 32-bit floating-point format, ensuring pristine audio quality without degradation. The volume control and routing features are designed to maintain the full fidelity of the original audio source.'
    }
]; 