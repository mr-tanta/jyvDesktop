// Import only what we need for internationalization
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Define the list of supported locales
export const locales = ['en', 'es', 'zh', 'fr', 'pt', 'ar', 'hi'];

// Define the default locale
export const defaultLocale = 'en';

// Define the text direction for each locale
export const localeDirection = {
  en: 'ltr',
  es: 'ltr',
  zh: 'ltr',
  fr: 'ltr',
  pt: 'ltr',
  ar: 'rtl', // Arabic is right-to-left
  hi: 'ltr'
};

// Get the text direction for a locale
export function getDirection(locale: string) {
  return localeDirection[locale as keyof typeof localeDirection] || 'ltr';
}

// Get messages for a specific page and locale
export async function getPageMessages(locale: string, page: string) {
  try {
    // Try to load page-specific messages
    return (await import(`./messages/${locale}/${page}.json`)).default;
  } catch (pageError) {
    try {
      // If page-specific messages don't exist, try to load from common
      return (await import(`./messages/${locale}/common.json`)).default;
    } catch (commonError) {
      // If common messages don't exist for this locale, fall back to default locale
      try {
        return (await import(`./messages/${defaultLocale}/${page}.json`)).default;
      } catch (defaultPageError) {
        // Final fallback to default locale's common messages
        return (await import(`./messages/${defaultLocale}/common.json`)).default;
      }
    }
  }
}

// Get all messages for a locale (common + page-specific)
export async function getMessages(locale: string, page?: string) {
  // If no page is specified, just load common messages
  if (!page) {
    try {
      return (await import(`./messages/${locale}/common.json`)).default;
    } catch (error) {
      return (await import(`./messages/${defaultLocale}/common.json`)).default;
    }
  }
  
  // Load both common and page-specific messages
  try {
    const commonMessages = await getPageMessages(locale, 'common');
    const pageMessages = await getPageMessages(locale, page);
    
    // Merge common and page-specific messages
    return { ...commonMessages, ...pageMessages };
  } catch (error) {
    console.error(`Error loading messages for ${locale}/${page}:`, error);
    return (await import(`./messages/${defaultLocale}/common.json`)).default;
  }
}

// Configuration for next-intl
export default getRequestConfig(async ({ locale }) => {
  // Validate that the locale is supported
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Load the messages for the locale
  const messages = await getMessages(locale);

  return {
    locale,
    messages,
    timeZone: 'UTC'
  };
});
