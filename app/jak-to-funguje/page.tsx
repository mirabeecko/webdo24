import type { Metadata } from 'next';
import HowItWorks from '@/components/sections/HowItWorks';
import CTASection from '@/components/sections/CTASection';
import { ArrowRight, Clock, CheckCircle, FileText, Rocket, Shield, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Jak to funguje — Webdozitra.cz',
  description:
    'Celý proces tvorby webu od poptávky po spuštění. Transparentně, předvídatelně, do 7 dnů.',
};

const timeline = [
  {
    day: 'Den 1',
    icon: FileText,
    title: 'Odešlete poptávku',
    desc: 'Vyplníte náš vícekrokový formulář (5 minut). Řeknete nám o svém podnikání, cíli webu, designových preferencích a termínu.',
  },
  {
    day: 'Den 1–2',
    icon: MessageCircle,
    title: 'Dostanete nabídku',
    desc: 'Do 24 hodin vám pošleme cenovou nabídku, harmonogram a případné doplňující otázky. Schválíte nebo upravíte.',
  },
  {
    day: 'Den 2–3',
    icon: CheckCircle,
    title: 'Schválíte design',
    desc: 'Připravíme wireframe a první vizuální návrh. Zapracujeme vaše připomínky — obvykle 1–2 kola revizí.',
  },
  {
    day: 'Den 3–6',
    icon: Rocket,
    title: 'Vývoj a obsah',
    desc: 'Stavíme web. Průběžně vás informujeme. Vkládáme texty, obrázky a funkce dle dohody.',
  },
  {
    day: 'Den 7',
    icon: Clock,
    title: 'Spuštění a předání',
    desc: 'Web nasadíme na vaši doménu, předáme přístupy, hesla a video instruktáž pro správu obsahu.',
  },
  {
    day: 'Po spuštění',
    icon: Shield,
    title: 'Podpora 30 dnů zdarma',
    desc: 'Technické chyby opravujeme 30 dnů zdarma. Poté nabízíme plány měsíční péče.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 section-padding bg-[#0A0A0F] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#6C63FF]/[0.06] blur-[100px]" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="tag mx-auto mb-6">Průhledný proces</div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Od nápadu ke spuštění{' '}
              <span className="gradient-text">za 7 dnů</span>
            </h1>
            <p className="text-[#A0A0C0] text-xl leading-relaxed">
              Celý proces jsme navrhli tak, aby byl co nejméně zatěžující pro vás.
              Vy podnikáte — my se staráme o web.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-[#0A0A0F]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#6C63FF]/40 via-[#6C63FF]/20 to-transparent hidden sm:block" />

              <div className="flex flex-col gap-8">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-6 sm:gap-8">
                    {/* Icon */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/15 border border-[#6C63FF]/25 flex items-center justify-center z-10 relative">
                        <item.icon className="w-5 h-5 text-[#6C63FF]" />
                      </div>
                    </div>
                    {/* Content */}
                    <div className="glass-card rounded-xl p-5 flex-1">
                      <div className="text-xs font-bold text-[#6C63FF] uppercase tracking-widest mb-1">
                        {item.day}
                      </div>
                      <h3 className="font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-[#A0A0C0] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <CTASection />
    </>
  );
}
