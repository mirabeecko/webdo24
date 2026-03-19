import Link from 'next/link';
import { ChevronRight, Phone, Mail } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section-padding" style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #0d0d1a 100%)' }}>
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/20 via-[#4C45CC]/10 to-[#0A0A0F]" />
          <div className="absolute inset-0 border border-[#6C63FF]/20 rounded-3xl" />

          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#6C63FF]/15 blur-[60px]" />

          <div className="relative z-10 text-center p-10 md:p-16">
            <div className="tag mx-auto mb-6">Začněte dnes</div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Váš web mohl být{' '}
              <span className="gradient-text">online za 7 dnů</span>
            </h2>

            <p className="text-[#A0A0C0] text-lg mb-10 max-w-xl mx-auto">
              Každý den bez webu je den, kdy zákazníci nacházejí vaši konkurenci.
              Vyplňte formulář — trvá to 5 minut.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                href="/objednat"
                className="btn-primary flex items-center gap-2 px-8 py-4 text-base font-semibold w-full sm:w-auto justify-center"
              >
                Objednat web
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/cenik"
                className="btn-secondary flex items-center gap-2 px-8 py-4 text-base w-full sm:w-auto justify-center"
              >
                Prohlédnout ceník
              </Link>
            </div>

            {/* Direct contacts */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="tel:+420777000111"
                className="flex items-center gap-2 text-[#6B6B8A] hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-[#6C63FF]" />
                +420 777 000 111
              </a>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-[#2D2D45]" />
              <a
                href="mailto:ahoj@webdozitra.cz"
                className="flex items-center gap-2 text-[#6B6B8A] hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-[#6C63FF]" />
                ahoj@webdozitra.cz
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
