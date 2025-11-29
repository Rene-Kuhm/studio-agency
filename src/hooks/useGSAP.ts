'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseGSAPOptions {
  scope?: RefObject<HTMLElement | null>;
  dependencies?: unknown[];
}

export function useGSAP(
  callback: (context: gsap.Context) => void | (() => void),
  options: UseGSAPOptions = {}
) {
  const { scope, dependencies = [] } = options;
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      callback(ctx);
    }, scope?.current || undefined);

    contextRef.current = ctx;

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return contextRef;
}
