import type { Metadata } from 'next';
import { Suspense } from 'react';
import OrderForm from '@/components/sections/OrderForm';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Objednat web — Webdozitra.cz',
  description:
    'Odešlete objednávku na tvorbu profesionálního webu. Vyplnění trvá 5 minut. Odpovídáme do 24 hodin.',
};

export default function OrderPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-10 bg-[#0A0A0F] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#6C63FF]/[0.06] blur-[100px]" />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="tag mx-auto mb-6">Objednávkový formulář</div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-5">
              Začněte svůj projekt
            </h1>
            <p className="text-[#A0A0C0] text-lg">
              Vyplnění trvá 5 minut. Odpovídáme do 24 hodin s konkrétní nabídkou.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 bg-[#0A0A0F]">
        <div className="container-custom">
          <Suspense fallback={
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[#6C63FF] animate-spin" />
            </div>
          }>
            <OrderForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
