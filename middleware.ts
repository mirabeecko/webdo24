import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Chráníme pouze admin UI, ne API (OAuth callback musí projít volně)
  if (
    pathname.startsWith('/keystatic') &&
    !pathname.startsWith('/api/keystatic')
  ) {
    const password = process.env.KEYSTATIC_PASSWORD;
    if (!password) return NextResponse.next();

    const auth = request.headers.get('authorization') ?? '';
    const [scheme, encoded] = auth.split(' ');

    if (scheme === 'Basic' && encoded) {
      const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
      const [, pass] = decoded.split(':');
      if (pass === password) return NextResponse.next();
    }

    return new NextResponse('Přístup odepřen', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Keystatic Admin"' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/keystatic/:path*'],
};
