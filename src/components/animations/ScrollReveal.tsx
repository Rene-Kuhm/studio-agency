'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils/cn';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?:
    | 'fade-up'
    | 'fade-down'
    | 'fade-left'
    | 'fade-right'
    | 'scale'
    | 'rotate'
    | 'clip-up'
    | 'clip-down'
    | 'blur';
  delay?: number;
  duration?: number;
  distance?: number;
  scrub?: boolean;
  start?: string;
  end?: string;
  markers?: boolean;
}

export function ScrollReveal({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  duration = 1,
  distance = 100,
  scrub = false,
  start = 'top 85%',
  end = 'bottom 20%',
  markers = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const getAnimation = () => {
      switch (animation) {
        case 'fade-up':
          return { from: { opacity: 0, y: distance }, to: { opacity: 1, y: 0 } };
        case 'fade-down':
          return { from: { opacity: 0, y: -distance }, to: { opacity: 1, y: 0 } };
        case 'fade-left':
          return { from: { opacity: 0, x: distance }, to: { opacity: 1, x: 0 } };
        case 'fade-right':
          return { from: { opacity: 0, x: -distance }, to: { opacity: 1, x: 0 } };
        case 'scale':
          return { from: { opacity: 0, scale: 0.8 }, to: { opacity: 1, scale: 1 } };
        case 'rotate':
          return {
            from: { opacity: 0, rotate: 10, y: distance / 2 },
            to: { opacity: 1, rotate: 0, y: 0 },
          };
        case 'clip-up':
          return {
            from: { clipPath: 'inset(100% 0% 0% 0%)' },
            to: { clipPath: 'inset(0% 0% 0% 0%)' },
          };
        case 'clip-down':
          return {
            from: { clipPath: 'inset(0% 0% 100% 0%)' },
            to: { clipPath: 'inset(0% 0% 0% 0%)' },
          };
        case 'blur':
          return {
            from: { opacity: 0, filter: 'blur(20px)', y: distance / 2 },
            to: { opacity: 1, filter: 'blur(0px)', y: 0 },
          };
        default:
          return { from: { opacity: 0, y: distance }, to: { opacity: 1, y: 0 } };
      }
    };

    const { from, to } = getAnimation();

    gsap.set(element, from);

    gsap.to(element, {
      ...to,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        toggleActions: scrub ? undefined : 'play none none none',
        scrub: scrub ? 1 : false,
        markers,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [animation, delay, duration, distance, scrub, start, end, markers]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
