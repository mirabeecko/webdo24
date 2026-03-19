import { packages, addons, maintenance } from '@/lib/data';
import { Check, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Pricing() {
  return (
    <section className="section-padding bg-[#0A0A0F]" id="cenik">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="tag mb-5">Transparentní ceny</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Vyberte si{' '}
            <span className="gradient-text">správný balíček</span>
          </h2>
          <p className="text-[#6B6B8A] text-lg max-w-xl mx-auto">
            Cena je jasná předem. Žádné hodiny navíc, žádné skryté poplatky.
          </p>
        </div>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl p-7 flex flex-col ${
                pkg.highlighted
                  ? 'bg-gradient-to-b from-[#6C63FF]/15 to-[#6C63FF]/5 border border-[#6C63FF]/40 shadow-2xl shadow-[#6C63FF]/10'
                  : 'glass-card'
              }`}
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#6C63FF] to-[#8B85FF] text-white text-xs font-bold px-4 py-1 rounded-full">
                    {pkg.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className="text-xs font-bold text-[#6C63FF] uppercase tracking-widest mb-2">{pkg.name}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black text-white">{pkg.price} Kč</span>
                </div>
                <div className="text-xs text-[#6B6B8A]">{pkg.priceNote}</div>
              </div>

              <p className="text-[#A0A0C0] text-sm mb-6 leading-relaxed">{pkg.description}</p>

              {/* Features */}
              <ul className="flex flex-col gap-2.5 mb-8 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-[#6C63FF] flex-shrink-0 mt-0.5" />
                    <span className="text-[#C9C9E0]">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/objednat?package=${pkg.id}`}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  pkg.highlighted
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {pkg.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Express delivery */}
        <div className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 mb-10">
          <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="font-bold text-white mb-1">Expresní dodání — +40 %</div>
            <p className="text-[#6B6B8A] text-sm">
              Potřebujete web do 3 dnů? Prioritně zařadíme váš projekt a spustíme v rekordním čase.
            </p>
          </div>
          <Link href="/objednat?expres=true" className="btn-secondary px-6 py-3 text-sm flex-shrink-0">
            Objednat expres
          </Link>
        </div>

        {/* Addons */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-white mb-5 text-center">Doplňky</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addons.map((addon, i) => (
              <div key={i} className="glass-card rounded-xl p-5">
                <div className="font-semibold text-white text-sm mb-1">{addon.name}</div>
                <div className="text-xs text-[#6B6B8A] mb-3 leading-relaxed">{addon.description}</div>
                <div className="text-[#6C63FF] font-bold text-sm">{addon.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance */}
        <div>
          <h3 className="text-xl font-bold text-white mb-5 text-center">Měsíční péče</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {maintenance.map((plan, i) => (
              <div key={i} className="glass-card rounded-xl p-6">
                <div className="font-bold text-white mb-1">{plan.name}</div>
                <div className="text-[#6C63FF] font-black text-xl mb-4">{plan.price}</div>
                <ul className="flex flex-col gap-2">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-[#A0A0C0]">
                      <Check className="w-3.5 h-3.5 text-[#6C63FF] flex-shrink-0" />
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
