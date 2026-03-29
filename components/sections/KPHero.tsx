import Link from 'next/link';
import { ChevronRight, Zap, ShieldCheck, Star, Phone } from 'lucide-react';

export default function KPHero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#050A08]">
      {/* Top bar */}
      <div className="urgency-bar pt-20 pb-3 relative z-10 text-center bg-[#FF4D00]/10 border-b border-[#FF4D00]/20 text-[#FF4D00] text-sm font-black uppercase tracking-widest">
        🚀 AKCE: DNES OBJEDNÁTE = 50% SLEVA + WEB ONLINE DO ZÍTRA — GARANTOVÁNO
      </div>

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{background:'radial-gradient(ellipse, rgba(255,77,0,0.07) 0%, transparent 70%)'}} />

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
            <span className="text-[#4A6055] text-sm ml-2 font-medium">100+ prodejních mašin v provozu</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{background:'rgba(255,77,0,0.1)', border:'1px solid rgba(255,77,0,0.25)'}}>
            <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
            <span className="text-[#FF4D00] text-sm font-bold uppercase tracking-widest">
              Od objednávky k webu za 24 hodin
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-black leading-[1.02] tracking-tight mb-6 text-white">
            Proměňte svůj web v <br />
            <span className="text-[#00C47A] underline decoration-4 underline-offset-8">prodejní mašinu</span>
            <br />do 24 hodin.
          </h1>

          {/* Sub */}
          <p className="text-xl text-[#7A9E8E] leading-relaxed mb-4 max-w-2xl mx-auto">
            Stavíme weby s extrémně vysokým konverzním poměrem. Žádné zbytečné řeči, jen výsledky. 
            <strong className="text-white font-semibold"> Nyní se slevou 50 % — od 4 900 Kč.</strong>
          </p>
          
          <div className="flex items-center justify-center gap-2 text-[#FF4D00] font-black mb-10 text-lg uppercase tracking-wider">
            <Zap className="w-5 h-5 fill-current" />
            Garantujeme spuštění do zítřejšího rána
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="#kalkulacka"
              className="bg-[#00C47A] hover:bg-[#00E08B] text-black shadow-[0_0_30px_rgba(0,196,122,0.3)] flex items-center gap-2.5 px-9 py-5 text-lg font-black w-full sm:w-auto justify-center rounded-2xl transition-all scale-105 hover:scale-110">
              <Zap className="w-6 h-6 fill-current" />
              SPOČÍTAT CENU A OBJEDNAT
              <ChevronRight className="w-6 h-6" />
            </Link>
          </div>
          
          <div className="mb-14">
            <a href="tel:+420777734389" className="flex items-center justify-center gap-3 text-white hover:text-[#00C47A] transition-colors group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#00C47A]/10">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black">+420 777 734 389</span>
            </a>
          </div>

          {/* Risk reversal box */}
          <div className="rounded-2xl p-5 max-w-lg mx-auto mb-14"
            style={{background:'rgba(0,196,122,0.06)', border:'1px solid rgba(0,196,122,0.2)'}}>
            <div className="flex items-start gap-3 text-left">
              <ShieldCheck className="w-5 h-5 text-[#00C47A] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold text-sm mb-1">Ujíždějící vlak: Tato cena platí jen pro dnešní objednávky</p>
                <p className="text-[#4A6055] text-xs leading-relaxed">
                  Nedodáme do 24 hodin → vracíme celou platbu. 15minutová akční cena platí jen jednou pro každý e-mail.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
              { value: '24h', label: 'Dodání' },
              { value: '50%', label: 'Sleva nyní' },
              { value: '4.9★', label: 'Hodnocení' },
              { value: '777+', label: 'Support' },
            ].map(s => (
              <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl font-black text-white mb-0.5">{s.value}</div>
                <div className="text-[10px] text-[#3A5045] uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
