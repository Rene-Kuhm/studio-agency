'use client';

import { useState, useEffect, useCallback } from 'react';

export function useCsrf() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchToken = useCallback(async () => {
    try {
      const response = await fetch('/api/csrf');
      const data = await response.json();
      setToken(data.token);
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  // Helper to make fetch requests with CSRF token
  const csrfFetch = useCallback(
    async (url: string, options: RequestInit = {}) => {
      if (!token) {
        throw new Error('CSRF token not available');
      }

      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'x-csrf-token': token,
        },
      });
    },
    [token]
  );

  return { token, loading, csrfFetch, refreshToken: fetchToken };
}
