import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de TecnoDespegue. Conocé cómo recopilamos, usamos y protegemos tu información.',
};

export default function PrivacyPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Legal
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Política de Privacidad
            </h1>
            <p className="mt-4 text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto prose prose-lg prose-neutral dark:prose-invert">
            <ScrollReveal animation="fade-up">
              <h2>1. Información que Recopilamos</h2>
              <p>
                En TecnoDespegue, recopilamos información que nos proporcionás directamente cuando:
              </p>
              <ul>
                <li>Completás nuestro formulario de contacto</li>
                <li>Te suscribís a nuestro newsletter</li>
                <li>Nos enviás un correo electrónico</li>
                <li>Interactuás con nuestro sitio web</li>
              </ul>
              <p>
                La información puede incluir: nombre, dirección de correo electrónico, número de teléfono, nombre de la empresa y cualquier otra información que elijas proporcionar.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>2. Uso de la Información</h2>
              <p>
                Utilizamos la información recopilada para:
              </p>
              <ul>
                <li>Responder a tus consultas y solicitudes</li>
                <li>Enviar comunicaciones de marketing (si diste tu consentimiento)</li>
                <li>Mejorar nuestros servicios y sitio web</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>3. Protección de Datos</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>4. Compartir Información</h2>
              <p>
                No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto:
              </p>
              <ul>
                <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio</li>
                <li>Cuando sea requerido por ley</li>
                <li>Para proteger nuestros derechos legales</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>5. Cookies y Tecnologías Similares</h2>
              <p>
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web. Podés configurar tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>6. Tus Derechos</h2>
              <p>
                Tenés derecho a:
              </p>
              <ul>
                <li>Acceder a tu información personal</li>
                <li>Solicitar la corrección de datos inexactos</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerte al procesamiento de tus datos</li>
                <li>Retirar tu consentimiento en cualquier momento</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>7. Retención de Datos</h2>
              <p>
                Conservamos tu información personal solo durante el tiempo necesario para cumplir con los fines para los que fue recopilada, incluyendo cualquier requisito legal o contable.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>8. Cambios en esta Política</h2>
              <p>
                Podemos actualizar esta política de privacidad periódicamente. Te notificaremos sobre cambios significativos publicando la nueva política en esta página.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>9. Contacto</h2>
              <p>
                Si tenés preguntas sobre esta política de privacidad o sobre cómo manejamos tu información, podés contactarnos en:
              </p>
              <ul>
                <li>Email: <a href="mailto:hola@tecnodespegue.com">hola@tecnodespegue.com</a></li>
              </ul>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <div className="mt-12 pt-8 border-t border-border not-prose">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Volver al inicio
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
