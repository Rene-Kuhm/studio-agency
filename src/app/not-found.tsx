'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SplitText } from '@/components/animations/SplitText';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { MorphingBlob } from '@/components/animations/MorphingBlob';

export default function NotFound() {
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
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[12rem] md:text-[16rem] font-bold leading-none text-accent/20">
            404
          </span>
        </motion.div>

        {/* Title */}
        <div className="-mt-16 md:-mt-24">
          <SplitText
            as="h1"
            animation="chars-wave"
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
            delay={0.3}
            stagger={0.03}
            trigger="load"
          >
            Página no encontrada
          </SplitText>
        </div>

        {/* Description */}
        <motion.p
          className="mt-6 text-xl text-muted-foreground max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Lo sentimos, la página que buscas no existe o fue movida.
        </motion.p>

        {/* Actions */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <MagneticButton strength={0.3}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-accent transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Volver al inicio
            </Link>
          </MagneticButton>

          <MagneticButton strength={0.3}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border rounded-full font-medium hover:bg-secondary transition-colors"
            >
              Contactanos
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Helpful links */}
        <motion.div
          className="mt-16 pt-8 border-t border-border max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <p className="text-sm text-muted-foreground mb-4">
            Tal vez te interese visitar:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { href: '/services', label: 'Servicios' },
              { href: '/work', label: 'Proyectos' },
              { href: '/blog', label: 'Blog' },
              { href: '/about', label: 'Nosotros' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
