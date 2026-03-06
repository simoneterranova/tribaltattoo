import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import type { Booking, Profile, BlockedSlot } from "@/types/supabase";
import { toast } from "sonner";

const ALL_BOOKINGS_KEY = ["all-bookings"] as const;
const BLOCKED_SLOTS_KEY = ["blocked-slots"] as const;

// ---- Booking with customer profile joined ----

export interface BookingWithCustomer extends Booking {
  customer: Pick<Profile, "full_name" | "phone"> | null;
  guest_name: string | null;
  guest_phone: string | null;
}

/**
 * Fetch ALL bookings across all users (barber-only, RLS enforced).
 * Joins with profiles to get customer name + phone.
 */
export function useAllBookings() {
  const { user, isBarber } = useAuth();

  return useQuery({
    queryKey: ALL_BOOKINGS_KEY,
    queryFn: async (): Promise<BookingWithCustomer[]> => {
      // Fetch all bookings
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select("*")
        .order("date", { ascending: true })
        .order("time", { ascending: true });

      if (error) throw error;
      const rows = (bookings as unknown as Booking[]) ?? [];

      // Fetch all relevant profiles
      const userIds = [...new Set(rows.map((b) => b.user_id))];
      if (userIds.length === 0) return [];

      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, phone")
        .in("id", userIds);

      const profileMap = new Map(
        ((profiles as unknown as Pick<Profile, "id" | "full_name" | "phone">[]) ?? []).map(
          (p) => [p.id, { full_name: p.full_name, phone: p.phone }]
        )
      );

      return rows.map((b) => ({
        ...b,
        customer: profileMap.get(b.user_id) ?? null,
      }));
    },
    enabled: !!user && isBarber,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
  });
}

/**
 * Update a booking's status (barber action: complete, cancel).
 */
export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingId,
      status,
    }: {
      bookingId: string;
      status: "confirmed" | "cancelled" | "completed";
    }) => {
      const { error } = await supabase
        .from("bookings")
        .update({ status } as never)
        .eq("id", bookingId);

      if (error) throw error;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ALL_BOOKINGS_KEY });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booked-slots"] });
      const msg =
        variables.status === "completed"
          ? "Booking marked as completed."
          : variables.status === "cancelled"
          ? "Booking cancelled."
          : "Booking confirmed.";
      toast.success(msg);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}

// ---- Blocked Slots ----

/**
 * All blocked slots (barbers + customers both need this).
 */
export function useBlockedSlots(date?: string | null) {
  return useQuery({
    queryKey: [...BLOCKED_SLOTS_KEY, date ?? "all"],
    queryFn: async (): Promise<BlockedSlot[]> => {
      let query = supabase.from("blocked_slots").select("*");
      if (date) {
        query = query.eq("date", date);
      }
      const { data, error } = await query.order("time", { ascending: true });
      if (error) throw error;
      return (data as unknown as BlockedSlot[]) ?? [];
    },
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
  });
}

/**
 * Create a blocked slot (barber only, RLS enforced).
 */
export function useCreateBlockedSlot() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      date,
      time,
      reason,
    }: {
      date: string;
      time: string;
      reason?: string;
    }) => {
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("blocked_slots").insert({
        date,
        time,
        reason: reason || null,
        created_by: user.id,
      } as never);

      if (error) {
        if (error.code === "23505") {
          throw new Error("This slot is already blocked.");
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOCKED_SLOTS_KEY });
      queryClient.invalidateQueries({ queryKey: ["booked-slots"] });
      toast.success("Time slot blocked.");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}

/**
 * Delete a blocked slot (barber only, RLS enforced).
 */
export function useDeleteBlockedSlot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slotId: string) => {
      const { error } = await supabase
        .from("blocked_slots")
        .delete()
        .eq("id", slotId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOCKED_SLOTS_KEY });
      queryClient.invalidateQueries({ queryKey: ["booked-slots"] });
      toast.success("Time slot unblocked.");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}

/**
 * Create a booking on behalf of a walk-in client (barber only).
 * Uses the barber's user_id as owner, with guest_name for display.
 */
export function useBarberCreateBooking() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: {
      guest_name: string;
      guest_phone: string;
      service_id: string;
      service_name: string;
      service_price: number;
      date: string;
      time: string;
      notes?: string;
    }) => {
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("bookings").insert({
        user_id: user.id,
        guest_name: data.guest_name,
        guest_phone: data.guest_phone,
        service_id: data.service_id,
        service_name: data.service_name,
        service_price: data.service_price,
        date: data.date,
        time: data.time,
        notes: data.notes || null,
        status: "confirmed",
      } as never);

      if (error) {
        if (error.code === "23505") {
          throw new Error("This time slot is already booked.");
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ALL_BOOKINGS_KEY });
      queryClient.invalidateQueries({ queryKey: ["booked-slots"] });
      toast.success("Booking created successfully.");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
