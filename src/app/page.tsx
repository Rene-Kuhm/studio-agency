import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Work } from '@/components/sections/Work';
import { About } from '@/components/sections/About';
import { CTA } from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <About />
      <CTA />
    </>
  );
}
