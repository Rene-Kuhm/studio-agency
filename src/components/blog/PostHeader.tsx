'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { formatDate } from '@/lib/utils/date';
import { SplitText } from '@/components/animations/SplitText';
import { MorphingBlob } from '@/components/animations/MorphingBlob';
import type { Author } from '@/lib/blog/types';

interface PostHeaderProps {
  title: string;
  description: string;
  date: string;
  author: Author;
  category: string;
  tags: string[];
  coverImage?: string;
  readingTime: number;
}

export function PostHeader({
  title,
  description,
  date,
  author,
  category,
  readingTime,
  coverImage,
}: PostHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <header ref={headerRef} className="relative pt-32 pb-16 overflow-hidden">
      {/* Background blobs */}
      <MorphingBlob
        className="top-20 -right-40"
        color="var(--accent)"
        size={400}
        speed={12}
      />

      <motion.div className="container mx-auto px-6 relative z-10" style={{ y, opacity }}>
        <div className="max-w-4xl mx-auto">
          {/* Pre-header */}
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

          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="inline-block px-4 py-1.5 text-sm font-medium bg-accent text-accent-foreground rounded-full">
              {category}
            </span>
          </motion.div>

          {/* Title */}
          <div className="mt-6">
            <SplitText
              as="h1"
              animation="chars-rotate"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
              delay={0.4}
              stagger={0.015}
              trigger="load"
            >
              {title}
            </SplitText>
          </div>

          {/* Description */}
          <motion.p
            className="mt-6 text-xl md:text-2xl text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {description}
          </motion.p>

          {/* Meta */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-lg font-bold text-accent">
                  {author.name.charAt(0)}
                </span>
              </div>
              <div>
                <span className="font-medium text-foreground block">{author.name}</span>
                <span className="text-sm text-muted-foreground">Autor</span>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-border hidden sm:block" />

            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={date}>{formatDate(date)}</time>
            </div>

            <div className="h-8 w-[1px] bg-border hidden sm:block" />

            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{readingTime} min de lectura</span>
            </div>
          </motion.div>
        </div>

        {/* Cover Image */}
        {coverImage && (
          <motion.div
            className="mt-12 max-w-5xl mx-auto rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div
              className="aspect-[2/1] bg-cover bg-center"
              style={{ backgroundImage: `url(${coverImage})` }}
            />
          </motion.div>
        )}

        {/* Placeholder cover if no image */}
        {!coverImage && (
          <motion.div
            className="mt-12 max-w-5xl mx-auto rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="aspect-[2/1] bg-gradient-to-br from-accent/30 via-accent-secondary/20 to-background relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 rounded-full bg-accent/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </header>
  );
}
