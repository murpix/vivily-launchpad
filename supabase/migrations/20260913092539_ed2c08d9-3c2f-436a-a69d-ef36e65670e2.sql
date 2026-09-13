-- Remove anon direct-insert path: all writes must go through the protected server function (service_role).
DROP POLICY IF EXISTS "Anyone can join the waitlist" ON public.waitlist_emails;
REVOKE INSERT, UPDATE, DELETE, SELECT ON public.waitlist_emails FROM anon, authenticated;
GRANT ALL ON public.waitlist_emails TO service_role;

-- Legacy unused table with an open anon-insert policy.
DROP TABLE IF EXISTS public.waitlist;

-- Attempts table stays server-only.
REVOKE ALL ON public.waitlist_attempts FROM anon, authenticated;
GRANT ALL ON public.waitlist_attempts TO service_role;

CREATE INDEX IF NOT EXISTS waitlist_attempts_ip_time_idx ON public.waitlist_attempts (ip, attempted_at DESC);
CREATE INDEX IF NOT EXISTS waitlist_attempts_time_idx ON public.waitlist_attempts (attempted_at DESC);