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
        purple: "",
      },
      radius: {
        md: "rounded-md",
        full: "rounded-full",
      },
    },
    compoundVariants: [
      // ── Solid (warna semantik DJKA penuh) ─────────────────────
      { variant: "solid", color: "primary", class: "bg-[hsl(var(--primary))]" },
      { variant: "solid", color: "success", class: "bg-[hsl(var(--success))]" },
      { variant: "solid", color: "info", class: "bg-[hsl(var(--muted-foreground))]" },
      { variant: "solid", color: "warning", class: "bg-[hsl(var(--warning))]" },
      { variant: "solid", color: "danger", class: "bg-[hsl(var(--destructive))]" },
      // ── Soft (status pill — bg lembut + teks warna, pola DJKA) ─
      {
        variant: "soft",
        color: "primary",
        class:
          "bg-[hsl(var(--primary)/0.1)] border-[hsl(var(--primary)/0.25)] text-[hsl(var(--primary))] dark:text-[hsl(var(--sidebar-accent-foreground))]",
      },
      {
        variant: "soft",
        color: "success",
        class:
          "bg-[hsl(var(--success)/0.12)] border-[hsl(var(--success)/0.25)] text-[hsl(var(--success))]",
      },
      {
        variant: "soft",
        color: "info",
        class:
          "bg-[hsl(var(--muted-foreground)/0.12)] border-[hsl(var(--muted-foreground)/0.25)] text-[hsl(var(--muted-foreground))]",
      },
      {
        variant: "soft",
        color: "warning",
        class:
          "bg-[hsl(var(--warning)/0.12)] border-[hsl(var(--warning)/0.25)] text-[hsl(var(--warning))]",
      },
      {
        variant: "soft",
        color: "danger",
        class:
          "bg-[hsl(var(--destructive)/0.12)] border-[hsl(var(--destructive)/0.25)] text-[hsl(var(--destructive))]",
      },
      // ── Solid purple ──────────────────────────────────────────
      { variant: "solid", color: "purple", class: "bg-[hsl(var(--purple))]" },
      // ── Soft purple ───────────────────────────────────────────
      {
        variant: "soft",
        color: "purple",
        class:
          "bg-[hsl(var(--purple)/0.12)] border-[hsl(var(--purple)/0.25)] text-[hsl(var(--purple))]",
      },
      // ── Plain (outline tipis + teks warna) ────────────────────
      {
        variant: "plain",
        color: "primary",
        class: "border-[hsl(var(--primary)/0.5)] text-[hsl(var(--primary))]",
      },
      {
        variant: "plain",
        color: "success",
        class: "border-[hsl(var(--success)/0.5)] text-[hsl(var(--success))]",
      },
      {
        variant: "plain",
        color: "info",
        class: "border-[hsl(var(--muted-foreground)/0.5)] text-[hsl(var(--muted-foreground))]",
      },
      {
        variant: "plain",
        color: "warning",
        class: "border-[hsl(var(--warning)/0.5)] text-[hsl(var(--warning))]",
      },
      {
        variant: "plain",
        color: "danger",
        class: "border-[hsl(var(--destructive)/0.5)] text-[hsl(var(--destructive))]",
      },
      {
        variant: "plain",
        color: "purple",
        class: "border-[hsl(var(--purple)/0.5)] text-[hsl(var(--purple))]",
      },
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
  dot = false,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
    dot?: boolean;
    color?: "none" | "primary" | "success" | "info" | "warning" | "danger" | "purple";
  }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, color, radius }), className)}
      {...props}
    >
      {dot && !asChild && (
        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" />
      )}
      {children}
    </Comp>
  );
}

export { Badge, badgeVariants };
