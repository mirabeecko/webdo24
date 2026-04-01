export interface Package {
  id: 'start' | 'pro' | 'machine';
  name: string;
  price: number;
  originalPrice?: number;
  priceFormatted: string;
  depositFormatted: string;
  priceNote: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  deliveryTime: string;
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

export interface TrustPoint {
  title: string;
  description: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
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

export interface OrderFormData {
  // Step 1 — Kontakt
  name: string;
  email: string;
  phone: string;
  company: string;

  // Step 2 — O podnikání
  whatYouDo: string;
  targetAudience: string;
  competitiveAdvantage: string;

  // Step 3 — Cíl webu
  websiteGoals: string[];
  mainCta: string;

  // Step 4 — Struktura webu
  sections: string[];
  customSections: string;

  // Step 5 — Obsah
  hasTexts: string;
  hasPhotos: string;
  hasLogo: string;
  contentLinks: string;

  // Step 6 — Design
  designStyle: string;
  colorPreference: string;
  customColors: string;
  designInspiration: string;

  // Step 7 — Technické
  hasDomain: string;
  domainName: string;
  language: string[];
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;

  // Step 8 — Instrukce
  mustHave: string;
  mustNotHave: string;

  // Interní
  selectedPackage: 'start' | 'pro' | 'machine' | '';
}

export interface CreateOrderPayload extends OrderFormData {
  selectedPackage: 'start' | 'pro' | 'machine';
}
