import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import type { Booking } from "@/types/supabase";
import { toast } from "sonner";

export type NotificationType = "new_booking" | "cancelled_booking" | "deleted_booking";

export interface BarberNotification {
  id: string;
  type: NotificationType;
  bookingId: string;
  customerName: string;
  serviceName: string;
  date: string;
  time: string;
  timestamp: number;
  read: boolean;
}

const STORAGE_KEY = "barber_notifications";
const MAX_NOTIFICATIONS = 50;

// ---- Web Audio notification sounds (no audio files needed) ----

function playNewBookingSound() {
  try {
    const ctx = new AudioContext();
    // Two ascending notes: a pleasant "ding ding"
    const notes = [
      { freq: 880, start: 0, duration: 0.12 },
      { freq: 1100, start: 0.14, duration: 0.18 },
    ];
    notes.forEach(({ freq, start, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration);
    });
    // Close the context after sounds finish
    setTimeout(() => ctx.close(), 800);
  } catch {
    // AudioContext unavailable — degrade silently
  }
}

function playCancelSound() {
  try {
    const ctx = new AudioContext();
    // Single descending note — softer, lower
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
    setTimeout(() => ctx.close(), 600);
  } catch {
    // AudioContext unavailable — degrade silently
  }
}

function loadFromStorage(): BarberNotification[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BarberNotification[];
  } catch {
    return [];
  }
}

function saveToStorage(notifs: BarberNotification[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(notifs));
  } catch {
    // storage unavailable — degrade gracefully
  }
}

export function useBarberNotifications() {
  const { isBarber, user } = useAuth();
  const [notifications, setNotifications] = useState<BarberNotification[]>(loadFromStorage);

  const addNotification = useCallback(
    (n: Omit<BarberNotification, "id" | "timestamp" | "read">) => {
      const newNotif: BarberNotification = {
        ...n,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        read: false,
      };
      setNotifications((prev) => {
        const updated = [newNotif, ...prev].slice(0, MAX_NOTIFICATIONS);
        saveToStorage(updated);
        return updated;
      });
    },
    []
  );

  useEffect(() => {
    if (!isBarber || !user) return;

    const channel = supabase
      .channel("barber-booking-notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookings" },
        (payload) => {
          const booking = payload.new as Booking;
          // Skip self-created manual bookings (barber's own user_id on INSERT)
          if (booking.user_id === user.id) return;

          const customerName = booking.guest_name ?? "Client";
          addNotification({
            type: "new_booking",
            bookingId: booking.id,
            customerName,
            serviceName: booking.service_name,
            date: booking.date,
            time: booking.time,
          });
          playNewBookingSound();
          toast.success(`New booking: ${customerName}`, {
            description: `${booking.service_name} · ${booking.date} at ${booking.time}`,
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "bookings" },
        (payload) => {
          const next = payload.new as Booking;
          // Only notify when status flips to cancelled
          if (next.status !== "cancelled") return;

          const customerName = next.guest_name ?? "Client";
          addNotification({
            type: "cancelled_booking",
            bookingId: next.id,
            customerName,
            serviceName: next.service_name,
            date: next.date,
            time: next.time,
          });
          playCancelSound();
          toast.warning(`Booking cancelled: ${customerName}`, {
            description: `${next.service_name} · ${next.date} at ${next.time}`,
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "bookings" },
        (payload) => {
          // With DEFAULT replica identity only the PK is available in payload.old
          const booking = payload.old as Partial<Booking>;
          playCancelSound();
          addNotification({
            type: "deleted_booking",
            bookingId: booking.id ?? "",
            customerName: booking.guest_name ?? "Client",
            serviceName: booking.service_name ?? "a service",
            date: booking.date ?? "",
            time: booking.time ?? "",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isBarber, user, addNotification]);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const clearNotification = useCallback((id: string) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    saveToStorage([]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, unreadCount, markAllRead, clearNotification, clearAll };
}
