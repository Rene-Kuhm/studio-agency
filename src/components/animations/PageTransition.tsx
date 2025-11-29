'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Page content */}
        <motion.div
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
            },
            exit: {
              opacity: 0,
              transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {children}
        </motion.div>

        {/* Slide overlay */}
        <motion.div
          className="fixed inset-0 z-[100] bg-foreground origin-bottom"
          initial={{ scaleY: 0 }}
          animate={{
            scaleY: [0, 1, 1, 0],
            originY: ['100%', '100%', '0%', '0%'],
          }}
          transition={{
            duration: 1,
            times: [0, 0.4, 0.6, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Logo/text reveal during transition */}
        <motion.div
          className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1,
            times: [0, 0.3, 0.7, 1],
            ease: 'easeInOut',
          }}
        >
          <motion.span
            className="text-4xl md:text-6xl font-bold text-background"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: [20, 0, 0, -20],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1,
              times: [0, 0.3, 0.7, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            STUDIO
          </motion.span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
