-- ============================================================
-- The Gentry — Barber Dashboard Migration
-- Run this in the Supabase SQL Editor AFTER the initial migration
-- ============================================================

-- 1. Add role column to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'customer'
  CHECK (role IN ('customer', 'barber'));

-- 2. Helper function to check barber role (SECURITY DEFINER bypasses RLS,
--    preventing infinite recursion when policies query the profiles table)
CREATE OR REPLACE FUNCTION public.is_barber()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'barber'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 3. Barbers can view ALL bookings (for their dashboard)
CREATE POLICY "Barbers can view all bookings"
  ON public.bookings FOR SELECT
  USING (public.is_barber());

-- 4. Barbers can update ANY booking (mark complete, cancel, no-show)
CREATE POLICY "Barbers can update all bookings"
  ON public.bookings FOR UPDATE
  USING (public.is_barber());

-- 5. Barbers can view all profiles (to see customer name + phone)
CREATE POLICY "Barbers can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_barber());

-- 6. Blocked slots table (barber availability management)
CREATE TABLE IF NOT EXISTS public.blocked_slots (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date       DATE NOT NULL,
  time       TEXT NOT NULL,
  reason     TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(date, time)
);

ALTER TABLE public.blocked_slots ENABLE ROW LEVEL SECURITY;

-- Everyone can READ blocked_slots (customers need it for availability)
CREATE POLICY "Anyone can view blocked slots"
  ON public.blocked_slots FOR SELECT
  USING (true);

-- Only barbers can INSERT blocked slots
CREATE POLICY "Barbers can insert blocked slots"
  ON public.blocked_slots FOR INSERT
  WITH CHECK (public.is_barber());

-- Only barbers can DELETE blocked slots
CREATE POLICY "Barbers can delete blocked slots"
  ON public.blocked_slots FOR DELETE
  USING (public.is_barber());

-- Index for fast date lookups on blocked_slots
CREATE INDEX idx_blocked_slots_date ON public.blocked_slots (date);

-- ============================================================
-- IMPORTANT: To promote a user to barber, run:
-- UPDATE public.profiles SET role = 'barber' WHERE id = '<USER_UUID>';
-- ============================================================
