import { config, fields, singleton } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },

  singletons: {
    homepage: singleton({
      label: 'Hlavní stránka',
      path: 'content/homepage',
      format: { data: 'json' },
      schema: {
        heroHeading: fields.text({ label: 'Hlavní nadpis', multiline: true }),
        heroSubheading: fields.text({ label: 'Podnadpis', multiline: true }),
        heroBadges: fields.array(
          fields.text({ label: 'Badge' }),
          { label: 'Badges pod nadpisem', itemLabel: (props) => props.value ?? '' }
        ),
        salePrice: fields.number({ label: 'Akční cena (Kč)', defaultValue: 4900 }),
        regularPrice: fields.number({ label: 'Běžná cena (Kč)', defaultValue: 9900 }),
        timerSeconds: fields.number({ label: 'Délka odpočtu (sekundy)', defaultValue: 900 }),
        stats: fields.array(
          fields.object({
            val: fields.text({ label: 'Hodnota (např. 24h)' }),
            label: fields.text({ label: 'Popis' }),
          }),
          { label: 'Statistiky', itemLabel: (props) => props.fields.val.value ?? '' }
        ),
        features: fields.array(
          fields.object({
            icon: fields.text({ label: 'Ikona (emoji)' }),
            title: fields.text({ label: 'Nadpis' }),
            desc: fields.text({ label: 'Popis', multiline: true }),
          }),
          { label: 'Co získáte', itemLabel: (props) => props.fields.title.value ?? '' }
        ),
        processSteps: fields.array(
          fields.object({
            n: fields.text({ label: 'Číslo (01, 02...)' }),
            icon: fields.text({ label: 'Ikona' }),
            title: fields.text({ label: 'Nadpis' }),
            time: fields.text({ label: 'Čas' }),
            desc: fields.text({ label: 'Popis', multiline: true }),
          }),
          { label: 'Kroky procesu', itemLabel: (props) => props.fields.title.value ?? '' }
        ),
        testimonials: fields.array(
          fields.object({
            name: fields.text({ label: 'Jméno' }),
            company: fields.text({ label: 'Firma' }),
            text: fields.text({ label: 'Text reference', multiline: true }),
            result: fields.text({ label: 'Výsledek' }),
            initials: fields.text({ label: 'Iniciály' }),
          }),
          { label: 'Reference', itemLabel: (props) => props.fields.name.value ?? '' }
        ),
        guarantees: fields.array(
          fields.text({ label: 'Záruka', multiline: true }),
          { label: 'Záruky', itemLabel: (props) => props.value ?? '' }
        ),
        faqs: fields.array(
          fields.object({
            q: fields.text({ label: 'Otázka' }),
            a: fields.text({ label: 'Odpověď', multiline: true }),
          }),
          { label: 'FAQ', itemLabel: (props) => props.fields.q.value ?? '' }
        ),
      },
    }),

    settings: singleton({
      label: 'Nastavení',
      path: 'content/settings',
      format: { data: 'json' },
      schema: {
        logo: fields.image({
          label: 'Logo',
          directory: 'public/images',
          publicPath: '/images',
        }),
        siteName: fields.text({ label: 'Název webu' }),
        contactEmail: fields.text({ label: 'Kontaktní e-mail' }),
        bankIban: fields.text({ label: 'IBAN' }),
        bankAccountDisplay: fields.text({ label: 'Číslo účtu (zobrazované)' }),
      },
    }),
  },
});
