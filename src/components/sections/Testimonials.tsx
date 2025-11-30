'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '@/components/animations/SplitText';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'María González',
    role: 'CEO',
    company: 'TechStart Argentina',
    content: 'Trabajar con TecnoDespegue fue una experiencia increíble. Transformaron completamente nuestra presencia digital y los resultados superaron todas nuestras expectativas. El equipo es profesional, creativo y muy atento a los detalles.',
    avatar: 'MG',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Director de Marketing',
    company: 'Innovate Solutions',
    content: 'La calidad del diseño y desarrollo es excepcional. Entendieron perfectamente nuestra visión y la llevaron a otro nivel. Nuestro sitio web ahora refleja exactamente quiénes somos como empresa.',
    avatar: 'CR',
    rating: 5,
  },
  {
    id: 3,
    name: 'Laura Martínez',
    role: 'Fundadora',
    company: 'EcoVerde',
    content: 'Desde el primer momento nos sentimos en buenas manos. El proceso fue transparente, la comunicación excelente y el resultado final superó lo que habíamos imaginado. Altamente recomendados.',
    avatar: 'LM',
    rating: 5,
  },
  {
    id: 4,
    name: 'Fernando López',
    role: 'CTO',
    company: 'DataFlow',
    content: 'Su enfoque técnico combinado con un ojo para el diseño es lo que los diferencia. Entregaron un producto robusto, escalable y visualmente impactante. Ya estamos planificando nuestro próximo proyecto juntos.',
    avatar: 'FL',
    rating: 5,
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Auto-advance testimonials
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    // Reset interval when manually selecting
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-secondary/30 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <ScrollReveal animation="fade-up">
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
              Testimonios
            </span>
          </ScrollReveal>

          <div className="mt-4">
            <SplitText
              as="h2"
              animation="chars-wave"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              trigger="scroll"
              stagger={0.02}
            >
              Lo que dicen nuestros clientes
            </SplitText>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[400px] md:min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-background rounded-3xl p-8 md:p-12 shadow-lg"
              >
                {/* Quote icon */}
                <div className="mb-6">
                  <svg
                    className="w-12 h-12 text-accent/30"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Content */}
                <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
                  "{testimonials[activeIndex].content}"
                </p>

                {/* Rating */}
                <div className="flex gap-1 mt-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="w-5 h-5 text-accent"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-border">
                  {/* Avatar */}
                  <motion.div
                    className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    {testimonials[activeIndex].avatar}
                  </motion.div>

                  <div>
                    <p className="font-semibold text-lg">
                      {testimonials[activeIndex].name}
                    </p>
                    <p className="text-muted-foreground">
                      {testimonials[activeIndex].role} en {testimonials[activeIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className="group p-2"
                aria-label={`Ver testimonio ${index + 1}`}
              >
                <motion.div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-accent'
                      : 'w-2 bg-muted-foreground/30 group-hover:bg-muted-foreground/50'
                  }`}
                  layout
                />
              </button>
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-center gap-4 mt-6">
            <motion.button
              onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Testimonio anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
              className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Siguiente testimonio"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-accent">98%</p>
            <p className="mt-2 text-muted-foreground">Clientes satisfechos</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-accent">50+</p>
            <p className="mt-2 text-muted-foreground">Proyectos entregados</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-accent">4.9</p>
            <p className="mt-2 text-muted-foreground">Calificación promedio</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-accent">100%</p>
            <p className="mt-2 text-muted-foreground">Proyectos a tiempo</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
