import type { Metadata } from 'next';
import FAQ from '@/components/sections/FAQ';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'FAQ — Webdozitra.cz | Časté otázky',
  description:
    'Odpovědi na nejčastější otázky o tvorbě webu, procesu, cenách a podmínkách spolupráce.',
};

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#0A0A0F] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#6C63FF]/[0.06] blur-[100px]" />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="tag mx-auto mb-6">Vše, co chcete vědět</div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
              Časté{' '}
              <span className="gradient-text">otázky</span>
            </h1>
            <p className="text-[#A0A0C0] text-lg">
              Nenašli jste odpověď? Napište nám — odpovídáme do 2 hodin.
            </p>
          </div>
        </div>
      </section>

      <FAQ />
      <CTASection />
    </>
  );
}
