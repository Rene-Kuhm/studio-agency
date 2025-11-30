import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from './providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Cursor } from '@/components/animations/Cursor';
import { Analytics } from '@/components/Analytics';
import { CookieConsent } from '@/components/CookieConsent';
import { SkipLink } from '@/components/SkipLink';
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'TecnoDespegue - Agencia Digital',
    template: '%s | TecnoDespegue',
  },
  description:
    'Agencia digital especializada en desarrollo web, branding y experiencias digitales que impulsan tu negocio al siguiente nivel.',
  keywords: [
    'agencia digital',
    'desarrollo web',
    'diseño web',
    'branding',
    'experiencias digitales',
    'UX/UI',
    'aplicaciones web',
    'tecnología',
  ],
  authors: [{ name: 'TecnoDespegue' }],
  manifest: '/manifest.json',
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://tecnodespegue.com',
    siteName: 'TecnoDespegue',
    title: 'TecnoDespegue - Agencia Digital',
    description:
      'Agencia digital especializada en desarrollo web, branding y experiencias digitales que impulsan tu negocio.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TecnoDespegue - Agencia Digital',
    description:
      'Agencia digital especializada en desarrollo web, branding y experiencias digitales que impulsan tu negocio.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#a67c52',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased gradient-mesh">
        <Analytics />
        <Providers>
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
        </Providers>
      </body>
    </html>
  );
}
