const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '../generated');
const TMP = path.resolve(__dirname, '../.tmp');

const sites = [
  { id: 'doktor', name: 'MUDr. Jana Novotná', sector: 'doktor', primary: '#1e5c8e', accent: '#e67e22', bg: '#f8fbff', icon: '🩺', headline: 'Moderní medicína s lidským přístupem', desc: 'Ordinace v centru Prahy. Prevence, diagnostika a komplexní péče pro celou rodinu.', services: ['Preventivní prohlídky','Očkování','EKG a ultrazvuk','Laboratorní vyšetření'] },
  { id: 'zubar', name: 'Dental Care Pro', sector: 'zubař', primary: '#0ea5e9', accent: '#06b6d4', bg: '#ecfeff', icon: '🦷', headline: 'Zdravý úsměv bez stresu', desc: 'Špičková stomatologie v příjemném prostředí. Bolestivé zákroky vždy v lokální anestezii.', services: ['Bělení zubů','Implantáty','Orthodoncie','Dětská stomatologie'] },
  { id: 'veterinar', name: 'VetPoint', sector: 'veterinář', primary: '#16a34a', accent: '#f59e0b', bg: '#f0fdf4', icon: '🐾', headline: 'Vaši mazlíčci jsou u nás v dobrých rukou', desc: 'Nonstop veterinární péče, chirurgie a pohotovost pro psy, kočky i exoty.', services: ['Očkování a čipování','Chirurgie','Rentgen a ultrazvuk','Nutriční poradenství'] },
  { id: 'truhlar', name: 'Dřevořez Truhlářství', sector: 'truhlář', primary: '#92400e', accent: '#d97706', bg: '#fffbeb', icon: '🪚', headline: 'Nábytek z masivu na míru', desc: 'Vyrábíme kuchyně, schodiště a interiéry z kvalitního dřeva. Truhlářská tradice od roku 1998.', services: ['Kuchyně na míru','Schodiště','Vestavěné skříně','Renovace nábytku'] },
  { id: 'instalater', name: 'Vodoinstalace Procházka', sector: 'instalatér', primary: '#2563eb', accent: '#dc2626', bg: '#eff6ff', icon: '🔧', headline: 'Havárie řešíme do 30 minut', desc: 'Nonstop vodoinstalatérské služby v Praze a okolí. Topení, rekonstrukce a čištění odpadů.', services: ['Havárie 24/7','Topenářské práce','Rekonstrukce koupelen','Čištění kanalizace'] },
  { id: 'elektrikar', name: 'Elektro Služby Praha', sector: 'elektrikář', primary: '#f59e0b', accent: '#1f2937', bg: '#fffbeb', icon: '⚡', headline: 'Bezpečná elektroinstalace', desc: 'Revize, montáže a inteligentní elektroinstalace pro byty, domy i firmy.', services: ['Elektrorevize','Nové rozvody','Hromosvody','Smart home'] },
  { id: 'autoservis', name: 'AutoMax Servis', sector: 'autoservis', primary: '#dc2626', accent: '#1f2937', bg: '#fef2f2', icon: '🚗', headline: 'Servis, kterému můžete věřit', desc: 'Kompletní péče o váš vůz. Diagnostika, opravy, pneuservis a příprava na STK.', services: ['STK a emise','Pneuservis','Diagnostika motoru','Karosářské práce'] },
  { id: 'stavebni', name: 'Stavby Klasik', sector: 'stavební firma', primary: '#475569', accent: '#ea580c', bg: '#f8fafc', icon: '🏗️', headline: 'Stavíme domy, ve kterých žijete', desc: 'Rodinné domy na klíč, rekonstrukce a zateplení. Kvalita, termín a férová cena.', services: ['Rodinné domy','Rekonstrukce','Zateplení fasád','Základové desky'] },
  { id: 'architekt', name: 'Studio Arch', sector: 'architekt', primary: '#111827', accent: '#a855f7', bg: '#faf5ff', icon: '🏛️', headline: 'Architektura s respektem k detailu', desc: 'Navrhujeme interiéry a rodinné domy, které odrážejí váš životní styl.', services: ['Návrhy interiérů','Projekty domů','3D vizualizace','Autorský dozor'] },
  { id: 'reklamka', name: 'Creatix Agency', sector: 'reklamka', primary: '#db2777', accent: '#7c3aed', bg: '#fdf2f8', icon: '🚀', headline: 'Značky, které si lidé zapamatují', desc: 'Branding, webdesign a marketingová strategie pro firmy, které chtějí růst.', services: ['Branding','Webdesign','Sociální sítě','Video produkce'] },
  { id: 'grafik', name: 'Pixel Perfect', sector: 'grafik', primary: '#4f46e5', accent: '#ec4899', bg: '#eef2ff', icon: '🎨', headline: 'Design, který prodává', desc: 'Logo, tiskoviny a digitální grafika. Tvoříme vizuální identity, které vynikají.', services: ['Logo a identita','Tiskoviny','Ilustrace','UI design'] },
  { id: 'fotbal', name: 'FK Slavia Město', sector: 'fotbalový klub', primary: '#b91c1c', accent: '#facc15', bg: '#fef2f2', icon: '⚽', headline: 'Společně za vítězstvím', desc: 'Oficiální web klubu. Rozpis zápasů, výsledky, novinky a informace pro fanoušky.', services: ['A-tým','Mládežnické týmy','Rozpis zápasů','Fan-shop'] },
  { id: 'spolek', name: 'Spolek Rodiče dětem', sector: 'spolkový web', primary: '#0891b2', accent: '#f97316', bg: '#ecfeff', icon: '🤝', headline: 'Pomáháme dětem růst', desc: 'Organizujeme akce, výlety a dobrovolnické aktivity pro rodiny z našeho města.', services: ['Akce pro děti','Fotogalerie','Dobrovolnictví','Kalendář akcí'] },
  { id: 'kadernictvi', name: 'Salon Elegant', sector: 'kadeřnictví', primary: '#be185d', accent: '#f472b6', bg: '#fdf2f8', icon: '💇‍♀️', headline: 'Krása, která vás pohladí', desc: 'Kadeřnický a kosmetický salon v centru. Střihy, barvení a svatební účesy.', services: ['Dámské i pánské střihy','Barvení a melíry','Svatební účesy','Vlasová péče'] },
  { id: 'kosmetika', name: 'Beauty Lounge', sector: 'kosmetika', primary: '#9333ea', accent: '#fbbf24', bg: '#faf5ff', icon: '✨', headline: 'Relaxujte a nechte se rozmazlovat', desc: 'Kosmetické ošetření, masáže a manikúra v luxusním prostředí. Online rezervace.', services: ['Pleťová kosmetika','Masáže','Manikúra a pedikúra','Rezervace online'] },
  { id: 'restaurace', name: 'Bistro U Dvou koček', sector: 'restaurace', primary: '#15803d', accent: '#b45309', bg: '#f0fdf4', icon: '🍽️', headline: 'Čerstvá sezónní kuchyně', desc: 'Denní menu, kvalitní suroviny a příjemné prostředí. Rezervujte si stůl online.', services: ['Denní menu','Rezervace stolů','Catering','Rozvoz jídla'] },
  { id: 'kavarna', name: 'Café Moment', sector: 'kavárna', primary: '#78350f', accent: '#d97706', bg: '#fffbeb', icon: '☕', headline: 'Káva, která zastaví čas', desc: 'Speciality coffee, domácí dezerty a klidné prostředí pro práci i schůzku.', services: ['Speciality coffee','Domácí dezerty','Práce z kavárny','Kulturní akce'] },
  { id: 'pravnik', name: 'JUDr. Karel Svoboda', sector: 'právník', primary: '#1e3a8a', accent: '#c2410c', bg: '#eff6ff', icon: '⚖️', headline: 'Právní pomoc, na kterou se spolehnete', desc: 'Občanské, obchodní a pracovní právo. Smlouvy, spory a konzultace.', services: ['Občanské právo','Podnikatelské právo','Nemovitosti','Smlouvy na míru'] },
  { id: 'ucetni', name: 'Účetnictví Plus', sector: 'účetní', primary: '#0f766e', accent: '#f59e0b', bg: '#f0fdfa', icon: '📊', headline: 'Pořádek v účetnictví', desc: 'Kompletní vedení účetnictví, mezd a DPH pro živnostníky a malé firmy.', services: ['Podvojné účetnictví','Mzdy a personalistika','DPH a daňová přiznání','Poradenství'] },
  { id: 'eshop', name: 'NatureShop.cz', sector: 'e-shop', primary: '#059669', accent: '#10b981', bg: '#ecfdf5', icon: '🛒', headline: 'Přírodní produkty pro zdravý život', desc: 'Doplňky stravy, bio kosmetika a ekologické produkty. Doprava zdarma nad 1 500 Kč.', services: ['Přírodní doplňky','Bio kosmetika','Ekologické produkty','Doprava zdarma'] },
  { id: 'prodejna', name: 'Květiny Flora', sector: 'prodejna', primary: '#db2777', accent: '#84cc16', bg: '#fdf2f8', icon: '🌸', headline: 'Květiny pro každou příležitost', desc: 'Svatební výzdoba, kytice a pokojové rostliny. Rozvoz po městě do 2 hodin.', services: ['Kytice na objednávku','Svatební výzdoba','Pokojové rostliny','Rozvoz květin'] },
  { id: 'fitness', name: 'FitZone', sector: 'fitness', primary: '#ea580c', accent: '#16a34a', bg: '#fff7ed', icon: '💪', headline: 'Posuňte své hranice', desc: 'Moderní fitness centrum s osobními trenéry a skupinovými lekcemi. Přijďte na zkoušku.', services: ['Posilovna','Skupinové lekce','Osobní trenéři','Sauna a wellness'] },
  { id: 'skola', name: 'Jazyková škola Lingua', sector: 'škola', primary: '#4f46e5', accent: '#f59e0b', bg: '#eef2ff', icon: '🎓', headline: 'Naučte se jazyky s radostí', desc: 'Angličtina, němčina a další jazyky pro dospělé i děti. Online i prezenčně.', services: ['Angličtina','Němčina','Online kurzy','Příprava na zkoušky'] },
  { id: 'ubytovani', name: 'Penzion U Lesa', sector: 'ubytování', primary: '#166534', accent: '#fde047', bg: '#f0fdf4', icon: '🏡', headline: 'Odpočinek v přírodě', desc: 'Rodinný penzion s vlastní zahradou a snídaní. Ideální pro rodiny i cyklisty.', services: ['Pohodlné ubytování','Snídaně v ceně','Tipy na výlety','Online rezervace'] },
];

function photo(seed, w, h) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

function pattern() {
  return `url('data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.06"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/svg%3E')`;
}

function render(s) {
  const { primary, accent, bg, id, name, sector, icon, headline, desc, services } = s;
  const text = '#0f172a';
  const soft = '#475569';

  const heroBg = `linear-gradient(135deg,${primary} 0%,${accent} 100%)`;
  const pageBg = `linear-gradient(180deg,${bg} 0%,#ffffff 100%)`;

  const nav = `
    <nav style="display:flex;align-items:center;justify-content:space-between;padding:1rem 2rem;background:rgba(255,255,255,.95);backdrop-filter:blur(8px);box-shadow:0 2px 10px rgba(0,0,0,.05);position:sticky;top:0;z-index:100">
      <div style="font-size:1.2rem;font-weight:900;color:${primary};display:flex;align-items:center;gap:.5rem"><span style="font-size:1.4rem">${icon}</span> ${name}</div>
      <div style="display:flex;gap:1.25rem;font-size:.85rem;font-weight:700;color:${soft}">
        <span>Služby</span><span>Reference</span><span>Kontakt</span>
      </div>
    </nav>`;

  const btn = (label, color = accent) => `<a style="display:inline-flex;align-items:center;gap:.5rem;padding:.9rem 1.75rem;border-radius:999px;background:${color};color:#fff;font-weight:800;text-decoration:none;box-shadow:0 10px 28px -6px rgba(0,0,0,.25)">${label}</a>`;

  const serviceCards = services.map((svc, i) => `
    <div style="background:#fff;border-radius:1rem;padding:1.25rem;box-shadow:0 8px 24px rgba(0,0,0,.08);border-top:4px solid ${accent};display:flex;flex-direction:column;gap:.5rem">
      <div style="width:100%;height:120px;border-radius:.75rem;overflow:hidden;margin-bottom:.25rem">
        <img src="${photo(`${id}-svc-${i}`, 320, 160)}" style="width:100%;height:100%;object-fit:cover">
      </div>
      <div style="font-weight:800;color:${text};font-size:1rem">${svc}</div>
      <div style="font-size:.8rem;color:${soft};line-height:1.4">Profesionální přístup, férové ceny a spokojení klienti po celém regionu.</div>
    </div>`).join('');

  const hero = `
    <header style="min-height:75vh;display:grid;grid-template-columns:1.1fr .9fr;gap:3rem;padding:4rem 2rem;align-items:center;background:${heroBg};color:#fff;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background:${pattern()}"></div>
      <div style="position:relative;z-index:1">
        <div style="font-size:2.8rem;margin-bottom:.75rem">${icon}</div>
        <h1 style="font-size:2.8rem;font-weight:900;margin-bottom:1rem;line-height:1.1">${headline}</h1>
        <p style="font-size:1.1rem;opacity:.9;margin-bottom:1.75rem;max-width:520px">${desc}</p>
        ${btn('Nezávazná poptávka')}
        <div style="display:flex;gap:1.5rem;margin-top:2rem;font-size:.85rem;opacity:.85">
          <span>✓ 10+ let zkušeností</span><span>✓ Rychlé termíny</span><span>✓ Spokojení klienti</span>
        </div>
      </div>
      <div style="position:relative;z-index:1;border-radius:1.25rem;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,.25);height:420px">
        <img src="${photo(`${id}-hero`, 700, 500)}" style="width:100%;height:100%;object-fit:cover">
      </div>
    </header>`;

  const servicesSec = `
    <section style="padding:4rem 2rem;background:${pageBg}">
      <div style="text-align:center;margin-bottom:2.5rem">
        <h2 style="font-size:1.9rem;font-weight:900;color:${text}">Naše služby</h2>
        <p style="color:${soft};margin-top:.5rem">Co vám můžeme nabídnout</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem;max-width:1000px;margin:0 auto">
        ${serviceCards}
      </div>
    </section>`;

  const about = `
    <section style="padding:4rem 2rem;background:#fff">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;max-width:1000px;margin:0 auto;align-items:center">
        <div style="border-radius:1.25rem;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.12);height:320px">
          <img src="${photo(`${id}-about`, 600, 400)}" style="width:100%;height:100%;object-fit:cover">
        </div>
        <div>
          <h2 style="font-size:1.9rem;font-weight:900;color:${text};margin-bottom:1rem">Proč si vybrat právě nás?</h2>
          <p style="color:${soft};margin-bottom:1rem;line-height:1.6">Specializujeme se na ${sector} a klademe důraz na kvalitu, transparentnost a individuální přístup ke každému klientovi.</p>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.6rem;color:${text};font-weight:600">
            <li>✓ Osobní konzultace zdarma</li>
            <li>✓ Jasné ceny bez skrytých poplatků</li>
            <li>✓ Rychlé dodání a záruka kvality</li>
          </ul>
        </div>
      </div>
    </section>`;

  const gallery = `
    <section style="padding:4rem 2rem;background:${pageBg}">
      <div style="text-align:center;margin-bottom:2rem">
        <h2 style="font-size:1.9rem;font-weight:900;color:${text}">Ukázky naší práce</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;max-width:1000px;margin:0 auto">
        <img src="${photo(`${id}-g1`, 340, 260)}" style="width:100%;height:180px;object-fit:cover;border-radius:.75rem;box-shadow:0 8px 20px rgba(0,0,0,.1)">
        <img src="${photo(`${id}-g2`, 340, 260)}" style="width:100%;height:180px;object-fit:cover;border-radius:.75rem;box-shadow:0 8px 20px rgba(0,0,0,.1)">
        <img src="${photo(`${id}-g3`, 340, 260)}" style="width:100%;height:180px;object-fit:cover;border-radius:.75rem;box-shadow:0 8px 20px rgba(0,0,0,.1)">
        <img src="${photo(`${id}-g4`, 340, 260)}" style="width:100%;height:180px;object-fit:cover;border-radius:.75rem;box-shadow:0 8px 20px rgba(0,0,0,.1)">
        <img src="${photo(`${id}-g5`, 340, 260)}" style="width:100%;height:180px;object-fit:cover;border-radius:.75rem;box-shadow:0 8px 20px rgba(0,0,0,.1)">
        <img src="${photo(`${id}-g6`, 340, 260)}" style="width:100%;height:180px;object-fit:cover;border-radius:.75rem;box-shadow:0 8px 20px rgba(0,0,0,.1)">
      </div>
    </section>`;

  const contact = `
    <section style="padding:4rem 2rem;background:${pageBg}">
      <div style="display:grid;grid-template-columns:1.1fr .9fr;gap:2rem;max-width:1000px;margin:0 auto;align-items:stretch">
        <div style="background:#fff;border-radius:1.25rem;padding:2rem;box-shadow:0 10px 30px rgba(0,0,0,.08)">
          <h2 style="font-size:1.7rem;font-weight:900;color:${text};margin-bottom:1.25rem">Kontaktujte nás</h2>
          <div style="display:flex;flex-direction:column;gap:1rem;color:${soft};font-size:.95rem">
            <div><strong style="color:${text}">Adresa:</strong> Hlavní 123, Praha 1</div>
            <div><strong style="color:${text}">Telefon:</strong> +420 123 456 789</div>
            <div><strong style="color:${text}">E-mail:</strong> info@${id}.cz</div>
            <div><strong style="color:${text}">Otevírací doba:</strong> Po–Pá 8–18 hod.</div>
          </div>
          <div style="margin-top:1.5rem">${btn('Napište nám', primary)}</div>
        </div>
        <div style="border-radius:1.25rem;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.08);background:#e2e8f0;position:relative">
          <img src="${photo(`${id}-map`, 500, 400)}" style="width:100%;height:100%;object-fit:cover;opacity:.8">
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
            <div style="background:${accent};color:#fff;padding:.5rem 1rem;border-radius:999px;font-weight:800;box-shadow:0 4px 12px rgba(0,0,0,.2)">📍 Jsme tady</div>
          </div>
        </div>
      </div>
    </section>`;

  const footer = `
    <footer style="background:${text};color:#fff;padding:2.5rem 2rem;text-align:center">
      <div style="font-size:1.2rem;font-weight:900;margin-bottom:.5rem">${name}</div>
      <div style="opacity:.7;font-size:.85rem">${sector} · info@${id}.cz · +420 123 456 789</div>
    </footer>`;

  const content = nav + hero + servicesSec + about + gallery + contact + footer;

  return `<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name}</title>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;900&display=swap" rel="stylesheet">
<style>body{margin:0;font-family:'Outfit',sans-serif;color:${text};background:${pageBg}}*{box-sizing:border-box}img{max-width:100%;display:block}</style>
</head>
<body>${content}</body>
</html>`;
}

async function run() {
  fs.mkdirSync(TMP, { recursive: true });
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  for (const s of sites) {
    const html = render(s);
    const file = path.join(TMP, `${s.id}.html`);
    fs.writeFileSync(file, html);

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 });
    await page.goto('file://' + file, { waitUntil: 'networkidle0', timeout: 120000 });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUT, `${s.id}.png`), clip: { x: 0, y: 0, width: 1200, height: 900 } });
    await page.close();
    console.log('Generated', s.id);
  }

  await browser.close();
}

run().catch(console.error);
