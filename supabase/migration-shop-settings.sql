-- ============================================================
-- The Gentry — Shop Settings Migration
-- Run this in the Supabase SQL Editor AFTER migration-barber.sql
-- ============================================================

-- 1. Shop settings table (single row, barber-managed)
CREATE TABLE IF NOT EXISTS public.shop_settings (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  closed_days      INTEGER[] NOT NULL DEFAULT ARRAY[0],       -- 0=Sun,1=Mon,...,6=Sat
  open_time        TEXT NOT NULL DEFAULT '09:00',
  close_time       TEXT NOT NULL DEFAULT '20:00',
  sat_close_time   TEXT NOT NULL DEFAULT '18:00',
  break_start      TEXT DEFAULT NULL,                          -- e.g. '13:00'
  break_end        TEXT DEFAULT NULL,                          -- e.g. '14:00'
  updated_by       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.shop_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read shop settings (customers need it for availability)
CREATE POLICY "Anyone can view shop settings"
  ON public.shop_settings FOR SELECT
  USING (true);

-- Only barbers can update shop settings
CREATE POLICY "Barbers can update shop settings"
  ON public.shop_settings FOR UPDATE
  USING (public.is_barber());

-- Only barbers can insert shop settings
CREATE POLICY "Barbers can insert shop settings"
  ON public.shop_settings FOR INSERT
  WITH CHECK (public.is_barber());

-- 2. Insert default settings row
INSERT INTO public.shop_settings (closed_days, open_time, close_time, sat_close_time)
VALUES (ARRAY[0], '09:00', '20:00', '18:00')
ON CONFLICT DO NOTHING;
