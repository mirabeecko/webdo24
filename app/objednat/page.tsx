import type { Metadata } from 'next';
import { Suspense } from 'react';
import OrderForm from '@/components/sections/OrderForm';
import { Loader2, ShieldCheck, Zap, Clock, MailCheck, CircleCheckBig } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Objednat web — webdo24.cz',
  description: 'Objednejte profesionální web do 24 hodin. Vlastní design, hosting v ceně, texty v ceně. Zaplaťte přes QR kód, převodem nebo na splátky.',
};

export default function OrderPage() {
  return (
    <>
      <section className="pt-28 pb-10 bg-[#050A08] relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,196,122,0.06) 0%, transparent 70%)' }}
        />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="tag mx-auto mb-6 w-fit">Objednávkový formulář</div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-5">
              Profesionální web na klíč
            </h1>
            <p className="text-[#808080] text-lg mb-8">
              Vyplnění trvá 2 minuty. Celá platba předem — žádná záloha ani doplatek.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5">
              {[
                { icon: Clock, text: 'Web do 24 hodin' },
                { icon: ShieldCheck, text: 'Garance vrácení peněz' },
                { icon: Zap, text: 'Hosting a texty v ceně' },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-1.5">
                  <b.icon className="w-4 h-4 text-[#00C47A]" />
                  <span className="text-[#606060] text-sm">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 bg-[#050A08]">
        <div className="container-custom">
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 text-[#00C47A] animate-spin" />
                </div>
              }
            >
              <OrderForm />
            </Suspense>

            <aside className="space-y-4 xl:sticky xl:top-24">
              <div className="accent-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-[#00C47A]" />
                  <h2 className="text-white font-black text-lg">Vše v ceně webu</h2>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    'Vlastní design — žádná šablona',
                    'Hosting a SSL certifikát',
                    'Texty k webu (copywriting)',
                    'Základní SEO optimalizace',
                    'Plně responzivní pro všechny prohlížeče',
                    'Napojení na vlastní doménu',
                    '1 revize zdarma po spuštění',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CircleCheckBig className="w-4 h-4 text-[#00C47A] flex-shrink-0 mt-0.5" />
                      <span className="text-[#C9D4CE]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MailCheck className="w-5 h-5 text-[#00C47A]" />
                  <h2 className="text-white font-black text-lg">Co se stane potom</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { title: '1. Přijmeme platbu', text: 'Po přijetí platby vám do 2 hodin pošleme e-mail s návrhem textů stránek.' },
                    { title: '2. Potvrdíte zadání', text: 'Upravíte návrh a odešlete nám potvrzení. Tím startuje 24hodinový termín.' },
                    { title: '3. Web je online', text: 'Do 24 hodin od potvrzení pošleme odkaz a instrukce k napojení na vlastní doménu.' },
                  ].map((item) => (
                    <div key={item.title}>
                      <div className="text-white text-sm font-semibold mb-1">{item.title}</div>
                      <p className="text-[#707070] text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
