import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';
import HomeClient from '../components/HomeClient';

export default async function Home() {
  const reader = createReader(process.cwd(), keystaticConfig);

  const [homepage, settings] = await Promise.all([
    reader.singletons.homepage.read(),
    reader.singletons.settings.read(),
  ]);

  const hp = homepage!;
  const st = settings!;

  return (
    <HomeClient
      salePrice={hp.salePrice ?? 4900}
      regularPrice={hp.regularPrice ?? 9900}
      timerSeconds={hp.timerSeconds ?? 900}
      heroHeading={hp.heroHeading}
      heroSubheading={hp.heroSubheading}
      heroBadges={[...hp.heroBadges]}
      stats={[...hp.stats]}
      features={[...hp.features]}
      processSteps={[...hp.processSteps]}
      testimonials={[...hp.testimonials]}
      guarantees={[...hp.guarantees]}
      faqs={[...hp.faqs]}
      bankIban={st.bankIban ?? process.env.NEXT_PUBLIC_BANK_IBAN ?? 'CZ6508000000192000145399'}
      bankAccountDisplay={st.bankAccountDisplay ?? process.env.NEXT_PUBLIC_BANK_ACCOUNT ?? '192000145399/0800'}
    />
  );
}
