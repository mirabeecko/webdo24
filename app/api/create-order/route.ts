import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { generateBrief, generateJson } from '@/lib/brief';
import Stripe from 'stripe';
import type { OrderFormData } from '@/types';

function getBaseUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) throw new Error('NEXT_PUBLIC_BASE_URL is missing.');
  return baseUrl;
}

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error('STRIPE_SECRET_KEY is missing.');
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
    const body: OrderFormData = await request.json();

    const { name, email, phone, company } = body;

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Chybí povinné pole.' }, { status: 400 });
    }

    // 1. Uložit zákazníka do Supabase
    const { data: customer, error: customerError } = await supabaseAdmin
      .from('webdo24_customers')
      .upsert(
        { name, email, phone, company: company || null },
        { onConflict: 'email', ignoreDuplicates: false },
      )
      .select('id')
      .single();

    if (customerError) {
      console.error('Supabase customer error:', customerError);
      return NextResponse.json({ error: 'Chyba při ukládání zákazníka.' }, { status: 500 });
    }

    const submittedAt = new Date().toISOString();

    // 2. Vytvořit objednávku v Supabase
    const brief = generateBrief(body, { submittedAt });

    const { data: order, error: orderError } = await supabaseAdmin
      .from('webdo24_orders')
      .insert({
        customer_id: customer.id,
        package_id: PACKAGE.id,
        package_name: PACKAGE.name,
        total_price: PACKAGE.price,
        deposit_amount: PACKAGE.price,
        remaining_amount: 0,
        status: 'pending',
        industry: null,
        business_description: body.whatYouDo || null,
        design_style: body.designStyle || null,
        design_inspiration: body.designInspiration || null,
        has_logo: body.hasLogo || null,
        has_texts: body.hasTexts || null,
        has_photos: body.hasPhotos || null,
        note: brief,
      })
      .select('id')
      .single();

    if (orderError) {
      console.error('Supabase order error:', orderError);
      return NextResponse.json({ error: 'Chyba při vytváření objednávky.' }, { status: 500 });
    }

    // 3. Vytvořit Stripe Checkout Session
    const stripe = getStripe();
    const baseUrl = getBaseUrl();
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
      success_url: `${baseUrl}/dekujeme?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/objednat`,
      locale: 'cs',
    });

    // 4. Uložit platbu do Supabase
    await supabaseAdmin.from('webdo24_payments').insert({
      order_id: order.id,
      stripe_session_id: session.id,
      amount: PACKAGE.price,
      currency: 'czk',
      type: 'full',
      status: 'pending',
    });

    // 5. Odeslat do n8n (fire-and-forget — neblokuje checkout)
    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nUrl) {
      const payload = generateJson(body, {
        orderId: order.id,
        customerId: customer.id,
        stripeSessionId: session.id,
        submittedAt,
      });

      fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, brief }),
      }).catch((err) => console.error('[n8n] webhook error:', err));
    }

    return NextResponse.json({ checkoutUrl: session.url }, { status: 200 });
  } catch (error) {
    console.error('create-order error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Chyba serveru. Zkuste to znovu.' }, { status: 500 });
  }
}
