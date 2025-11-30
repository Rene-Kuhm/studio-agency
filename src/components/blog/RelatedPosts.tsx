import Link from 'next/link';
import { getRelatedPosts } from '@/lib/blog/posts';
import { formatDate } from '@/lib/utils/date';
import { FadeIn } from '@/components/animations/FadeIn';

interface RelatedPostsProps {
  currentSlug: string;
  category: string;
  tags: string[];
}

export async function RelatedPosts({
  currentSlug,
  category,
  tags,
}: RelatedPostsProps) {
  const relatedPosts = await getRelatedPosts(currentSlug, category, tags);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12">Artículos relacionados</h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-secondary mb-4">
                  {post.coverImage ? (
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${post.coverImage})` }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 transition-transform duration-500 group-hover:scale-105" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {post.category}
                </span>
                <h3 className="mt-1 text-xl font-bold group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {formatDate(post.date)}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
