'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.href = '/admin/posts';
      } else {
        setError('Contraseña incorrecta');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-secondary/30 rounded-3xl border border-border"
      >
        <h1 className="text-3xl font-bold text-center mb-2">Admin</h1>
        <p className="text-muted-foreground text-center mb-8">Panel de administración</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Ingresa la contraseña"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-accent text-accent-foreground rounded-xl font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
