import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Define locales
export const locales = ['en', 'es'];
export const defaultLocale = 'en';

// Create middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

// Export the middleware function with redirection for missing locale
export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip static assets, API routes and internal Next.js routes
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.match(/\.(jpg|png|svg|ico|webp)$/)
  ) {
    return;
  }
  
  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // Handle root path specially to avoid redirect loops
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }
  
  // For other paths without locale, add the default locale
  if (!pathnameHasLocale) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }
  
  // Use the intl middleware for paths that already have a locale
  return intlMiddleware(request);
}

// Define the matchers for middleware to run on
export const matcher = [
  // Match root path
  '/',
  // Match all top-level paths except excluded ones
  '/((?!api|_next|.*\\.).*)',
  // Match all paths with a locale prefix
  '/:locale/:path*'
]; 