import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import type { BookingInsert, Booking } from "@/types/supabase";
import { toast } from "sonner";

const BOOKINGS_KEY = ["bookings"] as const;

export function useBookings() {
  const { user } = useAuth();

  return useQuery({
    queryKey: BOOKINGS_KEY,
    queryFn: async (): Promise<Booking[]> => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: true })
        .order("time", { ascending: true });

      if (error) throw error;
      return (data as unknown as Booking[]) ?? [];
    },
    enabled: !!user,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (
      booking: Omit<BookingInsert, "user_id">
    ): Promise<Booking> => {
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("bookings")
        .insert({ ...booking, user_id: user.id } as BookingInsert)
        .select()
        .single();

      if (error) {
        // Handle unique constraint violation (double booking)
        if (error.code === "23505") {
          throw new Error(
            "This time slot is already booked. Please choose a different time."
          );
        }
        throw error;
      }
      return data as unknown as Booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY });
      toast.success("Booking confirmed!");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId: string) => {
      // Read details first so we can broadcast to the barber reliably.
      // postgres_changes UPDATE events are unreliable with RLS for non-owner
      // subscribers (barber), so we use Realtime broadcast as the primary path.
      const { data: booking } = await supabase
        .from("bookings")
        .select("id, service_name, date, time, guest_name")
        .eq("id", bookingId)
        .maybeSingle();

      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" } as never)
        .eq("id", bookingId);

      if (error) throw error;

      // Broadcast so the barber's notification hook picks it up regardless of page.
      if (booking) {
        const ch = supabase.channel("barber-booking-notifications");
        ch.subscribe((status) => {
          if (status === "SUBSCRIBED") {
            ch.send({
              type: "broadcast",
              event: "booking_cancelled",
              payload: booking,
            });
            setTimeout(() => supabase.removeChannel(ch), 2000);
          }
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY });
      toast.success("Booking cancelled.");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}

export function useRescheduleBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingId,
      date,
      time,
    }: {
      bookingId: string;
      date: string;
      time: string;
    }) => {
      const { error } = await supabase
        .from("bookings")
        .update({ date, time, status: "confirmed" } as never)
        .eq("id", bookingId);

      if (error) {
        if (error.code === "23505") {
          throw new Error(
            "This time slot is already booked. Please choose a different time."
          );
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY });
      toast.success("Booking rescheduled!");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId: string) => {
      // Read details before deletion so the barber can be notified via broadcast.
      // postgres_changes DELETE events are unreliable with RLS when the subscriber
      // doesn't own the row, so we use Realtime broadcast as the reliable path.
      const { data: booking } = await supabase
        .from("bookings")
        .select("id, service_name, date, time, guest_name")
        .eq("id", bookingId)
        .maybeSingle();

      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId);

      if (error) throw error;

      // Broadcast so the barber's notification hook picks it up regardless of page.
      if (booking) {
        const ch = supabase.channel("barber-booking-notifications");
        ch.subscribe((status) => {
          if (status === "SUBSCRIBED") {
            ch.send({
              type: "broadcast",
              event: "booking_deleted",
              payload: booking,
            });
            // Clean up after enough time for the message to be delivered
            setTimeout(() => supabase.removeChannel(ch), 2000);
          }
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKINGS_KEY });
      toast.success("Booking removed from history.");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}

export function useBookedSlots(date: string | null) {
  return useQuery({
    queryKey: ["booked-slots", date],
    queryFn: async (): Promise<string[]> => {
      if (!date) return [];

      // Fetch confirmed bookings for this date
      const { data: bookings, error: bErr } = await supabase
        .from("bookings")
        .select("time")
        .eq("date", date)
        .eq("status", "confirmed");

      if (bErr) throw bErr;

      // Fetch blocked slots for this date
      const { data: blocked, error: blErr } = await supabase
        .from("blocked_slots")
        .select("time")
        .eq("date", date);

      if (blErr) throw blErr;

      const bookedTimes = (bookings as unknown as { time: string }[])?.map((b) => b.time) ?? [];
      const blockedTimes = (blocked as unknown as { time: string }[])?.map((b) => b.time) ?? [];

      return [...new Set([...bookedTimes, ...blockedTimes])];
    },
    enabled: !!date,
  });
}
