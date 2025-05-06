import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n';

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale,

  // Detect locale from browser/cookie settings
  localeDetection: true
});

// Export the middleware handler
export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname is missing a locale prefix and is not the root path
  // Root path is handled by next-intl middleware automatically
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (!pathnameHasLocale && pathname !== '/') {
    // Get the preferred locale from the request (browser settings, cookies, etc.)
    // If not found, use the default locale
    const preferredLocale = request.headers.get('accept-language')?.split(',')[0]?.split('-')[0];
    const locale = locales.includes(preferredLocale as any) ? preferredLocale : defaultLocale;
    
    // Create a URL with the locale prefix
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;
    
    // Redirect to the localized URL
    return NextResponse.redirect(newUrl);
  }
  
  // For all other cases, use the next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - files with extensions (e.g. static files)
  // - API routes
  // - _next paths (Next.js internals)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
