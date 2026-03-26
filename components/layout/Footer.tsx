import Link from 'next/link';
import { Phone, Mail, MapPin, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_4px_16px_rgba(255,77,0,0.25)]"
                style={{ background: 'linear-gradient(135deg, #FF4D00, #FF8C00)' }}>
                <span className="text-white font-black text-sm">W</span>
              </div>
              <span className="font-black text-lg text-white tracking-tight">
                webdozitra<span className="text-[#FF4D00]">.cz</span>
              </span>
            </Link>
            <p className="text-[#606060] text-sm leading-relaxed max-w-xs mb-6">
              Profesionální web do 24 hodin. Pro živnostníky a firmy, které nechtějí čekat.
              Akční ceny od 4 900 Kč.
            </p>
            <div className="flex flex-col gap-2.5">
              <a href="tel:+420777734389"
                className="flex items-center gap-2 text-lg font-bold text-white hover:text-[#00C47A] transition-colors">
                <Phone className="w-5 h-5 text-[#FF4D00]" />
                +420 777 734 389
              </a>
              <a href="mailto:ahoj@webdozitra.cz"
                className="flex items-center gap-2 text-sm text-[#606060] hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-[#FF4D00]" />
                ahoj@webdozitra.cz
              </a>
              <span className="flex items-center gap-2 text-sm text-[#404040]">
                <MapPin className="w-4 h-4 text-[#FF4D00]" />
                Praha · celá ČR
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">Služby</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/jak-to-funguje', label: 'Jak to funguje' },
                { href: '/cenik', label: 'Ceník balíčků' },
                { href: '/pro-koho', label: 'Pro koho to je' },
                { href: '#kalkulacka', label: 'Spočítat cenu' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href}
                    className="text-sm text-[#505050] hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">Info</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/reference', label: 'Reference' },
                { href: '/faq', label: 'Časté otázky' },
                { href: '/kontakt', label: 'Kontakt' },
                { href: '/obchodní-podmínky', label: 'Obchodní podmínky' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href}
                    className="text-sm text-[#505050] hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full h-px bg-white/5 mt-10 mb-5" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#303030]">© 2024 Webdozitra.cz — Všechna práva vyhrazena</p>
          <Link href="#kalkulacka"
            className="flex items-center gap-1.5 text-xs font-black text-[#FF4D00] hover:text-[#FF6B2B] transition-colors uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5 fill-current" />
            Objednat prodejní mašinu
          </Link>
        </div>
      </div>
    </footer>
  );
}
