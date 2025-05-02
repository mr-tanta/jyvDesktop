import { redirect } from 'next/navigation';
import intlConfig from '../../next-intl.config.js';

// Redirect to the default locale
export default function Home() {
  redirect(`/${intlConfig.defaultLocale}`);
}
