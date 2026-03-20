import { packages, addons, maintenance } from '@/lib/data';
import { Check, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Pricing() {
  return (
    <section className="section-padding bg-[#080808]" id="cenik">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="tag mb-5">Transparentní ceník</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Jasná cena.{' '}
            <span className="gradient-text">Žádná překvapení.</span>
          </h2>
          <p className="text-[#606060] text-lg max-w-xl mx-auto">
            Cenu znáte předem. Platíte za výsledek, ne za hodiny sezení nad prezentacemi.
          </p>
        </div>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl p-7 flex flex-col ${
                pkg.highlighted ? 'fire-border' : 'glass-card'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="text-white text-xs font-bold px-4 py-1.5 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #FF4D00, #FF8C00)' }}>
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="text-xs font-black text-[#FF4D00] uppercase tracking-widest mb-2">{pkg.name}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[11px] text-[#606060] mr-1">od</span>
                  <span className="text-4xl font-black text-white">{pkg.price}</span>
                  <span className="text-lg font-bold text-[#909090]"> Kč</span>
                </div>
                <div className="text-xs text-[#505050]">{pkg.priceNote}</div>
              </div>

              <p className="text-[#909090] text-sm mb-5 leading-relaxed">{pkg.description}</p>

              <ul className="flex flex-col gap-2.5 mb-8 flex-grow">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-[#FF4D00] flex-shrink-0 mt-0.5" />
                    <span className={f.includes('24 hodin') || f.includes('48 hodin') ? 'text-white font-semibold' : 'text-[#C0C0C0]'}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/objednat?package=${pkg.id}`}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                  pkg.highlighted ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {pkg.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Express callout */}
        <div className="rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 mb-8"
          style={{ background: 'rgba(255,77,0,0.07)', border: '1px solid rgba(255,77,0,0.2)' }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,77,0,0.15)' }}>
            <Zap className="w-5 h-5 text-[#FF4D00]" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="font-bold text-white mb-0.5">Expresní spuštění do 6 hodin — +60 %</div>
            <p className="text-[#606060] text-sm">
              Potřebujete web ještě dnes? Prioritně zařadíme váš projekt — spouštíme i o víkendu.
            </p>
          </div>
          <Link href="/objednat?expres=true"
            className="btn-secondary px-5 py-2.5 text-sm flex-shrink-0 whitespace-nowrap">
            Chci expres
          </Link>
        </div>

        {/* Addons */}
        <div className="mb-8">
          <h3 className="text-xl font-black text-white mb-5 text-center">Doplňky</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {addons.map((a, i) => (
              <div key={i} className="glass-card rounded-xl p-5">
                <div className="font-bold text-white text-sm mb-1">{a.name}</div>
                <div className="text-xs text-[#606060] mb-3 leading-relaxed">{a.description}</div>
                <div className="text-[#FF4D00] font-black text-sm">{a.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance */}
        <div>
          <h3 className="text-xl font-black text-white mb-5 text-center">Měsíční péče</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {maintenance.map((plan, i) => (
              <div key={i} className="glass-card rounded-xl p-6">
                <div className="font-bold text-white mb-1">{plan.name}</div>
                <div className="text-[#FF4D00] font-black text-2xl mb-4">{plan.price}</div>
                <ul className="flex flex-col gap-2">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-[#909090]">
                      <Check className="w-3.5 h-3.5 text-[#FF4D00] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
