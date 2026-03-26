import type { Package, Testimonial, FAQItem, Step, Benefit } from '@/types';

export const packages: Package[] = [
  {
    id: 'start',
    name: 'START',
    price: '9 800',
    originalPrice: '19 600',
    priceNote: 'jednorázově · bez DPH',
    target: 'Landing page nebo jednoduchá prezentace pro živnostníky.',
    description: 'Hotový jednostránkový web do 24 hodin. Ideální pro rychlý start.',
    features: [
      'Jednostránkový web (landing page)',
      'Moderní responzivní design',
      'Kontaktní formulář',
      'Napojení na Google Maps',
      'Základní SEO (meta tagy, rychlost)',
      'SSL certifikát',
      'Spuštění do 24 hodin',
    ],
    highlighted: false,
    cta: 'OBJEDNAT TEĎ SE SLEVOU',
  },
  {
    id: 'profi',
    name: 'PROFI',
    price: '19 600',
    originalPrice: '39 200',
    priceNote: 'jednorázově · bez DPH',
    target: 'Firmy, které chtějí web, který aktivně generuje zákazníky.',
    description: 'Firemní web do 5 stránek s pokročilým SEO a marketingovou výbavou.',
    features: [
      'Web do 5 stránek',
      'Prémiový design na míru',
      'Pokročilé SEO + Google Analytics',
      'Blog / aktuality',
      'Galerie a portfolio',
      'Copywriting klíčových stránek',
      'Rychlostní optimalizace (Core Web Vitals)',
      'Spuštění do 24 hodin',
    ],
    highlighted: true,
    badge: 'Bestseller',
    cta: 'OBJEDNAT TEĎ SE SLEVOU',
  },
  {
    id: 'business',
    name: 'BUSINESS',
    price: '39 000',
    originalPrice: '78 000',
    priceNote: 'jednorázově · bez DPH',
    target: 'Ambiciózní firmy, které potřebují komplexní digitální přítomnost.',
    description: 'Až 10 stránek, e-shop nebo rezervace — spuštění do 48 hodin.',
    features: [
      'Web do 10 stránek',
      'E-shop nebo rezervační systém',
      'Unikátní UX/UI design na míru',
      'Pokročilá SEO strategie',
      'Marketingové landing pages',
      'CRM integrace',
      'Kompletní copywriting',
      'Výkonový hosting 1. rok zdarma',
      'Spuštění do 48 hodin',
    ],
    highlighted: false,
    cta: 'OBJEDNAT TEĎ SE SLEVOU',
  },
];

export const addons = [
  {
    name: 'Expresní do 6 hodin',
    description: 'Spuštění ještě dnes — prioritní zpracování',
    price: '+60 %',
  },
  {
    name: 'Copywriting',
    description: 'Prodejní texty pro celý web od copywritera',
    price: '3 900 Kč',
  },
  {
    name: 'Logo a brand',
    description: 'Profesionální logo + základní vizuální identita',
    price: '5 900 Kč',
  },
  {
    name: 'Google reklama',
    description: 'Nastavení Google Ads kampaně včetně správy',
    price: 'od 2 900 Kč',
  },
];

export const maintenance = [
  {
    name: 'Základní péče',
    price: '390 Kč/měs',
    features: [
      'Zálohy každý den',
      'Aktualizace systému',
      'Drobné úpravy (1h/měs)',
      'Hosting + SSL',
      'E-mailová podpora',
    ],
  },
  {
    name: 'Aktivní péče',
    price: '990 Kč/měs',
    features: [
      'Vše ze Základní péče',
      'Úpravy obsahu (3h/měs)',
      'Měsíční SEO report',
      'Prioritní podpora do 2h',
      'Bezpečnostní monitoring',
    ],
  },
];

export const benefits: Benefit[] = [
  {
    icon: '⚡',
    title: 'Web do 24 hodin — garantováno',
    description:
      'Ráno objednáte — večer máte web online. Pokud nestihneme, vracíme 100 % zálohy.',
  },
  {
    icon: '💰',
    title: 'Cena pevná od začátku',
    description:
      'Cenu znáte ještě před podpisem. Žádné hodiny navíc, žádné skryté poplatky. Platíte přesně to, co bylo domluveno.',
  },
  {
    icon: '🎯',
    title: 'Web, který přivádí zákazníky',
    description:
      'Nestavíme vizuální díla do šuplíku. Každý web je navržený tak, aby konvertoval návštěvníky na zákazníky.',
  },
  {
    icon: '📱',
    title: 'Perfektní na mobilu',
    description:
      '70 % vašich zákazníků přijde z telefonu. Každý náš web je mobile-first — bez kompromisů.',
  },
  {
    icon: '🔍',
    title: 'Viditelný na Googlu od prvního dne',
    description:
      'Technické SEO, rychlost a správná struktura jsou standardem. Zákazníci vás najdou dřív než konkurenci.',
  },
  {
    icon: '🤝',
    title: 'Jeden člověk, plná zodpovědnost',
    description:
      'Žádné přehazování mezi oddělení. Máte jeden kontaktní bod, který zná váš projekt od začátku do konce.',
  },
  {
    icon: '🛡️',
    title: 'Záruka výsledku',
    description:
      'Technické chyby opravujeme 30 dnů zdarma po spuštění. Váš web musí fungovat — jinak pracujeme bez nároku na odměnu.',
  },
  {
    icon: '🚀',
    title: 'Stack jako velké firmy',
    description:
      'Next.js, moderní kód, bez zbytečných pluginů. Rychlý, bezpečný a snadno rozšiřitelný web.',
  },
];

export const steps: Step[] = [
  {
    number: '01',
    title: 'Provedete objednávku (5 min)',
    description:
      'Vyplníte kalkulačku. Řeknete nám o podnikání, cíli a designu. Ihned dostanete potvrzení.',
    icon: '📋',
  },
  {
    number: '02',
    title: 'Do 2 hodin dostanete nabídku',
    description:
      'Pošleme vám přesnou cenu, termín spuštění a případné otázky. Vše emailem.',
    icon: '📨',
  },
  {
    number: '03',
    title: 'Schválíte design (online)',
    description:
      'Ukážeme návrh. Jedno kolo revizí. Pak jdeme stavět.',
    icon: '✏️',
  },
  {
    number: '04',
    title: 'Do 24 hodin jste online',
    description:
      'Web nasadíme na vaši doménu. Předáme přístupy, hesla a video návod.',
    icon: '🚀',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Tomáš Novák',
    company: 'Řemeslné práce Novák',
    role: 'živnostník',
    text: 'Ráno jsem odeslal objednávku, odpoledne schválil design a druhý den ráno jsem měl web online. Přesně jak slibují. Hned v prvním měsíci mi přišly 3 objednávky přes kontaktní formulář.',
    result: '+3 zakázky v 1. měsíci',
    initials: 'TN',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Petra Horáková',
    company: 'Kosmetické studio Petra',
    role: 'majitelka salonu',
    text: 'Čekala jsem, že to bude trvat týdny. Realita? Web jsem měla do druhého dne a vypadá líp než weby konkurence, za které platili 3× víc. Na Googlu jsem skočila na první stránku pro Brno.',
    result: 'Na 1. stránce Google v Brně',
    initials: 'PH',
    color: 'from-orange-400 to-amber-500',
  },
  {
    name: 'Martin Blaha',
    company: 'Blaha Účetnictví s.r.o.',
    role: 'ředitel',
    text: 'Žádné zbytečné schůzky, žádné čekání. Objednal jsem v pondělí ráno, v úterý jsem měl hotový web. To je přesně ten přístup, který u dodavatelů hledám.',
    result: 'Web spuštěn do 24 hodin',
    initials: 'MB',
    color: 'from-red-500 to-orange-500',
  },
];

export const faqs: FAQItem[] = [
  {
    question: 'Opravdu do 24 hodin? To není možné.',
    answer:
      'Je. Pracujeme přesně na to. Ráno obdržíme vaše podklady → do 2 hodin pošleme návrh → po schválení spustíme web. Standardní START a PROFI balíčky dodáváme do 24 hodin. BUSINESS balíček do 48 hodin. Pokud termín nedodržíme z naší strany, vracíme 100 % zálohy.',
  },
  {
    question: 'Co musím mít připraveno před začátkem?',
    answer:
      'Ideálně: logo, základní texty o firmě, pár fotek nebo ochota použít fotobanku. Pokud nemáte nic — nevadí. Pomůžeme s texty a doporučíme vizuály. Neblokujte projekt tím, že nemáte "vše připravené".',
  },
  {
    question: 'Proč jsou vaše ceny nižší než u jiných agentur?',
    answer:
      'Pracujeme efektivně — moderní technologie, jasné procesy, žádný nadbytečný overhead. Netočíme drahé prezentace, nechodíme na "strategické schůzky na kávě". Výsledek jde přímo k vám — rychle a za férovau cenu.',
  },
  {
    question: 'Mohu si web sám upravovat?',
    answer:
      'Ano. Předáváme správcovský přístup a video návod. Texty, fotky a základní obsah upravíte sami bez programování. Pro větší změny nabízíme měsíční péči.',
  },
  {
    question: 'Co je v ceně a co není?',
    answer:
      'V ceně je: design, vývoj, SEO nastavení, SSL, responzivita, spuštění a 30 dnů technické záruky. Není v ceně: doménové jméno (cca 250 Kč/rok) a webhosting (od 390 Kč/měs — nabízíme vlastní).',
  },
  {
    question: 'Jak funguje platba?',
    answer:
      '50 % záloha před zahájením, 50 % po schválení webu před spuštěním. Platba převodem nebo kartou online. Faktura do 24 hodin.',
  },
  {
    question: 'Děláte weby i mimo Prahu?',
    answer:
      'Pracujeme 100 % online — máme klienty po celé ČR. Veškerou komunikaci zvládneme přes email nebo Zoom. Lokalita nehraje roli.',
  },
  {
    question: 'Co se stane po spuštění?',
    answer:
      'Dostanete přístupy, video návod a 30 dnů záruky zdarma. Poté si vyberete plán péče (390 nebo 990 Kč/měs) nebo nás kontaktujete jednorázově dle potřeby.',
  },
  {
    question: 'Poskytujete e-shop?',
    answer:
      'Ano, e-shop je součástí balíčku BUSINESS (39 000 Kč po slevě). Pro menší katalogy produktů (do 50 položek) ho lze přidat i do PROFI balíčku za příplatek.',
  },
  {
    question: 'Je garantována záruka na výsledek?',
    answer:
      'Ano. Pokud nedodáme web v dohodnutém termínu — vracíme zálohu. Technické chyby opravujeme 30 dnů zdarma. Pokud s výsledkem nebudete spokojeni, pracujeme na úpravách bez příplatku.',
  },
  {
    question: 'Pomůžete mi s texty (copywriting)?',
    answer:
      'Copywriting klíčových stránek je zahrnutý v PROFI a BUSINESS. Kompletní texty pro celý web jsou dostupné jako doplněk (3 900 Kč). Na textu závisí výsledek webu — doporučujeme to neřešit svépomocí.',
  },
  {
    question: 'Optimalizujete web pro Google?',
    answer:
      'Základní technické SEO je standardem v každém balíčku. Pokročilá SEO strategie s keyword research a obsahovým plánem je součástí PROFI a BUSINESS nebo jako samostatná služba.',
  },
  {
    question: 'Jak se liší vaše práce od Wix nebo Webflow šablon?',
    answer:
      'Šablonovací nástroje jsou OK pro koníčky. Pro podnikání potřebujete web bez kompromisů — vlastní kód, plnou SEO kontrolu, rychlost a bezpečnost. A výsledek za 24 hodin — ne za "několik týdnů nastavování šablony".',
  },
  {
    question: 'Můžete web hostovat nebo ho dostanu k sobě?',
    answer:
      'Obojí. Nabízíme vlastní hosting optimalizovaný pro naše weby od 390 Kč/měs. Nebo web předáme na vámi zvolený server — bez příplatku.',
  },
  {
    question: 'Pro jaké firmy to není vhodné?',
    answer:
      'Nejsme správná volba pro: enterprise systémy s desítkami integrací, firmy hledající nejlevnější řešení bez ohledu na kvalitu, projekty kde klient nemá čas se vůbec zapojit do předání podkladů.',
  },
];
