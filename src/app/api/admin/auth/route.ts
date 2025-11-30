import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

// Create a signed token with expiration
function createSignedToken(payload: object, expiresInHours: number = 24): string {
  const expiresAt = Date.now() + expiresInHours * 60 * 60 * 1000;
  const data = JSON.stringify({ ...payload, expiresAt });
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(data)
    .digest('hex');
  return Buffer.from(`${data}.${signature}`).toString('base64');
}

// Verify and decode a signed token
export function verifySignedToken(token: string): { valid: boolean; payload?: Record<string, unknown> } {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [data, signature] = decoded.split('.');

    if (!data || !signature) {
      return { valid: false };
    }

    const expectedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(data)
      .digest('hex');

    // Constant-time comparison to prevent timing attacks
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return { valid: false };
    }

    const payload = JSON.parse(data);

    // Check expiration
    if (payload.expiresAt && Date.now() > payload.expiresAt) {
      return { valid: false };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Constant-time comparison to prevent timing attacks
    const passwordBuffer = Buffer.from(password || '');
    const adminPasswordBuffer = Buffer.from(ADMIN_PASSWORD);

    const isValidPassword =
      passwordBuffer.length === adminPasswordBuffer.length &&
      crypto.timingSafeEqual(passwordBuffer, adminPasswordBuffer);

    if (isValidPassword) {
      // Create a signed session token with expiration
      const token = createSignedToken({
        role: 'admin',
        createdAt: Date.now(),
      }, 24);

      const cookieStore = await cookies();
      cookieStore.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    // Add delay to prevent brute force
    await new Promise(resolve => setTimeout(resolve, 1000));
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return NextResponse.json({ success: true });
}
