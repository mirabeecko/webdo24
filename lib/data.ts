import type { Benefit, FAQItem, Package, Step, Testimonial, TrustPoint } from '@/types';

export const packages: Package[] = [
  {
    id: 'start',
    name: 'START',
    price: 4990,
    originalPrice: 9980,
    priceFormatted: '4 990 Kč',
    depositFormatted: '2 495 Kč',
    priceNote: 'záloha 50 % = 2 495 Kč',
    description: 'Rychlý start pro živnostníky. 1 stránka, čistý design, do 24 hodin online.',
    features: [
      '1 stránka (landing page)',
      'Moderní responzivní design',
      'Kontaktní formulář',
      'Napojení na Google Maps',
      'SSL certifikát',
      'Spuštění do 24 hodin',
    ],
    highlighted: false,
    deliveryTime: '24 hodin',
    cta: 'Objednat START',
  },
  {
    id: 'pro',
    name: 'PRO',
    price: 9990,
    originalPrice: 19980,
    priceFormatted: '9 990 Kč',
    depositFormatted: '4 995 Kč',
    priceNote: 'záloha 50 % = 4 995 Kč',
    description: 'Pro firmy, které chtějí web, který prodává. Více sekcí, prodejní texty, SEO základ.',
    features: [
      'Více sekcí na míru',
      'Prodejní copywriting',
      'Kontaktní formuláře',
      'SEO základ (meta, rychlost)',
      'Google Analytics',
      'Spuštění do 24–48 hodin',
    ],
    highlighted: true,
    badge: 'Nejoblíbenější',
    deliveryTime: '24–48 hodin',
    cta: 'Objednat PRO',
  },
  {
    id: 'machine',
    name: 'MACHINE',
    price: 19990,
    originalPrice: 39980,
    priceFormatted: '19 990 Kč',
    depositFormatted: '9 995 Kč',
    priceNote: 'záloha 50 % = 9 995 Kč',
    description: 'Kompletní prodejní stroj. Web + funnel + analytika + lead systém. Výsledky, ne jen web.',
    features: [
      'Web + prodejní funnel',
      'Pokročilá analytika',
      'Lead capture systém',
      'E-mailová automatizace',
      'A/B testování',
      'Spuštění do 48–72 hodin',
    ],
    highlighted: false,
    deliveryTime: '48–72 hodin',
    cta: 'Objednat MACHINE',
  },
];

export const steps: Step[] = [
  {
    number: '01',
    title: 'Vyplníte formulář',
    description: 'Řeknete nám o byznysu, stylu a obsahu. Trvá to 5 minut.',
    icon: '📋',
  },
  {
    number: '02',
    title: 'Zaplatíte zálohu',
    description: '50 % záloha přes Stripe. Bezpečně, okamžitě, bez papírování.',
    icon: '💳',
  },
  {
    number: '03',
    title: 'Stavíme',
    description: 'Náš tým pracuje. Průběžně vás informujeme. Vy podnikáte.',
    icon: '⚡',
  },
  {
    number: '04',
    title: 'Web je online',
    description: 'Spouštíme, doladíme, doplatíte zbytek. Hotovo.',
    icon: '🚀',
  },
];

export const trustPoints: TrustPoint[] = [
  {
    title: 'Pevná cena předem',
    description: 'Cena i výše zálohy jsou jasné ještě před objednávkou. Bez hodin navíc a bez překvapení.',
  },
  {
    title: 'Záloha chráněná garancí',
    description: 'Když nedodržíme slíbený termín z naší strany, vracíme zálohu v plné výši.',
  },
  {
    title: 'Revize bez přetahování',
    description: 'Neřešíme složité kolečko schvalování. Doladíme výsledek rychle a přímo.',
  },
  {
    title: 'Bezpečná platba přes Stripe',
    description: 'Platba probíhá přes ověřený checkout. Fakturu a další kroky posíláme hned po přijetí objednávky.',
  },
];

export const benefits: Benefit[] = [
  {
    icon: '⚡',
    title: 'Web do 24 hodin',
    description: 'Nestíháme termín? Vracíme zálohu. Rychlost není bonus, ale součást služby.',
  },
  {
    icon: '💸',
    title: 'Pevná cena bez překvapení',
    description: 'Balíček, záloha i doplatek znáte dopředu. Neplatíte za mlhu kolem projektu.',
  },
  {
    icon: '🛡️',
    title: 'Bezpečná objednávka',
    description: 'Záloha běží přes Stripe a po platbě hned víte, co se bude dít dál.',
  },
  {
    icon: '🤝',
    title: 'Rychlé revize a přímá komunikace',
    description: 'Žádné týdny čekání na odpověď. Jedeme stručně, jasně a s důrazem na výsledek.',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Tomáš Novák',
    company: 'Řemeslné práce Novák',
    role: 'živnostník',
    text: 'Ráno jsem odeslal objednávku, odpoledne schválil směr a druhý den byl web online. Bez zdržování a bez chaosu.',
    result: '+3 poptávky v prvním měsíci',
    initials: 'TN',
    color: 'from-emerald-500 to-lime-400',
  },
  {
    name: 'Petra Horáková',
    company: 'Kosmetické studio Petra',
    role: 'majitelka salonu',
    text: 'Potřebovala jsem rychlý a hezký web, ne měsíční projekt. Do24 přesně splnilo, co slíbilo, a klientky začaly psát hned první týden.',
    result: 'Web spuštěn za 24 hodin',
    initials: 'PH',
    color: 'from-teal-400 to-emerald-500',
  },
  {
    name: 'Martin Blaha',
    company: 'Blaha Účetnictví s.r.o.',
    role: 'ředitel',
    text: 'Nechtěl jsem další agenturní kolečko. Tady bylo všechno stručné, jasné a hlavně rychlé. Přesně ten typ dodavatele, který firmě pomůže, místo aby ji brzdil.',
    result: 'Bez schůzek, bez zdržení',
    initials: 'MB',
    color: 'from-green-500 to-emerald-400',
  },
];

export const faqs: FAQItem[] = [
  {
    question: 'Opravdu do 24 hodin?',
    answer: 'Ano. U balíčku START garantujeme spuštění do 24 hodin od přijetí zálohy a podkladů. U PRO 24–48 hodin, u MACHINE 48–72 hodin. Pokud termín nestíháme, okamžitě vás informujeme a zálohu vracíme.',
  },
  {
    question: 'Co potřebuji připravit?',
    answer: 'Ideálně logo, texty o vašem byznysu a alespoň hrubou představu, jak má web vypadat. Pokud texty nemáte, napíšeme je za vás (v ceně u PRO a MACHINE). Logo vyřešíme také.',
  },
  {
    question: 'Jak funguje záloha?',
    answer: 'Platíte 50 % předem přes Stripe — kartou nebo bankovním převodem. Zbytek doplatíte po spuštění webu, kdy budete spokojeni s výsledkem.',
  },
  {
    question: 'Mohu web upravovat sám?',
    answer: 'Ano. U každého webu nastavíme jednoduché CMS, takže texty a fotky měníte sami. Technické úpravy řešíme my.',
  },
  {
    question: 'Co když nebudu spokojený?',
    answer: 'Děláme neomezené revize do doby, než budete 100 % spokojeni. Zálohu vracíme, pokud nesplníme dohodnutý termín.',
  },
  {
    question: 'Kde bude web hostován?',
    answer: 'Na Vercelu nebo Netlify — celosvětová CDN, 99.9 % uptime, SSL zdarma. Doménu si napojíte vlastní nebo vám s nákupem pomůžeme.',
  },
  {
    question: 'Děláte i e-shopy?',
    answer: 'Základní e-shop je součástí balíčku MACHINE. Pro komplexní e-commerce řešení nás kontaktujte — uděláme individuální nabídku.',
  },
  {
    question: 'Jak začít?',
    answer: 'Klikněte na "Objednat", vyplňte formulář (5 minut), zaplaťte zálohu. Stavíme hned.',
  },
];
