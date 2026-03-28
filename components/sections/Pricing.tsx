import { packages } from '@/lib/data';
import { Check, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Pricing() {
  return (
    <section className="section-padding bg-[#050A08]" id="produkty">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="tag mb-5">Produkty & ceny</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Vyberte si{' '}
            <span className="gradient-text">svůj balíček.</span>
          </h2>
          <p className="text-[#606060] text-lg max-w-xl mx-auto">
            Pevná cena, žádné skryté poplatky. Záloha 50 % předem, doplatek po spuštění.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col ${
                pkg.highlighted ? 'accent-border rounded-2xl p-7' : 'glass-card p-7'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className="text-[#050A08] text-xs font-black px-4 py-1.5 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #00C47A, #00E08A)' }}
                  >
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="text-xs font-black text-[#00C47A] uppercase tracking-widest mb-3">{pkg.name}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-black text-white">{pkg.priceFormatted}</span>
                </div>
                <div className="text-xs text-[#505050] uppercase font-bold tracking-wider">{pkg.priceNote}</div>
              </div>

              <p className="text-[#808080] text-sm mb-6 leading-relaxed">{pkg.description}</p>

              <ul className="flex flex-col gap-2.5 mb-8 flex-grow">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-[#00C47A] flex-shrink-0 mt-0.5" />
                    <span className={f.includes('hodin') ? 'text-white font-semibold' : 'text-[#C0C0C0]'}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/objednat?paket=${pkg.id}`}
                className={`flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-200 ${
                  pkg.highlighted
                    ? 'btn-primary'
                    : 'bg-white/8 text-white hover:bg-white/15 border border-white/10'
                }`}
              >
                <Zap className="w-4 h-4" />
                {pkg.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Guarantee box */}
        <div
          className="rounded-2xl p-6 text-center max-w-2xl mx-auto"
          style={{ background: 'rgba(0,196,122,0.04)', border: '1px solid rgba(0,196,122,0.15)' }}
        >
          <div className="text-[#00C47A] text-2xl mb-2">🛡️</div>
          <h3 className="font-bold text-white mb-2">100% záruka dodání</h3>
          <p className="text-[#606060] text-sm leading-relaxed">
            Nestíháme termín? Zálohu vracíme celou, bez otázek. To je naše garance.
          </p>
        </div>
      </div>
    </section>
  );
}
