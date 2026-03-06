import { format, addMinutes, parseISO } from "date-fns";
import { getServiceById } from "@/lib/services";
import type { Booking } from "@/types/supabase";

function getBookingDates(booking: Booking) {
  const service = getServiceById(booking.service_id);
  const durationMinutes = service?.durationMinutes ?? 30;
  const [hours, minutes] = booking.time.split(":").map(Number);
  const startDate = parseISO(booking.date);
  startDate.setHours(hours, minutes, 0, 0);
  const endDate = addMinutes(startDate, durationMinutes);
  return { startDate, endDate };
}

export function buildGoogleCalendarUrl(booking: Booking): string {
  const { startDate, endDate } = getBookingDates(booking);
  const formatGCal = (d: Date) => format(d, "yyyyMMdd'T'HHmmss");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `The Gentry – ${booking.service_name}`,
    dates: `${formatGCal(startDate)}/${formatGCal(endDate)}`,
    details: `Service: ${booking.service_name}\nPrice: $${booking.service_price}\n\nSee you at The Gentry!`,
    location: "The Gentry Barber Shop",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(booking: Booking): void {
  const { startDate, endDate } = getBookingDates(booking);
  const formatIcs = (d: Date) => format(d, "yyyyMMdd'T'HHmmss");
  const now = formatIcs(new Date());

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Gentry//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${booking.id}@thegentry`,
    `DTSTAMP:${now}`,
    `DTSTART:${formatIcs(startDate)}`,
    `DTEND:${formatIcs(endDate)}`,
    `SUMMARY:The Gentry – ${booking.service_name}`,
    `DESCRIPTION:Service: ${booking.service_name}\\nPrice: $${booking.service_price}\\n\\nSee you at The Gentry!`,
    "LOCATION:The Gentry Barber Shop",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `the-gentry-${booking.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
