import type { Metadata } from 'next';
import CTASection from '@/components/sections/CTASection';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pro koho je Webdozitra.cz | Ideální klient',
  description:
    'Web do 24 hodin je ideální pro živnostníky, řemeslníky, kosmetičky, poradce a malé firmy, kteří potřebují rychle fungující online prezentaci.',
};

const segments = [
  {
    emoji: '🔧',
    title: 'Řemeslníci a živnostníci',
    desc: 'Instalatéři, elektrikáři, truhlíci, malíři. Potřebujete, aby vás zákazníci našli online. My se postaráme o vše ostatní.',
  },
  {
    emoji: '💅',
    title: 'Krásy a wellness',
    desc: 'Kadeřníci, kosmetičky, maséři, salony. Prezentujte své práce, přijímejte rezervace a budujte komunitu.',
  },
  {
    emoji: '📊',
    title: 'Poradci a konzultanti',
    desc: 'Účetní, daňoví poradci, koučové, právníci. Profesionální web buduje důvěru ještě před prvním kontaktem.',
  },
  {
    emoji: '🏗️',
    title: 'Stavební firmy',
    desc: 'Dodavatelé stavebních prací, architekti, projektanti. Ukažte reference a získávejte kvalitní zakázky.',
  },
  {
    emoji: '🍽️',
    title: 'Restaurace a catering',
    desc: 'Menu online, rezervace stolů, fotografie jídel. Přiveďte hosty dřív, než přijdou konkurenci.',
  },
  {
    emoji: '🏪',
    title: 'Malé firmy a e-shopy',
    desc: 'Lokální obchody, e-commerce, prodejci produktů. Balíček PRO zahrnuje plnohodnotný e-shop.',
  },
];

const goodFit = [
  'Potřebujete web rychle — máte deadline nebo novou sezónu',
  'Nemáte čas řešit technické detaily sami',
  'Chcete znát cenu předem bez zbytečných schůzek',
  'Hledáte partnera, ne jen dodavatele',
  'Chcete web, který skutečně přivádí zákazníky',
  'Jste živnostník nebo malá firma do 50 zaměstnanců',
];

const badFit = [
  'Hledáte nejlevnější možné řešení bez ohledu na kvalitu',
  'Chcete web, ale nevíte vůbec proč',
  'Potřebujete enterprise systém s desítkami integrací',
  'Nemáte čas ani zájem se podílet na tvorbě obsahu',
];

export default function ForWhomPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#0A0A0F] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#6C63FF]/[0.06] blur-[100px]" />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="tag mx-auto mb-6">Ideální klient</div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
              Je to{' '}
              <span className="gradient-text">pro vás?</span>
            </h1>
            <p className="text-[#A0A0C0] text-lg">
              Pracujeme s podnikateli, kteří chtějí výsledek — ne jen hezký obrázek online.
            </p>
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="section-padding bg-[#0A0A0F]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-12">
            Komu nejčastěji pomáháme
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {segments.map((s, i) => (
              <div key={i} className="glass-card-hover rounded-2xl p-6">
                <div className="text-3xl mb-4">{s.emoji}</div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-[#6B6B8A] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Good/Bad fit */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #0d0d1a 100%)' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Good fit */}
            <div className="glass-card rounded-2xl p-7">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle className="w-5 h-5 text-[#10B981]" />
                <h3 className="font-bold text-white">Jsme pro vás ideální, pokud...</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {goodFit.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#C9C9E0]">
                    <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bad fit */}
            <div className="glass-card rounded-2xl p-7">
              <div className="flex items-center gap-2 mb-5">
                <XCircle className="w-5 h-5 text-[#6B6B8A]" />
                <h3 className="font-bold text-white">Nejsme pro vás, pokud...</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {badFit.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#6B6B8A]">
                    <XCircle className="w-4 h-4 text-[#4A4A68] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/objednat" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base">
              Odeslat poptávku
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
