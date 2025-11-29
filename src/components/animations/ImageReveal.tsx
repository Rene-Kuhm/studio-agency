'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils/cn';

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  duration?: number;
  trigger?: 'scroll' | 'load';
}

export function ImageReveal({
  children,
  className,
  direction = 'left',
  delay = 0,
  duration = 1.2,
  trigger = 'scroll',
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !overlayRef.current || !imageRef.current) return;

    const overlay = overlayRef.current;
    const image = imageRef.current;

    const getTransformOrigin = () => {
      switch (direction) {
        case 'left':
          return 'right';
        case 'right':
          return 'left';
        case 'top':
          return 'bottom';
        case 'bottom':
          return 'top';
        default:
          return 'right';
      }
    };

    const getScaleProperty = () => {
      return direction === 'left' || direction === 'right' ? 'scaleX' : 'scaleY';
    };

    gsap.set(overlay, { [getScaleProperty()]: 1, transformOrigin: getTransformOrigin() });
    gsap.set(image, { scale: 1.3 });

    const tl = gsap.timeline({
      delay,
      scrollTrigger:
        trigger === 'scroll'
          ? {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          : undefined,
    });

    tl.to(overlay, {
      [getScaleProperty()]: 0,
      duration,
      ease: 'power4.inOut',
    }).to(
      image,
      {
        scale: 1,
        duration: duration * 1.2,
        ease: 'power3.out',
      },
      `-=${duration * 0.8}`
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [direction, delay, duration, trigger]);

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden', className)}>
      <div ref={imageRef} className="w-full h-full">
        {children}
      </div>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-accent z-10"
        style={{ transformOrigin: direction === 'left' || direction === 'right' ? 'right' : 'bottom' }}
      />
    </div>
  );
}
