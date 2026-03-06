export type BookingStatus = "confirmed" | "cancelled" | "completed";
export type UserRole = "customer" | "barber";

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          user_id: string;
          service_id: string;
          service_name: string;
          service_price: number;
          date: string;
          time: string;
          notes: string | null;
          guest_name: string | null;
          guest_phone: string | null;
          status: BookingStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          service_id: string;
          service_name: string;
          service_price: number;
          date: string;
          time: string;
          notes?: string | null;
          guest_name?: string | null;
          guest_phone?: string | null;
          status?: BookingStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          service_id?: string;
          service_name?: string;
          service_price?: number;
          date?: string;
          time?: string;
          notes?: string | null;
          guest_name?: string | null;
          guest_phone?: string | null;
          status?: BookingStatus;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bookings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      blocked_slots: {
        Row: {
          id: string;
          date: string;
          time: string;
          reason: string | null;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          time: string;
          reason?: string | null;
          created_by: string;
          created_at?: string;
        };
        Update: {
          date?: string;
          time?: string;
          reason?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "blocked_slots_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          id: string;
          full_name: string;
          phone: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          phone?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string;
          phone?: string | null;
          role?: UserRole;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];
export type BlockedSlot = Database["public"]["Tables"]["blocked_slots"]["Row"];
export type BlockedSlotInsert = Database["public"]["Tables"]["blocked_slots"]["Insert"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export interface ShopSettings {
  id: string;
  closed_days: number[];    // 0=Sun, 1=Mon, ..., 6=Sat
  open_time: string;        // "HH:mm"
  close_time: string;       // "HH:mm"
  sat_close_time: string;   // "HH:mm"
  break_start: string | null;
  break_end: string | null;
  updated_by: string | null;
  updated_at: string;
}
