'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

const stats = [
  { value: '50+', label: 'Proyectos completados' },
  { value: '8', label: 'Años de experiencia' },
  { value: '30+', label: 'Clientes satisfechos' },
  { value: '5', label: 'Premios ganados' },
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section ref={containerRef} className="py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <FadeIn>
            <span className="text-accent font-medium">Sobre nosotros</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
              Somos un equipo apasionado por el diseño y la tecnología
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              En TecnoDespegue, creemos que el diseño excepcional nace de la combinación
              perfecta entre creatividad y estrategia. Trabajamos con marcas
              ambiciosas que buscan destacar en el mundo digital.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Nuestro enfoque se centra en entender profundamente tu negocio y tu
              audiencia para crear soluciones que no solo se ven increíbles, sino
              que también generan resultados medibles.
            </p>
          </FadeIn>

          {/* Stats */}
          <StaggerContainer className="grid grid-cols-2 gap-8">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center lg:text-left">
                  <motion.span
                    className="text-5xl md:text-6xl font-bold text-accent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    {stat.value}
                  </motion.span>
                  <p className="mt-2 text-muted-foreground">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Marquee text */}
        <motion.div
          className="mt-32 -mx-6 overflow-hidden"
          style={{ x }}
        >
          <div className="flex items-center gap-8 whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="text-8xl md:text-[12rem] font-bold text-secondary select-none"
              >
                CREATIVIDAD • ESTRATEGIA • DISEÑO •
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
