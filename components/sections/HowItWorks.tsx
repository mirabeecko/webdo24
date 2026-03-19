import { steps } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="section-padding" style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #0d0d1a 100%)' }}>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="tag mb-5">Postup spolupráce</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Od nápadu ke spuštění{' '}
            <span className="gradient-text">za 4 kroky</span>
          </h2>
          <p className="text-[#6B6B8A] text-lg max-w-xl mx-auto">
            Celý proces je přehledný a předvídatelný. Žádné nepříjemná překvapení.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#6C63FF]/30 to-transparent" />

          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="glass-card-hover rounded-2xl p-7 text-center h-full flex flex-col items-center">
                {/* Number circle */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6C63FF]/20 to-[#8B85FF]/10 border border-[#6C63FF]/20 flex items-center justify-center text-3xl">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#6C63FF] flex items-center justify-center">
                    <span className="text-white text-[10px] font-black">{step.number}</span>
                  </div>
                </div>

                <h3 className="font-bold text-white mb-3 text-lg">{step.title}</h3>
                <p className="text-[#6B6B8A] text-sm leading-relaxed">{step.description}</p>
              </div>

              {/* Arrow between steps (mobile) */}
              {i < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-3">
                  <ArrowRight className="w-5 h-5 text-[#6C63FF]/40 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/objednat"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base font-semibold"
          >
            Začít teď — trvá to 5 minut
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
