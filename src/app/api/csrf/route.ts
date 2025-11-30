import { NextResponse } from 'next/server';
import { getCsrfToken } from '@/lib/csrf';

export async function GET() {
  const token = await getCsrfToken();

  const response = NextResponse.json({ token });

  // Set the CSRF token as an HttpOnly cookie
  response.cookies.set('csrf_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return response;
}
