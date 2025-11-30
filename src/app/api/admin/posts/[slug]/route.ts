import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return !!session?.value;
}

// GET - Get a single post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
    const source = await readFile(filePath, 'utf-8');
    const { data, content } = matter(source);

    return NextResponse.json({
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      category: data.category || 'General',
      tags: data.tags || [],
      coverImage: data.coverImage || '',
      featured: data.featured || false,
      content,
    });
  } catch (error) {
    console.error('Error reading post:', error);
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
}

// PUT - Update a post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const { title, description, category, tags, coverImage, content, featured } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

    // Read existing file to preserve original date
    const existingSource = await readFile(filePath, 'utf-8');
    const { data: existingData } = matter(existingSource);

    // Create updated frontmatter
    const frontmatter = {
      title,
      description: description || '',
      date: existingData.date || new Date().toISOString().split('T')[0],
      category: category || 'General',
      tags: tags || [],
      coverImage: coverImage || '/images/blog/default-cover.jpg',
      author: existingData.author || {
        name: 'René Kuhm',
        avatar: '/images/rene-kuhm.jpg',
      },
      featured: featured || false,
    };

    // Create MDX content
    const mdxContent = matter.stringify(content, frontmatter);

    await writeFile(filePath, mdxContent, 'utf-8');

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
  }
}
