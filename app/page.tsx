import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import TrustSection from '@/components/sections/TrustSection';
import HowItWorks from '@/components/sections/HowItWorks';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Do24 — Web do 24 hodin | od 4 990 Kč',
  description:
    'Profesionální web hotový do 24 hodin. Garantovaně nebo vracíme zálohu. START od 4 990 Kč. Bez schůzek, bez čekání.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <TrustSection />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
