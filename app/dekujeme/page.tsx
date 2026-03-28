import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Mail, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Objednávka přijata — Do24',
  description: 'Vaše objednávka byla přijata. Stavíme váš web.',
};

export default function DekujemePage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#050A08] pt-16">
      <div className="container-custom">
        <div className="max-w-xl mx-auto text-center">
          {/* Icon */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ background: 'rgba(0,196,122,0.1)', border: '1px solid rgba(0,196,122,0.3)' }}
          >
            <CheckCircle2 className="w-10 h-10 text-[#00C47A]" />
          </div>

          <div className="tag mx-auto mb-6 w-fit">Objednávka přijata</div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-5">
            Díky!{' '}
            <span className="gradient-text">Stavíme váš web.</span>
          </h1>

          <p className="text-[#808080] text-lg mb-10">
            Záloha byla přijata. Náš tým se pustil do práce. Brzy se ozveme s&nbsp;průběžným reportem.
          </p>

          {/* Timeline */}
          <div className="glass-card p-6 mb-10 text-left space-y-4">
            {[
              { time: 'Hned', text: 'Přijali jsme vaši zálohu a objednávku' },
              { time: 'Do 2 hodin', text: 'Ozveme se e-mailem s potvrzením a termínem' },
              { time: 'V termínu', text: 'Web je live — pošleme odkaz ke schválení' },
              { time: 'Po schválení', text: 'Doplatíte zbytek, web je váš navždy' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-[#050A08] flex-shrink-0 mt-0.5"
                  style={{ background: 'linear-gradient(135deg, #00C47A, #00E08A)' }}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="text-[#00C47A] font-bold text-xs uppercase tracking-wide">{item.time}</div>
                  <div className="text-white text-sm">{item.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a href="mailto:ahoj@do24.cz" className="flex items-center gap-2 text-[#606060] hover:text-white transition-colors text-sm">
              <Mail className="w-4 h-4 text-[#00C47A]" />
              ahoj@do24.cz
            </a>
            <span className="text-[#505050] text-sm">Potvrzení a další kroky posíláme průběžně e-mailem.</span>
          </div>

          <Link href="/" className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm">
            <Zap className="w-4 h-4" />
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </section>
  );
}
