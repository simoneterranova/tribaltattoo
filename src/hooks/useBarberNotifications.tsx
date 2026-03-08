import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
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
// Tracks the ISO timestamp of the last moment the realtime subscription was active.
// Used on next load to detect bookings made while disconnected.
const LAST_SEEN_KEY = "barber_last_seen_at";
const MAX_NOTIFICATIONS = 50;

// ---- Web Audio notification sounds (no audio files needed) ----

function playNewBookingSound() {
  try {
    const ctx = new AudioContext();
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
    setTimeout(() => ctx.close(), 800);
  } catch {
    // AudioContext unavailable — degrade silently
  }
}

function playCancelSound() {
  try {
    const ctx = new AudioContext();
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

// Use localStorage so notifications survive tab/browser closes.
function loadFromStorage(): BarberNotification[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BarberNotification[];
  } catch {
    return [];
  }
}

function saveToStorage(notifs: BarberNotification[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifs));
  } catch {
    // storage unavailable — degrade gracefully
  }
}

// ---- Context ----

interface NotificationsContextValue {
  notifications: BarberNotification[];
  unreadCount: number;
  markAllRead: () => void;
  clearNotification: (id: string) => void;
  clearAll: () => void;
}

const BarberNotificationsContext = createContext<NotificationsContextValue | null>(null);

/**
 * Place this provider inside AuthProvider (but outside BrowserRouter) in App.tsx.
 * The realtime subscription is active for the entire session — not just on the
 * Dashboard page — so no booking events are ever missed due to navigation.
 */
export function BarberNotificationsProvider({ children }: { children: ReactNode }) {
  const { isBarber, user } = useAuth();
  const [notifications, setNotifications] = useState<BarberNotification[]>(loadFromStorage);

  const addNotification = useCallback(
    (n: Omit<BarberNotification, "id" | "timestamp" | "read">, timestamp?: number) => {
      const newNotif: BarberNotification = {
        ...n,
        id: crypto.randomUUID(),
        timestamp: timestamp ?? Date.now(),
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

    // ---- Catch-up: detect bookings made while the subscription was inactive ----
    // Record the start of this session so we have a clean "from" boundary.
    const sessionStart = new Date().toISOString();
    const lastSeenAt = localStorage.getItem(LAST_SEEN_KEY);

    if (lastSeenAt) {
      // Catch-up: new bookings made while offline
      supabase
        .from("bookings")
        .select("*")
        .gt("created_at", lastSeenAt)
        .neq("user_id", user.id)
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          if (!data || data.length === 0) return;
          setNotifications((prev) => {
            const existingBookingIds = new Set(
              prev.filter((n) => n.type === "new_booking").map((n) => n.bookingId)
            );
            const missed = (data as Booking[])
              .filter((b) => !existingBookingIds.has(b.id))
              .map((b): BarberNotification => ({
                id: crypto.randomUUID(),
                type: "new_booking",
                bookingId: b.id,
                customerName: b.guest_name ?? "Client",
                serviceName: b.service_name,
                date: b.date,
                time: b.time,
                timestamp: new Date(b.created_at).getTime(),
                read: false,
              }));
            if (missed.length === 0) return prev;
            const updated = [...missed, ...prev].slice(0, MAX_NOTIFICATIONS);
            saveToStorage(updated);
            return updated;
          });
        });

      // Catch-up: cancellations that happened while offline
      supabase
        .from("bookings")
        .select("*")
        .eq("status", "cancelled")
        .gt("updated_at", lastSeenAt)
        .order("updated_at", { ascending: false })
        .then(({ data }) => {
          if (!data || data.length === 0) return;
          setNotifications((prev) => {
            const existingCancelIds = new Set(
              prev.filter((n) => n.type === "cancelled_booking").map((n) => n.bookingId)
            );
            const missed = (data as Booking[])
              .filter((b) => !existingCancelIds.has(b.id))
              .map((b): BarberNotification => ({
                id: crypto.randomUUID(),
                type: "cancelled_booking",
                bookingId: b.id,
                customerName: b.guest_name ?? "Client",
                serviceName: b.service_name,
                date: b.date,
                time: b.time,
                timestamp: new Date(b.updated_at).getTime(),
                read: false,
              }));
            if (missed.length === 0) return prev;
            const updated = [...missed, ...prev].slice(0, MAX_NOTIFICATIONS);
            saveToStorage(updated);
            return updated;
          });
        });
    }

    // Stamp the start of this session — any bookings after this point will be
    // received live via the channel below, so next time we only need to backfill
    // from sessionStart.
    localStorage.setItem(LAST_SEEN_KEY, sessionStart);

    // ---- Realtime subscription (always active while barber is authed) ----
    const channel = supabase
      .channel("barber-booking-notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookings" },
        (payload) => {
          const booking = payload.new as Booking;
          // Skip only when the barber booked themselves (no guest — not a walk-in)
          if (booking.user_id === user.id && !booking.guest_name) return;

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

          // Dedup: the broadcast handler below is the primary path;
          // skip if we already recorded this cancellation via broadcast.
          setNotifications((prev) => {
            if (prev.some((n) => n.type === "cancelled_booking" && n.bookingId === next.id))
              return prev;
            const newNotif: BarberNotification = {
              id: crypto.randomUUID(),
              type: "cancelled_booking",
              bookingId: next.id,
              customerName: next.guest_name ?? "Client",
              serviceName: next.service_name,
              date: next.date,
              time: next.time,
              timestamp: Date.now(),
              read: false,
            };
            const updated = [newNotif, ...prev].slice(0, MAX_NOTIFICATIONS);
            saveToStorage(updated);
            playCancelSound();
            toast.warning(`Booking cancelled: ${next.guest_name ?? "Client"}`, {
              description: `${next.service_name} · ${next.date} at ${next.time}`,
            });
            return updated;
          });
        }
      )
      // Primary CANCEL path: broadcast sent by the customer's client before updating.
      // Bypasses RLS entirely and works regardless of row ownership.
      .on("broadcast", { event: "booking_cancelled" }, (payload) => {
        const booking = payload.payload as Partial<Booking> & { id?: string };
        if (!booking?.id) return;
        setNotifications((prev) => {
          if (prev.some((n) => n.type === "cancelled_booking" && n.bookingId === booking.id))
            return prev;
          const newNotif: BarberNotification = {
            id: crypto.randomUUID(),
            type: "cancelled_booking",
            bookingId: booking.id!,
            customerName: booking.guest_name ?? "Client",
            serviceName: booking.service_name ?? "a service",
            date: booking.date ?? "",
            time: booking.time ?? "",
            timestamp: Date.now(),
            read: false,
          };
          const updated = [newNotif, ...prev].slice(0, MAX_NOTIFICATIONS);
          saveToStorage(updated);
          return updated;
        });
        playCancelSound();
        toast.warning(`Booking cancelled: ${booking.guest_name ?? "Client"}`, {
          description: `${booking.service_name ?? "A booking"} · ${booking.date ?? ""} at ${booking.time ?? ""}`,
        });
      })
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "bookings" },
        (payload) => {
          // Fallback: postgres_changes DELETE — unreliable with RLS for non-owner
          // subscribers. The broadcast handler below is the primary path; this
          // fires only if Supabase does deliver the event (e.g. barber-owned rows).
          const booking = payload.old as Partial<Booking>;
          if (!booking.id) return;
          setNotifications((prev) => {
            if (prev.some((n) => n.type === "deleted_booking" && n.bookingId === booking.id))
              return prev;
            const newNotif: BarberNotification = {
              id: crypto.randomUUID(),
              type: "deleted_booking",
              bookingId: booking.id!,
              customerName: booking.guest_name ?? "Client",
              serviceName: booking.service_name ?? "a service",
              date: booking.date ?? "",
              time: booking.time ?? "",
              timestamp: Date.now(),
              read: false,
            };
            const updated = [newNotif, ...prev].slice(0, MAX_NOTIFICATIONS);
            saveToStorage(updated);
            return updated;
          });
          playCancelSound();
          toast.warning(`Booking removed`, {
            description: `${booking.service_name ?? "A booking"} · ${booking.date ?? ""} at ${booking.time ?? ""}`,
          });
        }
      )
      // Primary DELETE path: broadcast sent by the customer's client before deletion.
      // This bypasses RLS entirely and works regardless of row ownership.
      .on("broadcast", { event: "booking_deleted" }, (payload) => {
        const booking = payload.payload as Partial<Booking> & { id?: string };
        if (!booking?.id) return;
        setNotifications((prev) => {
          // Dedup: skip if the postgres_changes fallback already added this
          if (prev.some((n) => n.type === "deleted_booking" && n.bookingId === booking.id))
            return prev;
          const newNotif: BarberNotification = {
            id: crypto.randomUUID(),
            type: "deleted_booking",
            bookingId: booking.id!,
            customerName: booking.guest_name ?? "Client",
            serviceName: booking.service_name ?? "a service",
            date: booking.date ?? "",
            time: booking.time ?? "",
            timestamp: Date.now(),
            read: false,
          };
          const updated = [newNotif, ...prev].slice(0, MAX_NOTIFICATIONS);
          saveToStorage(updated);
          return updated;
        });
        playCancelSound();
        toast.warning(`Booking removed`, {
          description: `${booking.service_name ?? "A booking"} · ${booking.date ?? ""} at ${booking.time ?? ""}`,
        });
      })
      .subscribe();

    // Keep lastSeenAt current so the catch-up window stays narrow.
    const interval = setInterval(() => {
      localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
    }, 30_000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
      // Stamp the moment we disconnect so the next session knows where to start.
      localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
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

  return (
    <BarberNotificationsContext.Provider
      value={{ notifications, unreadCount, markAllRead, clearNotification, clearAll }}
    >
      {children}
    </BarberNotificationsContext.Provider>
  );
}

/**
 * Consume barber notifications anywhere in the tree.
 * Must be a descendant of BarberNotificationsProvider.
 */
export function useBarberNotifications() {
  const ctx = useContext(BarberNotificationsContext);
  if (!ctx) throw new Error("useBarberNotifications must be used within BarberNotificationsProvider");
  return ctx;
}
