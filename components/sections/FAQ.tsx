'use client';

import { useState } from 'react';
import { faqs } from '@/lib/data';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FAQ({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const displayFaqs = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section className="section-padding bg-[#080808]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="tag mb-5">Máte otázky</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Odpovídáme{' '}
            <span className="gradient-text">rovnou.</span>
          </h2>
          <p className="text-[#606060] text-lg max-w-xl mx-auto">
            Nenašli jste odpověď? Napište nám. Odpovídáme do 2 hodin.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-2.5">
          {displayFaqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                'rounded-xl border transition-all duration-200',
                open === i
                  ? 'border-[rgba(255,77,0,0.3)]'
                  : 'glass-card hover:border-[rgba(255,255,255,0.12)]'
              )}
              style={open === i ? { background: 'rgba(255,77,0,0.04)' } : {}}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-white text-sm leading-snug">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 flex-shrink-0 transition-transform duration-200',
                    open === i ? 'rotate-180 text-[#FF4D00]' : 'text-[#505050]'
                  )}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-[#909090] text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {limit && faqs.length > limit && (
          <div className="text-center mt-8">
            <a href="/faq" className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm">
              Zobrazit všech {faqs.length} otázek
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
