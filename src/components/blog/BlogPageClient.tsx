'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitText } from '@/components/animations/SplitText';
import { HoverCard } from '@/components/animations/HoverCard';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { MorphingBlob } from '@/components/animations/MorphingBlob';
import { Marquee } from '@/components/animations/Marquee';
import type { PostMeta } from '@/lib/blog/types';

gsap.registerPlugin(ScrollTrigger);

// Color mapping for categories
const categoryColors: Record<string, string> = {
  'Desarrollo': '#a67c52',
  'Diseño': '#c9a87c',
  'Branding': '#8b7355',
  'Estrategia': '#d4a574',
  'Tecnología': '#b8956c',
};

interface BlogPageClientProps {
  posts: PostMeta[];
  categories: string[];
}

export function BlogPageClient({ posts, categories }: BlogPageClientProps) {
  const heroRef = useRef<HTMLElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const filteredPosts = activeCategory === 'Todos'
    ? posts
    : posts.filter((post) => post.category === activeCategory);

  useEffect(() => {
    if (!postsRef.current) return;

    const items = postsRef.current.querySelectorAll('.post-card');

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [activeCategory]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getPostColor = (category: string) => {
    return categoryColors[category] || '#a67c52';
  };

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center overflow-hidden">
        <MorphingBlob
          className="top-20 -right-40"
          color="var(--accent)"
          size={450}
          speed={12}
        />
        <MorphingBlob
          className="bottom-40 -left-40"
          color="var(--accent-secondary)"
          size={350}
          speed={15}
        />

        <motion.div
          className="container mx-auto px-6 pt-40 pb-16 relative z-10"
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
                Blog
              </span>
            </motion.div>

            <div className="space-y-1 md:space-y-2">
              <SplitText
                as="h1"
                animation="chars-wave"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95]"
                delay={0.3}
                stagger={0.03}
                trigger="load"
              >
                Ideas y
              </SplitText>
              <SplitText
                as="h1"
                animation="chars-wave"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95] text-accent"
                delay={0.5}
                stagger={0.03}
                trigger="load"
              >
                tendencias
              </SplitText>
            </div>

            <motion.p
              className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Compartimos lo que aprendemos sobre diseño, desarrollo y el mundo digital.
            </motion.p>

            {/* Categories filter */}
            <motion.div
              className="mt-12 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {categories.map((category, i) => (
                <MagneticButton key={category} strength={0.2}>
                  <motion.button
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-foreground text-background'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.3 + i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                </MagneticButton>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Posts Grid */}
      <section className="pb-32">
        <div ref={postsRef} className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const postColor = getPostColor(post.category);
              return (
                <HoverCard
                  key={post.slug}
                  className="post-card"
                  glare
                  tilt
                  scale
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block"
                    onMouseEnter={() => setHoveredPost(post.slug)}
                    onMouseLeave={() => setHoveredPost(null)}
                    data-cursor="Leer"
                  >
                    {/* Image placeholder */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                      <motion.div
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${postColor}40, ${postColor}20)`,
                        }}
                      />

                      {/* Category badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className="px-3 py-1 text-xs font-medium rounded-full text-white"
                          style={{ backgroundColor: postColor }}
                        >
                          {post.category}
                        </span>
                      </div>

                      {/* Reading time */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className="px-3 py-1 text-xs font-medium bg-background/80 backdrop-blur-sm rounded-full">
                          {post.readingTime} min
                        </span>
                      </div>

                      {/* Hover effect */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredPost === post.slug ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ backgroundColor: `${postColor}80` }}
                        >
                          <motion.div
                            className="w-14 h-14 rounded-full bg-white flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: hoveredPost === post.slug ? 1 : 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {formatDate(post.date)}
                      </p>
                      <h3 className="text-xl font-bold group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground line-clamp-2">
                        {post.description}
                      </p>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-secondary rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </HoverCard>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-xl text-muted-foreground">
                No hay artículos en esta categoría todavía.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fade-up" className="max-w-2xl mx-auto text-center">
            <SplitText
              as="h2"
              animation="chars-wave"
              className="text-3xl md:text-5xl font-bold tracking-tight text-background"
              trigger="scroll"
              stagger={0.02}
            >
              Suscribite al newsletter
            </SplitText>

            <motion.p
              className="mt-6 text-lg text-background/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Recibí las últimas tendencias, tips y recursos directamente en tu inbox.
            </motion.p>

            <motion.form
              className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-5 py-3 bg-background/10 border border-background/20 rounded-xl text-background placeholder:text-background/40 focus:outline-none focus:border-accent transition-colors"
              />
              <MagneticButton strength={0.3}>
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent text-accent-foreground rounded-xl font-medium hover:bg-accent/90 transition-colors"
                >
                  Suscribirse
                </button>
              </MagneticButton>
            </motion.form>
          </ScrollReveal>
        </div>
      </section>

      {/* Marquee */}
      <Marquee speed={25} className="py-8 bg-accent">
        <span className="text-4xl md:text-6xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          DISEÑO
        </span>
        <span className="text-accent-foreground/30 text-2xl">✦</span>
        <span className="text-4xl md:text-6xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          DESARROLLO
        </span>
        <span className="text-accent-foreground/30 text-2xl">✦</span>
        <span className="text-4xl md:text-6xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          BRANDING
        </span>
        <span className="text-accent-foreground/30 text-2xl">✦</span>
        <span className="text-4xl md:text-6xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          ESTRATEGIA
        </span>
        <span className="text-accent-foreground/30 text-2xl">✦</span>
      </Marquee>
    </>
  );
}
