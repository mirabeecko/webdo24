import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ochrana osobních údajů (GDPR) — webdo24.cz',
  description: 'Zásady ochrany osobních údajů společnosti Soterana Corp s.r.o. dle nařízení GDPR a zákona č. 110/2019 Sb.',
  robots: { index: true, follow: true },
};

export default function GdprPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-black mb-2">Ochrana osobních údajů</h1>
        <p className="text-zinc-400 mb-2">
          Zásady zpracování osobních údajů dle nařízení EU 2016/679 (GDPR)
          a zákona č. 110/2019 Sb., o zpracování osobních údajů.
        </p>
        <p className="text-zinc-500 text-sm mb-12">Platné od 1. 1. 2025 · Naposledy aktualizováno: 29. 3. 2025</p>

        <div className="space-y-10 text-zinc-300 leading-relaxed">

          {/* 1. Správce */}
          <section>
            <h2 className="text-xl font-black text-white mb-4">1. Správce osobních údajů</h2>
            <p>Správcem vašich osobních údajů je:</p>
            <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-sm space-y-1">
              <p><strong className="text-white">Soterana Corp s.r.o.</strong></p>
              <p>Sídlo: Praha, Česká republika</p>
              <p>IČO: <strong className="text-white">14052326</strong></p>
              <p>
                E-mail:{' '}
                <a href="mailto:info@webdo24.cz" className="text-yellow-400 underline">
                  info@webdo24.cz
                </a>
              </p>
              <p>Web: webdo24.cz</p>
            </div>
            <p className="mt-3 text-zinc-400 text-sm">
              Společnost není povinna jmenovat pověřence pro ochranu osobních údajů (DPO),
              neboť neprovádí rozsáhlé systematické zpracování zvláštních kategorií osobních údajů
              ani sledování osob ve velkém měřítku.
            </p>
          </section>

          {/* 2. Jaké údaje zpracováváme */}
          <section>
            <h2 className="text-xl font-black text-white mb-4">2. Jaké osobní údaje zpracováváme</h2>
            <p>V závislosti na způsobu, jakým s námi komunikujete, zpracováváme tyto kategorie osobních údajů:</p>

            <div className="mt-4 space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <p className="text-white font-bold mb-2">Identifikační a kontaktní údaje</p>
                <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                  <li>Jméno a příjmení</li>
                  <li>E-mailová adresa</li>
                  <li>Telefonní číslo</li>
                  <li>Název firmy / IČO (volitelně)</li>
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <p className="text-white font-bold mb-2">Údaje k zakázce</p>
                <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                  <li>Popis podnikatelské činnosti a požadavků na web</li>
                  <li>Preferovaný vizuální styl a inspirace</li>
                  <li>Informace o dostupných podkladech (logo, texty, fotografie)</li>
                  <li>Poznámky a další sdělení v rámci objednávky</li>
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <p className="text-white font-bold mb-2">Platební a transakční údaje</p>
                <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                  <li>Informace o provedené platbě (výše, datum, způsob)</li>
                  <li>Variabilní symbol</li>
                  <li>
                    Číslo platební karty <strong className="text-white">nezpracováváme</strong> —
                    platby kartou probíhají výhradně přes Stripe (viz bod 5)
                  </li>
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <p className="text-white font-bold mb-2">Technické a analytické údaje</p>
                <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                  <li>IP adresa a typ prohlížeče (anonymizovaně přes Google Analytics)</li>
                  <li>Stránky navštívené na webu, délka návštěvy, zdroj přístupu</li>
                  <li>Soubory cookie (viz bod 7)</li>
                </ul>
              </div>
            </div>

            <p className="mt-4 text-zinc-400 text-sm">
              Nezpracováváme žádné zvláštní kategorie osobních údajů (tzv. citlivé údaje) ve smyslu
              čl. 9 GDPR — tedy údaje o zdraví, rase, náboženství, politických názorech apod.
            </p>
          </section>

          {/* 3. Účely a právní základ */}
          <section>
            <h2 className="text-xl font-black text-white mb-4">3. Účely zpracování a právní základ</h2>
            <div className="space-y-4">
              {[
                {
                  ucel: 'Plnění smlouvy — realizace objednávky',
                  popis: 'Zpracování objednávky, komunikace v průběhu realizace webu, předání hotového díla.',
                  zaklad: 'Čl. 6 odst. 1 písm. b) GDPR — plnění smlouvy',
                  doba: 'Po dobu trvání smluvního vztahu a 3 roky po jeho skončení.',
                },
                {
                  ucel: 'Plnění zákonných povinností',
                  popis: 'Vedení účetní evidence, vydávání daňových dokladů, plnění povinností dle zákona o účetnictví a daňových předpisů.',
                  zaklad: 'Čl. 6 odst. 1 písm. c) GDPR — plnění právní povinnosti',
                  doba: '10 let od konce zdaňovacího období (zákon o účetnictví).',
                },
                {
                  ucel: 'Oprávněný zájem — ochrana práv a nároků',
                  popis: 'Uplatňování nebo obhajoba právních nároků v případě sporu.',
                  zaklad: 'Čl. 6 odst. 1 písm. f) GDPR — oprávněný zájem správce',
                  doba: 'Po dobu promlčecí lhůty (zpravidla 3 roky).',
                },
                {
                  ucel: 'Analytika a zlepšování webu',
                  popis: 'Anonymizované sledování návštěvnosti prostřednictvím Google Analytics za účelem zlepšení obsahu a funkčnosti webu.',
                  zaklad: 'Čl. 6 odst. 1 písm. f) GDPR — oprávněný zájem správce',
                  doba: 'Data jsou anonymizována; syrová data v Google Analytics se uchovávají 14 měsíců.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <p className="text-white font-bold mb-2">{item.ucel}</p>
                  <p className="text-zinc-400 text-sm mb-2">{item.popis}</p>
                  <p className="text-xs">
                    <span className="text-yellow-400 font-semibold">Právní základ: </span>
                    <span className="text-zinc-300">{item.zaklad}</span>
                  </p>
                  <p className="text-xs mt-1">
                    <span className="text-yellow-400 font-semibold">Doba uchování: </span>
                    <span className="text-zinc-300">{item.doba}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Příjemci */}
          <section>
            <h2 className="text-xl font-black text-white mb-4">4. Příjemci osobních údajů</h2>
            <p>
              Vaše osobní údaje neprodáváme ani neposkytujeme třetím stranám pro marketingové účely.
              Předáváme je pouze v nezbytném rozsahu těmto zpracovatelům a příjemcům:
            </p>
            <div className="mt-4 space-y-3">
              {[
                {
                  nazev: 'Stripe, Inc.',
                  popis: 'Zpracování plateb kartou. Sídlo: USA. Stripe je certifikován dle PCI DSS Level 1.',
                  link: 'https://stripe.com/en-cz/privacy',
                  linkLabel: 'Zásady ochrany soukromí Stripe',
                  dpa: 'Standardní smluvní doložky EU (SCC).',
                },
                {
                  nazev: 'Supabase, Inc.',
                  popis: 'Databázové úložiště objednávek a zákaznických dat. Servery v EU (Frankfurt).',
                  link: 'https://supabase.com/privacy',
                  linkLabel: 'Zásady ochrany soukromí Supabase',
                  dpa: 'DPA uzavřena, servery v EU.',
                },
                {
                  nazev: 'Vercel, Inc.',
                  popis: 'Hosting webové aplikace. Zpracování technických dat (IP adresy, logy). Servery v EU.',
                  link: 'https://vercel.com/legal/privacy-policy',
                  linkLabel: 'Zásady ochrany soukromí Vercel',
                  dpa: 'DPA uzavřena.',
                },
                {
                  nazev: 'Google LLC (Google Analytics)',
                  popis: 'Anonymizovaná analytika návštěvnosti. IP adresy jsou anonymizovány před odesláním do USA.',
                  link: 'https://policies.google.com/privacy',
                  linkLabel: 'Zásady ochrany soukromí Google',
                  dpa: 'Standardní smluvní doložky EU (SCC).',
                },
              ].map((p, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <p className="text-white font-bold mb-1">{p.nazev}</p>
                  <p className="text-zinc-400 text-sm mb-1">{p.popis}</p>
                  <p className="text-xs text-zinc-500">Přenos do třetích zemí: {p.dpa}</p>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-yellow-400 underline mt-1 inline-block"
                  >
                    {p.linkLabel} ↗
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Přenos do třetích zemí */}
          <section>
            <h2 className="text-xl font-black text-white mb-4">5. Přenos osobních údajů do třetích zemí</h2>
            <p>
              Někteří zpracovatelé (Stripe, Google) mají sídlo v USA, které není považováno
              za třetí zemi s odpovídající úrovní ochrany dle GDPR. Přenosy jsou zabezpečeny
              prostřednictvím <strong className="text-white">standardních smluvních doložek (SCC)</strong> schválených
              Evropskou komisí dle čl. 46 odst. 2 písm. c) GDPR.
            </p>
            <p className="mt-3 text-zinc-400 text-sm">
              Supabase a Vercel provozují servery v Evropské unii (Frankfurt), přenos osobních
              dat proto neprobíhá mimo EHP.
            </p>
          </section>

          {/* 6. Vaše práva */}
          <section>
            <h2 className="text-xl font-black text-white mb-4">6. Vaše práva jako subjektu údajů</h2>
            <p>
              Jako subjekt údajů máte dle GDPR (čl. 15–22) tato práva:
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  pravo: 'Právo na přístup (čl. 15)',
                  popis: 'Máte právo získat potvrzení, zda zpracováváme vaše osobní údaje, a přístup k nim včetně informací o účelech, kategoriích, příjemcích a době uchování.',
                },
                {
                  pravo: 'Právo na opravu (čl. 16)',
                  popis: 'Máte právo na opravu nepřesných nebo doplnění neúplných osobních údajů, které o vás zpracováváme.',
                },
                {
                  pravo: 'Právo na výmaz (čl. 17)',
                  popis: 'Máte právo požádat o vymazání vašich osobních údajů, pokud již nejsou potřebné pro účel, pro který byly shromážděny, nebo pokud jste odvolali souhlas.',
                },
                {
                  pravo: 'Právo na omezení zpracování (čl. 18)',
                  popis: 'Máte právo požádat o omezení zpracování vašich údajů v případech stanovených zákonem (např. po dobu vyřizování námitky).',
                },
                {
                  pravo: 'Právo na přenositelnost (čl. 20)',
                  popis: 'Máte právo obdržet osobní údaje, které jste nám poskytli, ve strukturovaném, strojově čitelném formátu a předat je jinému správci.',
                },
                {
                  pravo: 'Právo vznést námitku (čl. 21)',
                  popis: 'Máte právo vznést námitku proti zpracování vašich osobních údajů, které provádíme na základě oprávněného zájmu. Zpracování ukončíme, pokud neprokážeme závažné oprávněné důvody.',
                },
                {
                  pravo: 'Právo odvolat souhlas',
                  popis: 'Pokud je zpracování založeno na vašem souhlasu, máte právo tento souhlas kdykoliv odvolat, aniž by tím byla dotčena zákonnost zpracování před odvoláním.',
                },
                {
                  pravo: 'Právo podat stížnost (čl. 77)',
                  popis: 'Máte právo podat stížnost u dozorového úřadu, zejména v členském státě svého obvyklého bydliště, místa výkonu zaměstnání nebo místa, kde došlo k údajnému porušení.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <p className="text-yellow-400 font-bold text-sm mb-1">{item.pravo}</p>
                  <p className="text-zinc-400 text-xs leading-relaxed">{item.popis}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-5">
              <p className="text-yellow-400 font-black mb-2">Jak uplatnit svá práva</p>
              <p className="text-zinc-300 text-sm">
                Žádost o uplatnění práva zasílejte e-mailem na{' '}
                <a href="mailto:info@webdo24.cz" className="text-yellow-400 underline">
                  info@webdo24.cz
                </a>{' '}
                s předmětem „GDPR — [typ žádosti]". Na žádost odpovíme do{' '}
                <strong className="text-white">30 dnů</strong> od jejího obdržení.
                Ve složitých případech lze lhůtu prodloužit o dalších 60 dnů — o tom vás
                budeme informovat.
              </p>
              <p className="text-zinc-400 text-xs mt-2">
                Za účelem ověření totožnosti žadatele si vyhrazujeme právo požádat o doplňující informace.
              </p>
            </div>
          </section>

          {/* 7. Dozorový úřad */}
          <section>
            <h2 className="text-xl font-black text-white mb-4">7. Dozorový úřad</h2>
            <p>
              Dozorový úřad pro ochranu osobních údajů v České republice je:
            </p>
            <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-sm space-y-1">
              <p className="text-white font-bold">Úřad pro ochranu osobních údajů (ÚOOÚ)</p>
              <p>Pplk. Sochora 727/27, 170 00 Praha 7 — Holešovice</p>
              <p>
                Web:{' '}
                <a
                  href="https://www.uoou.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 underline"
                >
                  www.uoou.cz ↗
                </a>
              </p>
              <p>
                Datová schránka: qkbaa2n
              </p>
            </div>
            <p className="mt-3 text-zinc-400 text-sm">
              Doporučujeme, abyste se v případě nespokojenosti obrátili nejprve na nás —
              většinu záležitostí jsme schopni vyřešit rychle a bez zbytečné byrokracie.
            </p>
          </section>

          {/* 8. Cookies */}
          <section>
            <h2 className="text-xl font-black text-white mb-4">8. Soubory cookie</h2>
            <p>
              Náš web používá soubory cookie. Rozlišujeme tyto kategorie:
            </p>
            <div className="mt-4 space-y-3">
              {[
                {
                  typ: 'Nezbytné cookie',
                  popis: 'Technické soubory cookie nezbytné pro fungování webu (např. zapamatování časovače speciální nabídky). Tyto cookie nelze odmítnout, neboť bez nich web nefunguje správně.',
                  zaklad: 'Oprávněný zájem / technická nezbytnost',
                  doba: 'Do konce relace nebo max. 30 dnů.',
                },
                {
                  typ: 'Analytické cookie (Google Analytics)',
                  popis: 'Anonymizované sledování chování návštěvníků za účelem zlepšení webu. IP adresy jsou anonymizovány. Data nejsou propojována s vaší identitou.',
                  zaklad: 'Oprávněný zájem správce',
                  doba: '14 měsíců (nastavení Google Analytics).',
                },
              ].map((c, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <p className="text-white font-bold mb-1">{c.typ}</p>
                  <p className="text-zinc-400 text-sm mb-2">{c.popis}</p>
                  <p className="text-xs">
                    <span className="text-yellow-400 font-semibold">Právní základ: </span>
                    <span className="text-zinc-300">{c.zaklad}</span>
                  </p>
                  <p className="text-xs mt-1">
                    <span className="text-yellow-400 font-semibold">Doba uchování: </span>
                    <span className="text-zinc-300">{c.doba}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-zinc-400 text-sm">
              Soubory cookie můžete spravovat nebo blokovat v nastavení svého prohlížeče.
              Upozorňujeme, že blokování některých cookie může ovlivnit funkčnost webu.
            </p>
          </section>

          {/* 9. Zabezpečení */}
          <section>
            <h2 className="text-xl font-black text-white mb-4">9. Zabezpečení osobních údajů</h2>
            <p>
              Přijímáme technická a organizační opatření k ochraně vašich osobních údajů před
              neoprávněným přístupem, ztrátou nebo zneužitím:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-zinc-400 text-sm">
              <li>Veškerá komunikace probíhá přes šifrované HTTPS spojení (TLS)</li>
              <li>Platby kartou zpracovává výhradně Stripe (PCI DSS Level 1 certifikace)</li>
              <li>Databáze je chráněna Row Level Security a přístup mají pouze oprávněné osoby</li>
              <li>Přístupy do systémů jsou chráněny silnými hesly a dvoufaktorovým ověřením</li>
              <li>Zpracovatelé jsou smluvně vázáni k zachování důvěrnosti a přiměřenému zabezpečení</li>
            </ul>
          </section>

          {/* 10. Automatizované rozhodování */}
          <section>
            <h2 className="text-xl font-black text-white mb-4">10. Automatizované rozhodování a profilování</h2>
            <p>
              Neprovádíme automatizované rozhodování ve smyslu čl. 22 GDPR, které by mělo
              pro vás právní nebo obdobné závažné účinky. Rovněž neprovádíme profilování
              pro účely cíleného marketingu.
            </p>
          </section>

          {/* 11. Změny */}
          <section>
            <h2 className="text-xl font-black text-white mb-4">11. Změny těchto zásad</h2>
            <p>
              Tyto zásady ochrany osobních údajů můžeme příležitostně aktualizovat.
              O podstatných změnách vás informujeme e-mailem nebo výrazným oznámením na webu.
              Datum poslední aktualizace je uveden v záhlaví tohoto dokumentu.
            </p>
          </section>

          {/* Kontakt */}
          <div className="border-t border-zinc-800 pt-8 text-zinc-500 text-sm">
            <p>
              <strong className="text-zinc-300">Soterana Corp s.r.o.</strong><br />
              Praha, IČO: 14052326<br />
              E-mail:{' '}
              <a href="mailto:info@webdo24.cz" className="text-yellow-400 underline">
                info@webdo24.cz
              </a>
              {' '}(předmět: „GDPR — [typ žádosti]")
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
