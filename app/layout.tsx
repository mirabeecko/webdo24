import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Profesionální web na klíč do 24 hodin | webdo24.cz',
  description:
    'Profesionální web na klíč do 24 hodin. Vlastní design, hosting v ceně, texty v ceně, základní SEO. Speciální cena 4 900 Kč — platí jen 15 minut.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://webdo24.cz'),
  openGraph: {
    title: 'Profesionální web na klíč do 24 hodin | webdo24.cz',
    description: 'Vlastní design, hosting v ceně, texty v ceně. Zítra máš hotovo.',
    locale: 'cs_CZ',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
