import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_SECRET = process.env.SESSION_SECRET || '';

// Convert string to Uint8Array for Web Crypto API
function stringToUint8Array(str: string): Uint8Array<ArrayBuffer> {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(str);
  // Return a new Uint8Array with ArrayBuffer type for Web Crypto compatibility
  return new Uint8Array(encoded.buffer.slice(encoded.byteOffset, encoded.byteOffset + encoded.byteLength));
}

// Convert ArrayBuffer to hex string
function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Verify signed token using Web Crypto API (Edge compatible)
async function verifyToken(token: string): Promise<boolean> {
  try {
    // Decode base64
    const decoded = atob(token);
    const lastDotIndex = decoded.lastIndexOf('.');

    if (lastDotIndex === -1) {
      return false;
    }

    const data = decoded.substring(0, lastDotIndex);
    const signature = decoded.substring(lastDotIndex + 1);

    if (!data || !signature || !SESSION_SECRET) {
      return false;
    }

    // Create HMAC key using Web Crypto API
    const key = await crypto.subtle.importKey(
      'raw',
      stringToUint8Array(SESSION_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    // Sign the data
    const signatureBuffer = await crypto.subtle.sign(
      'HMAC',
      key,
      stringToUint8Array(data)
    );

    const expectedSignature = arrayBufferToHex(signatureBuffer);

    // Verify signature (constant time comparison)
    if (signature.length !== expectedSignature.length) {
      return false;
    }

    let mismatch = 0;
    for (let i = 0; i < signature.length; i++) {
      mismatch |= signature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
    }

    if (mismatch !== 0) {
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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes (except login page)
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    const session = request.cookies.get('admin_session');

    if (!session?.value || !(await verifyToken(session.value))) {
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
