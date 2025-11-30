import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

const SESSION_SECRET = process.env.SESSION_SECRET || '';

// Verify signed token in middleware (Edge compatible)
function verifyToken(token: string): boolean {
  try {
    // Use atob for Edge runtime compatibility
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const lastDotIndex = decoded.lastIndexOf('.');

    if (lastDotIndex === -1) {
      return false;
    }

    const data = decoded.substring(0, lastDotIndex);
    const signature = decoded.substring(lastDotIndex + 1);

    if (!data || !signature || !SESSION_SECRET) {
      return false;
    }

    const expectedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(data)
      .digest('hex');

    // Verify signature
    if (signature !== expectedSignature) {
      return false;
    }

    const payload = JSON.parse(data);

    // Check expiration
    if (payload.expiresAt && Date.now() > payload.expiresAt) {
      return false;
    }

    // Check role
    if (payload.role !== 'admin') {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes (except login page)
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    const session = request.cookies.get('admin_session');

    if (!session?.value || !verifyToken(session.value)) {
      // Clear invalid cookie and redirect
      const response = NextResponse.redirect(new URL('/admin', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
