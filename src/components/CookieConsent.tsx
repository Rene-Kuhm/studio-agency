'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'cookie-consent';

type ConsentType = 'accepted' | 'rejected' | 'pending';

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentType>('pending');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent === 'accepted' || savedConsent === 'rejected') {
      setConsent(savedConsent);
    } else {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setConsent('accepted');
    setIsVisible(false);

    // Enable analytics if GA is configured
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setConsent('rejected');
    setIsVisible(false);

    // Disable analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }
  };

  // Don't render if consent was already given
  if (consent !== 'pending') return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="container mx-auto">
            <div className="bg-foreground text-background rounded-2xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold">Usamos cookies</h3>
                  </div>
                  <p className="text-background/70 text-sm md:text-base leading-relaxed">
                    Utilizamos cookies para mejorar tu experiencia de navegación,
                    analizar el tráfico del sitio y personalizar contenido.
                    Podés aceptar todas las cookies o rechazarlas.{' '}
                    <Link
                      href="/privacy"
                      className="text-accent hover:underline underline-offset-2"
                    >
                      Más información
                    </Link>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
                  <motion.button
                    onClick={handleReject}
                    className="px-6 py-3 text-sm font-medium text-background/70 hover:text-background border border-background/20 hover:border-background/40 rounded-xl transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Rechazar
                  </motion.button>
                  <motion.button
                    onClick={handleAccept}
                    className="px-6 py-3 text-sm font-medium bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Aceptar cookies
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
