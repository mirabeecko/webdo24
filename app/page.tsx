import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Benefits from '@/components/sections/Benefits';
import HowItWorks from '@/components/sections/HowItWorks';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Webdozitra.cz — Profesionální web do 7 dnů | od 24 900 Kč',
  description:
    'Postavíme vám profesionální web do 7 dnů. Moderní design, SEO, kontaktní formulář. Pro živnostníky a firmy. Balíčky od 24 900 Kč.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ limit={8} />
      <CTASection />
    </>
  );
}
