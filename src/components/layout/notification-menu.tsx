"use client";

import { motion } from "framer-motion";
import { Bell, CheckCheck, Info, ShieldAlert, UserPlus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/cn";

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "user";
};

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Pengguna baru mendaftar",
    message: "Andi Pratama baru saja membuat akun.",
    time: "2 menit lalu",
    read: false,
    type: "user",
  },
  {
    id: "2",
    title: "Laporan mingguan siap",
    message: "Laporan aktivitas minggu ini telah tersedia.",
    time: "1 jam lalu",
    read: false,
    type: "info",
  },
  {
    id: "3",
    title: "Peringatan keamanan",
    message: "Terdeteksi login dari perangkat baru.",
    time: "3 jam lalu",
    read: false,
    type: "warning",
  },
  {
    id: "4",
    title: "Pembaruan sistem",
    message: "Sistem berhasil diperbarui ke versi 2.4.1.",
    time: "Kemarin",
    read: true,
    type: "info",
  },
  {
    id: "5",
    title: "Pengguna dinonaktifkan",
    message: "Akun Budi Santoso telah ditangguhkan.",
    time: "Kemarin",
    read: true,
    type: "warning",
  },
];

const TYPE_CONFIG = {
  info: { icon: Info, className: "text-blue-500 bg-blue-500/10" },
  warning: { icon: ShieldAlert, className: "text-amber-500 bg-amber-500/10" },
  user: { icon: UserPlus, className: "text-green-500 bg-green-500/10" },
};

export function NotificationMenu() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 text-white/70 hover:text-white hover:bg-white/10"
          aria-label="Notifikasi"
        >
          <motion.div
            animate={unreadCount > 0 ? { rotate: [0, -20, 20, -15, 15, -8, 8, 0] } : { rotate: 0 }}
            transition={{
              duration: 0.7,
              repeat: unreadCount > 0 ? Number.POSITIVE_INFINITY : 0,
              repeatDelay: 2.5,
            }}
            style={{ transformOrigin: "top center", display: "flex" }}
          >
            <Bell className="h-5 w-5" />
          </motion.div>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-[hsl(var(--navbar))]" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0" sideOffset={8}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">Notifikasi</span>
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground gap-1"
              onClick={markAllRead}
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Tandai semua
            </Button>
          )}
        </div>

        {/* List */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-2">
              <Bell className="h-8 w-8 opacity-30" />
              <p className="text-sm">Tidak ada notifikasi</p>
            </div>
          ) : (
            notifications.map((notif) => {
              const { icon: Icon, className: iconClass } = TYPE_CONFIG[notif.type];
              return (
                <button
                  key={notif.id}
                  type="button"
                  onClick={() => markRead(notif.id)}
                  className={cn(
                    "w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 border-b border-border/50 last:border-0",
                    !notif.read && "bg-muted/30"
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 shrink-0 flex items-center justify-center h-8 w-8 rounded-full",
                      iconClass
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={cn(
                          "text-sm font-medium truncate",
                          !notif.read && "font-semibold"
                        )}
                      >
                        {notif.title}
                      </p>
                      {!notif.read && <span className="shrink-0 h-2 w-2 rounded-full bg-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {notif.message}
                    </p>
                    <p className="text-[10px] text-muted-foreground/70 mt-1">{notif.time}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-8 text-xs text-muted-foreground hover:text-foreground"
          >
            Lihat semua notifikasi
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
