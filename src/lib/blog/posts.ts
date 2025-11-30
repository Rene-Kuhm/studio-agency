import { readdir, readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Post, PostMeta } from './types';

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const files = await readdir(POSTS_DIR);
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(POSTS_DIR, file);
        const source = await readFile(filePath, 'utf-8');
        const { data } = matter(source);
        const stats = readingTime(source);

        return {
          slug: file.replace('.mdx', ''),
          title: data.title,
          description: data.description,
          date: data.date,
          category: data.category,
          tags: data.tags || [],
          coverImage: data.coverImage,
          author: data.author || { name: 'TecnoDespegue' },
          readingTime: Math.ceil(stats.minutes),
          featured: data.featured || false,
        } as PostMeta;
      })
    );

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
    const source = await readFile(filePath, 'utf-8');
    const { data, content } = matter(source);
    const stats = readingTime(source);

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      category: data.category,
      tags: data.tags || [],
      coverImage: data.coverImage,
      author: data.author || { name: 'TecnoDespegue' },
      content,
      readingTime: Math.ceil(stats.minutes),
      featured: data.featured || false,
    } as Post;
  } catch {
    return null;
  }
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}

export async function getPostsByCategory(category: string): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === category);
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

export async function getFeaturedPosts(): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.featured).slice(0, 3);
}

export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  tags: string[],
  limit = 3
): Promise<PostMeta[]> {
  const posts = await getAllPosts();

  return posts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      let score = 0;
      if (post.category === category) score += 2;
      post.tags.forEach((tag) => {
        if (tags.includes(tag)) score += 1;
      });
      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}
