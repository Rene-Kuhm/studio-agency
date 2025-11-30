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
- Prisma 5 + PostgreSQL
- Sentry (error tracking)
- Jest 30 + React Testing Library

## Estado Actual
- **Tests unitarios**: 108 tests pasando (Jest + RTL), 85%+ cobertura
- **Tests E2E**: 35 tests pasando (Playwright)
- **Build**: Funcional
- **Producción**: 100% listo (solo quedan mejoras opcionales)

## Tareas Completadas

### Crítico
1. [x] **Teléfono actualizado** - `+54 2334 409-838`
2. [x] **Dominio actualizado** - `tecnodespegue.com`
3. [x] **Branding actualizado** - "TecnoDespegue" en todos los archivos
4. [x] **Emails con Resend** - Implementado y funcionando

### Alta Prioridad
5. [x] Newsletter con PostgreSQL (Prisma)
6. [x] Rate limiting con PostgreSQL
7. [x] Sentry integrado para error tracking
8. [x] Protección CSRF en formularios
9. [x] `validateEnv()` se ejecuta al iniciar

### Media Prioridad
10. [x] Schema JSON-LD para Organization/LocalBusiness en homepage
11. [x] URLs canónicas en todas las páginas
12. [x] Contraste de colores mejorado (WCAG AA)
13. [x] Focus states en componentes animados

### Testing
14. [x] Tests E2E con Playwright (35 tests)
15. [x] Cobertura de tests unitarios 85%+ (108 tests)

### Blog
16. [x] Búsqueda en blog (ya implementada en BlogPageClient)
17. [x] Páginas de categorías (`/blog/category/[cat]`)
18. [x] Páginas de tags (`/blog/tag/[tag]`)
19. [x] Sistema de comentarios con Giscus (requiere configurar env vars)

## Tareas Pendientes

### Baja Prioridad (Mejoras futuras)
1. [ ] Service worker para PWA offline
2. [ ] OG images dinámicas para blog posts
3. [ ] Link al RSS feed en header

## Configuración Requerida

### Variables de Entorno
Ver `.env.example` para todas las variables. Las principales son:
- `DATABASE_URL` - PostgreSQL (Supabase/Neon)
- `RESEND_API_KEY` - Para envío de emails
- `SENTRY_DSN` - Para error tracking
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics

### Base de Datos
```bash
npx prisma generate   # Generar cliente
npx prisma db push    # Sincronizar schema con DB
npx prisma migrate dev # Crear migraciones
```

## Estructura de Directorios Clave
```
src/
├── app/
│   ├── api/
│   │   ├── contact/route.ts    # Formulario de contacto
│   │   ├── newsletter/route.ts # Suscripción newsletter
│   │   └── csrf/route.ts       # Token CSRF
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
│   ├── csrf.ts                # Protección CSRF
│   ├── env.ts                 # Validación de variables de entorno
│   ├── logger.ts              # Logger production-safe
│   ├── prisma.ts              # Cliente Prisma
│   └── rate-limit.ts          # Rate limiting
├── hooks/
│   └── useCsrf.ts             # Hook para CSRF
├── providers/
│   └── ThemeProvider.tsx      # Dark mode
└── content/
    └── blog/                  # Posts en MDX

prisma/
└── schema.prisma              # Schema de base de datos
```

## Comandos Útiles
```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm test             # Tests unitarios
npm run test:coverage # Tests con cobertura
npm run test:e2e     # Tests E2E con Playwright
npm run test:e2e:ui  # Tests E2E con UI interactiva
npx prisma studio    # UI para ver datos
```

## Notas Importantes
- El sitio usa la paleta "Mocha Mousse" (tendencia 2025)
- Animaciones con GSAP y Framer Motion
- Blog con MDX y next-mdx-remote
- PWA con manifest.json e iconos dinámicos
- Headers de seguridad configurados en next.config.ts
- Sentry configurado para client, server y edge
