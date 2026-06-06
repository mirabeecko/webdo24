# SEO & Optimalizace — WebDo24.cz
## Co bylo implementováno (červen 2026)

### Provedené změny

**Všechny stránky (index, model-start, model-business, model-automation):**
- Přidán `<link rel="canonical">` — zabraňuje duplicate content problémům
- Přidány Twitter Card meta tagy — správné zobrazení při sdílení na X/Twitter
- Přidán `og:image` meta tag — správné zobrazení při sdílení na Facebooku/LinkedInu
- Přidán `<meta name="robots" content="index, follow">`

**index.html — JSON-LD Schema.org:**
- `Organization` schema (název, telefon, email, hodnocení, otevírací doba)
- `WebSite` schema
- `WebPage` schema
- `ItemList` schema se všemi 3 produkty (ceny, dostupnost, URL)
- `FAQPage` schema (7 otázek a odpovědí → zobrazení jako rich snippety v Googlu)
- `AggregateRating` (5 hvězdiček, 40 hodnocení)

**model-start.html — JSON-LD Schema.org:**
- `BreadcrumbList` schema
- `Service` schema s detailním popisem a hasOfferCatalog
- Dvě `Offer` (jednorázová platba 14 900 Kč + splátky 1 490 Kč/měs)
- `FAQPage` schema (5 otázek specifických pro Start balíček)
- Viditelná breadcrumb navigace pod navbarem

**model-business.html:**
- `BreadcrumbList` + `Service` + `Offer` schemas
- Viditelná breadcrumb navigace

**model-automation.html:**
- `BreadcrumbList` + `Service` + `Offer` schemas
- Viditelná breadcrumb navigace

**Nové soubory:**
- `sitemap.xml` — seznam všech indexovatelných stránek pro Google/Seznam
- `robots.txt` — instrukce pro crawlery (objednat.html je noindex)
- Kontaktní informace (`<address>`) v zápatí hlavní a Start stránky

---

## Co ještě udělat (prioritizovaný seznam)

### 🔴 Kritické — udělat co nejdřív

**1. Vytvořit OG image (1200×630 px)**
- Soubor musí být uložen jako `https://webdo24.cz/og-image.jpg`
- Obsah: logo WebDo24.cz + "Web do 24 hodin od 14 900 Kč" + tmavé pozadí #0B1929
- Nástroje: Canva (zdarma), Figma nebo Adobe Express
- Proč: Bez tohoto souboru se při sdílení na Facebooku/LinkedInu/Slacku zobrazí prázdný placeholder

**2. Přepsat Tailwind z CDN na build verzi**
- Aktuálně: `<script src="https://cdn.tailwindcss.com">` — Tailwind generuje CSS za běhu v prohlížeči
- Problém: zpomaluje First Contentful Paint, blokuje render
- Řešení: npm + Vite/PostCSS build pipeline, výstup je minifikovaný CSS soubor (~20 KB místo ~3 MB)
- Dopad na Lighthouse: +10–20 bodů Performance

**3. Přidat Google Search Console**
- Přihlásit se na search.google.com/search-console
- Ověřit vlastnictví domény webdo24.cz
- Odeslat sitemap: `https://webdo24.cz/sitemap.xml`
- Sledovat organické dotazy, CTR a indexaci

**4. Přidat Seznam Search konzole**
- webmaster.seznam.cz — obdobný nástroj pro českou verzi Seznamu
- Odeslat sitemap

### 🟠 Vysoké — do 30 dnů

**5. Přidat `font-display: optional` nebo preload pro kritické fonty**
- Outfit 700/900 je kritický pro nad-the-fold obsah
- Přidat: `<link rel="preload" as="font" href="[URL]" crossorigin>`
- Alternativa: hostovat fonty lokálně (stáhnout z Google Fonts, uložit na server)

**6. Optimalizovat obrázky v /previews/**
- Konvertovat PNG → WebP formát (ušetří 30–50 % velikosti)
- Přidat `width` a `height` atributy na všechny `<img>` tagy → zabrání CLS skokům
- Příkaz pro konverzi: `cwebp -q 85 input.png -o output.webp`

**7. Přidat recenze zákazníků jako strukturovaná data**
- Aktuálně máte "120+ spokojených klientů" a "⭐⭐⭐⭐⭐" — to není recenze, to je text
- Vytvořit sekci s konkrétními citacemi od zákazníků (jméno, firma, co řekli)
- Přidat Review schema pro každou recenzi
- Dopad: zobrazení hvězdiček přímo ve výsledcích vyhledávání (rich snippety)

**8. Přidat `<link rel="sitemap">` do `<head>`**
- Přidat do všech stránek: `<link rel="sitemap" type="application/xml" href="/sitemap.xml">`

### 🟡 Střední — do 90 dnů

**9. Vytvořit blog / obsahový marketing**
- Nejlepší témata (seřazená dle potenciálu):
  1. "Kolik stojí web v roce 2025? Reálné ceny bez keců" — KW: `cena tvorby webu`
  2. "Web s AI chatbotem: co to skutečně umí" — KW: `AI chatbot na web`
  3. "Proč nepoužívat WordPress v roce 2025" — KW: `alternativa WordPress`
  4. "Jak získat první zákazníky z webu do 30 dnů" — KW: `web co přináší poptávky`
  5. "Web do 24 hodin — mýty vs. realita" — KW: `rychlá tvorba webu`
- Každý článek = min. 1 500 slov, H1/H2/H3 struktura, interní odkaz na produktovou stránku

**10. Lokální SEO — Google Business Profile**
- Pokud ještě nemáte: vytvořit profil na business.google.com
- Vyplnit: kategorie ("Tvorba webových stránek"), popis, fotografie, otevírací dobu
- Pravidelně přidávat příspěvky (1× týdně) a sbírat recenze

**11. Přidat hreflang tag (pokud plánujete slovenskou verzi)**
- `<link rel="alternate" hreflang="cs" href="https://webdo24.cz/">`
- Relevantní jen pokud budete cílit na SK trh

**12. Přidat FAQ na stránky model-business.html a model-automation.html**
- Aktuálně chybí FAQ sekce na Business a Automation stránkách
- Přidat 5–7 otázek specifických pro každý balíček
- FAQ schema je pak automaticky eligible pro rich snippety v Googlu

### 🟢 Dlouhodobé — 3–6 měsíců

**13. Linkbuilding strategie**
- Podnikatel.cz — odpovídat na dotazy o tvorbě webů v diskusích
- PR článek s case study (konkrétní klient, konkrétní výsledky) na Lupa.cz nebo Forbes CZ
- Partnerství s fotografy, copywritery, koworkingy — vzájemné reference

**14. Core Web Vitals monitoring**
- Nastavit automatické měření v Google Search Console
- Cíl: LCP < 2,5s, INP < 200ms, CLS < 0,1
- Největší riziko: canvas animace (particleCanvas) a hero slider

**15. A/B testování CTA tlačítek**
- Testovat varianty: "Rezervovat spuštění" vs "Spustím web do zítra" vs "Chci web za 14 900 Kč"
- Nástroj: Google Optimize (zdarma) nebo Hotjar

---

## Rychlý checklist pro Google Search Console

Po nasazení na produkci:
- [ ] Ověřit doménu v Search Console
- [ ] Odeslat sitemap.xml
- [ ] Zkontrolovat Coverage report (žádné chyby crawlování)
- [ ] Počkat 2–4 týdny na indexaci
- [ ] Zkontrolovat Rich Results Test: search.google.com/test/rich-results
  - Vložit URL index.html → ověřit FAQ a Organization schema
  - Vložit URL model-start.html → ověřit BreadcrumbList a Service schema

---

## Klíčové metriky k sledování

| Metrika | Nástroj | Cílová hodnota |
|---|---|---|
| Organická návštěvnost | Google Search Console | +20% /měsíc |
| CTR ve výsledcích | Google Search Console | > 3% |
| Průměrná pozice | Google Search Console | Top 10 pro hlavní KW |
| Core Web Vitals LCP | PageSpeed Insights | < 2,5s |
| Konverzní poměr (objednávky/návštěvy) | Google Analytics 4 | > 2% |
