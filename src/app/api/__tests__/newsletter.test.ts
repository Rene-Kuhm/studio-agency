/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';

// Mock all dependencies
jest.mock('@/lib/logger', () => ({
  logger: {
    formSubmission: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@/lib/csrf', () => ({
  isValidOrigin: jest.fn().mockReturnValue(true),
}));

jest.mock('@/lib/rate-limit', () => ({
  isRateLimited: jest.fn().mockResolvedValue(false),
}));

// Mock prisma with proper structure
jest.mock('@/lib/prisma', () => ({
  prisma: {
    subscriber: {
      findUnique: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({ id: '1', email: 'test@example.com' }),
      update: jest.fn().mockResolvedValue({ id: '1', email: 'test@example.com', active: true }),
    },
  },
}));

function createRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/newsletter', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('/api/newsletter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 when email is missing', async () => {
    const { POST } = await import('../newsletter/route');
    const response = await POST(createRequest({}));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('El email es requerido.');
  });

  it('returns 400 for invalid email format', async () => {
    const { POST } = await import('../newsletter/route');
    const response = await POST(createRequest({ email: 'invalid-email' }));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Por favor, ingresá un email válido.');
  });

  it('successfully subscribes a valid email', async () => {
    const { POST } = await import('../newsletter/route');
    const response = await POST(createRequest({ email: 'newuser@example.com' }));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toContain('Gracias por suscribirte');
  });

  it('enforces rate limiting', async () => {
    const rateLimitMock = await import('@/lib/rate-limit');
    (rateLimitMock.isRateLimited as jest.Mock).mockResolvedValueOnce(true);

    const { POST } = await import('../newsletter/route');
    const response = await POST(createRequest({ email: 'test@example.com' }));
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toContain('Demasiadas solicitudes');
  });
});
