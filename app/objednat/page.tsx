import type { Metadata } from 'next';
import { Suspense } from 'react';
import OrderForm from '@/components/sections/OrderForm';
import { Loader2, ShieldCheck, Zap, Clock, CreditCard, MailCheck, CircleCheckBig } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Objednat web — Do24',
  description: 'Objednejte web do 24 hodin. Vyplňte formulář za 5 minut, zaplaťte zálohu 50 % a stavíme hned.',
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
              Začněte svůj projekt
            </h1>
            <p className="text-[#808080] text-lg mb-8">
              Vyplnění trvá 5 minut. Stavíme hned po přijetí zálohy.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5">
              {[
                { icon: Clock, text: 'Web do 24 hodin' },
                { icon: ShieldCheck, text: 'Záruka vrácení zálohy' },
                { icon: Zap, text: 'Žádné schůzky' },
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
                  <CreditCard className="w-5 h-5 text-[#00C47A]" />
                  <h2 className="text-white font-black text-lg">Bezpečná záloha přes Stripe</h2>
                </div>
                <p className="text-[#707070] text-sm leading-relaxed mb-5">
                  Po odeslání formuláře vás pošleme do zabezpečené Stripe platební brány. Kartou
                  zaplatíte jen 50 % zálohu, zbytek až po spuštění webu.
                </p>
                <div className="space-y-3 text-sm">
                  {[
                    'Žádné ruční posílání údajů o kartě e-mailem',
                    'Potvrzení objednávky přijde hned po zaplacení',
                    'Pokud termín nedodržíme, vracíme zálohu',
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
                    { title: '1. Přijmeme objednávku', text: 'Ihned po platbě založíme projekt a pošleme potvrzení e-mailem.' },
                    { title: '2. Začneme stavět', text: 'Podle balíčku se pouštíme do návrhu, textů a nasazení bez čekání na schůzky.' },
                    { title: '3. Předáme hotový web', text: 'Po spuštění doladíme finální připomínky a až potom řešíte doplatek.' },
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
