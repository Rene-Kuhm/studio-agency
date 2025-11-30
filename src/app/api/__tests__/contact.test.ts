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
    contactMessage: {
      create: jest.fn().mockResolvedValue({ id: '1' }),
    },
  },
}));

function createRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('/api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validation', () => {
    it('returns 400 when name is missing', async () => {
      const { POST } = await import('../contact/route');
      const response = await POST(createRequest({
        email: 'test@example.com',
        message: 'Hello there!',
      }));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('campos requeridos');
    });

    it('returns 400 when email is missing', async () => {
      const { POST } = await import('../contact/route');
      const response = await POST(createRequest({
        name: 'Test User',
        message: 'Hello there!',
      }));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('campos requeridos');
    });

    it('returns 400 when message is missing', async () => {
      const { POST } = await import('../contact/route');
      const response = await POST(createRequest({
        name: 'Test User',
        email: 'test@example.com',
      }));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('campos requeridos');
    });

    it('returns 400 for invalid email format', async () => {
      const { POST } = await import('../contact/route');
      const response = await POST(createRequest({
        name: 'Test User',
        email: 'invalid-email',
        message: 'This is a valid message',
      }));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('email válido');
    });

    it('returns 400 for message too short', async () => {
      const { POST } = await import('../contact/route');
      const response = await POST(createRequest({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Short',
      }));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('al menos 10 caracteres');
    });

    it('returns 400 for message too long', async () => {
      const { POST } = await import('../contact/route');
      const response = await POST(createRequest({
        name: 'Test User',
        email: 'test@example.com',
        message: 'A'.repeat(5001),
      }));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('demasiado largo');
    });
  });

  describe('successful submission', () => {
    it('returns success for valid contact form', async () => {
      const { POST } = await import('../contact/route');
      const response = await POST(createRequest({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a valid test message for the contact form.',
      }));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain('Gracias por tu mensaje');
    });

    it('accepts optional company field', async () => {
      const { POST } = await import('../contact/route');
      const response = await POST(createRequest({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'This is a valid test message.',
      }));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe('spam protection', () => {
    it('silently rejects honeypot submissions', async () => {
      const { POST } = await import('../contact/route');
      const response = await POST(createRequest({
        name: 'Spammer',
        email: 'spam@example.com',
        message: 'Buy my products!!!',
        website: 'http://spam-site.com',
      }));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe('rate limiting', () => {
    it('enforces rate limiting', async () => {
      const rateLimitMock = await import('@/lib/rate-limit');
      (rateLimitMock.isRateLimited as jest.Mock).mockResolvedValueOnce(true);

      const { POST } = await import('../contact/route');
      const response = await POST(createRequest({
        name: 'User',
        email: 'user@contact.com',
        message: 'This message should be rate limited.',
      }));
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.error).toContain('Demasiadas solicitudes');
    });
  });

  describe('XSS protection', () => {
    it('sanitizes HTML in inputs', async () => {
      const loggerMock = await import('@/lib/logger');
      const { POST } = await import('../contact/route');

      await POST(createRequest({
        name: '<script>alert("xss")</script>',
        email: 'test@example.com',
        message: 'Test message with <b>HTML</b> content',
      }));

      expect(loggerMock.logger.formSubmission).toHaveBeenCalled();
      const callArgs = (loggerMock.logger.formSubmission as jest.Mock).mock.calls[0][1];
      expect(callArgs.name).not.toContain('<script>');
      expect(callArgs.name).toContain('&lt;script&gt;');
    });
  });

  describe('CSRF protection', () => {
    it('rejects requests from invalid origins', async () => {
      const csrfMock = await import('@/lib/csrf');
      (csrfMock.isValidOrigin as jest.Mock).mockReturnValueOnce(false);

      const { POST } = await import('../contact/route');
      const response = await POST(createRequest({
        name: 'User',
        email: 'user@example.com',
        message: 'This should be rejected.',
      }));
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.error).toContain('no autorizada');
    });
  });
});
