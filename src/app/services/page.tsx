'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitText } from '@/components/animations/SplitText';
import { HoverCard } from '@/components/animations/HoverCard';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { Marquee } from '@/components/animations/Marquee';
import { MorphingBlob } from '@/components/animations/MorphingBlob';
import { Button } from '@/components/ui/Button';
import { CTA } from '@/components/sections/CTA';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'web-design',
    number: '01',
    title: 'Diseño Web',
    description:
      'Creamos sitios web que combinan estética y funcionalidad. Cada diseño está pensado para comunicar tu marca y convertir visitantes en clientes.',
    features: [
      'Diseño UI/UX personalizado',
      'Responsive y mobile-first',
      'Prototipos interactivos',
      'Design systems escalables',
      'Optimización de conversión',
      'Testing con usuarios reales',
    ],
    color: '#a67c52',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'development',
    number: '02',
    title: 'Desarrollo Web',
    description:
      'Transformamos diseños en experiencias web rápidas, seguras y escalables usando las últimas tecnologías del mercado.',
    features: [
      'Next.js & React',
      'E-commerce solutions',
      'CMS Headless',
      'APIs & integraciones',
      'Optimización de performance',
      'SEO técnico',
    ],
    color: '#c9a87c',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 'branding',
    number: '03',
    title: 'Branding',
    description:
      'Construimos identidades de marca memorables que comunican tu esencia y te diferencian de la competencia.',
    features: [
      'Estrategia de marca',
      'Diseño de logo',
      'Identidad visual completa',
      'Brand guidelines',
      'Naming & messaging',
      'Aplicaciones de marca',
    ],
    color: '#8b7355',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: 'motion',
    number: '04',
    title: 'Motion Design',
    description:
      'Damos vida a tu marca con animaciones y experiencias interactivas que capturan la atención y generan engagement.',
    features: [
      'Animaciones UI',
      'Videos promocionales',
      'Micro-interacciones',
      'Experiencias 3D',
      'Animaciones de logo',
      'Social media content',
    ],
    color: '#d4a574',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const process = [
  {
    step: '01',
    title: 'Descubrimiento',
    description:
      'Investigamos tu negocio, audiencia y competencia para entender el contexto.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Estrategia',
    description:
      'Desarrollamos un plan que alinea la solución con tus objetivos de negocio.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Diseño',
    description:
      'Creamos conceptos visuales y prototipos, incorporando tu feedback.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Desarrollo',
    description:
      'Implementamos con código limpio, optimizado y mejores prácticas.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    step: '05',
    title: 'Lanzamiento',
    description:
      'Desplegamos y te acompañamos en la optimización continua.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (!servicesRef.current) return;

    const items = servicesRef.current.querySelectorAll('.service-detail');

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <MorphingBlob
          className="top-20 -right-40"
          color="var(--accent)"
          size={500}
          speed={12}
        />
        <MorphingBlob
          className="bottom-40 -left-40"
          color="var(--accent-secondary)"
          size={400}
          speed={15}
        />

        <motion.div
          className="container mx-auto px-6 pt-40 pb-20 relative z-10"
          style={{ y, opacity }}
        >
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <motion.span
                className="w-12 h-[2px] bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ transformOrigin: 'left' }}
              />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
                Servicios
              </span>
            </motion.div>

            <div className="space-y-2">
              <SplitText
                as="h1"
                animation="chars-rotate"
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
                delay={0.3}
                stagger={0.02}
                trigger="load"
              >
                Soluciones digitales
              </SplitText>
              <SplitText
                as="h1"
                animation="chars-rotate"
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] text-gradient"
                delay={0.5}
                stagger={0.02}
                trigger="load"
              >
                completas
              </SplitText>
            </div>

            <motion.p
              className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Desde la estrategia inicial hasta el lanzamiento final, te acompañamos
              en cada paso del proceso creativo.
            </motion.p>

            {/* Service icons preview */}
            <motion.div
              className="mt-12 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {services.map((service, i) => (
                <motion.div
                  key={service.id}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${service.color}20` }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 + i * 0.1 }}
                  whileHover={{ scale: 1.1, backgroundColor: service.color }}
                >
                  <div style={{ color: service.color }} className="group-hover:text-white">
                    {service.icon}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Scroll
            </span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Detail Section */}
      <section className="py-32">
        <div ref={servicesRef} className="container mx-auto px-6">
          <div className="space-y-40">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="service-detail grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <ScrollReveal animation="fade-up">
                    <div className="flex items-center gap-4 mb-6">
                      <span
                        className="text-7xl font-bold opacity-20"
                        style={{ color: service.color }}
                      >
                        {service.number}
                      </span>
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${service.color}20`, color: service.color }}
                      >
                        {service.icon}
                      </div>
                    </div>

                    <SplitText
                      as="h2"
                      animation="words"
                      className="text-4xl md:text-5xl font-bold tracking-tight"
                      trigger="scroll"
                    >
                      {service.title}
                    </SplitText>

                    <motion.p
                      className="mt-6 text-lg text-muted-foreground leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {service.description}
                    </motion.p>

                    <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feature, fi) => (
                        <motion.li
                          key={feature}
                          className="flex items-center gap-3 text-muted-foreground"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.3 + fi * 0.1 }}
                        >
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${service.color}20` }}
                          >
                            <svg
                              className="w-4 h-4"
                              style={{ color: service.color }}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </ScrollReveal>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <HoverCard glare tilt scale>
                    <motion.div
                      className="aspect-[4/3] rounded-3xl overflow-hidden relative"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}30, ${service.color}10)`,
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      data-cursor="Ver más"
                    >
                      {/* Decorative elements */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-40 h-40 rounded-full opacity-30"
                          style={{ backgroundColor: service.color }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                      </div>
                      <div
                        className="absolute bottom-0 left-0 right-0 h-1/2"
                        style={{
                          background: `linear-gradient(to top, ${service.color}40, transparent)`,
                        }}
                      />
                      {/* Large icon */}
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
                        style={{ color: service.color, transform: 'scale(8)' }}
                      >
                        {service.icon}
                      </div>
                    </motion.div>
                  </HoverCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal animation="fade-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-accent" />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-background/60">
                Proceso
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <SplitText
                as="h2"
                animation="words"
                className="text-4xl md:text-6xl font-bold tracking-tight text-background"
                trigger="scroll"
              >
                Cómo trabajamos
              </SplitText>
              <p className="text-xl text-background/60 max-w-md">
                Un proceso probado que garantiza resultados excepcionales.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-20 relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-background/10" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Step circle */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-accent flex items-center justify-center text-accent-foreground mb-6 mx-auto lg:mx-0">
                    {step.icon}
                  </div>

                  <span className="text-5xl font-bold text-background/10 absolute -top-4 right-0 lg:right-auto lg:-left-2">
                    {step.step}
                  </span>

                  <h3 className="text-xl font-bold text-background mb-2 text-center lg:text-left">
                    {step.title}
                  </h3>
                  <p className="text-background/60 text-sm text-center lg:text-left">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee speed={25} className="py-8 bg-accent">
        <span className="text-4xl md:text-6xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          DISEÑO
        </span>
        <span className="text-accent-foreground/30 text-2xl">✦</span>
        <span className="text-4xl md:text-6xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          DESARROLLO
        </span>
        <span className="text-accent-foreground/30 text-2xl">✦</span>
        <span className="text-4xl md:text-6xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          BRANDING
        </span>
        <span className="text-accent-foreground/30 text-2xl">✦</span>
        <span className="text-4xl md:text-6xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          MOTION
        </span>
        <span className="text-accent-foreground/30 text-2xl">✦</span>
      </Marquee>

      {/* Pricing CTA */}
      <section className="py-32 relative overflow-hidden">
        <MorphingBlob
          className="-bottom-40 -right-40"
          color="var(--accent)"
          size={400}
          speed={10}
        />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto">
            <SplitText
              as="h2"
              animation="chars-wave"
              className="text-4xl md:text-6xl font-bold tracking-tight"
              trigger="scroll"
              stagger={0.02}
            >
              ¿Listo para empezar?
            </SplitText>

            <motion.p
              className="mt-6 text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Cada proyecto es único. Contanos sobre tu idea y te enviaremos una
              propuesta personalizada.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <MagneticButton strength={0.4}>
                <Link href="/contact" data-cursor="Click">
                  <Button size="lg" className="group">
                    <span className="flex items-center gap-2">
                      Solicitar presupuesto
                      <motion.svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </motion.svg>
                    </span>
                  </Button>
                </Link>
              </MagneticButton>

              <MagneticButton strength={0.3}>
                <Link href="/work" data-cursor="Ver">
                  <Button size="lg" variant="outline">
                    Ver proyectos
                  </Button>
                </Link>
              </MagneticButton>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
