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
  company: string;
  email: string;
  phone: string;

  // Step 2 — Produkt
  selectedPackage: 'start' | 'pro' | 'machine' | '';

  // Step 3 — Byznys
  industry: string;
  businessDescription: string;

  // Step 4 — Styl
  designStyle: string;
  designInspiration: string;

  // Step 5 — Obsah
  hasLogo: string;
  hasTexts: string;
  hasPhotos: string;

  // Step 6 — Poznámka
  note: string;
}

export interface CreateOrderPayload extends OrderFormData {
  selectedPackage: 'start' | 'pro' | 'machine';
}
