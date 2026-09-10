import { useState, useEffect, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
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
  ChevronDown,
} from "lucide-react";

import { joinWaitlist } from "@/lib/waitlist.functions";
import carouselImage1 from "@/assets/vivily-carousel-1.jpg";
import carouselImage2 from "@/assets/vivily-carousel-2.jpg";
import carouselImage3 from "@/assets/vivily-carousel-3.jpg";
import carouselImage4 from "@/assets/vivily-carousel-4.jpg";

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

const faqs = [
  {
    question: "¿Será de pago algo para los usuarios?",
    answer:
      "No. Todo será gratuito y el acceso será libre. Unirse a la lista de espera y usar las funciones principales de Vivily no tendrá coste.",
  },
  {
    question: "¿Por qué solo familias monoparentales?",
    answer:
      "Porque el objetivo principal al principio es este sector, que urge de un lugar seguro y de apoyo. A lo largo del tiempo ampliaremos la app para incluir a más perfiles que busquen compartir vivienda.",
  },
  {
    question: "¿Me aseguráis una vivienda?",
    answer:
      "No te aseguramos una vivienda. Solo somos un medio que te facilita encontrar un compañero de piso que está en tu misma situación y busca los mismos intereses. Eso facilita el acceso a una vivienda al ser dos personas, pero la decisión final es vuestra.",
  },
  {
    question: "¿Hay alguna ventaja por unirme antes?",
    answer:
      "Sí. Las primeras personas que confíen en el proyecto serán las primeras en acceder a todo lo nuevo que implementemos y contarán con soporte prioritario.",
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

const carouselImages = [
  {
    src: carouselImage1,
    alt: "Madre soltera riendo con sus dos hijos en el sofá de casa",
  },
  {
    src: carouselImage2,
    alt: "Dos familias monoparentales compartiendo una comida en una cocina luminosa",
  },
  {
    src: carouselImage3,
    alt: "Padre soltero jugando con su hija pequeña en el salón",
  },
  {
    src: carouselImage4,
    alt: "Madres monoparentales ayudando a sus hijos con los deberes juntas",
  },
];

function ImageCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="anim-rise relative w-full" style={{ animationDelay: "0.45s" }}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] ring-1 ring-border shadow-[0_24px_60px_-30px_oklch(0.52_0.075_160/0.5)]">
        {carouselImages.map((img, i) => (
          <img
            key={img.alt}
            src={img.src}
            alt={img.alt}
            width={1024}
            height={1280}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {carouselImages.map((img, i) => (
          <button
            key={img.alt}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ver imagen ${i + 1} de ${carouselImages.length}`}
            aria-current={i === index}
            className={`size-2.5 rounded-full transition-colors ${
              i === index ? "bg-primary" : "bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const submit = useServerFn(joinWaitlist);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await submit({ data: { email, website: honeypot } });
    setLoading(false);

    if (!result.ok) {
      setError(result.error ?? "No pudimos guardar tu correo. Inténtalo de nuevo.");
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
        {/* Honeypot: hidden from real users, bots often fill this field. */}
        <input
          id="website"
          name="website"
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute h-0 w-0 opacity-0"
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

function FaqAccordion() {
  const [open, setOpen] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className="mt-6 grid gap-3">
      {faqs.map((item, index) => {
        const isOpen = open.has(index);
        return (
          <article
            key={item.question}
            className="rounded-[24px] bg-card/60 ring-1 ring-border backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 p-6 text-left"
            >
              <h3 className="font-display text-lg font-semibold">{item.question}</h3>
              <ChevronDown
                className={`size-5 shrink-0 text-primary transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="px-6 pb-6 text-sm text-muted-foreground text-pretty">
                {item.answer}
              </p>
            </div>
          </article>
        );
      })}
    </div>
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

            <ImageCarousel />
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

        {/* Preguntas frecuentes */}
        <section className="mx-auto max-w-5xl px-6 pt-12 pb-2">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-balance md:text-3xl">
            Preguntas frecuentes
          </h2>
          <FaqAccordion />
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

      </main>

      <footer className="relative z-20 mx-auto max-w-5xl px-6 pt-14 pb-10">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <Logo />
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
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
