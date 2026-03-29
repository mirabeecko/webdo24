import Link from 'next/link';
import { Zap, ChevronRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section-padding bg-[#050A08]">
      <div className="container-custom">
        <div
          className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(0,196,122,0.12) 0%, rgba(5,10,8,0) 70%), rgba(255,255,255,0.02)',
            border: '1px solid rgba(0,196,122,0.2)',
          }}
        >
          {/* Glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(0,196,122,0.15) 0%, transparent 70%)' }}
          />

          <div className="relative z-10">
            <div className="tag mx-auto mb-6 w-fit">Začněte dnes</div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Váš web může být{' '}
              <span className="gradient-text">online zítra.</span>
            </h2>
            <p className="text-[#808080] text-lg max-w-xl mx-auto mb-10">
              Vyplňte formulář za 2 minuty. Zaplaťte celou cenu — QR kódem, převodem nebo na splátky.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/objednat"
                className="btn-primary flex items-center gap-2.5 px-10 py-4 text-base font-bold w-full sm:w-auto justify-center"
              >
                <Zap className="w-5 h-5" />
                Chci web do 24 hodin
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="mailto:info@webdo24.cz"
                className="btn-secondary flex items-center gap-2 px-8 py-4 text-base w-full sm:w-auto justify-center"
              >
                Napsat e-mail
              </a>
            </div>
            <p className="text-[#404040] text-xs mt-6">
              Celá platba předem · 1 revize zdarma · Hosting v ceně · Bez skrytých poplatků
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
