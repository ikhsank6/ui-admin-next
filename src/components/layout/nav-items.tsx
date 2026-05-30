"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";
import type { NavGroup, NavItem } from "@/utils/nav-config";

// ─── NavItemRow ───────────────────────────────────────────────────────────────
// Dipakai di sidebar desktop (expanded/collapsed + tooltip) dan mobile (always expanded)

export function NavItemRow({
  item,
  expanded = true,
  onClose,
}: {
  item: NavItem;
  expanded?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  const content = (
    <Link
      href={item.href}
      onClick={onClose}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        expanded ? "w-full" : "w-12 justify-center",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
          : "text-sidebar-foreground hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="relative shrink-0">
        <item.icon className="h-5 w-5" />
        {!expanded && item.badge !== undefined && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold px-1 leading-none">
            {item.badge > 99 ? "99+" : item.badge}
          </span>
        )}
      </span>
      {expanded && <span className="flex-1 truncate">{item.title}</span>}
      {expanded && item.badge !== undefined && (
        <Badge variant="solid" color="primary" radius="full" className="ml-auto">
          {item.badge}
        </Badge>
      )}
    </Link>
  );

  if (!expanded) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">
          <p>{item.title}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

// ─── NavGroupSection ──────────────────────────────────────────────────────────

export function NavGroupSection({
  group,
  expanded = true,
  onClose,
}: {
  group: NavGroup;
  expanded?: boolean;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(true);

  if (!expanded) {
    return (
      <div className="flex flex-col items-center gap-1">
        {group.items.slice(0, 4).map((item) => (
          <NavItemRow key={item.href} item={item} expanded={false} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
      >
        {group.title}
        {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
      </button>
      {open && (
        <div className="flex flex-col gap-0.5 mt-0.5">
          {group.items.map((item) => (
            <NavItemRow key={item.href} item={item} expanded={true} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  );
}
