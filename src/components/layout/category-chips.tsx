"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";

type CategoryChipsProps = {
  chips: string[];
};

export function CategoryChips({ chips }: CategoryChipsProps) {
  const [active, setActive] = useState(chips[0]);

  return (
    <nav
      aria-label="Filter kategori"
      className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 px-4"
    >
      {chips.map((chip) => (
        <button
          key={chip}
          type="button"
          onClick={() => setActive(chip)}
          className={cn(
            "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors whitespace-nowrap",
            active === chip
              ? "bg-foreground text-background"
              : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {chip}
        </button>
      ))}
    </nav>
  );
}
