import { validateEnv, isAnalyticsEnabled, isEmailEnabled, SITE_URL, clientEnv, serverEnv } from '../env';

describe('env', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('clientEnv', () => {
    it('should have default SITE_URL', () => {
      expect(clientEnv.NEXT_PUBLIC_SITE_URL).toBeDefined();
      expect(typeof clientEnv.NEXT_PUBLIC_SITE_URL).toBe('string');
    });

    it('should export SITE_URL constant', () => {
      expect(SITE_URL).toBe(clientEnv.NEXT_PUBLIC_SITE_URL);
    });
  });

  describe('serverEnv', () => {
    it('should have NODE_ENV defined', () => {
      expect(serverEnv.NODE_ENV).toBeDefined();
    });
  });

  describe('validateEnv', () => {
    it('should return validation result object', () => {
      const result = validateEnv();

      expect(result).toHaveProperty('isValid');
      expect(result).toHaveProperty('missingVars');
      expect(result).toHaveProperty('warnings');
      expect(Array.isArray(result.missingVars)).toBe(true);
      expect(Array.isArray(result.warnings)).toBe(true);
    });

    it('should be valid when no required vars are missing', () => {
      const result = validateEnv();

      expect(result.isValid).toBe(true);
      expect(result.missingVars).toHaveLength(0);
    });
  });

  describe('isAnalyticsEnabled', () => {
    it('should return boolean', () => {
      expect(typeof isAnalyticsEnabled()).toBe('boolean');
    });

    it('should return false when GA_MEASUREMENT_ID is not set', () => {
      // In test environment, it's likely not set
      if (!clientEnv.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        expect(isAnalyticsEnabled()).toBe(false);
      }
    });
  });

  describe('isEmailEnabled', () => {
    it('should return boolean', () => {
      expect(typeof isEmailEnabled()).toBe('boolean');
    });

    it('should return false when RESEND_API_KEY is not set', () => {
      // In test environment, it's likely not set
      if (!serverEnv.RESEND_API_KEY) {
        expect(isEmailEnabled()).toBe(false);
      }
    });
  });
});
