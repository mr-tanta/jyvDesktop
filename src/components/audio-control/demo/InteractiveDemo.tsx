'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import { Download, Sliders } from 'lucide-react';
import { demoApplications } from '@/data/audioControlData';
import DemoHeader from './DemoHeader';
import AppMixer from './AppMixer';

export const InteractiveDemo: React.FC = () => {
  // State for interactive demo
  const [demoApps, setDemoApps] = useState(demoApplications);
  const [masterVolume, setMasterVolume] = useState(75);
  const [activeProfile, setActiveProfile] = useState('default');
  const [notificationVolumeReduction, setNotificationVolumeReduction] = useState(50);
  const [focusModeEnabled, setFocusModeEnabled] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);

  // Refs for scroll animation
  const demoRef = useRef(null);
  const isInView = useInView(demoRef, { once: false, margin: "-100px 0px" });
  // Use a local state for isInView to avoid React.use (which is not needed here)
  const [isDemoInView, setIsDemoInView] = useState(false);
  
  // Update isDemoInView when isInView changes
  useEffect(() => {
    setIsDemoInView(isInView);
  }, [isInView]);

  // Audio Context and Audio Elements refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodesRef = useRef<Record<string, GainNode>>({});
  const audioElementsRef = useRef<Record<string, HTMLAudioElement>>({});
  const masterGainRef = useRef<GainNode | null>(null);
  const audioSourcesRef = useRef<Record<string, MediaElementAudioSourceNode>>({});

  // Initialize Web Audio API
  useEffect(() => {
    const initAudio = async () => {
      try {
        // Create Audio Context
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        // Initialize master gain node
        if (!masterGainRef.current && audioContextRef.current) {
          masterGainRef.current = audioContextRef.current.createGain();
          masterGainRef.current.gain.value = masterVolume / 100;
          masterGainRef.current.connect(audioContextRef.current.destination);
        }

        // Create audio elements and gain nodes for each app
        demoApps.forEach(app => {
          if (!audioElementsRef.current[app.id]) {
            // Create audio element
            const audioEl = new Audio();
            
            // Set source based on app type
            switch (app.id) {
              case 'videocall':
                audioEl.src = '/assets/audio/videocall-sample.mp3';
                break;
              case 'music':
                audioEl.src = '/assets/audio/music-sample.mp3';
                break;
              case 'browser':
                audioEl.src = '/assets/audio/browser-sample.mp3';
                break;
              case 'chat':
                audioEl.src = '/assets/audio/notification-sample.mp3';
                break;
              case 'game':
                audioEl.src = '/assets/audio/game-sample.mp3';
                break;
              default:
                audioEl.src = '/assets/audio/default-sample.mp3';
            }
            
            audioEl.loop = true;
            audioElementsRef.current[app.id] = audioEl;

            // Create source and gain node
            if (audioContextRef.current) {
              const source = audioContextRef.current.createMediaElementSource(audioEl);
              audioSourcesRef.current[app.id] = source;
              
              const gainNode = audioContextRef.current.createGain();
              gainNode.gain.value = app.muted ? 0 : app.volume / 100;
              
              // Connect source -> gain -> master gain -> destination
              source.connect(gainNode);
              gainNode.connect(masterGainRef.current!);
              
              gainNodesRef.current[app.id] = gainNode;
            }
          }
        });

        // Start playback of audio elements
        Object.values(audioElementsRef.current).forEach(audio => {
          // Using play() and catch to handle autoplay restrictions gracefully
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              // Auto-play was prevented, we'll need user interaction
              console.log("Autoplay prevented, waiting for user interaction");
            });
          }
        });

        setAudioInitialized(true);
      } catch (error) {
        console.error("Error initializing audio:", error);
      }
    };

    // Initialize on component mount
    if (typeof window !== 'undefined') {
      initAudio();
    }

    // Cleanup function
    return () => {
      // Stop all audio and disconnect nodes
      Object.values(audioElementsRef.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      
      // Close audio context
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Update master volume when changed
  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = masterVolume / 100;
    }
  }, [masterVolume]);

  // Update individual app volumes when they change
  useEffect(() => {
    demoApps.forEach(app => {
      const gainNode = gainNodesRef.current[app.id];
      if (gainNode) {
        gainNode.gain.value = app.muted ? 0 : app.volume / 100;
      }
    });
  }, [demoApps]);

  // Handle volume change in interactive demo
  const handleVolumeChange = (appId: string, newVolume: number) => {
    setDemoApps(prev =>
      prev.map(app =>
        app.id === appId ? { ...app, volume: newVolume } : app
      )
    );
  };

  // Handle mute toggle in interactive demo
  const handleMuteToggle = (appId: string) => {
    setDemoApps(prev =>
      prev.map(app =>
        app.id === appId ? { ...app, muted: !app.muted } : app
      )
    );
  };

  // Handle device change in interactive demo
  const handleDeviceChange = (appId: string, deviceId: string) => {
    // In a real application, this would change the audio output device
    // For this demo, we'll just update the UI state
    setDemoApps(prev =>
      prev.map(app =>
        app.id === appId ? { 
          ...app, 
          device: deviceId === 'default' 
            ? 'Default Output' 
            : deviceId === 'headphones'
              ? 'Headphones'
              : deviceId === 'speakers'
                ? 'Speakers'
                : 'Bluetooth Headset'
        } : app
      )
    );
  };

  // Initialize or resume audio after user interaction
  const handleUserInteraction = async () => {
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
      
      // Start all audio elements
      Object.values(audioElementsRef.current).forEach(audio => {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Play prevented:", error);
          });
        }
      });
    }
  };

  // Reset demo to defaults
  const resetDemo = () => {
    setDemoApps(demoApplications);
    setMasterVolume(75);
    setActiveProfile('default');
    setFocusModeEnabled(false);
    setNotificationVolumeReduction(50);
  };

  // Apply preset profile in demo
  const applyProfile = (profileId: string) => {
    setActiveProfile(profileId);

    // Simulate different preset behaviors
    if (profileId === 'meeting') {
      setDemoApps(prev =>
        prev.map(app => {
          if (app.id === 'videocall') return { ...app, volume: 90, muted: false };
          if (app.id === 'chat') return { ...app, volume: 80, muted: false };
          if (app.id === 'music') return { ...app, volume: 30, muted: false };
          if (app.id === 'browser') return { ...app, volume: 50, muted: false };
          if (app.id === 'game') return { ...app, volume: 0, muted: true };
          return app;
        })
      );
      setFocusModeEnabled(true);
      setMasterVolume(80);
    }
    else if (profileId === 'gaming') {
      setDemoApps(prev =>
        prev.map(app => {
          if (app.id === 'videocall') return { ...app, volume: 0, muted: true };
          if (app.id === 'chat') return { ...app, volume: 85, muted: false };
          if (app.id === 'music') return { ...app, volume: 40, muted: false };
          if (app.id === 'browser') return { ...app, volume: 60, muted: false };
          if (app.id === 'game') return { ...app, volume: 90, muted: false };
          return app;
        })
      );
      setFocusModeEnabled(false);
      setMasterVolume(85);
    }
    else if (profileId === 'music') {
      setDemoApps(prev =>
        prev.map(app => {
          if (app.id === 'videocall') return { ...app, volume: 0, muted: true };
          if (app.id === 'chat') return { ...app, volume: 40, muted: false };
          if (app.id === 'music') return { ...app, volume: 95, muted: false };
          if (app.id === 'browser') return { ...app, volume: 30, muted: false };
          if (app.id === 'game') return { ...app, volume: 0, muted: true };
          return app;
        })
      );
      setFocusModeEnabled(false);
      setMasterVolume(90);
    }
    else if (profileId === 'focus') {
      setDemoApps(prev =>
        prev.map(app => {
          if (app.id === 'videocall') return { ...app, volume: 0, muted: true };
          if (app.id === 'chat') return { ...app, volume: 60, muted: false };
          if (app.id === 'music') return { ...app, volume: 70, muted: false };
          if (app.id === 'browser') return { ...app, volume: 80, muted: false };
          if (app.id === 'game') return { ...app, volume: 0, muted: true };
          return app;
        })
      );
      setFocusModeEnabled(true);
      setMasterVolume(70);
    }
    else {
      // Default profile
      resetDemo();
    }
  };

  const fadeInUpVariant = {
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

  return (
    <section 
      id="interactive-demo" 
      className="py-24 relative" 
      ref={demoRef} 
      onClick={handleUserInteraction}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={isDemoInView ? "visible" : "hidden"}
          variants={fadeInUpVariant}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center py-1 px-4 mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm rounded-full">
            <Sliders size={14} className="text-green-400 mr-2" />
            <span className="text-sm text-green-400 font-medium">Interactive Experience</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">Try JyvDesktop's Audio Control</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Experience how JyvDesktop gives you precise control over your audio environment.
            Adjust application volumes, devices, and profiles in this interactive demo.
          </p>
          {!audioInitialized && (
            <button 
              onClick={handleUserInteraction}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
            >
              Click to Enable Audio
            </button>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isDemoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl"
        >
          <DemoHeader 
            masterVolume={masterVolume}
            setMasterVolume={setMasterVolume}
            activeProfile={activeProfile}
            applyProfile={applyProfile}
            resetDemo={resetDemo}
            focusModeEnabled={focusModeEnabled}
            setFocusModeEnabled={setFocusModeEnabled}
            notificationVolumeReduction={notificationVolumeReduction}
            setNotificationVolumeReduction={setNotificationVolumeReduction}
          />

          <AppMixer 
            demoApps={demoApps}
            handleVolumeChange={handleVolumeChange}
            handleMuteToggle={handleMuteToggle}
            handleDeviceChange={handleDeviceChange}
          />

          {/* Demo Footer */}
          <div className="border-t border-gray-800 p-4 bg-black/30">
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">Interactive demo - adjust volumes to hear the difference</div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Audio Engine:</span>
                <span className="text-xs text-green-500 flex items-center gap-1">
                  <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  {audioInitialized ? "Active" : "Initializing"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-gray-300 mb-6">Ready to experience the full power of JyvDesktop's audio control?</p>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-all"
          >
            <Download size={20} />
            <span>Download Now</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo; 