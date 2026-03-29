'use client';

import { useState, useEffect } from 'react';

const SALE_PRICE = 4900;
const REGULAR_PRICE = 9900;
const TIMER_SECONDS = 15 * 60;
const STORAGE_KEY = 'konverzky_expiry_v1';

const BANK_IBAN = process.env.NEXT_PUBLIC_BANK_IBAN || 'CZ6508000000192000145399';
const BANK_ACCOUNT_DISPLAY = process.env.NEXT_PUBLIC_BANK_ACCOUNT || '192000145399/0800';

function fmt(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function fmtPrice(n: number): string {
  return n.toLocaleString('cs-CZ') + '\u00a0Kč';
}

function getQRCodeUrl(amount: number, vs: string): string {
  const paymentString = `SPD*1.0*ACC:${BANK_IBAN}*AM:${amount}.00*CC:CZK*MSG:Web webdo24.cz ${vs}*X-VS:${vs}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&ecc=M&data=${encodeURIComponent(paymentString)}`;
}

type PaymentMethod = 'qr' | 'bank' | 'split';

const WHAT_YOU_GET = [
  { icon: '🎨', title: 'Vlastní design, žádná šablona', desc: 'Každý web stavíme od nuly pro vás. Unikátní vzhled přesně pro váš byznys.' },
  { icon: '📦', title: 'Hosting v ceně', desc: 'Vercel CDN, SSL certifikát, automatické zálohy — všechno zahrnuto. Žádné měsíční poplatky navíc.' },
  { icon: '📱', title: 'Plně responzivní', desc: 'Perfektně vypadá na mobilu, tabletu i počítači. Optimalizováno pro Chrome, Safari i Firefox.' },
  { icon: '🌐', title: 'Provoz na vlastní doméně', desc: 'Web běží na vaší doméně. Instrukce k napojení dostanete spolu s hotovým webem.' },
  { icon: '🔍', title: 'Základní SEO', desc: 'Správné meta tagy, sitemap, robots.txt, rychlost načítání. Základ pro umístění v Google.' },
  { icon: '✍️', title: 'Texty k webu v ceně', desc: 'Copywriter napíše texty pro celý web. Nic nemusíte předem připravovat.' },
  { icon: '📊', title: 'Google Analytics', desc: 'Přehled návštěvnosti od prvního dne. Víte přesně, kdo k vám přichází a odkud.' },
  { icon: '📧', title: 'Kontaktní formulář', desc: 'Poptávky a zprávy od zákazníků přicházejí přímo na váš e-mail.' },
];

const PROCESS_STEPS = [
  {
    n: '01',
    icon: '💳',
    title: 'Zaplaťte & vyplňte formulář',
    time: 'Ihned',
    desc: 'Napište pár vět o svém byznysu a zaplaťte celou cenu — přes QR kód, bankovním převodem nebo na splátky. Trvá to 2 minuty.',
  },
  {
    n: '02',
    icon: '📩',
    title: 'Dostanete e-mail s návrhem textů',
    time: 'Do 2 hodin',
    desc: 'Pošleme návrh textů jednotlivých stránek vašeho webu. Doplňte případné požadavky a změny — návrh lze upravit před zahájením výroby.',
  },
  {
    n: '03',
    icon: '✅',
    title: 'Potvrďte zadání',
    time: 'Kdykoliv',
    desc: 'Upravený návrh textů nám potvrďte e-mailem zpět. Tím startuje 24hodinový termín. Logo a fotky zašlete na podklady@webdo24.cz — emailem vás k tomu vyzveme.',
  },
  {
    n: '04',
    icon: '⚡',
    title: 'Stavíme váš web',
    time: 'Do 24 hodin od potvrzení',
    desc: 'Tým pracuje na vašem webu. Nic neřešíte, nic nesháníte. Průběžně vás informujeme o postupu.',
  },
  {
    n: '05',
    icon: '🚀',
    title: 'Web je online',
    time: 'Hotovo!',
    desc: 'Pošleme odkaz na váš nový web a instrukce pro zobrazení na vlastní doméně. Máte svůj profesionální web.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Tomáš Novák',
    company: 'Řemeslné práce Novák',
    text: 'Ráno jsem odeslal objednávku, odpoledne schválil texty a druhý den byl web online. Bez zdržování a bez chaosu.',
    result: '+3 poptávky v prvním měsíci',
    initials: 'TN',
  },
  {
    name: 'Petra Horáková',
    company: 'Kosmetické studio Petra',
    text: 'Potřebovala jsem rychlý a hezký web, ne měsíční projekt. webdo24.cz přesně splnilo, co slíbilo.',
    result: 'Web spuštěn za 24 hodin',
    initials: 'PH',
  },
  {
    name: 'Martin Blaha',
    company: 'Blaha Účetnictví s.r.o.',
    text: 'Nechtěl jsem další agenturní kolečko. Tady bylo všechno stručné, jasné a hlavně rychlé.',
    result: 'Bez schůzek, bez zdržení',
    initials: 'MB',
  },
];

const FAQS = [
  {
    q: 'Opravdu do 24 hodin?',
    a: 'Ano. Garantujeme spuštění do 24 hodin od potvrzení zadání z vaší strany (odeslání upraveného návrhu textů zpět). Pokud termín z naší strany nestíháme a vy jste dodali podklady včas, vracíme celou platbu.',
  },
  {
    q: 'Co potřebuji připravit?',
    a: 'Nic. Po zaplacení obdržíte e-mail s návrhem textů, kde doplníte případné požadavky. Logo a fotky zašlete na podklady@webdo24.cz — výzva přijde e-mailem automaticky po platbě.',
  },
  {
    q: 'Kdy přesně začíná 24hodinový termín?',
    a: 'Od chvíle, kdy potvrdíte zadání — tedy odešlete zpět e-mail s upraveným návrhem textů. Ne od platby, ale od potvrzení. Platba termín nespouští sama o sobě.',
  },
  {
    q: 'Jak funguje 1 revize zdarma?',
    a: 'Po spuštění webu máte nárok na jedno kompletní opravné kolo — libovolné úpravy textu, designu nebo funkcí bez příplatku. Podrobné podmínky jsou v obchodních podmínkách.',
  },
  {
    q: 'Jak zaplatím?',
    a: 'Vyberte si: QR kód (okamžitě v mobilu přes mobilní bankovnictví), bankovní převod nebo rozdělená platba (dvě splátky). Potvrzení objednávky přijde e-mailem po přijetí platby.',
  },
  {
    q: 'Kde bude web hostován?',
    a: 'Na Vercelu — globální CDN, 99.99 % uptime, SSL zdarma. Hosting je v ceně, žádné měsíční poplatky. Web napojíte na vlastní doménu — instrukce dostanete po spuštění.',
  },
  {
    q: 'Mohu web upravovat sám?',
    a: 'Ano. Každý web dodáváme s jednoduchým CMS. Texty a obrázky měníte sami bez programátora.',
  },
  {
    q: 'Co je zahrnuto v ceně?',
    a: 'Vlastní design (žádná šablona), hosting v ceně, SSL certifikát, plně responzivní web pro všechny prohlížeče, základní SEO, vytvoření textů, kontaktní formulář, Google Analytics a instrukce k napojení na vlastní doménu.',
  },
];

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [expired, setExpired] = useState(false);
  const [priceFlash, setPriceFlash] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ message: '', name: '', email: '', phone: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qr');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderData, setOrderData] = useState<{ vs: string; amount: number } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const expiry = stored
      ? parseInt(stored, 10)
      : (() => {
          const t = Date.now() + TIMER_SECONDS * 1000;
          localStorage.setItem(STORAGE_KEY, t.toString());
          return t;
        })();

    const tick = () => {
      const remaining = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) {
        setExpired(true);
        setPriceFlash(true);
        setTimeout(() => setPriceFlash(false), 800);
        clearInterval(iv);
      }
    };

    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const urgent = !expired && timeLeft !== null && timeLeft <= 120;
  const currentPrice = expired ? REGULAR_PRICE : SALE_PRICE;
  const splitFirst = Math.ceil(currentPrice / 2);
  const splitSecond = currentPrice - splitFirst;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const vs = Math.floor(100000000 + Math.random() * 900000000).toString();

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: paymentMethod === 'split' ? splitFirst : currentPrice,
          paymentMethod,
          vs,
          totalPrice: currentPrice,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Něco se pokazilo. Zkuste to znovu.');
        return;
      }
      setOrderData({ vs, amount: paymentMethod === 'split' ? splitFirst : currentPrice });
      setOrderSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('Chyba sítě. Zkuste to znovu.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    'w-full bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 text-lg transition-colors';

  if (orderSubmitted && orderData) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white px-4 py-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="text-7xl mb-6">🚀</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Objednávka přijata!
            <br />
            <span className="text-yellow-400">Čekáme na platbu.</span>
          </h1>
          <p className="text-zinc-300 text-lg mb-10">
            Po přijetí platby vám do 2 hodin pošleme e-mail s návrhem textů.
          </p>

          {/* Payment details */}
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 mb-8 text-left">
            {paymentMethod === 'qr' && (
              <div className="text-center">
                <p className="text-yellow-400 font-black text-xs uppercase tracking-widest mb-4">QR platba</p>
                <div className="flex justify-center mb-4">
                  <img
                    src={getQRCodeUrl(orderData.amount, orderData.vs)}
                    alt="QR kód pro platbu"
                    className="w-[220px] h-[220px] rounded-xl bg-white p-2"
                  />
                </div>
                <p className="text-zinc-400 text-sm mb-2">Naskenujte v mobilním bankovnictví</p>
                <div className="bg-zinc-800 rounded-xl p-4 space-y-2 text-sm text-left">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Částka:</span>
                    <span className="text-yellow-400 font-black">{fmtPrice(orderData.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Číslo účtu:</span>
                    <span className="text-white font-mono">{BANK_ACCOUNT_DISPLAY}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Variabilní symbol:</span>
                    <span className="text-white font-mono">{orderData.vs}</span>
                  </div>
                </div>
              </div>
            )}
            {paymentMethod === 'bank' && (
              <div>
                <p className="text-yellow-400 font-black text-xs uppercase tracking-widest mb-4 text-center">Bankovní převod</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                    <span className="text-zinc-400">Částka:</span>
                    <span className="text-yellow-400 font-black text-xl">{fmtPrice(orderData.amount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                    <span className="text-zinc-400">Číslo účtu:</span>
                    <span className="text-white font-mono font-bold">{BANK_ACCOUNT_DISPLAY}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                    <span className="text-zinc-400">IBAN:</span>
                    <span className="text-white font-mono text-xs">{BANK_IBAN}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-zinc-700">
                    <span className="text-zinc-400">Variabilní symbol:</span>
                    <span className="text-white font-mono font-bold">{orderData.vs}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-zinc-400">Zpráva:</span>
                    <span className="text-white">Web webdo24.cz {orderData.vs}</span>
                  </div>
                </div>
              </div>
            )}
            {paymentMethod === 'split' && (
              <div>
                <p className="text-yellow-400 font-black text-xs uppercase tracking-widest mb-4 text-center">Rozdělená platba</p>
                <div className="space-y-4">
                  <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4">
                    <p className="text-yellow-400 font-black text-xs uppercase tracking-widest mb-2">1. platba — nyní</p>
                    <p className="text-white font-black text-2xl mb-3">{fmtPrice(splitFirst)}</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Účet:</span>
                        <span className="text-white font-mono">{BANK_ACCOUNT_DISPLAY}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">VS:</span>
                        <span className="text-white font-mono">{orderData.vs}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4">
                    <p className="text-zinc-400 font-black text-xs uppercase tracking-widest mb-2">2. platba — po spuštění webu</p>
                    <p className="text-white font-black text-2xl mb-1">{fmtPrice(splitSecond)}</p>
                    <p className="text-zinc-500 text-xs">Faktura přijde e-mailem po předání hotového webu.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-left space-y-4">
            <p className="text-yellow-400 font-black text-xs uppercase tracking-widest">Co bude dál</p>
            {[
              { step: '1', time: 'Po přijetí platby', text: 'Do 2 hodin přijde e-mail s návrhem textů stránek.' },
              { step: '2', time: 'Vy doplníte požadavky', text: 'Upravíte návrh a zašlete nám zpět potvrzení.' },
              { step: '3', time: 'Do 24 hodin od potvrzení', text: 'Web je online. Dostanete odkaz a instrukce k doméně.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-yellow-400 text-black font-black text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <div className="text-yellow-400 font-bold text-xs uppercase tracking-wide mb-0.5">{item.time}</div>
                  <div className="text-white font-medium text-sm">{item.text}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-zinc-500 text-sm mt-8">
            Dotazy? <a href="mailto:info@webdo24.cz" className="text-yellow-400 underline">info@webdo24.cz</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* ── Sticky countdown bar ── */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 py-3 px-4 text-center transition-colors duration-500 ${
          expired ? 'bg-zinc-800' : urgent ? 'bg-red-950 animate-pulse' : 'bg-zinc-900'
        }`}
      >
        {expired ? (
          <span className="text-zinc-400 text-sm font-semibold">
            Speciální nabídka vypršela · Cena: {fmtPrice(REGULAR_PRICE)}
          </span>
        ) : timeLeft === null ? (
          <span className="text-yellow-400 font-bold text-base">
            ⏱&nbsp;Speciální cena {fmtPrice(SALE_PRICE)} — načítám…
          </span>
        ) : (
          <span className={`font-mono font-bold text-base md:text-lg ${urgent ? 'text-red-300' : 'text-yellow-400'}`}>
            ⏱&nbsp;Speciální cena {fmtPrice(SALE_PRICE)} vyprší za&nbsp;
            <span className={`tabular-nums text-xl font-black ${urgent ? 'text-red-200' : 'text-white'}`}>
              {fmt(timeLeft)}
            </span>
          </span>
        )}
      </div>

      {/* ── Hero ── */}
      <section className="pt-24 pb-16 px-4 text-center max-w-3xl mx-auto">
        <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold mb-4">webdo24.cz</p>
        <h1 className="text-4xl md:text-6xl font-black leading-[1.0] tracking-tight mb-6">
          Profesionální web na klíč
          <br />
          <span className="text-yellow-400">do&nbsp;24&nbsp;hodin</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-300 mb-4">
          Vlastní design. Hosting v ceně. Texty v ceně.
          <br className="hidden md:block" />
          <span className="text-zinc-400"> Žádná šablona. Zítra máš hotovo.</span>
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm">
          {['✓ Hosting v ceně', '✓ Texty v ceně', '✓ Vlastní doména', '✓ Základní SEO'].map((b) => (
            <span key={b} className="bg-zinc-800 border border-zinc-700 rounded-full px-4 py-1.5 text-zinc-300">{b}</span>
          ))}
        </div>
        <a
          href="#form"
          className="inline-block bg-yellow-400 text-black font-black text-2xl px-10 py-5 rounded-2xl hover:bg-yellow-300 active:scale-95 transition-all"
        >
          Chci web →
        </a>
        {!expired && timeLeft !== null && (
          <p className="mt-5 text-zinc-400 text-sm">
            Speciální cena{' '}
            <strong className="text-yellow-400">{fmtPrice(SALE_PRICE)}</strong>{' '}
            platí jen{' '}
            <span className={`font-mono font-bold ${urgent ? 'text-red-400' : 'text-white'}`}>
              {fmt(timeLeft)}
            </span>
            {'. '}Pak se vrátí na {fmtPrice(REGULAR_PRICE)}.
          </p>
        )}
      </section>

      {/* ── Stats strip ── */}
      <section className="py-8 px-4 border-y border-zinc-800 bg-zinc-900/50">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[
            { val: '24h', label: 'garantované spuštění' },
            { val: '100+', label: 'spokojených zákazníků' },
            { val: '4.9★', label: 'průměrné hodnocení' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-black text-yellow-400">{s.val}</div>
              <div className="text-zinc-500 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Co dostaneš ── */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold mb-3">Vše v ceně</p>
          <h2 className="text-3xl md:text-4xl font-black">Profesionální web na klíč.</h2>
          <p className="text-zinc-400 mt-3 text-lg">
            Jeden produkt. Jedna cena. Vše zahrnuto.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WHAT_YOU_GET.map((item) => (
            <div key={item.title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex gap-4">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <div className="font-bold text-white">{item.title}</div>
                <div className="text-zinc-400 text-sm mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Infografika — Jak to funguje ── */}
      <section className="py-16 px-4 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold mb-3">Postup krok za krokem</p>
          <h2 className="text-3xl md:text-4xl font-black">Jak to funguje</h2>
          <p className="text-zinc-400 mt-3">Jednoduše. Přehledně. Bez zbytečné práce z vaší strany.</p>
        </div>
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-yellow-400/60 via-yellow-400/30 to-transparent hidden sm:block" />
          <div className="space-y-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.n} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-400 text-black font-black text-sm flex items-center justify-center z-10">
                  {step.icon}
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="font-black text-lg text-white">{step.title}</div>
                    <span className="flex-shrink-0 text-yellow-400 text-xs font-bold bg-yellow-400/10 px-2 py-0.5 rounded-full whitespace-nowrap">{step.time}</span>
                  </div>
                  <div className="text-zinc-400 text-sm leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-5 text-center">
          <p className="text-yellow-400 font-black text-lg">24 hodin od potvrzení zadání = váš web je online.</p>
          <p className="text-zinc-400 text-sm mt-1">Logo a fotky zasílejte na <strong className="text-white">podklady@webdo24.cz</strong></p>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 px-4 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold mb-3">Zákazníci</p>
          <h2 className="text-3xl md:text-4xl font-black">Říkají to sami</h2>
        </div>
        <div className="space-y-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <p className="text-zinc-200 text-base leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400 text-black font-black text-sm flex items-center justify-center flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t.name}</div>
                  <div className="text-zinc-500 text-xs">{t.company}</div>
                </div>
                <div className="ml-auto">
                  <span className="text-xs bg-zinc-800 text-yellow-400 font-semibold px-3 py-1 rounded-full">
                    {t.result}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Garance ── */}
      <section className="py-12 px-4 max-w-2xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8">
          <div className="text-4xl mb-4 text-center">🛡</div>
          <h2 className="text-2xl md:text-3xl font-black text-center mb-6">Máte jistotu</h2>
          <div className="space-y-4">
            {[
              { icon: '✓', text: 'Web hotový do 24 hodin od potvrzení zadání — nebo vracíme celou platbu zpět.' },
              { icon: '✓', text: '1 revize zdarma — kompletní úprava webu dle vašich požadavků po spuštění.' },
              { icon: '✓', text: 'Hosting v ceně — žádné měsíční poplatky za provoz ani SSL.' },
              { icon: '✓', text: 'Pevná cena. Žádné překvapení na faktuře.' },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3">
                <span className="text-yellow-400 font-black flex-shrink-0">{item.icon}</span>
                <span className="text-zinc-300">{item.text}</span>
              </div>
            ))}
          </div>
          <p className="text-zinc-600 text-xs mt-6 text-center">
            Záruka vrácení peněz se vztahuje na nedodání webu v termínu z naší strany, při včasném dodání podkladů ze strany zákazníka. Podrobnosti v{' '}
            <a href="/obchodnipodminky" className="underline hover:text-zinc-400">obchodních podmínkách</a>.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 max-w-2xl mx-auto" id="faq">
        <div className="text-center mb-10">
          <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-black">Časté otázky</h2>
          <p className="text-zinc-400 mt-3 text-sm">
            Nenašel jsi odpověď?{' '}
            <a href="mailto:info@webdo24.cz" className="text-yellow-400 underline underline-offset-2">
              info@webdo24.cz
            </a>{' '}
            — odpovídáme do 2 hodin.
          </p>
        </div>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`rounded-xl border transition-colors ${
                openFaq === i ? 'border-yellow-400/30 bg-yellow-400/5' : 'border-zinc-800 bg-zinc-900'
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-semibold text-white text-sm leading-snug">{faq.q}</span>
                <span
                  className={`flex-shrink-0 w-5 h-5 text-lg leading-none transition-transform duration-200 ${
                    openFaq === i ? 'rotate-45 text-yellow-400' : 'text-zinc-500'
                  }`}
                >
                  +
                </span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5">
                  <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Form + Price ── */}
      <section id="form" className="py-12 px-4 max-w-2xl mx-auto pb-36">
        <div className="text-center mb-8">
          <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold mb-3">Objednat</p>
          <h2 className="text-3xl md:text-4xl font-black">Začínáme zítra.</h2>
          <p className="text-zinc-400 mt-2">Vyplň formulář, zvol platbu. Jdeme na to.</p>
        </div>

        {/* Price display */}
        <div
          className={`text-center mb-8 transition-all duration-300 ${
            priceFlash ? 'scale-110 opacity-50' : 'scale-100 opacity-100'
          }`}
        >
          {!expired ? (
            <div className="flex items-baseline justify-center gap-4">
              <span className="text-zinc-500 line-through text-2xl">{fmtPrice(REGULAR_PRICE)}</span>
              <span className="text-yellow-400 font-black text-6xl">{fmtPrice(SALE_PRICE)}</span>
            </div>
          ) : (
            <span className="text-white font-black text-6xl">{fmtPrice(REGULAR_PRICE)}</span>
          )}
          {!expired && (
            <p className="text-zinc-500 text-sm mt-2">
              Ušetříš {fmtPrice(REGULAR_PRICE - SALE_PRICE)} oproti běžné ceně.
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className={inputCls + ' resize-none'}
            rows={4}
            placeholder="Co má web dělat? (pár vět o vašem byznysu)"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <input
            type="text"
            className={inputCls}
            placeholder="Vaše jméno"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            className={inputCls}
            placeholder="E-mail (sem pošleme návrh textů)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="tel"
            className={inputCls}
            placeholder="Telefon"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          {/* Payment method selection */}
          <div className="mt-6">
            <p className="text-zinc-300 font-semibold mb-3">Způsob platby</p>
            <div className="grid grid-cols-3 gap-3">
              {([
                { id: 'qr' as const, icon: '📱', label: 'QR kód', desc: 'Ihned v mobilu' },
                { id: 'bank' as const, icon: '🏦', label: 'Převodem', desc: 'Na bankovní účet' },
                { id: 'split' as const, icon: '✌️', label: 'Na splátky', desc: '2× platba' },
              ] as const).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`relative flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all ${
                    paymentMethod === m.id
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-zinc-700 bg-zinc-900 hover:border-zinc-600'
                  }`}
                >
                  {paymentMethod === m.id && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-black">✓</span>
                    </div>
                  )}
                  <span className="text-2xl">{m.icon}</span>
                  <span className="text-white font-bold text-sm">{m.label}</span>
                  <span className="text-zinc-500 text-xs">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Payment preview */}
          {paymentMethod === 'split' && (
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-sm">
              <p className="text-yellow-400 font-bold mb-2">Rozdělená platba — jak to funguje:</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">1. splátka (nyní):</span>
                  <span className="text-white font-bold">{fmtPrice(splitFirst)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">2. splátka (po spuštění webu):</span>
                  <span className="text-white font-bold">{fmtPrice(splitSecond)}</span>
                </div>
                <div className="flex justify-between border-t border-zinc-700 pt-2 mt-2">
                  <span className="text-zinc-400">Celkem:</span>
                  <span className="text-yellow-400 font-black">{fmtPrice(currentPrice)}</span>
                </div>
              </div>
            </div>
          )}
          {paymentMethod === 'qr' && (
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-sm text-center">
              <p className="text-zinc-400">Po odeslání formuláře zobrazíme QR kód pro okamžitou platbu přes mobilní bankovnictví.</p>
            </div>
          )}
          {paymentMethod === 'bank' && (
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-sm text-center">
              <p className="text-zinc-400">Po odeslání formuláře dostanete číslo účtu, variabilní symbol a vše potřebné k převodu.</p>
            </div>
          )}

          {error && (
            <p className="text-red-400 text-sm bg-red-950/40 border border-red-900 rounded-xl p-3">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-yellow-400 text-black font-black text-xl py-5 rounded-2xl hover:bg-yellow-300 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting
              ? 'Odesílám…'
              : paymentMethod === 'split'
              ? `Objednat — 1. splátka ${fmtPrice(splitFirst)} 🚀`
              : `Objednat za ${fmtPrice(currentPrice)} 🚀`}
          </button>
        </form>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-zinc-600 text-xs">
          <span>🛡 Garance vrácení peněz</span>
          <span>⚡ Spuštění do 24 hodin</span>
          <span>📦 Hosting v ceně</span>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-4">
          Odesláním souhlasíte s{' '}
          <a href="/obchodnipodminky" className="underline hover:text-zinc-400">obchodními podmínkami</a>.
        </p>
      </section>

      {/* ── Sticky CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-zinc-950/95 backdrop-blur-sm border-t border-zinc-800">
        <a
          href="#form"
          className="flex items-center justify-center gap-2 w-full max-w-2xl mx-auto bg-yellow-400 text-black font-black text-lg py-4 rounded-2xl hover:bg-yellow-300 active:scale-95 transition-all"
        >
          {expired ? `Profesionální web — ${fmtPrice(REGULAR_PRICE)}` : `Speciální cena ${fmtPrice(SALE_PRICE)} — objednat →`}
        </a>
      </div>
    </div>
  );
}
