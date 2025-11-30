'use client';

import { type ReactNode } from 'react';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </ThemeProvider>
  );
}
