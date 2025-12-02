import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { writeFile, readdir, stat, unlink, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'video/mp4',
  'video/webm',
  'audio/mpeg',
  'audio/wav',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('admin_auth');
  return authToken?.value === 'authenticated';
}

async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// GET - List all files
export async function GET() {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    await ensureUploadDir();

    const fileNames = await readdir(UPLOAD_DIR);
    const files = await Promise.all(
      fileNames
        .filter((name) => !name.startsWith('.'))
        .map(async (name) => {
          const filePath = join(UPLOAD_DIR, name);
          const stats = await stat(filePath);
          const ext = name.split('.').pop()?.toLowerCase() || '';

          // Determine MIME type based on extension
          const typeMap: Record<string, string> = {
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
            gif: 'image/gif',
            webp: 'image/webp',
            svg: 'image/svg+xml',
            mp4: 'video/mp4',
            webm: 'video/webm',
            mp3: 'audio/mpeg',
            wav: 'audio/wav',
            pdf: 'application/pdf',
            doc: 'application/msword',
            docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          };

          return {
            name,
            path: `/uploads/${name}`,
            url: `/uploads/${name}`,
            size: stats.size,
            type: typeMap[ext] || 'application/octet-stream',
            createdAt: stats.birthtime.toISOString(),
          };
        })
    );

    // Sort by creation date (newest first)
    files.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Error al listar archivos' }, { status: 500 });
  }
}

// POST - Upload file
export async function POST(request: NextRequest) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    await ensureUploadDir();

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó archivo' }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'El archivo excede el tamaño máximo (10MB)' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Tipo de archivo no permitido' }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${timestamp}-${originalName}`;
    const filePath = join(UPLOAD_DIR, fileName);

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      file: {
        name: fileName,
        path: `/uploads/${fileName}`,
        url: `/uploads/${fileName}`,
        size: file.size,
        type: file.type,
      },
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Error al subir archivo' }, { status: 500 });
  }
}

// DELETE - Delete file
export async function DELETE(request: NextRequest) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'No se proporcionó nombre de archivo' }, { status: 400 });
    }

    // Sanitize filename to prevent path traversal
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = join(UPLOAD_DIR, sanitizedFilename);

    // Check if file exists and is within upload directory
    if (!filePath.startsWith(UPLOAD_DIR)) {
      return NextResponse.json({ error: 'Ruta de archivo inválida' }, { status: 400 });
    }

    if (!existsSync(filePath)) {
      return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 });
    }

    await unlink(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Error al eliminar archivo' }, { status: 500 });
  }
}
