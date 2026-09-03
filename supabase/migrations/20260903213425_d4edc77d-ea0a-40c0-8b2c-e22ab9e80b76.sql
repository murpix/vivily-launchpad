CREATE TABLE public.waitlist_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.waitlist_emails TO anon;
GRANT INSERT ON public.waitlist_emails TO authenticated;
GRANT ALL ON public.waitlist_emails TO service_role;

ALTER TABLE public.waitlist_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the waitlist"
  ON public.waitlist_emails
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "No public reads on waitlist emails"
  ON public.waitlist_emails
  FOR SELECT
  TO anon, authenticated
  USING (false);