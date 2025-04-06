// Configure internationalization settings

// Declare locales that your application supports
export const locales = ['en', 'es'] as const;
export type Locale = typeof locales[number];
export const defaultLocale = 'en';

// Define the pathname structure for internationalized routes
export const pathnames = {
  '/': '/',
  '/audio-control': '/audio-control',
  '/download': '/download',
  '/use-cases': '/use-cases',
  '/docs/audio-control/[featureId]': {
    en: '/docs/audio-control/[featureId]',
    es: '/docs/control-de-audio/[featureId]'
  }
};

// Function to get messages based on locale
export async function getMessages(locale: Locale, namespace: string = 'audio-control') {
  return (await import(`./messages/${locale}/${namespace}.json`)).default;
} 