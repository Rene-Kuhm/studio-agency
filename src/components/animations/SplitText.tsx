'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils/cn';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  animation?: 'chars' | 'words' | 'lines' | 'chars-rotate' | 'chars-wave';
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: 'load' | 'scroll';
  scrub?: boolean;
}

export function SplitText({
  children,
  className,
  as: Component = 'p',
  animation = 'chars',
  delay = 0,
  duration = 1,
  stagger = 0.02,
  trigger = 'scroll',
  scrub = false,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const container = containerRef.current;
    const text = children;

    // Split text into spans
    let html = '';
    if (animation === 'lines') {
      html = `<span class="line"><span class="line-inner">${text}</span></span>`;
    } else if (animation === 'words') {
      html = text
        .split(' ')
        .map((word) => `<span class="word"><span class="word-inner">${word}</span></span>`)
        .join(' ');
    } else {
      // chars animations - wrap words to preserve line breaks
      html = text
        .split(' ')
        .map((word) =>
          `<span class="word-wrap" style="display:inline-block;white-space:nowrap">${word
            .split('')
            .map((char) => `<span class="char" style="display:inline-block">${char}</span>`)
            .join('')}</span>`
        )
        .join(' ');
    }

    container.innerHTML = html;

    const elements =
      animation === 'lines'
        ? container.querySelectorAll('.line-inner')
        : animation === 'words'
        ? container.querySelectorAll('.word-inner')
        : container.querySelectorAll('.char');

    // Animation configs
    const getAnimation = () => {
      switch (animation) {
        case 'chars-rotate':
          return {
            from: { opacity: 0, rotateX: -90, y: 50 },
            to: { opacity: 1, rotateX: 0, y: 0, stagger, duration, ease: 'power4.out' },
          };
        case 'chars-wave':
          return {
            from: { opacity: 0, y: 100, scaleY: 0 },
            to: {
              opacity: 1,
              y: 0,
              scaleY: 1,
              stagger: { each: stagger, from: 'start' as const },
              duration,
              ease: 'elastic.out(1, 0.5)',
            },
          };
        case 'words':
          return {
            from: { opacity: 0, y: '100%' },
            to: { opacity: 1, y: '0%', stagger: stagger * 5, duration, ease: 'power4.out' },
          };
        case 'lines':
          return {
            from: { opacity: 0, y: '100%' },
            to: { opacity: 1, y: '0%', duration, ease: 'power4.out' },
          };
        default: // chars
          return {
            from: { opacity: 0, y: 20 },
            to: { opacity: 1, y: 0, stagger, duration: duration * 0.5, ease: 'power3.out' },
          };
      }
    };

    const { from, to } = getAnimation();

    gsap.set(elements, from);

    const animationConfig: gsap.TweenVars = {
      ...to,
      delay,
    };

    if (trigger === 'scroll') {
      animationConfig.scrollTrigger = {
        trigger: container,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: scrub ? undefined : 'play none none none',
        scrub: scrub ? 1 : false,
      };
    }

    gsap.to(elements, animationConfig);
    hasAnimated.current = true;

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [children, animation, delay, duration, stagger, trigger, scrub]);

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={cn('overflow-hidden', className)}
      style={{ perspective: animation === 'chars-rotate' ? '1000px' : undefined }}
    >
      {children}
    </Component>
  );
}
