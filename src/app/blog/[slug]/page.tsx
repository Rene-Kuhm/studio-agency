import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPosts } from '@/lib/blog/posts';
import { PostHeader } from '@/components/blog/PostHeader';
import { PostContent } from '@/components/blog/PostContent';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { BlogPostWrapper } from '@/components/blog/BlogPostWrapper';
import Link from 'next/link';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Marquee } from '@/components/animations/Marquee';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Artículo no encontrado',
    };
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: `https://tecnodespegue.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.coverImage ? [post.coverImage] : [],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TecnoDespegue',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://tecnodespegue.com/blog/${post.slug}`,
    },
  };

  return (
    <BlogPostWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <PostHeader
          title={post.title}
          description={post.description}
          date={post.date}
          author={post.author}
          category={post.category}
          tags={post.tags}
          coverImage={post.coverImage}
          readingTime={post.readingTime}
        />

        <div className="container mx-auto px-6 pb-20">
          <div className="max-w-3xl mx-auto">
            <PostContent content={post.content} />

            {/* Tags */}
            {post.tags.length > 0 && (
              <ScrollReveal animation="fade-up" className="mt-12 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Etiquetas</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 text-sm bg-secondary hover:bg-accent hover:text-accent-foreground rounded-full transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {/* Share */}
            <ScrollReveal animation="fade-up" className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Compartir</p>
              <div className="flex gap-3">
                {['Twitter', 'LinkedIn', 'Facebook'].map((platform) => (
                  <button
                    key={platform}
                    className="px-4 py-2 text-sm bg-secondary hover:bg-accent hover:text-accent-foreground rounded-full transition-colors"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* Author card */}
            <ScrollReveal animation="fade-up" className="mt-12">
              <div className="p-6 md:p-8 bg-secondary/50 rounded-3xl flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-accent">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-sm text-muted-foreground">Escrito por</p>
                  <p className="text-xl font-bold">{post.author.name}</p>
                  <p className="mt-2 text-muted-foreground">
                    Apasionado por el diseño y la tecnología. Compartiendo conocimientos
                    y experiencias del mundo digital.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Back to blog */}
            <ScrollReveal animation="fade-up" className="mt-12">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </span>
                <span className="font-medium">Volver al blog</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </article>

      <RelatedPosts
        currentSlug={slug}
        category={post.category}
        tags={post.tags}
      />

      {/* Marquee */}
      <Marquee speed={25} className="py-6 bg-accent">
        <span className="text-3xl md:text-4xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          GRACIAS POR LEER
        </span>
        <span className="text-accent-foreground/30 text-xl">✦</span>
        <span className="text-3xl md:text-4xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          COMPARTÍ ESTE ARTÍCULO
        </span>
        <span className="text-accent-foreground/30 text-xl">✦</span>
        <span className="text-3xl md:text-4xl font-bold text-accent-foreground/10 whitespace-nowrap px-8">
          SEGUÍ APRENDIENDO
        </span>
        <span className="text-accent-foreground/30 text-xl">✦</span>
      </Marquee>
    </BlogPostWrapper>
  );
}
