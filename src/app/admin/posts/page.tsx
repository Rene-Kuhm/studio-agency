'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/posts');
      if (res.status === 401) {
        window.location.href = '/admin';
        return;
      }
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-secondary/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold">
              Tecno<span className="text-accent">Despegue</span>
            </Link>
            <span className="text-muted-foreground">/ Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/posts/new"
              className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              + Nuevo Post
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Posts del Blog</h1>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Cargando posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No hay posts aún</p>
            <Link
              href="/admin/posts/new"
              className="inline-block px-6 py-3 bg-accent text-accent-foreground rounded-xl font-medium"
            >
              Crear primer post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 bg-secondary/30 rounded-2xl border border-border hover:border-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{post.date}</span>
                      <span className="px-2 py-0.5 bg-accent/20 text-accent rounded-full text-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Ver
                    </Link>
                    <Link
                      href={`/admin/posts/edit/${post.slug}`}
                      className="px-3 py-1.5 text-sm bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
