'use client';

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';

interface ClientProvidersProps {
  children: ReactNode;
  locale: string;
  messages: Record<string, any>;
}

export default function ClientProviders({
  children,
  locale,
  messages
}: ClientProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
} 