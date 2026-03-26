import type { Metadata } from 'next';
import KPHero from '@/components/sections/KPHero';
import SocialProofBar from '@/components/sections/SocialProofBar';
import Benefits from '@/components/sections/Benefits';
import HowItWorks from '@/components/sections/HowItWorks';
import Calculator from '@/components/sections/Calculator';
import CompareTable from '@/components/sections/CompareTable';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Webdozitra.cz — Web hotový do 24 hodin | od 4 900 Kč',
  description:
    'Profesionální web hotový do 24 hodin — garantovaně nebo vracíme zálohu. Akce: 50% sleva jen dnes. Od 4 900 Kč. Srovnání s konkurencí.',
};

export default function KPPage() {
  return (
    <>
      <KPHero />
      <SocialProofBar />
      <Benefits />
      <HowItWorks />
      <Calculator />
      <CompareTable />
      <Pricing />
      <Testimonials />
      <FAQ limit={8} />
      <CTASection />
    </>
  );
}
