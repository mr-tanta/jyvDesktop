import {locales, defaultLocale} from '../i18n';

export const routing = {
  locales,
  defaultLocale
};

// Helper function to check if a locale is supported
export function hasLocale(locales: string[], locale: string) {
  return locales.includes(locale);
}
