'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { MagneticButton } from '@/components/animations/MagneticButton';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Nosotros' },
  { href: '/services', label: 'Servicios' },
  { href: '/work', label: 'Proyectos' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contacto' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <MagneticButton strength={0.3}>
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center relative overflow-hidden">
                  {/* Rocket icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="relative z-10">
                    <path d="M12 2L16 10H14V16H10V10H8L12 2Z" fill="#f8f5f2"/>
                    <rect x="10" y="17" width="4" height="1.5" rx="0.75" fill="#f8f5f2" opacity="0.8"/>
                    <rect x="10.5" y="19" width="3" height="1.5" rx="0.75" fill="#f8f5f2" opacity="0.6"/>
                    <rect x="11" y="21" width="2" height="1" rx="0.5" fill="#f8f5f2" opacity="0.4"/>
                  </svg>
                </div>
                <div className="hidden sm:flex flex-col leading-none">
                  <span className="text-lg font-bold tracking-tight">
                    Tecno<span className="text-accent">Despegue</span>
                  </span>
                </div>
              </motion.div>
            </MagneticButton>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <MagneticButton key={link.href} strength={0.15}>
                <Link
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent"
                      layoutId="navbar-indicator"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </MagneticButton>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <MagneticButton strength={0.4}>
              <Link href="/contact" data-cursor="Click">
                <motion.div
                  className="relative px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-medium overflow-hidden group"
                  whileHover="hover"
                >
                  <motion.span
                    className="relative z-10"
                    variants={{
                      hover: { color: 'var(--foreground)' },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Hablemos
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-accent"
                    initial={{ x: '-100%' }}
                    variants={{
                      hover: { x: 0 },
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.div>
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-10 w-12 h-12 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <motion.span
                className="absolute left-0 top-1 w-6 h-[2px] bg-foreground block"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute left-0 top-3 w-6 h-[2px] bg-foreground block"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  x: isMobileMenuOpen ? 20 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute left-0 top-5 w-6 h-[2px] bg-foreground block"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -5 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="container mx-auto px-6 pt-28 pb-12 h-full flex flex-col">
              <motion.ul
                className="space-y-2 flex-1"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
                  },
                }}
              >
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -50 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block py-3 text-5xl md:text-6xl font-bold tracking-tight transition-colors',
                        pathname === link.href
                          ? 'text-accent'
                          : 'text-foreground hover:text-accent'
                      )}
                    >
                      <span className="text-sm text-muted-foreground font-normal mr-4">
                        0{i + 1}
                      </span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                className="pt-8 border-t border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-sm text-muted-foreground mb-4">
                  ¿Listo para empezar?
                </p>
                <a
                  href="mailto:hola@tecnodespegue.com"
                  className="text-2xl font-bold text-accent hover:underline"
                >
                  hola@tecnodespegue.com
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
