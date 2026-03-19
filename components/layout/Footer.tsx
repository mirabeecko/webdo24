import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#060608] border-t border-white/[0.06]">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#8B85FF] flex items-center justify-center">
                <span className="text-white font-black text-sm">W</span>
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                webdozitra<span className="text-[#6C63FF]">.cz</span>
              </span>
            </Link>
            <p className="text-[#6B6B8A] text-sm leading-relaxed max-w-xs">
              Profesionální weby pro české podnikatele. Spuštění do 7 dnů.
              Žádné čekání, žádné kompromisy.
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <a
                href="tel:+420777000111"
                className="flex items-center gap-2 text-sm text-[#A0A0C0] hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#6C63FF]" />
                +420 777 000 111
              </a>
              <a
                href="mailto:ahoj@webdozitra.cz"
                className="flex items-center gap-2 text-sm text-[#A0A0C0] hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#6C63FF]" />
                ahoj@webdozitra.cz
              </a>
              <span className="flex items-center gap-2 text-sm text-[#6B6B8A]">
                <MapPin className="w-4 h-4 text-[#6C63FF]" />
                Praha · celá ČR
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Služby</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/jak-to-funguje', label: 'Jak to funguje' },
                { href: '/cenik', label: 'Ceník balíčků' },
                { href: '/pro-koho', label: 'Pro koho je to' },
                { href: '/objednat', label: 'Objednat web' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B6B8A] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Info</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/reference', label: 'Reference' },
                { href: '/faq', label: 'Časté otázky' },
                { href: '/kontakt', label: 'Kontakt' },
                { href: '/obchodní-podmínky', label: 'Obchodní podmínky' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B6B8A] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider mt-12 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#4A4A68]">
            © 2024 Webdozitra.cz — Všechna práva vyhrazena
          </p>
          <Link
            href="/objednat"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#6C63FF] hover:text-[#8B85FF] transition-colors"
          >
            Chci web do 7 dnů
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
