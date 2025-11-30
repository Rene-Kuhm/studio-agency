'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '@/components/animations/MagneticButton';

interface NewsletterFormProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function NewsletterForm({ variant = 'light', className = '' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus('error');
      setMessage('Por favor, ingresá tu email.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al suscribirse');
      }

      setStatus('success');
      setMessage(data.message);
      setEmail('');

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Error al suscribirse');
    }
  };

  const isDark = variant === 'dark';

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center justify-center gap-3 py-4 ${
              isDark ? 'text-background' : 'text-foreground'
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <span className={isDark ? 'text-background/80' : 'text-foreground/80'}>
              {message}
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                disabled={status === 'loading'}
                className={`w-full px-5 py-3 rounded-xl transition-colors focus:outline-none ${
                  isDark
                    ? 'bg-background/10 border border-background/20 text-background placeholder:text-background/40 focus:border-accent'
                    : 'bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-accent'
                } ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
            </div>
            <MagneticButton strength={0.3}>
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`px-6 py-3 bg-accent text-accent-foreground rounded-xl font-medium transition-all ${
                  status === 'loading'
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-accent/90'
                }`}
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  'Suscribirse'
                )}
              </button>
            </MagneticButton>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Error message */}
      <AnimatePresence>
        {status === 'error' && message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 text-sm text-red-500 text-center"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
