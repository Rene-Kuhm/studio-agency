'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils/cn';

interface MorphingBlobProps {
  className?: string;
  color?: string;
  size?: number;
  speed?: number;
}

export function MorphingBlob({
  className,
  color = 'var(--accent)',
  size = 400,
  speed = 8,
}: MorphingBlobProps) {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blobRef.current) return;

    const blob = blobRef.current;

    // Generate random border-radius values
    const generateRadius = () => {
      const r1 = Math.random() * 40 + 30;
      const r2 = Math.random() * 40 + 30;
      const r3 = Math.random() * 40 + 30;
      const r4 = Math.random() * 40 + 30;
      const r5 = Math.random() * 40 + 30;
      const r6 = Math.random() * 40 + 30;
      const r7 = Math.random() * 40 + 30;
      const r8 = Math.random() * 40 + 30;

      return `${r1}% ${100 - r1}% ${r2}% ${100 - r2}% / ${r3}% ${r4}% ${100 - r4}% ${100 - r3}%`;
    };

    const animate = () => {
      gsap.to(blob, {
        borderRadius: generateRadius(),
        duration: speed,
        ease: 'power1.inOut',
        onComplete: animate,
      });
    };

    animate();

    // Floating animation
    gsap.to(blob, {
      y: -20,
      duration: speed / 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    return () => {
      gsap.killTweensOf(blob);
    };
  }, [speed]);

  return (
    <div
      ref={blobRef}
      className={cn('absolute blur-3xl opacity-30 animate-pulse-glow', className)}
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
      }}
    />
  );
}
