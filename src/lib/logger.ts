/**
 * Production-safe logger
 * Only logs in development or when explicitly enabled
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

const isDevelopment = process.env.NODE_ENV === 'development';

function formatLog(entry: LogEntry): string {
  const { level, message, data, timestamp } = entry;
  const dataStr = data ? ` ${JSON.stringify(data)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${dataStr}`;
}

function createLogEntry(
  level: LogLevel,
  message: string,
  data?: Record<string, unknown>
): LogEntry {
  return {
    level,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
}

export const logger = {
  debug: (message: string, data?: Record<string, unknown>) => {
    if (isDevelopment) {
      console.debug(formatLog(createLogEntry('debug', message, data)));
    }
  },

  info: (message: string, data?: Record<string, unknown>) => {
    if (isDevelopment) {
      console.info(formatLog(createLogEntry('info', message, data)));
    }
    // In production, you could send to a logging service here
    // Example: sendToLoggingService(createLogEntry('info', message, data));
  },

  warn: (message: string, data?: Record<string, unknown>) => {
    console.warn(formatLog(createLogEntry('warn', message, data)));
  },

  error: (message: string, error?: Error | unknown, data?: Record<string, unknown>) => {
    const errorData = {
      ...data,
      ...(error instanceof Error
        ? {
            errorMessage: error.message,
            errorStack: isDevelopment ? error.stack : undefined,
          }
        : { error: String(error) }),
    };
    console.error(formatLog(createLogEntry('error', message, errorData)));

    // In production, send to error tracking service (Sentry, etc.)
    // Example: captureException(error, { extra: data });
  },

  // Special method for form submissions - logs in dev, silent in prod
  formSubmission: (type: string, data: Record<string, unknown>) => {
    if (isDevelopment) {
      // Sanitize sensitive data
      const sanitizedData = { ...data };
      if ('email' in sanitizedData) {
        sanitizedData.email = '***@***.***';
      }
      if ('ip' in sanitizedData) {
        sanitizedData.ip = '***';
      }
      console.info(formatLog(createLogEntry('info', `Form submission: ${type}`, sanitizedData)));
    }
  },
};

export default logger;
