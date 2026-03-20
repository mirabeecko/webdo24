import { testimonials } from '@/lib/data';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="section-padding" style={{ background: 'linear-gradient(180deg, #080808 0%, #0d0808 100%)' }}>
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="tag mb-5">Výsledky klientů</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Slova jsou levná.{' '}
            <span className="gradient-text">Výsledky mluví.</span>
          </h2>
          <p className="text-[#606060] text-lg max-w-xl mx-auto">
            Reálné příběhy. Žádná smyšlená hodnocení.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card-hover rounded-2xl p-7 flex flex-col">
              <Quote className="w-7 h-7 mb-4" style={{ color: 'rgba(255,77,0,0.3)' }} />
              <p className="text-[#C0C0C0] text-sm leading-relaxed mb-5 flex-grow">
                &ldquo;{t.text}&rdquo;
              </p>

              {t.result && (
                <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 mb-4 w-fit"
                  style={{ background: 'rgba(255,77,0,0.1)', border: '1px solid rgba(255,77,0,0.2)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
                  <span className="text-[#FF6B2B] text-xs font-bold">{t.result}</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-[#505050]">{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[#303030] mt-8">
          Reference jsou reálné. Nikdy neuvádíme smyšlená hodnocení.
        </p>
      </div>
    </section>
  );
}
