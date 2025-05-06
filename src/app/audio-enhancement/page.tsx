import AudioEnhancementClient from '@/components/audio-enhancement/AudioEnhancementClient';
import React from 'react';

/**
 * Audio Enhancement Page (Server Component)
 * 
 * This is a server component that renders the AudioEnhancementClient component.
 * It doesn't use the 'use client' directive, so it's rendered on the server.
 * 
 * The AudioEnhancementClient component is a client component that uses the
 * useTranslations hook from next-intl to access translations.
 */
export default function AudioEnhancementPage() {
  return <AudioEnhancementClient />;
}