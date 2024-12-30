import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  // If the user is not logged in and trying to access protected routes
  if (!session && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // If the user is logged in and trying to access auth page
  if (session && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Add the paths that you want to protect
export const config = {
  matcher: ['/', '/posts/:path*', '/profile/:path*', '/auth/:path*']
};