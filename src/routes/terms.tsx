import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Términos y condiciones — Vivily" },
      {
        name: "description",
        content:
          "Términos y condiciones de uso de Vivily y de la lista de espera.",
      },
      {
        property: "og:title",
        content: "Términos y condiciones — Vivily",
      },
      {
        property: "og:description",
        content: "Condiciones de uso de Vivily y la lista de espera.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
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
          Términos y condiciones
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última actualización: 9 de septiembre de 2026.
        </p>

        <div className="mt-8 space-y-8 text-base leading-relaxed text-foreground">
          <section>
            <h2 className="font-display text-xl font-semibold">1. ¿Qué es Vivily?</h2>
            <p className="mt-2 text-muted-foreground">
              Vivily es una plataforma digital que facilita el encuentro entre familias
              monoparentales interesadas en compartir vivienda. No somos una inmobiliaria, ni
              gestionamos alquileres, ni garantizamos el acceso a una vivienda concreta.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">2. Servicio gratuito y libre acceso</h2>
            <p className="mt-2 text-muted-foreground">
              Unirse a la lista de espera y usar las funciones principales de Vivily será
              gratuito. El acceso será libre para las familias monoparentales que cumplan los
              requisitos de verificación y convivencia de la plataforma.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">3. Público objetivo</h2>
            <p className="mt-2 text-muted-foreground">
              En esta primera fase, Vivily está pensada para familias monoparentales. Hemos
              elegido este sector porque es el que más urge de soluciones habitacionales
              compartidas y de apoyo mutuo. Con el tiempo ampliaremos la app a otros
              perfiles y sectores que también busquen compartir vivienda de forma segura.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">4. No garantizamos una vivienda</h2>
            <p className="mt-2 text-muted-foreground">
              Vivily no asegura que encontrarás una vivienda. Somos un medio que te facilita
              conocer a otra familia monoparental que está en tu misma situación y busca los
              mismos intereses. Compartir piso entre dos personas o familias puede facilitar el
              acceso a una vivienda, pero la búsqueda, la decisión final y cualquier contrato
              son responsabilidad de las partes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">5. Ventajas de unirse antes</h2>
            <p className="mt-2 text-muted-foreground">
              Las primeras personas que confíen en Vivily serán las primeras en acceder a las
              novedades que implementemos y contarán con soporte prioritario durante el
              lanzamiento y las fases iniciales.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">6. Uso responsable</h2>
            <p className="mt-2 text-muted-foreground">
              Al usar Vivily te comprometes a proporcionar información veraz, respetar a las
              demás familias y no utilizar la plataforma para fines ilegales, abusivos o
              comerciales no autorizados.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">7. Verificación y seguridad</h2>
            <p className="mt-2 text-muted-foreground">
              Implementaremos procesos de verificación para aumentar la confianza entre
              familias. Sin embargo, cada usuario es responsable de tomar las precauciones
              necesarias antes de compartir datos personales o tomar decisiones de convivencia.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">8. Cambios en el servicio</h2>
            <p className="mt-2 text-muted-foreground">
              Vivily está en desarrollo. Podemos modificar funciones, añadir planes o ajustar
              estos términos. Te avisaremos de cambios importantes y seguiremos respetando los
              derechos adquiridos durante la lista de espera.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">9. Contacto</h2>
            <p className="mt-2 text-muted-foreground">
              Si tienes dudas sobre estos términos, escríbenos a{" "}
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
