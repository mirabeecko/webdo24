'use client';

import { useState } from 'react';
import { faqs } from '@/lib/data';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FAQ({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const displayFaqs = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section className="section-padding bg-[#0A0A0F]">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="tag mb-5">Časté otázky</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Máte otázky?{' '}
            <span className="gradient-text">Máme odpovědi.</span>
          </h2>
          <p className="text-[#6B6B8A] text-lg max-w-xl mx-auto">
            Pokud nenajdete odpověď, napište nám. Odpovídáme do 2 hodin v pracovní dny.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {displayFaqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                'rounded-xl border transition-all duration-200',
                open === i
                  ? 'bg-[#6C63FF]/05 border-[#6C63FF]/25'
                  : 'glass-card border-white/[0.06] hover:border-white/[0.12]'
              )}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-white text-sm leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-[#6C63FF] flex-shrink-0 transition-transform duration-200',
                    open === i && 'rotate-180'
                  )}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-[#A0A0C0] text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {limit && faqs.length > limit && (
          <div className="text-center mt-8">
            <a href="/faq" className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm">
              Zobrazit všechny otázky ({faqs.length})
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
