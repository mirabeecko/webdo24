export interface Package {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  target: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  cta: string;
}

export interface Testimonial {
  name: string;
  company: string;
  role: string;
  text: string;
  result?: string;
  initials: string;
  color: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface OrderFormData {
  // Step 1 — Kontakt
  name: string;
  company: string;
  email: string;
  phone: string;

  // Step 2 — Podnikání
  industry: string;
  location: string;
  businessDescription: string;

  // Step 3 — Cíl webu
  goals: string[];

  // Step 4 — Rozsah
  websiteType: string;

  // Step 5 — Sekce
  sections: string[];

  // Step 6 — Obsah
  hasLogo: string;
  hasTexts: string;
  hasPhotos: string;

  // Step 7 — Design
  designStyle: string;
  designInspiration: string;

  // Step 8 — Marketing
  seoInterest: string;
  ppcInterest: string;
  managementInterest: string;

  // Step 9 — Termín
  delivery: string;
  selectedPackage: string;

  // Step 10 — Poznámka
  note: string;
}
