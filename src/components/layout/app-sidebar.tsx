"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/utils/cn";
import { type NavItem, navGroups, primaryNav } from "@/utils/nav-config";
import { NavGroupSection, NavItemRow } from "./nav-items";

export function AppSidebar() {
  const { expanded } = useSidebar();
  const [query, setQuery] = useState("");

  const allItems: NavItem[] = [...primaryNav, ...navGroups.flatMap((g) => g.items)];

  const filtered = query.trim()
    ? allItems.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
    : null;

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col bg-sidebar border-r border-sidebar-border transition-[width] duration-300 ease-in-out shrink-0",
        expanded ? "w-60" : "w-[72px]"
      )}
      aria-label="Navigasi utama"
    >
      <ScrollArea className="flex-1">
        <div className={cn("flex flex-col gap-1 py-3", expanded ? "px-3" : "px-3 items-center")}>
          {/* Search — hanya tampil saat expanded */}
          {expanded && (
            <div className="relative mb-1">
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
          )}

          {filtered ? (
            /* Hasil pencarian — flat list */
            filtered.length > 0 ? (
              <div className="flex flex-col gap-0.5">
                {filtered.map((item) => (
                  <NavItemRow key={item.href} item={item} expanded={expanded} />
                ))}
              </div>
            ) : (
              <p className="px-3 py-4 text-xs text-muted-foreground text-center">Tidak ditemukan</p>
            )
          ) : (
            /* Navigasi normal */
            <>
              {primaryNav.map((item) => (
                <NavItemRow key={item.href} item={item} expanded={expanded} />
              ))}
              <Separator className="my-2 bg-sidebar-border" />
              {navGroups.map((group) => (
                <NavGroupSection key={group.title} group={group} expanded={expanded} />
              ))}
            </>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
