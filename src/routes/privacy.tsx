import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Política de privacidad — Vivily" },
      {
        name: "description",
        content:
          "Política de privacidad de Vivily: cómo recogemos, usamos y protegemos los datos de la lista de espera.",
      },
      {
        property: "og:title",
        content: "Política de privacidad — Vivily",
      },
      {
        property: "og:description",
        content:
          "Cómo usamos y protegemos los datos de la waitlist de Vivily.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <div className="blob pointer-events-none absolute -top-24 -left-16 size-72 rounded-full bg-sky-soft blur-3xl" />
      <div className="blob-alt pointer-events-none absolute top-40 -right-20 size-64 rounded-full bg-sage-soft blur-3xl" />

      <header className="relative z-20 mx-auto flex max-w-3xl items-center justify-between px-6 pt-6">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight">
          Vivily
        </Link>
        <span className="rounded-full bg-card/60 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary ring-1 ring-primary/15 backdrop-blur-md">
          Lista de espera
        </span>
      </header>

      <main className="relative z-20 mx-auto max-w-3xl px-6 pt-10 pb-16 md:pt-16">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Política de privacidad
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última actualización: 7 de septiembre de 2026.
        </p>

        <div className="mt-8 space-y-8 text-base leading-relaxed text-foreground">
          <section>
            <h2 className="font-display text-xl font-semibold">1. Responsable del tratamiento</h2>
            <p className="mt-2 text-muted-foreground">
              Vivily es responsable del tratamiento de los datos personales recogidos a través de
              esta página web y de la lista de espera.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">2. Datos que recogemos</h2>
            <p className="mt-2 text-muted-foreground">
              En la waitlist únicamente recogemos tu dirección de correo electrónico. No solicitamos
              nombre, dirección postal, documento de identidad ni ningún otro dato personal para
              unirte a la lista.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">3. Finalidad del tratamiento</h2>
            <p className="mt-2 text-muted-foreground">
              Usamos tu correo electrónico exclusivamente para:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Avistarte cuando Vivily esté disponible.</li>
              <li>Enviarte actualizaciones sobre el lanzamiento y funciones exclusivas.</li>
              <li>Compartir consejos y recursos útiles para familias monoparentales.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">4. Base jurídica</h2>
            <p className="mt-2 text-muted-foreground">
              El tratamiento se basa en tu consentimiento, que nos das al introducir tu correo y
              pulsar “Unirme a la lista de espera”. Puedes retirarlo en cualquier momento.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">5. Conservación</h2>
            <p className="mt-2 text-muted-foreground">
              Conservamos tu correo mientras Vivily esté en fase de lista de espera y, posteriormente,
              hasta que nos solicites su eliminación o dejes de usar la app.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">6. Seguridad</h2>
            <p className="mt-2 text-muted-foreground">
              Tu correo se almacena en nuestra base de datos con acceso restringido y protegido por
              medidas técnicas y organizativas. Solo el equipo de Vivily puede consultarlo para los
              fines indicados.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">7. Tus derechos</h2>
            <p className="mt-2 text-muted-foreground">
              Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición,
              limitación del tratamiento y portabilidad escribiéndonos a nuestro correo de contacto.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">8. Cambios en esta política</h2>
            <p className="mt-2 text-muted-foreground">
              Podemos actualizar esta política para adaptarla a cambios legales o en nuestros
              servicios. Te avisaremos si los cambios son significativos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">9. Contacto</h2>
            <p className="mt-2 text-muted-foreground">
              Si tienes dudas sobre esta política o sobre tus datos, escríbenos a{" "}
              <a
                href="mailto:hola@vivily.app"
                className="text-primary underline underline-offset-2 hover:text-primary/80"
              >
                hola@vivily.app
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground transition-transform duration-200 hover:brightness-105 active:scale-[0.97]"
          >
            Volver a la landing
          </Link>
        </div>
      </main>

      <footer className="relative z-20 mx-auto max-w-3xl px-6 pb-10">
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-6 md:flex-row">
          <span className="font-display text-lg font-semibold tracking-tight">Vivily</span>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Inicio
            </Link>
            <Link to="/privacy" className="hover:text-foreground">
              Privacidad
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Términos
            </Link>
          </div>
          <span className="text-[11px] text-muted-foreground">© 2026 Vivily</span>
        </div>
      </footer>
    </div>
  );
}
