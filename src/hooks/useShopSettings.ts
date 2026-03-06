import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ShopSettings } from "@/types/supabase";
import { toast } from "sonner";

const SHOP_SETTINGS_KEY = ["shop-settings"] as const;

const DEFAULT_SETTINGS: Omit<ShopSettings, "id" | "updated_by" | "updated_at"> = {
  closed_days: [0],
  open_time: "09:00",
  close_time: "20:00",
  sat_close_time: "18:00",
  break_start: null,
  break_end: null,
};

export function useShopSettings() {
  return useQuery({
    queryKey: SHOP_SETTINGS_KEY,
    queryFn: async (): Promise<ShopSettings> => {
      const { data, error } = await supabase
        .from("shop_settings")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        // If table doesn't exist yet or no row, return defaults
        if (error.code === "PGRST116" || error.code === "42P01") {
          return { id: "", updated_by: null, updated_at: "", ...DEFAULT_SETTINGS };
        }
        throw error;
      }

      return data as unknown as ShopSettings;
    },
    staleTime: 5 * 60 * 1000, // cache 5 min
  });
}

export function useUpdateShopSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      settings: Partial<Pick<ShopSettings, "closed_days" | "open_time" | "close_time" | "sat_close_time" | "break_start" | "break_end">>
    ) => {
      // Try update first
      const { data: existing } = await supabase
        .from("shop_settings")
        .select("id")
        .limit(1)
        .single();

      if (existing) {
        const { error } = await supabase
          .from("shop_settings")
          .update({ ...settings, updated_at: new Date().toISOString() } as never)
          .eq("id", (existing as unknown as { id: string }).id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("shop_settings")
          .insert({ ...DEFAULT_SETTINGS, ...settings } as never);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHOP_SETTINGS_KEY });
      queryClient.invalidateQueries({ queryKey: ["booked-slots"] });
      toast.success("Settings saved.");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
