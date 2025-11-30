import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readdir, readFile, writeFile, unlink } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return !!session?.value;
}

// GET - List all posts
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const files = await readdir(POSTS_DIR);
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(POSTS_DIR, file);
        const source = await readFile(filePath, 'utf-8');
        const { data } = matter(source);

        return {
          slug: file.replace('.mdx', ''),
          title: data.title || 'Sin título',
          date: data.date || new Date().toISOString().split('T')[0],
          category: data.category || 'General',
          description: data.description || '',
          tags: data.tags || [],
          coverImage: data.coverImage || '',
          featured: data.featured || false,
        };
      })
    );

    // Sort by date descending
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error listing posts:', error);
    return NextResponse.json({ error: 'Error listing posts' }, { status: 500 });
  }
}

// POST - Create new post
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, slug, description, category, tags, coverImage, content, featured } = await request.json();

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Title, slug and content are required' }, { status: 400 });
    }

    // Sanitize slug
    const sanitizedSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const filePath = path.join(POSTS_DIR, `${sanitizedSlug}.mdx`);

    // Check if file already exists
    try {
      await readFile(filePath);
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
    } catch {
      // File doesn't exist, continue
    }

    // Create frontmatter
    const frontmatter = {
      title,
      description: description || '',
      date: new Date().toISOString().split('T')[0],
      category: category || 'General',
      tags: tags || [],
      coverImage: coverImage || '/images/blog/default-cover.jpg',
      author: {
        name: 'René Kuhm',
        avatar: '/images/rene-kuhm.jpg',
      },
      featured: featured || false,
    };

    // Create MDX content
    const mdxContent = matter.stringify(content, frontmatter);

    await writeFile(filePath, mdxContent, 'utf-8');

    return NextResponse.json({ success: true, slug: sanitizedSlug });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}

// DELETE - Delete a post
export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

    await unlink(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
  }
}
