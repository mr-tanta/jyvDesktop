import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/i18n';
import React from 'react';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/**
 * Audio Control Page Layout
 * 
 * This layout wraps the audio-control page and loads the page-specific translations.
 * It extends the main layout by providing audio-control specific translations.
 */
export default async function AudioControlLayout({ children, params }: Props) {
  // Get the locale from the params
  const { locale } = await params;
  
  // Get messages for the audio-control page
  const messages = await getMessages(locale, 'audio-control');

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
