import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { joinWaitlistInputSchema, isDisposableEmail, normalizeEmail } from "./waitlist.server";

const MAX_ATTEMPTS_PER_WINDOW = 5;
const MAX_GLOBAL_ATTEMPTS_PER_WINDOW = 120;
const WINDOW_MINUTES = 15;

// Store a one-way hash of the IP so raw addresses never land in the database.
async function hashIp(ip: string): Promise<string> {
  const pepper = process.env["LOVABLE_CRON_SECRET"] ?? "vivily-waitlist";
  const bytes = new TextEncoder().encode(`${pepper}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    // Accept the raw shape so the handler can return friendly validation errors.
    if (typeof data !== "object" || data === null) throw new Error("Invalid input");
    const { email, website } = data as Record<string, unknown>;
    return { email: String(email ?? ""), website: String(website ?? "") };
  })
  .handler(async ({ data }) => {
    const parsed = joinWaitlistInputSchema.safeParse(data);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return { ok: false, error: issue?.message ?? "Correo no válido" };
    }

    const { email: rawEmail, website } = parsed.data;
    const request = getRequest();
    const clientIp =
      request?.headers.get("cf-connecting-ip") ??
      request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (website && website.trim().length > 0) {
      return { ok: false, error: "No pudimos procesar tu solicitud." };
    }

    const email = normalizeEmail(rawEmail);

    if (isDisposableEmail(email)) {
      return { ok: false, error: "No permitimos correos temporales. Usa tu correo personal." };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Rate limit: count recent attempts from this IP.
    const { count, error: countError } = await supabaseAdmin
      .from("waitlist_attempts")
      .select("*", { count: "exact", head: true })
      .eq("ip", clientIp)
      .gte("attempted_at", new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString());

    if (countError) {
      console.error("Rate limit check failed:", countError);
      return { ok: false, error: "No pudimos procesar tu solicitud. Inténtalo de nuevo." };
    }

    if ((count ?? 0) >= MAX_ATTEMPTS_PER_WINDOW) {
      await supabaseAdmin.from("waitlist_attempts").insert({ ip: clientIp, email, blocked: true });
      return { ok: false, error: "Has intentado demasiadas veces. Espera unos minutos." };
    }

    // Record this attempt before trying the insert.
    const { error: attemptError } = await supabaseAdmin
      .from("waitlist_attempts")
      .insert({ ip: clientIp, email, blocked: false });

    if (attemptError) {
      console.error("Failed to record waitlist attempt:", attemptError);
    }

    const { error: dbError } = await supabaseAdmin
      .from("waitlist_emails")
      .insert({ email });

    if (dbError) {
      if (dbError.code === "23505") {
        return { ok: false, error: "Este correo ya está registrado." };
      }
      console.error("Waitlist insert failed:", dbError);
      return { ok: false, error: "No pudimos guardar tu correo. Inténtalo de nuevo en unos segundos." };
    }

    return { ok: true, email };
  });
