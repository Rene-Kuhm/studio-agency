/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';

// Mock logger
jest.mock('@/lib/logger', () => ({
  logger: {
    formSubmission: jest.fn(),
    error: jest.fn(),
  },
}));

function createRequest(body: unknown, headers?: Record<string, string>): NextRequest {
  const request = new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
  return request;
}

// Generate unique IP for each test to avoid rate limiting conflicts
let testCounter = 0;
function getUniqueIP(): string {
  testCounter++;
  return `10.${Math.floor(testCounter / 256)}.${testCounter % 256}.1`;
}

describe('/api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('validation', () => {
    it('returns 400 when name is missing', async () => {
      const { POST } = await import('../contact/route');
      const request = createRequest({
        email: 'test@example.com',
        message: 'Hello there!',
      }, { 'x-forwarded-for': getUniqueIP() });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('campos requeridos');
    });

    it('returns 400 when email is missing', async () => {
      const { POST } = await import('../contact/route');
      const request = createRequest({
        name: 'Test User',
        message: 'Hello there!',
      }, { 'x-forwarded-for': getUniqueIP() });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('campos requeridos');
    });

    it('returns 400 when message is missing', async () => {
      const { POST } = await import('../contact/route');
      const request = createRequest({
        name: 'Test User',
        email: 'test@example.com',
      }, { 'x-forwarded-for': getUniqueIP() });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('campos requeridos');
    });

    it('returns 400 for invalid email format', async () => {
      const { POST } = await import('../contact/route');
      const request = createRequest({
        name: 'Test User',
        email: 'invalid-email',
        message: 'This is a valid message',
      }, { 'x-forwarded-for': getUniqueIP() });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('email válido');
    });

    it('returns 400 for message too short', async () => {
      const { POST } = await import('../contact/route');
      const request = createRequest({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Short',
      }, { 'x-forwarded-for': getUniqueIP() });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('al menos 10 caracteres');
    });

    it('returns 400 for message too long', async () => {
      const { POST } = await import('../contact/route');
      const request = createRequest({
        name: 'Test User',
        email: 'test@example.com',
        message: 'A'.repeat(5001),
      }, { 'x-forwarded-for': getUniqueIP() });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('demasiado largo');
    });
  });

  describe('successful submission', () => {
    it('returns success for valid contact form', async () => {
      const { POST } = await import('../contact/route');
      const request = createRequest({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a valid test message for the contact form.',
      }, { 'x-forwarded-for': getUniqueIP() });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain('Gracias por tu mensaje');
    });

    it('accepts optional company field', async () => {
      const { POST } = await import('../contact/route');
      const request = createRequest({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'This is a valid test message.',
      }, { 'x-forwarded-for': getUniqueIP() });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe('spam protection', () => {
    it('silently rejects honeypot submissions', async () => {
      const { POST } = await import('../contact/route');
      const request = createRequest({
        name: 'Spammer',
        email: 'spam@example.com',
        message: 'Buy my products!!!',
        website: 'http://spam-site.com', // Honeypot field
      }, { 'x-forwarded-for': getUniqueIP() });
      const response = await POST(request);
      const data = await response.json();

      // Returns success but doesn't actually process
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });

  describe('rate limiting', () => {
    it('enforces rate limiting after 3 requests', async () => {
      const { POST } = await import('../contact/route');
      const ip = '192.168.250.1';

      // Make 3 requests (the limit)
      for (let i = 0; i < 3; i++) {
        await POST(
          createRequest(
            {
              name: `User ${i}`,
              email: `user${i}@contact.com`,
              message: 'This is a test message for rate limiting.',
            },
            { 'x-forwarded-for': ip }
          )
        );
      }

      // 4th request should be rate limited
      const response = await POST(
        createRequest(
          {
            name: 'User 4',
            email: 'user4@contact.com',
            message: 'This message should be rate limited.',
          },
          { 'x-forwarded-for': ip }
        )
      );
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.error).toContain('Demasiadas solicitudes');
    });
  });

  describe('XSS protection', () => {
    it('sanitizes HTML in inputs', async () => {
      jest.resetModules();
      const { logger } = await import('@/lib/logger');
      const { POST } = await import('../contact/route');

      const request = createRequest({
        name: '<script>alert("xss")</script>',
        email: 'test@example.com',
        message: 'Test message with <b>HTML</b> content',
      }, { 'x-forwarded-for': getUniqueIP() });

      await POST(request);

      // Check that formSubmission was called with sanitized data
      expect(logger.formSubmission).toHaveBeenCalled();
      const callArgs = (logger.formSubmission as jest.Mock).mock.calls[0][1];
      expect(callArgs.name).not.toContain('<script>');
      expect(callArgs.name).toContain('&lt;script&gt;');
    });
  });
});
