import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from './providers';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { Analytics } from '@/components/Analytics';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Version for cache busting (update when changing icons)
const ICON_VERSION = 'v2';

export const metadata: Metadata = {
  metadataBase: new URL('https://tecnodespegue.com'),
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
  icons: {
    icon: [
      { url: `/icon?${ICON_VERSION}`, sizes: '32x32', type: 'image/png' },
      { url: `/icon.svg?${ICON_VERSION}`, type: 'image/svg+xml' },
    ],
    shortcut: `/icon?${ICON_VERSION}`,
    apple: [
      { url: `/apple-icon?${ICON_VERSION}`, sizes: '180x180', type: 'image/png' },
    ],
  },
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
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://giscus.app" />
      </head>
      <body className="antialiased gradient-mesh">
        <Analytics />
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
