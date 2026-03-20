import { steps } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="section-padding bg-[#080808]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="tag mb-5">Jak to funguje</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Od poptávky k webu{' '}
            <span className="gradient-text">za 24 hodin</span>
          </h2>
          <p className="text-[#606060] text-lg max-w-xl mx-auto">
            Celý proces jsme navrhli tak, aby byl co nejrychlejší. Vy podnikáte — my stavíme.
          </p>
        </div>

        {/* Timeline strip */}
        <div className="relative">
          {/* Desktop connector */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,77,0,0.3), rgba(255,77,0,0.3), transparent)' }} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="glass-card-hover rounded-2xl p-7 text-center h-full flex flex-col items-center">
                  <div className="relative mb-5">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                      style={{ background: 'rgba(255,77,0,0.1)', border: '1px solid rgba(255,77,0,0.2)' }}>
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                      style={{ background: 'linear-gradient(135deg, #FF4D00, #FF6B2B)' }}>
                      {step.number}
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2 text-base">{step.title}</h3>
                  <p className="text-[#606060] text-sm leading-relaxed">{step.description}</p>
                </div>

                {i < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-2">
                    <ArrowRight className="w-5 h-5 text-[#FF4D00]/40 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Result callout */}
        <div className="mt-10 rounded-2xl p-6 text-center"
          style={{ background: 'rgba(255,77,0,0.06)', border: '1px solid rgba(255,77,0,0.2)' }}>
          <p className="text-white font-bold text-lg">
            Výsledek: <span className="gradient-text">funkční web do 24 hodin od poptávky.</span>
          </p>
          <p className="text-[#606060] text-sm mt-1">Nebo vracíme zálohu — bez diskuze.</p>
        </div>

        <div className="text-center mt-8">
          <a href="/objednat"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base font-bold">
            Začít teď — 5 minut
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
