'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const CATEGORIES = [
  'Desarrollo Web',
  'Diseño',
  'Marketing Digital',
  'SEO',
  'Tecnología',
  'Tutorial',
  'General',
];

export default function NewPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    category: 'General',
    tags: '',
    coverImage: '/images/blog/default-cover.jpg',
    content: '',
    featured: false,
  });

  // Auto-generate slug from title
  useEffect(() => {
    const slug = formData.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    setFormData(prev => ({ ...prev, slug }));
  }, [formData.title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      });

      if (res.status === 401) {
        router.push('/admin');
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al crear el post');
        return;
      }

      router.push('/admin/posts');
    } catch {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-secondary/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/posts" className="text-muted-foreground hover:text-foreground transition-colors">
              &larr; Volver
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">Nuevo Post</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8">Crear Nuevo Post</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Título *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Título del post"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium mb-2">
                Slug (URL)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">/blog/</span>
                <input
                  type="text"
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="flex-1 px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="url-del-post"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Descripción
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Breve descripción del post (para SEO)"
                rows={2}
              />
            </div>

            {/* Category & Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Categoría
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-2">
                  Tags (separados por coma)
                </label>
                <input
                  type="text"
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="react, nextjs, web"
                />
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium mb-2">
                Imagen de portada (URL)
              </label>
              <input
                type="text"
                id="coverImage"
                value={formData.coverImage}
                onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="/images/blog/mi-imagen.jpg"
              />
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="w-5 h-5 rounded border-border text-accent focus:ring-accent"
              />
              <label htmlFor="featured" className="text-sm font-medium">
                Post destacado
              </label>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Contenido (MDX) *
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm"
                placeholder="Escribe el contenido del post en formato MDX..."
                rows={20}
                required
              />
              <p className="mt-2 text-sm text-muted-foreground">
                Puedes usar Markdown y componentes MDX. Ejemplos: **negrita**, *cursiva*, ## Subtítulo, [enlace](url)
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500">
                {error}
              </div>
            )}

            {/* Submit button */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-accent text-accent-foreground rounded-xl font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Guardando...' : 'Publicar Post'}
              </button>
              <Link
                href="/admin/posts"
                className="px-8 py-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
