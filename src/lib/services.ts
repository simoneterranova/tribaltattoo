import shopConfig from "@/config/shopConfig";

export const SLOT_DURATION = 30; // minutes

// Derived from shopConfig — do not edit here, edit shopConfig.ts instead.
export const services = shopConfig.services.map((s) => ({
  id: s.id,
  name: s.name,
  price: s.price,
  duration: s.duration,
  durationMinutes: s.durationMinutes,
}));

export type ServiceId = (typeof services)[number]["id"];

export function getServiceById(id: string) {
  return services.find((s) => s.id === id);
}

export interface ShopTimingOptions {
  openTime?: string;        // "HH:mm"
  closeTime?: string;       // "HH:mm"
  satCloseTime?: string;    // "HH:mm"
  breakStart?: string | null;
  breakEnd?: string | null;
}

export function generateTimeSlots(date: Date | undefined, options?: ShopTimingOptions): string[] {
  if (!date) return [];

  const openTime = options?.openTime ?? "09:00";
  const closeTime = options?.closeTime ?? "20:00";
  const satCloseTime = options?.satCloseTime ?? "18:00";
  const breakStart = options?.breakStart ?? null;
  const breakEnd = options?.breakEnd ?? null;

  const isSat = date.getDay() === 6;
  const [startH, startM] = openTime.split(":").map(Number);
  const [endH, endM] = (isSat ? satCloseTime : closeTime).split(":").map(Number);

  // Last bookable slot must finish by closing time, so stop SLOT_DURATION before close
  const closeMin = endH * 60 + endM;
  const lastSlotMin = closeMin - SLOT_DURATION;

  // Parse break times
  let breakStartMin = -1;
  let breakEndMin = -1;
  if (breakStart && breakEnd) {
    const [bsH, bsM] = breakStart.split(":").map(Number);
    const [beH, beM] = breakEnd.split(":").map(Number);
    breakStartMin = bsH * 60 + bsM;
    breakEndMin = beH * 60 + beM;
  }

  const slots: string[] = [];
  let h = startH;
  let m = startM;

  while (h * 60 + m <= lastSlotMin) {
    const totalMin = h * 60 + m;

    // Skip break slots
    if (breakStartMin >= 0 && totalMin >= breakStartMin && totalMin < breakEndMin) {
      m += 30;
      if (m >= 60) { h++; m = 0; }
      continue;
    }

    slots.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
    m += 30;
    if (m >= 60) { h++; m = 0; }
  }

  return slots;
}
