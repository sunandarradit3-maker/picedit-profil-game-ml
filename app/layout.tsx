import type { Metadata } from 'next';
import './globals.css';
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL('https://posterflow.example'),
  title: {
    default: APP_NAME,
    template: `%s • ${APP_NAME}`
  },
  description: APP_TAGLINE,
  keywords: ['poster generator', 'thumbnail generator', 'saas', 'next.js', 'content creator toolkit'],
  openGraph: {
    title: APP_NAME,
    description: APP_TAGLINE,
    type: 'website',
    locale: 'id_ID'
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_TAGLINE
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
