import { testimonials } from '@/lib/data';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="section-padding" style={{ background: 'linear-gradient(180deg, #0A0A0F 0%, #0d0d1a 100%)' }}>
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="tag mb-5">Zkušenosti klientů</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Co říkají{' '}
            <span className="gradient-text">naši klienti</span>
          </h2>
          <p className="text-[#6B6B8A] text-lg max-w-xl mx-auto">
            Reálné výsledky od skutečných podnikatelů.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card-hover rounded-2xl p-7 flex flex-col">
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#6C63FF]/30 mb-4" />

              {/* Text */}
              <p className="text-[#C9C9E0] text-sm leading-relaxed mb-6 flex-grow">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Result badge */}
              {t.result && (
                <div className="inline-flex items-center gap-1.5 bg-[#6C63FF]/10 border border-[#6C63FF]/20 rounded-full px-3 py-1.5 mb-4 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF]" />
                  <span className="text-[#8B85FF] text-xs font-semibold">{t.result}</span>
                </div>
              )}

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-[#6B6B8A]">{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <p className="text-center text-xs text-[#4A4A68] mt-8">
          Reference jsou reálné. Nikdy neuvádíme smyšlené hodnocení.
        </p>
      </div>
    </section>
  );
}
