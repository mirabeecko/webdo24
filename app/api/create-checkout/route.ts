import { NextRequest, NextResponse } from 'next/server';

const VALID_PRICES = [4900, 9900, 2450, 4950, 2500, 5000]; // includes split payment halves

async function tryPersistLead(data: {
  message: string;
  name: string;
  email: string;
  phone: string;
  price: number;
  paymentMethod?: string;
  vs?: string;
  totalPrice?: number;
}): Promise<{ leadId: string | null; orderId: string | null }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { leadId: null, orderId: null };

  try {
    const { getSupabaseAdmin } = await import('@/lib/supabase-admin');
    const supabase = getSupabaseAdmin();

    const { data: lead, error: e1 } = await supabase
      .from('leads')
      .insert({ message: data.message, name: data.name, email: data.email, phone: data.phone })
      .select('id')
      .single();
    if (e1 || !lead) { console.error('lead insert:', e1); return { leadId: null, orderId: null }; }

    const { data: order, error: e2 } = await supabase
      .from('orders')
      .insert({
        lead_id: lead.id,
        price: data.totalPrice ?? data.price,
        paid: false,
        payment_method: data.paymentMethod ?? 'unknown',
        variable_symbol: data.vs ?? null,
      })
      .select('id')
      .single();
    if (e2 || !order) { console.error('order insert:', e2); return { leadId: lead.id, orderId: null }; }

    return { leadId: lead.id, orderId: order.id };
  } catch (err) {
    console.error('Supabase skipped:', err);
    return { leadId: null, orderId: null };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, name, email, phone, price, paymentMethod, vs, totalPrice } = body as {
      message: string;
      name: string;
      email: string;
      phone: string;
      price: number;
      paymentMethod?: string;
      vs?: string;
      totalPrice?: number;
    };

    if (!message || !name || !email || !phone) {
      return NextResponse.json({ error: 'Chybí povinné pole.' }, { status: 400 });
    }

    // Persist lead & order (best effort — Supabase optional)
    await tryPersistLead({ message, name, email, phone, price, paymentMethod, vs, totalPrice });

    // For non-card payments, just return success
    if (paymentMethod !== 'card') {
      return NextResponse.json({ success: true, vs });
    }

    // Card payment via Stripe
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json({ error: 'Platba kartou není momentálně dostupná.' }, { status: 503 });
    }

    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(key);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'czk',
            product_data: {
              name: 'Profesionální web na klíč do 24 hodin',
              description: 'webdo24.cz — vlastní design, hosting v ceně, texty v ceně.',
            },
            unit_amount: Number(price) * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        name,
        email,
        phone,
        type: 'main',
        ...(vs ? { vs } : {}),
      },
      success_url: `${baseUrl}/dekujeme?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/`,
      locale: 'cs',
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error('create-checkout error:', err);
    return NextResponse.json({ error: 'Chyba serveru. Zkuste to znovu.' }, { status: 500 });
  }
}
