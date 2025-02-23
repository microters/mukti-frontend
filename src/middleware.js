import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/bn')) {
    request.headers.set('x-i18n-lang', 'bn');
  } else {
    request.headers.set('x-i18n-lang', 'en');
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
