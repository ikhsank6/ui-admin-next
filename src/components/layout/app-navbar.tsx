"use client";

import { Gem, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useSidebar } from "@/hooks/use-sidebar";
import { MobileSidebarNav } from "./app-sidebar";
import { NotificationMenu } from "./notification-menu";
import { UserMenu } from "./user-menu";

// ─── AppNavbar ────────────────────────────────────────────────────────────────

function useDateNow() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    function format() {
      return new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    setLabel(format());
    const id = setInterval(() => setLabel(format()), 60_000);
    return () => clearInterval(id);
  }, []);

  return label;
}

export function AppNavbar() {
  const { mobileOpen, setMobileOpen } = useSidebar();
  const dateLabel = useDateNow();

  function handleClose() {
    setMobileOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 bg-[hsl(var(--navbar))] text-[hsl(var(--navbar-foreground))] px-4 shadow-[0_1px_8px_0_rgba(0,0,0,0.35)]">
        {/* Hamburger mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(true)}
          className="md:hidden shrink-0 text-white/70 hover:text-white hover:bg-white/10"
          aria-label="Buka menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo PERONHUB */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 shrink-0 text-white"
          aria-label="Portal DJKA — Beranda"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
            <Gem className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-extrabold text-base tracking-tight">PERONHUB</span>
            <span className="text-[9px] font-medium tracking-[0.5px] text-white/50 uppercase">
              Direktorat Jenderal Perkeretaapian
            </span>
          </span>
        </Link>

        {/* Date */}
        <div className="flex-1 flex justify-end pr-3">
          {dateLabel && <span className="hidden sm:block text-sm text-white/60">{dateLabel}</span>}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <NotificationMenu />
          <UserMenu />
        </div>
      </header>

      {/* Mobile sidebar sheet — sama dengan desktop (rail + panel) */}
      <Sheet open={mobileOpen} onOpenChange={handleClose}>
        <SheetContent side="left" className="w-[320px] p-0 bg-card flex flex-col gap-0">
          <SheetTitle className="sr-only">Menu navigasi</SheetTitle>
          <MobileSidebarNav onNavigate={handleClose} />
        </SheetContent>
      </Sheet>
    </>
  );
}
