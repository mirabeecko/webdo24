import Link from 'next/link';
import { ChevronRight, Clock, ShieldCheck, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#050A08]">
      {/* Background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,196,122,0.07) 0%, transparent 70%)' }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,196,122,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,122,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-custom relative z-10 flex-1 flex items-center pt-16">
        <div className="max-w-4xl mx-auto text-center py-16 w-full">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 tag">
            <span className="w-2 h-2 rounded-full bg-[#00C47A] pulse-dot" />
            <span>Web do 24 hodin · Garantováno</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-black leading-[1.0] tracking-tight mb-6">
            Chceš mít web{' '}
            <span className="gradient-text">do 24 hodin?</span>
          </h1>

          {/* Sub */}
          <p className="text-xl sm:text-2xl text-[#808080] font-light leading-relaxed mb-4 max-w-2xl mx-auto">
            Profesionální web, který přivádí zákazníky —{' '}
            <strong className="text-white font-semibold">spuštěný do 24 hodin</strong>.
            Bez schůzek, bez čekání.
          </p>

          <p className="text-base text-[#505050] mb-10">
            Pokud nestihneme → vracíme zálohu. Bez diskuze.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              href="/objednat"
              className="btn-primary flex items-center gap-2.5 px-9 py-4 text-base font-bold w-full sm:w-auto justify-center"
            >
              <Zap className="w-5 h-5" />
              Chci web do 24 hodin
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/#produkty"
              className="btn-secondary flex items-center gap-2 px-8 py-4 text-base w-full sm:w-auto justify-center"
            >
              Zobrazit produkty
            </Link>
          </div>

          {/* Trust */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            {[
              { icon: Clock, text: 'Dodání do 24 hodin' },
              { icon: ShieldCheck, text: 'Záruka vrácení zálohy' },
              { icon: Zap, text: 'Bez zbytečných schůzek' },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2">
                <b.icon className="w-4 h-4 text-[#00C47A]" />
                <span className="text-[#606060] text-sm font-medium">{b.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
              { value: '24h', label: 'průměrná dodávka' },
              { value: '100+', label: 'spuštěných webů' },
              { value: '4.9★', label: 'hodnocení klientů' },
              { value: '4 990', label: 'od Kč bez DPH' },
            ].map((s) => (
              <div key={s.label} className="glass-card p-4 text-center">
                <div className="text-2xl font-black text-white mb-0.5">{s.value}</div>
                <div className="text-[10px] text-[#404040] leading-tight uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-25">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#00C47A]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#00C47A]" />
      </div>
    </section>
  );
}
