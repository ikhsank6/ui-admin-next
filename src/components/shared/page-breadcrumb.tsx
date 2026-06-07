"use client";

import { motion, useAnimation } from "framer-motion";
import { ChevronRight } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import { getNavItem } from "@/utils/nav-config";

// ─── Tipe ──────────────────────────────────────────────────────────────────────
// Hanya nilai serializable — icon diambil otomatis dari navSections berdasarkan href,
// sehingga selalu konsisten dengan sidebar (Guideline §Layout aturan 4).

export type BreadcrumbEntry = {
  label: string;
  href: string; // wajib — digunakan untuk resolusi ikon dari navSections
};

// ─── Animasi ───────────────────────────────────────────────────────────────────

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

const sepVariants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" as const } },
};

// ─── Komponen ──────────────────────────────────────────────────────────────────

export function PageBreadcrumb({ items }: { items: BreadcrumbEntry[] }) {
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Scroll terjadi di dalam <main>, bukan window (CLAUDE.md constraint).
    const scrollRoot = document.querySelector("main");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      { root: scrollRoot, threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [controls]);

  const lastCrumb = items[items.length - 1];
  if (!lastCrumb) return null;

  // Resolusi ikon dari navSections — konsisten dengan sidebar.
  const Icon = getNavItem(lastCrumb.href)?.icon;

  return (
    <motion.nav
      ref={ref}
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      variants={container}
      initial="hidden"
      animate={controls}
    >
      <ol className="flex items-center text-sm text-muted-foreground">
        <motion.li
          data-slot="breadcrumb-item"
          className="inline-flex items-center"
          variants={itemVariants}
        >
          <span
            data-slot="breadcrumb-page"
            aria-current="page"
            className="inline-flex items-center gap-1.5 font-semibold text-foreground"
          >
            {Icon && (
              <Icon
                className="h-4 w-4 text-primary shrink-0"
                strokeWidth={2}
                aria-hidden="true"
              />
            )}
            {lastCrumb.label}
          </span>
        </motion.li>
      </ol>
    </motion.nav>
  );
}
