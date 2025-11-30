/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { POST } from '../newsletter/route';

// Mock logger
jest.mock('@/lib/logger', () => ({
  logger: {
    formSubmission: jest.fn(),
    error: jest.fn(),
  },
}));

function createRequest(body: unknown, headers?: Record<string, string>): NextRequest {
  const request = new NextRequest('http://localhost/api/newsletter', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
  return request;
}

describe('/api/newsletter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 when email is missing', async () => {
    const request = createRequest({});
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('El email es requerido.');
  });

  it('returns 400 for invalid email format', async () => {
    const request = createRequest({ email: 'invalid-email' });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Por favor, ingresá un email válido.');
  });

  it('successfully subscribes a valid email', async () => {
    const request = createRequest({ email: 'test@example.com' });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toContain('Gracias por suscribirte');
  });

  it('returns 400 for duplicate subscription', async () => {
    const email = 'duplicate@example.com';

    // First subscription
    const request1 = createRequest({ email }, { 'x-forwarded-for': '192.168.1.1' });
    await POST(request1);

    // Second subscription attempt with same email but different IP to avoid rate limit
    const request2 = createRequest({ email }, { 'x-forwarded-for': '192.168.1.2' });
    const response = await POST(request2);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Este email ya está suscrito.');
  });

  it('normalizes email to lowercase', async () => {
    const request1 = createRequest(
      { email: 'Test@Example.com' },
      { 'x-forwarded-for': '192.168.2.1' }
    );
    await POST(request1);

    // Try with lowercase version - should detect as duplicate
    const request2 = createRequest(
      { email: 'test@example.com' },
      { 'x-forwarded-for': '192.168.2.2' }
    );
    const response = await POST(request2);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Este email ya está suscrito.');
  });

  it('enforces rate limiting', async () => {
    const ip = '192.168.100.1';

    // Make 3 requests (the limit)
    for (let i = 0; i < 3; i++) {
      await POST(
        createRequest({ email: `user${i}@ratelimit.com` }, { 'x-forwarded-for': ip })
      );
    }

    // 4th request should be rate limited
    const response = await POST(
      createRequest({ email: 'user4@ratelimit.com' }, { 'x-forwarded-for': ip })
    );
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toContain('Demasiadas solicitudes');
  });

  it('accepts valid email formats', async () => {
    const validEmails = [
      'simple@example.com',
      'very.common@example.com',
      'plus+tag@example.org',
      'user.name@example.co.uk',
    ];

    for (const email of validEmails) {
      const request = createRequest(
        { email },
        { 'x-forwarded-for': `10.0.0.${validEmails.indexOf(email)}` }
      );
      const response = await POST(request);

      expect(response.status).toBe(200);
    }
  });
});
