# KOMPLETNÍ AUDIT MĚŘENÍ KONVERZÍ — ninja-tyden.cz

> **Audit proveden:** 2026-06-16
> **Auditor:** Senior GA4 / GTM / Google Ads specialista
> **Metodika:** Frontendová analýza zdrojového kódu, dekompilace GTM kontejneru, analýza Stripe checkout flow, URL existence testy

---

## 🔴 EXECUTIVE SUMMARY

Web **ninja-tyden.cz** prodává letní příměstský tábor za **3 490 Kč**. Nákupní proces je **single-page** s **Stripe Embedded Checkout**.

**Zásadní zjištění:**
- ❌ **Neexistuje žádné měření purchase** — GTM kontejner má nastavený GA4 purchase tag, ale frontend ho nikdy nespouští
- ❌ **Neexistuje Google Ads** — na webu není žádný AW- ID, žádné konverzní trackování
- ❌ **Neexistuje Consent Mode v2** — žádný cookie banner, trackery se načítají ihned (GDPR riziko)
- ❌ **Neexistují ecommerce eventy** — žádný begin_checkout, view_item, generate_lead
- ❌ **Neexistuje thank-you stránka** — po platbě zůstává uživatel na homepage

> **Celkové hodnocení:** Měření je **nefunkční**. Každá zaplacená objednávka uniká. Google Ads kampaně běží naslepo.

---

## 1. METODIKA A DŮKAZY

### Prozkoumané zdroje
| Zdroj | Výsledek |
|-------|----------|
| `https://ninja-tyden.cz` (HTML zdroj) | Analyzováno 1301 řádků |
| `https://ninja-tyden.cz/prihlaska` | **404 NOT_FOUND** |
| `https://ninja-tyden.cz/dekujeme` | **404 NOT_FOUND** |
| `https://ninja-tyden.cz/success` | **404 NOT_FOUND** |
| GTM kontejner `GTM-K946RX5J` | Dekompilován (355 KB), extrahována struktura tagů/triggerů |

### Použité nástroje
- `curl` pro stažení zdrojových kódů
- `grep` pro vyhledávání trackovacích patternů
- Dekompilace GTM `gtm.js` pro extrakci tagů, triggerů a proměnných

---

## 2. GTM ANALÝZA (GTM-K946RX5J)

### 2.1 Nasazení GTM
| Aspekt | Stav | Detail |
|--------|------|--------|
| GTM ID | ✅ Správně | `GTM-K946RX5J` |
| `<head>` snippet | ✅ Správně | Na řádku 15-19 |
| `<noscript>` iframe | ✅ Správně | Na řádku 637 |
| Pořadí skriptů | ⚠️ Problém | FB Pixel se načítá **před** GTM (řádek 21) — může způsobovat race conditions |
| Data Layer inicializace | ✅ Správně | `window.dataLayer = window.dataLayer || []` před GTM snippetem |

### 2.2 Struktura kontejneru (dekompilace)

**Tagy (celkem 2):**

| # | Typ | Název/Detail | Trigger |
|---|-----|--------------|---------|
| 1 | `__googtag` | GA4 Configuration — `G-GBBN7TXHSV` | `gtm.init` (všechny stránky) |
| 2 | `__gaawe` | GA4 Event — `purchase` — čte ecommerce z dataLayer | Custom Event `purchase` |

**Proměnné (celkem 5):**

| # | Typ | Účel |
|---|-----|------|
| 1 | `__e` | Event name |
| 2 | `__u` | URL (full) |
| 3 | `__u` | Hostname |
| 4 | `__u` | Path |
| 5 | `__f` | Referrer |

> 🚨 **Kritické:** Kontejner má pouze **2 tagy** a **0 custom proměnných** pro formulářová data, hodnoty objednávek, nebo produktové informace.

### 2.3 Chybějící tagy v GTM

| Co chybí | Dopad |
|----------|-------|
| Google Ads Conversion Tag | Není možné měřit konverze v Ads |
| Google Ads Remarketing Tag | Nelze vytvářet remarketingová publika |
| Google Ads Conversion Linker | Nelze měřit cross-domain konverze |
| GA4 Event tagy (begin_checkout, generate_lead) | GTM nezachytává funnel |
| Consent Mode initialization tag | Není nastaven defaultní consent |
| Custom HTML tagy pro dataLayer | Žádná automatizace eventů |

---

## 3. GOOGLE ANALYTICS 4 ANALÝZA

### 3.1 GA4 Měřicí ID
- **Měřicí ID:** `G-GBBN7TXHSV`
- **Nasazení:** Přes GTM (GA4 Configuration tag)
- **Stav:** Načítá se na všech stránkách

### 3.2 Automatické eventy
| Event | Očekávaný | Skutečný | Stav |
|-------|-----------|----------|------|
| `page_view` | Ano | Ano (automaticky z GA4 Config) | ✅ |
| `session_start` | Ano | Ano (automaticky) | ✅ |
| `first_visit` | Ano | Ano (automaticky) | ✅ |
| `user_engagement` | Ano | Ano (automaticky) | ✅ |

### 3.3 Ecommerce eventy
| Event | Očekávaný | Skutečný | Nalezeno v kódu |
|-------|-----------|----------|-----------------|
| `view_item` | Ano | Ne | ❌ 0 výskytů |
| `add_to_cart` | Ano | Ne | ❌ 0 výskytů |
| `begin_checkout` | Ano | Ne | ❌ 0 výskytů |
| `add_payment_info` | Ano | Ne | ❌ 0 výskytů |
| `purchase` | Ano | Ne | ❌ 0 výskytů |

> **Důkaz:** Vyhledávání `dataLayer.push` v celém HTML vrátilo **0 výsledků** kromě GTM inicializačního `gtm.start`.

### 3.4 Vysvětlení proč purchase nefunguje

GA4 Event tag v GTM čeká na trigger:
```json
{"function":"_eq","arg0":["macro",0],"arg1":"purchase"}
```

To znamená: *"Spusť se, až v dataLayer přijde event s názvem `purchase`"*.

Ale na frontendu nikde není:
```javascript
dataLayer.push({ event: 'purchase', ecommerce: { ... } });
```

**Tag proto nikdy nefunguje.**

---

## 4. GOOGLE ADS ANALÝZA

### 4.1 Nasazení Google Ads
| Aspekt | Stav |
|--------|------|
| Google Ads Tag (AW-XXXX) | ❌ Nenalezeno |
| Conversion Tracking | ❌ Nenalezeno |
| Conversion Linker | ❌ Nenalezeno |
| Remarketing Tag | ❌ Nenalezeno |
| Enhanced Conversions | ❌ Nenalezeno |
| Phone Call Conversion | ❌ Nenalezeno |

### 4.2 Vyhledávané patterny (všechny vrátily 0 výsledků)
- `AW-`
- `ads_data_redaction`
- `googleadservices`
- `conversion_id`
- `conversion_label`
- `remarketing`
- `allow_enhanced_conversions`

### 4.3 Dopad na kampaně
- **Smart Bidding** (Target CPA, Target ROAS, Maximize Conversions) **nemůže fungovat** bez konverzních dat
- Algoritmus neví, která klíčová slova, inzeráty a publika přinášejí prodeje
- Není možné počítat **ROAS** nebo **CPA**
- **Attribution** není měřitelná

---

## 5. STRIPE CHECKOUT ANALÝZA

### 5.1 Typ checkoutu
- **Typ:** Stripe Embedded Checkout (modální okno)
- **Publishable Key:** `pk_live_51RHww4CBgIxNRpERvzhVaJabgmaJuvrV0V3UDqeHHmiN2QmUh4Fhdgy8Fr1a6tJKyrSLCWULS8o3iUMwHIjvq8VI00q3j6GhxP`
- **API endpoint:** `https://api.ninja-tyden.cz/api/create-checkout-session`

### 5.2 Nákupní flow
```
1. Uživatel vyplní formulář (jméno dítěte, rodič, email, telefon)
2. Vybere platební metodu:
   a) Bankovní převod → zobrazí se inline panel s QR kódem
   b) Online karta → otevře se Stripe Embedded Checkout modál
3. V modálu uživatel zadá kartu a zaplatí
4. Po zaplacení: ZŮSTÁVÁ NA STEJNÉ STRÁNCE (embedded checkout zobrazí success v modálu)
```

### 5.3 Problémy se Stripe flow

| Problém | Popis | Dopad |
|---------|-------|-------|
| Žádný redirect | Po platbě není přesměrování na thank-you stránku | Nelze měřit konverzi pomocí URL pravidla |
| Žádný `onComplete` callback | V kódu není zachycen callback úspěšné platby | Nelze spustit JavaScriptový purchase event |
| Žádný server-side webhook tracking | Není vidět integrace GTM/GA4 z backendu | Purchase uniká úplně |
| Chybí `return_url` | Stripe session nemá nastavený návrat | Uživatel neopustí stránku, browser history se nemění |

### 5.4 Lze purchase obejít?
- **Ano, částečně.** Uživatel může zavřít modál (Escape, kliknutí mimo, křížek) a zůstat na stránce. Ale samotná platba byla provedena.
- **Duplicitní purchase:** Pokud by se purchase event přidal bez ochrany, při refreshi stránky by se mohl odeslat znovu.
- **Řešení:** Jednoznačná identifikace transakce pomocí `transaction_id` z Stripe Session ID.

---

## 6. THANK-YOU / SUCCESS STRÁNKA

### 6.1 Stav
| URL | Stav |
|-----|------|
| `https://ninja-tyden.cz/dekujeme` | **404 NOT_FOUND** |
| `https://ninja-tyden.cz/děkujeme` | **404 NOT_FOUND** |
| `https://ninja-tyden.cz/success` | **404 NOT_FOUND** |
| `https://ninja-tyden.cz/success.html` | **404 NOT_FOUND** |

### 6.2 Dopad
- Není možné měřit konverzi pomocí **Destination Goal** v GA4
- Není možné měřit konverzi pomocí **URL-based triggeru** v GTM
- Není možné zobrazit personalizovanou zprávu po nákupu
- Není možné spustit **Conversion API** (Facebook) pro server-side potvrzení

---

## 7. CONSENT MODE v2 ANALÝZA

### 7.1 Stav implementace
| Parametr | Stav |
|----------|------|
| `ad_storage` | ❌ Není nastaveno (defaultní chování závisí na regionu) |
| `analytics_storage` | ❌ Není nastaveno |
| `ad_user_data` | ❌ Není nastaveno |
| `ad_personalization` | ❌ Není nastaveno |
| Cookie banner | ❌ Neexistuje |
| CMP (CookieYes, Cookiebot, atd.) | ❌ Není nasazen |

### 7.2 Právní riziko
- Web cílí na rodiče dětí v ČR (EU)
- GTM a FB Pixel se načítají **před** jakýmkoliv souhlasem
- V rozporu s **GDPR** (čl. 6 a 7) a **ePrivacy směrnicí**
- Potenciální riziko pokut od ÚOOÚ

### 7.3 Dopad na měření
- V EU mohou prohlížeče s omezeným trackingem (Safari ITP, Firefox ETP) blokovat cookies
- Bez explicitního `granted` consentu mohou být data v GA4 označena jako **"Modeling"** nebo **"Unidentified"**
- Google Ads může odmítnout zpracovávat konverze bez platného consentu

---

## 8. ENHANCED CONVERSIONS ANALÝZA

### 8.1 Stav
- **Aktivní:** ❌ Ne
- **Implementace:** ❌ Neexistuje
- **Hashované údaje:** ❌ Neodesílají se

### 8.2 Důvod
Enhanced Conversions vyžadují:
1. **Google Ads Conversion Tag** — není nasazen
2. **User data (email, telefon)** — sbírá se ve formuláři, ale neposílá se do Google Ads
3. **Hashování (SHA-256)** — není implementováno

---

## 9. REMARKETING ANALÝZA

### 9.1 Stav
- **Google Ads Remarketing:** ❌ Není nasazen
- **Audiences v GTM/GA4:** Nelze vytvářet bez remarketingového tagu
- **Dynamic Remarketing:** ❌ Není možné (chybí product feed i tag)

### 9.2 Facebook Pixel
- **Pixel ID:** `1001072739291072`
- **Stav:** Nasazen přímo v HTML, ale **bez consent mechanismu**
- **Eventy:** Pouze `PageView` (automaticky při načtení)
- **Chybí:** `InitiateCheckout`, `Purchase`, `Lead`

---

## 10. DUPLICITNÍ MĚŘENÍ

| Aspekt | Stav |
|--------|------|
| Duplicitní GTM | ✅ Ne — pouze 1 kontejner |
| Duplicitní GA4 | ✅ Ne — pouze 1 měřicí ID |
| Duplicitní FB Pixel | ✅ Ne — pouze 1 pixel |
| Hardcoded + GTM GA4 | ✅ Ne — GA4 je pouze v GTM |

> Poznámka: FB Pixel je hardcoded v HTML **před** GTM. Pokud by se v budoucnu přidal FB Pixel i do GTM, vznikla by duplicita.

---

## 11. CHYBĚJÍCÍ EVENTY

| Event | Měl by být kdy | Aktuální stav | Priorita |
|-------|----------------|---------------|----------|
| `view_item` | Načtení homepage | ❌ Chybí | Střední |
| `begin_checkout` | Klik na "Přihlásit dítě" / otevření modálu | ❌ Chybí | **Kritická** |
| `add_payment_info` | Výběr platební metody | ❌ Chybí | Nízká |
| `purchase` | Úspěšná platba | ❌ Chybí | **Kritická** |
| `generate_lead` | Odeslání formuláře (bankovní převod) | ❌ Chybí | **Kritická** |
| `form_start` | Začátek vyplňování formuláře | ❌ Chybí | Nízká |
| `scroll` | Scroll 90% | ❌ Chybí | Nízká |

---

## 12. REPORT CHYB PODLE PRIORITY

---

### 🔴 KRITICKÉ CHYBY

#### CHYBA #1: NEMĚŘÍ SE PURCHASE (ZAPLACENÁ OBJEDNÁVKA)

**Popis problému:**
Na webu neexistuje mechanismus, který by odesílal `purchase` event do dataLayer po úspěšné platbě. GTM sice má nastavený GA4 Event tag pro `purchase`, ale ten nikdy nedostane signál.

**Jak byla nalezena:**
- Vyhledávání `dataLayer.push` v celém HTML: **0 výskytů** kromě GTM inicializace
- Dekompilace GTM kontejneru: tag `__gaawe` čeká na event `purchase`, ale nikdo ho neposílá
- Stripe flow nemá `onComplete` callback ani redirect na success stránku

**Dopad na měření:**
- GA4 ukazuje **0 prodejů** navzdory tomu, že web prodává
- Není možné sledovat obrat, konverzní poměr, hodnotu objednávky

**Dopad na Google Ads:**
- Smart Bidding je **nemožný** — algoritmus neví, co funguje
- Není možné počítat ROAS
- Budget se utrácí bez optimalizace

**Přesný postup opravy:**

> **Doporučená varianta A (nejspolehlivější): Přechod na Hosted Checkout + Thank-you stránku**

1. **Vytvořit stránku** `dekujeme.html`:
```html
<!DOCTYPE html>
<html lang="cs">
<head>
  <script>
    window.dataLayer = window.dataLayer || [];
    // Consent Mode default (před GTM)
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500
    });
  </script>
  <!-- GTM snippet zde -->
</head>
<body>
  <script>
    // Získat session_id z URL
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');

    // Ověřit platbu přes vlastní backend
    fetch('https://api.ninja-tyden.cz/api/verify-session?session_id=' + sessionId)
      .then(r => r.json())
      .then(session => {
        if (session.status === 'complete') {
          dataLayer.push({
            event: 'purchase',
            ecommerce: {
              transaction_id: session.id,
              value: session.amount_total / 100,
              currency: 'CZK',
              tax: 0,
              shipping: 0,
              items: [{
                item_id: 'ninja-tyden-2026',
                item_name: 'Ninja Týden 2026',
                item_category: 'Příměstský tábor',
                price: session.amount_total / 100,
                quantity: 1
              }]
            }
          });
        }
      });
  </script>
</body>
</html>
```

2. **Upravit backend** `create-checkout-session` pro přidání `success_url`:
```javascript
const session = await stripe.checkout.sessions.create({
  success_url: 'https://ninja-tyden.cz/dekujeme?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://ninja-tyden.cz/',
  // ... existing params
});
```

3. **V GTM přidat trigger** pro `purchase` event (již existuje, stačí zajistit, že dorazí)

> **Varianta B (rychlá, méně spolehlivá): Client-side v Embedded Checkout**

Přidat do `handleSubmit()` po `stripe.initEmbeddedCheckout`:
```javascript
var checkout = await stripe.initEmbeddedCheckout({
  clientSecret: data.clientSecret,
  onComplete: function() {
    dataLayer.push({
      event: 'purchase',
      ecommerce: {
        transaction_id: data.clientSecret.split('_secret_')[0],
        value: document.getElementById('price-new') ? 
          parseFloat(document.getElementById('price-new').textContent.replace(/\s/g,'').replace('Kč','')) : 3490,
        currency: 'CZK',
        items: [{
          item_id: 'ninja-tyden-2026',
          item_name: 'Ninja Týden 2026',
          price: 3490,
          quantity: 1,
          item_category: 'Příměstský tábor'
        }]
      }
    });
    // Zobrazit inline potvrzení místo modálu
    closeStripeModal();
    document.getElementById('success-message').style.display = 'block';
  }
});
```

> ⚠️ **Upozornění:** Varianta B je méně spolehlivá, protože `onComplete` se spustí vždy, když uživatel dokončí embedded flow, i když platba teoreticky selže (ale u Stripe Embedded Checkout je to vzácné).

---

#### CHYBA #2: CHYBÍ GOOGLE ADS KONVERZNÍ TRACKING

**Popis problému:**
Na webu není nasazen žádný Google Ads tag. Není možné měřit konverze v Google Ads rozhraní.

**Jak byla nalezena:**
- Vyhledávání `AW-`, `conversion_id`, `googleadservices` vrátilo 0 výsledků
- Dekompilace GTM: 0 Google Ads tagů

**Dopad:**
- Nemožnost použít Smart Bidding
- Nemožnost měřit CPA/ROAS
- Blind spending

**Přesný postup opravy:**

1. V **Google Ads** → Nástroje a nastavení → Měření → Konverze → Vytvořit novou konverzi
   - Název: **Nákup — Ninja Týden**
   - Kategorie: **Nákup**
   - Hodnota: **Použít různé hodnoty pro každou konverzi**
   - Počet: **Jedna**
   - Délka okna konverze: **30 dní**

2. Získat **Conversion ID** (např. `AW-123456789`) a **Conversion Label** (např. `AbCdEfGhIjKlMnOp`)

3. V **GTM** vytvořit nový tag:
   - **Typ:** Google Ads Conversion Tracking
   - **Conversion ID:** `AW-XXXXXXXXX`
   - **Conversion Label:** `XXXXXXXX`
   - **Value:** `{{ecommerce.value}}`
   - **Transaction ID:** `{{ecommerce.transaction_id}}`
   - **Currency:** `CZK`
   - **Trigger:** Custom Event — `purchase`

4. Přidat také **Google Ads Remarketing Tag**:
   - **Typ:** Google Ads Remarketing
   - **Conversion ID:** `AW-XXXXXXXXX`
   - **Trigger:** All Pages

---

#### CHYBA #3: NENÍ IMPLEMENTOVÁN CONSENT MODE v2

**Popis problému:**
Web nemá cookie lištu a GTM/FB Pixel se načítají bez souhlasu uživatele.

**Jak byla nalezena:**
- Žádný cookie banner v DOM
- Žádný `gtag('consent', 'default', ...)` v kódu
- FB Pixel na řádku 21 (před GTM) bez jakéhokoliv omezení

**Dopad:**
- Právní riziko (GDPR, ePrivacy)
- Omezené měření v EU
- Možné penalizace od Google (omezení ads features)

**Přesný postup opravy:**

1. **Před** GTM snippet vložit default consent:
```html
<head>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500
    });
    
    // Regionální nastavení pro ČR/EU (pokud chcete mimo EU granted)
    gtag('set', 'ads_data_redaction', true);
  </script>
  
  <!-- GTM snippet zde -->
  <script>(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-K946RX5J');</script>
  
  <!-- FB Pixel až PO consentu (nebo s data-blocking-mode) -->
</head>
```

2. Implementovat **Cookie Banner** (např. CookieYes free verze):
```html
<!-- CookieYes -->
<script id="cookieyes" type="text/javascript" src="https://cdn-cookieyes.com/client_data/YOUR_ID/script.js"></script>
```

3. Po souhlasu uživatele aktualizovat consent:
```javascript
function acceptAllCookies() {
  gtag('consent', 'update', {
    'ad_storage': 'granted',
    'analytics_storage': 'granted',
    'ad_user_data': 'granted',
    'ad_personalization': 'granted'
  });
}
```

4. V GTM nastavit **Consent Overview** pro každý tag:
   - GA4 Config: Vyžaduje `analytics_storage`
   - Google Ads Conversion: Vyžaduje `ad_storage` + `ad_user_data`
   - FB Pixel: Vyžaduje `ad_storage`

---

#### CHYBA #4: NEMĚŘÍ SE BEGIN_CHECKOUT

**Popis problému:**
Když uživatel klikne na tlačítko přihlášky, neposílá se event `begin_checkout`.

**Jak byla nalezena:**
- Funkce `handleSubmit()` v HTML otevře Stripe modál, ale nepushuje nic do dataLayer
- Vyhledávání `begin_checkout` vrátilo 0 výsledků

**Dopad:**
- Není vidět funnel (kolik lidí začalo checkout vs. dokončilo)
- Není možné vytvořit audience "začalo checkout, nekoupilo"
- Není možné počítat konverzní poměr

**Přesný postup opravy:**

V souboru `index.html` upravit funkci `handleSubmit()`:
```javascript
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  // ... existing code ...
  
  const paymentMethod = form.querySelector('input[name="payment_method"]:checked').value;
  const childName  = (document.getElementById('child_name').value  || '').trim() || 'Dítě';
  const parentName = (document.getElementById('parent_name').value || '').trim();
  const email      = (document.getElementById('email').value       || '').trim();
  const phone      = (document.getElementById('phone').value       || '').trim();
  
  // ✅ PŘIDAT BEGIN_CHECKOUT
  const priceText = document.getElementById('price-new')?.textContent || '3490 Kč';
  const price = parseFloat(priceText.replace(/\s/g,'').replace('Kč','')) || 3490;
  
  dataLayer.push({
    event: 'begin_checkout',
    ecommerce: {
      currency: 'CZK',
      value: price,
      items: [{
        item_id: 'ninja-tyden-2026',
        item_name: 'Ninja Týden 2026',
        price: price,
        quantity: 1,
        item_category: 'Příměstský tábor'
      }]
    },
    payment_type: paymentMethod // 'card' nebo 'transfer'
  });
  
  // ... existing payment logic ...
}
```

V GTM přidat:
- **Tag:** GA4 Event — `begin_checkout`
- **Trigger:** Custom Event — `begin_checkout`
- **Ecommerce data:** Číst z dataLayer

---

### 🟠 VYSOKÁ PRIORITA

#### CHYBA #5: GTM KONTEJNER JE PŘÍLIŠ CHUDÝ

**Popis:** GTM obsahuje pouze 2 tagy. Chybí všechny podpůrné tagy pro ecommerce a ads.

**Náprava:**
| Tag | Typ | Trigger |
|-----|-----|---------|
| GA4 Config | Google Tag | All Pages |
| GA4 Event — view_item | GA4 Event | All Pages |
| GA4 Event — begin_checkout | GA4 Event | Custom Event `begin_checkout` |
| GA4 Event — purchase | GA4 Event | Custom Event `purchase` |
| GA4 Event — generate_lead | GA4 Event | Custom Event `generate_lead` |
| Google Ads Conversion | Google Ads Conversion | Custom Event `purchase` |
| Google Ads Remarketing | Google Ads Remarketing | All Pages |
| Consent Mode — Default | Consent Mode | All Pages (nebo Consent Initialization) |

#### CHYBA #6: FB PIXEL BEZ CONSENTU A BEZ EVENTŮ

**Popis:** FB Pixel je hardcoded v HTML před GTM. Trackuje pouze `PageView`. Chybí `InitiateCheckout`, `Purchase`, `Lead`.

**Náprava:**
1. Přesunout FB Pixel do GTM (nebo ho obalit consent logikou)
2. Přidat eventy:
```javascript
// Po begin_checkout
fbq('track', 'InitiateCheckout', {value: 3490, currency: 'CZK'});

// Po purchase
fbq('track', 'Purchase', {value: 3490, currency: 'CZK'});

// Po bankovním převodu
fbq('track', 'Lead');
```

---

### 🟡 STŘEDNÍ PRIORITA

#### CHYBA #7: CHYBÍ VIEW_ITEM

**Náprava:** Přidat na homepage:
```javascript
dataLayer.push({
  event: 'view_item',
  ecommerce: {
    currency: 'CZK',
    value: 3490,
    items: [{
      item_id: 'ninja-tyden-2026',
      item_name: 'Ninja Týden 2026',
      price: 3490,
      quantity: 1,
      item_category: 'Příměstský tábor'
    }]
  }
});
```

#### CHYBA #8: NENÍ SHROMAŽĎOVÁNO USER_DATA PRO ENHANCED CONVERSIONS

**Náprava:** Až bude Google Ads nasazen, přidat do purchase eventu:
```javascript
dataLayer.push({
  event: 'purchase',
  ecommerce: { /* ... */ },
  user_data: {
    email: email.toLowerCase().trim(), // GA4/Ads si hashuje samo
    phone_number: phone.replace(/\D/g,'') // mezinárodní formát
  }
});
```

V Google Ads nastavit **Enhanced Conversions** a v GTM tagu povolit `user_data`.

---

### 🟢 NÍZKÁ PRIORITA

#### CHYBA #9: CHYBÍ SERVER-SIDE TRACKING

**Doporučení:** Po nasazení client-side trackingu zvážit přechod na **Server-Side GTM (sGTM)** pro lepší odolnost proti adblockerům a přesnější měření.

#### CHYBA #10: CHYBÍ DYNAMIC REMARKETING FEED

**Doporučení:** Pro Google Ads Dynamic Remarketing by bylo potřeba vytvořit product feed. U jednoho produktu to není kritické, ale pro budoucí rozšíření (více turnusů, merchandise) ano.

---

## 13. BONUS: IDEÁLNÍ NASTAVENÍ

### Ideální struktura konverzí v Google Ads

| Konverze | Kategorie | Počet | Hodnota | Okno | Bidding |
|----------|-----------|-------|---------|------|---------|
| **Purchase** | Primary | Jeden | 3 490 Kč | 30 dní | ✅ Hlavní |
| **Begin Checkout** | Primary | Jeden | 3 490 Kč | 14 dní | ✅ Sekundární |
| **Generate Lead** (bankovní převod) | Primary | Jeden | 3 490 Kč | 30 dní | ✅ Sekundární |
| **Page View — Cena** | Secondary | — | — | — | Pozorování |

### Ideální struktura eventů v GA4

```javascript
// Načtení stránky
dataLayer.push({ event: 'view_item', ecommerce: { currency: 'CZK', value: 3490, items: [...] }});

// Uživatel začal vyplňovat formulář
dataLayer.push({ event: 'form_start' });

// Uživatel klikl "Přihlásit" / otevřel checkout
dataLayer.push({ event: 'begin_checkout', ecommerce: { currency: 'CZK', value: 3490, items: [...] }});

// Uživatel zvolil platební metodu
dataLayer.push({ event: 'add_payment_info', ecommerce: { currency: 'CZK', value: 3490, payment_type: 'card' }});

// Úspěšná platba
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'cs_live_...',
    value: 3490,
    currency: 'CZK',
    tax: 0,
    shipping: 0,
    coupon: 'NINJA10',
    items: [{
      item_id: 'ninja-tyden-2026',
      item_name: 'Ninja Týden 2026',
      item_category: 'Příměstský tábor',
      price: 3490,
      quantity: 1
    }]
  }
});
```

### Ideální GTM kontejner

**Proměnné:**
- `{{ecommerce.value}}` — Data Layer Variable
- `{{ecommerce.transaction_id}}` — Data Layer Variable
- `{{ecommerce.items}}` — Data Layer Variable
- `{{user_data.email}}` — Data Layer Variable
- `{{user_data.phone_number}}` — Data Layer Variable
- `{{page_path}}` — Built-in
- `{{event}}` — Built-in

**Triggery:**
- `All Pages` — Page View
- `Event — purchase` — Custom Event `purchase`
- `Event — begin_checkout` — Custom Event `begin_checkout`
- `Event — generate_lead` — Custom Event `generate_lead`
- `Event — view_item` — Custom Event `view_item`

**Tagy:**
1. Google Tag (GA4 Config) — G-GBBN7TXHSV — All Pages
2. GA4 Event — purchase — Trigger: Event — purchase
3. GA4 Event — begin_checkout — Trigger: Event — begin_checkout
4. Google Ads Conversion Tracking — Trigger: Event — purchase
5. Google Ads Remarketing — Trigger: All Pages
6. Consent Mode — Default — Trigger: Consent Initialization

### Ideální remarketingové publikum

| Publikum | Zdroj | Doba | Účel |
|----------|-------|------|------|
| Všichni návštěvníci | GA4 | 30 dní | Brand awareness |
| Začali checkout | GA4 event `begin_checkout` | 14 dní | **Abandoned checkout** — nabídka slevy |
| Zobrazili stránku + nekoupili | GA4 | 7 dní | Remarketing s USP |
| Zakoupili | GA4 event `purchase` | 180 dní | Cross-sell (merch, příští ročník) |
| Podobná publika (Similar) | Google Ads | — | Lookalike acquisition |

### Ideální Smart Bidding strategie

**Fáze 1: Učení (0–30 konverzí/měsíc)**
- **Strategie:** Maximize Conversions
- **Budget:** Denní limit dle možností
- **Cíl:** Nasbírat data

**Fáze 2: Optimalizace (30+ konverzí/měsíc)**
- **Strategie:** Maximize Conversion Value
- **Target ROAS:** 400% (4:1) — tedy cena za zákazníka max ~873 Kč při ceně 3 490 Kč
- **Cíl:** Maximalizovat obrat při zachování ziskovosti

**Fáze 3: Škálování (100+ konverzí/měsíc)**
- **Strategie:** Target CPA pro leady + Target ROAS pro purchase
- **Použít:** Performance Max + Search
- **Audience signals:** Zakupující zákazníci, abandoned checkout

---

## 14. KONTROLNÍ SEZNAM PRO IMPLEMENTACI

Po provedení změn ověřte:

- [ ] GTM Preview Mode — `purchase` event se objeví v Data Layer po platbě
- [ ] GA4 DebugView — `purchase` event dorazí s `value` a `currency`
- [ ] GA4 Ecommerce purchases report — ukazuje transakce
- [ ] Google Ads — Konverze se počítají
- [ ] Google Ads — Enhanced Conversions jsou aktivní
- [ ] Cookie banner se zobrazí novým návštěvníkům
- [ ] Bez souhlasu se nenačítají Ads/Analytics tagy
- [ ] Po souhlusu se načítají všechny tagy
- [ ] FB Pixel — `Purchase` event se posílá
- [ ] Bankovní převod — `generate_lead` event se posílá
- [ ] Po refreshi thank-you stránky se `purchase` neopakuje (díky Transaction ID)
- [ ] Testovací platba Stripe (test card) projde celým flow

---

*Report vygenerován automatizovanou analýzou zdrojových kódů a GTM kontejneru. Pro úplný audit doporučuji přístup do Google Ads účtu, GA4 property a Stripe Dashboard pro ověření backendové integrace.*
