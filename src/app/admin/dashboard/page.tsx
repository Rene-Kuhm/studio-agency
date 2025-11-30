'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin';

interface Stats {
  totalPosts: number;
  categories: { name: string; count: number }[];
  recentPosts: { slug: string; title: string; date: string }[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/posts');
      if (res.ok) {
        const data = await res.json();
        const posts = data.posts || [];

        // Calculate stats
        const categoryCount: Record<string, number> = {};
        posts.forEach((post: { category: string }) => {
          categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
        });

        setStats({
          totalPosts: posts.length,
          categories: Object.entries(categoryCount).map(([name, count]) => ({ name, count })),
          recentPosts: posts.slice(0, 5),
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Posts',
      value: stats?.totalPosts || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      title: 'Categorias',
      value: stats?.categories.length || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      color: 'bg-green-500/10 text-green-500',
    },
    {
      title: 'Este Mes',
      value: stats?.recentPosts.filter(p => {
        const postDate = new Date(p.date);
        const now = new Date();
        return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear();
      }).length || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-purple-500/10 text-purple-500',
    },
    {
      title: 'Destacados',
      value: 0,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      color: 'bg-yellow-500/10 text-yellow-500',
    },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Bienvenido al panel de administracion</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-secondary/30 rounded-2xl border border-border"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.color}`}>
                      {stat.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Posts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 p-6 bg-secondary/30 rounded-2xl border border-border"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Posts Recientes</h2>
                  <Link
                    href="/admin/posts"
                    className="text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    Ver todos
                  </Link>
                </div>

                {stats?.recentPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">No hay posts aun</p>
                    <Link
                      href="/admin/posts/new"
                      className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium"
                    >
                      Crear primer post
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stats?.recentPosts.map((post, index) => (
                      <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-background/50 rounded-xl hover:bg-background transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{post.title}</h3>
                          <p className="text-sm text-muted-foreground">{post.date}</p>
                        </div>
                        <Link
                          href={`/admin/posts/edit/${post.slug}`}
                          className="ml-4 px-3 py-1.5 text-sm bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                          Editar
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 bg-secondary/30 rounded-2xl border border-border"
              >
                <h2 className="text-xl font-semibold mb-6">Categorias</h2>

                {stats?.categories.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Sin categorias
                  </p>
                ) : (
                  <div className="space-y-3">
                    {stats?.categories.map((cat, index) => (
                      <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-background/50 rounded-xl"
                      >
                        <span className="font-medium">{cat.name}</span>
                        <span className="px-2.5 py-1 bg-accent/20 text-accent rounded-full text-sm">
                          {cat.count}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 p-6 bg-secondary/30 rounded-2xl border border-border"
            >
              <h2 className="text-xl font-semibold mb-6">Acciones Rapidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/admin/posts/new"
                  className="flex items-center gap-3 p-4 bg-accent/10 hover:bg-accent/20 rounded-xl transition-colors group"
                >
                  <div className="p-2 bg-accent text-accent-foreground rounded-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium group-hover:text-accent transition-colors">Nuevo Post</p>
                    <p className="text-sm text-muted-foreground">Crear articulo</p>
                  </div>
                </Link>

                <Link
                  href="/admin/posts"
                  className="flex items-center gap-3 p-4 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl transition-colors group"
                >
                  <div className="p-2 bg-blue-500 text-white rounded-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium group-hover:text-blue-500 transition-colors">Ver Posts</p>
                    <p className="text-sm text-muted-foreground">Gestionar blog</p>
                  </div>
                </Link>

                <Link
                  href="/blog"
                  target="_blank"
                  className="flex items-center gap-3 p-4 bg-green-500/10 hover:bg-green-500/20 rounded-xl transition-colors group"
                >
                  <div className="p-2 bg-green-500 text-white rounded-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium group-hover:text-green-500 transition-colors">Ver Blog</p>
                    <p className="text-sm text-muted-foreground">Vista publica</p>
                  </div>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
