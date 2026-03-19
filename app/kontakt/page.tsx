import type { Metadata } from 'next';
import { Phone, Mail, Clock, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kontakt — Webdozitra.cz',
  description:
    'Spojte se s námi. Telefon, email nebo rovnou poptávkový formulář. Odpovídáme do 2 hodin.',
};

const contactItems = [
  {
    icon: Phone,
    label: 'Telefon',
    value: '+420 777 000 111',
    href: 'tel:+420777000111',
    note: 'Po–Pá 9:00–18:00',
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'ahoj@webdozitra.cz',
    href: 'mailto:ahoj@webdozitra.cz',
    note: 'Odpovídáme do 2 hodin',
  },
  {
    icon: MapPin,
    label: 'Lokalita',
    value: 'Praha · celá ČR',
    href: null,
    note: 'Pracujeme plně online',
  },
  {
    icon: Clock,
    label: 'Pracovní doba',
    value: 'Po–Pá 9:00–18:00',
    href: null,
    note: 'Urgentní věci i mimo dobu',
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#0A0A0F] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#6C63FF]/[0.06] blur-[100px]" />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="tag mx-auto mb-6">Kontakt</div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
              Pojďme se{' '}
              <span className="gradient-text">pobavit</span>
            </h1>
            <p className="text-[#A0A0C0] text-lg">
              Napište, zavolejte nebo rovnou odešlete poptávku. Ozveme se rychle.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#0A0A0F]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8">Jak nás najdete</h2>
              <div className="flex flex-col gap-4">
                {contactItems.map((item, i) => (
                  <div key={i} className="glass-card-hover rounded-xl p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#6C63FF]/15 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#6C63FF]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#6B6B8A] uppercase tracking-wide mb-0.5">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href} className="font-semibold text-white hover:text-[#8B85FF] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="font-semibold text-white">{item.value}</div>
                      )}
                      <div className="text-xs text-[#6B6B8A] mt-0.5">{item.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA cards */}
            <div className="flex flex-col gap-5">
              <h2 className="text-2xl font-bold text-white">Nejrychlejší cesta k webu</h2>

              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/20 to-[#4C45CC]/10" />
                <div className="absolute inset-0 border border-[#6C63FF]/20 rounded-2xl" />
                <div className="relative p-7">
                  <div className="text-2xl mb-3">🚀</div>
                  <h3 className="font-bold text-white text-lg mb-2">Odeslat poptávku</h3>
                  <p className="text-[#A0A0C0] text-sm mb-5 leading-relaxed">
                    Vyplňte formulář (5 minut) a my se vám ozveme do 24 hodin s konkrétní nabídkou.
                  </p>
                  <Link href="/objednat" className="btn-primary flex items-center gap-2 px-6 py-3 text-sm w-fit">
                    Odeslat poptávku
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-7">
                <div className="text-2xl mb-3">📞</div>
                <h3 className="font-bold text-white text-lg mb-2">Zavolejte nám</h3>
                <p className="text-[#A0A0C0] text-sm mb-5 leading-relaxed">
                  Radši mluvíte? Volejte v pracovní době — rádi si probereme vaši situaci.
                </p>
                <a href="tel:+420777000111" className="btn-secondary flex items-center gap-2 px-6 py-3 text-sm w-fit">
                  +420 777 000 111
                </a>
              </div>

              <div className="glass-card rounded-2xl p-7">
                <div className="text-2xl mb-3">✉️</div>
                <h3 className="font-bold text-white text-lg mb-2">Napište e-mail</h3>
                <p className="text-[#A0A0C0] text-sm mb-5 leading-relaxed">
                  Preferujete email? Napište nám. Odpovídáme do 2 hodin v pracovní dny.
                </p>
                <a href="mailto:ahoj@webdozitra.cz" className="btn-secondary flex items-center gap-2 px-6 py-3 text-sm w-fit">
                  ahoj@webdozitra.cz
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
