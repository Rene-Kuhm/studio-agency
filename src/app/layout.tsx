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
    default: 'Studio - Agencia Creativa Digital',
    template: '%s | Studio',
  },
  description:
    'Agencia creativa especializada en diseño web, branding y experiencias digitales de alto impacto. Creamos marcas que conectan.',
  keywords: [
    'agencia creativa',
    'diseño web',
    'branding',
    'desarrollo web',
    'experiencias digitales',
    'UX/UI',
    'motion design',
  ],
  authors: [{ name: 'Studio' }],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://studio.com',
    siteName: 'Studio',
    title: 'Studio - Agencia Creativa Digital',
    description:
      'Agencia creativa especializada en diseño web, branding y experiencias digitales de alto impacto.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio - Agencia Creativa Digital',
    description:
      'Agencia creativa especializada en diseño web, branding y experiencias digitales de alto impacto.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
