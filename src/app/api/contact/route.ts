import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import { isRateLimited } from '@/lib/rate-limit';
import { isValidOrigin } from '@/lib/csrf';
import { logger } from '@/lib/logger';

// Lazy initialization to avoid build-time errors
const getResend = () => {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
};

// Simple honeypot check
function isSpam(data: { website?: string }): boolean {
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
    // Validate origin (CSRF protection)
    if (!isValidOrigin(request)) {
      return NextResponse.json(
        { error: 'Solicitud no autorizada.' },
        { status: 403 }
      );
    }

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    if (await isRateLimited(`contact:${ip}`)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Por favor, esperá un momento.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, company, service, budget, message, website } = body;

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
      company: company ? sanitize(company) : null,
      service: service ? sanitize(service) : null,
      budget: budget ? sanitize(budget) : null,
      message: sanitize(message),
      ip: ip,
    };

    // Save to database if available
    if (process.env.DATABASE_URL) {
      await prisma.contactMessage.create({
        data: sanitizedData,
      });
    }

    // Log the contact
    logger.formSubmission('contact', {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
    });

    // Send email notification with Resend
    const resend = getResend();
    if (resend) {
      await resend.emails.send({
        from: 'TecnoDespegue <no-reply@tecnodespegue.com>',
        to: 'contacto@tecnodespegue.com',
        subject: `Nuevo mensaje de ${sanitizedData.name}`,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Empresa:</strong> ${sanitizedData.company || 'No especificada'}</p>
          <p><strong>Servicio:</strong> ${sanitizedData.service || 'No especificado'}</p>
          <p><strong>Presupuesto:</strong> ${sanitizedData.budget || 'No especificado'}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${sanitizedData.message}</p>
          <hr>
          <p><small>Enviado el ${new Date().toISOString()}</small></p>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: '¡Gracias por tu mensaje! Te responderemos pronto.',
    });
  } catch (error) {
    logger.error('Contact form error', error);
    return NextResponse.json(
      { error: 'Ocurrió un error al enviar el mensaje. Por favor, intentá de nuevo.' },
      { status: 500 }
    );
  }
}
