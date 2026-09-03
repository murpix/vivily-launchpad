import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Leaf, Heart, Layers, CheckCircle2, Loader2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import calmImage from "@/assets/vivily-calm.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vivily — Bienestar, sin fricción" },
      {
        name: "description",
        content:
          "Vivily ordena tus hábitos, respiraciones y pausas en una sola app. Deja tu correo y accede antes que nadie.",
      },
      { property: "og:title", content: "Vivily — Bienestar, sin fricción" },
      {
        property: "og:description",
        content: "Tu día con más calma y menos ruido. Únete a la waitlist de Vivily.",
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

const features = [
  {
    icon: Leaf,
    bg: "bg-accent",
    title: "Rituales que encajan",
    text: "Micro-sesiones de 3 minutos que se adaptan a tu agenda real.",
  },
  {
    icon: Heart,
    bg: "bg-secondary",
    title: "Ritmo, no presión",
    text: "Progreso sin culpa: Vivily celebra los pequeños pasos de cada día.",
  },
  {
    icon: Layers,
    bg: "bg-muted",
    title: "Todo en un lugar",
    text: "Hábitos, respiración y pausas reunidos en una superficie serena.",
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
      .from("waitlist")
      .insert({ email: parsed.data.toLowerCase() });
    setLoading(false);

    if (dbError) {
      if (dbError.code === "23505") {
        setDone(true);
        toast.info("Este correo ya está en la lista", {
          description: "Te avisaremos cuando lancemos Vivily.",
        });
        return;
      }
      toast.error("No pudimos guardar tu correo", {
        description: "Inténtalo de nuevo en unos segundos.",
      });
      return;
    }

    setDone(true);
    toast.success("¡Estás dentro!", {
      description: "Te avisaremos el día del lanzamiento.",
    });
  }

  if (done) {
    return (
      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-accent p-4 ring-1 ring-primary/15">
        <CheckCircle2 className="size-6 shrink-0 text-primary" aria-hidden />
        <div>
          <p className="font-semibold text-accent-foreground">¡Listo! Ya estás en la lista.</p>
          <p className="text-[13px] text-muted-foreground">
            Te escribiremos a {email.toLowerCase()} cuando abramos puertas.
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
          {loading ? "Guardando…" : "Unirme a la lista"}
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
            Próximamente
          </span>
        </div>
      </header>

      <main className="relative z-20">
        {/* Hero + waitlist */}
        <section className="mx-auto max-w-5xl px-6 pt-10 pb-6 md:pt-20">
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div>
              <p className="anim-rise text-sm font-semibold text-primary" style={{ animationDelay: "0.05s" }}>
                Bienestar, sin fricción
              </p>
              <h1
                className="anim-rise mt-3 max-w-[20ch] font-display text-[2.4rem] leading-[1.05] font-semibold tracking-tight text-balance md:text-6xl"
                style={{ animationDelay: "0.15s" }}
              >
                Tu día con <span className="text-primary italic">más calma</span> y menos ruido.
              </h1>
              <p
                className="anim-rise mt-4 max-w-[42ch] text-base text-muted-foreground text-pretty md:text-lg"
                style={{ animationDelay: "0.25s" }}
              >
                Vivily ordena tus hábitos, respiraciones y pausas en una sola superficie suave
                para que llegues al fin del día con energía, no con desgaste.
              </p>
            </div>

            <div
              className="anim-rise rounded-[28px] bg-card/60 p-6 shadow-[0_24px_60px_-30px_oklch(0.52_0.075_160/0.5)] ring-1 ring-border backdrop-blur-xl"
              style={{ animationDelay: "0.35s" }}
            >
              <h2 className="text-sm font-bold">Accede antes que nadie</h2>
              <p className="mt-1 text-[13px] text-muted-foreground text-pretty">
                Deja tu correo y te avisamos el día del lanzamiento.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-5xl px-6 pt-12 pb-2">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            Hecho para sentirte mejor
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {features.map((f) => (
              <article
                key={f.title}
                className={`rounded-[24px] ${f.bg} p-6 ring-1 ring-border backdrop-blur-md`}
              >
                <div className="grid size-11 place-items-center rounded-2xl bg-card/60 ring-1 ring-border">
                  <f.icon className="size-5 text-primary" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground text-pretty">{f.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Imagen + testimonio */}
        <section className="mx-auto max-w-5xl px-6 pt-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <img
              src={calmImage}
              alt="Persona respirando con calma en una habitación luminosa"
              width={1024}
              height={1280}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[28px] object-cover ring-1 ring-border"
            />
            <figure>
              <blockquote className="font-display text-xl font-medium text-pretty md:text-2xl">
                “Por primera vez, mi descanso no se siente como una tarea.”
              </blockquote>
              <figcaption className="mt-3 text-sm text-muted-foreground">
                Lucía M. — beta tester
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
