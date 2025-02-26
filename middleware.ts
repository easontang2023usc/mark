import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  let variant = req.cookies.get('ab_test_variant')?.value;

  // If no variant exists, randomly assign one
  if (!variant) {
    variant = Math.random() < 0.5 ? 'A' : 'B';

    const res = NextResponse.next();
    res.cookies.set('ab_test_variant', variant, { path: '/' });

    return res;
  }

  // Pass variant to the request headers for server-side detection
  const res = NextResponse.next();
  res.headers.set('X-AB-Test-Variant', variant);
  return res;
}

export const config = {
  matcher: '/', // Middleware runs only on the homepage
};
