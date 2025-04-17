import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JyvStream Desktop - Professional Audio Control Suite",
  description: "Take control of your audio environment with JyvStream Desktop. AI-powered noise suppression, spatial audio enhancement, and app-level volume control for creators, gamers, and professionals.",
  keywords: "audio control, noise suppression, spatial audio, voice enhancement, app volume control, desktop audio, creator tools",
  openGraph: {
    title: "JyvStream Desktop - Professional Audio Control Suite",
    description: "Take control of your audio environment with AI-powered audio enhancement tools",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JyvStream Desktop",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-axc-dark min-h-screen`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
