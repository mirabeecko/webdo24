import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Obchodní podmínky — webdo24.cz',
  description: 'Obchodní podmínky společnosti Soterana Corp s.r.o. pro službu webdo24.cz.',
};

export default function ObchodniPodminkyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-black mb-2">Obchodní podmínky</h1>
        <p className="text-zinc-400 mb-12">Platné od 1. 1. 2025 · Soterana Corp s.r.o.</p>

        <div className="space-y-10 text-zinc-300 leading-relaxed">

          <section>
            <h2 className="text-xl font-black text-white mb-4">1. Základní údaje</h2>
            <p>
              Poskytovatelem služby je společnost <strong className="text-white">Soterana Corp s.r.o.</strong>,
              se sídlem v Praze, IČO: <strong className="text-white">14052326</strong>,
              zapsaná v obchodním rejstříku vedeném příslušným soudem.
            </p>
            <p className="mt-3">
              Kontakt: <a href="mailto:info@webdo24.cz" className="text-yellow-400 underline">info@webdo24.cz</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-4">2. Předmět smlouvy</h2>
            <p>
              Předmětem smlouvy je zhotovení webové stránky dle specifikace zadané zákazníkem
              (dále jen „web") prostřednictvím služby dostupné na adrese <strong className="text-white">webdo24.cz</strong>.
              Služba zahrnuje:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-zinc-400">
              <li>Návrh a zhotovení webové stránky na míru (žádná šablona)</li>
              <li>Hosting a SSL certifikát po dobu min. 12 měsíců od spuštění</li>
              <li>Vytvoření textového obsahu webu (copywriting)</li>
              <li>Základní SEO optimalizaci (meta tagy, sitemap, robots.txt)</li>
              <li>Plně responzivní design pro mobilní zařízení, tablety a počítače</li>
              <li>Napojení na vlastní doménu zákazníka</li>
              <li>Jedno opravné kolo (revize) po spuštění webu</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-4">3. Objednávka a uzavření smlouvy</h2>
            <p>
              Smlouva vzniká okamžikem přijetí platby od zákazníka. Zákazník odesláním objednávkového
              formuláře a provedením platby potvrzuje, že se seznámil s těmito obchodními podmínkami
              a souhlasí s nimi.
            </p>
            <p className="mt-3">
              Po přijetí platby obdrží zákazník na zadanou e-mailovou adresu potvrzení objednávky
              spolu s návrhem textů jednotlivých stránek webu. Zákazník je oprávněn návrh textů
              upravit a doplnit o případné požadavky.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-4">4. Cena a platební podmínky</h2>
            <p>
              Cena za zhotovení webu je sjednána jako pevná a zahrnuje veškeré níže uvedené položky.
              Zákazník hradí celou cenu předem, a to jedním z nabízených způsobů:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-zinc-400">
              <li>QR platbou přes mobilní bankovnictví</li>
              <li>Bankovním převodem na účet poskytovatele</li>
              <li>Rozdělenou platbou: první polovina před zahájením prací, druhá polovina po spuštění webu</li>
            </ul>
            <p className="mt-3">
              V případě rozdělené platby je zákazník povinen uhradit druhou část ceny do 7 dnů
              od předání hotového webu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-4">5. Termín dodání</h2>
            <p>
              Poskytovatel se zavazuje dodat hotový web do <strong className="text-white">24 hodin</strong> od
              potvrzení zadání zákazníkem. Potvrzením zadání se rozumí odeslání zpět upraveného návrhu
              textů spolu s případnými dalšími požadavky.
            </p>
            <p className="mt-3">
              Termín 24 hodin nezačíná běžet od okamžiku platby, ale od potvrzení zadání zákazníkem.
            </p>
            <p className="mt-3 text-zinc-400 text-sm">
              Logo a fotografie je zákazník povinen zaslat na adresu <strong className="text-white">podklady@webdo24.cz</strong> neprodleně
              po zaplacení. Pozdní dodání podkladů ze strany zákazníka může termín prodloužit.
              V takovém případě se zákazník nemůže domáhat vrácení platby z důvodu překročení termínu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-4">6. Garance vrácení peněz</h2>
            <p>
              Pokud poskytovatel nedodá web do 24 hodin od potvrzení zadání zákazníkem a toto zpoždění
              je výhradně na straně poskytovatele (tj. zákazník dodal veškeré podklady včas), zákazník
              má právo na vrácení celé uhrazené částky.
            </p>
            <p className="mt-3">
              Žádost o vrácení peněz musí zákazník zaslat e-mailem na <a href="mailto:info@webdo24.cz" className="text-yellow-400 underline">info@webdo24.cz</a> do 48 hodin
              od uplynutí sjednaného termínu. Platba bude vrácena do 5 pracovních dnů na účet,
              ze kterého byla provedena.
            </p>
            <p className="mt-3 text-zinc-400 text-sm">
              Garance se nevztahuje na: zpoždění způsobené pozdním dodáním podkladů (logo, fotky)
              ze strany zákazníka, případy vyšší moci, nebo situace kdy zákazník nereaguje na výzvy poskytovatele.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-4">7. Revize (opravné kolo)</h2>
            <p>
              Zákazník má nárok na jedno (1) kompletní opravné kolo po spuštění webu, a to zdarma.
              Opravné kolo zahrnuje libovolné úpravy textu, designu i funkcí webu.
            </p>
            <p className="mt-3">
              Žádost o revizi musí zákazník uplatnit do 14 dnů od spuštění webu zasláním e-mailu
              na <a href="mailto:info@webdo24.cz" className="text-yellow-400 underline">info@webdo24.cz</a> s popisem
              požadovaných změn.
            </p>
            <p className="mt-3 text-zinc-400 text-sm">
              Poskytovatel si vyhrazuje právo posoudit rozsah požadovaných změn. Pokud by změny
              fakticky znamenaly vytvoření zcela nového webu jiného druhu či zaměření,
              může poskytovatel navrhnout individuální cenu za jejich realizaci.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-4">8. Hosting</h2>
            <p>
              Hosting (provoz webu na serverech poskytovatele) je v ceně služby po dobu
              <strong className="text-white"> 12 měsíců</strong> od spuštění webu. Po uplynutí této doby
              bude zákazník kontaktován s nabídkou prodloužení hostingu, nebo mu bude umožněno
              web přenést na vlastní hosting.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-4">9. Práva duševního vlastnictví</h2>
            <p>
              Po uhrazení celé ceny přechází veškerá majetková práva k webu na zákazníka.
              Zákazník získává plná práva k použití, úpravám a šíření webu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-4">10. Ochrana osobních údajů</h2>
            <p>
              Zpracování osobních údajů se řídí Zásadami ochrany osobních údajů dostupnými na
              adrese <a href="/gdpr" className="text-yellow-400 underline">webdo24.cz/gdpr</a>.
              Zákazník souhlasí se zpracováním osobních údajů v rozsahu nezbytném pro plnění smlouvy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-4">11. Reklamace</h2>
            <p>
              Reklamace se podávají e-mailem na <a href="mailto:info@webdo24.cz" className="text-yellow-400 underline">info@webdo24.cz</a>.
              Poskytovatel se zavazuje vyřídit reklamaci do 30 dnů od jejího doručení.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-4">12. Závěrečná ustanovení</h2>
            <p>
              Tyto obchodní podmínky se řídí právním řádem České republiky. Veškeré spory
              budou řešeny příslušnými soudy České republiky.
            </p>
            <p className="mt-3">
              Poskytovatel si vyhrazuje právo tyto podmínky jednostranně změnit.
              Zákazníky budou změny oznámeny e-mailem nebo zveřejněním na webových stránkách.
            </p>
          </section>

          <div className="border-t border-zinc-800 pt-8 text-zinc-500 text-sm">
            <p>
              <strong className="text-zinc-300">Soterana Corp s.r.o.</strong><br />
              Praha, IČO: 14052326<br />
              E-mail: <a href="mailto:info@webdo24.cz" className="text-yellow-400 underline">info@webdo24.cz</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
