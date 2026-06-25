-- ============================================================
-- FAQ seed data pro WebDo24.cz
-- Spusť v Supabase SQL Editoru po vytvoření tabulky
-- ============================================================

-- INDEX (hlavní stránka) – 7 položek
INSERT INTO faq (category, question, answer, sort_order, is_active) VALUES
('index', 'Co když nevím, co napsat?', 'Stačí pár vět. Zbytek vytvoříme za tebe. Napiš třeba: „Jsem instalatér v Praze, dělám opravy a montáže." To nám stačí.', 1, true),
('index', 'Opravdu spustíte systém do 24h?', 'Ano. Jinak vracíme 50 % ceny zpět. Není to jen slib — je to garance zabudovaná do celého procesu. Do 24 hodin dostanete odkaz na hotový web k odsouhlasení.', 2, true),
('index', 'Můžu chtít úpravy?', 'Ano. 1 úprava je zdarma v ceně. Chceš jiný text, jinou fotku nebo jiné barvy? Řekneš nám a hotovo.', 3, true),
('index', 'Co když se mi to nebude líbit?', 'Upravíme to. Neodcházíš s něčím, co nechceš. Platíš až za výsledek, se kterým jsi spokojený.', 4, true),
('index', 'Komu patří web?', 'Vám. Od první chvíle. Doména, obsah i zdrojový kód jsou vaše. Bez lock-inu a bez skrytých podmínek. Kdykoli si můžete web stáhnout a provozovat sami.', 5, true),
('index', 'Můžu zaplatit najednou, nebo na splátky?', 'Obojí. Můžete zaplatit jednorázově, nebo si cenu rozložit do 12 měsíčních splátek. Vyberete si při objednávce — splátky bez úroku.', 6, true),
('index', 'Je v ceně i hosting?', 'Ano — <span class="hl-h">1 rok hostingu zdarma</span> je součástí každého balíčku. Bez výjimek, bez příplatků.', 7, true);

-- MODEL START – 7 položek
INSERT INTO faq (category, question, answer, sort_order, is_active) VALUES
('start', 'Kdy přesně dostanu přístupy k webu?', 'Ve chvíli, kdy schválíte hotový web a potvrdíte platbu, předáváme vám kompletní přístupy — GitHub repozitář, FTP/SSH, doménový registrátor, Google Analytics i Search Console. Vše najednou, v jednom PDF a videu.', 1, true),
('start', 'Co jsou to hostingové přístupy?', 'FTP a SSH přihlašovací údaje k serveru, přístup do administrace hostingu a k doménovému registrátoru. Vše, co potřebujete k tomu, abyste mohli web kdykoli přesunout nebo spravovat bez nás.', 2, true),
('start', 'Jaké úpravy jsou zahrnuté?', 'Dvě kola úprav v ceně — změna textů, barev, obrázků, struktury stránek. Další úpravy jsou za 990 Kč/kolo. Větší rozšíření (nové podstránky, nové funkce) si domluvíme zvlášť.', 3, true),
('start', 'Mohu mít více než 5 podstránek?', 'Standardní Start balíček zahrnuje 5 podstránek. Každá další podstránka stojí 990 Kč. Pokud víte, že potřebujete více, zvažte model Business, který zahrnuje rozšířený obsah.', 4, true),
('start', 'Jak fungují splátky?', '12 měsíčních splátek po 1 490 Kč. Bez úroku, bez navýšení. Každý měsíc se automaticky strhne z karty. Kdykoli můžete doplatit zbytek najednou a ušetřit.', 5, true),
('start', 'Co potřebuji dodat, abyste mohli začít?', 'Stačí pár vět o vaší firmě — čím se zabýváte, pro koho a kde působíte. Texty, fotografie i Google Business profil vytvoříme za vás. Formulář vyplníte za 5 minut.', 6, true),
('start', 'Mohu z Start přejít na Business?', 'Ano, kdykoli. Upgrade na Business nebo Automation provedeme pomocí doplatku rozdílu cen. Váš web zůstane — pouze ho rozšíříme o nové funkce.', 7, true);

-- MODEL BUSINESS – 7 položek
INSERT INTO faq (category, question, answer, sort_order, is_active) VALUES
('business', 'Jak AI ví, co zákazníkům odpovídat?', 'Při spuštění vám položíme pár otázek o vašich službách, cenách a podmínkách. Na základě toho AI naučíme — bude přesně vědět, co zákazníkům říkat a co ne. Obsah AI kdykoli doplníte nebo upravíte.', 1, true),
('business', 'Co dělá zákaznická sekce (CRM)?', 'Zákaznická sekce je jednoduché rozhraní dostupné z telefonu i počítače. Vidíte všechny poptávky, kdo vám psal, co žádal a jak AI odpověděla. Dostanete notifikaci hned, jak přijde nová poptávka.', 2, true),
('business', 'Jak funguje platební brána?', 'Napojíme platební bránu na váš účet. Zákazníci mohou platit kartou přímo na webu — zálohy, plné platby za služby, vstupné. Peníze chodí přímo vám, poplatek za transakci je standardní (cca 1,5 %).', 3, true),
('business', 'Musím se starat o AI po spuštění?', 'Ne. AI běží automaticky. Pokud chcete přidat nové informace nebo změnit odpovědi, stačí nám napsat — do 24 hodin aktualizujeme.', 4, true),
('business', 'Jak fungují splátky?', '12 měsíčních splátek po 2 990 Kč. Bez úroku, bez navýšení. Každý měsíc se automaticky strhne z karty. Kdykoli můžete doplatit zbytek najednou a ušetřit.', 5, true),
('business', 'Mohu z Business přejít na Automation?', 'Ano, kdykoli. Upgrade provedeme pomocí doplatku rozdílu. Váš web zůstane — pouze ho rozšíříme o pokročilé AI workflow, rezervační systém a API integrace.', 6, true),
('business', 'Co potřebuji dodat, abyste mohli začít?', 'Stačí pár vět o vaší firmě — čím se zabýváte, pro koho a kde působíte. Texty, fotografie i nastavení AI vytvoříme za vás. Formulář vyplníte za 5 minut.', 7, true);

-- MODEL AUTOMATION – 7 položek
INSERT INTO faq (category, question, answer, sort_order, is_active) VALUES
('automation', 'Jak dlouho trvá celé nasazení?', 'Pokročilé workflow, rezervační systém a API integrace dokončíme ve sjednaném termínu — obvykle 5–10 pracovních dní dle složitosti projektu. Přesný harmonogram vždy upřesníme při úvodním briefingu. Zavolejte na 735 847 185 a zjistěte možný termín spuštění.', 1, true),
('automation', 'S jakými systémy propojujete?', 'Nejčastěji propojujeme s Fakturoidem, iDokladem, účetními systémy, Googleem Workspace, HubSpotem, Raynetem a podobnými CRM. Pokud máte specifický systém, poradte se s námi — napojíme prakticky cokoliv, co má API.', 2, true),
('automation', 'Jak přesně funguje automatické generování nabídek?', 'Nastavíme AI na vaše ceníkové parametry a podmínky. Zákazník vyplní formulář nebo si popovídá s AI chatbotem — a systém automaticky sestaví orientační nabídku. Tu buď odešleme automaticky, nebo vám ji napřed ukážeme ke schválení. Dle vaší preference.', 3, true),
('automation', 'Co je potřeba pro rezervační systém?', 'Potřebujeme vědět, jaké termíny nabízíte, jak dlouho trvá typická schůzka/zakázka a jaká je vaše kapacita. Propojíme rezervační systém s vaším Google Kalendářem nebo podobným nástrojem — zákazníci vidí jen volné termíny.', 4, true),
('automation', 'Musím mít technické znalosti, abych systém provozoval?', 'Ne. Systém dodáme plně funkční s dokumentací a videowalkthrough. Pro každodenní provoz nepotřebujete žádné technické znalosti — zákaznická sekce je jednoduchá jako smartphone. Změny workflow pro vás řešíme my.', 5, true),
('automation', 'Jak fungují splátky?', '12 měsíčních splátek po 5 990 Kč. Bez úroku, bez navýšení. Každý měsíc se automaticky strhne z karty. Kdykoli můžete doplatit zbytek najednou a ušetřit.', 6, true),
('automation', 'Co potřebuji dodat, abyste mohli začít?', 'Po objednávce domluvíme 30minutový úvodní briefing. Probéreme vaše procesy, co chcete automatizovat a s jakými systémy se napojit. Na základě toho navrhneme a dodáme workflow přesně na míru vašemu podnikání.', 7, true);
