'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SplitText } from '@/components/animations/SplitText';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { MorphingBlob } from '@/components/animations/MorphingBlob';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background blobs */}
      <MorphingBlob
        className="top-20 -right-40"
        color="var(--accent)"
        size={400}
        speed={12}
      />
      <MorphingBlob
        className="bottom-20 -left-40"
        color="var(--accent-secondary)"
        size={350}
        speed={15}
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Error Icon */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
            <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </motion.div>

        {/* Title */}
        <SplitText
          as="h1"
          animation="chars-wave"
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
          delay={0.3}
          stagger={0.03}
          trigger="load"
        >
          Algo salió mal
        </SplitText>

        {/* Description */}
        <motion.p
          className="mt-6 text-xl text-muted-foreground max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Lo sentimos, ocurrió un error inesperado. Por favor, intentá de nuevo.
        </motion.p>

        {/* Error digest for debugging */}
        {error.digest && (
          <motion.p
            className="mt-4 text-sm text-muted-foreground/60 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Error ID: {error.digest}
          </motion.p>
        )}

        {/* Actions */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <MagneticButton strength={0.3}>
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-accent transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Intentar de nuevo
            </button>
          </MagneticButton>

          <MagneticButton strength={0.3}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border rounded-full font-medium hover:bg-secondary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Volver al inicio
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Support link */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <p className="text-sm text-muted-foreground">
            ¿El problema persiste?{' '}
            <Link href="/contact" className="text-accent hover:underline">
              Contactanos
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
