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
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contacto' },
    { href: '/feed.xml', label: 'RSS Feed' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacidad' },
    { href: '/terms', label: 'Términos' },
  ],
  social: [
    { href: 'https://github.com/Rene-Kuhm', label: 'GitHub', icon: 'G' },
    { href: 'https://www.linkedin.com/in/rene-kuhm-fullstack/', label: 'LinkedIn', icon: 'L' },
    { href: 'https://www.youtube.com/@Tecnodespegue', label: 'YouTube', icon: 'Y' },
    { href: 'https://www.instagram.com/renekuhm/', label: 'Instagram', icon: 'I' },
    { href: 'https://www.facebook.com/profile.php?id=61583085119702', label: 'Facebook', icon: 'F' },
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
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L16 10H14V16H10V10H8L12 2Z" fill="#f8f5f2"/>
                  <rect x="10" y="17" width="4" height="1.5" rx="0.75" fill="#f8f5f2" opacity="0.8"/>
                  <rect x="10.5" y="19" width="3" height="1.5" rx="0.75" fill="#f8f5f2" opacity="0.6"/>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Tecno<span className="text-accent">Despegue</span>
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Agencia digital especializada en desarrollo web, branding y experiencias digitales que impulsan tu negocio.
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

          {/* Legal */}
          <FadeIn delay={0.3}>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
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

            <h4 className="font-semibold mb-4 mt-8">Social</h4>
            <div className="flex gap-3">
              {footerLinks.social.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={link.label}
                >
                  {link.label.charAt(0)}
                </a>
              ))}
            </div>
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
            © {currentYear} TecnoDespegue. Todos los derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Diseñado con pasión en Argentina
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
