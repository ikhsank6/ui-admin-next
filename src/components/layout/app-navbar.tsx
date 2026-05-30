"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useSidebar } from "@/hooks/use-sidebar";
import { bottomNav, type NavItem, navGroups, primaryNav } from "@/utils/nav-config";
import { NavGroupSection, NavItemRow } from "./nav-items";
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
  const { toggle, mobileOpen, setMobileOpen } = useSidebar();
  const [query, setQuery] = useState("");
  const dateLabel = useDateNow();

  const allItems: NavItem[] = [...primaryNav, ...navGroups.flatMap((g) => g.items), ...bottomNav];

  const filtered = query.trim()
    ? allItems.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
    : null;

  function handleClose() {
    setMobileOpen(false);
    setQuery("");
  }

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 bg-[hsl(var(--navbar))] text-[hsl(var(--navbar-foreground))] px-4 shadow-[0_1px_8px_0_rgba(0,0,0,0.35)]">
        {/* Hamburger desktop */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="hidden md:inline-flex shrink-0 text-white/70 hover:text-white hover:bg-white/10"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>

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

        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 shrink-0 font-bold text-lg tracking-tight text-white"
          aria-label="AdminPanel beranda"
        >
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary text-primary-foreground text-xs font-bold">
            AP
          </span>
          <span className="hidden sm:inline">AdminPanel</span>
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

      {/* Mobile sidebar sheet */}
      <Sheet open={mobileOpen} onOpenChange={handleClose}>
        <SheetContent side="left" floating className="w-72 p-0 bg-sidebar flex flex-col">
          <SheetTitle className="sr-only">Menu navigasi</SheetTitle>

          {/* Header */}
          <div className="flex items-center justify-between h-14 px-4 border-b border-sidebar-border shrink-0">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary text-primary-foreground text-xs font-bold">
                AP
              </span>
              <span className="font-bold text-lg text-sidebar-foreground">AdminPanel</span>
            </div>
          </div>

          {/* Search */}
          <div className="px-3 pt-3 pb-1 shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari menu..."
                className="pl-8 pr-7 h-8 text-sm bg-sidebar-accent/30 border-sidebar-border focus-visible:ring-1"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-2">
            {filtered ? (
              filtered.length > 0 ? (
                <div className="flex flex-col gap-0.5">
                  {filtered.map((item) => (
                    <NavItemRow key={item.href} item={item} onClose={handleClose} />
                  ))}
                </div>
              ) : (
                <p className="px-3 py-6 text-xs text-muted-foreground text-center">
                  Tidak ditemukan
                </p>
              )
            ) : (
              <div className="flex flex-col gap-1">
                {primaryNav.map((item) => (
                  <NavItemRow key={item.href} item={item} onClose={handleClose} />
                ))}
                <Separator className="my-2 bg-sidebar-border" />
                {navGroups.map((group) => (
                  <NavGroupSection key={group.title} group={group} onClose={handleClose} />
                ))}
              </div>
            )}
          </nav>

          {/* Bottom nav */}
          <div className="border-t border-sidebar-border px-3 py-3 shrink-0">
            {bottomNav.map((item) => (
              <NavItemRow key={item.href} item={item} onClose={handleClose} />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
