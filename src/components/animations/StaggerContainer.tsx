'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { staggerContainer, staggerItem } from '@/lib/animations/variants';

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      variants={{
        ...staggerContainer,
        visible: {
          ...staggerContainer.visible,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div className={cn(className)} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
