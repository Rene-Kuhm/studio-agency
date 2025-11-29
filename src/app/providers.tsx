'use client';

import { type ReactNode } from 'react';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
