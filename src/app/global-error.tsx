'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="es">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center px-6">
            <h1 className="text-4xl font-bold mb-4">Algo salid mal</h1>
            <p className="text-muted-foreground mb-8">
              Lo sentimos, ocurrid un error inesperado.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-full hover:opacity-90 transition-opacity"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
