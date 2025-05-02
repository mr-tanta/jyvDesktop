import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './src/i18n';

// Middleware configuration for next-intl
export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale,

  // Detect locale from browser/cookie settings
  localeDetection: true
});

export const config = {
  // Match all pathnames except for
  // - files with extensions (e.g. static files)
  // - API routes
  // - _next paths (Next.js internals)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
