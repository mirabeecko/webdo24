'use client';

import { useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronRight, ChevronLeft, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OrderFormData } from '@/types';

const TOTAL_STEPS = 10;

const initialData: OrderFormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  industry: '',
  location: '',
  businessDescription: '',
  goals: [],
  websiteType: '',
  sections: [],
  hasLogo: '',
  hasTexts: '',
  hasPhotos: '',
  designStyle: '',
  designInspiration: '',
  seoInterest: '',
  ppcInterest: '',
  managementInterest: '',
  delivery: 'standard',
  selectedPackage: '',
  note: '',
};

const stepTitles = [
  'Kontaktní údaje',
  'O vašem podnikání',
  'Cíl webu',
  'Rozsah projektu',
  'Sekce webu',
  'Obsah a podklady',
  'Design',
  'Marketing',
  'Termín a balíček',
  'Poznámka',
];

const goalOptions = [
  'Získávat nové zákazníky',
  'Prezentovat produkty/služby',
  'Umožnit online rezervace',
  'Prodávat online (e-shop)',
  'Budovat značku / důvěru',
  'Informovat o firmě',
  'Generovat objednávky',
  'Nahradit stávající starý web',
];

const sectionOptions = [
  'Úvodní stránka (homepage)',
  'O nás / O firmě',
  'Produkty nebo služby',
  'Reference / galerie prací',
  'Blog / aktuality',
  'Ceník',
  'Kontaktní stránka',
  'Rezervační formulář',
  'FAQ',
  'Kariéra',
];

const websiteTypes = [
  { id: 'prezentace', label: 'Prezentační web', desc: '1–5 stránek' },
  { id: 'firemni', label: 'Firemní web', desc: '5–15 stránek' },
  { id: 'eshop', label: 'E-shop', desc: 'Prodej produktů online' },
  { id: 'landing', label: 'Landing page', desc: 'Jedna konverzní stránka' },
];

const designStyles = [
  { id: 'minimalistic', label: 'Minimalistický', desc: 'Čistý, hodně bílé' },
  { id: 'modern', label: 'Moderní / tmavý', desc: 'Premium, tech styl' },
  { id: 'friendly', label: 'Přátelský', desc: 'Barevný, přístupný' },
  { id: 'classic', label: 'Klasický', desc: 'Tradiční, konzervativní' },
];

function ProgressBar({ step }: { step: number }) {
  const progress = ((step) / TOTAL_STEPS) * 100;
  return (
    <div className="w-full bg-white/[0.06] rounded-full h-1.5 mb-8">
      <div
        className="h-1.5 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#8B85FF] transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-semibold text-[#6C63FF] uppercase tracking-widest">
        Krok {current} z {total}
      </span>
      <span className="text-xs text-[#6B6B8A]">{stepTitles[current - 1]}</span>
    </div>
  );
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
}) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => {
        const checked = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={cn(
              'flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200 text-sm',
              checked
                ? 'bg-[#6C63FF]/12 border-[#6C63FF]/40 text-white'
                : 'glass-card border-white/[0.08] text-[#A0A0C0] hover:border-white/20'
            )}
          >
            <div
              className={cn(
                'w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-all',
                checked
                  ? 'bg-[#6C63FF] border-[#6C63FF]'
                  : 'border-white/20 bg-white/[0.04]'
              )}
            >
              {checked && (
                <svg viewBox="0 0 12 10" className="w-3 h-2.5 text-white fill-none stroke-white stroke-2">
                  <polyline points="1,5 4,9 11,1" />
                </svg>
              )}
            </div>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function RadioGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string; desc: string }[];
  value: T;
  onChange: (val: T) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={cn(
            'p-4 rounded-xl border text-left transition-all duration-200',
            value === opt.id
              ? 'bg-[#6C63FF]/12 border-[#6C63FF]/40'
              : 'glass-card border-white/[0.08] hover:border-white/20'
          )}
        >
          <div className={cn('font-semibold text-sm mb-0.5', value === opt.id ? 'text-white' : 'text-[#A0A0C0]')}>
            {opt.label}
          </div>
          <div className="text-xs text-[#6B6B8A]">{opt.desc}</div>
        </button>
      ))}
    </div>
  );
}

function YesNoGroup({
  value,
  onChange,
  question,
}: {
  value: string;
  onChange: (v: string) => void;
  question: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#C9C9E0] mb-3">{question}</label>
      <div className="flex gap-3">
        {['ano', 'ne', 'nevím'].map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              'px-5 py-2.5 rounded-xl border text-sm font-medium transition-all',
              value === opt
                ? 'bg-[#6C63FF]/15 border-[#6C63FF]/40 text-white'
                : 'glass-card border-white/[0.08] text-[#A0A0C0] hover:border-white/20'
            )}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function OrderForm() {
  const searchParams = useSearchParams();
  const packageParam = searchParams.get('package') || '';
  const expresParam = searchParams.get('expres') === 'true';

  const [step, setStep] = useState(1);
  const [data, setData] = useState<OrderFormData>({
    ...initialData,
    selectedPackage: packageParam,
    delivery: expresParam ? 'expres' : 'standard',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const update = useCallback((field: keyof OrderFormData, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof OrderFormData, string>> = {};

    if (step === 1) {
      if (!data.name.trim()) errs.name = 'Zadejte jméno';
      if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errs.email = 'Zadejte platný email';
      if (!data.phone.trim()) errs.phone = 'Zadejte telefon';
    }
    if (step === 2) {
      if (!data.industry.trim()) errs.industry = 'Zadejte obor';
      if (!data.location.trim()) errs.location = 'Zadejte lokalitu';
    }
    if (step === 3) {
      if (data.goals.length === 0) errs.goals = 'Vyberte alespoň jeden cíl';
    }
    if (step === 4) {
      if (!data.websiteType) errs.websiteType = 'Vyberte typ webu';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setStep((s) => Math.min(s + 1, TOTAL_STEPS));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/objednat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const json = await res.json();
        setSubmitError(json.error || 'Nastala chyba. Zkuste to znovu.');
      }
    } catch {
      setSubmitError('Nastala síťová chyba. Zkuste to znovu nebo nás kontaktujte přímo.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-full bg-[#6C63FF]/15 border-2 border-[#6C63FF]/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-[#6C63FF]" />
        </div>
        <h2 className="text-3xl font-black text-white mb-3">Objednávka odeslána!</h2>
        <p className="text-[#A0A0C0] text-lg mb-8 max-w-md mx-auto">
          Děkujeme, {data.name.split(' ')[0]}. Ozveme se vám do 24 hodin na{' '}
          <span className="text-[#8B85FF]">{data.email}</span>.
        </p>
        <div className="glass-card rounded-2xl p-6 max-w-sm mx-auto text-left mb-8">
          <div className="text-sm text-[#6B6B8A] mb-3 font-semibold">Shrnutí objednávky</div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6B6B8A]">Jméno:</span>
              <span className="text-white">{data.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B6B8A]">Email:</span>
              <span className="text-white">{data.email}</span>
            </div>
            {data.selectedPackage && (
              <div className="flex justify-between">
                <span className="text-[#6B6B8A]">Balíček:</span>
                <span className="text-[#8B85FF] font-semibold uppercase">{data.selectedPackage}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#6B6B8A]">Dodání:</span>
              <span className="text-white">{data.delivery === 'expres' ? 'Expresní (do 3 dnů)' : 'Standardní (do 7 dnů)'}</span>
            </div>
          </div>
        </div>
        <a href="/" className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm">
          Zpět na hlavní stránku
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator current={step} total={TOTAL_STEPS} />
      <ProgressBar step={step} />

      <div className="glass-card rounded-2xl p-6 md:p-8 min-h-[400px] flex flex-col">
        <h2 className="text-2xl font-bold text-white mb-6">{stepTitles[step - 1]}</h2>

        <div className="flex-1">
          {/* STEP 1 — Kontakt */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-[#C9C9E0] mb-1.5">Jméno a příjmení *</label>
                <input
                  className={cn('input-field', errors.name && 'border-red-500/50')}
                  placeholder="Jan Novák"
                  value={data.name}
                  onChange={(e) => update('name', e.target.value)}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#C9C9E0] mb-1.5">Firma / Název projektu</label>
                <input
                  className="input-field"
                  placeholder="Novák s.r.o."
                  value={data.company}
                  onChange={(e) => update('company', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#C9C9E0] mb-1.5">E-mail *</label>
                <input
                  className={cn('input-field', errors.email && 'border-red-500/50')}
                  type="email"
                  placeholder="jan@firma.cz"
                  value={data.email}
                  onChange={(e) => update('email', e.target.value)}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#C9C9E0] mb-1.5">Telefon *</label>
                <input
                  className={cn('input-field', errors.phone && 'border-red-500/50')}
                  type="tel"
                  placeholder="+420 777 734 389"
                  value={data.phone}
                  onChange={(e) => update('phone', e.target.value)}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          )}

          {/* STEP 2 — Podnikání */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-[#C9C9E0] mb-1.5">Obor podnikání *</label>
                <input
                  className={cn('input-field', errors.industry && 'border-red-500/50')}
                  placeholder="Řemeslné práce, kosmetika, účetnictví..."
                  value={data.industry}
                  onChange={(e) => update('industry', e.target.value)}
                />
                {errors.industry && <p className="text-red-400 text-xs mt-1">{errors.industry}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#C9C9E0] mb-1.5">Lokalita *</label>
                <input
                  className={cn('input-field', errors.location && 'border-red-500/50')}
                  placeholder="Praha, Brno, celá ČR..."
                  value={data.location}
                  onChange={(e) => update('location', e.target.value)}
                />
                {errors.location && <p className="text-red-400 text-xs mt-1">{errors.location}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#C9C9E0] mb-1.5">Krátký popis podnikání</label>
                <textarea
                  className="input-field resize-none h-28"
                  placeholder="Čím se zabýváte, kdo jsou vaši zákazníci, co je vaše výhoda..."
                  value={data.businessDescription}
                  onChange={(e) => update('businessDescription', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 3 — Cíl */}
          {step === 3 && (
            <div>
              <p className="text-[#A0A0C0] text-sm mb-4">Vyberte vše, co platí (může být více možností)</p>
              <CheckboxGroup
                options={goalOptions}
                selected={data.goals}
                onChange={(v) => update('goals', v)}
              />
              {errors.goals && <p className="text-red-400 text-xs mt-2">{errors.goals}</p>}
            </div>
          )}

          {/* STEP 4 — Rozsah */}
          {step === 4 && (
            <div>
              <p className="text-[#A0A0C0] text-sm mb-4">Jaký typ webu potřebujete?</p>
              <RadioGroup
                options={websiteTypes}
                value={data.websiteType as 'prezentace' | 'firemni' | 'eshop' | 'landing'}
                onChange={(v) => update('websiteType', v)}
              />
              {errors.websiteType && <p className="text-red-400 text-xs mt-2">{errors.websiteType}</p>}
            </div>
          )}

          {/* STEP 5 — Sekce */}
          {step === 5 && (
            <div>
              <p className="text-[#A0A0C0] text-sm mb-4">Které sekce chcete na webu mít?</p>
              <CheckboxGroup
                options={sectionOptions}
                selected={data.sections}
                onChange={(v) => update('sections', v)}
              />
            </div>
          )}

          {/* STEP 6 — Obsah */}
          {step === 6 && (
            <div className="flex flex-col gap-5">
              <YesNoGroup
                question="Máte logo / vizuální identitu?"
                value={data.hasLogo}
                onChange={(v) => update('hasLogo', v)}
              />
              <YesNoGroup
                question="Máte připravené texty pro web?"
                value={data.hasTexts}
                onChange={(v) => update('hasTexts', v)}
              />
              <YesNoGroup
                question="Máte fotografie / obrázky?"
                value={data.hasPhotos}
                onChange={(v) => update('hasPhotos', v)}
              />
            </div>
          )}

          {/* STEP 7 — Design */}
          {step === 7 && (
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-[#A0A0C0] text-sm mb-4">Jaký designový styl preferujete?</p>
                <RadioGroup
                  options={designStyles}
                  value={data.designStyle as 'minimalistic' | 'modern' | 'friendly' | 'classic'}
                  onChange={(v) => update('designStyle', v)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#C9C9E0] mb-1.5">
                  Inspirace — weby, které se vám líbí (URL nebo popis)
                </label>
                <textarea
                  className="input-field resize-none h-24"
                  placeholder="např. apple.com, weby ve vašem oboru..."
                  value={data.designInspiration}
                  onChange={(e) => update('designInspiration', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 8 — Marketing */}
          {step === 8 && (
            <div className="flex flex-col gap-5">
              <YesNoGroup
                question="Máte zájem o SEO optimalizaci?"
                value={data.seoInterest}
                onChange={(v) => update('seoInterest', v)}
              />
              <YesNoGroup
                question="Máte zájem o PPC reklamu (Google Ads, Facebook)?"
                value={data.ppcInterest}
                onChange={(v) => update('ppcInterest', v)}
              />
              <YesNoGroup
                question="Máte zájem o správu webu po spuštění?"
                value={data.managementInterest}
                onChange={(v) => update('managementInterest', v)}
              />
            </div>
          )}

          {/* STEP 9 — Termín a balíček */}
          {step === 9 && (
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[#A0A0C0] text-sm mb-4">Preferovaný termín dodání</p>
                <RadioGroup
                  options={[
                    { id: 'standard', label: 'Standardní — do 7 dnů', desc: 'Zahrnuté v ceně balíčku' },
                    { id: 'expres', label: 'Expresní — do 3 dnů', desc: 'Příplatek +40 % z ceny' },
                  ]}
                  value={data.delivery as 'standard' | 'expres'}
                  onChange={(v) => update('delivery', v)}
                />
              </div>
              <div>
                <p className="text-[#A0A0C0] text-sm mb-4">Preferovaný balíček (nepovinné)</p>
                <RadioGroup
                  options={[
                    { id: 'start', label: 'START', desc: 'od 24 900 Kč' },
                    { id: 'business', label: 'BUSINESS', desc: 'od 39 900 Kč' },
                    { id: 'pro', label: 'PRO', desc: 'od 64 900 Kč' },
                    { id: 'nevim', label: 'Nevím / poraďte mi', desc: 'Vybereme společně' },
                  ]}
                  value={data.selectedPackage as 'start' | 'business' | 'pro' | 'nevim'}
                  onChange={(v) => update('selectedPackage', v)}
                />
              </div>
            </div>
          )}

          {/* STEP 10 — Poznámka + Shrnutí */}
          {step === 10 && (
            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-[#C9C9E0] mb-1.5">Doplňující informace</label>
                <textarea
                  className="input-field resize-none h-28"
                  placeholder="Cokoli dalšího, co chcete sdělit..."
                  value={data.note}
                  onChange={(e) => update('note', e.target.value)}
                />
              </div>

              {/* Summary */}
              <div className="glass-card rounded-xl p-5">
                <div className="text-sm font-semibold text-[#6B6B8A] mb-3">Shrnutí objednávky</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-[#6B6B8A]">Jméno:</span>
                  <span className="text-white">{data.name}</span>
                  <span className="text-[#6B6B8A]">Email:</span>
                  <span className="text-white">{data.email}</span>
                  <span className="text-[#6B6B8A]">Telefon:</span>
                  <span className="text-white">{data.phone}</span>
                  <span className="text-[#6B6B8A]">Obor:</span>
                  <span className="text-white">{data.industry || '—'}</span>
                  <span className="text-[#6B6B8A]">Typ webu:</span>
                  <span className="text-white capitalize">{data.websiteType || '—'}</span>
                  <span className="text-[#6B6B8A]">Balíček:</span>
                  <span className="text-[#8B85FF] font-semibold uppercase">{data.selectedPackage || '—'}</span>
                  <span className="text-[#6B6B8A]">Dodání:</span>
                  <span className="text-white">{data.delivery === 'expres' ? 'Expresní' : 'Standardní'}</span>
                </div>
              </div>

              {submitError && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{submitError}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all',
              step === 1
                ? 'opacity-0 pointer-events-none'
                : 'btn-secondary'
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            Zpět
          </button>

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm"
            >
              Další
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Odesílám...
                </>
              ) : (
                <>
                  Odeslat objednávku
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
