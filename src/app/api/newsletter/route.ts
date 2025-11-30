import { NextRequest, NextResponse } from 'next/server';

// Rate limiting map
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// In-memory storage for newsletter subscribers (use database in production)
const subscribers = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor, esperá un momento.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'El email es requerido.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Por favor, ingresá un email válido.' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    if (subscribers.has(email.toLowerCase())) {
      return NextResponse.json(
        { error: 'Este email ya está suscrito.' },
        { status: 400 }
      );
    }

    // Add to subscribers
    subscribers.add(email.toLowerCase());

    // Log the subscription
    console.log('📬 New newsletter subscription:', {
      email: email.toLowerCase(),
      timestamp: new Date().toISOString(),
      ip,
    });

    // In production, you would:
    // 1. Save to database
    // 2. Add to email service (Mailchimp, ConvertKit, Resend, etc.)
    // 3. Send confirmation email

    /*
    // Example with Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'TecnoDespegue <newsletter@tecnodespegue.com>',
      to: email,
      subject: '¡Bienvenido al newsletter de TecnoDespegue!',
      html: `
        <h2>¡Gracias por suscribirte!</h2>
        <p>A partir de ahora recibirás las últimas novedades sobre diseño, desarrollo y tendencias digitales.</p>
        <p>¡Nos vemos pronto!</p>
        <p>El equipo de TecnoDespegue</p>
      `,
    });
    */

    return NextResponse.json({
      success: true,
      message: '¡Gracias por suscribirte! Pronto recibirás nuestras novedades.',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error. Por favor, intentá de nuevo.' },
      { status: 500 }
    );
  }
}
