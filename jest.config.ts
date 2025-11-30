import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

const config: Config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],

  // Test environment
  testEnvironment: 'jsdom',

  // Module path aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Test patterns
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],

  // Coverage configuration
  // Focus on testable business logic, not visual components that are covered by E2E tests
  collectCoverageFrom: [
    'src/lib/**/*.{ts,tsx}',
    'src/components/*.{ts,tsx}',
    'src/components/ui/**/*.{ts,tsx}',
    'src/app/api/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/types.ts',
    '!src/lib/prisma.ts', // Prisma client singleton, tested via integration
    '!src/lib/animations/**', // Animation variants, tested via E2E
    '!src/components/Analytics.tsx', // Analytics, tested via E2E
    '!src/app/api/csrf/route.ts', // CSRF route uses server-only cookies
    '!src/lib/blog/**', // Blog utilities use fs, tested via E2E
  ],

  // Coverage thresholds for core business logic
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 70,
      statements: 70,
    },
  },

  // Ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/e2e/',
  ],

  // Transform ignore patterns
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};

export default createJestConfig(config);
