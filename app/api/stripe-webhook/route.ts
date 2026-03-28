import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is missing.');
  }

  return new Stripe(secretKey);
}

export async function POST(request: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin();
  const stripe = getStripe();
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.order_id;

      if (!orderId) break;

      // Aktualizovat platbu
      await supabaseAdmin
        .from('do24_payments')
        .update({
          status: 'paid',
          stripe_payment_intent_id: session.payment_intent as string,
          paid_at: new Date().toISOString(),
        })
        .eq('stripe_session_id', session.id);

      // Aktualizovat objednávku
      await supabaseAdmin
        .from('do24_orders')
        .update({ status: 'deposit_paid', deposit_paid_at: new Date().toISOString() })
        .eq('id', orderId);

      // Vytvořit projekt
      await supabaseAdmin.from('do24_projects').insert({
        order_id: orderId,
        status: 'in_progress',
        started_at: new Date().toISOString(),
      });

      console.log(`[WEBHOOK] Order ${orderId} — záloha zaplacena, projekt zahájen.`);
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;

      await supabaseAdmin
        .from('do24_payments')
        .update({ status: 'expired' })
        .eq('stripe_session_id', session.id);
      break;
    }

    case 'payment_intent.payment_failed': {
      const pi = event.data.object as Stripe.PaymentIntent;

      await supabaseAdmin
        .from('do24_payments')
        .update({ status: 'failed' })
        .eq('stripe_payment_intent_id', pi.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
