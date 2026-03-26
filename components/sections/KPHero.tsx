import Link from 'next/link';
import { ChevronRight, Zap, ShieldCheck, Star, Clock } from 'lucide-react';

const proofItems = [
  { label: '100+ webů spuštěno' },
  { label: 'Hodnocení 4.9/5' },
  { label: 'Záruka vrácení zálohy' },
];

export default function KPHero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#050A08]">
      {/* Top bar */}
      <div className="urgency-bar pt-20 pb-3 relative z-10">
        ✅ Dnes přijatá poptávka = web online do zítřejšího rána — garantováno nebo vracíme peníze
      </div>

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{background:'radial-gradient(ellipse, rgba(0,196,122,0.07) 0%, transparent 70%)'}} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,196,122,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,196,122,1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />

      <div className="container-custom relative z-10 flex-1 flex items-center">
        <div className="max-w-4xl mx-auto text-center py-16">

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-5">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-5 h-5 fill-[#00C47A] text-[#00C47A]" />
            ))}
            <span className="text-[#4A6055] text-sm ml-2 font-medium">100+ spokojených klientů</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{background:'rgba(0,196,122,0.1)', border:'1px solid rgba(0,196,122,0.25)'}}>
            <span className="w-2 h-2 rounded-full bg-[#00C47A] pulse-dot" />
            <span className="text-[#00E08A] text-sm font-bold uppercase tracking-widest">
              Web do 24 hodin · Garantováno
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-black leading-[1.02] tracking-tight mb-6">
            Web, který{' '}
            <span className="gradient-text">přivádí zákazníky</span>
            <br />— hotový do 24 hodin.
          </h1>

          {/* Sub */}
          <p className="text-xl text-[#7A9E8E] leading-relaxed mb-4 max-w-2xl mx-auto">
            Profesionální web s měřitelným výsledkem. Spuštění do 24 hodin,
            <strong className="text-white font-semibold"> pevná cena od 11 900 Kč</strong>,
            bez skrytých poplatků.
          </p>
          <p className="text-sm text-[#3A5045] mb-10">
            Pokud termín nestihtneme → vracíme 100 % zálohy. Žádné výmluvy.
          </p>

          {/* Proof strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {proofItems.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00C47A]" />
                <span className="text-[#7A9E8E] text-sm font-medium">{p.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link href="/objednat"
              className="btn-primary flex items-center gap-2.5 px-9 py-4 text-base font-bold w-full sm:w-auto justify-center rounded-xl">
              <Zap className="w-5 h-5" />
              Chci web do 24 hodin
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link href="/cenik"
              className="btn-secondary flex items-center gap-2 px-8 py-4 text-base w-full sm:w-auto justify-center">
              Prohlédnout ceny
            </Link>
          </div>

          {/* Risk reversal box */}
          <div className="rounded-2xl p-5 max-w-lg mx-auto mb-14"
            style={{background:'rgba(0,196,122,0.06)', border:'1px solid rgba(0,196,122,0.2)'}}>
            <div className="flex items-start gap-3 text-left">
              <ShieldCheck className="w-5 h-5 text-[#00C47A] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold text-sm mb-1">Záruka bez rizika</p>
                <p className="text-[#4A6055] text-xs leading-relaxed">
                  Nedodáme do 24 hodin z naší strany → vracíme zálohu. Nejste spokojeni s designem → opravujeme zdarma.
                  Technická chyba do 30 dnů → opravujeme bez poplatku.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
              { value: '24h', label: 'Dodání' },
              { value: '100+', label: 'Webů' },
              { value: '4.9★', label: 'Hodnocení' },
              { value: '0 Kč', label: 'Skryté poplatky' },
            ].map(s => (
              <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-black text-white mb-0.5">{s.value}</div>
                <div className="text-[10px] text-[#3A5045] uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-30">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[#00C47A]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#00C47A]" />
      </div>
    </section>
  );
}
