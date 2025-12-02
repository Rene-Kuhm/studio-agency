import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const DATA_DIR = join(process.cwd(), 'data');
const SETTINGS_FILE = join(DATA_DIR, 'settings.json');

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialFacebook: string;
  socialTwitter: string;
  socialInstagram: string;
  socialLinkedin: string;
  socialGithub: string;
  analyticsId: string;
  maintenanceMode: boolean;
}

const defaultSettings: SiteSettings = {
  siteName: 'TecnoDespegue',
  siteDescription: 'Agencia Digital - Soluciones web innovadoras',
  siteUrl: 'https://tecnodespegue.com',
  contactEmail: 'info@tecnodespegue.com',
  contactPhone: '+54 2334 409-838',
  contactAddress: 'Eduardo Castex, La Pampa, Argentina',
  socialFacebook: '',
  socialTwitter: '',
  socialInstagram: '',
  socialLinkedin: '',
  socialGithub: 'https://github.com/Rene-Kuhm',
  analyticsId: '',
  maintenanceMode: false,
};

async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('admin_auth');
  return authToken?.value === 'authenticated';
}

async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

async function getSettings(): Promise<SiteSettings> {
  try {
    await ensureDataDir();

    if (!existsSync(SETTINGS_FILE)) {
      await writeFile(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2));
      return defaultSettings;
    }

    const data = await readFile(SETTINGS_FILE, 'utf-8');
    return { ...defaultSettings, ...JSON.parse(data) };
  } catch (error) {
    console.error('Error reading settings:', error);
    return defaultSettings;
  }
}

async function saveSettings(settings: SiteSettings): Promise<void> {
  await ensureDataDir();
  await writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2));
}

// GET - Get settings
export async function GET() {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const settings = await getSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Error al obtener configuracion' }, { status: 500 });
  }
}

// POST - Save settings
export async function POST(request: NextRequest) {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['siteName', 'siteUrl'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `El campo ${field} es requerido` },
          { status: 400 }
        );
      }
    }

    // Sanitize and validate URLs
    const urlFields = ['siteUrl', 'socialFacebook', 'socialTwitter', 'socialInstagram', 'socialLinkedin', 'socialGithub'];
    for (const field of urlFields) {
      if (body[field] && body[field].trim() !== '') {
        try {
          new URL(body[field]);
        } catch {
          return NextResponse.json(
            { error: `URL invalida en ${field}` },
            { status: 400 }
          );
        }
      }
    }

    // Validate email
    if (body.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.contactEmail)) {
      return NextResponse.json({ error: 'Email invalido' }, { status: 400 });
    }

    const settings: SiteSettings = {
      siteName: body.siteName?.trim() || defaultSettings.siteName,
      siteDescription: body.siteDescription?.trim() || '',
      siteUrl: body.siteUrl?.trim() || defaultSettings.siteUrl,
      contactEmail: body.contactEmail?.trim() || '',
      contactPhone: body.contactPhone?.trim() || '',
      contactAddress: body.contactAddress?.trim() || '',
      socialFacebook: body.socialFacebook?.trim() || '',
      socialTwitter: body.socialTwitter?.trim() || '',
      socialInstagram: body.socialInstagram?.trim() || '',
      socialLinkedin: body.socialLinkedin?.trim() || '',
      socialGithub: body.socialGithub?.trim() || '',
      analyticsId: body.analyticsId?.trim() || '',
      maintenanceMode: Boolean(body.maintenanceMode),
    };

    await saveSettings(settings);

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ error: 'Error al guardar configuracion' }, { status: 500 });
  }
}
