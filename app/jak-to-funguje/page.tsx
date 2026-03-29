import type { Metadata } from 'next';
import HowItWorks from '@/components/sections/HowItWorks';
import CTASection from '@/components/sections/CTASection';
import { Clock, CheckCircle, FileText, Rocket, Shield, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Jak to funguje — Webdozitra.cz | Web do 24 hodin',
  description:
    'Celý proces tvorby webu od objednávky po spuštění. Transparentně, předvídatelně — do 24 hodin.',
};

const timeline = [
  {
    time: 'Hodina 0',
    icon: FileText,
    title: 'Odešlete objednávku (5 min)',
    desc: 'Vyplníte formulář — řeknete nám o podnikání, cíli a designu. Ihned dostanete potvrzení.',
  },
  {
    time: 'Do 2 hodin',
    icon: MessageCircle,
    title: 'Dostanete nabídku',
    desc: 'Pošleme vám přesnou cenu, termín a případné otázky. Vše emailem — žádná povinná schůzka.',
  },
  {
    time: 'Do 4 hodin',
    icon: CheckCircle,
    title: 'Schválíte design',
    desc: 'Ukážeme vizuální návrh. Jedno kolo revizí — pak jdeme stavět.',
  },
  {
    time: 'Do 16 hodin',
    icon: Rocket,
    title: 'Vývoj a obsah',
    desc: 'Stavíme web, vkládáme texty a obrázky. Průběžně vás informujeme.',
  },
  {
    time: 'Do 24 hodin',
    icon: Clock,
    title: 'Spuštění na vaší doméně',
    desc: 'Web je live. Předáme přístupy, hesla a video návod pro správu obsahu.',
  },
  {
    time: 'Po spuštění',
    icon: Shield,
    title: 'Záruka 30 dnů zdarma',
    desc: 'Technické chyby opravujeme 30 dnů bez poplatku. Poté nabízíme měsíční péči.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[#080808] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: 'rgba(255,77,0,0.06)' }} />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="tag mx-auto mb-6">Průhledný proces</div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Od objednávky k webu{' '}
              <span className="gradient-text">za 24 hodin</span>
            </h1>
            <p className="text-[#606060] text-xl leading-relaxed">
              Celý proces jsme navrhli tak, aby byl maximálně rychlý a předvídatelný.
              Vy podnikáte — my se staráme o web.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#080808]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
                style={{ background: 'linear-gradient(180deg, rgba(255,77,0,0.4), rgba(255,77,0,0.1), transparent)' }} />

              <div className="flex flex-col gap-6">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-6 sm:gap-8">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center z-10 relative"
                        style={{ background: 'rgba(255,77,0,0.1)', border: '1px solid rgba(255,77,0,0.2)' }}>
                        <item.icon className="w-5 h-5 text-[#FF4D00]" />
                      </div>
                    </div>
                    <div className="glass-card rounded-xl p-5 flex-1">
                      <div className="text-xs font-black text-[#FF4D00] uppercase tracking-widest mb-1">
                        {item.time}
                      </div>
                      <h3 className="font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-[#606060] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-2xl p-6 text-center"
              style={{ background: 'rgba(255,77,0,0.07)', border: '1px solid rgba(255,77,0,0.2)' }}>
              <p className="text-white font-bold text-lg">
                Celkem: <span className="gradient-text">web live do 24 hodin od objednávky.</span>
              </p>
              <p className="text-[#505050] text-sm mt-1">Garantovaně — nebo vracíme celou platbu.</p>
            </div>

            <div className="text-center mt-8">
              <Link href="/objednat"
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base font-bold">
                Začít teď
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <CTASection />
    </>
  );
}
