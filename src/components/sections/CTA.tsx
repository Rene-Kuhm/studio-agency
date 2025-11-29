'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '@/components/animations/SplitText';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { Marquee } from '@/components/animations/Marquee';

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
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
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-accent"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            y,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div ref={textRef} className="max-w-5xl mx-auto text-center">
          {/* Pre-headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="w-12 h-[2px] bg-accent-foreground/30" />
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-accent-foreground/60">
              Próximo paso
            </span>
            <span className="w-12 h-[2px] bg-accent-foreground/30" />
          </motion.div>

          {/* Main headline */}
          <SplitText
            as="h2"
            animation="chars-wave"
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-accent-foreground"
            trigger="scroll"
            stagger={0.02}
          >
            ¿Listo para crear algo increíble juntos?
          </SplitText>

          {/* Description */}
          <motion.p
            className="mt-8 text-xl text-accent-foreground/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Nos encantaría escuchar sobre tu proyecto. Contanos tu idea y
            hagamos que suceda.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <MagneticButton strength={0.5}>
              <Link href="/contact" data-cursor="Click">
                <motion.div
                  className="group relative inline-flex items-center gap-4 px-10 py-5 bg-accent-foreground text-accent rounded-full text-lg font-medium overflow-hidden"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background animation */}
                  <motion.div
                    className="absolute inset-0 bg-foreground"
                    initial={{ scale: 0, opacity: 0 }}
                    variants={{
                      hover: { scale: 1, opacity: 1 },
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ borderRadius: '9999px' }}
                  />

                  <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                    Empezar conversación
                  </span>

                  <motion.div
                    className="relative z-10 w-8 h-8 rounded-full bg-accent flex items-center justify-center group-hover:bg-background transition-colors duration-300"
                    variants={{
                      hover: { x: 5, rotate: 45 },
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
                </motion.div>
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Email link */}
          <motion.p
            className="mt-8 text-accent-foreground/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            o escribinos a{' '}
            <a
              href="mailto:hola@studio.com"
              className="text-accent-foreground hover:underline underline-offset-4 transition-colors"
            >
              hola@studio.com
            </a>
          </motion.p>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="mt-20">
        <Marquee
          speed={20}
          direction="right"
          className="py-6 border-t border-accent-foreground/10"
        >
          <span className="text-[10vw] font-bold text-accent-foreground/5 whitespace-nowrap px-8">
            LET'S WORK TOGETHER
          </span>
        </Marquee>
      </div>
    </section>
  );
}
