'use client';

import { useState } from 'react';
import { faqs } from '@/lib/data';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FAQ({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const items = typeof limit === 'number' ? faqs.slice(0, limit) : faqs;

  return (
    <section className="section-padding bg-[#050A08]" id="faq">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="tag mb-5">Časté otázky</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Máte otázky?{' '}
            <span className="gradient-text">Odpovídáme rovnou.</span>
          </h2>
          <p className="text-[#606060] text-lg max-w-xl mx-auto">
            Nenašli jste odpověď? Napište nám na ahoj@do24.cz. Odpovídáme do 2 hodin.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-2">
          {items.map((faq, i) => (
            <div
              key={i}
              className={cn(
                'rounded-xl border transition-all duration-200',
                open === i
                  ? 'border-[rgba(0,196,122,0.3)]'
                  : 'glass-card hover:border-[rgba(255,255,255,0.12)]'
              )}
              style={open === i ? { background: 'rgba(0,196,122,0.04)' } : {}}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-white text-sm leading-snug">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 flex-shrink-0 transition-transform duration-200',
                    open === i ? 'rotate-180 text-[#00C47A]' : 'text-[#505050]'
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
      </div>
    </section>
  );
}
