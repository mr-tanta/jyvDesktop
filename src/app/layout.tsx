import type { Metadata } from "next";
import "./globals.css";
import React from "react";

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

// This is the root layout that provides the basic HTML structure
// The locale-specific layout will handle locale-specific concerns
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
