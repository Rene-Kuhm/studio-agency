import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de uso de TecnoDespegue. Conocé las reglas y políticas de nuestros servicios.',
};

export default function TermsPage() {
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
              Términos y Condiciones
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
              <h2>1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar el sitio web de TecnoDespegue, aceptás estar sujeto a estos términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, no deberías usar nuestro sitio web.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>2. Servicios</h2>
              <p>
                TecnoDespegue es una agencia digital que ofrece servicios de:
              </p>
              <ul>
                <li>Diseño y desarrollo web</li>
                <li>Branding e identidad visual</li>
                <li>Marketing digital</li>
                <li>Consultoría tecnológica</li>
              </ul>
              <p>
                Los detalles específicos de cada proyecto se acordarán por escrito entre las partes antes de iniciar cualquier trabajo.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>3. Propiedad Intelectual</h2>
              <p>
                Todo el contenido de este sitio web, incluyendo textos, gráficos, logos, imágenes, y software, es propiedad de TecnoDespegue o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.
              </p>
              <p>
                No está permitido reproducir, distribuir, modificar o usar cualquier contenido de este sitio sin autorización previa por escrito.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>4. Uso del Sitio Web</h2>
              <p>
                Te comprometés a utilizar este sitio web solo para fines legales y de manera que no infrinja los derechos de terceros. Está prohibido:
              </p>
              <ul>
                <li>Usar el sitio de manera que pueda dañar, deshabilitar o sobrecargar nuestros servidores</li>
                <li>Intentar acceder sin autorización a cualquier parte del sitio</li>
                <li>Utilizar robots, spiders u otros dispositivos automáticos</li>
                <li>Transmitir virus u otro código malicioso</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>5. Proyectos y Pagos</h2>
              <p>
                Para proyectos contratados:
              </p>
              <ul>
                <li>Los presupuestos son válidos por 30 días desde su emisión</li>
                <li>Se requiere un anticipo del 50% para iniciar cualquier proyecto</li>
                <li>El saldo restante se abona contra entrega del proyecto</li>
                <li>Los cambios fuera del alcance original se cotizarán por separado</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>6. Entrega de Proyectos</h2>
              <p>
                Los plazos de entrega se establecerán en cada propuesta. TecnoDespegue se compromete a:
              </p>
              <ul>
                <li>Comunicar cualquier retraso con anticipación</li>
                <li>Entregar el trabajo según las especificaciones acordadas</li>
                <li>Proporcionar soporte post-lanzamiento según lo acordado</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>7. Garantía y Soporte</h2>
              <p>
                Ofrecemos garantía de 30 días sobre errores o bugs en el código desarrollado. El soporte técnico y mantenimiento posterior se cotiza por separado.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>8. Limitación de Responsabilidad</h2>
              <p>
                TecnoDespegue no será responsable por:
              </p>
              <ul>
                <li>Daños indirectos, incidentales o consecuentes</li>
                <li>Pérdida de datos o interrupción del negocio</li>
                <li>Contenido de terceros enlazado desde nuestro sitio</li>
                <li>Problemas causados por servicios de hosting externos</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>9. Confidencialidad</h2>
              <p>
                Toda información compartida durante la relación comercial se tratará como confidencial. No divulgaremos información de tu proyecto a terceros sin tu consentimiento.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>10. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>11. Ley Aplicable</h2>
              <p>
                Estos términos se rigen por las leyes de la República Argentina. Cualquier disputa será sometida a la jurisdicción de los tribunales competentes de la Ciudad de Buenos Aires.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up">
              <h2>12. Contacto</h2>
              <p>
                Para consultas sobre estos términos, contactanos en:
              </p>
              <ul>
                <li>Email: <a href="mailto:contacto@tecnodespegue.com">contacto@tecnodespegue.com</a></li>
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
