'use client';

import Link from 'next/link';

export default function OfflinePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Offline icon */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-secondary flex items-center justify-center">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a5 5 0 01-1.414-7.072m0 0L9.879 5.636m-2.829 2.829L3 4.5"
            />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Sin conexión
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          Parece que no tenés conexión a Internet. Verificá tu conexión e intentá de nuevo.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-accent text-accent-foreground font-medium rounded-full hover:bg-accent/90 transition-colors"
          >
            Reintentar
          </button>

          <Link
            href="/"
            className="block w-full px-6 py-3 bg-secondary text-foreground font-medium rounded-full hover:bg-secondary/80 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Algunas páginas que visitaste anteriormente pueden estar disponibles sin conexión.
        </p>
      </div>
    </main>
  );
}
