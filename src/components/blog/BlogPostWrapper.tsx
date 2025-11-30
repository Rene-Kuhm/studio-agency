'use client';

import { useRef } from 'react';
import { ReadingProgress } from './ReadingProgress';

interface BlogPostWrapperProps {
  children: React.ReactNode;
}

export function BlogPostWrapper({ children }: BlogPostWrapperProps) {
  const articleRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={articleRef}>
      <ReadingProgress />
      {children}
    </div>
  );
}
