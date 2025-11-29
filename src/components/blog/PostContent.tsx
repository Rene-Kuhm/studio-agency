import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import type { ComponentProps } from 'react';

const components = {
  h2: ({ children, ...props }: ComponentProps<'h2'>) => (
    <h2
      className="mt-12 mb-4 text-3xl font-bold tracking-tight scroll-mt-24"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentProps<'h3'>) => (
    <h3
      className="mt-8 mb-3 text-2xl font-semibold tracking-tight scroll-mt-24"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: ComponentProps<'p'>) => (
    <p
      className="mb-6 text-lg leading-relaxed text-muted-foreground"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({ href, children, ...props }: ComponentProps<'a'>) => (
    <a
      href={href}
      className="text-accent hover:underline underline-offset-4"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }: ComponentProps<'ul'>) => (
    <ul className="mb-6 ml-6 list-disc space-y-2 text-muted-foreground" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentProps<'ol'>) => (
    <ol
      className="mb-6 ml-6 list-decimal space-y-2 text-muted-foreground"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ComponentProps<'li'>) => (
    <li className="text-lg" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: ComponentProps<'blockquote'>) => (
    <blockquote
      className="mb-6 border-l-4 border-accent pl-6 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  pre: ({ children, ...props }: ComponentProps<'pre'>) => (
    <pre
      className="mb-6 overflow-x-auto rounded-lg bg-secondary p-4 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, ...props }: ComponentProps<'code'>) => (
    <code
      className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  hr: () => <hr className="my-12 border-border" />,
  strong: ({ children, ...props }: ComponentProps<'strong'>) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
};

interface PostContentProps {
  content: string;
}

export async function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote
        source={content}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: 'wrap',
                  properties: {
                    className: ['anchor'],
                  },
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
