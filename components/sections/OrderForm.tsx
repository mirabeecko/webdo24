'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { packages } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Loader2, Check, Zap, ChevronRight } from 'lucide-react';
import type { OrderFormData } from '@/types';

const INITIAL: OrderFormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  selectedPackage: '',
  industry: '',
  businessDescription: '',
  designStyle: '',
  designInspiration: '',
  hasLogo: '',
  hasTexts: '',
  hasPhotos: '',
  note: '',
};

const STEPS = [
  { id: 1, title: 'Kontakt' },
  { id: 2, title: 'Produkt' },
  { id: 3, title: 'Byznys' },
  { id: 4, title: 'Styl' },
  { id: 5, title: 'Obsah' },
  { id: 6, title: 'Odeslání' },
];

export default function OrderForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<OrderFormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const paket = searchParams.get('paket');
    if (paket === 'start' || paket === 'pro' || paket === 'machine') {
      setForm((f) => ({ ...f, selectedPackage: paket }));
      setStep(2);
    }
  }, [searchParams]);

  const set = (key: keyof OrderFormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const canNext = () => {
    if (step === 1) return form.name && form.email && form.phone;
    if (step === 2) return !!form.selectedPackage;
    if (step === 3) return form.industry && form.businessDescription;
    if (step === 4) return !!form.designStyle;
    if (step === 5) return form.hasLogo && form.hasTexts && form.hasPhotos;
    return true;
  };

  const handleSubmit = async () => {
    if (!canNext()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Chyba při odesílání.');

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Chyba serveru. Zkuste to znovu.');
    } finally {
      setLoading(false);
    }
  };

  const selectedPkg = packages.find((p) => p.id === form.selectedPackage);

  return (
    <div className="max-w-2xl mx-auto xl:max-w-none">
      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <button
              onClick={() => step > s.id && setStep(s.id)}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all',
                step === s.id
                  ? 'bg-[#00C47A] text-[#050A08] shadow-[0_0_20px_rgba(0,196,122,0.4)]'
                  : step > s.id
                  ? 'bg-[#00C47A]/20 text-[#00C47A] cursor-pointer hover:bg-[#00C47A]/30'
                  : 'bg-white/5 text-[#404040] cursor-default'
              )}
            >
              {step > s.id ? <Check className="w-3.5 h-3.5" /> : s.id}
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-px transition-all',
                  step > s.id ? 'bg-[#00C47A]/40' : 'bg-white/5'
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="glass-card p-8">
        {/* Step 1 — Kontakt */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-2">Vaše kontaktní údaje</h2>
            <p className="text-[#606060] text-sm mb-8">Potřebujeme vědět, jak vás kontaktovat.</p>
            <div className="space-y-4">
              <Field label="Jméno a příjmení *" value={form.name} onChange={(v) => set('name', v)} placeholder="Jan Novák" />
              <Field label="Firma / projekt" value={form.company} onChange={(v) => set('company', v)} placeholder="Novák s.r.o." />
              <Field label="E-mail *" type="email" value={form.email} onChange={(v) => set('email', v)} placeholder="jan@firma.cz" />
              <Field label="Telefon *" type="tel" value={form.phone} onChange={(v) => set('phone', v)} placeholder="+420 777 000 000" />
            </div>
          </div>
        )}

        {/* Step 2 — Produkt */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-2">Vyberte balíček</h2>
            <p className="text-[#606060] text-sm mb-8">Celá platba předem. Hosting, texty a SEO v ceně.</p>
            <div className="space-y-3">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => set('selectedPackage', pkg.id)}
                  className={cn(
                    'w-full rounded-xl p-5 text-left transition-all border',
                    form.selectedPackage === pkg.id
                      ? 'border-[#00C47A] bg-[rgba(0,196,122,0.06)]'
                      : 'border-white/8 bg-white/3 hover:border-white/15'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-white text-sm">{pkg.name}</span>
                        {pkg.badge && (
                          <span className="text-[10px] font-bold text-[#050A08] bg-[#00C47A] px-2 py-0.5 rounded-full">
                            {pkg.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[#606060] text-xs leading-relaxed">{pkg.description}</p>
                      <p className="text-[#505050] text-xs mt-1.5">Dodání: {pkg.deliveryTime}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-white font-black text-lg">{pkg.priceFormatted}</div>
                      <div className="text-[#505050] text-xs">{pkg.priceNote}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — Byznys */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-2">O vašem byznysu</h2>
            <p className="text-[#606060] text-sm mb-8">Čím lépe vás pochopíme, tím lepší web vytvoříme.</p>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#C0C0C0] mb-2">Obor podnikání *</label>
                <select
                  value={form.industry}
                  onChange={(e) => set('industry', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00C47A]/60 appearance-none"
                >
                  <option value="" className="bg-[#0A0A0F]">Vyberte obor…</option>
                  {['Řemesla & stavba', 'Zdraví & wellness', 'Restaurace & catering', 'E-commerce', 'Consulting & poradenství', 'IT & technologie', 'Kreativa & design', 'Vzdělávání', 'Realitní trh', 'Jiné'].map((o) => (
                    <option key={o} value={o} className="bg-[#0A0A0F]">{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#C0C0C0] mb-2">Stručně o byznysu *</label>
                <textarea
                  value={form.businessDescription}
                  onChange={(e) => set('businessDescription', e.target.value)}
                  placeholder="Co děláte, pro koho, co vás odlišuje od konkurence…"
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#404040] focus:outline-none focus:border-[#00C47A]/60 resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4 — Styl */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-2">Styl webu</h2>
            <p className="text-[#606060] text-sm mb-8">Jak má váš web působit na návštěvníky?</p>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#C0C0C0] mb-3">Vizuální styl *</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'minimalistic', label: 'Minimalistický', desc: 'Čistý, vzdušný' },
                    { value: 'bold', label: 'Tučný / výrazný', desc: 'Silný, kontrastní' },
                    { value: 'corporate', label: 'Korporátní', desc: 'Profesionální' },
                    { value: 'creative', label: 'Kreativní', desc: 'Originální, hravý' },
                  ].map((s) => (
                    <button
                      key={s.value}
                      onClick={() => set('designStyle', s.value)}
                      className={cn(
                        'p-4 rounded-xl border text-left transition-all',
                        form.designStyle === s.value
                          ? 'border-[#00C47A] bg-[rgba(0,196,122,0.06)]'
                          : 'border-white/8 bg-white/3 hover:border-white/15'
                      )}
                    >
                      <div className="font-semibold text-white text-sm">{s.label}</div>
                      <div className="text-[#606060] text-xs mt-0.5">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#C0C0C0] mb-2">
                  Inspirace (URL webu, který se vám líbí)
                </label>
                <Field
                  label=""
                  value={form.designInspiration}
                  onChange={(v) => set('designInspiration', v)}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5 — Obsah */}
        {step === 5 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-2">Připravené podklady</h2>
            <p className="text-[#606060] text-sm mb-8">Co máte a co dodáme my.</p>
            <div className="space-y-5">
              {[
                { key: 'hasLogo' as const, label: 'Logo' },
                { key: 'hasTexts' as const, label: 'Texty o firmě' },
                { key: 'hasPhotos' as const, label: 'Fotografie' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-[#C0C0C0] mb-2">{label}</label>
                  <div className="flex gap-3">
                    {['Ano, mám', 'Ne, potřebuji pomoct'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => set(key, opt)}
                        className={cn(
                          'flex-1 py-3 rounded-xl border text-sm font-medium transition-all',
                          form[key] === opt
                            ? 'border-[#00C47A] bg-[rgba(0,196,122,0.06)] text-white'
                            : 'border-white/8 bg-white/3 text-[#808080] hover:border-white/15'
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 6 — Shrnutí + odeslání */}
        {step === 6 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-2">Shrnutí objednávky</h2>
            <p className="text-[#606060] text-sm mb-6">Zkontrolujte detaily a potvrďte objednávku.</p>

            {selectedPkg && (
              <div className="accent-border rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-black text-white text-lg">{selectedPkg.name}</span>
                  <span className="font-black text-[#00C47A] text-xl">{selectedPkg.priceFormatted}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm mb-3">
                  <span className="text-[#606060]">Celková cena:</span>
                  <span className="text-white font-semibold">{selectedPkg.priceFormatted}</span>
                  <span className="text-[#606060]">Dodání:</span>
                  <span className="text-white font-semibold">{selectedPkg.deliveryTime}</span>
                </div>
                <p className="text-[#505050] text-xs">Celá platba předem. Hosting, texty a SEO v ceně.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                'Platba běží přes Stripe',
                'Potvrzení posíláme hned e-mailem',
                'Bez schůzek a bez čekání na nabídku',
              ].map((item) => (
                <div key={item} className="rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-xs text-[#B8C2BC]">
                  {item}
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6 text-sm">
              {[
                { label: 'Jméno', value: form.name },
                { label: 'E-mail', value: form.email },
                { label: 'Telefon', value: form.phone },
                form.company ? { label: 'Firma', value: form.company } : null,
              ]
                .filter(Boolean)
                .map((row) => row && (
                  <div key={row.label} className="flex gap-3">
                    <span className="text-[#505050] w-20 flex-shrink-0">{row.label}:</span>
                    <span className="text-white">{row.value}</span>
                  </div>
                ))}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#C0C0C0] mb-2">Poznámka (volitelné)</label>
              <textarea
                value={form.note}
                onChange={(e) => set('note', e.target.value)}
                placeholder="Cokoliv dalšího, co chcete říct…"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#404040] focus:outline-none focus:border-[#00C47A]/60 resize-none mb-4"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2.5 py-4 text-base font-black disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Zpracovávám…
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Zaplatit a objednat
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-center text-[#404040] text-xs mt-3">
              Budete přesměrováni na bezpečnou platební bránu. Žádné údaje o kartě neukládáme.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className={cn('flex gap-3 mt-8', step === 1 ? 'justify-end' : 'justify-between')}>
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="btn-secondary px-6 py-3 text-sm"
            >
              ← Zpět
            </button>
          )}
          {step < 6 && (
            <button
              onClick={() => canNext() && setStep((s) => s + 1)}
              disabled={!canNext()}
              className="btn-primary flex items-center gap-2 px-7 py-3 text-sm font-bold disabled:opacity-40"
            >
              Pokračovat
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <p className="text-center text-[#404040] text-xs mt-5">
        Vyplněním souhlasíte s{' '}
        <a href="/obchodnipodminky" className="underline hover:text-[#606060]">obchodními podmínkami</a>
        {' '}a{' '}
        <a href="/gdpr" className="underline hover:text-[#606060]">zpracováním osobních údajů</a>.
      </p>
      <p className="text-center text-[#404040] text-xs mt-3">
        Pokud chcete před objednávkou něco ověřit, napište na info@webdo24.cz. Odpovídáme průběžně během dne.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      {label && <label className="block text-sm font-semibold text-[#C0C0C0] mb-2">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#404040] focus:outline-none focus:border-[#00C47A]/60 transition-colors"
      />
    </div>
  );
}
