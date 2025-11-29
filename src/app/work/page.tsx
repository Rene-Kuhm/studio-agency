'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitText } from '@/components/animations/SplitText';
import { HoverCard } from '@/components/animations/HoverCard';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { Marquee } from '@/components/animations/Marquee';
import { MorphingBlob } from '@/components/animations/MorphingBlob';
import { CTA } from '@/components/sections/CTA';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Nebula App',
    category: 'Diseño Web & Desarrollo',
    description: 'Plataforma SaaS para gestión de proyectos creativos',
    year: '2024',
    color: '#a67c52',
    tags: ['Next.js', 'Framer Motion', 'Prisma'],
  },
  {
    id: 2,
    title: 'Aurora Brand',
    category: 'Branding & Identidad',
    description: 'Identidad visual completa para startup fintech',
    year: '2024',
    color: '#c9a87c',
    tags: ['Branding', 'UI Design', 'Motion'],
  },
  {
    id: 3,
    title: 'Vertex Commerce',
    category: 'E-commerce',
    description: 'Tienda online premium para marca de moda',
    year: '2023',
    color: '#8b7355',
    tags: ['Shopify', 'Custom Theme', 'UX'],
  },
  {
    id: 4,
    title: 'Pulse Dashboard',
    category: 'Producto Digital',
    description: 'Dashboard de analytics para equipos de marketing',
    year: '2023',
    color: '#d4a574',
    tags: ['React', 'D3.js', 'Real-time'],
  },
  {
    id: 5,
    title: 'Nova Studio',
    category: 'Sitio Web',
    description: 'Website institucional para estudio de arquitectura',
    year: '2023',
    color: '#b8956c',
    tags: ['Next.js', 'GSAP', '3D'],
  },
  {
    id: 6,
    title: 'Spark Agency',
    category: 'Branding & Web',
    description: 'Rebranding y nuevo sitio web para agencia de publicidad',
    year: '2023',
    color: '#9a7b5a',
    tags: ['Branding', 'Web Design', 'Motion'],
  },
];

const categories = ['Todos', 'Diseño Web', 'E-commerce', 'Branding', 'Apps'];

export default function WorkPage() {
  const heroRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (!projectsRef.current) return;

    const items = projectsRef.current.querySelectorAll('.project-card');

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
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
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center overflow-hidden">
        <MorphingBlob
          className="top-20 -right-40"
          color="var(--accent)"
          size={500}
          speed={12}
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
                Portfolio
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
                Nuestros proyectos
              </SplitText>
              <SplitText
                as="h1"
                animation="chars-rotate"
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] text-gradient"
                delay={0.5}
                stagger={0.02}
                trigger="load"
              >
                destacados
              </SplitText>
            </div>

            <motion.p
              className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Una selección de nuestro trabajo más reciente. Cada proyecto es una
              historia de colaboración y creatividad.
            </motion.p>

            {/* Filter */}
            <motion.div
              className="mt-12 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {categories.map((category, i) => (
                <MagneticButton key={category} strength={0.2}>
                  <motion.button
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-foreground text-background'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.3 + i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                </MagneticButton>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="pb-32">
        <div ref={projectsRef} className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <HoverCard
                key={project.id}
                className="project-card"
                glare
                tilt
                scale
              >
                <Link
                  href={`/work/${project.id}`}
                  className="group block"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  data-cursor="Ver"
                >
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                    <motion.div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)`,
                      }}
                    />

                    {/* Project number */}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="text-sm font-mono text-foreground/40 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Year badge */}
                    <div className="absolute top-6 right-6 z-10">
                      <span className="text-sm font-medium text-foreground/60 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
                        {project.year}
                      </span>
                    </div>

                    {/* Center content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span
                        className="text-[10rem] font-bold opacity-10 select-none"
                        style={{ color: project.color }}
                        animate={{
                          scale: hoveredProject === project.id ? 1.2 : 1,
                          opacity: hoveredProject === project.id ? 0.2 : 0.1,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        {String(project.id).padStart(2, '0')}
                      </motion.span>
                    </div>

                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: `${project.color}90` }}
                      >
                        <motion.div
                          className="flex items-center gap-3 text-white font-medium"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{
                            y: hoveredProject === project.id ? 0 : 20,
                            opacity: hoveredProject === project.id ? 1 : 0,
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <span>Ver proyecto</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Project info */}
                  <div className="mt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          {project.category}
                        </span>
                        <h3 className="mt-1 text-2xl md:text-3xl font-bold group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                          {project.description}
                        </p>
                      </div>
                      <motion.div
                        className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center flex-shrink-0 group-hover:border-accent group-hover:bg-accent transition-colors"
                        animate={{
                          rotate: hoveredProject === project.id ? 45 : 0,
                        }}
                      >
                        <svg
                          className="w-5 h-5 group-hover:text-accent-foreground transition-colors"
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
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs bg-secondary rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Marquee */}
      <Marquee speed={20} className="py-8 bg-foreground text-background">
        <span className="text-4xl md:text-6xl font-bold opacity-20 whitespace-nowrap px-8">
          50+ PROYECTOS
        </span>
        <span className="text-accent text-2xl">✦</span>
        <span className="text-4xl md:text-6xl font-bold opacity-20 whitespace-nowrap px-8">
          30+ CLIENTES
        </span>
        <span className="text-accent text-2xl">✦</span>
        <span className="text-4xl md:text-6xl font-bold opacity-20 whitespace-nowrap px-8">
          5 PREMIOS
        </span>
        <span className="text-accent text-2xl">✦</span>
        <span className="text-4xl md:text-6xl font-bold opacity-20 whitespace-nowrap px-8">
          8 AÑOS
        </span>
        <span className="text-accent text-2xl">✦</span>
      </Marquee>

      <CTA />
    </>
  );
}
