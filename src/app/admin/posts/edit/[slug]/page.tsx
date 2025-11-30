'use client';

import { useState, useEffect, use } from 'react';
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
      setError('Error de conexion');
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
      setError('Error de conexion');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <span className="text-muted-foreground">Cargando post...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

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
              <h1 className="text-2xl font-bold">Editar Post</h1>
              <p className="text-sm text-muted-foreground">/{slug}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/blog/${slug}`}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 text-sm bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Ver en blog
            </Link>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Eliminar
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
                <h3 className="font-semibold mb-4">Guardar</h3>

                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-3 bg-accent text-accent-foreground rounded-xl font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                      Guardando...
                    </span>
                  ) : (
                    'Guardar Cambios'
                  )}
                </button>

                <Link
                  href="/admin/posts"
                  className="block text-center mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancelar
                </Link>
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background p-8 rounded-2xl max-w-md w-full border border-border shadow-xl"
          >
            <div className="w-12 h-12 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-center mb-2">Eliminar Post</h2>
            <p className="text-muted-foreground text-center mb-6">
              Esta seguro de que quiere eliminar este post? Esta accion no se puede deshacer.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-6 py-2.5 text-muted-foreground hover:text-foreground border border-border rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-6 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}
