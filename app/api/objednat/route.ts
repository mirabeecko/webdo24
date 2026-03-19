import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.email || !data.name) {
      return NextResponse.json(
        { error: 'Chybí povinné pole: jméno nebo email.' },
        { status: 400 }
      );
    }

    // Here you would save to DB (Supabase ready) or send email notification
    // For now, we log to console and return success
    console.log('[OBJEDNÁVKA]', {
      timestamp: new Date().toISOString(),
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      package: data.selectedPackage,
      delivery: data.delivery,
    });

    // TODO: integrate with Supabase
    // const { error } = await supabase.from('orders').insert([{ ...data, created_at: new Date() }])

    // TODO: send notification email via Resend / SendGrid
    // await sendNotificationEmail(data)

    return NextResponse.json(
      {
        success: true,
        message: 'Poptávka přijata. Ozveme se do 24 hodin.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[OBJEDNÁVKA ERROR]', error);
    return NextResponse.json(
      { error: 'Chyba serveru. Zkuste to znovu nebo nás kontaktujte přímo.' },
      { status: 500 }
    );
  }
}
