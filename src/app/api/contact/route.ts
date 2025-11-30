import { NextRequest, NextResponse } from 'next/server';

// Rate limiting map (in production, use Redis or similar)
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // 3 requests per minute

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

// Simple honeypot check
function isSpam(data: { website?: string }): boolean {
  // If honeypot field is filled, it's likely spam
  return !!data.website;
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize input to prevent XSS
function sanitize(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor, esperá un momento.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, company, message, website } = body;

    // Check honeypot (spam protection)
    if (isSpam({ website })) {
      // Silently reject spam
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Por favor, completá todos los campos requeridos.' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Por favor, ingresá un email válido.' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'El mensaje debe tener al menos 10 caracteres.' },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'El mensaje es demasiado largo (máximo 5000 caracteres).' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      company: company ? sanitize(company) : '',
      message: sanitize(message),
      timestamp: new Date().toISOString(),
      ip: ip,
    };

    // Log the contact (in production, send email or save to database)
    console.log('📧 New contact form submission:', sanitizedData);

    // Here you would typically:
    // 1. Send an email notification (using Resend, SendGrid, etc.)
    // 2. Save to database
    // 3. Add to CRM
    // 4. Send confirmation email to user

    // Example with Resend (uncomment and configure when ready):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'TecnoDespegue <no-reply@tecnodespegue.com>',
      to: 'hola@tecnodespegue.com',
      subject: `Nuevo mensaje de ${sanitizedData.name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Empresa:</strong> ${sanitizedData.company || 'No especificada'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${sanitizedData.message}</p>
        <hr>
        <p><small>Enviado el ${sanitizedData.timestamp}</small></p>
      `,
    });
    */

    return NextResponse.json({
      success: true,
      message: '¡Gracias por tu mensaje! Te responderemos pronto.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Ocurrió un error al enviar el mensaje. Por favor, intentá de nuevo.' },
      { status: 500 }
    );
  }
}
