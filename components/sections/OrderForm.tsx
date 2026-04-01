'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { generateBrief } from '@/lib/brief';
import type { OrderFormData } from '@/types';
import {
  Loader2,
  Check,
  ChevronRight,
  Zap,
  Copy,
  CheckCheck,
} from 'lucide-react';

// ─── Konstanty ────────────────────────────────────────────────────────────────

const WEBSITE_GOALS = [
  { id: 'leads',        label: 'Získávat poptávky',   desc: 'Formuláře, volání, kontakty' },
  { id: 'sales',        label: 'Prodávat produkt',    desc: 'E-shop nebo přímý prodej' },
  { id: 'booking',      label: 'Online rezervace',    desc: 'Termíny, schůzky, rezervace' },
  { id: 'presentation', label: 'Prezentace firmy',    desc: 'Portfolio, about us' },
];

const SECTIONS = [
  { id: 'hero',       label: 'Úvod / Hero',     desc: 'Hlavní banner s CTA' },
  { id: 'services',   label: 'Služby',          desc: 'Co nabízíte' },
  { id: 'about',      label: 'O nás',           desc: 'Příběh a tým' },
  { id: 'references', label: 'Reference',       desc: 'Hodnocení zákazníků' },
  { id: 'pricing',    label: 'Ceník',           desc: 'Přehled cen' },
  { id: 'gallery',    label: 'Galerie',         desc: 'Fotografie prací' },
  { id: 'contact',    label: 'Kontakt',         desc: 'Formulář a mapa' },
  { id: 'faq',        label: 'FAQ',             desc: 'Časté otázky' },
];

const DESIGN_STYLES = [
  { id: 'modern',    label: 'Moderní',      desc: 'Čistý, vzdušný, aktuální' },
  { id: 'luxury',    label: 'Luxusní',      desc: 'Prémiový, sofistikovaný' },
  { id: 'minimal',   label: 'Jednoduchý',   desc: 'Minimalistický, přehledný' },
  { id: 'playful',   label: 'Hravý',        desc: 'Kreativní, originální' },
  { id: 'corporate', label: 'Korporátní',   desc: 'Profesionální, důvěryhodný' },
];

const COLOR_PALETTES = [
  { id: 'green-white',   label: 'Zelená & bílá',      a: '#00C47A', b: '#FFFFFF' },
  { id: 'blue-white',    label: 'Modrá & bílá',        a: '#2563EB', b: '#FFFFFF' },
  { id: 'dark-gold',     label: 'Tmavá & zlatá',       a: '#111827', b: '#F59E0B' },
  { id: 'orange-dark',   label: 'Oranžová & tmavá',    a: '#F97316', b: '#1C1917' },
  { id: 'red-white',     label: 'Červená & bílá',      a: '#EF4444', b: '#FFFFFF' },
  { id: 'purple-white',  label: 'Fialová & bílá',      a: '#8B5CF6', b: '#FFFFFF' },
  { id: 'neutral-dark',  label: 'Neutrální & tmavá',   a: '#9CA3AF', b: '#111827' },
  { id: 'custom',        label: 'Vlastní barvy',        a: null,      b: null },
];

const STEPS = [
  { id: 1, title: 'Kontakt' },
  { id: 2, title: 'Byznys' },
  { id: 3, title: 'Cíl webu' },
  { id: 4, title: 'Struktura' },
  { id: 5, title: 'Obsah' },
  { id: 6, title: 'Design' },
  { id: 7, title: 'Technické' },
  { id: 8, title: 'Instrukce' },
  { id: 9, title: 'Přehled' },
];

const INITIAL: OrderFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  whatYouDo: '',
  targetAudience: '',
  competitiveAdvantage: '',
  websiteGoals: [],
  mainCta: '',
  sections: ['hero', 'services', 'contact'],
  customSections: '',
  hasTexts: '',
  hasPhotos: '',
  hasLogo: '',
  contentLinks: '',
  designStyle: '',
  colorPreference: '',
  customColors: '',
  designInspiration: '',
  hasDomain: '',
  domainName: '',
  language: ['cs'],
  contactEmail: '',
  contactPhone: '',
  contactAddress: '',
  mustHave: '',
  mustNotHave: '',
  selectedPackage: 'pro',
};

// ─── Validace kroků ───────────────────────────────────────────────────────────

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function canProceed(step: number, form: OrderFormData): boolean {
  switch (step) {
    case 1: return !!(form.name.trim() && isEmailValid(form.email) && form.phone.trim() && form.company.trim());
    case 2: return !!(form.whatYouDo.trim() && form.targetAudience.trim());
    case 3: return form.websiteGoals.length > 0 && !!form.mainCta.trim();
    case 4: return form.sections.length > 0;
    case 5: return !!(form.hasTexts && form.hasPhotos && form.hasLogo);
    case 6: return !!form.designStyle;
    case 7: return !!(form.hasDomain && form.language.length > 0 && (form.contactEmail || form.email).trim());
    case 8: return true;
    case 9: return true;
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
  const [copied, setCopied] = useState(false);

  const set = (key: keyof OrderFormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleArray = (key: 'websiteGoals' | 'sections' | 'language', value: string) => {
    setForm((f) => {
      const arr = f[key] as string[];
      return {
        ...f,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

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

  const brief = step === 9 ? generateBrief(form) : '';

  const copyBrief = async () => {
    await navigator.clipboard.writeText(brief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validationError = showErrors && !canProceed(step, form);

  return (
    <div className="max-w-2xl mx-auto xl:max-w-none">
      {/* Progress */}
      <div className="flex items-center gap-0 mb-10 overflow-x-auto pb-1">
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

      <div className="glass-card p-8">

        {/* ── Krok 1: Kontakt ──────────────────────────────────────────────── */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Kontaktní údaje</h2>
            <p className="text-[#606060] text-sm mb-8">Jak vás kontaktovat a kdo stojí za projektem.</p>
            <div className="space-y-4">
              <Field label="Jméno a příjmení *" value={form.name} onChange={(v) => set('name', v)} placeholder="Jan Novák" error={showErrors && !form.name.trim()} />
              <Field label="Název firmy / projektu *" value={form.company} onChange={(v) => set('company', v)} placeholder="Novák Řemesla s.r.o. nebo Kavárna U Mostu" error={showErrors && !form.company.trim()} />
              <Field label="E-mail *" type="email" value={form.email} onChange={(v) => set('email', v)} placeholder="jan@firma.cz" error={showErrors && !isEmailValid(form.email)} />
              <Field label="Telefon *" type="tel" value={form.phone} onChange={(v) => set('phone', v)} placeholder="+420 777 000 000" error={showErrors && !form.phone.trim()} />
            </div>
          </div>
        )}

        {/* ── Krok 2: O podnikání ──────────────────────────────────────────── */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">O vašem byznysu</h2>
            <p className="text-[#606060] text-sm mb-8">Čím lepší odpovědi, tím lepší web. Pište konkrétně.</p>
            <div className="space-y-5">
              <TextareaField
                label="Co přesně děláte? *"
                value={form.whatYouDo}
                onChange={(v) => set('whatYouDo', v)}
                placeholder="Příklad: Opravujeme a instalujeme klimatizace pro domácnosti a firmy v Praze a Středočeském kraji. Nabízíme servis, montáž i pravidelnou údržbu."
                rows={3}
                error={showErrors && !form.whatYouDo.trim()}
              />
              <TextareaField
                label="Kdo jsou vaši zákazníci? *"
                value={form.targetAudience}
                onChange={(v) => set('targetAudience', v)}
                placeholder="Příklad: Majitelé bytů a rodinných domů 30–55 let, správci komerčních nemovitostí, drobní podnikatelé v Praze."
                rows={3}
                error={showErrors && !form.targetAudience.trim()}
              />
              <TextareaField
                label="Proč si zákazníci vybírají vás a ne konkurenci?"
                value={form.competitiveAdvantage}
                onChange={(v) => set('competitiveAdvantage', v)}
                placeholder="Příklad: Příjezd do 2 hodin, 5 let záruka na práci, pevná cena bez skrytých poplatků, dostupní i o víkendu."
                rows={3}
              />
            </div>
          </div>
        )}

        {/* ── Krok 3: Cíl webu ─────────────────────────────────────────────── */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Co má web dělat?</h2>
            <p className="text-[#606060] text-sm mb-8">Vyberte jeden nebo více cílů. Čím jasněji, tím lépe.</p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#C0C0C0] mb-3">Primární cíl webu * <span className="text-[#505050] font-normal">(lze vybrat více)</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {WEBSITE_GOALS.map((g) => (
                    <CheckCard
                      key={g.id}
                      label={g.label}
                      desc={g.desc}
                      selected={form.websiteGoals.includes(g.id)}
                      onClick={() => toggleArray('websiteGoals', g.id)}
                    />
                  ))}
                </div>
                {showErrors && form.websiteGoals.length === 0 && (
                  <p className="text-red-400 text-xs mt-2">Vyberte alespoň jeden cíl.</p>
                )}
              </div>
              <Field
                label="Hlavní CTA — co má zákazník udělat? *"
                value={form.mainCta}
                onChange={(v) => set('mainCta', v)}
                placeholder="Příklad: Nezávazná poptávka, Objednat termín, Stáhnout ceník, Zavolat nyní"
                error={showErrors && !form.mainCta.trim()}
              />
            </div>
          </div>
        )}

        {/* ── Krok 4: Struktura ────────────────────────────────────────────── */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Struktura webu</h2>
            <p className="text-[#606060] text-sm mb-8">Které sekce má web obsahovat? Předvybrali jsme základ — upravte podle potřeby.</p>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#C0C0C0] mb-3">Sekce webu * <span className="text-[#505050] font-normal">(vyberte vše, co chcete)</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {SECTIONS.map((s) => (
                    <CheckCard
                      key={s.id}
                      label={s.label}
                      desc={s.desc}
                      selected={form.sections.includes(s.id)}
                      onClick={() => toggleArray('sections', s.id)}
                      compact
                    />
                  ))}
                </div>
                {showErrors && form.sections.length === 0 && (
                  <p className="text-red-400 text-xs mt-2">Vyberte alespoň jednu sekci.</p>
                )}
              </div>
              <TextareaField
                label="Vlastní sekce nebo stránky"
                value={form.customSections}
                onChange={(v) => set('customSections', v)}
                placeholder="Příklad: Blog, E-shop, Kalkulačka ceny, Mapa poboček, Stránka pro partnery…"
                rows={2}
              />
            </div>
          </div>
        )}

        {/* ── Krok 5: Obsah ────────────────────────────────────────────────── */}
        {step === 5 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Připravené podklady</h2>
            <p className="text-[#606060] text-sm mb-8">Co máte, co dodáme my. Upřímná odpověď = lepší plánování.</p>
            <div className="space-y-5">
              {([
                { key: 'hasTexts' as const,  label: 'Texty o firmě a službách',       hint: 'Pokud ne, napíšeme je za vás.' },
                { key: 'hasPhotos' as const, label: 'Fotografie (produkty, prostory)', hint: 'Pokud ne, použijeme stock nebo AI.' },
                { key: 'hasLogo' as const,   label: 'Logo',                            hint: 'Pokud ne, navrhneme textové logo.' },
              ] as const).map(({ key, label, hint }) => (
                <div key={key}>
                  <label className="block text-sm font-semibold text-[#C0C0C0] mb-1">{label}</label>
                  <p className="text-[#505050] text-xs mb-2">{hint}</p>
                  <div className="flex gap-3">
                    {(['yes', 'no'] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => set(key, opt)}
                        className={cn(
                          'flex-1 py-3 rounded-xl border text-sm font-medium transition-all',
                          form[key] === opt
                            ? 'border-[#00C47A] bg-[rgba(0,196,122,0.06)] text-white'
                            : showErrors && !form[key]
                            ? 'border-red-500/40 bg-white/3 text-[#808080] hover:border-red-500/60'
                            : 'border-white/8 bg-white/3 text-[#808080] hover:border-white/15',
                        )}
                      >
                        {opt === 'yes' ? 'Ano, mám' : 'Ne, potřebuji pomoct'}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <Field
                label="Odkaz na existující podklady, Disk, web (volitelné)"
                value={form.contentLinks}
                onChange={(v) => set('contentLinks', v)}
                placeholder="https://drive.google.com/... nebo https://existujici-web.cz"
              />
            </div>
          </div>
        )}

        {/* ── Krok 6: Design ───────────────────────────────────────────────── */}
        {step === 6 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Vizuální styl</h2>
            <p className="text-[#606060] text-sm mb-8">Jak má web působit na návštěvníky?</p>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#C0C0C0] mb-3">Styl webu *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {DESIGN_STYLES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => set('designStyle', s.id)}
                      className={cn(
                        'p-4 rounded-xl border text-left transition-all',
                        form.designStyle === s.id
                          ? 'border-[#00C47A] bg-[rgba(0,196,122,0.06)]'
                          : showErrors && !form.designStyle
                          ? 'border-red-500/20 bg-white/3 hover:border-white/15'
                          : 'border-white/8 bg-white/3 hover:border-white/15',
                      )}
                    >
                      <div className="font-semibold text-white text-sm">{s.label}</div>
                      <div className="text-[#606060] text-xs mt-0.5">{s.desc}</div>
                    </button>
                  ))}
                </div>
                {showErrors && !form.designStyle && (
                  <p className="text-red-400 text-xs mt-2">Vyberte styl webu.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#C0C0C0] mb-3">Barevné ladění</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {COLOR_PALETTES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => set('colorPreference', p.id)}
                      className={cn(
                        'p-3 rounded-xl border text-left transition-all flex items-center gap-2.5',
                        form.colorPreference === p.id
                          ? 'border-[#00C47A] bg-[rgba(0,196,122,0.06)]'
                          : 'border-white/8 bg-white/3 hover:border-white/15',
                      )}
                    >
                      {p.a && p.b ? (
                        <span
                          className="w-6 h-6 rounded-full flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${p.a} 50%, ${p.b} 50%)` }}
                        />
                      ) : (
                        <span className="w-6 h-6 rounded-full flex-shrink-0 border border-dashed border-white/20" />
                      )}
                      <span className="text-[#C0C0C0] text-xs font-medium leading-tight">{p.label}</span>
                    </button>
                  ))}
                </div>
                {form.colorPreference === 'custom' && (
                  <Field
                    label=""
                    value={form.customColors}
                    onChange={(v) => set('customColors', v)}
                    placeholder="Příklad: firemní modrá #1E3A8A a bílá, nebo tmavě zelená + oranžová"
                    className="mt-3"
                  />
                )}
              </div>

              <Field
                label="Web, který se vám líbí (inspirace)"
                value={form.designInspiration}
                onChange={(v) => set('designInspiration', v)}
                placeholder="https://example.com — co se vám na něm líbí?"
              />
            </div>
          </div>
        )}

        {/* ── Krok 7: Technické ────────────────────────────────────────────── */}
        {step === 7 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Technické věci</h2>
            <p className="text-[#606060] text-sm mb-8">Doména, jazyk a kontaktní údaje, které se zobrazí na webu.</p>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#C0C0C0] mb-2">Máte vlastní doménu? *</label>
                <div className="flex gap-3">
                  {(['yes', 'no'] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => set('hasDomain', opt)}
                      className={cn(
                        'flex-1 py-3 rounded-xl border text-sm font-medium transition-all',
                        form.hasDomain === opt
                          ? 'border-[#00C47A] bg-[rgba(0,196,122,0.06)] text-white'
                          : showErrors && !form.hasDomain
                          ? 'border-red-500/40 bg-white/3 text-[#808080]'
                          : 'border-white/8 bg-white/3 text-[#808080] hover:border-white/15',
                      )}
                    >
                      {opt === 'yes' ? 'Ano, mám doménu' : 'Nemám doménu'}
                    </button>
                  ))}
                </div>
              </div>

              {form.hasDomain === 'yes' && (
                <Field
                  label="Název domény"
                  value={form.domainName}
                  onChange={(v) => set('domainName', v)}
                  placeholder="moje-firma.cz"
                />
              )}

              <div>
                <label className="block text-sm font-semibold text-[#C0C0C0] mb-3">Jazyk webu * <span className="text-[#505050] font-normal">(lze vybrat více)</span></label>
                <div className="flex gap-3">
                  {[
                    { id: 'cs', label: '🇨🇿 Čeština' },
                    { id: 'en', label: '🇬🇧 Angličtina' },
                    { id: 'sk', label: '🇸🇰 Slovenština' },
                    { id: 'de', label: '🇩🇪 Němčina' },
                  ].map((l) => (
                    <button
                      key={l.id}
                      onClick={() => toggleArray('language', l.id)}
                      className={cn(
                        'px-4 py-2.5 rounded-xl border text-sm font-medium transition-all',
                        form.language.includes(l.id)
                          ? 'border-[#00C47A] bg-[rgba(0,196,122,0.06)] text-white'
                          : 'border-white/8 bg-white/3 text-[#808080] hover:border-white/15',
                      )}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
                {showErrors && form.language.length === 0 && (
                  <p className="text-red-400 text-xs mt-2">Vyberte alespoň jeden jazyk.</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Kontaktní e-mail na webu *"
                  type="email"
                  value={form.contactEmail}
                  onChange={(v) => set('contactEmail', v)}
                  placeholder={form.email || 'info@firma.cz'}
                  error={showErrors && !(form.contactEmail || form.email).trim()}
                />
                <Field
                  label="Kontaktní telefon na webu"
                  type="tel"
                  value={form.contactPhone}
                  onChange={(v) => set('contactPhone', v)}
                  placeholder={form.phone || '+420 777 000 000'}
                />
              </div>

              <Field
                label="Adresa / provozovna (volitelné)"
                value={form.contactAddress}
                onChange={(v) => set('contactAddress', v)}
                placeholder="Příklad: Václavské náměstí 1, Praha 1, 110 00"
              />
            </div>
          </div>
        )}

        {/* ── Krok 8: Instrukce ────────────────────────────────────────────── */}
        {step === 8 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Důležité instrukce</h2>
            <p className="text-[#606060] text-sm mb-8">Vaše speciální požadavky. Pište konkrétně — tato pole přečte AI, která web vytvoří.</p>
            <div className="space-y-5">
              <TextareaField
                label="Co MUSÍ na webu být / co je pro vás klíčové?"
                value={form.mustHave}
                onChange={(v) => set('mustHave', v)}
                placeholder="Příklad: Musí být viditelné certifikace ISO 9001, prominentní telefonní číslo v hlavičce, sekce s recenzemi z Googlu, kontaktní formulář s polem na popis projektu."
                rows={4}
              />
              <TextareaField
                label="Co NESMÍ na webu být / co se vám nelíbí?"
                value={form.mustNotHave}
                onChange={(v) => set('mustNotHave', v)}
                placeholder="Příklad: Žádné tmavé pozadí, nechci animace, žádný chatbot, nechci zobrazovat ceny na hlavní stránce."
                rows={4}
              />
            </div>
          </div>
        )}

        {/* ── Krok 9: Přehled + odeslání ───────────────────────────────────── */}
        {step === 9 && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-2xl font-black text-white">Přehled zadání</h2>
              <button
                onClick={copyBrief}
                className="flex items-center gap-1.5 text-xs text-[#606060] hover:text-[#00C47A] transition-colors"
              >
                {copied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Zkopírováno' : 'Kopírovat brief'}
              </button>
            </div>
            <p className="text-[#606060] text-sm mb-6">
              Toto zadání obdrží AI, která váš web vytvoří. Zkontrolujte a potvrďte.
            </p>

            <div className="bg-[#0A0F0D] border border-white/8 rounded-xl p-5 mb-6 max-h-80 overflow-y-auto">
              <pre className="text-[#B0BDB6] text-xs leading-relaxed whitespace-pre-wrap font-mono">
                {brief}
              </pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                'Platba bezpečně přes Stripe',
                'Brief jde okamžitě do výroby',
                'Web do 24 hodin od potvrzení',
              ].map((item) => (
                <div key={item} className="rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-xs text-[#B8C2BC]">
                  {item}
                </div>
              ))}
            </div>

            <div className="accent-border rounded-xl p-5 mb-6 flex items-center justify-between">
              <div>
                <div className="text-white font-black text-lg">Profesionální web na klíč</div>
                <div className="text-[#606060] text-sm mt-0.5">Celá platba předem · Hosting a texty v ceně</div>
              </div>
              <div className="text-[#00C47A] font-black text-2xl">9 900 Kč</div>
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

        {/* ── Navigace ─────────────────────────────────────────────────────── */}
        {validationError && (
          <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            <p className="text-red-400 text-sm">Vyplňte prosím všechna povinná pole (*) před pokračováním.</p>
          </div>
        )}

        <div className={cn('flex gap-3 mt-8', step === 1 ? 'justify-end' : 'justify-between')}>
          {step > 1 && step < 9 && (
            <button onClick={handleBack} className="btn-secondary px-6 py-3 text-sm">
              ← Zpět
            </button>
          )}
          {step > 1 && step === 9 && (
            <button onClick={handleBack} className="btn-secondary px-6 py-3 text-sm">
              ← Upravit
            </button>
          )}
          {step < 9 && (
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
  value,
  onChange,
  placeholder,
  type = 'text',
  error = false,
  className = '',
}: {
  label: string;
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
  value,
  onChange,
  placeholder,
  rows = 3,
  error = false,
}: {
  label: string;
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

function CheckCard({
  label,
  desc,
  selected,
  onClick,
  compact = false,
}: {
  label: string;
  desc: string;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-xl border text-left transition-all relative',
        compact ? 'p-3' : 'p-4',
        selected
          ? 'border-[#00C47A] bg-[rgba(0,196,122,0.06)]'
          : 'border-white/8 bg-white/3 hover:border-white/15',
      )}
    >
      {selected && (
        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#00C47A] flex items-center justify-center">
          <Check className="w-2.5 h-2.5 text-[#050A08]" />
        </span>
      )}
      <div className={cn('font-semibold text-white', compact ? 'text-xs' : 'text-sm')}>{label}</div>
      <div className={cn('text-[#606060] mt-0.5', compact ? 'text-[10px]' : 'text-xs')}>{desc}</div>
    </button>
  );
}
