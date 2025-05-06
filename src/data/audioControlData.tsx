import React from 'react';
import { useTranslations } from 'next-intl';
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

// Audio Control Features Data - Using translation keys instead of hardcoded text
export const useAudioControlFeatures = () => {
    const t = useTranslations('audioControl');
    
    return [
        {
            id: 'per-app-volume',
            title: t('featureItems.perAppVolume.title'),
            description: t('featureItems.perAppVolume.description'),
            icon: <Volume2 size={24} />,
            details: t.raw('featureItems.perAppVolume.details'),
            image: '/assets/images/audio-control/per-app-volume.webp',
            color: 'from-blue-500/10 to-blue-600/5',
            borderColor: 'border-blue-500/20',
            iconBg: 'bg-blue-500/20'
        },
        {
            id: 'audio-routing',
            title: t('featureItems.deviceRouting.title'),
            description: t('featureItems.deviceRouting.description'),
            icon: <Router size={24} />,
            details: t.raw('featureItems.deviceRouting.details'),
            image: '/assets/images/audio-control/audio-routing.webp',
            color: 'from-purple-500/10 to-purple-600/5',
            borderColor: 'border-purple-500/20',
            iconBg: 'bg-purple-500/20'
        },
        {
            id: 'application-profiles',
            title: t('featureItems.audioProfiles.title'),
            description: t('featureItems.audioProfiles.description'),
            icon: <Layers size={24} />,
            details: t.raw('featureItems.audioProfiles.details'),
            image: '/assets/images/audio-control/app-profiles.webp',
            color: 'from-amber-500/10 to-amber-600/5',
            borderColor: 'border-amber-500/20',
            iconBg: 'bg-amber-500/20'
        },
        {
            id: 'audio-mixer',
            title: t('featureItems.audioMixer.title', { defaultValue: 'Real-Time Audio Mixer' }),
            description: t('featureItems.audioMixer.description', { defaultValue: 'Control your audio experience like a professional sound engineer with our intuitive real-time mixer.' }),
            icon: <SlidersHorizontal size={24} />,
            details: t.raw('featureItems.audioMixer.details') || [
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
            title: t('featureItems.priorityManagement.title', { defaultValue: 'Smart Priority Management' }),
            description: t('featureItems.priorityManagement.description', { defaultValue: 'Define which applications take audio priority.' }),
            icon: <Layers size={24} />,
            details: t.raw('featureItems.priorityManagement.details') || [
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
            title: t('featureItems.hotkeysGestures.title', { defaultValue: 'Hotkeys & Gesture Controls' }),
            description: t('featureItems.hotkeysGestures.description', { defaultValue: 'Control your audio without interrupting your workflow using customizable keyboard shortcuts.' }),
            icon: <Laptop size={24} />,
            details: t.raw('featureItems.hotkeysGestures.details') || [
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
            title: t('featureItems.notificationControl.title', { defaultValue: 'Intelligent Notification Control' }),
            description: t('featureItems.notificationControl.description', { defaultValue: 'Take control of your notification sounds with intelligent management.' }),
            icon: <BellRing size={24} />,
            details: t.raw('featureItems.notificationControl.details') || [
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
            title: t('featureItems.analyticsVisualization.title', { defaultValue: 'Audio Analytics & Visualization' }),
            description: t('featureItems.analyticsVisualization.description', { defaultValue: 'Gain insights into your audio environment with detailed analytics and visualizations.' }),
            icon: <BarChart3 size={24} />,
            details: t.raw('featureItems.analyticsVisualization.details') || [
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
};

// Use cases for audio control - Using translation keys
export const useAudioControlUseCases = () => {
    const t = useTranslations('audioControl');
    
    return [
        {
            title: t('useCaseItems.professionalVideoCalls.title'),
            description: t('useCaseItems.professionalVideoCalls.description'),
            icon: <MessageSquare size={24} />,
            color: 'bg-blue-500/20',
            apps: ['Zoom', 'Microsoft Teams', 'Google Meet']
        },
        {
            title: t('useCaseItems.gamingStreaming.title'),
            description: t('useCaseItems.gamingStreaming.description'),
            icon: <PanelRight size={24} />,
            color: 'bg-purple-500/20',
            apps: ['Discord', 'OBS Studio', 'Game clients']
        },
        {
            title: t('useCaseItems.contentConsumption.title'),
            description: t('useCaseItems.contentConsumption.description'),
            icon: <Headphones size={24} />,
            color: 'bg-amber-500/20',
            apps: ['Spotify', 'Netflix', 'YouTube']
        },
        {
            title: t('useCaseItems.focusProductivity.title'),
            description: t('useCaseItems.focusProductivity.description'),
            icon: <Zap size={24} />,
            color: 'bg-green-500/20',
            apps: ['Slack', 'Email clients', 'Productivity tools']
        }
    ];
};

// Simulated applications for the interactive demo - Using translation keys
export const useDemoApplications = () => {
    const t = useTranslations('audioControl');
    
    return [
        {
            id: 'videocall',
            name: t('demoItems.applications.videoCall'),
            icon: <Video size={20} />,
            color: 'bg-blue-500',
            volume: 80,
            type: 'Communication',
            device: t('demoItems.devices.headphones'),
            muted: false
        },
        {
            id: 'music',
            name: t('demoItems.applications.musicPlayer'),
            icon: <Music size={20} />,
            color: 'bg-green-500',
            volume: 60,
            type: 'Entertainment',
            device: t('demoItems.devices.speakers'),
            muted: false
        },
        {
            id: 'browser',
            name: t('demoItems.applications.browser'),
            icon: <Globe size={20} />,
            color: 'bg-purple-500',
            volume: 70,
            type: 'General',
            device: t('demoItems.devices.speakers'),
            muted: false
        },
        {
            id: 'chat',
            name: t('demoItems.applications.chat', { defaultValue: 'Chat App' }),
            icon: <MessageSquare size={20} />,
            color: 'bg-yellow-500',
            volume: 75,
            type: 'Communication',
            device: t('demoItems.devices.headphones'),
            muted: false
        },
        {
            id: 'game',
            name: t('demoItems.applications.game'),
            icon: <PanelRight size={20} />,
            color: 'bg-red-500',
            volume: 65,
            type: 'Entertainment',
            device: t('demoItems.devices.headphones'),
            muted: false
        }
    ];
};

// Audio devices for the demo - Using translation keys
export const useAudioDevices = () => {
    const t = useTranslations('audioControl');
    
    return [
        { id: 'default', name: t('demoItems.devices.default', { defaultValue: 'Default Output' }), type: 'System Default' },
        { id: 'headphones', name: t('demoItems.devices.headphones'), type: 'Output Device' },
        { id: 'speakers', name: t('demoItems.devices.speakers'), type: 'Output Device' },
        { id: 'bluetooth', name: t('demoItems.devices.bluetooth', { defaultValue: 'Bluetooth Headset' }), type: 'Wireless Output' }
    ];
};

// Preset profiles for the demo - Using translation keys
export const usePresetProfiles = () => {
    const t = useTranslations('audioControl');
    
    return [
        { id: 'meeting', name: t('demoItems.profiles.meeting'), icon: <MessageSquare size={16} /> },
        { id: 'gaming', name: t('demoItems.profiles.gaming'), icon: <PanelRight size={16} /> },
        { id: 'music', name: t('demoItems.profiles.music'), icon: <Music size={16} /> },
        { id: 'focus', name: t('demoItems.profiles.focus'), icon: <BellOff size={16} /> }
    ];
};

// FAQ data - Using translation keys
export const useAudioControlFaqs = () => {
    const t = useTranslations('audioControl');
    
    return [
        {
            question: t('faqItems.compatibility.question'),
            answer: t('faqItems.compatibility.answer')
        },
        {
            question: t('faqItems.systemRequirements.question'),
            answer: t('faqItems.systemRequirements.answer')
        },
        {
            question: t('faqItems.customProfiles.question'),
            answer: t('faqItems.customProfiles.answer')
        },
        {
            question: t('faqItems.deviceSupport.question'),
            answer: t('faqItems.deviceSupport.answer')
        },
        {
            question: t('faqItems.microphoneControl.question', { defaultValue: 'Can I control microphone inputs as well as audio outputs?' }),
            answer: t('faqItems.microphoneControl.answer', { defaultValue: 'Yes, JyvDesktop provides comprehensive control over both audio outputs and microphone inputs.' })
        },
        {
            question: t('faqItems.audioQuality.question', { defaultValue: 'Is there any audio quality loss when using the control features?' }),
            answer: t('faqItems.audioQuality.answer', { defaultValue: 'No, JyvDesktop processes audio in high-resolution 32-bit floating-point format, ensuring pristine audio quality without degradation.' })
        }
    ];
};