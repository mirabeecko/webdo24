import { packages, addons, maintenance } from '@/lib/data';
import { Check, Zap, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Pricing() {
  return (
    <section className="section-padding bg-[#080808]" id="cenik">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="tag mb-5 bg-[#FF4D00]/10 text-[#FF4D00] border-[#FF4D00]/20 uppercase font-black tracking-widest">Akční nabídka — 50 %</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Cena za výsledek.{' '}
            <span className="text-[#FF4D00]">Dnes o polovinu levněji.</span>
          </h2>
          <p className="text-[#606060] text-lg max-w-xl mx-auto">
            Pokud si spočítáte cenu v kalkulačce a objednáte do 10 minut, získáte tyto akční ceny.
          </p>
        </div>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl p-7 flex flex-col ${
                pkg.highlighted ? 'fire-border bg-[#0A1A12]/40' : 'glass-card'
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
                
                <div className="flex flex-col mb-1">
                  <div className="flex items-baseline gap-1 text-[#505050] line-through decoration-[#FF4D00]/40">
                    <span className="text-sm">Původně</span>
                    <span className="text-lg font-bold">{pkg.originalPrice} Kč</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[11px] text-[#606060] mr-1 uppercase font-black">Nyní</span>
                    <span className="text-4xl font-black text-white">{pkg.price}</span>
                    <span className="text-lg font-bold text-[#FF4D00]"> Kč</span>
                  </div>
                </div>
                <div className="text-[10px] text-[#505050] uppercase font-bold tracking-wider">{pkg.priceNote}</div>
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
                href="#kalkulacka"
                className={`flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-200 ${
                  pkg.highlighted 
                    ? 'bg-[#FF4D00] text-white shadow-[0_10px_30px_rgba(255,77,0,0.2)] hover:bg-[#FF6B2B]' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {pkg.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Urgency Box */}
        <div className="rounded-2xl p-6 flex items-start gap-4 mb-12 bg-red-500/5 border border-red-500/20 max-w-3xl mx-auto">
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white mb-1 uppercase tracking-wider text-sm">Pozor: Limitovaná kapacita</div>
            <p className="text-[#707070] text-xs leading-relaxed">
              Vzhledem k rychlosti dodání do 24 hodin přijímáme pouze <span className="text-white font-bold">3 nové objednávky denně</span>, abychom udrželi 100% kvalitu. 
              Pokud tlačítko "OBJEDNAT" stále svítí, máme volnou kapacitu pro spuštění vašeho webu do zítřka.
            </p>
          </div>
        </div>

        {/* Addons */}
        <div className="mb-12">
          <h3 className="text-xl font-black text-white mb-6 text-center uppercase tracking-widest">Doplňky</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {addons.map((a, i) => (
              <div key={i} className="glass-card rounded-xl p-5 border-white/5">
                <div className="font-bold text-white text-sm mb-1">{a.name}</div>
                <div className="text-[10px] text-[#505050] mb-3 leading-relaxed uppercase font-bold tracking-wider">{a.description}</div>
                <div className="text-[#FF4D00] font-black text-sm">{a.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance */}
        <div>
          <h3 className="text-xl font-black text-white mb-6 text-center uppercase tracking-widest">Měsíční péče</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {maintenance.map((plan, i) => (
              <div key={i} className="glass-card rounded-xl p-6 border-white/5">
                <div className="font-bold text-white mb-1 uppercase tracking-wider">{plan.name}</div>
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
