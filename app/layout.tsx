import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Do24 — Web do 24 hodin | od 4 990 Kč',
  description:
    'Profesionální web hotový do 24 hodin. Garantovaně nebo vracíme zálohu. START od 4 990 Kč. Bez schůzek, bez čekání.',
  metadataBase: new URL('https://do24.cz'),
  openGraph: {
    title: 'Do24 — Web do 24 hodin',
    description: 'Profesionální web hotový do 24 hodin. Od 4 990 Kč. Garantovaně.',
    url: 'https://do24.cz',
    siteName: 'Do24',
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Do24 — Web do 24 hodin',
    description: 'Profesionální web hotový do 24 hodin. Od 4 990 Kč.',
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
  alternates: { canonical: 'https://do24.cz' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-815XCLCGY8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-815XCLCGY8');
          `}
        </Script>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
