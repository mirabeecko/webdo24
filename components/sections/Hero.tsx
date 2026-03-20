import Link from 'next/link';
import { ChevronRight, Clock, ShieldCheck, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#080808]">
      {/* Urgency top bar */}
      <div className="urgency-bar pt-20 pb-3 relative z-10">
        ⚡ Dnes přijatá poptávka = web online do zítřejšího rána — garantováno
      </div>

      {/* Background fire glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,77,0,0.09) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,140,0,0.05) 0%, transparent 70%)' }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,77,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,77,0,1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />

      <div className="container-custom relative z-10 flex-1 flex items-center">
        <div className="max-w-4xl mx-auto text-center py-16">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
            style={{ background: 'rgba(255,77,0,0.1)', border: '1px solid rgba(255,77,0,0.25)' }}>
            <span className="w-2 h-2 rounded-full bg-[#FF4D00] pulse-dot" />
            <span className="text-[#FF6B2B] text-sm font-bold uppercase tracking-widest">
              Web do 24 hodin · Garantováno
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-black leading-[1.0] tracking-tight mb-6">
            Váš web{' '}
            <span className="gradient-text">hotový do zítra.</span>
          </h1>

          {/* Sub */}
          <p className="text-xl sm:text-2xl text-[#909090] font-light leading-relaxed mb-4 max-w-2xl mx-auto">
            Profesionální web, který přivádí zákazníky —{' '}
            <strong className="text-white font-semibold">spuštěný do 24 hodin</strong>.
            Bez čekání, bez zbytečných schůzek.
          </p>

          <p className="text-base text-[#606060] mb-10">
            Pokud nestihneme → vracíme zálohu. Žádné výmluvy.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              href="/objednat"
              className="btn-primary flex items-center gap-2.5 px-9 py-4 text-base font-bold w-full sm:w-auto justify-center rounded-xl"
            >
              <Zap className="w-5 h-5" />
              Chci web do 24 hodin
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link
              href="/cenik"
              className="btn-secondary flex items-center gap-2 px-8 py-4 text-base w-full sm:w-auto justify-center"
            >
              Zobrazit ceny
            </Link>
          </div>

          {/* Trust row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            {[
              { icon: Clock, text: 'Spuštění do 24 hodin' },
              { icon: ShieldCheck, text: 'Záruka vrácení zálohy' },
              { icon: Zap, text: 'Bez zbytečných schůzek' },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2">
                <b.icon className="w-4 h-4 text-[#FF4D00]" />
                <span className="text-[#606060] text-sm font-medium">{b.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
              { value: '24h', label: 'průměrná doba dodání' },
              { value: '100+', label: 'spuštěných webů' },
              { value: '4.9★', label: 'hodnocení klientů' },
              { value: '0 Kč', label: 'skrytých poplatků' },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-black text-white mb-0.5">{s.value}</div>
                <div className="text-[10px] text-[#505050] leading-tight uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll line */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-30">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#FF4D00]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
      </div>
    </section>
  );
}
