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

// Get messages for a locale
export async function getMessages(locale: string) {
  try {
    return (await import(`./messages/${locale}.json`)).default;
  } catch (error) {
    return (await import(`./messages/${defaultLocale}.json`)).default;
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
