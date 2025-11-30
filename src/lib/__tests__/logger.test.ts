/**
 * @jest-environment node
 */

// Import logger after mocking console to ensure spies work
const originalConsole = { ...console };

describe('logger', () => {
  let consoleSpy: {
    debug: jest.SpyInstance;
    info: jest.SpyInstance;
    warn: jest.SpyInstance;
    error: jest.SpyInstance;
  };

  beforeEach(() => {
    jest.resetModules();
    consoleSpy = {
      debug: jest.spyOn(console, 'debug').mockImplementation(),
      info: jest.spyOn(console, 'info').mockImplementation(),
      warn: jest.spyOn(console, 'warn').mockImplementation(),
      error: jest.spyOn(console, 'error').mockImplementation(),
    };
  });

  afterEach(() => {
    Object.values(consoleSpy).forEach((spy) => spy.mockRestore());
  });

  afterAll(() => {
    Object.assign(console, originalConsole);
  });

  describe('warn', () => {
    it('should log warning messages in any environment', async () => {
      const { logger } = await import('../logger');
      logger.warn('Test warning');

      expect(consoleSpy.warn).toHaveBeenCalledTimes(1);
      expect(consoleSpy.warn).toHaveBeenCalledWith(
        expect.stringContaining('[WARN] Test warning')
      );
    });

    it('should include data in warning logs', async () => {
      const { logger } = await import('../logger');
      logger.warn('Warning with data', { key: 'value' });

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        expect.stringContaining('"key":"value"')
      );
    });
  });

  describe('error', () => {
    it('should log error messages', async () => {
      const { logger } = await import('../logger');
      logger.error('Test error');

      expect(consoleSpy.error).toHaveBeenCalledTimes(1);
      expect(consoleSpy.error).toHaveBeenCalledWith(
        expect.stringContaining('[ERROR] Test error')
      );
    });

    it('should include Error object details', async () => {
      const { logger } = await import('../logger');
      const error = new Error('Something went wrong');
      logger.error('Test error', error);

      expect(consoleSpy.error).toHaveBeenCalledWith(
        expect.stringContaining('Something went wrong')
      );
    });

    it('should include additional data with errors', async () => {
      const { logger } = await import('../logger');
      const error = new Error('Failed');
      logger.error('Test error', error, { userId: 123 });

      expect(consoleSpy.error).toHaveBeenCalledWith(
        expect.stringContaining('"userId":123')
      );
    });

    it('should handle non-Error objects', async () => {
      const { logger } = await import('../logger');
      logger.error('Test error', 'string error');

      expect(consoleSpy.error).toHaveBeenCalledWith(
        expect.stringContaining('string error')
      );
    });
  });

  describe('log format', () => {
    it('should include timestamp in ISO format', async () => {
      const { logger } = await import('../logger');
      logger.warn('Test');

      const call = consoleSpy.warn.mock.calls[0][0];
      // Check for ISO timestamp pattern [YYYY-MM-DDTHH:mm:ss.sssZ]
      expect(call).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    it('should include log level', async () => {
      const { logger } = await import('../logger');
      logger.warn('Test');

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        expect.stringContaining('[WARN]')
      );
    });
  });
});
