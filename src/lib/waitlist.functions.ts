import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { joinWaitlistInputSchema, isDisposableEmail, normalizeEmail } from "./waitlist.server";

const MAX_ATTEMPTS_PER_WINDOW = 5;
const WINDOW_MINUTES = 15;

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => joinWaitlistInputSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest();
    const clientIp =
      request?.headers.get("cf-connecting-ip") ??
      request?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (data.website && data.website.trim().length > 0) {
      return { ok: false, error: "No pudimos procesar tu solicitud." };
    }

    const email = normalizeEmail(data.email);

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
