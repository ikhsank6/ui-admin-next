"use client";

import { ChevronDown } from "lucide-react";
import type * as React from "react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/cn";

type ContentCardProps = {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
};

export function ContentCard({
  title,
  description,
  actions,
  children,
  className,
  collapsible = false,
  defaultOpen = true,
}: ContentCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const hasHeader = title || description || actions || collapsible;

  if (collapsible) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className={cn("rounded-xl border bg-card overflow-hidden", className)}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-6 py-4 group">
            <div className="flex flex-col gap-0.5 text-left">
              {title && <h2 className="text-base font-semibold">{title}</h2>}
              {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {actions && <div className="flex items-center gap-2">{actions}</div>}
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform duration-200",
                  open ? "rotate-180" : "rotate-0"
                )}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
            <Separator />
            {children}
          </CollapsibleContent>
        </div>
      </Collapsible>
    );
  }

  return (
    <div className={cn("rounded-xl border bg-card overflow-hidden", className)}>
      {hasHeader && (
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b">
          <div className="flex flex-col gap-0.5">
            {title && <h2 className="text-base font-semibold">{title}</h2>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
