import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllCategories, getPostsByCategory } from '@/lib/blog/posts';
import { PostGrid } from '@/components/blog/PostGrid';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category.toLowerCase()),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const categories = await getAllCategories();

  const matchedCategory = categories.find(
    (cat) => cat.toLowerCase() === decodedCategory.toLowerCase()
  );

  if (!matchedCategory) {
    return { title: 'Categoría no encontrada' };
  }

  return {
    title: `${matchedCategory} | Blog`,
    description: `Artículos sobre ${matchedCategory}. Explorá nuestros posts y recursos.`,
    alternates: {
      canonical: `https://tecnodespegue.com/blog/category/${encodeURIComponent(matchedCategory.toLowerCase())}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const categories = await getAllCategories();

  const matchedCategory = categories.find(
    (cat) => cat.toLowerCase() === decodedCategory.toLowerCase()
  );

  if (!matchedCategory) {
    notFound();
  }

  const posts = await getPostsByCategory(matchedCategory);

  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Categoría</span>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{matchedCategory}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-[2px] bg-accent" />
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
              Categoría
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {matchedCategory}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            {posts.length} {posts.length === 1 ? 'artículo' : 'artículos'}
          </p>
        </header>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <PostGrid posts={posts} />
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No hay artículos en esta categoría todavía.
            </p>
            <Link
              href="/blog"
              className="inline-block mt-4 text-accent hover:underline"
            >
              Ver todos los artículos
            </Link>
          </div>
        )}

        {/* Back link */}
        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al blog
          </Link>
        </div>
      </div>
    </main>
  );
}
