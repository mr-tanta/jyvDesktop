import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from '../i18n';

export default getRequestConfig(async ({requestLocale}) => {
  // Await the requestLocale to get the locale from the URL
  const locale = await requestLocale || defaultLocale;
  
  // Load the messages for the locale with error handling
  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    // Fallback to default locale if messages for the requested locale are not found
    messages = (await import(`../messages/${defaultLocale}.json`)).default;
  }
  
  return {
    locale,
    messages,
    timeZone: 'UTC'
  };
});