'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export function TextReveal({
  text,
  className,
  delay = 0,
  once = true,
  as: Component = 'p',
}: TextRevealProps) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.div
      className={cn('flex flex-wrap', className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-[0.25em] inline-block"
          variants={child}
        >
          <Component className="inline">{word}</Component>
        </motion.span>
      ))}
    </motion.div>
  );
}
