'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitText } from '@/components/animations/SplitText';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { MorphingBlob } from '@/components/animations/MorphingBlob';
import { MagneticButton } from '@/components/animations/MagneticButton';

const faqs = [
  {
    category: 'Servicios',
    questions: [
      {
        question: '¿Qué servicios ofrece TecnoDespegue?',
        answer: 'Ofrecemos servicios de desarrollo web, diseño UI/UX, branding e identidad visual, aplicaciones web, e-commerce y consultoría tecnológica. Trabajamos con las últimas tecnologías para crear experiencias digitales excepcionales.',
      },
      {
        question: '¿Trabajan con empresas de cualquier tamaño?',
        answer: 'Sí, trabajamos tanto con startups como con empresas establecidas. Adaptamos nuestras soluciones a las necesidades y presupuesto de cada cliente, siempre manteniendo la misma calidad y atención al detalle.',
      },
      {
        question: '¿Qué tecnologías utilizan?',
        answer: 'Trabajamos con tecnologías modernas como React, Next.js, TypeScript, Node.js, y más. Elegimos la tecnología que mejor se adapte a cada proyecto, priorizando rendimiento, escalabilidad y mantenibilidad.',
      },
    ],
  },
  {
    category: 'Proceso',
    questions: [
      {
        question: '¿Cómo es el proceso de trabajo?',
        answer: 'Nuestro proceso incluye: 1) Descubrimiento y análisis de requisitos, 2) Diseño y prototipado, 3) Desarrollo iterativo con feedback constante, 4) Testing y QA, 5) Lanzamiento y soporte post-lanzamiento.',
      },
      {
        question: '¿Cuánto tiempo toma un proyecto típico?',
        answer: 'Depende del alcance y complejidad. Un sitio web corporativo puede tomar 4-6 semanas, mientras que una aplicación web compleja puede llevar 3-6 meses. Proporcionamos estimaciones detalladas después de entender tus necesidades.',
      },
      {
        question: '¿Cómo nos comunicamos durante el proyecto?',
        answer: 'Mantenemos comunicación constante a través de reuniones semanales, actualizaciones por email, y un canal dedicado en Slack o la plataforma que prefieras. Tendrás acceso a un project manager dedicado.',
      },
    ],
  },
  {
    category: 'Precios',
    questions: [
      {
        question: '¿Cómo se calculan los precios?',
        answer: 'Ofrecemos presupuestos personalizados basados en el alcance del proyecto. Podemos trabajar con precio fijo para proyectos bien definidos, o por hora para proyectos más flexibles. Siempre proporcionamos transparencia total en los costos.',
      },
      {
        question: '¿Cuáles son las condiciones de pago?',
        answer: 'Generalmente pedimos un anticipo del 50% para comenzar y el resto contra entrega. Para proyectos largos, podemos acordar pagos por hitos. Aceptamos transferencias bancarias y tarjetas de crédito.',
      },
      {
        question: '¿Hay costos adicionales que debo considerar?',
        answer: 'Los costos que podrían sumarse incluyen: hosting, dominio, licencias de software o plugins premium, y mantenimiento mensual. Siempre te informamos de estos costos antes de empezar.',
      },
    ],
  },
  {
    category: 'Soporte',
    questions: [
      {
        question: '¿Ofrecen soporte después del lanzamiento?',
        answer: 'Sí, incluimos 30 días de soporte gratuito para correcciones de bugs. Además, ofrecemos planes de mantenimiento mensual que incluyen actualizaciones, backups, monitoreo y soporte técnico continuo.',
      },
      {
        question: '¿Qué pasa si necesito cambios después de finalizado?',
        answer: 'Estamos disponibles para realizar mejoras y actualizaciones. Los cambios se pueden cotizar por hora o podés optar por un plan de mantenimiento mensual que incluye un número determinado de horas de desarrollo.',
      },
      {
        question: '¿Capacitan al equipo para usar el sitio/aplicación?',
        answer: 'Sí, incluimos capacitación para que tu equipo pueda gestionar el contenido del sitio. Proporcionamos documentación, videos tutoriales y sesiones de training según sea necesario.',
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-border"
      initial={false}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium pr-8 group-hover:text-accent transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('Servicios');

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <MorphingBlob
          className="top-10 -right-40"
          color="var(--accent)"
          size={400}
          speed={12}
        />

        <div className="container mx-auto px-6 pt-40 pb-16 relative z-10">
          <div className="max-w-4xl">
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
                FAQ
              </span>
            </motion.div>

            <div className="space-y-1 md:space-y-2">
              <SplitText
                as="h1"
                animation="chars-wave"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]"
                delay={0.3}
                stagger={0.03}
                trigger="load"
              >
                Preguntas
              </SplitText>
              <SplitText
                as="h1"
                animation="chars-wave"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] text-accent"
                delay={0.5}
                stagger={0.03}
                trigger="load"
              >
                frecuentes
              </SplitText>
            </div>

            <motion.p
              className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Encontrá respuestas a las consultas más comunes sobre nuestros servicios y proceso de trabajo.
            </motion.p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          {/* Category tabs */}
          <ScrollReveal animation="fade-up" className="mb-12">
            <div className="flex flex-wrap gap-3">
              {faqs.map((category) => (
                <MagneticButton key={category.category} strength={0.2}>
                  <button
                    onClick={() => setActiveCategory(category.category)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === category.category
                        ? 'bg-foreground text-background'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    {category.category}
                  </button>
                </MagneticButton>
              ))}
            </div>
          </ScrollReveal>

          {/* Questions */}
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              {faqs
                .filter((cat) => cat.category === activeCategory)
                .map((category) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {category.questions.map((faq, index) => (
                      <ScrollReveal
                        key={index}
                        animation="fade-up"
                        delay={index * 0.1}
                      >
                        <FAQItem question={faq.question} answer={faq.answer} />
                      </ScrollReveal>
                    ))}
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fade-up" className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              ¿No encontraste lo que buscabas?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Estamos acá para ayudarte. Contactanos y responderemos todas tus consultas.
            </p>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <MagneticButton strength={0.3}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Contactar
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </MagneticButton>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
