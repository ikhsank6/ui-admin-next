"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/utils/cn";
import { type NavItem, navGroups, primaryNav } from "@/utils/nav-config";
import { NavGroupSection, NavItemRow } from "./nav-items";

export function AppSidebar() {
  const { expanded } = useSidebar();

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
          {primaryNav.map((item) => (
            <NavItemRow key={item.href} item={item} expanded={expanded} />
          ))}
          <Separator className="my-2 bg-sidebar-border" />
          {navGroups.map((group) => (
            <NavGroupSection key={group.title} group={group} expanded={expanded} />
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
