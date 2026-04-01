import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const UPSELLS = {
  seo: { name: 'SEO boost', price: 990, mode: 'payment' },
  texty: { name: 'Texty na míru', price: 1990, mode: 'payment' },
  sprava: { name: 'Správa webu', price: 990, mode: 'subscription' },
} as const;

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is missing.');
  return new Stripe(key);
}

export async function POST(request: NextRequest) {
  try {
    const { upsellId } = await request.json();

    const upsell = UPSELLS[upsellId as keyof typeof UPSELLS];
    if (!upsell) {
      return NextResponse.json({ error: 'Neplatný upsell.' }, { status: 400 });
    }

    const stripe = getStripe();

    if (upsell.mode === 'subscription') {
      // Pro správu webu — recurring platba
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price_data: {
              currency: 'czk',
              product_data: { name: upsell.name },
              unit_amount: upsell.price * 100,
              recurring: { interval: 'month' },
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dekujeme`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dekujeme`,
        locale: 'cs',
      });
      return NextResponse.json({ checkoutUrl: session.url });
    }

    // Jednorázová platba
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'czk',
            product_data: { name: upsell.name },
            unit_amount: upsell.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: { type: 'upsell', upsell_id: upsellId },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dekujeme`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dekujeme`,
      locale: 'cs',
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error('upsell-checkout error:', err);
    return NextResponse.json({ error: 'Chyba serveru.' }, { status: 500 });
  }
}
