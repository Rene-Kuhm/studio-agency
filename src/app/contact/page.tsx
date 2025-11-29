'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitText } from '@/components/animations/SplitText';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { MorphingBlob } from '@/components/animations/MorphingBlob';
import { Marquee } from '@/components/animations/Marquee';
import { Button } from '@/components/ui/Button';

const contactInfo = [
  {
    label: 'Email',
    value: 'hola@studio.com',
    href: 'mailto:hola@studio.com',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Teléfono',
    value: '+54 11 1234-5678',
    href: 'tel:+541112345678',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'Ubicación',
    value: 'Buenos Aires, Argentina',
    href: '#',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const services = [
  'Diseño Web',
  'Desarrollo Web',
  'Branding',
  'Motion Design',
  'Otro',
];

const socials = [
  { name: 'Twitter', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'Dribbble', href: '#' },
];

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(formData);
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center overflow-hidden">
        <MorphingBlob
          className="top-20 -right-40"
          color="var(--accent)"
          size={400}
          speed={12}
        />
        <MorphingBlob
          className="bottom-20 -left-40"
          color="var(--accent-secondary)"
          size={350}
          speed={15}
        />

        <motion.div
          className="container mx-auto px-6 pt-40 pb-12 relative z-10"
          style={{ y, opacity }}
        >
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
                Contacto
              </span>
            </motion.div>

            <SplitText
              as="h1"
              animation="chars-rotate"
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
              delay={0.3}
              stagger={0.02}
              trigger="load"
            >
              Conversemos
            </SplitText>

            <motion.p
              className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              ¿Tenés una idea en mente? Nos encantaría escucharla.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left column - Info */}
            <div>
              <ScrollReveal animation="fade-up">
                <SplitText
                  as="h2"
                  animation="words"
                  className="text-3xl md:text-4xl font-bold tracking-tight"
                  trigger="scroll"
                >
                  Comencemos algo increíble juntos
                </SplitText>

                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Completá el formulario y te responderemos en menos de 24 horas.
                  O si preferís, contactanos directamente por cualquiera de estos medios.
                </p>
              </ScrollReveal>

              {/* Contact info cards */}
              <div className="mt-12 space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-4 p-5 bg-secondary/50 rounded-2xl hover:bg-accent/10 transition-colors"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    data-cursor="Click"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-lg font-medium group-hover:text-accent transition-colors">
                        {item.value}
                      </p>
                    </div>
                    <motion.div
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </motion.a>
                ))}
              </div>

              {/* Social links */}
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-sm text-muted-foreground mb-4">Seguinos</p>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <MagneticButton key={social.name} strength={0.3}>
                      <a
                        href={social.href}
                        className="px-4 py-2 bg-secondary rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                        data-cursor={social.name}
                      >
                        {social.name}
                      </a>
                    </MagneticButton>
                  ))}
                </div>
              </motion.div>

              {/* Decorative quote */}
              <motion.div
                className="mt-16 p-8 bg-foreground text-background rounded-3xl relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="absolute top-4 right-4 text-8xl font-serif text-background/10">&ldquo;</div>
                <p className="text-xl font-medium relative z-10">
                  Cada gran proyecto comienza con una conversación.
                </p>
                <p className="mt-4 text-background/60">
                  — El equipo de Studio
                </p>
              </motion.div>
            </div>

            {/* Right column - Form */}
            <ScrollReveal animation="fade-up" delay={0.2}>
              <motion.form
                onSubmit={handleSubmit}
                className="bg-secondary/30 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-border"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="space-y-6">
                  {/* Name & Email row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <motion.label
                        htmlFor="name"
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          focusedField === 'name' || formData.name
                            ? '-top-2.5 text-xs bg-background px-2 text-accent'
                            : 'top-3.5 text-muted-foreground'
                        }`}
                      >
                        Nombre *
                      </motion.label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3.5 bg-background border-2 border-border rounded-xl focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <motion.label
                        htmlFor="email"
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          focusedField === 'email' || formData.email
                            ? '-top-2.5 text-xs bg-background px-2 text-accent'
                            : 'top-3.5 text-muted-foreground'
                        }`}
                      >
                        Email *
                      </motion.label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3.5 bg-background border-2 border-border rounded-xl focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div className="relative">
                    <motion.label
                      htmlFor="company"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'company' || formData.company
                          ? '-top-2.5 text-xs bg-background px-2 text-accent'
                          : 'top-3.5 text-muted-foreground'
                      }`}
                    >
                      Empresa
                    </motion.label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3.5 bg-background border-2 border-border rounded-xl focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  {/* Service & Budget row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium mb-2 text-muted-foreground"
                      >
                        ¿Qué servicio te interesa? *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-background border-2 border-border rounded-xl focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Seleccionar</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium mb-2 text-muted-foreground"
                      >
                        Presupuesto estimado
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-background border-2 border-border rounded-xl focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Seleccionar</option>
                        <option value="< $5,000">Menos de $5,000 USD</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000 USD</option>
                        <option value="$10,000 - $25,000">$10,000 - $25,000 USD</option>
                        <option value="> $25,000">Más de $25,000 USD</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <motion.label
                      htmlFor="message"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'message' || formData.message
                          ? '-top-2.5 text-xs bg-background px-2 text-accent'
                          : 'top-3.5 text-muted-foreground'
                      }`}
                    >
                      Contanos sobre tu proyecto *
                    </motion.label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3.5 bg-background border-2 border-border rounded-xl focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <MagneticButton strength={0.3}>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full group"
                      disabled={isSubmitting}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar mensaje
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
                          </>
                        )}
                      </span>
                    </Button>
                  </MagneticButton>

                  <p className="text-xs text-center text-muted-foreground">
                    Al enviar este formulario, aceptás nuestra política de privacidad.
                  </p>
                </div>
              </motion.form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee speed={25} className="py-8 bg-accent">
        <span className="text-4xl md:text-6xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          HABLEMOS
        </span>
        <span className="text-accent-foreground/30 text-2xl">✦</span>
        <span className="text-4xl md:text-6xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          COLABOREMOS
        </span>
        <span className="text-accent-foreground/30 text-2xl">✦</span>
        <span className="text-4xl md:text-6xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          CREEMOS
        </span>
        <span className="text-accent-foreground/30 text-2xl">✦</span>
      </Marquee>
    </>
  );
}
