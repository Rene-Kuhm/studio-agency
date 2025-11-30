'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/providers/ThemeProvider';

interface CommentsProps {
  slug: string;
}

// Giscus configuration - set these in your environment variables
const GISCUS_REPO = process.env.NEXT_PUBLIC_GISCUS_REPO || 'Rene-Kuhm/studio-agency';
const GISCUS_REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '';
const GISCUS_CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'Comments';
const GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '';

export function Comments({ slug }: CommentsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  // Don't render if Giscus is not configured
  const isConfigured = GISCUS_REPO_ID && GISCUS_CATEGORY_ID;

  useEffect(() => {
    if (!ref.current || !isConfigured) return;

    // Clear previous comments
    ref.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    // Giscus configuration
    script.setAttribute('data-repo', GISCUS_REPO);
    script.setAttribute('data-repo-id', GISCUS_REPO_ID);
    script.setAttribute('data-category', GISCUS_CATEGORY);
    script.setAttribute('data-category-id', GISCUS_CATEGORY_ID);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', resolvedTheme === 'dark' ? 'dark' : 'light');
    script.setAttribute('data-lang', 'es');
    script.setAttribute('data-loading', 'lazy');

    ref.current.appendChild(script);

    return () => {
      // Cleanup
      if (ref.current) {
        ref.current.innerHTML = '';
      }
    };
  }, [slug, resolvedTheme, isConfigured]);

  // Update theme when it changes
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (iframe) {
      iframe.contentWindow?.postMessage(
        {
          giscus: {
            setConfig: {
              theme: resolvedTheme === 'dark' ? 'dark' : 'light',
            },
          },
        },
        'https://giscus.app'
      );
    }
  }, [resolvedTheme]);

  // Show setup instructions if not configured
  if (!isConfigured) {
    return (
      <section className="mt-16 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
        <div className="p-6 bg-secondary/50 rounded-xl text-muted-foreground">
          <p className="mb-2">Los comentarios estarán disponibles próximamente.</p>
          <p className="text-sm">
            Para habilitar los comentarios, configura las variables de entorno de Giscus.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="text-2xl font-bold mb-8">Comentarios</h2>
      <div ref={ref} className="giscus" />
    </section>
  );
}
