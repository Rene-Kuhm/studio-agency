'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';

const footerLinks = {
  navegacion: [
    { href: '/', label: 'Inicio' },
    { href: '/about', label: 'Nosotros' },
    { href: '/services', label: 'Servicios' },
    { href: '/work', label: 'Proyectos' },
  ],
  recursos: [
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contacto' },
    { href: '/privacy', label: 'Privacidad' },
    { href: '/terms', label: 'Términos' },
  ],
  social: [
    { href: 'https://twitter.com', label: 'Twitter' },
    { href: 'https://instagram.com', label: 'Instagram' },
    { href: 'https://linkedin.com', label: 'LinkedIn' },
    { href: 'https://dribbble.com', label: 'Dribbble' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <FadeIn className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight">STUDIO</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Agencia creativa especializada en diseño web, branding y experiencias digitales de alto impacto.
            </p>
          </FadeIn>

          {/* Navigation */}
          <FadeIn delay={0.1}>
            <h4 className="font-semibold mb-4">Navegación</h4>
            <ul className="space-y-3">
              {footerLinks.navegacion.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Resources */}
          <FadeIn delay={0.2}>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Social */}
          <FadeIn delay={0.3}>
            <h4 className="font-semibold mb-4">Social</h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        {/* Bottom */}
        <motion.div
          className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} Studio. Todos los derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Diseñado con pasión en Argentina
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
