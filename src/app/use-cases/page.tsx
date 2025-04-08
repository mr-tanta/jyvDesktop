'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    Mic,
    Video,
    Users,
    Headphones,
    Gamepad,
    Music,
    Radio,
    Play,
    Pause,
    Volume2,
    ChevronRight,
    ArrowRight,
    Gift,
    Zap,
    VolumeX,
    Sliders,
    BarChart,
    Settings,
    Laptop,
    Sparkles,
    PanelRight,
    AudioLines,
    Download, Cpu, FileText
} from 'lucide-react';

// Use case categories
const useCaseCategories = [
    { id: 'remote-work', name: 'Remote Work', icon: <Laptop size={24} /> },
    { id: 'content-creation', name: 'Content Creation', icon: <Mic size={24} /> },
    { id: 'gaming', name: 'Gaming', icon: <Gamepad size={24} /> },
    { id: 'entertainment', name: 'Entertainment', icon: <Headphones size={24} /> },
    { id: 'audio-production', name: 'Audio Production', icon: <Music size={24} /> }
];

// Detailed use cases data
const useCasesData = {
    'remote-work': [
        {
            title: 'Virtual Meetings & Conferences',
            description: 'Sound professional in virtual meetings with noise suppression and voice enhancement. JyvDesktop automatically removes background distractions, keyboard sounds, and echo while ensuring your voice sounds clear and natural.',
            features: ['AI noise suppression', 'Voice enhancement', 'Application-specific volumes', 'Real-time processing'],
            icon: <Users size={24} />,
            image: '/assets/images/use-cases/virtual-meetings.webp',
            statistics: [
                { value: '94%', label: 'of users report clearer meeting audio' },
                { value: '78%', label: 'reduction in meeting interruptions' },
                { value: '25min', label: 'average increase in meeting productivity' }
            ],
            steps: [
                'Create a "Meeting" preset in JyvDesktop',
                'Enable AI noise suppression at 70-80% strength',
                'Adjust voice enhancement to match your microphone',
                'Apply automatic volume leveling for consistent audio',
                'Save the preset for quick access before meetings'
            ],
            quote: {
                text: "Since using JyvDesktop, I've stopped hearing 'Can you repeat that?' in meetings. The noise suppression is remarkable - my colleagues can't hear my dog barking or construction outside.",
                author: "Sophia Chen",
                role: "Project Manager at TechGlobal"
            },
            compatibleApps: [
                { name: 'Zoom', logo: '/assets/images/logos/zoom.svg' },
                { name: 'Microsoft Teams', logo: '/assets/images/logos/microsoft-teams.svg' },
                { name: 'Google Meet', logo: '/assets/images/logos/google-meet.svg' },
                { name: 'Slack', logo: '/assets/images/logos/slack.svg' },
                { name: 'Webex', logo: '/assets/images/logos/webex.webp' }
            ]
        },
        {
            title: 'Focused Work Environment',
            description: 'Create the perfect audio environment for focus and productivity. Control audio levels across applications, create custom sound profiles, and minimize distractions while working.',
            features: ['Application volume control', 'Audio routing', 'Focus mode presets', 'Notification management'],
            icon: <Zap size={24} />,
            image: '/assets/images/use-cases/focused-work.webp',
            statistics: [
                { value: '43%', label: 'improvement in focus time' },
                { value: '3.5h', label: 'additional productive hours per week' },
                { value: '67%', label: 'reduction in audio distractions' }
            ],
            steps: [
                'Configure application-specific volumes',
                'Set up custom audio routing for notifications',
                'Create "Deep Work" mode that mutes distractions',
                'Schedule automatic focus periods',
                'Integrate with productivity timers'
            ],
            quote: {
                text: "I work in an open office and JyvDesktop has been a game-changer. I can control each application's volume independently, keep my music at the perfect level, and never miss important notifications.",
                author: "Marcus Johnson",
                role: "Software Developer"
            },
            compatibleApps: [
                { name: 'Spotify', logo: '/assets/images/logos/spotify.svg' },
                { name: 'Slack', logo: '/assets/images/logos/slack.svg' },
                { name: 'Microsoft Office', logo: '/assets/images/logos/office.svg' },
                { name: 'Browser', logo: '/assets/images/logos/chrome.svg' }
            ]
        },
        {
            title: 'Customer Service & Support',
            description: 'Deliver exceptional customer service with crystal clear audio. JyvDesktop helps support teams sound professional while managing multiple audio sources and maintaining consistent sound quality throughout the day.',
            features: ['Background noise elimination', 'Voice clarity enhancement', 'Consistent audio levels', 'Multi-application management'],
            icon: <Radio size={24} />,
            image: '/assets/images/use-cases/customer-service.jpg',
            statistics: [
                { value: '26%', label: 'improvement in customer satisfaction scores' },
                { value: '18%', label: 'reduction in call duration' },
                { value: '91%', label: 'of agents report less voice fatigue' }
            ],
            steps: [
                'Configure voice enhancement for your headset',
                'Set up noise suppression profiles for different environments',
                'Enable automatic level adjustment for consistent volume',
                'Configure quick presets for different call types',
                'Integrate with your call center software'
            ],
            quote: {
                text: "Our customer service team's satisfaction ratings improved dramatically after implementing JyvDesktop. Customers can clearly hear our agents, and background office noise is completely eliminated.",
                author: "Alicia Martinez",
                role: "Customer Support Director"
            },
            compatibleApps: [
                { name: 'Zendesk', logo: '/assets/images/logos/zendesk.svg' },
                { name: 'Freshdesk', logo: '/assets/images/logos/freshdesk.webp' },
                { name: 'Salesforce', logo: '/assets/images/logos/salesforce.svg' },
                { name: 'Intercom', logo: '/assets/images/logos/intercom.svg' }
            ]
        }
    ],
    'content-creation': [
        {
            title: 'Podcasting & Voice Recording',
            description: 'Achieve studio-quality recordings without expensive equipment. JyvDesktop enhances your microphone, removes background noise, and processes your audio in real-time for professional results every time.',
            features: ['Microphone enhancement', 'Professional EQ presets', 'Dynamic processing', 'One-click optimization'],
            icon: <Mic size={24} />,
            image: '/assets/images/use-cases/podcasting.webp',
            statistics: [
                { value: '85%', label: 'reduction in post-processing time' },
                { value: '3.8×', label: 'improvement in audio clarity ratings' },
                { value: '97%', label: 'of podcasters recommend to colleagues' }
            ],
            steps: [
                'Select your recording hardware in JyvDesktop',
                'Choose the "Podcast Voice" preset or create a custom profile',
                'Adjust compression and EQ to match your voice',
                'Enable real-time processing during recording',
                'Save multiple presets for different recording scenarios'
            ],
            quote: {
                text: "I was skeptical about real-time processing for my podcast, but JyvDesktop has completely changed my workflow. My recordings sound professional right off the bat, with minimal post-processing needed.",
                author: "David Nguyen",
                role: "Host of 'Tech Unpacked' Podcast"
            },
            compatibleApps: [
                { name: 'Adobe Audition', logo: '/assets/images/logos/audition.webp' },
                { name: 'Audacity', logo: '/assets/images/logos/audacity.webp' },
                { name: 'GarageBand', logo: '/assets/images/logos/garageband.webp' },
                { name: 'Hindenburg', logo: '/assets/images/logos/hindenburg.webp' },
                { name: 'Riverside', logo: '/assets/images/logos/riverside.webp' }
            ],
            beforeAfterAudio: {
                before: '/assets/audio/podcast-before.mp3',
                after: '/assets/audio/podcast-after.mp3',
            }
        },
        {
            title: 'Video Content & Streaming',
            description: "Create professional video content with pristine audio quality. Whether you're streaming, creating YouTube videos, or producing online courses, JyvDesktop ensures your audience hears you clearly without distractions.",
            features: ['Live audio enhancement', 'Stream-optimized presets', 'Multi-source audio management', 'Low-latency processing'],
            icon: <Video size={24} />,
            image: '/assets/images/use-cases/video-streaming.webp',
            statistics: [
                { value: '34%', label: 'increase in viewer retention' },
                { value: '45%', label: 'growth in positive comments about audio' },
                { value: '2.1×', label: 'improvement in stream quality ratings' }
            ],
            steps: [
                'Configure JyvDesktop for your streaming setup',
                'Create separate presets for voice and background audio',
                'Set up audio routing between applications',
                'Enable low-latency mode for real-time streaming',
                'Save and quickly switch between different streaming scenarios'
            ],
            quote: {
                text: "JyvDesktop is now an essential part of my streaming setup. The ability to process my voice in real-time while managing game audio and music separately has elevated the quality of my streams dramatically.",
                author: "Elena Park",
                role: "Content Creator, 500K+ Subscribers"
            },
            compatibleApps: [
                { name: 'OBS Studio', logo: '/assets/images/logos/obs.webp' },
                { name: 'Streamlabs', logo: '/assets/images/logos/streamlabs.webp' },
                { name: 'XSplit', logo: '/assets/images/logos/xsplit.webp' },
                { name: 'Twitch Studio', logo: '/assets/images/logos/twitch.webp' },
                { name: 'YouTube Studio', logo: '/assets/images/logos/youtube.webp' }
            ]
        },
        {
            title: 'Voice-Over & Narration',
            description: "Deliver professional voice-overs without a recording booth. JyvDesktop's advanced processing gives your voice depth, clarity, and broadcast quality regardless of your recording environment.",
            features: ['Studio voice enhancement', 'Professional compression', 'Custom EQ profiles', 'Environment compensation'],
            icon: <AudioLines size={24} />,
            image: '/assets/images/use-cases/voiceover.webp',
            statistics: [
                { value: '79%', label: 'reduction in retakes due to audio issues' },
                { value: '4.2×', label: 'faster workflow from recording to delivery' },
                { value: '93%', label: "of clients can't tell the difference from studio recordings" }
            ],
            steps: [
                'Create a dedicated voice-over profile in JyvDesktop',
                'Analyze your recording environment with the acoustic tool',
                'Apply room correction and voice enhancement',
                'Fine-tune EQ and compression for your specific voice',
                'Save different presets for various voice-over styles'
            ],
            quote: {
                text: "As a freelance voice artist, I was limited by my home setup until I found JyvDesktop. Now I can deliver broadcast-quality voice-overs from my makeshift closet studio that rival professional booth recordings.",
                author: "James Wilson",
                role: "Professional Voice Artist"
            },
            compatibleApps: [
                { name: 'Adobe Premiere Pro', logo: '/assets/images/logos/premiere.webp' },
                { name: 'Final Cut Pro', logo: '/assets/images/logos/finalcut.webp' },
                { name: 'Logic Pro', logo: '/assets/images/logos/logic.webp' },
                { name: 'Pro Tools', logo: '/assets/images/logos/protools.webp' }
            ],
            beforeAfterAudio: {
                before: '/assets/audio/voiceover-before.mp3',
                after: '/assets/audio/voiceover-after.mp3',
            }
        }
    ],
    'gaming': [
        {
            title: 'Competitive Gaming',
            description: "Gain a competitive edge with enhanced spatial audio awareness. JyvDesktop's advanced 3D audio processing helps you pinpoint enemy locations, communicate clearly with teammates, and stay fully immersed in the action.",
            features: ['Spatial audio positioning', 'Footstep enhancement', 'Clear team communication', 'Game-specific audio profiles'],
            icon: <Gamepad size={24} />,
            image: '/assets/images/use-cases/competitive-gaming.webp',
            statistics: [
                { value: '22%', label: 'improvement in positional awareness' },
                { value: '31%', label: 'better performance in competitive matches' },
                { value: '89%', label: 'of players reported clearer team communication' }
            ],
            steps: [
                'Configure gaming headset with JyvDesktop',
                'Select game-specific audio profile or create custom',
                'Enable 3D audio positioning for spatial awareness',
                'Adjust footstep enhancement for improved detection',
                'Configure voice chat clarity for team communication'
            ],
            quote: {
                text: "The spatial audio processing in JyvDesktop has completely changed how I play FPS games. I can pinpoint exactly where enemies are coming from, and my teammates can hear me perfectly even during intense moments.",
                author: "Alex Rodriguez",
                role: "Professional Esports Player"
            },
            compatibleGames: [
                { name: 'Counter-Strike', logo: '/assets/images/logos/cs.webp' },
                { name: 'Valorant', logo: '/assets/images/logos/valorant.webp' },
                { name: 'Call of Duty', logo: '/assets/images/logos/cod.webp' },
                { name: 'Apex Legends', logo: '/assets/images/logos/apex.webp' },
                { name: 'Fortnite', logo: '/assets/images/logos/fortnite.webp' }
            ]
        },
        {
            title: 'Game Streaming',
            description: 'Create a professional streaming experience with perfect audio balance. JyvDesktop helps you manage game audio, music, voice chat, and your microphone simultaneously, all while ensuring your viewers hear exactly what you want them to.',
            features: ['Multi-source audio mixing', 'Stream-optimized voice', 'Background music management', 'Personalized audio routing'],
            icon: <PanelRight size={24} />,
            image: '/assets/images/use-cases/game-streaming.webp',
            statistics: [
                { value: '41%', label: 'increase in stream watch time' },
                { value: '58%', label: 'reduction in audio-related viewer complaints' },
                { value: '3.7×', label: 'improvement in audio quality ratings' }
            ],
            steps: [
                'Create a streaming profile in JyvDesktop',
                'Configure separate volume levels for game, voice, and music',
                'Set up voice enhancement for clear commentary',
                'Create custom audio routing for stream mix',
                'Enable alerts and notification management'
            ],
            quote: {
                text: "JyvDesktop solved my biggest streaming challenge - balancing game audio, music, and my voice. My viewers constantly compliment how professional my stream sounds now, and I never have to worry about game audio drowning out my commentary.",
                author: "Maya Thompson",
                role: "Gaming Content Creator"
            },
            compatibleApps: [
                { name: 'OBS Studio', logo: '/assets/images/logos/obs.webp' },
                { name: 'Streamlabs', logo: '/assets/images/logos/streamlabs.webp' },
                { name: 'Discord', logo: '/assets/images/logos/discord.webp' },
                { name: 'Spotify', logo: '/assets/images/logos/spotify.webp' },
                { name: 'Twitch Studio', logo: '/assets/images/logos/twitch.webp' }
            ]
        },
        {
            title: 'Immersive Single-Player Gaming',
            description: 'Experience games as developers intended with enhanced audio immersion. JyvDesktop optimizes game audio for your specific headphones or speakers, enhances soundtracks, and creates a more cinematic gaming experience.',
            features: ['Immersive sound enhancement', 'Dynamic range optimization', 'Personalized audio profiles', 'Cinematic audio mode'],
            icon: <Sparkles size={24} />,
            image: '/assets/images/use-cases/immersive-gaming.webp',
            statistics: [
                { value: '87%', label: 'of users report more immersive experience' },
                { value: '43%', label: 'enhancement in cinematic moments' },
                { value: '2.8×', label: 'improvement in spatial awareness' }
            ],
            steps: [
                'Create an immersive gaming profile',
                'Configure headphone optimization for your specific model',
                'Enable dynamic range enhancement for cinematic moments',
                'Adjust spatial audio parameters for your preferences',
                'Fine-tune game-specific audio settings'
            ],
            quote: {
                text: "Playing through Cyberpunk 2077 with JyvDesktop's immersive audio mode was like experiencing the game for the first time again. The soundscape was so much richer and more detailed - I heard elements I'd completely missed before.",
                author: "Chris Walker",
                role: "Gaming Enthusiast"
            },
            compatibleGames: [
                { name: 'Cyberpunk 2077', logo: '/assets/images/logos/cyberpunk.webp' },
                { name: 'Red Dead Redemption 2', logo: '/assets/images/logos/rdr2.webp' },
                { name: 'The Last of Us', logo: '/assets/images/logos/tlou.webp' },
                { name: 'God of War', logo: '/assets/images/logos/gow.webp' },
                { name: 'Elden Ring', logo: '/assets/images/logos/elden.webp' }
            ]
        }
    ],
    'entertainment': [
        {
            title: 'Music Listening Enhancement',
            description: 'Rediscover your music library with advanced audio enhancement. JyvDesktop customizes audio playback for your specific headphones or speakers, enhances detail and depth, and creates a more immersive listening experience without expensive equipment.',
            features: ['Dynamic EQ optimization', 'Headphone-specific profiles', 'Spatial audio enhancement', 'Adaptive sound adjustment'],
            icon: <Music size={24} />,
            image: '/assets/images/use-cases/music-listening.webp',
            statistics: [
                { value: '92%', label: 'of users report hearing new details in familiar music' },
                { value: '78%', label: 'improvement in perceived audio quality' },
                { value: '3.2×', label: 'wider perceived soundstage' }
            ],
            steps: [
                'Select your headphones/speakers from the database or create custom profile',
                'Choose music genre presets or create your own',
                'Enable spatial widening for more immersive sound',
                'Adjust bass and clarity enhancement to taste',
                'Create automatic profiles that activate with specific music apps'
            ],
            quote: {
                text: "I've been an audiophile for years but was skeptical about software enhancement. JyvDesktop proved me wrong - it makes my existing headphones sound significantly better, bringing out details and improving the soundstage dramatically.",
                author: "Robert Kim",
                role: "Music Producer & Audiophile"
            },
            compatibleApps: [
                { name: 'Spotify', logo: '/assets/images/logos/spotify.webp' },
                { name: 'Apple Music', logo: '/assets/images/logos/applemusic.webp' },
                { name: 'Tidal', logo: '/assets/images/logos/tidal.webp' },
                { name: 'YouTube Music', logo: '/assets/images/logos/ytmusic.webp' },
                { name: 'Amazon Music', logo: '/assets/images/logos/amazonmusic.webp' }
            ],
            beforeAfterAudio: {
                before: '/assets/audio/music-before.mp3',
                after: '/assets/audio/music-after.mp3',
            }
        },
        {
            title: 'Movie & Streaming Video',
            description: 'Transform your laptop, tablet or desktop into a cinematic experience. JyvDesktop enhances dialogue clarity, optimizes dynamic range, and creates virtual surround sound for an immersive viewing experience on any device.',
            features: ['Dialogue enhancement', 'Virtual surround sound', 'Dynamic range optimization', 'Content-adaptive processing'],
            icon: <Video size={24} />,
            image: '/assets/images/use-cases/movie-streaming.webp',
            statistics: [
                { value: '84%', label: 'improvement in dialogue intelligibility' },
                { value: '71%', label: 'enhancement in perceived immersion' },
                { value: '2.5×', label: 'wider perceived soundstage' }
            ],
            steps: [
                'Create a dedicated movie/streaming profile',
                'Enable dialogue enhancement for clearer speech',
                'Adjust virtual surround settings for your setup',
                'Configure dynamic range for your viewing environment',
                'Save custom profiles for day/night viewing'
            ],
            quote: {
                text: "Watching movies on my laptop was always disappointing until I found JyvDesktop. Now dialog is crystal clear, action scenes have impact without being overwhelming, and there's a genuine sense of surround sound from my small speakers.",
                author: "Emily Richards",
                role: "Film Enthusiast"
            },
            compatibleApps: [
                { name: 'Netflix', logo: '/assets/images/logos/netflix.webp' },
                { name: 'Disney+', logo: '/assets/images/logos/disney.webp' },
                { name: 'Prime Video', logo: '/assets/images/logos/prime.webp' },
                { name: 'HBO Max', logo: '/assets/images/logos/hbo.webp' },
                { name: 'YouTube', logo: '/assets/images/logos/youtube.webp' }
            ]
        },
        {
            title: 'Audiobook & Podcast Listening',
            description: 'Enhance your spoken word content with voice clarity optimization. JyvDesktop makes voices more intelligible, removes distracting background noise from recordings, and helps you focus on content even in noisy environments.',
            features: ['Voice clarity enhancement', 'Listening fatigue reduction', 'Background noise filtering', 'Personalized listening profiles'],
            icon: <Headphones size={24} />,
            image: '/assets/images/use-cases/audiobook-podcast.webp',
            statistics: [
                { value: '89%', label: 'improvement in voice intelligibility' },
                { value: '64%', label: 'reduction in listening fatigue' },
                { value: '2.3×', label: 'longer comfortable listening sessions' }
            ],
            steps: [
                'Create a podcast/audiobook listening profile',
                'Enable voice clarity enhancement',
                'Adjust EQ settings for your specific headphones',
                'Configure adaptive volume for consistent listening levels',
                'Create profiles for different listening environments'
            ],
            quote: {
                text: "I listen to podcasts for hours while commuting in noisy environments. JyvDesktop makes voices significantly clearer and less fatiguing, letting me enjoy content at lower volumes while still hearing every word perfectly.",
                author: "Sarah Johnson",
                role: "Podcast Enthusiast"
            },
            compatibleApps: [
                { name: 'Audible', logo: '/assets/images/logos/audible.webp' },
                { name: 'Spotify', logo: '/assets/images/logos/spotify.webp' },
                { name: 'Apple Podcasts', logo: '/assets/images/logos/applepodcasts.webp' },
                { name: 'Pocket Casts', logo: '/assets/images/logos/pocketcasts.webp' },
                { name: 'Overcast', logo: '/assets/images/logos/overcast.webp' }
            ]
        }
    ],
    'audio-production': [
        {
            title: 'Music Production',
            description: 'Enhance your music production workflow with advanced audio processing. JyvDesktop integrates with your DAW, provides real-time monitoring effects, and helps achieve professional results regardless of your studio environment.',
            features: ['Studio environment correction', 'Advanced monitoring effects', 'DAW integration', 'Reference track comparison'],
            icon: <Music size={24} />,
            image: '/assets/images/use-cases/music-production.webp',
            statistics: [
                { value: '76%', label: 'reduction in mix revisions' },
                { value: '67%', label: 'improvement in monitoring accuracy' },
                { value: '3.5×', label: 'faster workflow from composition to mastering' }
            ],
            steps: [
                'Configure JyvDesktop for your production setup',
                'Create custom monitoring chains for different stages',
                'Enable room correction for your studio environment',
                'Set up reference track comparison tools',
                'Configure DAW integration for seamless workflow'
            ],
            quote: {
                text: "JyvDesktop has become an indispensable part of my production chain. The room correction and monitoring tools have significantly improved my ability to make accurate mixing decisions in my less-than-ideal home studio.",
                author: "Michael Rivera",
                role: "Independent Music Producer"
            },
            compatibleApps: [
                { name: 'Ableton Live', logo: '/assets/images/logos/ableton.webp' },
                { name: 'FL Studio', logo: '/assets/images/logos/flstudio.webp' },
                { name: 'Logic Pro', logo: '/assets/images/logos/logic.webp' },
                { name: 'Pro Tools', logo: '/assets/images/logos/protools.webp' },
                { name: 'Studio One', logo: '/assets/images/logos/studioone.webp' }
            ]
        },
        {
            title: 'Audio Post-Production',
            description: 'Streamline your post-production workflow with specialized audio tools. JyvDesktop helps synchronize, clean, enhance, and monitor audio for video projects with professional-grade processing and integrated workflow.',
            features: ['Dialog enhancement', 'Noise reduction', 'Integrated workflow tools', 'Format standardization'],
            icon: <Settings size={24} />,
            image: '/assets/images/use-cases/audio-post.webp',
            statistics: [
                { value: '81%', label: 'reduction in dialog cleanup time' },
                { value: '64%', label: 'faster overall post-production workflow' },
                { value: '3.2×', label: 'improvement in delivered audio quality' }
            ],
            steps: [
                'Configure post-production workflow in JyvDesktop',
                'Set up integrated processing chains',
                'Create template profiles for different delivery formats',
                'Configure monitoring environment correction',
                'Enable batch processing for efficiency'
            ],
            quote: {
                text: "As a post-production sound designer, JyvDesktop has revolutionized my workflow. The dialog enhancement tools alone have saved me countless hours of manual processing, and the output is remarkably clean and natural.",
                author: "Thomas Wright",
                role: "Audio Post-Production Engineer"
            },
            compatibleApps: [
                { name: 'Adobe Premiere Pro', logo: '/assets/images/logos/premiere.webp' },
                { name: 'Final Cut Pro', logo: '/assets/images/logos/finalcut.webp' },
                { name: 'DaVinci Resolve', logo: '/assets/images/logos/davinci.webp' },
                { name: 'Pro Tools', logo: '/assets/images/logos/protools.webp' },
                { name: 'Reaper', logo: '/assets/images/logos/reaper.webp' }
            ],
            beforeAfterAudio: {
                before: '/assets/audio/post-before.mp3',
                after: '/assets/audio/post-after.mp3',
            }
        },
        {
            title: 'Live Sound & Performance',
            description: 'Enhance your live performances with real-time audio processing. JyvDesktop provides low-latency effects, virtual monitoring, and integration with live sound equipment for better performances and audience experiences.',
            features: ['Ultra low latency processing', 'Live performance presets', 'Monitoring enhancement', 'Integration with live equipment'],
            icon: <Radio size={24} />,
            image: '/assets/images/use-cases/live-performance.webp',
            statistics: [
                { value: '<8ms', label: 'total processing latency' },
                { value: '86%', label: 'of performers report enhanced monitoring' },
                { value: '74%', label: 'improvement in audience audio experience' }
            ],
            steps: [
                'Configure JyvDesktop for your live setup',
                'Create custom performance presets',
                'Set up virtual monitoring chains',
                'Configure low-latency mode for performance',
                'Integrate with existing live sound equipment'
            ],
            quote: {
                text: "For smaller venues where a full PA system isn't feasible, JyvDesktop has been invaluable. I can process my vocals and acoustic guitar in real-time with studio-quality effects, and the audience hears a professional mix through simplified equipment.",
                author: "Lisa Carpenter",
                role: "Singer-Songwriter"
            },
            compatibleApps: [
                { name: 'MainStage', logo: '/assets/images/logos/mainstage.webp' },
                { name: 'Ableton Live', logo: '/assets/images/logos/ableton.webp' },
                { name: 'REAPER', logo: '/assets/images/logos/reaper.webp' },
                { name: 'Pro Tools', logo: '/assets/images/logos/protools.webp' }
            ]
        }
    ]
};

export default function UseCasesPage() {
    // State for tracking the active category and use case
    const [activeCategory, setActiveCategory] = useState('remote-work');
    const [activeUseCase, setActiveUseCase] = useState(0);
    const [activeFeatureTab, setActiveFeatureTab] = useState('overview');
    const [isPlaying, setIsPlaying] = useState({ before: false, after: false });

    // Refs for audio elements
    const audioRefBefore = useRef<HTMLAudioElement | null>(null);
    const audioRefAfter = useRef<HTMLAudioElement | null>(null);

    // Get the current use cases based on active category
    const currentUseCases = useCasesData[activeCategory as keyof typeof useCasesData] || [];
    // Get the current use case
    const currentUseCase = currentUseCases[activeUseCase] as any || {};

    // Animation variants
    const sectionVariants = {
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

    // Toggle audio playback
    const toggleAudioPlayback = (type: 'before' | 'after') => {
        const audioRef = type === 'before' ? audioRefBefore : audioRefAfter;

        if (isPlaying[type]) {
            audioRef.current?.pause();
            setIsPlaying(prev => ({ ...prev, [type]: false }));
        } else {
            // Pause the other audio if it's playing
            if (type === 'before' && isPlaying.after) {
                audioRefAfter.current?.pause();
                setIsPlaying(prev => ({ ...prev, after: false }));
            } else if (type === 'after' && isPlaying.before) {
                audioRefBefore.current?.pause();
                setIsPlaying(prev => ({ ...prev, before: false }));
            }

            audioRef.current?.play();
            setIsPlaying(prev => ({ ...prev, [type]: true }));
        }
    };

    // Handle audio end event
    useEffect(() => {
        const handleAudioEnd = (type: 'before' | 'after') => {
            setIsPlaying(prev => ({ ...prev, [type]: false }));
        };

        if (audioRefBefore.current) {
            audioRefBefore.current.addEventListener('ended', () => handleAudioEnd('before'));
        }

        if (audioRefAfter.current) {
            audioRefAfter.current.addEventListener('ended', () => handleAudioEnd('after'));
        }

        return () => {
            if (audioRefBefore.current) {
                audioRefBefore.current.removeEventListener('ended', () => handleAudioEnd('before'));
            }

            if (audioRefAfter.current) {
                audioRefAfter.current.removeEventListener('ended', () => handleAudioEnd('after'));
            }
        };
    }, [audioRefBefore, audioRefAfter]);

    // Reset active feature tab when changing use case
    useEffect(() => {
        setActiveFeatureTab('overview');
    }, [activeCategory, activeUseCase]);

    return (
        <main className="bg-black text-white min-h-screen">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-green-500/20 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
                <div className="absolute top-20 left-1/4 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px]"></div>
            </div>

            {/* Hero Section */}
            <section className="relative py-40 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={sectionVariants}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm text-green-400 font-medium">Transform your audio experience</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                            Powerful Audio Solutions for <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Every Scenario</span>
                        </h1>

                        <p className="text-lg text-gray-300 mb-12">
                            Discover how JyvDesktop enhances audio quality and provides unprecedented control
                            across a wide range of professional and everyday applications.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/download"
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
                            >
                                <Download size={20} />
                                <span>Download Now</span>
                            </Link>

                            <button
                                onClick={() => {
                                    const element = document.querySelector('#use-cases');
                                    if (element) {
                                        element.scrollIntoView({
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <ChevronRight size={20} />
                                <span>Explore Use Cases</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Category Navigation */}
            <section id="use-cases" className="sticky top-0 z-30 bg-black/80 backdrop-blur-lg border-b border-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl items-center justify-center">
                    <div className="py-4 overflow-x-auto scrollbar-hide">
                        <div className="flex items-center justify-center gap-2 md:gap-8 mx-auto">
                            {useCaseCategories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        setActiveCategory(category.id);
                                        setActiveUseCase(0);
                                    }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                                        activeCategory === category.id
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : 'bg-transparent text-gray-400 hover:text-white hover:bg-gray-800'
                                    }`}
                                >
                                    {category.icon}
                                    <span className="font-medium">{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases Selector */}
            <section className="bg-gray-900/50 border-b border-gray-800">
                <div className="container mx-auto justify-center items-center px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="py-4 overflow-x-auto scrollbar-hide">
                        <div className="flex items-center justify-center gap-2 min-w-max">
                            {currentUseCases.map((useCase: any, index:any) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveUseCase(index)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                                        activeUseCase === index
                                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                                            : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
                                    }`}
                                >
                                    {useCase.icon}
                                    <span className="font-medium">{useCase.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${activeCategory}-${activeUseCase}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Overview Section */}
                            <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center mb-12">
                                {/* Image */}
                                <div className="order-2 lg:order-1 rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
                                    <div className="aspect-video relative">
                                        <Image
                                            src={currentUseCase.image || '/assets/images/use-cases/placeholder.webp'}
                                            alt={currentUseCase.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                                        {/* Compatible Apps/Games Logos */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="text-xs text-gray-400 font-medium">
                                                  Works with:
                                                </span>
                                                {(currentUseCase.compatibleApps || currentUseCase.compatibleGames || []).slice(0, 5).map((app: any, index: any) => (
                                                    <div
                                                        key={index}
                                                        className="w-8 h-8 bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center p-1.5"
                                                        title={app.name}
                                                    >
                                                        <div className="relative w-full h-full">
                                                            <Image
                                                                src={app.logo}
                                                                alt={app.name}
                                                                fill
                                                                className="object-contain"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="order-1 lg:order-2 ">
                                    <h2 className="text-3xl font-bold mb-4">{currentUseCase.title}</h2>
                                    <p className="text-gray-300 mb-6 leading-relaxed">{currentUseCase.description}</p>

                                    {/* Key Features */}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold mb-4 text-white">Key Features</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {currentUseCase.features.map((feature: any, index: any) => (
                                                <div key={index} className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                                                    <Zap size={16} className="text-green-500 flex-shrink-0" />
                                                    <span className="text-sm text-gray-200">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Statistics */}
                                    {currentUseCase.statistics && (
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                            {currentUseCase.statistics.map((stat, index) => (
                                                <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-center">
                                                    <div className="text-2xl font-bold text-green-400 mb-1">{stat.value}</div>
                                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}


                                </div>
                            </div>

                            {/* Quote */}
                            {currentUseCase.quote && (
                                <div className="bg-gray-800/30 border border-gray-800 rounded-xl p-6 mb-6">
                                    <div className="flex items-start gap-4">
                                        <div className="text-green-500 mt-1">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 16.5C8.93 16.5 10.5 14.93 10.5 13C10.5 11.07 8.93 9.5 7 9.5C5.07 9.5 3.5 11.07 3.5 13L3.5 14C3.5 18.15 6.85 21.5 11 21.5V19C8.24 19 6 16.76 6 14V13C6 12.17 6.67 11.5 7.5 11.5C8.33 11.5 9 12.17 9 13C9 13.83 8.33 14.5 7.5 14.5V16.5H7ZM17 16.5C18.93 16.5 20.5 14.93 20.5 13C20.5 11.07 18.93 9.5 17 9.5C15.07 9.5 13.5 11.07 13.5 13L13.5 14C13.5 18.15 16.85 21.5 21 21.5V19C18.24 19 16 16.76 16 14V13C16 12.17 16.67 11.5 17.5 11.5C18.33 11.5 19 12.17 19 13C19 13.83 18.33 14.5 17.5 14.5V16.5H17Z" fill="currentColor"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-300 italic mb-4">"{currentUseCase.quote.text}"</p>
                                            <div>
                                                <p className="font-medium text-white">{currentUseCase.quote.author}</p>
                                                <p className="text-sm text-gray-400">{currentUseCase.quote.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Tabs for different sections */}
                            <div className="border-b border-gray-800 mb-8">
                                <div className="flex overflow-x-auto scrollbar-hide">
                                    <button
                                        onClick={() => setActiveFeatureTab('overview')}
                                        className={`px-6 py-4 font-medium whitespace-nowrap ${
                                            activeFeatureTab === 'overview'
                                                ? 'border-b-2 border-green-500 text-green-400'
                                                : 'text-gray-400 hover:text-white'
                                        }`}
                                    >
                                        Overview
                                    </button>

                                    {currentUseCase.steps && (
                                        <button
                                            onClick={() => setActiveFeatureTab('howto')}
                                            className={`px-6 py-4 font-medium whitespace-nowrap ${
                                                activeFeatureTab === 'howto'
                                                    ? 'border-b-2 border-green-500 text-green-400'
                                                    : 'text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            How To
                                        </button>
                                    )}

                                    {currentUseCase?.beforeAfterAudio && (
                                        <button
                                            onClick={() => setActiveFeatureTab('audio')}
                                            className={`px-6 py-4 font-medium whitespace-nowrap ${
                                                activeFeatureTab === 'audio'
                                                    ? 'border-b-2 border-green-500 text-green-400'
                                                    : 'text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            Before & After
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Tab Content */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeFeatureTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Overview Tab */}
                                    {activeFeatureTab === 'overview' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* UI Preview */}
                                            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden p-6">
                                                <h3 className="text-xl font-bold mb-6">User Interface</h3>
                                                <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-700">
                                                    <Image
                                                        src="/assets/images/app-screenshot.webp"
                                                        alt="JyvDesktop interface"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                                                    {/* Interactive UI Hotspots */}
                                                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md rounded-lg p-2 border border-green-500/30">
                                                        <div className="flex items-center gap-2">
                                                            <Sliders size={16} className="text-green-500" />
                                                            <span className="text-xs text-white font-medium">Intuitive Controls</span>
                                                        </div>
                                                    </div>

                                                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md rounded-lg p-2 border border-green-500/30">
                                                        <div className="flex items-center gap-2">
                                                            <BarChart size={16} className="text-green-500" />
                                                            <span className="text-xs text-white font-medium">Real-time Analysis</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6">
                                                    <h4 className="font-medium text-white mb-3">Key UI Features for {currentUseCase.title}</h4>
                                                    <ul className="space-y-2">
                                                        <li className="flex items-start gap-2">
                                                            <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                                            <span className="text-gray-300 text-sm">Customizable interface optimized for {activeCategory}</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                                            <span className="text-gray-300 text-sm">One-click presets for common {currentUseCase.title.toLowerCase()} scenarios</span>
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                                            <span className="text-gray-300 text-sm">Visual feedback for real-time audio processing</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Integration */}
                                            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden p-6">
                                                <h3 className="text-xl font-bold mb-6">Integration</h3>

                                                <div className="grid grid-cols-1 gap-4">
                                                    {/* Compatible Apps */}
                                                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                                                        <h4 className="font-medium text-white mb-3 flex items-center">
                                                            <Gift size={16} className="text-green-500 mr-2" />
                                                            Compatible with Your Favorite Apps
                                                        </h4>

                                                        <div className="flex flex-wrap gap-3">
                                                            {(currentUseCase.compatibleApps || currentUseCase.compatibleGames || []).map((app: any, index: any) => (
                                                                <div key={index} className="flex items-center gap-2 bg-gray-700/50 rounded-lg px-3 py-2">
                                                                    <div className="relative w-5 h-5">
                                                                        <Image
                                                                            src={app.logo}
                                                                            alt={app.name}
                                                                            fill
                                                                            className="object-contain"
                                                                        />
                                                                    </div>
                                                                    <span className="text-sm text-gray-200">{app.name}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* System Requirements */}
                                                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                                                        <h4 className="font-medium text-white mb-3 flex items-center">
                                                            <Cpu size={16} className="text-green-500 mr-2" />
                                                            Performance Optimization
                                                        </h4>

                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                            <div className="flex items-start gap-2">
                                                                <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                                                <div>
                                                                    <span className="text-white text-sm font-medium">Low CPU Usage</span>
                                                                    <p className="text-gray-400 text-xs">Less than 5% CPU for most use cases</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-start gap-2">
                                                                <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                                                <div>
                                                                    <span className="text-white text-sm font-medium">Ultra-Low Latency</span>
                                                                    <p className="text-gray-400 text-xs">Under 10ms for real-time processing</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-start gap-2">
                                                                <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                                                <div>
                                                                    <span className="text-white text-sm font-medium">Minimal Memory</span>
                                                                    <p className="text-gray-400 text-xs">Less than 200MB RAM footprint</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-start gap-2">
                                                                <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                                                <div>
                                                                    <span className="text-white text-sm font-medium">Background Processing</span>
                                                                    <p className="text-gray-400 text-xs">Continues working efficiently in background</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Customer Support */}
                                                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                                                        <h4 className="font-medium text-white mb-3">Professional Support</h4>
                                                        <p className="text-sm text-gray-300 mb-3">
                                                            Our team provides specialist support for {activeCategory} users with custom
                                                            configuration advice and optimization for {currentUseCase.title.toLowerCase()}.
                                                        </p>
                                                        <Link
                                                            href="/support"
                                                            className="text-green-400 hover:text-green-300 text-sm flex items-center gap-1"
                                                        >
                                                            <span>Learn more about our support options</span>
                                                            <ArrowRight size={14} />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* How To Tab */}
                                    {activeFeatureTab === 'howto' && currentUseCase.steps && (
                                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden p-8">
                                            <h3 className="text-2xl font-bold mb-6">How to Set Up JyvDesktop for {currentUseCase.title}</h3>

                                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                                                <div className="lg:col-span-3">
                                                    <ol className="space-y-6">
                                                        {currentUseCase.steps.map((step, index) => (
                                                            <li key={index} className="flex items-start gap-4">
                                                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center font-bold text-green-400">
                                                                    {index + 1}
                                                                </div>
                                                                <div>
                                                                    <p className="text-gray-300">{step}</p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ol>

                                                    <div className="mt-8 pt-8 border-t border-gray-800">
                                                        <h4 className="font-medium text-white mb-4">Pro Tips</h4>
                                                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                                                            <ul className="space-y-3">
                                                                <li className="flex items-start gap-2">
                                                                    <Sparkles size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                                                    <span className="text-gray-200 text-sm">Use keyboard shortcuts for quick adjustments during {activeCategory}.</span>
                                                                </li>
                                                                <li className="flex items-start gap-2">
                                                                    <Sparkles size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                                                    <span className="text-gray-200 text-sm">Save multiple presets for different {currentUseCase.title.toLowerCase()} scenarios.</span>
                                                                </li>
                                                                <li className="flex items-start gap-2">
                                                                    <Sparkles size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                                                    <span className="text-gray-200 text-sm">Utilize A/B comparison to fine-tune your audio settings.</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="lg:col-span-2">
                                                    <div className="sticky top-28">
                                                        <div className="bg-gray-800/70 border border-gray-700 rounded-xl overflow-hidden">
                                                            <div className="aspect-video relative">
                                                                <Image
                                                                    src="/assets/images/howto-preview.webp"
                                                                    alt="Setup guide"
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
                                                                    <button className="bg-green-500/90 hover:bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center">
                                                                        <Play size={24} className="ml-1" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="p-4">
                                                                <h5 className="font-medium text-white">Setup Guide Video</h5>
                                                                <p className="text-sm text-gray-400">Watch our step-by-step tutorial</p>
                                                            </div>
                                                        </div>

                                                        <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                                            <Link
                                                                href="/docs/tutorials"
                                                                className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                                                            >
                                                                <FileText size={16} />
                                                                <span>Read Documentation</span>
                                                            </Link>

                                                            <Link
                                                                href="/download"
                                                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm transition-all"
                                                            >
                                                                <Download size={16} />
                                                                <span>Download Now</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Before & After Tab */}
                                    {activeFeatureTab === 'audio' && currentUseCase?.beforeAfterAudio && (
                                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden p-8">
                                            <h3 className="text-2xlfont-bold mb-6">Hear the JyvDesktop Difference</h3>
                                            <p className="text-gray-300 mb-8">
                                                Listen to the dramatic improvement in audio quality when using JyvDesktop for {currentUseCase.title.toLowerCase()}.
                                                Toggle between the before and after samples to experience the difference.
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {/* Before Audio */}
                                                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                                                            <VolumeX size={24} className="text-gray-400" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium text-white">Before JyvDesktop</h4>
                                                            <p className="text-sm text-gray-400">Original unprocessed audio</p>
                                                        </div>
                                                    </div>

                                                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex items-center gap-4">
                                                        <button
                                                            onClick={() => toggleAudioPlayback('before')}
                                                            className="bg-gray-700 hover:bg-gray-600 transition-colors w-12 h-12 rounded-full flex items-center justify-center"
                                                        >
                                                            {isPlaying.before ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                                                        </button>

                                                        <div className="flex-1">
                                                            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                                                                <div
                                                                    className="bg-gray-600 h-full"
                                                                    style={{
                                                                        width: audioRefBefore.current ?
                                                                            `${(audioRefBefore.current.currentTime / audioRefBefore.current.duration) * 100}%` :
                                                                            '0%'
                                                                    }}
                                                                ></div>
                                                            </div>

                                                            <audio
                                                                ref={audioRefBefore}
                                                                src={currentUseCase.beforeAfterAudio.before}
                                                                className="hidden"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mt-6">
                                                        <h5 className="text-sm font-medium text-white mb-2">Problems with Unprocessed Audio:</h5>
                                                        <ul className="space-y-2">
                                                            <li className="flex items-start gap-2">
                                                                <ChevronRight size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                                                                <span className="text-gray-400 text-sm">Background noise and distractions</span>
                                                            </li>
                                                            <li className="flex items-start gap-2">
                                                                <ChevronRight size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                                                                <span className="text-gray-400 text-sm">Inconsistent volume levels</span>
                                                            </li>
                                                            <li className="flex items-start gap-2">
                                                                <ChevronRight size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                                                                <span className="text-gray-400 text-sm">Lack of clarity and definition</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* After Audio */}
                                                <div className="bg-gradient-to-b from-green-900/30 to-emerald-900/20 border border-green-800/30 rounded-xl p-6">
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                                                            <Volume2 size={24} className="text-white" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium text-white">With JyvDesktop</h4>
                                                            <p className="text-sm text-green-400">Enhanced with AI processing</p>
                                                        </div>
                                                    </div>

                                                    <div className="bg-black/30 border border-green-500/20 rounded-lg p-4 flex items-center gap-4">
                                                        <button
                                                            onClick={() => toggleAudioPlayback('after')}
                                                            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all w-12 h-12 rounded-full flex items-center justify-center"
                                                        >
                                                            {isPlaying.after ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                                                        </button>

                                                        <div className="flex-1">
                                                            <div className="h-3 bg-black/50 rounded-full overflow-hidden">
                                                                <div
                                                                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-full"
                                                                    style={{
                                                                        width: audioRefAfter.current ?
                                                                            `${(audioRefAfter.current.currentTime / audioRefAfter.current.duration) * 100}%` :
                                                                            '0%'
                                                                    }}
                                                                ></div>
                                                            </div>

                                                            <audio
                                                                ref={audioRefAfter}
                                                                src={currentUseCase.beforeAfterAudio.after}
                                                                className="hidden"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mt-6">
                                                        <h5 className="text-sm font-medium text-white mb-2">JyvDesktop Enhancements:</h5>
                                                        <ul className="space-y-2">
                                                            <li className="flex items-start gap-2">
                                                                <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                                                <span className="text-gray-200 text-sm">Background noise completely eliminated</span>
                                                            </li>
                                                            <li className="flex items-start gap-2">
                                                                <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                                                <span className="text-gray-200 text-sm">Voice clarity and presence enhanced</span>
                                                            </li>
                                                            <li className="flex items-start gap-2">
                                                                <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                                                <span className="text-gray-200 text-sm">Professional audio quality throughout</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center gap-6 justify-between">
                                                <div>
                                                    <h4 className="font-medium text-white mb-1">Ready to transform your audio?</h4>
                                                    <p className="text-gray-400">Experience the same quality improvement with your own audio.</p>
                                                </div>

                                                <Link
                                                    href="/download"
                                                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
                                                >
                                                    <Download size={20} />
                                                    <span>Download JyvDesktop</span>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* More Use Cases */}
            <section className="py-16 bg-gradient-to-b from-black to-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Discover More Use Cases</h2>
                        <p className="text-gray-400 max-w-3xl mx-auto">
                            JyvDesktop is designed to enhance audio across a wide range of activities and industries.
                            Explore how it can transform your specific audio needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {useCaseCategories.filter(cat => cat.id !== activeCategory).map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-gray-900/70 border border-gray-800 rounded-2xl overflow-hidden"
                            >
                                <div className="h-48 relative">
                                    <Image
                                        src={`/assets/images/categories/${category.id}.webp`}
                                        alt={category.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center">
                                                {category.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{category.name}</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <ul className="space-y-3 mb-6">
                                        {useCasesData[category.id].slice(0, 2).map((useCase, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                                <span className="text-gray-300">{useCase.title}</span>
                                            </li>
                                        ))}
                                        <li className="flex items-start gap-2 text-gray-400">
                                            <ChevronRight size={16} className="text-green-500 mt-1 flex-shrink-0" />
                                            <span>...and more</span>
                                        </li>
                                    </ul>

                                    <button
                                        onClick={() => {
                                            setActiveCategory(category.id);
                                            setActiveUseCase(0);
                                            document.querySelector('#use-cases').scrollIntoView({
                                                behavior: 'smooth'
                                            });
                                        }}
                                        className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors"
                                    >
                                        <span>Explore {category.name} use cases</span>
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-green-500/20 to-transparent"></div>
                    <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[120px]"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
                    <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">Ready to elevate your audio experience?</h2>
                                <p className="text-gray-300 mb-6">
                                    Download JyvDesktop now and transform the way you hear and interact with audio across all your devices.
                                    Start with our free tier or unlock the full power with our Pro and Studio options.
                                </p>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3">
                                        {/*<div className="h-6 w-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">*/}
                                        {/*    <ChevronRight size={16} className="text-green-500" />*/}
                                        {/*</div>*/}
                                        {/*<div>*/}
                                        {/*    <h4 className="font-medium text-white">Free 14-day trial of all premium features</h4>*/}
                                        {/*    <p className="text-sm text-gray-400">Experience the full capability of JyvDesktop without commitment</p>*/}
                                        {/*</div>*/}
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="h-6 w-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                                            <ChevronRight size={16} className="text-green-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">Easy installation on all platforms</h4>
                                            <p className="text-sm text-gray-400">Windows, macOS, and Chromebook fully supported</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="h-6 w-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                                            <ChevronRight size={16} className="text-green-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">30-day money-back guarantee</h4>
                                            <p className="text-sm text-gray-400">Try risk-free with our satisfaction guarantee</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href="/download"
                                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-green-900/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Download size={20} />
                                        <span>Download Now</span>
                                    </Link>

                                    <Link
                                        href="/pricing"
                                        className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ArrowRight size={20} />
                                        <span>View Pricing Plans</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/assets/images/screenshot-2.webp"
                                        alt="JyvDesktop in action"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                    {/* User testimonial overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="bg-black/70 backdrop-blur-md rounded-xl p-4 border border-gray-800">
                                            <p className="text-gray-200 italic text-sm mb-3">
                                                "JyvDesktop has completely transformed how I experience audio. From meetings to music, everything sounds better."
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">Samuel Chen</p>
                                                    <p className="text-xs text-gray-400">Audio Engineer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating features */}
                                <div className="absolute -top-5 -right-5 bg-gray-900/90 backdrop-blur-md p-3 rounded-lg border border-green-500/30 shadow-xl">
                                    <div className="flex items-center gap-2">
                                        <Zap size={18} className="text-green-500" />
                                        <span className="text-sm text-white font-medium">AI-Powered Audio</span>
                                    </div>
                                </div>

                                <div className="absolute -bottom-5 -left-5 bg-gray-900/90 backdrop-blur-md p-3 rounded-lg border border-green-500/30 shadow-xl">
                                    <div className="flex items-center gap-2">
                                        <Headphones size={18} className="text-green-500" />
                                        <span className="text-sm text-white font-medium">Spatial Audio</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}