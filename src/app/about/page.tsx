'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitText } from '@/components/animations/SplitText';
import { HoverCard } from '@/components/animations/HoverCard';
import { Marquee } from '@/components/animations/Marquee';
import { MorphingBlob } from '@/components/animations/MorphingBlob';
import { CTA } from '@/components/sections/CTA';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: 'María García',
    role: 'Directora Creativa',
    bio: 'Con más de 10 años de experiencia en diseño, María lidera la visión creativa del estudio.',
    color: '#a67c52',
  },
  {
    name: 'Carlos López',
    role: 'Lead Developer',
    bio: 'Especialista en arquitectura frontend y amante de las nuevas tecnologías web.',
    color: '#c9a87c',
  },
  {
    name: 'Ana Martínez',
    role: 'UX Designer',
    bio: 'Experta en investigación de usuarios y diseño de experiencias centradas en las personas.',
    color: '#8b7355',
  },
  {
    name: 'Diego Fernández',
    role: 'Motion Designer',
    bio: 'Creador de animaciones y experiencias interactivas que dan vida a las marcas.',
    color: '#d4a574',
  },
];

const values = [
  {
    number: '01',
    title: 'Excelencia',
    description:
      'Nos comprometemos con la calidad en cada detalle. Cada proyecto es una oportunidad para superar expectativas.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Colaboración',
    description:
      'Trabajamos junto a nuestros clientes como socios estratégicos, no como proveedores.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Innovación',
    description:
      'Exploramos constantemente nuevas tecnologías y tendencias para ofrecer soluciones de vanguardia.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Impacto',
    description:
      'Medimos nuestro éxito por los resultados tangibles que generamos para nuestros clientes.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

const stats = [
  { value: '2016', label: 'Año de fundación' },
  { value: '50+', label: 'Proyectos completados' },
  { value: '30+', label: 'Clientes felices' },
  { value: '5', label: 'Premios ganados' },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (!teamRef.current) return;

    const cards = teamRef.current.querySelectorAll('.team-card');

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
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
        {/* Background blobs */}
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
            {/* Pre-headline */}
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
                Nosotros
              </span>
            </motion.div>

            {/* Main headline */}
            <div className="space-y-2">
              <SplitText
                as="h1"
                animation="chars-rotate"
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
                delay={0.3}
                stagger={0.02}
                trigger="load"
              >
                Creemos en el poder 
                del diseño
              </SplitText>
            </div>

            <motion.p
              className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Somos un equipo multidisciplinario de diseñadores, desarrolladores y
              estrategas unidos por la pasión de crear experiencias digitales
              excepcionales.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                  className="text-center md:text-left"
                >
                  <span className="text-4xl md:text-5xl font-bold text-gradient">
                    {stat.value}
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
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

      {/* Story Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal animation="fade-up">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[2px] bg-accent" />
                <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
                  Nuestra Historia
                </span>
              </div>
              <SplitText
                as="h2"
                animation="words"
                className="text-4xl md:text-5xl font-bold tracking-tight"
                trigger="scroll"
              >
                De una idea a una agencia premiada
              </SplitText>
              <div className="mt-8 space-y-6 text-lg text-muted-foreground">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Studio nació en 2016 con una visión clara: democratizar el acceso
                  a diseño de alta calidad. Lo que comenzó como un pequeño estudio
                  de dos personas se ha convertido en una agencia reconocida por su
                  enfoque innovador.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Hemos tenido el privilegio de trabajar con startups emergentes,
                  empresas consolidadas y marcas globales, ayudándolas a contar
                  sus historias de manera memorable.
                </motion.p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.3}>
              <div className="relative">
                <motion.div
                  className="aspect-square rounded-3xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-accent/30 via-accent-secondary/20 to-background relative">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-32 h-32 rounded-full bg-accent/20"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    </div>
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6">
                        <p className="text-lg font-medium">&ldquo;El buen diseño es obvio. El gran diseño es transparente.&rdquo;</p>
                        <p className="text-sm text-muted-foreground mt-2">— Joe Sparano</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* Floating badge */}
                <motion.div
                  className="absolute -top-4 -right-4 px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  8 años de experiencia
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
                Valores
              </span>
            </div>
            <SplitText
              as="h2"
              animation="words"
              className="text-4xl md:text-6xl font-bold tracking-tight text-background"
              trigger="scroll"
            >
              Lo que nos define
            </SplitText>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.number}
                className="group relative p-8 md:p-10 bg-background/5 backdrop-blur-sm rounded-3xl border border-background/10 hover:border-accent/50 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                data-cursor="Ver más"
              >
                {/* Number background */}
                <span className="absolute top-6 right-6 text-[8rem] font-bold text-background/5 leading-none select-none pointer-events-none">
                  {value.number}
                </span>

                {/* Icon */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  {value.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-background">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-background/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee speed={25} className="py-8 bg-accent">
        <span className="text-4xl md:text-6xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          CREATIVIDAD
        </span>
        <span className="text-accent-foreground/30 text-2xl">✦</span>
        <span className="text-4xl md:text-6xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          INNOVACIÓN
        </span>
        <span className="text-accent-foreground/30 text-2xl">✦</span>
        <span className="text-4xl md:text-6xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          EXCELENCIA
        </span>
        <span className="text-accent-foreground/30 text-2xl">✦</span>
        <span className="text-4xl md:text-6xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          IMPACTO
        </span>
        <span className="text-accent-foreground/30 text-2xl">✦</span>
      </Marquee>

      {/* Team Section */}
      <section className="py-32 relative overflow-hidden">
        <MorphingBlob
          className="-bottom-40 -right-40"
          color="var(--accent)"
          size={400}
          speed={10}
        />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal animation="fade-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-accent" />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
                El Equipo
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <SplitText
                as="h2"
                animation="words"
                className="text-4xl md:text-6xl font-bold tracking-tight"
                trigger="scroll"
              >
                Las personas detrás de la magia
              </SplitText>
              <p className="text-xl text-muted-foreground max-w-md">
                Talento y pasión que hacen posible cada proyecto.
              </p>
            </div>
          </ScrollReveal>

          <div
            ref={teamRef}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            style={{ perspective: '1000px' }}
          >
            {team.map((member, index) => (
              <HoverCard
                key={member.name}
                className="team-card"
                glare
                tilt
                scale
              >
                <div className="group" data-cursor={member.role}>
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6">
                    <div
                      className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${member.color}40, ${member.color}20)`,
                      }}
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors duration-300 flex items-center justify-center">
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ y: 20 }}
                        whileHover={{ y: 0 }}
                      >
                        <div className="flex gap-4">
                          {['Li', 'Tw', 'Dr'].map((social) => (
                            <span
                              key={social}
                              className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-sm font-medium"
                            >
                              {social}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                    {/* Number badge */}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-sm font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-accent text-sm font-medium">{member.role}</p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
