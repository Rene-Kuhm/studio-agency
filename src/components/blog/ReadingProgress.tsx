'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ReadingProgressProps {
  target?: React.RefObject<HTMLElement | null>;
}

export function ReadingProgress({ target }: ReadingProgressProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: target,
    offset: ['start start', 'end end'],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar after scrolling past the hero
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Progress bar at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Circular progress indicator */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-12 h-12">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-secondary"
            />
            <motion.circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-accent"
              style={{
                pathLength: scrollYProgress,
              }}
              strokeDasharray="100"
              strokeDashoffset="0"
            />
          </svg>

          {/* Scroll to top button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute inset-0 flex items-center justify-center bg-background rounded-full shadow-lg hover:bg-secondary transition-colors"
            aria-label="Volver arriba"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </motion.div>
    </>
  );
}
