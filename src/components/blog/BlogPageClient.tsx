'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitText } from '@/components/animations/SplitText';
import { HoverCard } from '@/components/animations/HoverCard';
import { MorphingBlob } from '@/components/animations/MorphingBlob';
import { Marquee } from '@/components/animations/Marquee';
import { NewsletterForm } from '@/components/NewsletterForm';
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

const POSTS_PER_PAGE = 6;

export function BlogPageClient({ posts, categories }: BlogPageClientProps) {
  const heroRef = useRef<HTMLElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Filter posts by category and search query
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Reset page when filters change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

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
  }, [activeCategory, searchQuery, currentPage]);

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

            {/* Search bar */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div className="relative max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Buscar artículos..."
                  className="w-full px-5 py-3 pl-12 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </motion.div>

            {/* Categories filter */}
            <motion.div
              className="mt-6 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {categories.map((category, i) => (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
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
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Posts Grid */}
      <section className="pb-32">
        <div ref={postsRef} className="container mx-auto px-6">
          {/* Results count */}
          {searchQuery && (
            <motion.p
              className="mb-6 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {filteredPosts.length} {filteredPosts.length === 1 ? 'resultado' : 'resultados'} para "{searchQuery}"
            </motion.p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => {
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
                {searchQuery
                  ? 'No se encontraron artículos para tu búsqueda.'
                  : 'No hay artículos en esta categoría todavía.'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="mt-4 text-accent hover:underline"
                >
                  Limpiar búsqueda
                </button>
              )}
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="flex items-center justify-center gap-2 mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Previous button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  currentPage === 1
                    ? 'bg-secondary/50 text-muted-foreground cursor-not-allowed'
                    : 'bg-secondary hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-foreground text-background'
                      : 'bg-secondary hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  currentPage === totalPages
                    ? 'bg-secondary/50 text-muted-foreground cursor-not-allowed'
                    : 'bg-secondary hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
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

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <NewsletterForm variant="dark" />
            </motion.div>
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
