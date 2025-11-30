'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { Cursor } from '@/components/animations/Cursor';
import { CookieConsent } from '@/components/CookieConsent';
import { SkipLink } from '@/components/SkipLink';
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    // Admin pages don't have header/footer
    return <>{children}</>;
  }

  return (
    <>
      {/* Skip link for accessibility */}
      <SkipLink />

      {/* Noise texture overlay */}
      <div className="noise" aria-hidden="true" />

      {/* Custom cursor */}
      <Cursor />

      <Header />
      <main id="main-content" className="min-h-screen" role="main">
        {children}
      </main>
      <Footer />
      <CookieConsent />
      <ServiceWorkerRegistration />
    </>
  );
}
