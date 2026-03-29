import type { Benefit, FAQItem, Package, Step, Testimonial, TrustPoint } from '@/types';

export const packages: Package[] = [
  {
    id: 'pro',
    name: 'Profesionální web na klíč',
    price: 9900,
    originalPrice: 9900,
    priceFormatted: '9 900 Kč',
    depositFormatted: '9 900 Kč',
    priceNote: 'celá částka předem',
    description: 'Profesionální web do 24 hodin. Vlastní design, hosting v ceně, texty v ceně, základní SEO, vlastní doména.',
    features: [
      'Vlastní design (žádná šablona)',
      'Hosting a SSL v ceně',
      'Texty k webu v ceně',
      'Základní SEO optimalizace',
      'Plně responzivní design',
      'Spuštění do 24 hodin',
    ],
    highlighted: true,
    badge: 'Vše v ceně',
    deliveryTime: '24 hodin',
    cta: 'Objednat web',
  },
];

export const steps: Step[] = [
  {
    number: '01',
    title: 'Zaplaťte & vyplňte formulář',
    description: 'Napište pár vět o byznysu a zaplaťte — QR kódem, převodem nebo na splátky. Trvá to 2 minuty.',
    icon: '💳',
  },
  {
    number: '02',
    title: 'Dostanete návrh textů',
    description: 'Do 2 hodin pošleme e-mail s návrhem textů stránek. Doplňte požadavky a potvrďte.',
    icon: '📩',
  },
  {
    number: '03',
    title: 'Stavíme',
    description: 'Tým pracuje. Logo a fotky zašlete na podklady@webdo24.cz. Vy podnikáte.',
    icon: '⚡',
  },
  {
    number: '04',
    title: 'Web je online',
    description: 'Do 24 hodin od potvrzení pošleme odkaz + instrukce k napojení na vlastní doménu.',
    icon: '🚀',
  },
];

export const trustPoints: TrustPoint[] = [
  {
    title: 'Pevná cena předem',
    description: 'Cena je jasná před objednávkou. Platíte celou částku najednou. Bez překvapení na faktuře.',
  },
  {
    title: 'Garance 24 hodin',
    description: 'Když nedodáme web v termínu z naší strany, vracíme celou platbu.',
  },
  {
    title: '1 revize zdarma',
    description: 'Po spuštění máte nárok na jedno kompletní opravné kolo bez příplatku.',
  },
  {
    title: 'Bezpečná platba',
    description: 'QR kód, bankovní převod nebo splátky. Potvrzení e-mailem hned po přijetí platby.',
  },
];

export const benefits: Benefit[] = [
  {
    icon: '⚡',
    title: 'Web do 24 hodin',
    description: 'Nestíháme termín? Vracíme celou platbu. Rychlost není bonus, ale součást služby.',
  },
  {
    icon: '🎨',
    title: 'Vlastní design, žádná šablona',
    description: 'Každý web stavíme od nuly. Unikátní vzhled, barvy a styl přesně pro váš byznys.',
  },
  {
    icon: '📦',
    title: 'Hosting a texty v ceně',
    description: 'Server, SSL i copywriting jsou v ceně. Nic dalšího neplatíte, nic nepřipravujete.',
  },
  {
    icon: '🌐',
    title: 'Vlastní doména, základní SEO',
    description: 'Web provozujete na vlastní doméně. Základní SEO zajistí, že vás Google najde.',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Tomáš Novák',
    company: 'Řemeslné práce Novák',
    role: 'živnostník',
    text: 'Ráno jsem odeslal objednávku, odpoledne schválil texty a druhý den byl web online. Bez zdržování a bez chaosu.',
    result: '+3 poptávky v prvním měsíci',
    initials: 'TN',
    color: 'from-emerald-500 to-lime-400',
  },
  {
    name: 'Petra Horáková',
    company: 'Kosmetické studio Petra',
    role: 'majitelka salonu',
    text: 'Potřebovala jsem rychlý a hezký web, ne měsíční projekt. webdo24.cz přesně splnilo, co slíbilo, a klientky začaly psát hned první týden.',
    result: 'Web spuštěn za 24 hodin',
    initials: 'PH',
    color: 'from-teal-400 to-emerald-500',
  },
  {
    name: 'Martin Blaha',
    company: 'Blaha Účetnictví s.r.o.',
    role: 'ředitel',
    text: 'Nechtěl jsem další agenturní kolečko. Tady bylo všechno stručné, jasné a hlavně rychlé. Přesně ten typ dodavatele, který firmě pomůže.',
    result: 'Bez schůzek, bez zdržení',
    initials: 'MB',
    color: 'from-green-500 to-emerald-400',
  },
];

export const faqs: FAQItem[] = [
  {
    question: 'Opravdu do 24 hodin?',
    answer: 'Ano. Garantujeme spuštění do 24 hodin od potvrzení zadání z vaší strany. Pokud termín nestíháme z naší strany a vy jste dodali podklady včas, vracíme celou platbu.',
  },
  {
    question: 'Co potřebuji připravit?',
    answer: 'Nic. Po zaplacení obdržíte e-mail s návrhem textů, kde doplníte případné požadavky. Logo a fotky zašlete na podklady@webdo24.cz — výzva přijde automaticky.',
  },
  {
    question: 'Kdy začíná 24hodinový termín?',
    answer: 'Od chvíle, kdy potvrdíte zadání — odešlete zpět e-mail s upraveným návrhem textů. Platba termín nespouští sama o sobě.',
  },
  {
    question: 'Jak funguje 1 revize zdarma?',
    answer: 'Po spuštění webu máte nárok na jedno kompletní opravné kolo — libovolné úpravy textu, designu i funkcí bez příplatku. Podmínky jsou v obchodních podmínkách.',
  },
  {
    question: 'Jak zaplatím?',
    answer: 'Vyberte si: QR kód (ihned přes mobilní bankovnictví), bankovní převod nebo rozdělená platba (dvě splátky). Potvrzení přijde e-mailem po přijetí platby.',
  },
  {
    question: 'Kde bude web hostován?',
    answer: 'Na Vercelu — globální CDN, 99.99 % uptime, SSL zdarma. Hosting je v ceně, žádné měsíční poplatky. Web napojíte na vlastní doménu — instrukce dostanete po spuštění.',
  },
  {
    question: 'Co je zahrnuto v ceně?',
    answer: 'Vlastní design (žádná šablona), hosting, SSL, responzivní web pro všechny prohlížeče, základní SEO, vytvoření textů, kontaktní formulář, Google Analytics a instrukce k napojení na vlastní doménu.',
  },
  {
    question: 'Jak začít?',
    answer: 'Vyplňte formulář na hlavní stránce, zvolte způsob platby a odešlete. Do 2 hodin dostanete e-mail s dalšími kroky.',
  },
];
