import type { Metadata } from 'next';
import Pricing from '@/components/sections/Pricing';
import CTASection from '@/components/sections/CTASection';
import FAQ from '@/components/sections/FAQ';

export const metadata: Metadata = {
  title: 'Ceník — webdo24.cz | Profesionální web do 24 hodin',
  description:
    'Transparentní ceník. Profesionální web na klíč za 9 900 Kč — vlastní design, hosting v ceně, texty v ceně. Spuštění do 24 hodin.',
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#0A0A0F] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#6C63FF]/[0.06] blur-[100px]" />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="tag mx-auto mb-6">Transparentní ceník</div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
              Jasná cena.{' '}
              <span className="gradient-text">Žádná překvapení.</span>
            </h1>
            <p className="text-[#A0A0C0] text-lg">
              Cenu znáte ještě před zahájením spolupráce. Platíte za výsledek, ne za hodiny.
            </p>
          </div>
        </div>
      </section>

      <Pricing />
      <FAQ limit={6} />
      <CTASection />
    </>
  );
}
