import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from './providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Cursor } from '@/components/animations/Cursor';
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
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
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
  themeColor: '#a67c52',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased gradient-mesh">
        <Providers>
          {/* Noise texture overlay */}
          <div className="noise" />

          {/* Custom cursor */}
          <Cursor />

          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
