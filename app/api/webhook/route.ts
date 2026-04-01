import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is missing.');
  return new Stripe(key);
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const type = session.metadata?.type;
    const vs = session.metadata?.vs;

    if (type === 'main') {
      const supabase = getSupabaseAdmin();

      // Najdi objednávku podle VS v poznámce a označ jako zaplacenou
      const { data: orders } = await supabase
        .from('webdo24_orders')
        .select('id')
        .ilike('note', `%VS: ${vs}%`)
        .limit(1);

      if (orders && orders.length > 0) {
        await supabase
          .from('webdo24_orders')
          .update({ status: 'paid', deposit_paid_at: new Date().toISOString() })
          .eq('id', orders[0].id);
        console.log(`[WEBHOOK] Order ${orders[0].id} (VS: ${vs}) marked as paid.`);
      } else {
        console.warn(`[WEBHOOK] Order not found for VS: ${vs}`);
      }
    }
  }

  return NextResponse.json({ received: true });
}
