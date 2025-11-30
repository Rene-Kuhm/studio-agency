import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Work } from '@/components/sections/Work';
import { About } from '@/components/sections/About';
import { Technologies } from '@/components/sections/Technologies';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://tecnodespegue.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://tecnodespegue.com/#organization',
      name: 'TecnoDespegue',
      url: 'https://tecnodespegue.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tecnodespegue.com/icon-512.png',
        width: 512,
        height: 512,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+54-2334-409838',
        contactType: 'customer service',
        areaServed: 'AR',
        availableLanguage: 'Spanish',
      },
      sameAs: [
        'https://twitter.com/tecnodespegue',
        'https://instagram.com/tecnodespegue',
        'https://linkedin.com/company/tecnodespegue',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://tecnodespegue.com/#website',
      url: 'https://tecnodespegue.com',
      name: 'TecnoDespegue',
      description: 'Agencia digital especializada en desarrollo web, branding y experiencias digitales.',
      publisher: {
        '@id': 'https://tecnodespegue.com/#organization',
      },
      inLanguage: 'es-AR',
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://tecnodespegue.com/#localbusiness',
      name: 'TecnoDespegue',
      description: 'Agencia digital especializada en desarrollo web, branding y experiencias digitales que impulsan tu negocio.',
      url: 'https://tecnodespegue.com',
      telephone: '+54-2334-409838',
      email: 'hola@tecnodespegue.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Buenos Aires',
        addressCountry: 'AR',
      },
      priceRange: '$$',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Services />
      <Work />
      <About />
      <Technologies />
      <CTA />
    </>
  );
}
