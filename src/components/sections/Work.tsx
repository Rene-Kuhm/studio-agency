'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitText } from '@/components/animations/SplitText';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/animations/MagneticButton';

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
];

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Parallax effect on project items
    const items = sectionRef.current.querySelectorAll('.project-item');

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
    <section ref={sectionRef} className="py-32 bg-foreground text-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <ScrollReveal animation="fade-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-accent" />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-background/60">
                Proyectos
              </span>
            </div>
            <SplitText
              as="h2"
              animation="words"
              className="text-4xl md:text-6xl font-bold tracking-tight text-background"
              trigger="scroll"
            >
              Trabajo seleccionado
            </SplitText>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <MagneticButton>
              <Link href="/work">
                <Button
                  variant="outline"
                  className="border-background/30 text-background hover:bg-background hover:text-foreground"
                >
                  Ver todos los proyectos
                </Button>
              </Link>
            </MagneticButton>
          </ScrollReveal>
        </div>

        {/* Projects list */}
        <div className="space-y-2">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              className="project-item block"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              data-cursor="Ver"
            >
              <motion.div
                className="group relative py-8 md:py-12 border-b border-background/10 hover:border-accent/50 transition-colors"
                whileHover={{ x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
                  {/* Number */}
                  <div className="md:col-span-1">
                    <span className="text-sm text-background/40 font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="md:col-span-4">
                    <h3 className="text-2xl md:text-4xl font-bold group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Category */}
                  <div className="md:col-span-3">
                    <span className="text-background/60">{project.category}</span>
                  </div>

                  {/* Tags */}
                  <div className="md:col-span-3 hidden lg:flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-background/10 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="md:col-span-1 flex justify-end">
                    <motion.div
                      className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors"
                      animate={{
                        rotate: hoveredProject === project.id ? 45 : 0,
                      }}
                    >
                      <svg
                        className="w-4 h-4"
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
                </div>

                {/* Hover image preview */}
                <AnimatePresence>
                  {hoveredProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-20 top-1/2 -translate-y-1/2 w-80 h-48 rounded-2xl overflow-hidden z-10 pointer-events-none hidden xl:block"
                      style={{
                        boxShadow: `0 20px 60px -15px ${project.color}40`,
                      }}
                    >
                      <div
                        className="w-full h-full"
                        style={{
                          background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)`,
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
