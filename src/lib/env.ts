/**
 * Environment variable validation
 * This file validates that all required environment variables are set
 */

// Client-side environment variables (must be prefixed with NEXT_PUBLIC_)
export const clientEnv = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://tecnodespegue.com',
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
} as const;

// Server-side environment variables
export const serverEnv = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  NODE_ENV: process.env.NODE_ENV || 'development',
} as const;

// Validation function for production
export function validateEnv() {
  const missingVars: string[] = [];
  const warnings: string[] = [];

  // Check optional but recommended variables
  if (!clientEnv.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    warnings.push('NEXT_PUBLIC_GA_MEASUREMENT_ID is not set. Analytics will be disabled.');
  }

  if (!serverEnv.RESEND_API_KEY) {
    warnings.push('RESEND_API_KEY is not set. Email functionality will be disabled.');
  }

  // Log warnings in development
  if (serverEnv.NODE_ENV === 'development' && warnings.length > 0) {
    console.warn('⚠️ Environment variable warnings:');
    warnings.forEach((warning) => console.warn(`  - ${warning}`));
  }

  // Throw error if required variables are missing in production
  if (serverEnv.NODE_ENV === 'production' && missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missingVars.map((v) => `  - ${v}`).join('\n')}`
    );
  }

  return {
    isValid: missingVars.length === 0,
    missingVars,
    warnings,
  };
}

// Helper to check if analytics is enabled
export function isAnalyticsEnabled(): boolean {
  return !!clientEnv.NEXT_PUBLIC_GA_MEASUREMENT_ID;
}

// Helper to check if email is enabled
export function isEmailEnabled(): boolean {
  return !!serverEnv.RESEND_API_KEY;
}

// Export site URL for use across the app
export const SITE_URL = clientEnv.NEXT_PUBLIC_SITE_URL;
