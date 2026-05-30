import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";

import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        // ── Legacy / semantic ──────────────────────────────────
        default: "bg-primary text-primary-foreground border-transparent [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground border-transparent [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white border-transparent dark:bg-destructive/60 [a&]:hover:bg-destructive/90",
        outline: "border-border text-foreground",
        ghost: "border-transparent [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        // ── Color styles ───────────────────────────────────────
        solid: "border-transparent text-white",
        soft: "",
        plain: "bg-transparent",
      },
      color: {
        none: "",
        primary: "",
        success: "",
        info: "",
        warning: "",
        danger: "",
      },
      radius: {
        md: "rounded-md",
        full: "rounded-full",
      },
    },
    compoundVariants: [
      // ── Solid ─────────────────────────────────────────────────
      { variant: "solid", color: "primary", class: "bg-blue-500" },
      { variant: "solid", color: "success", class: "bg-green-500" },
      { variant: "solid", color: "info", class: "bg-gray-400 dark:bg-gray-500" },
      { variant: "solid", color: "warning", class: "bg-amber-400" },
      { variant: "solid", color: "danger", class: "bg-rose-400" },
      // ── Soft ──────────────────────────────────────────────────
      {
        variant: "soft",
        color: "primary",
        class: "bg-blue-500/15 border-blue-500/30 text-blue-600 dark:text-blue-400",
      },
      {
        variant: "soft",
        color: "success",
        class: "bg-green-500/15 border-green-500/30 text-green-600 dark:text-green-400",
      },
      {
        variant: "soft",
        color: "info",
        class: "bg-gray-500/15 border-gray-500/30 text-gray-600 dark:text-gray-400",
      },
      {
        variant: "soft",
        color: "warning",
        class: "bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400",
      },
      {
        variant: "soft",
        color: "danger",
        class: "bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400",
      },
      // ── Plain ─────────────────────────────────────────────────
      { variant: "plain", color: "primary", class: "border-blue-500/60 text-blue-500" },
      { variant: "plain", color: "success", class: "border-green-500/60 text-green-500" },
      { variant: "plain", color: "info", class: "border-gray-500/60 text-gray-500" },
      { variant: "plain", color: "warning", class: "border-amber-500/60 text-amber-500" },
      { variant: "plain", color: "danger", class: "border-rose-500/60 text-rose-500" },
    ],
    defaultVariants: {
      variant: "default",
      color: "none",
      radius: "full",
    },
  }
);

function Badge({
  className,
  variant = "default",
  color = "none",
  radius = "full",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, color, radius }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
