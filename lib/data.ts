import type { Package, Testimonial, FAQItem, Step, Benefit } from '@/types';

export const packages: Package[] = [
  {
    id: 'start',
    name: 'START',
    price: '24 900',
    priceNote: 'jednorázově',
    target: 'Živnostníci a malé firmy, kteří potřebují funkční online prezentaci.',
    description: 'Vše, co potřebujete pro solidní online přítomnost — rychle a bez zbytečností.',
    features: [
      'Web do 5 podstránek',
      'Responzivní design (mobil/tablet/PC)',
      'Kontaktní formulář',
      'Základní SEO nastavení',
      'Google Maps integrace',
      'Napojení na sociální sítě',
      'SSL certifikát',
      'Spuštění do 7 dnů',
    ],
    highlighted: false,
    cta: 'Objednat START',
  },
  {
    id: 'business',
    name: 'BUSINESS',
    price: '39 900',
    priceNote: 'jednorázově',
    target: 'Firmy, které chtějí web, který aktivně přivádí zákazníky.',
    description: 'Profesionální web s pokročilou strukturou, obsahem a základní marketingovou výbavou.',
    features: [
      'Web do 10 podstránek',
      'Prémiový design na míru',
      'Pokročilá SEO optimalizace',
      'Blog / aktuality',
      'Galerie a portfolio',
      'Analytika (GA4)',
      'Rychlostní optimalizace',
      'Copywriting klíčových stránek',
      'SSL + zabezpečení',
      'Spuštění do 7 dnů',
    ],
    highlighted: true,
    badge: 'Nejpopulárnější',
    cta: 'Objednat BUSINESS',
  },
  {
    id: 'pro',
    name: 'PRO',
    price: '64 900',
    priceNote: 'jednorázově',
    target: 'Firmy, které potřebují komplexní digitální řešení a výsledky.',
    description: 'Plnohodnotný web s e-shopem, rezervačním systémem nebo zákaznickou zónou.',
    features: [
      'Neomezený počet stránek',
      'E-shop nebo rezervace',
      'Unikátní UX/UI design',
      'Pokročilá SEO strategie',
      'Marketingové vstupní stránky',
      'CRM integrace',
      'Výkonový hosting první rok zdarma',
      'Analytika + konverzní měření',
      'Kompletní copywriting',
      'Prioritní spuštění do 5 dnů',
    ],
    highlighted: false,
    cta: 'Objednat PRO',
  },
];

export const addons = [
  { name: 'Expresní dodání', description: 'Prioritní zpracování, spuštění do 3 dnů', price: '+40 %' },
  { name: 'Copywriting extra', description: 'Kompletní texty pro celý web od copywritera', price: '4 900 Kč' },
  { name: 'Logo a brand', description: 'Profesionální logo + základní vizuální identita', price: '7 900 Kč' },
  { name: 'Fotografie produktů', description: 'Profesionální produktové foto (Praha/okolí)', price: 'dle rozsahu' },
];

export const maintenance = [
  {
    name: 'Základní péče',
    price: '990 Kč/měs',
    features: ['Zálohy', 'Aktualizace systému', 'Drobné úpravy (1h/měs)', 'E-mailová podpora'],
  },
  {
    name: 'Aktivní péče',
    price: '2 990 Kč/měs',
    features: [
      'Vše ze Základní péče',
      'Úpravy obsahu (3h/měs)',
      'Měsíční report výkonu',
      'Prioritní podpora',
      'SEO monitoring',
    ],
  },
];

export const benefits: Benefit[] = [
  {
    icon: '⚡',
    title: 'Spuštění do 7 dnů',
    description:
      'Žádné týdny čekání. Po schválení podkladů máte funkční web do 7 pracovních dnů. Garantujeme.',
  },
  {
    icon: '🎯',
    title: 'Web, který prodává',
    description:
      'Nestavíme vizuálky pro ocenění. Stavíme weby, které konvertují návštěvníky na zákazníky.',
  },
  {
    icon: '📱',
    title: 'Perfektní na každém zařízení',
    description:
      '60 % vašich zákazníků přijde z mobilu. Každý náš web je navržen mobile-first.',
  },
  {
    icon: '🔍',
    title: 'Viditelný na Googlu',
    description:
      'Technické SEO, rychlost a správná struktura — základ pro to, aby vás zákazníci našli.',
  },
  {
    icon: '💬',
    title: 'Komunikace bez zbytečností',
    description:
      'Jeden kontaktní bod. Žádné přehazování mezi oddělení. Jasné termíny a zpětná vazba.',
  },
  {
    icon: '🛡️',
    title: 'Bezpečnost a spolehlivost',
    description:
      'SSL, zálohy, aktualizace. Váš web běží bez výpadků a je chráněný.',
  },
  {
    icon: '🚀',
    title: 'Výkon na úrovni top firem',
    description:
      'Rychlý loading, čistý kód, moderní technologie — stejný stack jako používají startupy.',
  },
  {
    icon: '🤝',
    title: 'Férová cena bez skrytých poplatků',
    description:
      'Cenu znáte předem. Žádné surprise faktury. Platíte za výsledek, ne za hodiny.',
  },
];

export const steps: Step[] = [
  {
    number: '01',
    title: 'Vyplníte formulář',
    description:
      'Řeknete nám o svém podnikání, cíli webu a preferencích. Zabere to 5 minut.',
    icon: '📋',
  },
  {
    number: '02',
    title: 'Dostanete nabídku',
    description:
      'Do 24 hodin vám pošleme konkrétní návrh, termín a cenovou nabídku.',
    icon: '📨',
  },
  {
    number: '03',
    title: 'Schválíte design',
    description:
      'Ukážeme vám wireframe a první návrh. Zapracujeme vaše připomínky.',
    icon: '✏️',
  },
  {
    number: '04',
    title: 'Spustíme web',
    description:
      'Hotový web nasadíme na vaši doménu. Předáme správu, hesla a krátkou instruktáž.',
    icon: '🚀',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Tomáš Novák',
    company: 'Řemeslné práce Novák',
    role: 'živnostník',
    text: 'Do týdne jsem měl web, který vypadá lépe než konkurence se svými weby za 200 tisíc. Hned v prvním měsíci mi přišly 3 poptávky přes kontaktní formulář.',
    result: '+3 zakázky v 1. měsíci',
    initials: 'TN',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'Petra Horáková',
    company: 'Kosmetické studio Petra',
    role: 'majitelka salonu',
    text: 'Měla jsem starý web, který nikdo nenašel. Teď jsem na Googlu první stránka pro svůj obor v Brně a rezervace mi chodí online. Skvělá investice.',
    result: 'Na 1. stránce Google v Brně',
    initials: 'PH',
    color: 'from-rose-500 to-pink-500',
  },
  {
    name: 'Martin Blaha',
    company: 'Blaha Účetnictví s.r.o.',
    role: 'ředitel',
    text: 'Hledal jsem agenturu, která to prostě udělá bez zdlouhavých schůzek a čekání. Tady to přesně tak fungovalo. Spokojený zákazník.',
    result: 'Spuštění do 6 dnů',
    initials: 'MB',
    color: 'from-emerald-500 to-teal-500',
  },
];

export const faqs: FAQItem[] = [
  {
    question: 'Jak dlouho opravdu trvá výroba webu?',
    answer:
      'Standardní weby dodáváme do 7 pracovních dnů od schválení podkladů a obsahu. Expresní dodání (příplatek 40 %) zkracuje termín na 3 pracovní dny. Balíček PRO je standardně do 5 dnů.',
  },
  {
    question: 'Co potřebuji mít připraveno před začátkem?',
    answer:
      'Ideálně: logo (nebo zájem o tvorbu loga), základní texty o firmě a službách, případné fotografie. Pokud nic z toho nemáte — nevadí. Pomůžeme s copywritingem a doporučíme fotobanky.',
  },
  {
    question: 'Mohu si web sám upravovat?',
    answer:
      'Ano. Předáváme web se správcovským přístupem a krátkým videonávodem. Úpravy textů, fotek a základního obsahu zvládnete sami bez technických znalostí.',
  },
  {
    question: 'Co je součástí ceny a co není?',
    answer:
      'V ceně je design, vývoj, základní SEO nastavení, SSL, responzivita a spuštění. Není v ceně doménové jméno (cca 250 Kč/rok) a webhosting (doporučujeme náš hosting od 390 Kč/měs).',
  },
  {
    question: 'Poskytujete také e-shop?',
    answer:
      'Ano, e-shopy jsou součástí balíčku PRO. Pokud chcete e-shop s menším katalogem, můžeme se domluvit i v balíčku BUSINESS s příplatkem.',
  },
  {
    question: 'Jak funguje platba?',
    answer:
      'Fakturujeme 50 % zálohu před zahájením práce a 50 % před spuštěním. Platba převodem nebo online kartou.',
  },
  {
    question: 'Co se stane po spuštění webu?',
    answer:
      'Předáme vám přístupy, instruktáž a záruka na technické chyby je 30 dnů zdarma. Poté nabízíme plány měsíční péče (990 nebo 2 990 Kč/měs) pro aktualizace a podporu.',
  },
  {
    question: 'Děláte weby i mimo Prahu?',
    answer:
      'Ano, pracujeme plně online. Máme klienty po celé ČR i v zahraničí. Veškerou komunikaci zvládneme přes email, Zoom nebo telefon.',
  },
  {
    question: 'Je vaše práce zaručena?',
    answer:
      'Garantujeme spuštění v dohodnutém termínu. Pokud termín nesplníme z naší strany, vracíme 20 % z ceny. Technické chyby opravujeme zdarma 30 dní po spuštění.',
  },
  {
    question: 'Budete web hostovat nebo ho dostanu k sobě?',
    answer:
      'Oboje je možné. Doporučujeme náš hosting — je optimalizovaný pro naše weby a zahrnuje zálohy a monitoring. Nebo vám web předáme k hostingu na vámi zvoleném serveru.',
  },
  {
    question: 'Pomůžete mi i s obsahem (texty, fotky)?',
    answer:
      'Základní copywriting klíčových stránek je součástí balíčku BUSINESS a PRO. Kompletní copywriting pro celý web je k dispozici jako doplněk (+4 900 Kč). Fotografie doporučíme nebo zajistíme.',
  },
  {
    question: 'Optimalizujete web pro Google (SEO)?',
    answer:
      'Základní technické SEO je součástí každého balíčku (meta tagy, rychlost, struktura). Pokročilá SEO strategie, keyword research a linkbuilding jsou dostupné jako samostatná služba nebo součást péče.',
  },
  {
    question: 'Co když nejsem spokojený s výsledkem?',
    answer:
      'Pracujeme iterativně — design i obsah schvalujete průběžně, takže finální výsledek nikdy nepřijde jako překvapení. Připomínky zapracujeme. Pokud stále nejste spokojeni, najdeme řešení.',
  },
  {
    question: 'Jak se liší váš přístup od levných šablonovacích nástrojů (Wix, Webflow)?',
    answer:
      'Šablonovací nástroje jsou OK pro hobby projekty. Pro podnikání potřebujete web bez kompromisů — vlastní kód, plnou kontrolu nad SEO, bezpečnost a výkon, který šablony neumožní.',
  },
  {
    question: 'Pracujete na větších projektech nebo jen pro živnostníky?',
    answer:
      'Pracujeme pro živnostníky, malé i střední firmy. Balíček PRO zahrnuje komplexní řešení pro e-shopy, portály nebo firemní weby s více pobočkami.',
  },
];
