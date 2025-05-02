import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getDirection } from '@/i18n';
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  // Get the locale from the params - must await in Next.js App Router
  const { locale } = await params;
  
  // Get messages for the locale - use the specific locale
  const messages = await import(`../../messages/${locale}.json`).then(module => module.default).catch(() => {
    // Fallback to default locale if messages for the requested locale are not found
    return import(`../../messages/en.json`).then(module => module.default);
  });
  
  // Get the text direction for the locale
  const direction = getDirection(locale);

  return (
    <>
      {/* Set HTML attributes */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.lang = "${locale}";
            document.documentElement.dir = "${direction}";
            document.documentElement.classList.add("scroll-smooth");
          `,
        }}
      />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div className={`antialiased bg-axc-dark min-h-screen ${geistSans.variable} ${geistMono.variable}`}>
          <GoogleAnalytics />
          <Navbar />
          {children}
        </div>
      </NextIntlClientProvider>
    </>
  );
}
