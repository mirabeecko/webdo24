import Link from 'next/link';
import { Zap, Phone, Mail, ChevronRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section-padding bg-[#080808]">
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden">
          {/* BG */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(255,77,0,0.12) 0%, rgba(255,140,0,0.06) 50%, rgba(8,8,8,0) 100%)' }} />
          <div className="absolute inset-0 rounded-3xl"
            style={{ border: '1px solid rgba(255,77,0,0.2)' }} />
          {/* Glow top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] rounded-full blur-[60px] pointer-events-none"
            style={{ background: 'rgba(255,77,0,0.12)' }} />

          <div className="relative z-10 text-center p-10 md:p-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(255,77,0,0.12)', border: '1px solid rgba(255,77,0,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] pulse-dot" />
              <span className="text-[#FF6B2B] text-xs font-bold uppercase tracking-widest">
                Přijímáme objednávky 24/7
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
              Váš web může být <br />
              <span className="gradient-text text-[#FF4D00]">online do zítřka.</span>
            </h2>

            <p className="text-[#606060] text-lg mb-3 max-w-xl mx-auto">
              Každý den bez webu je den, kdy zákazníci najdou vaši konkurenci.
            </p>
            <p className="text-[#404040] text-sm mb-10">
              Kalkulaci máte za 30 sekund. Odpovídáme do 2 hodin.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                href="#kalkulacka"
                className="bg-[#FF4D00] hover:bg-[#FF6B2B] text-white flex items-center gap-2.5 px-9 py-5 text-lg font-black w-full sm:w-auto justify-center rounded-2xl transition-all shadow-[0_10px_30px_rgba(255,77,0,0.2)]"
              >
                <Zap className="w-5 h-5 fill-current" />
                SPOČÍTAT CENU A OBJEDNAT
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link href="#cenik"
                className="btn-secondary flex items-center gap-2 px-8 py-5 text-lg w-full sm:w-auto justify-center rounded-2xl">
                Prohlédnout ceník
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="tel:+420777734389"
                className="flex items-center gap-2 text-[#606060] hover:text-white transition-colors text-lg font-bold">
                <Phone className="w-5 h-5 text-[#FF4D00]" />
                +420 777 734 389
              </a>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-[#282828]" />
              <a href="mailto:ahoj@webdozitra.cz"
                className="flex items-center gap-2 text-[#606060] hover:text-white transition-colors text-lg">
                <Mail className="w-5 h-5 text-[#FF4D00]" />
                ahoj@webdozitra.cz
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
