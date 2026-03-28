import { trustPoints } from '@/lib/data';
import { BadgeCheck, ShieldCheck, Sparkles, WalletCards } from 'lucide-react';

const icons = [BadgeCheck, ShieldCheck, Sparkles, WalletCards];

export default function TrustSection() {
  return (
    <section className="section-padding bg-[#050A08]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 items-start">
          <div className="glass-card p-8 md:p-10">
            <div className="tag mb-5">Proč nám věřit</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
              Rychlost bez chaosu.{' '}
              <span className="gradient-text">A bez skrytých háčků.</span>
            </h2>
            <p className="text-[#707070] text-lg leading-relaxed max-w-xl">
              Do24 není levný kompromis ani agenturní moloch. Je to jasně nastavený proces pro firmy,
              které chtějí web rychle, čistě a bez nekonečného schvalování.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trustPoints.map((point, index) => {
              const Icon = icons[index];

              return (
                <div key={point.title} className="glass-card-hover p-6">
                  <Icon className="w-5 h-5 text-[#00C47A] mb-4" />
                  <h3 className="text-white font-bold text-base mb-2">{point.title}</h3>
                  <p className="text-[#707070] text-sm leading-relaxed">{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
