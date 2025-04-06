// This is a server component
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { locales } from '../../../middleware';
import ClientProviders from '../../../src/components/ClientProviders';
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define props for layout
interface RootLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  // Use params safely
  const locale = params.locale;
  
  // Validate that the incoming locale is supported
  if (!locales.includes(locale)) {
    notFound();
  }

  // Load the messages for the locale
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}/audio-control.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-axc-dark min-h-screen`}>
        <Navbar locale={locale} />
        <ClientProviders locale={locale} messages={messages}>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
} 