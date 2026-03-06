-- ============================================================
-- The Gentry — Manual Booking Migration
-- Run this in the Supabase SQL Editor AFTER migration-fix-rls-recursion.sql
-- Allows barbers to create bookings for walk-in / phone clients
-- ============================================================

-- 1. Add guest columns to bookings (for walk-in clients without an account)
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS guest_name TEXT;

ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS guest_phone TEXT;

-- 2. Allow barbers to INSERT bookings (for manual booking creation)
CREATE POLICY "Barbers can insert bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (public.is_barber());
