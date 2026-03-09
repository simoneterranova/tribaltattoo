import React, { useState } from "react";
import { Bell, BellRing, CheckCheck, X } from "lucide-react";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import type { BarberNotification } from "@/hooks/useBarberNotifications";

interface NotificationBellProps {
  notifications: BarberNotification[];
  unreadCount: number;
  onMarkAllRead: () => void;
  onClear: (id: string) => void;
  onClearAll: () => void;
}

/* ── Shared trigger button (forwardRef so Radix asChild works) ── */
const TriggerButton = React.forwardRef<
  HTMLButtonElement,
  { unreadCount: number } & React.ComponentPropsWithoutRef<typeof Button>
>(({ unreadCount, ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    size="icon"
    className="relative h-8 w-8 text-muted-foreground hover:text-foreground"
    aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
    {...props}
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
));
TriggerButton.displayName = "TriggerButton";

/* ── Shared header actions ── */
function NotificationHeader({
  unreadCount,
  hasNotifications,
  onMarkAllRead,
  onClearAll,
}: {
  unreadCount: number;
  hasNotifications: boolean;
  onMarkAllRead: () => void;
  onClearAll: () => void;
}) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
      <h3 className="font-heading text-sm text-foreground tracking-wide">
        {t.notifications.title}
        {unreadCount > 0 && (
          <span className="ml-2 text-[10px] font-body text-primary">
            {t.notifications.new(unreadCount)}
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
            {t.notifications.markRead}
          </Button>
        )}
        {hasNotifications && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground hover:text-foreground px-2 font-body"
            onClick={onClearAll}
          >
            {t.notifications.clearAll}
          </Button>
        )}
      </div>
    </div>
  );
}

/* ── Shared notification list ── */
function NotificationList({
  notifications,
  onClear,
}: {
  notifications: BarberNotification[];
  onClear: (id: string) => void;
}) {
  const { t } = useLanguage();
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center px-4">
        <Bell className="h-8 w-8 text-muted-foreground/25 mb-3" />
        <p className="text-sm text-muted-foreground font-body">{t.notifications.empty}</p>
        <p className="text-xs text-muted-foreground/50 font-body mt-1">
          {t.notifications.emptyDesc}
        </p>
      </div>
    );
  }

  return (
    <>
      {notifications.map((n) => (
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
                  {` ${t.notifications.actionBooked} `}
                  <span className="text-muted-foreground">{n.serviceName}</span>
                </>
              ) : n.type === "cancelled_booking" ? (
                <>
                  <span className="font-semibold">{n.customerName}</span>
                  {` ${t.notifications.actionCancelled} `}
                  <span className="text-muted-foreground">{n.serviceName}</span>
                </>
              ) : (
                <span className="text-muted-foreground">{t.notifications.deleted}</span>
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
              aria-label={t.notifications.dismissLabel}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}

/* ── Main component: Drawer on mobile, Popover on desktop ── */
export function NotificationBell({
  notifications,
  unreadCount,
  onMarkAllRead,
  onClear,
  onClearAll,
}: NotificationBellProps) {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (isMobile) {
    return (
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild>
          <TriggerButton unreadCount={unreadCount} />
        </DrawerTrigger>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="p-0 text-left">
            <DrawerTitle className="sr-only">{t.notifications.title}</DrawerTitle>
            <NotificationHeader
              unreadCount={unreadCount}
              hasNotifications={notifications.length > 0}
              onMarkAllRead={onMarkAllRead}
              onClearAll={onClearAll}
            />
          </DrawerHeader>
          <div className="overflow-y-auto flex-1">
            <NotificationList notifications={notifications} onClear={onClear} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <TriggerButton unreadCount={unreadCount} />
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-80 p-0 rounded-none border-border shadow-lg"
      >
        <NotificationHeader
          unreadCount={unreadCount}
          hasNotifications={notifications.length > 0}
          onMarkAllRead={onMarkAllRead}
          onClearAll={onClearAll}
        />
        <div className="max-h-96 overflow-y-auto">
          <NotificationList notifications={notifications} onClear={onClear} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
