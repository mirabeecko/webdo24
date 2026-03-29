import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import Stripe from 'stripe';

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is missing.');
  }
  return new Stripe(secretKey);
}

const PACKAGE = {
  id: 'pro',
  name: 'Profesionální web na klíč — webdo24.cz',
  price: 9900,
} as const;

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const stripe = getStripe();
    const body = await request.json();

    const { name, email, phone, company, selectedPackage, industry, businessDescription, designStyle, designInspiration, hasLogo, hasTexts, hasPhotos, note } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Chybí povinné pole.' }, { status: 400 });
    }

    // 1. Uložit zákazníka do Supabase
    const { data: customer, error: customerError } = await supabaseAdmin
      .from('do24_customers')
      .upsert(
        { name, email, phone, company: company || null },
        { onConflict: 'email', ignoreDuplicates: false }
      )
      .select('id')
      .single();

    if (customerError) {
      console.error('Supabase customer error:', customerError);
      return NextResponse.json({ error: 'Chyba při ukládání zákazníka.' }, { status: 500 });
    }

    // 2. Vytvořit objednávku v Supabase
    const { data: order, error: orderError } = await supabaseAdmin
      .from('do24_orders')
      .insert({
        customer_id: customer.id,
        package_id: PACKAGE.id,
        package_name: PACKAGE.name,
        total_price: PACKAGE.price,
        deposit_amount: PACKAGE.price,
        remaining_amount: 0,
        status: 'pending',
        industry: industry || null,
        business_description: businessDescription || null,
        design_style: designStyle || null,
        design_inspiration: designInspiration || null,
        has_logo: hasLogo || null,
        has_texts: hasTexts || null,
        has_photos: hasPhotos || null,
        note: note || null,
      })
      .select('id')
      .single();

    if (orderError) {
      console.error('Supabase order error:', orderError);
      return NextResponse.json({ error: 'Chyba při vytváření objednávky.' }, { status: 500 });
    }

    // 3. Vytvořit Stripe Checkout Session (celá částka)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'czk',
            product_data: {
              name: PACKAGE.name,
              description: 'Vlastní design, hosting v ceně, texty v ceně, základní SEO, 1 revize zdarma.',
            },
            unit_amount: PACKAGE.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        order_id: order.id,
        customer_id: customer.id,
        package_id: PACKAGE.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dekujeme?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/objednat`,
      locale: 'cs',
    });

    // 4. Uložit platbu do Supabase
    await supabaseAdmin.from('do24_payments').insert({
      order_id: order.id,
      stripe_session_id: session.id,
      amount: PACKAGE.price,
      currency: 'czk',
      type: 'full',
      status: 'pending',
    });

    return NextResponse.json({ checkoutUrl: session.url }, { status: 200 });
  } catch (error) {
    console.error('create-order error:', error);
    return NextResponse.json({ error: 'Chyba serveru. Zkuste to znovu.' }, { status: 500 });
  }
}
