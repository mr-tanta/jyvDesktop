import React from 'react';
import {
    Mic,
    Video,
    Users,
    Headphones,
    Gamepad,
    Music,
    Radio,
    Zap,
    Laptop,
    AudioLines,
    PanelRight,
    Sparkles,
    Settings
} from 'lucide-react';
import { ReactNode } from 'react';

export interface CategoryType {
    id: string;
    name: string;
    icon: ReactNode;
}

export interface Statistic {
    value: string;
    label: string;
}

export interface Quote {
    text: string;
    author: string;
    role: string;
}

export interface CompatibleApp {
    name: string;
    logo: string;
}

export interface BeforeAfterAudio {
    before: string;
    after: string;
}

export interface UseCaseType {
    title: string;
    description: string;
    features: string[];
    icon: ReactNode;
    image: string;
    statistics: Statistic[];
    steps: string[];
    quote: Quote;
    compatibleApps?: CompatibleApp[];
    compatibleGames?: CompatibleApp[];
    beforeAfterAudio?: BeforeAfterAudio;
}

export interface UseCasesDataType {
    [key: string]: UseCaseType[];
}

// Use case categories
export const useCaseCategories: CategoryType[] = [
    { id: 'remote-work', name: 'Remote Work', icon: <Laptop size={24} /> },
    { id: 'content-creation', name: 'Content Creation', icon: <Mic size={24} /> },
    { id: 'gaming', name: 'Gaming', icon: <Gamepad size={24} /> },
    { id: 'entertainment', name: 'Entertainment', icon: <Headphones size={24} /> },
    { id: 'audio-production', name: 'Audio Production', icon: <Music size={24} /> }
];

// Detailed use cases data
export const useCasesData: UseCasesDataType = {
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
                { name: 'Zoom', logo: '/assets/images/logos/zoom.webp' },
                { name: 'Microsoft Teams', logo: '/assets/images/logos/teams.webp' },
                { name: 'Google Meet', logo: '/assets/images/logos/meet.webp' },
                { name: 'Slack', logo: '/assets/images/logos/slack.webp' },
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
                { name: 'Spotify', logo: '/assets/images/logos/spotify.webp' },
                { name: 'Slack', logo: '/assets/images/logos/slack.webp' },
                { name: 'Microsoft Office', logo: '/assets/images/logos/office.webp' },
                { name: 'Browser', logo: '/assets/images/logos/chrome.webp' }
            ]
        },
        {
            title: 'Customer Service & Support',
            description: 'Deliver exceptional customer service with crystal clear audio. JyvDesktop helps support teams sound professional while managing multiple audio sources and maintaining consistent sound quality throughout the day.',
            features: ['Background noise elimination', 'Voice clarity enhancement', 'Consistent audio levels', 'Multi-application management'],
            icon: <Radio size={24} />,
            image: '/assets/images/use-cases/customer-service.webp',
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
                { name: 'Zendesk', logo: '/assets/images/logos/zendesk.webp' },
                { name: 'Freshdesk', logo: '/assets/images/logos/freshdesk.webp' },
                { name: 'Salesforce', logo: '/assets/images/logos/salesforce.webp' },
                { name: 'Intercom', logo: '/assets/images/logos/intercom.webp' }
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
        }
    ]
}; 