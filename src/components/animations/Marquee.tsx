'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils/cn';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  repeat?: number;
}

export function Marquee({
  children,
  className,
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
  repeat = 4,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const items = track.children;
    if (items.length === 0) return;

    const totalWidth = (items[0] as HTMLElement).offsetWidth * repeat;
    const duration = totalWidth / speed;

    gsap.set(track, { x: direction === 'left' ? 0 : -totalWidth / 2 });

    const tl = gsap.to(track, {
      x: direction === 'left' ? -totalWidth / 2 : 0,
      duration,
      ease: 'none',
      repeat: -1,
    });

    if (pauseOnHover) {
      containerRef.current.addEventListener('mouseenter', () => tl.pause());
      containerRef.current.addEventListener('mouseleave', () => tl.play());
    }

    return () => {
      tl.kill();
    };
  }, [speed, direction, pauseOnHover, repeat]);

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden whitespace-nowrap', className)}
    >
      <div ref={trackRef} className="inline-flex">
        {Array.from({ length: repeat }).map((_, i) => (
          <div key={i} className="inline-flex shrink-0">
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
