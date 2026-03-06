-- ============================================================
-- The Gentry — Fix RLS Recursion Migration
-- Run this in the Supabase SQL Editor AFTER migration-barber.sql
-- Fixes infinite recursion caused by RLS policies querying profiles
-- ============================================================

-- Drop old policies that used inline subqueries (causing recursion)
DROP POLICY IF EXISTS "Barbers can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Barbers can update all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Barbers can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Barbers can insert blocked slots" ON public.blocked_slots;
DROP POLICY IF EXISTS "Barbers can delete blocked slots" ON public.blocked_slots;
DROP POLICY IF EXISTS "Anyone can view blocked slots" ON public.blocked_slots;

-- Create the SECURITY DEFINER helper function
-- (bypasses RLS to prevent infinite recursion when checking barber role)
CREATE OR REPLACE FUNCTION public.is_barber()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'barber'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Recreate all policies using is_barber()
CREATE POLICY "Barbers can view all bookings"
  ON public.bookings FOR SELECT
  USING (public.is_barber());

CREATE POLICY "Barbers can update all bookings"
  ON public.bookings FOR UPDATE
  USING (public.is_barber());

CREATE POLICY "Barbers can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_barber());

CREATE POLICY "Anyone can view blocked slots"
  ON public.blocked_slots FOR SELECT
  USING (true);

CREATE POLICY "Barbers can insert blocked slots"
  ON public.blocked_slots FOR INSERT
  WITH CHECK (public.is_barber());

CREATE POLICY "Barbers can delete blocked slots"
  ON public.blocked_slots FOR DELETE
  USING (public.is_barber());

CREATE POLICY "Users can delete own bookings"
  ON public.bookings FOR DELETE
  USING (auth.uid() = user_id);