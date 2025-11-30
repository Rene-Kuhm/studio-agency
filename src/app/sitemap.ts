import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog/posts';
import { SITE_URL } from '@/lib/env';

// Last updated dates for static pages (update when content changes)
const STATIC_PAGE_DATES = {
  home: '2024-01-15',
  about: '2024-01-10',
  services: '2024-01-10',
  work: '2024-01-12',
  contact: '2024-01-10',
  privacy: '2024-01-01',
  terms: '2024-01-01',
  faq: '2024-01-15',
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // Get all blog posts
  const posts = await getAllPosts();

  // Get the most recent blog post date for the blog index
  const latestPostDate = posts.length > 0
    ? new Date(Math.max(...posts.map(p => new Date(p.date).getTime())))
    : new Date(STATIC_PAGE_DATES.home);

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Static pages with actual last modified dates
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(STATIC_PAGE_DATES.home),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(STATIC_PAGE_DATES.about),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(STATIC_PAGE_DATES.services),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(STATIC_PAGE_DATES.work),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPostDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(STATIC_PAGE_DATES.contact),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(STATIC_PAGE_DATES.faq),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(STATIC_PAGE_DATES.privacy),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(STATIC_PAGE_DATES.terms),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  return [...staticPages, ...blogUrls];
}
