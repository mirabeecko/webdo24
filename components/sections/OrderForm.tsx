'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { OrderFormData } from '@/types';
import { Loader2, Check, ChevronRight, Zap } from 'lucide-react';

// ─── Konstanty ────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  'Řemesla a stavebnictví',
  'Gastronomie a pohostinství',
  'Zdraví a krása',
  'Obchod a maloobchod',
  'Vzdělávání a kurzy',
  'Finance a pojištění',
  'IT a technologie',
  'Doprava a logistika',
  'Reality a bydlení',
  'Sport a fitness',
  'Kultura a zábava',
  'Jiný obor',
];

const GOALS = [
  { id: 'leads',        label: 'Získat poptávky',    desc: 'Formuláře, volání, kontakty' },
  { id: 'presentation', label: 'Prezentace firmy',   desc: 'Portfolio, o nás, reference' },
  { id: 'sales',        label: 'Prodávat online',    desc: 'E-shop nebo přímý prodej' },
];

const TONES = [
  { id: 'professional', label: 'Profesionální', desc: 'Seriózní, důvěryhodný' },
  { id: 'modern',       label: 'Moderní',       desc: 'Svěží, aktuální, dynamický' },
  { id: 'aggressive',   label: 'Agresivní',     desc: 'Razantní, přímý, prodejní' },
  { id: 'luxury',       label: 'Luxusní',       desc: 'Prémiový, sofistikovaný' },
];

const STEPS = [
  { id: 1, title: 'Firma' },
  { id: 2, title: 'Byznys' },
  { id: 3, title: 'Cíl' },
  { id: 4, title: 'Styl' },
  { id: 5, title: 'Kontakt' },
];

const INITIAL: OrderFormData = {
  // kontakt
  name: '',
  email: '',
  phone: '',
  company: '',
  // byznys
  whatYouDo: '',
  targetAudience: '',
  competitiveAdvantage: '',
  // cíl
  websiteGoals: [],
  mainCta: '',
  // struktura (zachováno pro API)
  sections: ['hero', 'services', 'contact'],
  customSections: '',
  // obsah
  hasTexts: '',
  hasPhotos: '',
  hasLogo: '',
  contentLinks: '',
  // design
  designStyle: '',
  colorPreference: '',
  customColors: '',
  designInspiration: '',
  // technické
  hasDomain: '',
  domainName: '',
  language: ['cs'],
  contactEmail: '',
  contactPhone: '',
  contactAddress: '',
  // instrukce
  mustHave: '',
  mustNotHave: '',
  // interní
  selectedPackage: 'pro',
  // nová pole
  industry: '',
  location: '',
  service1: '',
  service2: '',
  service3: '',
  reference: '',
  tone: '',
  note: '',
};

// ─── Validace ─────────────────────────────────────────────────────────────────

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function canProceed(step: number, form: OrderFormData): boolean {
  switch (step) {
    case 1: return !!(form.company.trim() && form.industry);
    case 2: return !!(form.whatYouDo.trim() && form.service1?.trim() && form.targetAudience.trim());
    case 3: return form.websiteGoals.length > 0;
    case 4: return !!(form.tone && form.hasTexts);
    case 5: return !!(form.name.trim() && isEmailValid(form.email));
    default: return true;
  }
}

// ─── Hlavní komponenta ────────────────────────────────────────────────────────

export default function OrderForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<OrderFormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  const set = (key: keyof OrderFormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleNext = () => {
    if (!canProceed(step, form)) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setShowErrors(false);
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    if (!canProceed(5, form)) {
      setShowErrors(true);
      return;
    }
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
      if (data.checkoutUrl) window.location.href = data.checkoutUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Chyba serveru. Zkuste to znovu.');
    } finally {
      setLoading(false);
    }
  };

  const validationError = showErrors && !canProceed(step, form);

  return (
    <div id="orderForm" className="max-w-2xl mx-auto xl:max-w-none">

      {/* ── Progress ─────────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center mb-3">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 min-w-0">
              <button
                onClick={() => step > s.id && setStep(s.id)}
                title={s.title}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all flex-shrink-0',
                  step === s.id
                    ? 'bg-[#00C47A] text-[#050A08] shadow-[0_0_20px_rgba(0,196,122,0.4)]'
                    : step > s.id
                    ? 'bg-[#00C47A]/20 text-[#00C47A] cursor-pointer hover:bg-[#00C47A]/30'
                    : 'bg-white/5 text-[#404040] cursor-default',
                )}
              >
                {step > s.id ? <Check className="w-3.5 h-3.5" /> : s.id}
              </button>
              {i < STEPS.length - 1 && (
                <div className={cn('flex-1 h-px transition-all mx-1', step > s.id ? 'bg-[#00C47A]/40' : 'bg-white/5')} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between px-0.5">
          {STEPS.map((s) => (
            <span
              key={s.id}
              className={cn(
                'text-xs transition-colors',
                step === s.id ? 'text-[#00C47A]' : step > s.id ? 'text-[#00C47A]/50' : 'text-[#404040]',
              )}
            >
              {s.title}
            </span>
          ))}
        </div>
      </div>

      <div className="glass-card p-8">

        {/* ── Krok 1: Firma ────────────────────────────────────────────────── */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Vaše firma</h2>
            <p className="text-[#606060] text-sm mb-8">Základní informace o vašem podnikání.</p>
            <div className="space-y-5">
              <Field
                label="Název firmy / projektu *"
                name="companyName"
                value={form.company}
                onChange={(v) => set('company', v)}
                placeholder="Novák Řemesla s.r.o. nebo Kavárna U Mostu"
                error={showErrors && !form.company.trim()}
              />
              <div>
                <label className="block text-sm font-semibold text-[#C0C0C0] mb-2">Obor *</label>
                <select
                  name="industry"
                  value={form.industry ?? ''}
                  onChange={(e) => set('industry', e.target.value)}
                  className={cn(
                    'w-full bg-white/5 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors appearance-none cursor-pointer',
                    !form.industry ? 'text-[#404040]' : 'text-white',
                    showErrors && !form.industry
                      ? 'border-red-500/50 focus:border-red-500/70'
                      : 'border-white/10 focus:border-[#00C47A]/60',
                  )}
                >
                  <option value="" disabled className="bg-[#0A0F0D]">Vyberte obor…</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind} className="bg-[#0A0F0D] text-white">{ind}</option>
                  ))}
                </select>
                {showErrors && !form.industry && (
                  <p className="text-red-400 text-xs mt-1.5">Vyberte obor.</p>
                )}
              </div>
              <Field
                label="Lokalita / kde působíte"
                name="location"
                value={form.location ?? ''}
                onChange={(v) => set('location', v)}
                placeholder="Praha, celá ČR, nebo online"
              />
            </div>
          </div>
        )}

        {/* ── Krok 2: Byznys ───────────────────────────────────────────────── */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">O vašem byznysu</h2>
            <p className="text-[#606060] text-sm mb-8">Čím lepší odpovědi, tím lepší web. Pište konkrétně.</p>
            <div className="space-y-5">
              <TextareaField
                label="Co přesně děláte? *"
                name="whatYouDo"
                value={form.whatYouDo}
                onChange={(v) => set('whatYouDo', v)}
                placeholder="Příklad: Instalujeme a opravujeme klimatizace pro domácnosti a firmy v Praze. Nabízíme servis, montáž i pravidelnou údržbu."
                rows={3}
                error={showErrors && !form.whatYouDo.trim()}
              />
              <div>
                <label className="block text-sm font-semibold text-[#C0C0C0] mb-1">
                  Hlavní služby / produkty *
                </label>
                <p className="text-[#505050] text-xs mb-3">Vypište až 3 hlavní položky.</p>
                <div className="space-y-2">
                  <input
                    type="text"
                    name="service1"
                    value={form.service1 ?? ''}
                    onChange={(e) => set('service1', e.target.value)}
                    placeholder="Služba č. 1 (povinné)"
                    className={cn(
                      'w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#404040] focus:outline-none transition-colors',
                      showErrors && !form.service1?.trim()
                        ? 'border-red-500/50 focus:border-red-500/70'
                        : 'border-white/10 focus:border-[#00C47A]/60',
                    )}
                  />
                  <input
                    type="text"
                    name="service2"
                    value={form.service2 ?? ''}
                    onChange={(e) => set('service2', e.target.value)}
                    placeholder="Služba č. 2 (volitelné)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#404040] focus:outline-none focus:border-[#00C47A]/60 transition-colors"
                  />
                  <input
                    type="text"
                    name="service3"
                    value={form.service3 ?? ''}
                    onChange={(e) => set('service3', e.target.value)}
                    placeholder="Služba č. 3 (volitelné)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#404040] focus:outline-none focus:border-[#00C47A]/60 transition-colors"
                  />
                </div>
              </div>
              <TextareaField
                label="Kdo jsou vaši zákazníci? *"
                name="targetAudience"
                value={form.targetAudience}
                onChange={(v) => set('targetAudience', v)}
                placeholder="Příklad: Majitelé bytů a rodinných domů 30–55 let v Praze a okolí."
                rows={2}
                error={showErrors && !form.targetAudience.trim()}
              />
            </div>
          </div>
        )}

        {/* ── Krok 3: Cíl webu ─────────────────────────────────────────────── */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Co má web dělat?</h2>
            <p className="text-[#606060] text-sm mb-8">Vyberte hlavní cíl.</p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#C0C0C0] mb-3">Cíl webu *</label>
                <div className="grid grid-cols-1 gap-3">
                  {GOALS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      name="goal"
                      onClick={() => setForm((f) => ({ ...f, websiteGoals: [g.id] }))}
                      className={cn(
                        'p-4 rounded-xl border text-left transition-all flex items-center gap-4',
                        form.websiteGoals.includes(g.id)
                          ? 'border-[#00C47A] bg-[rgba(0,196,122,0.06)]'
                          : showErrors && form.websiteGoals.length === 0
                          ? 'border-red-500/20 bg-white/3 hover:border-white/15'
                          : 'border-white/8 bg-white/3 hover:border-white/15',
                      )}
                    >
                      <span
                        className={cn(
                          'w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all flex items-center justify-center',
                          form.websiteGoals.includes(g.id)
                            ? 'border-[#00C47A] bg-[#00C47A]'
                            : 'border-white/20',
                        )}
                      >
                        {form.websiteGoals.includes(g.id) && <Check className="w-2.5 h-2.5 text-[#050A08]" />}
                      </span>
                      <div>
                        <div className="font-semibold text-white text-sm">{g.label}</div>
                        <div className="text-[#606060] text-xs mt-0.5">{g.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                {showErrors && form.websiteGoals.length === 0 && (
                  <p className="text-red-400 text-xs mt-2">Vyberte cíl webu.</p>
                )}
              </div>
              <Field
                label="Reference / konkurence (URL nebo popis)"
                name="reference"
                value={form.reference ?? ''}
                onChange={(v) => set('reference', v)}
                placeholder="https://konkurent.cz nebo: chci web jako Apple - cist&#253;, pr&#233;miov&#253;"
              />
            </div>
          </div>
        )}

        {/* ── Krok 4: Styl komunikace ───────────────────────────────────────── */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Styl komunikace</h2>
            <p className="text-[#606060] text-sm mb-8">Jak má web mluvit na zákazníky?</p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#C0C0C0] mb-3">Tón komunikace *</label>
                <div className="grid grid-cols-2 gap-3">
                  {TONES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      name="tone"
                      onClick={() => set('tone', t.id)}
                      className={cn(
                        'p-4 rounded-xl border text-left transition-all',
                        form.tone === t.id
                          ? 'border-[#00C47A] bg-[rgba(0,196,122,0.06)]'
                          : showErrors && !form.tone
                          ? 'border-red-500/20 bg-white/3 hover:border-white/15'
                          : 'border-white/8 bg-white/3 hover:border-white/15',
                      )}
                    >
                      <div className="font-semibold text-white text-sm">{t.label}</div>
                      <div className="text-[#606060] text-xs mt-0.5">{t.desc}</div>
                    </button>
                  ))}
                </div>
                {showErrors && !form.tone && (
                  <p className="text-red-400 text-xs mt-2">Vyberte tón komunikace.</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#C0C0C0] mb-1">
                  Máte texty o firmě? *
                </label>
                <p className="text-[#505050] text-xs mb-3">Pokud ne, napíšeme je za vás.</p>
                <div className="flex gap-3">
                  {(['yes', 'no'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      name="hasTexts"
                      onClick={() => set('hasTexts', opt)}
                      className={cn(
                        'flex-1 py-3 rounded-xl border text-sm font-medium transition-all',
                        form.hasTexts === opt
                          ? 'border-[#00C47A] bg-[rgba(0,196,122,0.06)] text-white'
                          : showErrors && !form.hasTexts
                          ? 'border-red-500/40 bg-white/3 text-[#808080]'
                          : 'border-white/8 bg-white/3 text-[#808080] hover:border-white/15',
                      )}
                    >
                      {opt === 'yes' ? 'Ano, mám texty' : 'Ne, potřebuji pomoct'}
                    </button>
                  ))}
                </div>
                {showErrors && !form.hasTexts && (
                  <p className="text-red-400 text-xs mt-2">Vyberte možnost.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Krok 5: Kontakt + odeslání ────────────────────────────────────── */}
        {step === 5 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Kontaktní údaje</h2>
            <p className="text-[#606060] text-sm mb-8">Jak vás kontaktovat ohledně webu.</p>
            <div className="space-y-4">
              <Field
                label="Jméno a příjmení *"
                name="name"
                value={form.name}
                onChange={(v) => set('name', v)}
                placeholder="Jan Novák"
                error={showErrors && !form.name.trim()}
              />
              <Field
                label="E-mail *"
                name="email"
                type="email"
                value={form.email}
                onChange={(v) => set('email', v)}
                placeholder="jan@firma.cz"
                error={showErrors && !isEmailValid(form.email)}
              />
              <Field
                label="Telefon"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(v) => set('phone', v)}
                placeholder="+420 777 000 000"
              />
              <TextareaField
                label="Poznámka (volitelné)"
                name="note"
                value={form.note ?? ''}
                onChange={(v) => set('note', v)}
                placeholder="Cokoliv dalšího, co chcete sdělit…"
                rows={3}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mt-6">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="accent-border rounded-xl p-5 mt-6 mb-4 flex items-center justify-between">
              <div>
                <div className="text-white font-black text-lg">Profesionální web na klíč</div>
                <div className="text-[#606060] text-sm mt-0.5">Hosting a texty v ceně · Web do 24 h</div>
              </div>
              <div className="text-[#00C47A] font-black text-2xl">9 900 Kč</div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2.5 py-4 text-base font-black disabled:opacity-60"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" />Zpracovávám…</>
              ) : (
                <><Zap className="w-5 h-5" />Zaplatit a spustit výrobu<ChevronRight className="w-5 h-5" /></>
              )}
            </button>
            <p className="text-center text-[#404040] text-xs mt-3">
              Budete přesměrováni na bezpečnou platební bránu. Žádné údaje o kartě neukládáme.
            </p>
          </div>
        )}

        {/* ── Validační chyba ───────────────────────────────────────────────── */}
        {validationError && (
          <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            <p className="text-red-400 text-sm">Vyplňte prosím všechna povinná pole (*) před pokračováním.</p>
          </div>
        )}

        {/* ── Navigace ─────────────────────────────────────────────────────── */}
        <div className={cn('flex gap-3 mt-8', step === 1 ? 'justify-end' : 'justify-between')}>
          {step > 1 && (
            <button onClick={handleBack} className="btn-secondary px-6 py-3 text-sm">
              ← {step === 5 ? 'Upravit' : 'Zpět'}
            </button>
          )}
          {step < 5 && (
            <button
              onClick={handleNext}
              className="btn-primary flex items-center gap-2 px-7 py-3 text-sm font-bold"
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
      <p className="text-center text-[#404040] text-xs mt-2">
        Chcete se před objednávkou poradit? Napište na info@webdo24.cz.
      </p>
    </div>
  );
}

// ─── Pomocné komponenty ───────────────────────────────────────────────────────

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  error = false,
  className = '',
}: {
  label: string;
  name?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-[#C0C0C0] mb-2">{label}</label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#404040] focus:outline-none transition-colors',
          error ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/10 focus:border-[#00C47A]/60',
        )}
      />
    </div>
  );
}

function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 3,
  error = false,
}: {
  label: string;
  name?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  error?: boolean;
}) {
  return (
    <div>
      {label && <label className="block text-sm font-semibold text-[#C0C0C0] mb-2">{label}</label>}
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          'w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#404040] focus:outline-none transition-colors resize-none',
          error ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/10 focus:border-[#00C47A]/60',
        )}
      />
    </div>
  );
}
