'use client';

import { useState, useEffect, use } from 'react';
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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function EditPostPage({ params }: PageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    tags: '',
    coverImage: '',
    content: '',
    featured: false,
  });

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/admin/posts/${slug}`);

      if (res.status === 401) {
        router.push('/admin');
        return;
      }

      if (!res.ok) {
        setError('Post no encontrado');
        return;
      }

      const data = await res.json();
      setFormData({
        title: data.title || '',
        description: data.description || '',
        category: data.category || 'General',
        tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
        coverImage: data.coverImage || '',
        content: data.content || '',
        featured: data.featured || false,
      });
    } catch {
      setError('Error al cargar el post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: 'PUT',
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
        setError(data.error || 'Error al actualizar el post');
        return;
      }

      router.push('/admin/posts');
    } catch {
      setError('Error de conexión');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError('');

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });

      if (res.status === 401) {
        router.push('/admin');
        return;
      }

      if (!res.ok) {
        setError('Error al eliminar el post');
        return;
      }

      router.push('/admin/posts');
    } catch {
      setError('Error de conexión');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando post...</p>
      </div>
    );
  }

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
            <span className="font-medium">Editar Post</span>
          </div>
          <Link
            href={`/blog/${slug}`}
            target="_blank"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver en el blog &rarr;
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Editar Post</h1>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              Eliminar
            </button>
          </div>

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
                disabled={isSaving}
                className="px-8 py-3 bg-accent text-accent-foreground rounded-xl font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background p-8 rounded-2xl max-w-md w-full mx-4 border border-border"
          >
            <h2 className="text-xl font-bold mb-4">Eliminar Post</h2>
            <p className="text-muted-foreground mb-6">
              ¿Estás seguro de que quieres eliminar este post? Esta acción no se puede deshacer.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Eliminando...' : 'Sí, eliminar'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-6 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
