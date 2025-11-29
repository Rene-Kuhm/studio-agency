'use client';

import { motion } from 'framer-motion';
import { PostCard } from './PostCard';
import type { PostMeta } from '@/lib/blog/types';

interface PostGridProps {
  posts: PostMeta[];
}

export function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground">
          No se encontraron artículos
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </motion.div>
  );
}
