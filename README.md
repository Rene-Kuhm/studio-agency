<p align="center">
  <img src="public/tecnodespegue-logo.svg" alt="TecnoDespegue Logo" width="80" height="80">
</p>

<h1 align="center">TecnoDespegue</h1>

<p align="center">
  <strong>Agencia Digital - Website Premium con Next.js 16 & Tendencias 2025</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#animations">Animations</a> •
  <a href="#deployment">Deployment</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.0.5-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind">
  <img src="https://img.shields.io/badge/GSAP-3.12-88CE02?style=flat-square&logo=greensock" alt="GSAP">
  <img src="https://img.shields.io/badge/Framer_Motion-11.0-FF0055?style=flat-square&logo=framer" alt="Framer Motion">
</p>

---

## ✨ Features

### Design & UX
- **2025 Design Trends** — Pantone Mocha Mousse color palette, warm earthy tones
- **Cinematic Animations** — Scroll-triggered reveals, parallax effects, text splitting
- **Custom Cursor** — Interactive cursor with magnetic effects and contextual labels
- **Responsive Design** — Mobile-first approach, works on all devices
- **Dark/Light Ready** — CSS variables for easy theme switching

### Technical
- **Next.js 16** — App Router, Turbopack, React Compiler
- **TypeScript** — Strict mode for type safety
- **MDX Blog** — Local content management with frontmatter
- **SEO Optimized** — Meta tags, JSON-LD, OpenGraph
- **Performance** — Static generation, optimized assets

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS 4, CSS Variables |
| **Animations** | GSAP + ScrollTrigger, Framer Motion, Lenis |
| **Content** | MDX, gray-matter |
| **Deployment** | Vercel (recommended) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Rene-Kuhm/studio-agency.git

# Navigate to the project
cd studio-agency

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📁 Project Structure

```
studio-agency/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── about/             # About page
│   │   ├── services/          # Services page
│   │   ├── work/              # Portfolio page
│   │   ├── blog/              # Blog pages
│   │   │   ├── page.tsx       # Blog listing
│   │   │   └── [slug]/        # Dynamic blog posts
│   │   └── contact/           # Contact page
│   │
│   ├── components/
│   │   ├── animations/        # Animation components
│   │   │   ├── Cursor.tsx     # Custom cursor
│   │   │   ├── HoverCard.tsx  # 3D tilt cards
│   │   │   ├── MagneticButton.tsx
│   │   │   ├── Marquee.tsx    # Infinite scroll text
│   │   │   ├── MorphingBlob.tsx
│   │   │   ├── ScrollReveal.tsx
│   │   │   └── SplitText.tsx  # Text animations
│   │   ├── blog/              # Blog components
│   │   ├── layout/            # Header, Footer
│   │   ├── sections/          # Page sections
│   │   └── ui/                # UI primitives
│   │
│   ├── content/
│   │   └── posts/             # MDX blog posts
│   │
│   ├── lib/
│   │   ├── blog/              # Blog utilities
│   │   └── utils/             # Helper functions
│   │
│   └── providers/             # Context providers
│
├── public/                    # Static assets
├── tailwind.config.ts        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

---

## 🎨 Design System

### Color Palette (Pantone 2025 - Mocha Mousse)

```css
:root {
  --background: #f8f5f2;
  --foreground: #1a1614;
  --accent: #a67c52;           /* Primary - Mocha Mousse */
  --accent-secondary: #c9a87c;
  --accent-tertiary: #8b7355;
  --muted: #e8e2dc;
}
```

### Typography

- **Headings**: System font stack, bold, tight tracking
- **Body**: System font stack, regular weight
- **Gradient Text**: Warm gradient from accent colors

---

## 🎬 Animations

### Available Animation Components

| Component | Description | Props |
|-----------|-------------|-------|
| `SplitText` | Animates text by chars/words | `animation`, `trigger`, `stagger` |
| `ScrollReveal` | Reveal on scroll | `animation`, `delay`, `duration` |
| `HoverCard` | 3D tilt with glare | `tilt`, `glare`, `scale` |
| `MagneticButton` | Magnetic hover effect | `strength` |
| `MorphingBlob` | Animated background blob | `color`, `size`, `speed` |
| `Marquee` | Infinite horizontal scroll | `speed`, `direction` |
| `Cursor` | Custom cursor | Automatic |

### SplitText Animations

```tsx
<SplitText
  as="h1"
  animation="chars-rotate"  // 'chars' | 'words' | 'chars-rotate' | 'chars-wave'
  trigger="scroll"          // 'load' | 'scroll'
  stagger={0.02}
>
  Your text here
</SplitText>
```

### ScrollReveal Usage

```tsx
<ScrollReveal animation="fade-up" delay={0.2}>
  <YourComponent />
</ScrollReveal>
```

---

## 📝 Blog System

### Creating a New Post

Create a new `.mdx` file in `src/content/posts/`:

```mdx
---
title: 'Your Post Title'
description: 'Brief description of your post'
date: '2024-01-15'
author:
  name: 'Author Name'
  avatar: '/images/avatar.jpg'
category: 'Desarrollo'
tags: ['Next.js', 'React', 'Web']
coverImage: '/images/posts/cover.jpg'
---

Your markdown content here...
```

### Supported Frontmatter

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title |
| `description` | string | Yes | Short description |
| `date` | string | Yes | Publication date (YYYY-MM-DD) |
| `author` | object | Yes | Author info (name, avatar) |
| `category` | string | Yes | Post category |
| `tags` | string[] | No | Post tags |
| `coverImage` | string | No | Cover image URL |

---

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, services preview, featured work |
| About | `/about` | Team, values, company story |
| Services | `/services` | Detailed service offerings |
| Work | `/work` | Portfolio with filters |
| Blog | `/blog` | Blog listing with categories |
| Blog Post | `/blog/[slug]` | Individual blog posts |
| Contact | `/contact` | Contact form and info |

---

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Rene-Kuhm/studio-agency)

### Manual Deployment

```bash
# Build the project
npm run build

# The output will be in .next/
# Deploy to your preferred hosting
```

### Environment Variables

No environment variables required for basic functionality.

---

## 🔧 Customization

### Changing Colors

Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --accent: #your-color;
  --accent-secondary: #your-color;
}
```

### Adding New Pages

1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. Use existing components and animations

### Modifying Animations

Animation variants are in `src/lib/animations/variants.ts`

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Design inspired by [Awwwards](https://awwwards.com) winning sites
- Pantone Color of the Year 2025: Mocha Mousse
- [GSAP](https://greensock.com/gsap/) for powerful animations
- [Framer Motion](https://www.framer.com/motion/) for React animations
- [Lenis](https://lenis.studiofreight.com/) for smooth scrolling

---

<p align="center">
  <strong>Built with ❤️ using Next.js 16</strong>
</p>

<p align="center">
  <a href="https://github.com/Rene-Kuhm/studio-agency">⭐ Star this repo</a> •
  <a href="https://github.com/Rene-Kuhm/studio-agency/issues">🐛 Report Bug</a> •
  <a href="https://github.com/Rene-Kuhm/studio-agency/issues">✨ Request Feature</a>
</p>
