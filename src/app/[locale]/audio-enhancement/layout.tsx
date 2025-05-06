import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/i18n';
import React from 'react';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/**
 * Audio Enhancement Page Layout
 * 
 * This layout wraps the audio-enhancement page and loads the page-specific translations.
 * It extends the main layout by providing audio-enhancement specific translations.
 */
export default async function AudioEnhancementLayout({ children, params }: Props) {
  // Get the locale from the params
  const { locale } = await params;
  
  // Get messages for the audio-enhancement page
  const messages = await getMessages(locale, 'audio-enhancement');

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
