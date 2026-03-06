-- ============================================================
-- Enable Supabase Realtime on the bookings table so the barber
-- dashboard can receive live INSERT / UPDATE / DELETE events.
-- ============================================================

-- 1. Add bookings to the supabase_realtime publication.
--    This makes Postgres broadcast row-level changes to Realtime.
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;

-- 2. Enable REPLICA IDENTITY FULL on bookings so that UPDATE and
--    DELETE events include the *old* row values in the payload.
--    Without this, payload.old only contains the primary key.
ALTER TABLE bookings REPLICA IDENTITY FULL;

-- ============================================================
-- NOTE: Run this migration once in your Supabase SQL Editor
-- (or via `supabase db push` if using the CLI).
--
-- After applying, go to Supabase Dashboard → Database → Replication
-- and verify that "bookings" appears in the supabase_realtime
-- publication. You can also toggle it via the UI there.
-- ============================================================
