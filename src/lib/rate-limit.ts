import { prisma } from './prisma';

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

// Fallback in-memory rate limiting (used when DB is unavailable)
const memoryRateLimit = new Map<string, { count: number; resetTime: number }>();

function isRateLimitedMemory(identifier: string): boolean {
  const now = Date.now();
  const record = memoryRateLimit.get(identifier);

  if (!record || now > record.resetTime) {
    memoryRateLimit.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

export async function isRateLimited(identifier: string): Promise<boolean> {
  // If no DATABASE_URL, use memory-based rate limiting
  if (!process.env.DATABASE_URL) {
    return isRateLimitedMemory(identifier);
  }

  try {
    const now = new Date();
    const resetAt = new Date(now.getTime() + RATE_LIMIT_WINDOW);

    // Try to find existing rate limit record
    const existing = await prisma.rateLimit.findUnique({
      where: { id: identifier },
    });

    // If no record or expired, create new one
    if (!existing || existing.resetAt < now) {
      await prisma.rateLimit.upsert({
        where: { id: identifier },
        update: { count: 1, resetAt },
        create: { id: identifier, count: 1, resetAt },
      });
      return false;
    }

    // Check if limit exceeded
    if (existing.count >= MAX_REQUESTS) {
      return true;
    }

    // Increment counter
    await prisma.rateLimit.update({
      where: { id: identifier },
      data: { count: existing.count + 1 },
    });

    return false;
  } catch (error) {
    // Fallback to memory-based rate limiting on DB error
    console.error('Rate limit DB error, falling back to memory:', error);
    return isRateLimitedMemory(identifier);
  }
}

// Cleanup expired rate limit records (run periodically)
export async function cleanupRateLimits(): Promise<void> {
  if (!process.env.DATABASE_URL) return;

  try {
    await prisma.rateLimit.deleteMany({
      where: {
        resetAt: { lt: new Date() },
      },
    });
  } catch (error) {
    console.error('Rate limit cleanup error:', error);
  }
}
