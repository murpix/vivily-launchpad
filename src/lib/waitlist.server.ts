import { z } from "zod";

export const joinWaitlistInputSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Escribe tu correo electrónico")
    .email("Ese correo no parece válido. Comprueba que esté bien escrito.")
    .max(255, "El correo es demasiado largo"),
  // Honeypot field: should remain empty. Bots often fill hidden fields.
  website: z.string().max(100).optional(),
});

export type JoinWaitlistInput = z.infer<typeof joinWaitlistInputSchema>;

const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com",
  "tempmail.com",
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.de",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamail.biz",
  "sharklasers.com",
  "throwawaymail.com",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "temp-mail.org",
  "fakeemail.net",
  "getairmail.com",
  "burnermail.io",
  "tempail.com",
  "mailnesia.com",
  "mailcatch.com",
  "trashmail.com",
  "trashmail.se",
  "trashmail.de",
  "emailondeck.com",
  "dispostable.com",
  "mailforspam.com",
  "maildrop.cc",
  "getnada.com",
  "inboxkitten.com",
  "tempmailbox.us",
  "tempmails.io",
  "smailpro.com",
  "anonmails.de",
  "wegwerfmail.de",
  "wegwerfmail.net",
  "wegwerfmail.org",
  "1secmail.com",
  "1secmail.org",
  "1secmail.net",
  "esiix.com",
  "txcct.com",
  "vjuum.com",
  "lroid.com",
  "kpooa.com",
  "cdfaq.com",
  "itymail.com",
  "laafd.com",
  "rungel.net",
  "bheps.com",
  "cazlg.com",
  "cazlv.com",
  "qocya.com",
  "jolyg.com",
  "zvvz.ru",
]);

export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  if (DISPOSABLE_DOMAINS.has(domain)) return true;
  // Also block subdomains of known disposable providers.
  for (const disposable of DISPOSABLE_DOMAINS) {
    if (domain === disposable || domain.endsWith(`.${disposable}`)) return true;
  }
  return false;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
