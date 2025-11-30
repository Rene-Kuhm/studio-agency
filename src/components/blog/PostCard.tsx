'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils/date';
import type { PostMeta } from '@/lib/blog/types';

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        {/* Cover Image */}
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-secondary mb-6">
          {post.coverImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${post.coverImage})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 transition-transform duration-500 group-hover:scale-105" />
          )}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors flex items-center justify-center">
            <span className="text-background font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Leer artículo
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-muted-foreground line-clamp-2">
          {post.description}
        </p>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingTime} min de lectura</span>
        </div>
      </Link>

      {/* Category & Tags - outside of main link for separate clickability */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link
          href={`/blog/category/${encodeURIComponent(post.category.toLowerCase())}`}
          className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground rounded-full transition-colors"
        >
          {post.category}
        </Link>
        {post.tags.slice(0, 2).map((tag) => (
          <Link
            key={tag}
            href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
            className="inline-block px-2 py-1 text-xs text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </motion.article>
  );
}
