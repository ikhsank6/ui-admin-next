"use client";

import { PanelLeftClose } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/utils/cn";
import { findActiveSectionIndex, isItemActive, navSections } from "@/utils/nav-config";

// ─── Kolom 1 — Rail ikon (main menu, full-height, selalu 72px) ──────────────────

export function SidebarRail() {
  const { selectedSection, setSelectedSection, open } = useSidebar();
  const pathname = usePathname();
  const activeIndex = useMemo(() => findActiveSectionIndex(pathname), [pathname]);

  // Sinkronkan section terpilih dengan route saat navigasi berubah.
  useEffect(() => setSelectedSection(activeIndex), [activeIndex, setSelectedSection]);

  // Klik ikon rail: pilih section + selalu tampilkan panel submenu (col 2).
  function handleSelect(index: number) {
    setSelectedSection(index);
    open();
  }

  return (
    <nav
      className="hidden md:flex h-full w-[72px] shrink-0 flex-col items-center gap-1.5 bg-sidebar pt-2.5 pb-4"
      aria-label="Menu utama"
    >
      {navSections.map((s, i) => {
        const isShown = i === selectedSection;
        return (
          <Tooltip key={s.title}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => handleSelect(i)}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
                  isShown
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground"
                )}
                aria-label={s.title}
                aria-current={i === activeIndex ? "true" : undefined}
              >
                <s.icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">{s.title}</TooltipContent>
          </Tooltip>
        );
      })}
    </nav>
  );
}

// ─── Mobile — rail + panel dalam drawer (sama dengan desktop) ───────────────────

export function MobileSidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { selectedSection, setSelectedSection } = useSidebar();
  const pathname = usePathname();
  const activeIndex = useMemo(() => findActiveSectionIndex(pathname), [pathname]);

  useEffect(() => setSelectedSection(activeIndex), [activeIndex, setSelectedSection]);

  const section = navSections[selectedSection] ?? navSections[0];

  return (
    <div className="flex flex-1 min-h-0">
      {/* Kolom 1 — Rail ikon */}
      <nav
        className="flex w-[72px] shrink-0 flex-col items-center gap-1.5 bg-sidebar pt-3 pb-4"
        aria-label="Menu utama"
      >
        {navSections.map((s, i) => {
          const isShown = i === selectedSection;
          return (
            <button
              key={s.title}
              type="button"
              onClick={() => setSelectedSection(i)}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
                isShown
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground"
              )}
              aria-label={s.title}
              aria-current={i === activeIndex ? "true" : undefined}
            >
              <s.icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </button>
          );
        })}
      </nav>

      {/* Kolom 2 — Panel submenu */}
      <ScrollArea className="flex-1 bg-card">
        <div className="flex flex-col gap-0.5 p-3">
          <p className="px-3 pt-2 pb-3 text-[11px] font-bold uppercase tracking-[0.8px] text-muted-foreground">
            {section.title}
          </p>
          {section.items.map((item) => {
            const active = isItemActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary-light text-primary font-semibold"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                )}
                aria-current={active ? "page" : undefined}
              >
                <item.icon
                  className="h-[18px] w-[18px] shrink-0"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="flex-1 truncate">{item.title}</span>
                {item.badge !== undefined && (
                  <Badge variant="soft" color="primary" radius="full" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

// ─── Kolom 2 — Panel submenu (kontekstual, dapat ditutup) ───────────────────────

export function SidebarPanel() {
  const { expanded, toggle, selectedSection } = useSidebar();
  const pathname = usePathname();
  const section = navSections[selectedSection] ?? navSections[0];

  return (
    <div
      className={cn(
        "hidden md:block relative h-full bg-card border-r border-border transition-[width] duration-300 ease-in-out overflow-hidden",
        expanded ? "w-60" : "w-0"
      )}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label="Tutup submenu"
        className="absolute right-2 top-3 z-10 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground shadow-sm hover:text-foreground hover:bg-muted transition-colors"
      >
        <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
      </button>

      <ScrollArea className="h-full">
        <div className="flex w-60 flex-col gap-0.5 p-3">
          <p className="px-3 pt-2 pb-3 pr-9 text-[11px] font-bold uppercase tracking-[0.8px] text-muted-foreground">
            {section.title}
          </p>
          {section.items.map((item) => {
            const active = isItemActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary-light text-primary font-semibold"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                )}
                aria-current={active ? "page" : undefined}
              >
                <item.icon
                  className="h-[18px] w-[18px] shrink-0"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="flex-1 truncate">{item.title}</span>
                {item.badge !== undefined && (
                  <Badge variant="soft" color="primary" radius="full" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
