'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin';

const CATEGORIES = [
  'Desarrollo Web',
  'Diseno',
  'Marketing Digital',
  'SEO',
  'Tecnologia',
  'Tutorial',
  'General',
];

export default function NewPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

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
      setError('Error de conexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/posts"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Nuevo Post</h1>
              <p className="text-sm text-muted-foreground">Crear un nuevo articulo para el blog</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'write' ? 'preview' : 'write')}
              className="px-4 py-2 text-sm bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              {activeTab === 'write' ? 'Vista previa' : 'Editar'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Title */}
              <div className="p-6 bg-secondary/30 rounded-2xl border border-border">
                <label htmlFor="title" className="block text-sm font-medium mb-3">
                  Titulo *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-lg"
                  placeholder="Titulo del post"
                  required
                />
              </div>

              {/* Content */}
              <div className="p-6 bg-secondary/30 rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="content" className="block text-sm font-medium">
                    Contenido (MDX) *
                  </label>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-1 bg-secondary rounded">**negrita**</span>
                    <span className="px-2 py-1 bg-secondary rounded">*cursiva*</span>
                    <span className="px-2 py-1 bg-secondary rounded">## Titulo</span>
                  </div>
                </div>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm min-h-[500px]"
                  placeholder="Escribe el contenido del post en formato MDX..."
                  required
                />
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Publish */}
              <div className="p-6 bg-secondary/30 rounded-2xl border border-border">
                <h3 className="font-semibold mb-4">Publicar</h3>

                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-accent text-accent-foreground rounded-xl font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                      Guardando...
                    </span>
                  ) : (
                    'Publicar Post'
                  )}
                </button>

                <Link
                  href="/admin/posts"
                  className="block text-center mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancelar
                </Link>
              </div>

              {/* Slug */}
              <div className="p-6 bg-secondary/30 rounded-2xl border border-border">
                <label htmlFor="slug" className="block text-sm font-medium mb-3">
                  URL (Slug)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">/blog/</span>
                  <input
                    type="text"
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    placeholder="url-del-post"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="p-6 bg-secondary/30 rounded-2xl border border-border">
                <label htmlFor="category" className="block text-sm font-medium mb-3">
                  Categoria
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div className="p-6 bg-secondary/30 rounded-2xl border border-border">
                <label htmlFor="tags" className="block text-sm font-medium mb-3">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  placeholder="react, nextjs, web"
                />
                <p className="mt-2 text-xs text-muted-foreground">Separados por coma</p>
              </div>

              {/* Description */}
              <div className="p-6 bg-secondary/30 rounded-2xl border border-border">
                <label htmlFor="description" className="block text-sm font-medium mb-3">
                  Descripcion (SEO)
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  placeholder="Breve descripcion para motores de busqueda"
                  rows={3}
                />
              </div>

              {/* Cover Image */}
              <div className="p-6 bg-secondary/30 rounded-2xl border border-border">
                <label htmlFor="coverImage" className="block text-sm font-medium mb-3">
                  Imagen de Portada
                </label>
                <input
                  type="text"
                  id="coverImage"
                  value={formData.coverImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  placeholder="/images/blog/imagen.jpg"
                />
              </div>

              {/* Featured */}
              <div className="p-6 bg-secondary/30 rounded-2xl border border-border">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-5 h-5 rounded border-border text-accent focus:ring-accent"
                  />
                  <div>
                    <span className="font-medium">Post Destacado</span>
                    <p className="text-xs text-muted-foreground">Mostrar en la seccion destacada</p>
                  </div>
                </label>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
