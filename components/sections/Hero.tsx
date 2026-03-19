import Link from 'next/link';
import { ChevronRight, Zap, Shield, Clock } from 'lucide-react';

const trustBadges = [
  { icon: Clock, text: 'Spuštění do 7 dnů' },
  { icon: Shield, text: 'Záruka výsledku' },
  { icon: Zap, text: 'Bez zbytečných schůzek' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0F]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#6C63FF]/[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#4C45CC]/[0.05] blur-[80px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-[#8B85FF]/[0.04] blur-[80px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(108,99,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#8B85FF] text-sm font-semibold mb-8 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-pulse" />
            Web do 7 dnů — garantováno
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            Profesionální web,{' '}
            <span className="gradient-text">který přivádí zákazníky</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-[#A0A0C0] font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Neprodáváme vám web. Dáváme vám nástroj, který pracuje za vás — přivádí zákazníky,
            buduje důvěru a roste s vaším podnikáním.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              href="/objednat"
              className="btn-primary flex items-center gap-2 px-8 py-4 text-base font-semibold w-full sm:w-auto justify-center"
            >
              Chci web do 7 dnů
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/jak-to-funguje"
              className="btn-secondary flex items-center gap-2 px-8 py-4 text-base font-semibold w-full sm:w-auto justify-center"
            >
              Jak to funguje?
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 text-[#6B6B8A]">
                <badge.icon className="w-4 h-4 text-[#6C63FF]" />
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: '7 dnů', label: 'průměrná doba dodání' },
            { value: '100+', label: 'spokojených klientů' },
            { value: '4.9★', label: 'hodnocení od klientů' },
            { value: '0', label: 'překvapení ve faktuře' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-5 text-center"
            >
              <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs text-[#6B6B8A] leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#6C63FF]" />
        <div className="w-1 h-1 rounded-full bg-[#6C63FF] animate-bounce" />
      </div>
    </section>
  );
}
