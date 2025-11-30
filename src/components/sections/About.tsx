'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

const stats = [
  { value: '50+', label: 'Proyectos completados' },
  { value: '8', label: 'Años de experiencia' },
  { value: '30+', label: 'Clientes satisfechos' },
  { value: '15+', label: 'Tecnologías dominadas' },
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
          {/* Profile Image & Content */}
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
              <motion.div
                className="relative flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/rene-kuhm.jpg"
                  alt="René Kuhm - Desarrollador FullStack"
                  width={160}
                  height={160}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-accent/20"
                  priority
                />
              </motion.div>
              <div className="text-center md:text-left">
                <span className="text-accent font-medium">Sobre mí</span>
                <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  René Kuhm
                </h2>
                <p className="mt-2 text-xl text-muted-foreground">
                  Desarrollador FullStack
                </p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">
              Soy un desarrollador apasionado por crear experiencias digitales excepcionales.
              En TecnoDespegue, combino creatividad y estrategia para ayudar a marcas
              ambiciosas a destacar en el mundo digital.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Mi enfoque se centra en entender profundamente tu negocio y tu
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
