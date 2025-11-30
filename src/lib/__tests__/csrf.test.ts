/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';

// Store original env
const originalEnv = process.env.NODE_ENV;

describe('CSRF utilities', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  describe('generateCsrfToken', () => {
    it('generates a 64 character hex string', async () => {
      const { generateCsrfToken } = await import('../csrf');
      const token = generateCsrfToken();
      expect(token).toHaveLength(64);
      expect(token).toMatch(/^[0-9a-f]+$/);
    });

    it('generates unique tokens', async () => {
      const { generateCsrfToken } = await import('../csrf');
      const token1 = generateCsrfToken();
      const token2 = generateCsrfToken();
      expect(token1).not.toBe(token2);
    });
  });

  describe('validateCsrfToken', () => {
    it('returns true for matching tokens', async () => {
      const { validateCsrfToken, generateCsrfToken } = await import('../csrf');
      const token = generateCsrfToken();

      const request = new NextRequest('http://localhost/api/test', {
        method: 'POST',
        headers: { 'x-csrf-token': token },
      });

      expect(validateCsrfToken(request, token)).toBe(true);
    });

    it('returns false for mismatched tokens', async () => {
      const { validateCsrfToken, generateCsrfToken } = await import('../csrf');
      const token1 = generateCsrfToken();
      const token2 = generateCsrfToken();

      const request = new NextRequest('http://localhost/api/test', {
        method: 'POST',
        headers: { 'x-csrf-token': token1 },
      });

      expect(validateCsrfToken(request, token2)).toBe(false);
    });

    it('returns false when header token is missing', async () => {
      const { validateCsrfToken, generateCsrfToken } = await import('../csrf');
      const token = generateCsrfToken();

      const request = new NextRequest('http://localhost/api/test', {
        method: 'POST',
      });

      expect(validateCsrfToken(request, token)).toBe(false);
    });

    it('returns false when cookie token is empty', async () => {
      const { validateCsrfToken, generateCsrfToken } = await import('../csrf');
      const token = generateCsrfToken();

      const request = new NextRequest('http://localhost/api/test', {
        method: 'POST',
        headers: { 'x-csrf-token': token },
      });

      expect(validateCsrfToken(request, '')).toBe(false);
    });

    it('returns false for tokens of different lengths', async () => {
      const { validateCsrfToken } = await import('../csrf');

      const request = new NextRequest('http://localhost/api/test', {
        method: 'POST',
        headers: { 'x-csrf-token': 'short' },
      });

      expect(validateCsrfToken(request, 'muchLongerToken')).toBe(false);
    });
  });

  describe('isValidOrigin', () => {
    it('returns true in development mode', async () => {
      process.env.NODE_ENV = 'development';
      const { isValidOrigin } = await import('../csrf');

      const request = new NextRequest('http://localhost/api/test', {
        method: 'POST',
        headers: { origin: 'http://evil-site.com' },
      });

      expect(isValidOrigin(request)).toBe(true);
    });

    it('returns true for allowed origin in production', async () => {
      process.env.NODE_ENV = 'production';
      jest.resetModules();
      const { isValidOrigin } = await import('../csrf');

      const request = new NextRequest('https://tecnodespegue.com/api/test', {
        method: 'POST',
        headers: { origin: 'https://tecnodespegue.com' },
      });

      expect(isValidOrigin(request)).toBe(true);
    });

    it('returns true for www subdomain in production', async () => {
      process.env.NODE_ENV = 'production';
      jest.resetModules();
      const { isValidOrigin } = await import('../csrf');

      const request = new NextRequest('https://tecnodespegue.com/api/test', {
        method: 'POST',
        headers: { origin: 'https://www.tecnodespegue.com' },
      });

      expect(isValidOrigin(request)).toBe(true);
    });

    it('returns false for disallowed origin in production', async () => {
      process.env.NODE_ENV = 'production';
      jest.resetModules();
      const { isValidOrigin } = await import('../csrf');

      const request = new NextRequest('https://tecnodespegue.com/api/test', {
        method: 'POST',
        headers: { origin: 'https://evil-site.com' },
      });

      expect(isValidOrigin(request)).toBe(false);
    });

    it('uses referer as fallback when origin is missing', async () => {
      process.env.NODE_ENV = 'production';
      jest.resetModules();
      const { isValidOrigin } = await import('../csrf');

      const request = new NextRequest('https://tecnodespegue.com/api/test', {
        method: 'POST',
        headers: { referer: 'https://tecnodespegue.com/contact' },
      });

      expect(isValidOrigin(request)).toBe(true);
    });

    it('returns false for invalid referer URL', async () => {
      process.env.NODE_ENV = 'production';
      jest.resetModules();
      const { isValidOrigin } = await import('../csrf');

      const request = new NextRequest('https://tecnodespegue.com/api/test', {
        method: 'POST',
        headers: { referer: 'not-a-valid-url' },
      });

      expect(isValidOrigin(request)).toBe(false);
    });

    it('returns false when both origin and referer are missing in production', async () => {
      process.env.NODE_ENV = 'production';
      jest.resetModules();
      const { isValidOrigin } = await import('../csrf');

      const request = new NextRequest('https://tecnodespegue.com/api/test', {
        method: 'POST',
      });

      expect(isValidOrigin(request)).toBe(false);
    });
  });
});
