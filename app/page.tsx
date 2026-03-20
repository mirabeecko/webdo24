import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Benefits from '@/components/sections/Benefits';
import HowItWorks from '@/components/sections/HowItWorks';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Webdozitra.cz — Web hotový do 24 hodin | od 11 900 Kč',
  description:
    'Profesionální web hotový do 24 hodin — garantovaně nebo vracíme zálohu. Moderní design, SEO, kontaktní formulář. Od 11 900 Kč.',
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
