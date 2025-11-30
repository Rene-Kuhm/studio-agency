import type { Metadata } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/blog/posts';
import { BlogPageClient } from '@/components/blog/BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artículos sobre diseño, desarrollo web, branding y tendencias digitales. Compartimos lo que aprendemos.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();

  return <BlogPageClient posts={posts} categories={['Todos', ...categories]} />;
}
