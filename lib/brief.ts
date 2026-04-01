import type { OrderFormData } from '@/types';

const GOAL_LABELS: Record<string, string> = {
  leads: 'Získávat poptávky / kontakty',
  sales: 'Prodávat produkt',
  booking: 'Online rezervace / termíny',
  presentation: 'Prezentace firmy / portfolia',
};

const SECTION_LABELS: Record<string, string> = {
  hero: 'Úvod / Hero',
  services: 'Služby',
  about: 'O nás',
  references: 'Reference / recenze',
  pricing: 'Ceník',
  gallery: 'Galerie',
  contact: 'Kontakt',
  faq: 'FAQ',
};

const STYLE_LABELS: Record<string, string> = {
  modern: 'Moderní',
  luxury: 'Luxusní / prémiový',
  minimal: 'Jednoduchý / minimalistický',
  playful: 'Hravý / kreativní',
  corporate: 'Korporátní / profesionální',
};

const COLOR_LABELS: Record<string, string> = {
  'green-white': 'Zelená & bílá',
  'blue-white': 'Modrá & bílá',
  'dark-gold': 'Tmavá & zlatá',
  'orange-dark': 'Oranžová & tmavá',
  'red-white': 'Červená & bílá',
  'purple-white': 'Fialová & bílá',
  'neutral-dark': 'Neutrální & tmavá',
  custom: 'Vlastní barvy',
};

export function generateBrief(
  data: OrderFormData,
  meta?: { orderId?: string; submittedAt?: string },
): string {
  const date = meta?.submittedAt ?? new Date().toISOString();
  const orderId = meta?.orderId ?? '—';

  const goals = (data.websiteGoals ?? [])
    .map((g) => GOAL_LABELS[g] ?? g)
    .join(', ') || 'Nespecifikováno';

  const sectionLines = (data.sections ?? [])
    .map((s) => `- ${SECTION_LABELS[s] ?? s}`)
    .join('\n') || '- Nespecifikováno';

  const colorLabel = data.colorPreference
    ? (COLOR_LABELS[data.colorPreference] ?? data.colorPreference)
    : 'Bez specifikace';
  const colorDetail =
    data.colorPreference === 'custom' && data.customColors
      ? ` — ${data.customColors}`
      : '';

  const styleLabel = data.designStyle
    ? (STYLE_LABELS[data.designStyle] ?? data.designStyle)
    : 'Nespecifikováno';

  const lang = (data.language ?? ['cs']).map((l) => l.toUpperCase()).join(' + ');

  return `# Brief pro tvorbu webu — ${data.company || data.name}
**Datum zadání:** ${date}
**Order ID:** ${orderId}

---

## 1. ZÁKAZNÍK
- **Jméno:** ${data.name}
- **E-mail:** ${data.email}
- **Telefon:** ${data.phone}
- **Firma / projekt:** ${data.company}

---

## 2. O BYZNYSU

**Co přesně dělají:**
${data.whatYouDo || '—'}

**Cílová skupina:**
${data.targetAudience || '—'}

**Konkurenční výhoda (proč si zákazníci vybírají právě je):**
${data.competitiveAdvantage || '—'}

---

## 3. CÍL WEBU
**Primární cíl:** ${goals}
**Hlavní CTA (výzva k akci na webu):** ${data.mainCta || '—'}

---

## 4. STRUKTURA / SEKCE WEBU
${sectionLines}
${data.customSections ? `\nVlastní sekce / stránky:\n${data.customSections}` : ''}

---

## 5. DOSTUPNÝ OBSAH
| Podklad | Dostupnost |
|---------|-----------|
| Texty | ${data.hasTexts === 'yes' ? '✅ Zákazník dodá' : '❌ NUTNO VYTVOŘIT'} |
| Fotografie | ${data.hasPhotos === 'yes' ? '✅ Zákazník dodá' : '❌ NUTNO ZAJISTIT (stock nebo AI)'} |
| Logo | ${data.hasLogo === 'yes' ? '✅ Zákazník dodá' : '❌ NUTNO NAVRHNOUT nebo textové logo'} |
${data.contentLinks ? `\nOdkaz na podklady / existující materiály:\n${data.contentLinks}` : ''}

---

## 6. DESIGN
- **Styl webu:** ${styleLabel}
- **Barevné preference:** ${colorLabel}${colorDetail}
- **Inspirace (web, který se líbí):** ${data.designInspiration || 'Nespecifikováno'}

---

## 7. TECHNICKÉ POŽADAVKY
- **Doména:** ${data.hasDomain === 'yes' ? (data.domainName || 'Ano, zákazník má — název nezadán') : 'Zákazník nemá doménu — doporučit registraci nebo použít staging'}
- **Jazyk webu:** ${lang}
- **Kontaktní e-mail na webu:** ${data.contactEmail || data.email}
- **Kontaktní telefon na webu:** ${data.contactPhone || data.phone}
${data.contactAddress ? `- **Adresa:** ${data.contactAddress}` : ''}

---

## 8. POVINNÉ POŽADAVKY

**Co MUSÍ na webu být:**
${data.mustHave || '— Zákazník nespecifikoval'}

**Co NESMÍ na webu být:**
${data.mustNotHave || '— Zákazník nespecifikoval'}

---

*Brief vygenerován automaticky ze zadání formuláře — webdo24.cz*`;
}

export function generateJson(
  data: OrderFormData,
  meta?: {
    orderId?: string;
    customerId?: string;
    stripeSessionId?: string;
    submittedAt?: string;
  },
) {
  return {
    meta: {
      order_id: meta?.orderId,
      customer_id: meta?.customerId,
      stripe_session_id: meta?.stripeSessionId,
      submitted_at: meta?.submittedAt ?? new Date().toISOString(),
    },
    contact: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
    },
    business: {
      what_you_do: data.whatYouDo,
      target_audience: data.targetAudience,
      competitive_advantage: data.competitiveAdvantage,
    },
    website_goal: {
      goals: data.websiteGoals,
      main_cta: data.mainCta,
    },
    structure: {
      sections: data.sections,
      custom_sections: data.customSections,
    },
    content: {
      has_texts: data.hasTexts,
      has_photos: data.hasPhotos,
      has_logo: data.hasLogo,
      content_links: data.contentLinks,
    },
    design: {
      style: data.designStyle,
      color_preference: data.colorPreference,
      custom_colors: data.customColors,
      inspiration_url: data.designInspiration,
    },
    technical: {
      has_domain: data.hasDomain,
      domain_name: data.domainName,
      language: data.language,
      contact_email: data.contactEmail || data.email,
      contact_phone: data.contactPhone || data.phone,
      contact_address: data.contactAddress,
    },
    instructions: {
      must_have: data.mustHave,
      must_not_have: data.mustNotHave,
    },
  };
}
