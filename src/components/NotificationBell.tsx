import { Bell, BellRing, CheckCheck, X } from "lucide-react";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { BarberNotification } from "@/hooks/useBarberNotifications";

interface NotificationBellProps {
  notifications: BarberNotification[];
  unreadCount: number;
  onMarkAllRead: () => void;
  onClear: (id: string) => void;
  onClearAll: () => void;
}

export function NotificationBell({
  notifications,
  unreadCount,
  onMarkAllRead,
  onClear,
  onClearAll,
}: NotificationBellProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 text-muted-foreground hover:text-foreground"
          aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
        >
          {unreadCount > 0 ? (
            <BellRing className="h-4 w-4" />
          ) : (
            <Bell className="h-4 w-4" />
          )}
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold px-1 leading-none">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-80 p-0 rounded-none border-border shadow-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="font-heading text-sm text-foreground tracking-wide">
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 text-[10px] font-body text-primary">
                {unreadCount} new
              </span>
            )}
          </h3>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-muted-foreground hover:text-foreground px-2 font-body"
                onClick={onMarkAllRead}
              >
                <CheckCheck className="h-3 w-3 mr-1" />
                Mark read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-muted-foreground hover:text-foreground px-2 font-body"
                onClick={onClearAll}
              >
                Clear all
              </Button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center px-4">
              <Bell className="h-8 w-8 text-muted-foreground/25 mb-3" />
              <p className="text-sm text-muted-foreground font-body">No notifications yet</p>
              <p className="text-xs text-muted-foreground/50 font-body mt-1">
                New bookings and cancellations will appear here in real-time.
              </p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={cn(
                  "flex items-start gap-3 px-4 py-3 border-b border-border/40 last:border-0 transition-colors",
                  !n.read && "bg-primary/5"
                )}
              >
                {/* Type icon */}
                <div
                  className={cn(
                    "mt-0.5 flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs leading-none",
                    n.type === "new_booking"
                      ? "bg-green-400/15 text-green-400"
                      : "bg-orange-400/15 text-orange-400"
                  )}
                >
                  {n.type === "new_booking" ? "+" : "–"}
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-body text-foreground leading-snug">
                    {n.type === "new_booking" ? (
                      <>
                        <span className="font-semibold">{n.customerName}</span>
                        {" booked "}
                        <span className="text-muted-foreground">{n.serviceName}</span>
                      </>
                    ) : n.type === "cancelled_booking" ? (
                      <>
                        <span className="font-semibold">{n.customerName}</span>
                        {" cancelled "}
                        <span className="text-muted-foreground">{n.serviceName}</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">A booking was removed from your calendar.</span>
                    )}
                  </p>
                  {n.date !== "" && (
                    <p className="text-[10px] font-body text-muted-foreground mt-0.5">
                      {format(parseISO(n.date), "EEE, MMM d")} at {n.time}
                    </p>
                  )}
                  <p className="text-[10px] font-body text-muted-foreground/50 mt-0.5">
                    {formatDistanceToNow(n.timestamp, { addSuffix: true })}
                  </p>
                </div>

                {/* Unread dot + dismiss */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0 pt-0.5">
                  {!n.read && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 text-muted-foreground/40 hover:text-muted-foreground"
                    onClick={() => onClear(n.id)}
                    aria-label="Dismiss notification"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
