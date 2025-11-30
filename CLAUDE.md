# TecnoDespegue - Agencia Digital

## Resumen del Proyecto
Sitio web de agencia digital construido con Next.js 16, React 19, TypeScript, Tailwind CSS 4, y Framer Motion. Incluye blog con MDX, formularios de contacto y newsletter, animaciones avanzadas, dark mode, y PWA.

## Repositorio
https://github.com/Rene-Kuhm/studio-agency

## Stack Tecnológico
- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion + GSAP
- Jest 30 + React Testing Library

## Estado Actual
- **Tests**: 60 tests pasando (Jest + RTL)
- **Build**: Funcional
- **Producción**: ~60% listo

## Tareas Pendientes (Prioridad)

### Crítico - Antes de lanzar
1. [ ] **Teléfono placeholder** - Cambiar `+54 11 1234-5678` en `src/app/contact/page.tsx:25-26`
2. [ ] **Dominio hardcodeado** - Cambiar `studio.com` a `tecnodespegue.com` en `src/app/blog/[slug]/page.tsx:87,91`
3. [ ] **Branding "Studio"** - Cambiar a "TecnoDespegue" en:
   - `src/app/contact/page.tsx:350`
   - `src/lib/blog/posts.ts:29`
4. [ ] **Implementar envío de emails** - Descomentar Resend en:
   - `src/app/api/contact/route.ts:123-141`
   - `src/app/api/newsletter/route.ts:87-102`

### Alta Prioridad
5. [ ] Newsletter: Mover de memoria a BD (actualmente `Set<string>` en memoria)
6. [ ] Rate limiting: Implementar con Redis (actualmente en memoria)
7. [ ] Integrar Sentry para tracking de errores
8. [ ] Agregar protección CSRF a formularios
9. [ ] Llamar `validateEnv()` en el build

### Media Prioridad
10. [ ] Agregar schema JSON-LD para Organization/LocalBusiness en homepage
11. [ ] URLs canónicas en todas las páginas
12. [ ] Verificar contraste de colores (WCAG)
13. [ ] Agregar focus states a componentes animados
14. [ ] Tests E2E con Playwright
15. [ ] Aumentar cobertura de tests a 70%+

### Baja Prioridad (Mejoras)
16. [ ] Búsqueda en blog
17. [ ] Páginas de categorías/tags (`/blog/category/[cat]`, `/blog/tag/[tag]`)
18. [ ] Sistema de comentarios (Giscus/Disqus)
19. [ ] Service worker para PWA offline
20. [ ] OG images dinámicas para blog posts
21. [ ] Link al RSS feed en header

## Estructura de Directorios Clave
```
src/
├── app/
│   ├── api/
│   │   ├── contact/route.ts    # Formulario de contacto
│   │   └── newsletter/route.ts # Suscripción newsletter
│   ├── blog/                   # Blog con MDX
│   ├── contact/                # Página de contacto
│   └── ...
├── components/
│   ├── animations/             # Cursor, MagneticButton, ScrollReveal, etc.
│   ├── blog/                   # Componentes del blog
│   ├── layout/                 # Header, Footer
│   ├── sections/               # Hero, About, Services, etc.
│   └── ui/                     # Componentes UI reutilizables
├── lib/
│   ├── blog/posts.ts          # Utilidades para posts MDX
│   ├── env.ts                 # Validación de variables de entorno
│   └── logger.ts              # Logger production-safe
├── providers/
│   └── ThemeProvider.tsx      # Dark mode
└── content/
    └── blog/                  # Posts en MDX
```

## Comandos Útiles
```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm test             # Tests
npm test:coverage    # Tests con cobertura
```

## Notas Importantes
- El sitio usa la paleta "Mocha Mousse" (tendencia 2025)
- Animaciones con GSAP y Framer Motion
- Blog con MDX y next-mdx-remote
- PWA con manifest.json e iconos dinámicos
- Headers de seguridad configurados en next.config.ts
