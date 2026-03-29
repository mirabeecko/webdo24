import Link from 'next/link';
import { Zap, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#030806] border-t border-white/5">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#00C47A]">
                <Zap className="w-4 h-4 text-[#050A08]" fill="currentColor" />
              </div>
              <span className="font-black text-lg text-white tracking-tight">
                webdo<span className="text-[#00C47A]">24</span>.cz
              </span>
            </Link>
            <p className="text-[#505050] text-sm leading-relaxed max-w-xs mb-5">
              Profesionální web na klíč do 24 hodin. Vlastní design, hosting v ceně, žádné šablony.
            </p>
            <div className="flex flex-col gap-2">
              <a href="mailto:info@webdo24.cz" className="flex items-center gap-2 text-sm text-[#606060] hover:text-[#00C47A] transition-colors">
                <Mail className="w-4 h-4" />
                info@webdo24.cz
              </a>
              <p className="text-sm text-[#454545]">
                Reagujeme průběžně během dne. Potvrzení objednávky posíláme hned po přijetí platby.
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-white text-xs mb-4 uppercase tracking-widest">Navigace</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: '/', label: 'Úvod' },
                { href: '/#jak-to-funguje', label: 'Jak to funguje' },
                { href: '/#faq', label: 'FAQ' },
                { href: '/obchodnipodminky', label: 'Obchodní podmínky' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#505050] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <div className="accent-border rounded-2xl p-6">
              <div className="text-[#00C47A] font-black text-sm uppercase tracking-widest mb-2">Začněte dnes</div>
              <p className="text-white font-bold text-lg mb-1">Profesionální web do 24 hodin.</p>
              <p className="text-[#606060] text-sm mb-5">Hosting v ceně. Texty v ceně. Žádná šablona.</p>
              <Link
                href="/#form"
                className="btn-primary flex items-center justify-center gap-2 px-5 py-3 text-sm"
              >
                <Zap className="w-4 h-4" />
                Objednat
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#353535] text-xs">
            © {new Date().getFullYear()} webdo24.cz — Soterana Corp s.r.o. Všechna práva vyhrazena.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/obchodnipodminky" className="text-[#353535] hover:text-[#606060] text-xs transition-colors">
              Obchodní podmínky
            </Link>
            <Link href="/gdpr" className="text-[#353535] hover:text-[#606060] text-xs transition-colors">
              GDPR
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
