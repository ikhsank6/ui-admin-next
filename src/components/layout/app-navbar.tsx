"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useSidebar } from "@/hooks/use-sidebar";
import { bottomNav, navGroups, primaryNav } from "@/utils/nav-config";
import { NavGroupSection, NavItemRow } from "./nav-items";
import { NotificationMenu } from "./notification-menu";
import { SearchBar } from "./search-bar";
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
  const dateLabel = useDateNow();

  function handleClose() {
    setMobileOpen(false);
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

        {/* Logo TEMPLATE ADMIN */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 shrink-0 text-white group"
          aria-label="Template Admin — Beranda"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 dark:bg-black/20 dark:border-white/5 p-1">
            <svg
              className="h-7 w-7 shrink-0 transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Logo Template Admin"
            >
              {/* Left/top chevron: white */}
              <path d="M6 16L16 6L21 11L11 21H6V16Z" fill="#FFFFFF" />
              {/* Right/bottom chevron: light grey */}
              <path d="M26 16L16 26L11 21L21 11H26V16Z" fill="#94A3B8" />
            </svg>
          </div>
          <span className="flex flex-col leading-none">
            <span className="font-extrabold text-[15px] tracking-tight text-white">
              TEMPLATE ADMIN
            </span>
            <span className="hidden sm:block text-[8px] font-bold tracking-[0.4px] text-white/80 dark:text-gray-300 uppercase -mt-0.5">
              UI ADMIN
            </span>
          </span>
        </Link>

        {/* Search Bar */}
        <div className="ml-1 sm:ml-4 shrink-0">
          <SearchBar />
        </div>

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
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/5 border border-white/10 p-1">
                <svg
                  className="h-6 w-6 shrink-0"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Logo Template Admin"
                >
                  <path d="M6 16L16 6L21 11L11 21H6V16Z" fill="#FFFFFF" />
                  <path d="M26 16L16 26L11 21L21 11H26V16Z" fill="#94A3B8" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-sm tracking-tight text-white">
                  TEMPLATE ADMIN
                </span>
                <span className="text-[7.5px] font-medium tracking-[0.1px] text-white/50 uppercase mt-0.5">
                  UI ADMIN
                </span>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-2">
            <div className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <NavItemRow key={item.href} item={item} onClose={handleClose} />
              ))}
              <Separator className="my-2 bg-sidebar-border" />
              {navGroups.map((group) => (
                <NavGroupSection key={group.title} group={group} onClose={handleClose} />
              ))}
            </div>
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
