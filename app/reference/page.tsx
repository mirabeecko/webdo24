import type { Metadata } from 'next';
import Testimonials from '@/components/sections/Testimonials';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Reference — Webdozitra.cz | Zkušenosti klientů',
  description:
    'Reálné reference od spokojených klientů. Živnostníci, salony, poradci, firmy.',
};

export default function ReferencePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#0A0A0F] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#6C63FF]/[0.06] blur-[100px]" />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="tag mx-auto mb-6">Reálné výsledky</div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
              Co říkají{' '}
              <span className="gradient-text">naši klienti</span>
            </h1>
            <p className="text-[#A0A0C0] text-lg">
              Neprezentujeme smyšlená hodnocení. Jen reálné příběhy z praxe.
            </p>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Note */}
      <section className="pb-10 bg-[#0A0A0F]">
        <div className="container-custom text-center">
          <p className="text-[#4A4A68] text-sm max-w-lg mx-auto">
            Máte zájem o přímý kontakt s referenčními klienty? Rádi zprostředkujeme — napište nám na{' '}
            <a href="mailto:ahoj@webdozitra.cz" className="text-[#6C63FF] hover:underline">
              ahoj@webdozitra.cz
            </a>
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
