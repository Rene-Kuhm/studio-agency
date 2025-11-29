'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitText } from '@/components/animations/SplitText';
import { HoverCard } from '@/components/animations/HoverCard';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Diseño Web',
    description:
      'Creamos sitios web modernos y responsivos que convierten visitantes en clientes.',
    features: ['UI/UX Design', 'Design Systems', 'Prototipos', 'Responsive'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Desarrollo',
    description:
      'Desarrollamos aplicaciones web robustas con las últimas tecnologías.',
    features: ['Next.js / React', 'E-commerce', 'APIs', 'CMS'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Branding',
    description:
      'Construimos marcas memorables que comunican tu esencia.',
    features: ['Identidad Visual', 'Logo Design', 'Brand Guidelines', 'Naming'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Motion Design',
    description:
      'Damos vida a tu marca con animaciones y experiencias interactivas.',
    features: ['Animaciones UI', 'Video Motion', '3D', 'Micro-interactions'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.service-card');

    // Staggered reveal animation
    gsap.fromTo(
      cards,
      {
        y: 100,
        opacity: 0,
        rotateX: -15,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <ScrollReveal animation="fade-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-accent" />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
                Servicios
              </span>
            </div>
            <SplitText
              as="h2"
              animation="words"
              className="text-4xl md:text-6xl font-bold tracking-tight"
              trigger="scroll"
            >
              Lo que hacemos mejor
            </SplitText>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2} className="lg:pt-12">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Combinamos estrategia, diseño y tecnología para crear soluciones
              digitales que impulsan tu negocio al siguiente nivel.
            </p>
          </ScrollReveal>
        </div>

        {/* Services grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ perspective: '1000px' }}
        >
          {services.map((service, index) => (
            <HoverCard
              key={service.number}
              className="service-card"
              glare
              tilt
              scale
            >
              <motion.div
                className="group relative p-8 md:p-10 bg-secondary/50 backdrop-blur-sm rounded-3xl border border-border hover:border-accent/30 transition-colors h-full"
                data-cursor="Ver más"
              >
                {/* Number background */}
                <span className="absolute top-6 right-6 text-[8rem] font-bold text-border/50 leading-none select-none pointer-events-none">
                  {service.number}
                </span>

                {/* Icon */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  {service.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="px-3 py-1.5 text-sm bg-background/50 rounded-full border border-border"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow */}
                <motion.div
                  className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
}
