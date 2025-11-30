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

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Fallback in-memory storage (used when DB is unavailable)
const memorySubscribers = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    // Validate origin (CSRF protection)
    if (!isValidOrigin(request)) {
      return NextResponse.json(
        { error: 'Solicitud no autorizada.' },
        { status: 403 }
      );
    }

    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    if (await isRateLimited(`newsletter:${ip}`)) {
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

    const normalizedEmail = email.toLowerCase();

    // Check if already subscribed (DB or memory fallback)
    if (process.env.DATABASE_URL) {
      const existing = await prisma.subscriber.findUnique({
        where: { email: normalizedEmail },
      });

      if (existing) {
        if (existing.active) {
          return NextResponse.json(
            { error: 'Este email ya está suscrito.' },
            { status: 400 }
          );
        }
        // Reactivate if previously unsubscribed
        await prisma.subscriber.update({
          where: { email: normalizedEmail },
          data: { active: true },
        });
      } else {
        // Create new subscriber
        await prisma.subscriber.create({
          data: { email: normalizedEmail },
        });
      }
    } else {
      // Fallback to memory
      if (memorySubscribers.has(normalizedEmail)) {
        return NextResponse.json(
          { error: 'Este email ya está suscrito.' },
          { status: 400 }
        );
      }
      memorySubscribers.add(normalizedEmail);
    }

    // Log the subscription
    logger.formSubmission('newsletter', {
      email: normalizedEmail,
      timestamp: new Date().toISOString(),
    });

    // Send welcome email with Resend
    const resend = getResend();
    if (resend) {
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
    }

    return NextResponse.json({
      success: true,
      message: '¡Gracias por suscribirte! Pronto recibirás nuestras novedades.',
    });
  } catch (error) {
    logger.error('Newsletter subscription error', error);
    return NextResponse.json(
      { error: 'Ocurrió un error. Por favor, intentá de nuevo.' },
      { status: 500 }
    );
  }
}
