import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import StickyMobileCTA from '@/components/layout/StickyMobileCTA';

export const metadata: Metadata = {
  title: 'Webdozitra.cz — Profesionální web do 24 hodin | od 11 900 Kč',
  description:
    'Profesionální web hotový do 24 hodin. Garantovaně. Balíčky od 11 900 Kč. Žádné čekání, žádné skryté poplatky.',
  metadataBase: new URL('https://webdozitra.cz'),
  openGraph: {
    title: 'Webdozitra.cz — Web hotový do 24 hodin',
    description:
      'Profesionální web do 24 hodin. Garantovaně nebo vracíme zálohu. Od 11 900 Kč.',
    url: 'https://webdozitra.cz',
    siteName: 'Webdozitra.cz',
    locale: 'cs_CZ',
    type: 'website',
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Webdozitra.cz — Web hotový do 24 hodin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webdozitra.cz — Web hotový do 24 hodin',
    description: 'Profesionální web do 24 hodin. Od 11 900 Kč.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://webdozitra.cz',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900;1,14..32,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
