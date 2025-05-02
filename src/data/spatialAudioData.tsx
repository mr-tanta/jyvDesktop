import React from 'react';
import {
    Ear,
    Orbit,
    Boxes,
    Box,
    Maximize,
    Sliders,
    Compass,
    Mic,
    Music,
    Gamepad,
    MessageSquare,
    FilmIcon,
    ZapOff,
    Wind,
    Home,
    Users,
    Building,
    Globe
} from 'lucide-react';

// Spatial Audio Features
export const spatialAudioFeatures = [
    {
        id: '3d-positioning',
        title: '3D Audio Positioning',
        description: "Experience true spatial awareness with precise positional audio. JyvDesktop's 3D audio engine creates an immersive sound field that accurately places sounds in virtual space around you.",
        icon: <Orbit size={24}/>,
        details: [
            'Precise object-based audio positioning in 3D space',
            'Up to 128 virtual sound sources with individual control',
            'Accurate distance modeling with natural attenuation',
            'Head-tracking support for compatible devices',
            'Virtual room modeling with realistic acoustics'
        ],
        image: '/assets/images/spatial-audio/3d-positioning.webp',
        color: 'from-blue-500/10 to-blue-600/5',
        borderColor: 'border-blue-500/20',
        iconBg: 'bg-blue-500/20'
    },
    {
        id: 'hrtf-processing',
        title: 'Custom HRTF Processing',
        description: "Our advanced Head-Related Transfer Function (HRTF) processing creates a personalized spatial audio experience tailored to your unique hearing profile for unparalleled realism.",
        icon: <Ear size={24}/>,
        details: [
            'Personalized HRTF profiles for individualized listening',
            'Database of over 200 HRTF models for different head shapes',
            'Custom profile creation through measurement process',
            'Optimized for headphones, earbuds, and speaker systems',
            'Continuous adaptation based on listening patterns'
        ],
        image: '/assets/images/spatial-audio/hrtf-processing.webp',
        color: 'from-purple-500/10 to-purple-600/5',
        borderColor: 'border-purple-500/20',
        iconBg: 'bg-purple-500/20'
    },
    {
        id: 'format-support',
        title: 'Multi-Format Support',
        description: 'JyvDesktop supports a wide range of spatial audio formats, ensuring compatibility with all your content. From stereo to Dolby Atmos and beyond, everything sounds better with JyvDesktop.',
        icon: <Boxes size={24}/>,
        details: [
            'Support for Dolby Atmos, DTS:X, Sony 360 Reality Audio',
            'Conversion between different spatial audio formats',
            'Stereo-to-spatial upmixing with AI-powered processing',
            'Binaural rendering for headphone optimization',
            'Channel-based and object-based audio support'
        ],
        image: '/assets/images/spatial-audio/format-support.webp',
        color: 'from-amber-500/10 to-amber-600/5',
        borderColor: 'border-amber-500/20',
        iconBg: 'bg-amber-500/20'
    },
    {
        id: 'virtual-environments',
        title: 'Virtual Acoustic Environments',
        description: 'Create immersive acoustic spaces with realistic room simulation. Experience your audio as if you were in a concert hall, theater, studio, or any custom environment you can imagine.',
        icon: <Box size={24}/>,
        details: [
            'Realistic room modeling with accurate acoustics',
            'Dozens of presets including concert halls, theaters, stadiums',
            'Custom environment creation with adjustable parameters',
            'Material-based acoustic properties for realistic reflections',
            'Real-time environment morphing for dynamic experiences'
        ],
        image: '/assets/images/spatial-audio/virtual-environments.webp',
        color: 'from-green-500/10 to-green-600/5',
        borderColor: 'border-green-500/20',
        iconBg: 'bg-green-500/20'
    },
    {
        id: 'smart-presence',
        title: 'Smart Presence Enhancement',
        description: 'Our intelligent presence enhancement algorithm analyses audio content and intelligently adjusts spatial characteristics to create a more immersive, engaging listening experience.',
        icon: <Maximize size={24}/>,
        details: [
            'Content-aware spatial enhancement for different audio types',
            'Widened soundstage for music without artificial artifacts',
            'Focused dialogue positioning for videos and games',
            'Adaptive ambience extraction and enhancement',
            'Spatial consistency preservation across content'
        ],
        image: '/assets/images/spatial-audio/smart-presence.webp',
        color: 'from-indigo-500/10 to-indigo-600/5',
        borderColor: 'border-indigo-500/20',
        iconBg: 'bg-indigo-500/20'
    },
    {
        id: 'personalization',
        title: 'Personalized Listening Profiles',
        description: 'Create custom spatial audio profiles for different content types, devices, and preferences. JyvDesktop remembers your preferences and automatically applies the right settings.',
        icon: <Sliders size={24}/>,
        details: [
            'User-specific spatial profiles based on listening preferences',
            'Content-specific presets for music, movies, games, and calls',
            'Device-optimized settings for headphones, speakers, earbuds',
            'Quick switching between profiles with hotkeys',
            'Automatic profile selection based on content detection'
        ],
        image: '/assets/images/spatial-audio/personalization.webp',
        color: 'from-pink-500/10 to-pink-600/5',
        borderColor: 'border-pink-500/20',
        iconBg: 'bg-pink-500/20'
    },
    {
        id: 'headtracking',
        title: 'Dynamic Head Tracking',
        description: 'Experience next-level immersion with dynamic head tracking. As you move your head, the audio field stays fixed in virtual space, creating a startlingly realistic sense of presence.',
        icon: <Compass size={24}/>,
        details: [
            'Support for accelerometer-equipped headphones',
            'Camera-based head tracking option for standard headphones',
            'Ultra-responsive with <5ms latency',
            'Customizable tracking sensitivity and response curve',
            'Calibration wizard for optimal performance'
        ],
        image: '/assets/images/spatial-audio/headtracking.webp',
        color: 'from-cyan-500/10 to-cyan-600/5',
        borderColor: 'border-cyan-500/20',
        iconBg: 'bg-cyan-500/20'
    },
    {
        id: 'integration',
        title: 'Seamless Application Integration',
        description: "JyvDesktop's spatial audio technology integrates with all your applications, from video conferencing and streaming services to games and productivity tools.",
        icon: <Boxes size={24}/>,
        details: [
            'Works with streaming platforms like Netflix, Spotify, YouTube',
            'Gaming engine integration for titles using standard audio APIs',
            'Video conferencing optimization for spatial participant positioning',
            'DAW plugins for professional audio production',
            'API for third-party application integration (Pro Tier)'
        ],
        image: '/assets/images/spatial-audio/integration.webp',
        color: 'from-red-500/10 to-red-600/5',
        borderColor: 'border-red-500/20',
        iconBg: 'bg-red-500/20'
    }
];

// Use cases specific to Spatial Audio
export const useCases = [
    {
        title: 'Gaming & Esports',
        description: 'Gain a competitive edge with pinpoint audio positioning. Hear exactly where enemies are coming from and immerse yourself fully in game environments.',
        icon: <Gamepad size={24}/>,
        color: 'bg-blue-500/20',
        benefits: [
            'Precise spatial awareness of game sounds',
            "Hear opponents positions with pinpoint accuracy",
            'Immersive environmental sound effects',
            'Customized profiles for different game genres',
            'Balance between game audio and team communication'
        ]
    },
    {
        title: 'Movies & Entertainment',
        description: 'Transform your laptop or desktop into a complete home theater with immersive surround sound using any headphones or speakers.',
        icon: <FilmIcon size={24}/>,
        color: 'bg-purple-500/20',
        benefits: [
            'Theater-like experience with any headphones',
            'Enhanced dialogue clarity and positioning',
            'Immersive environmental effects',
            'Support for Dolby Atmos and other formats',
            'Custom room simulation for different content'
        ]
    },
    {
        title: 'Music Listening',
        description: 'Experience your music collection in a new dimension with expanded soundstage, precise instrument positioning, and customizable acoustic environments.',
        icon: <Music size={24}/>,
        color: 'bg-green-500/20',
        benefits: [
            'Expanded soundstage for stereo recordings',
            'Concert hall and studio acoustic simulations',
            'Detailed instrument separation and positioning',
            'Genre-specific spatial enhancement profiles',
            'Preservation of original mixing intentions'
        ]
    },
    {
        title: 'Virtual Meetings',
        description: 'Make virtual meetings feel more natural with spatial positioning of participants and acoustic environments that reduce fatigue and improve comprehension.',
        icon: <MessageSquare size={24}/>,
        color: 'bg-amber-500/20',
        benefits: [
            'Position different participants in virtual space',
            'Reduce listening fatigue during long meetings',
            'Improve speech intelligibility and focus',
            'Create sense of shared virtual space',
            'Balanced acoustic environment for professional calls'
        ]
    }
];

// Visual positions for the 3D audio demo
export const soundPositions = [
    {
        id: 'voice',
        name: 'Voice',
        icon: <Mic size={20} />,
        color: 'bg-blue-500',
        x: 50,
        y: 30,
        audioFile: '/assets/audio/spatial-audio/voice.mp3'
    },
    {
        id: 'music',
        name: 'Music',
        icon: <Music size={20} />,
        color: 'bg-purple-500',
        x: 25,
        y: 50,
        audioFile: '/assets/audio/spatial-audio/music.mp3'
    },
    {
        id: 'effects',
        name: 'Effects',
        icon: <ZapOff size={20} />,
        color: 'bg-amber-500',
        x: 75,
        y: 60,
        audioFile: '/assets/audio/spatial-audio/footstep-sound-effects.mp3'
    },
    {
        id: 'ambience',
        name: 'Ambience',
        icon: <Wind size={20} />,
        color: 'bg-emerald-500',
        x: 65,
        y: 25,
        audioFile: '/assets/audio/spatial-audio/cricket-ambience.mp3'
    }
];

// Environment presets for the demo with impulse response files
export const environmentPresets = [
    { id: 'default', name: 'Default', icon: <Home size={14} />, ir: null },
    { id: 'studio', name: 'Studio', icon: <Mic size={14} />, ir: '/assets/audio/reverb/small-room.wav' },
    { id: 'room', name: 'Room', icon: <Users size={14} />, ir: '/assets/audio/reverb/living-room.wav' },
    { id: 'hall', name: 'Hall', icon: <Building size={14} />, ir: '/assets/audio/reverb/concert-hall.wav' },
    { id: 'arena', name: 'Arena', icon: <Globe size={14} />, ir: '/assets/audio/reverb/large-hall.wav' }
];

// FAQ data
export const faqs = [
    {
        question: 'Do I need special headphones to experience spatial audio?',
        answer: 'No, JyvDesktop works with any headphones or earbuds. While higher quality headphones will provide better overall sound, our spatial audio processing works with everything from budget earbuds to premium studio headphones. For the absolute best experience, we recommend open-back headphones with a neutral frequency response.'
    },
    {
        question: "How is JyvDesktop's spatial audio different from built-in surround features?",
        answer: 'Unlike basic surround sound solutions, JyvDesktop uses advanced HRTF processing, personalized acoustic profiles, and intelligent content analysis to create truly immersive 3D audio. Our technology not only positions sounds horizontally around you, but also provides precise vertical positioning and distance perception, creating a full hemisphere of sound that reacts naturally to your movements with compatible head-tracking devices.'
    },
    {
        question: 'Will spatial audio work with my existing music, games, and videos?',
        answer: 'Yes! While JyvDesktop fully supports dedicated spatial audio formats like Dolby Atmos and Sony 360 Reality Audio, it also enhances standard stereo content through intelligent upmixing. Our AI-powered algorithms analyze stereo audio in real-time, extracting spatial cues and repositioning elements to create a natural, immersive experience from any content.'
    },
    {
        question: 'Does spatial audio processing add latency to games or video calls?',
        answer: "JyvDesktop's spatial audio processing is optimized for ultra-low latency, typically adding less than 8 ms of processing time, which is imperceptible in most applications. For competitive gaming or other latency-sensitive applications, we offer a special low-latency mode that further reduces processing time to under 5 ms while maintaining excellent spatial positioning.",
    },
    {
        question: 'Can I customize the spatial audio experience?',
        answer:
            'Absolutely! JyvDesktop offers extensive customization options for spatial audio, from choosing different HRTF models to match your hearing characteristics to adjusting room size, material properties, and reverb characteristics. You can save custom profiles for different content types and applications, and even create your own virtual environments from scratch.'
    },
    {
        question: 'Does spatial audio work with speakers as well as headphones?',
        answer:
            'Yes, JyvDesktop includes specialized processing for speaker systems that creates an expanded soundstage and enhanced spatial imaging from any speaker configuration. While headphones provide the most precise 3D positioning due to their isolated ear channels, our speaker optimization technology significantly improves the spatial qualities of any speaker setup from laptop speakers to multi-channel systems.'
    }
]; 