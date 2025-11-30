'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { SplitText } from '@/components/animations/SplitText';
import { MorphingBlob } from '@/components/animations/MorphingBlob';
import { Marquee } from '@/components/animations/Marquee';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    if (!videoRef.current) return;

    // Parallax zoom effect on video
    gsap.to(videoRef.current, {
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background video/image placeholder with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          ref={videoRef}
          className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-muted"
          style={{ transformOrigin: 'center center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      </div>

      {/* Morphing blobs */}
      <MorphingBlob
        className="top-20 -left-40"
        color="var(--accent)"
        size={600}
        speed={10}
      />
      <MorphingBlob
        className="bottom-20 -right-40"
        color="var(--accent-secondary)"
        size={500}
        speed={12}
      />

      {/* Main content */}
      <motion.div
        className="container mx-auto px-6 pt-40 pb-32 relative z-10"
        style={{ y, opacity, scale }}
      >
        <div className="max-w-6xl mx-auto">
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
              Agencia Creativa Digital
            </span>
          </motion.div>

          {/* Main headline with split text animation */}
          <h1 className="space-y-1 md:space-y-2">
            <SplitText
              as="span"
              animation="chars-wave"
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tight"
              delay={0.3}
              stagger={0.03}
              trigger="load"
            >
              Creamos
            </SplitText>

            <SplitText
              as="span"
              animation="chars-wave"
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tight text-accent"
              delay={0.5}
              stagger={0.03}
              trigger="load"
            >
              experiencias
            </SplitText>

            <SplitText
              as="span"
              animation="chars-wave"
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tight text-accent"
              delay={0.7}
              stagger={0.03}
              trigger="load"
            >
              digitales únicas
            </SplitText>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="mt-10 text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Diseñamos y desarrollamos sitios web, marcas y productos digitales
            que conectan con tu audiencia y generan resultados.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-start gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <MagneticButton strength={0.4}>
              <Link href="/contact" data-cursor="Ver más">
                <Button size="lg" className="group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Empezar proyecto
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

            <MagneticButton strength={0.4}>
              <Link href="/work" data-cursor="Explorar">
                <Button size="lg" variant="outline" className="group">
                  <span className="flex items-center gap-2">
                    Ver proyectos
                    <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <span className="text-sm">12</span>
                    </span>
                  </span>
                </Button>
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            {[
              { value: '50+', label: 'Proyectos' },
              { value: '8', label: 'Años' },
              { value: '30+', label: 'Clientes' },
              { value: '5', label: 'Premios' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 + i * 0.1 }}
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
        transition={{ delay: 2 }}
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

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden z-10">
        <Marquee speed={30} className="py-4 border-t border-border bg-background/50 backdrop-blur-sm">
          <span className="text-sm font-medium px-8 text-muted-foreground">
            Diseño Web
          </span>
          <span className="text-accent">✦</span>
          <span className="text-sm font-medium px-8 text-muted-foreground">
            Desarrollo
          </span>
          <span className="text-accent">✦</span>
          <span className="text-sm font-medium px-8 text-muted-foreground">
            Branding
          </span>
          <span className="text-accent">✦</span>
          <span className="text-sm font-medium px-8 text-muted-foreground">
            Motion Design
          </span>
          <span className="text-accent">✦</span>
          <span className="text-sm font-medium px-8 text-muted-foreground">
            UX/UI
          </span>
          <span className="text-accent">✦</span>
          <span className="text-sm font-medium px-8 text-muted-foreground">
            E-commerce
          </span>
          <span className="text-accent">✦</span>
        </Marquee>
      </div>
    </section>
  );
}
