import type { Metadata } from 'next';
import { locales } from '../../../../middleware';
import AudioControlPageClient from '../../../../src/components/audio-control/AudioControlPageClient';

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  // Use params safely
  const locale = params.locale;
  
  // Validate that the locale is supported
  if (!locales.includes(locale)) {
    return {
      title: 'Audio Control - JyvDesktop',
      description: 'Precision audio control features for your desktop',
    };
  }

  // Handle different locale titles
  const titles = {
    en: 'Audio Control - JyvDesktop',
    es: 'Control de Audio - JyvDesktop',
  };

  const descriptions = {
    en: 'Precision audio control features for your desktop',
    es: 'Funciones de control de audio preciso para tu escritorio',
  };

  return {
    title: titles[locale as keyof typeof titles],
    description: descriptions[locale as keyof typeof descriptions],
    alternates: {
      canonical: `/${locale}/audio-control`,
      languages: {
        en: '/en/audio-control',
        es: '/es/audio-control',
      },
    },
  };
}

export default function AudioControlPage() {
  return <AudioControlPageClient />;
} 