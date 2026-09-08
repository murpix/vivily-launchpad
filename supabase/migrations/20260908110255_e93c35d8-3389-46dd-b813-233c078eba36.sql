CREATE TABLE public.waitlist_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip text,
  email text,
  attempted_at timestamp with time zone NOT NULL DEFAULT now(),
  blocked boolean NOT NULL DEFAULT false
);

GRANT ALL ON public.waitlist_attempts TO service_role;

ALTER TABLE public.waitlist_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to waitlist_attempts" ON public.waitlist_attempts
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);