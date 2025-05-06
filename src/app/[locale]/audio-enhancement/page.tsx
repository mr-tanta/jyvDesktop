import { Suspense } from 'react';
import AudioEnhancementClient from '@/components/audio-enhancement/AudioEnhancementClient';

/**
 * Localized Audio Enhancement Page (Server Component)
 * 
 * This is a server component that renders the AudioEnhancementClient component.
 * It doesn't use the 'use client' directive, so it's rendered on the server.
 * 
 * The AudioEnhancementClient component is a client component that uses the
 * useTranslations hook from next-intl to access translations.
 * 
 * Since this page is under the [locale] directory, it will automatically have
 * access to the NextIntlClientProvider context from the [locale]/layout.tsx file.
 */
export default function LocalizedAudioEnhancementPage() {
  return (
    <Suspense fallback={
      <div className="h-screen bg-gradient-to-b from-black to-black/90 flex items-center justify-center">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-4 border-green-500/20 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-t-4 border-green-500 animate-spin"></div>
        </div>
      </div>
    }>
      <AudioEnhancementClient />
    </Suspense>
  );
}