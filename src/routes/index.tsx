import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import {
  UserPlus,
  Users,
  Home,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Wallet,
  CheckCircle2,
  Loader2,
  ArrowDown,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import communityImage from "@/assets/vivily-community.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Vivily — Vivienda compartida pensada para familias monoparentales",
      },
      {
        name: "description",
        content:
          "Únete a la lista de espera de Vivily y sé de los primeros en acceder a la app que conecta familias monoparentales para compartir vivienda de forma segura y compatible.",
      },
      {
        property: "og:title",
        content: "Vivily — Vivienda compartida pensada para familias monoparentales",
      },
      {
        property: "og:description",
        content: "Únete a la lista de espera de Vivily y accede antes que nadie.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const emailSchema = z
  .string()
  .trim()
  .min(1, "Escribe tu correo electrónico")
  .email("Ese correo no parece válido")
  .max(255, "El correo es demasiado largo");

const steps = [
  {
    icon: UserPlus,
    bg: "bg-accent",
    title: "Crea tu perfil familiar",
    text: "Cuéntanos sobre tu familia, rutinas y qué buscáis en una convivencia con otra familia monoparental.",
  },
  {
    icon: Users,
    bg: "bg-secondary",
    title: "Encuentra familias compatibles",
    text: "Conecta con otras familias monoparentales que comparten tus valores, ritmo y forma de crianza.",
  },
  {
    icon: Home,
    bg: "bg-muted",
    title: "Busca vivienda juntas",
    text: "Explora hogares, organiza visitas y decide en equipo con otra familia que entienda tu día a día.",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    bg: "bg-accent",
    title: "Seguridad y verificación",
    text: "Perfiles y antecedentes verificados para que compartas tu hogar con otra familia con confianza.",
  },
  {
    icon: Sparkles,
    bg: "bg-secondary",
    title: "Matching pensado para familias",
    text: "Nuestro algoritmo conecta familias monoparentales compatibles en edades, valores y estilo de vida.",
  },
  {
    icon: HeartHandshake,
    bg: "bg-muted",
    title: "Comunidad de apoyo",
    text: "Forma parte de una red de familias monoparentales que se apoyan, comparten y cuidan entre sí.",
  },
  {
    icon: Wallet,
    bg: "bg-accent",
    title: "Ahorro compartiendo vivienda",
    text: "Reduce gastos y accede a mejores hogares repartiendo alquiler, servicios y responsabilidades.",
  },
];

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="grid size-9 place-items-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
        <span className="font-display text-lg font-semibold text-primary">v</span>
      </div>
      <span className="font-display text-lg font-semibold tracking-tight">Vivily</span>
    </div>
  );
}

function scrollToWaitlist() {
  const el = document.getElementById("waitlist");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Correo no válido");
      return;
    }

    setLoading(true);
    const { error: dbError } = await supabase
      .from("waitlist_emails")
      .insert({ email: parsed.data.toLowerCase() });
    setLoading(false);

    if (dbError) {
      if (dbError.code === "23505") {
        setError("Este correo ya está registrado.");
        return;
      }
      toast.error("No pudimos guardar tu correo", {
        description: "Inténtalo de nuevo en unos segundos.",
      });
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-accent p-4 ring-1 ring-primary/15">
        <CheckCircle2 className="size-6 shrink-0 text-primary" aria-hidden />
        <div>
          <p className="font-semibold text-accent-foreground">
            ¡Gracias! Te avisaremos cuando Vivily esté disponible.
          </p>
          <p className="text-[13px] text-muted-foreground">
            Te escribiremos a {email.toLowerCase()}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-4" noValidate>
      <div className="flex flex-col gap-2.5">
        <label htmlFor="waitlist-email" className="sr-only">
          Tu correo electrónico
        </label>
        <input
          id="waitlist-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          className="w-full rounded-full bg-card px-5 py-3.5 text-base text-foreground ring-1 ring-border outline-none transition-shadow placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-base font-bold text-primary-foreground transition-transform duration-200 hover:brightness-105 active:scale-[0.97] disabled:opacity-60"
        >
          {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {loading ? "Guardando…" : "Unirme a la lista de espera"}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-[13px] font-semibold text-destructive" role="alert">
          {error}
        </p>
      )}
      <p className="mt-3 text-[11px] text-muted-foreground">
        Sin spam. Solo tu invitación personal.
      </p>
    </form>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      {/* Manchas de color suaves */}
      <div className="blob pointer-events-none absolute -top-24 -left-16 size-72 rounded-full bg-sky-soft blur-3xl" />
      <div className="blob-alt pointer-events-none absolute top-40 -right-20 size-64 rounded-full bg-sage-soft blur-3xl" />
      <div className="blob pointer-events-none absolute bottom-24 -left-10 size-56 rounded-full bg-sand blur-3xl" />

      <header className="anim-rise relative z-20">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-6">
          <Logo />
          <span className="rounded-full bg-card/60 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-primary ring-1 ring-primary/15 backdrop-blur-md">
            Lista de espera
          </span>
        </div>
      </header>

      <main className="relative z-20">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 pt-10 pb-6 md:pt-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p
                className="anim-rise text-sm font-semibold text-primary"
                style={{ animationDelay: "0.05s" }}
              >
                Vivienda compartida para familias monoparentales
              </p>
              <h1
                className="anim-rise mt-3 max-w-[18ch] font-display text-[2.4rem] leading-[1.05] font-semibold tracking-tight text-balance md:text-6xl"
                style={{ animationDelay: "0.15s" }}
              >
                Vivily — Encuentra otra{" "}
                <span className="text-primary italic">familia monoparental</span> para compartir
                vivienda.
              </h1>
              <p
                className="anim-rise mt-4 max-w-[42ch] text-base text-muted-foreground text-pretty md:text-lg"
                style={{ animationDelay: "0.25s" }}
              >
                Únete a la lista de espera y sé de los primeros en acceder a la app que conecta
                familias monoparentales compatibles para vivir juntas.
              </p>
              <div className="anim-rise mt-6 flex flex-wrap gap-3" style={{ animationDelay: "0.35s" }}>
                <button
                  onClick={scrollToWaitlist}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground transition-transform duration-200 hover:brightness-105 active:scale-[0.97]"
                >
                  Unirme a la lista
                  <ArrowDown className="size-4" aria-hidden />
                </button>
              </div>
            </div>

            <div
              className="anim-rise relative"
              style={{ animationDelay: "0.45s" }}
            >
              <img
                src={communityImage}
                alt="Grupo de personas de diferentes edades disfrutando juntas en un salón luminoso"
                width={1024}
                height={1280}
                loading="eager"
                className="aspect-[4/5] w-full rounded-[28px] object-cover ring-1 ring-border shadow-[0_24px_60px_-30px_oklch(0.52_0.075_160/0.5)]"
              />
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="mx-auto max-w-5xl px-6 pt-12 pb-2">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            Cómo funciona Vivily
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <article
                key={s.title}
                className={`rounded-[24px] ${s.bg} p-6 ring-1 ring-border backdrop-blur-md`}
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-2xl bg-card/60 ring-1 ring-border">
                    <s.icon className="size-5 text-primary" aria-hidden />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Paso {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground text-pretty">{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Beneficios */}
        <section className="mx-auto max-w-5xl px-6 pt-12 pb-2">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            Beneficios de Vivily
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {benefits.map((b) => (
              <article
                key={b.title}
                className={`rounded-[24px] ${b.bg} p-6 ring-1 ring-border backdrop-blur-md`}
              >
                <div className="grid size-11 place-items-center rounded-2xl bg-card/60 ring-1 ring-border">
                  <b.icon className="size-5 text-primary" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground text-pretty">{b.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Waitlist */}
        <section
          id="waitlist"
          className="mx-auto max-w-5xl px-6 pt-12 scroll-mt-24"
        >
          <div className="grid items-start gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-balance md:text-3xl">
                Accede antes que nadie
              </h2>
              <p className="mt-2 text-base text-muted-foreground text-pretty">
                Déjanos tu correo y te avisamos en cuanto Vivily esté disponible para familias
                monoparentales. Los primeros en la lista recibirán acceso prioritario y funciones
                exclusivas.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span>Acceso anticipado a la app.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span>Consejos y recursos para familias monoparentales.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span>Sin spam, solo lo importante.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-[28px] bg-card/60 p-6 shadow-[0_24px_60px_-30px_oklch(0.52_0.075_160/0.5)] ring-1 ring-border backdrop-blur-xl">
              <h3 className="text-sm font-bold">Únete a la waitlist</h3>
              <p className="mt-1 text-[13px] text-muted-foreground text-pretty">
                Completa el formulario y guarda tu lugar.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </section>

        {/* Testimonio */}
        <section className="mx-auto max-w-5xl px-6 pt-12">
          <div className="rounded-[28px] bg-secondary/40 p-8 ring-1 ring-border backdrop-blur-md md:p-10">
            <figure>
              <blockquote className="font-display text-xl font-medium text-pretty md:text-2xl">
                “Vivily me devolvió la ilusión de compartir piso: encontré personas con mi mismo
                ritmo y valores desde el primer día.”
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                Ana R. — beta tester
              </figcaption>
            </figure>
          </div>
        </section>
      </main>

      <footer className="relative z-20 mx-auto max-w-5xl px-6 pt-14 pb-10">
        <div className="flex items-center justify-between">
          <Logo />
          <span className="text-[11px] text-muted-foreground">© 2026 Vivily</span>
        </div>
      </footer>
    </div>
  );
}
