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

const PACKAGES = {
  start: { name: 'Do24 START', price: 4990, deposit: 2495 },
  pro: { name: 'Do24 PRO', price: 9990, deposit: 4995 },
  machine: { name: 'Do24 MACHINE', price: 19990, deposit: 9995 },
} as const;

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const stripe = getStripe();
    const body = await request.json();

    const { name, email, phone, company, selectedPackage, industry, businessDescription, designStyle, designInspiration, hasLogo, hasTexts, hasPhotos, note } = body;

    if (!name || !email || !phone || !selectedPackage) {
      return NextResponse.json({ error: 'Chybí povinné pole.' }, { status: 400 });
    }

    if (!(selectedPackage in PACKAGES)) {
      return NextResponse.json({ error: 'Neplatný balíček.' }, { status: 400 });
    }

    const pkg = PACKAGES[selectedPackage as keyof typeof PACKAGES];

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
        package_id: selectedPackage,
        package_name: pkg.name,
        total_price: pkg.price,
        deposit_amount: pkg.deposit,
        remaining_amount: pkg.price - pkg.deposit,
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

    // 3. Vytvořit Stripe Checkout Session (50% záloha)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'czk',
            product_data: {
              name: `${pkg.name} — záloha 50 %`,
              description: `Web do 24 hodin. Zbytek doplatíte po spuštění webu.`,
            },
            unit_amount: pkg.deposit * 100, // Stripe uses haléře
          },
          quantity: 1,
        },
      ],
      metadata: {
        order_id: order.id,
        customer_id: customer.id,
        package_id: selectedPackage,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dekujeme?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/objednat`,
      locale: 'cs',
    });

    // 4. Uložit platbu do Supabase
    await supabaseAdmin.from('do24_payments').insert({
      order_id: order.id,
      stripe_session_id: session.id,
      amount: pkg.deposit,
      currency: 'czk',
      type: 'deposit',
      status: 'pending',
    });

    return NextResponse.json({ checkoutUrl: session.url }, { status: 200 });
  } catch (error) {
    console.error('create-order error:', error);
    return NextResponse.json({ error: 'Chyba serveru. Zkuste to znovu.' }, { status: 500 });
  }
}
