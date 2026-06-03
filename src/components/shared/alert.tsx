"use client";

import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import type * as React from "react";
import { cn } from "@/utils/cn";

// ─── DJKA Alert — Sistem Alert Bertingkat (Guideline §Organisme) ───────────────
// Setiap alert wajib memiliki: judul jelas (title) + deskripsi actionable (description).
// Letakkan di bagian paling atas konten halaman, sebelum form atau tabel.
// Jangan tampilkan lebih dari 2 alert sekaligus.

type AlertVariant = "info" | "success" | "warning" | "danger";

const CONFIG: Record<
  AlertVariant,
  {
    icon: React.ElementType;
    bg: string;
    border: string;
    titleColor: string;
    textColor: string;
    iconColor: string;
  }
> = {
  info: {
    icon: Info,
    bg: "bg-[hsl(var(--primary)/0.06)]",
    border: "border-[hsl(var(--primary)/0.35)] border-l-[hsl(var(--primary))]",
    titleColor: "text-[hsl(var(--primary))]",
    textColor: "text-[hsl(var(--primary)/0.85)]",
    iconColor: "text-[hsl(var(--primary))]",
  },
  success: {
    icon: CheckCircle,
    bg: "bg-[hsl(var(--success)/0.08)]",
    border: "border-[hsl(var(--success)/0.35)] border-l-[hsl(var(--success))]",
    titleColor: "text-[hsl(var(--success)/0.9)]",
    textColor: "text-[hsl(var(--success)/0.8)]",
    iconColor: "text-[hsl(var(--success))]",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-[hsl(var(--warning)/0.08)]",
    border: "border-[hsl(var(--warning)/0.35)] border-l-[hsl(var(--warning))]",
    titleColor: "text-[hsl(var(--warning)/0.9)]",
    textColor: "text-[hsl(var(--warning)/0.8)]",
    iconColor: "text-[hsl(var(--warning))]",
  },
  danger: {
    icon: XCircle,
    bg: "bg-[hsl(var(--destructive)/0.07)]",
    border: "border-[hsl(var(--destructive)/0.35)] border-l-[hsl(var(--destructive))]",
    titleColor: "text-[hsl(var(--destructive)/0.9)]",
    textColor: "text-[hsl(var(--destructive)/0.8)]",
    iconColor: "text-[hsl(var(--destructive))]",
  },
};

interface AlertProps {
  variant?: AlertVariant;
  title: string;
  description?: React.ReactNode;
  className?: string;
}

export function Alert({ variant = "info", title, description, className }: AlertProps) {
  const cfg = CONFIG[variant];
  const Icon = cfg.icon;

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-xl border border-l-4 px-4 py-3.5",
        cfg.bg,
        cfg.border,
        className
      )}
    >
      <Icon
        className={cn("mt-0.5 h-[18px] w-[18px] shrink-0", cfg.iconColor)}
        strokeWidth={2}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-1 min-w-0">
        <p className={cn("text-sm font-semibold leading-snug", cfg.titleColor)}>{title}</p>
        {description && (
          <p className={cn("text-sm leading-relaxed", cfg.textColor)}>{description}</p>
        )}
      </div>
    </div>
  );
}
