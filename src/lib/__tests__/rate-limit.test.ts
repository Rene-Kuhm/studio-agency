/**
 * @jest-environment node
 */

// Store original env
const originalEnv = { ...process.env };

// Mock prisma
const mockPrisma = {
  rateLimit: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
    update: jest.fn(),
    deleteMany: jest.fn(),
  },
};

jest.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}));

describe('Rate Limit utilities', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('isRateLimited with database', () => {
    beforeEach(() => {
      process.env.DATABASE_URL = 'postgresql://test';
    });

    it('allows first request', async () => {
      mockPrisma.rateLimit.findUnique.mockResolvedValue(null);
      mockPrisma.rateLimit.upsert.mockResolvedValue({ id: 'test', count: 1 });

      const { isRateLimited } = await import('../rate-limit');
      const result = await isRateLimited('test-ip');

      expect(result).toBe(false);
      expect(mockPrisma.rateLimit.upsert).toHaveBeenCalled();
    });

    it('allows requests under limit', async () => {
      const futureDate = new Date(Date.now() + 60000);
      mockPrisma.rateLimit.findUnique.mockResolvedValue({
        id: 'test',
        count: 2,
        resetAt: futureDate,
      });
      mockPrisma.rateLimit.update.mockResolvedValue({ id: 'test', count: 3 });

      const { isRateLimited } = await import('../rate-limit');
      const result = await isRateLimited('test-ip');

      expect(result).toBe(false);
      expect(mockPrisma.rateLimit.update).toHaveBeenCalled();
    });

    it('blocks requests at limit', async () => {
      const futureDate = new Date(Date.now() + 60000);
      mockPrisma.rateLimit.findUnique.mockResolvedValue({
        id: 'test',
        count: 3,
        resetAt: futureDate,
      });

      const { isRateLimited } = await import('../rate-limit');
      const result = await isRateLimited('test-ip');

      expect(result).toBe(true);
      expect(mockPrisma.rateLimit.update).not.toHaveBeenCalled();
    });

    it('resets expired records', async () => {
      const pastDate = new Date(Date.now() - 60000);
      mockPrisma.rateLimit.findUnique.mockResolvedValue({
        id: 'test',
        count: 10,
        resetAt: pastDate,
      });
      mockPrisma.rateLimit.upsert.mockResolvedValue({ id: 'test', count: 1 });

      const { isRateLimited } = await import('../rate-limit');
      const result = await isRateLimited('test-ip');

      expect(result).toBe(false);
      expect(mockPrisma.rateLimit.upsert).toHaveBeenCalled();
    });

    it('falls back to memory on DB error', async () => {
      mockPrisma.rateLimit.findUnique.mockRejectedValue(new Error('DB Error'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const { isRateLimited } = await import('../rate-limit');
      const result = await isRateLimited('test-ip');

      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Rate limit DB error'),
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('isRateLimited without database', () => {
    beforeEach(() => {
      delete process.env.DATABASE_URL;
    });

    it('uses memory-based rate limiting when no DATABASE_URL', async () => {
      const { isRateLimited } = await import('../rate-limit');
      const identifier = 'memory-test-' + Date.now();

      // First 3 requests should pass
      expect(await isRateLimited(identifier)).toBe(false);
      expect(await isRateLimited(identifier)).toBe(false);
      expect(await isRateLimited(identifier)).toBe(false);

      // 4th request should be blocked
      expect(await isRateLimited(identifier)).toBe(true);
    });
  });

  describe('cleanupRateLimits', () => {
    it('does nothing without DATABASE_URL', async () => {
      delete process.env.DATABASE_URL;

      const { cleanupRateLimits } = await import('../rate-limit');
      await cleanupRateLimits();

      expect(mockPrisma.rateLimit.deleteMany).not.toHaveBeenCalled();
    });

    it('deletes expired records with DATABASE_URL', async () => {
      process.env.DATABASE_URL = 'postgresql://test';
      mockPrisma.rateLimit.deleteMany.mockResolvedValue({ count: 5 });

      const { cleanupRateLimits } = await import('../rate-limit');
      await cleanupRateLimits();

      expect(mockPrisma.rateLimit.deleteMany).toHaveBeenCalledWith({
        where: {
          resetAt: { lt: expect.any(Date) },
        },
      });
    });

    it('handles cleanup errors gracefully', async () => {
      process.env.DATABASE_URL = 'postgresql://test';
      mockPrisma.rateLimit.deleteMany.mockRejectedValue(new Error('Cleanup Error'));

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const { cleanupRateLimits } = await import('../rate-limit');
      await cleanupRateLimits();

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Rate limit cleanup error'),
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });
});
