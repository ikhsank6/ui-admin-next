"use client";

import { motion, useAnimation } from "framer-motion";
import { ChevronRight } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

export type BreadcrumbEntry = {
  label: string;
  href?: string;
};

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

export function PageBreadcrumb({ items }: { items: BreadcrumbEntry[] }) {
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Scroll terjadi di dalam <main>, bukan window
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

  return (
    <motion.nav
      ref={ref}
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      variants={container}
      initial="hidden"
      animate={controls}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground sm:gap-2.5">
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={crumb.label}>
              <motion.li
                data-slot="breadcrumb-item"
                className="inline-flex items-center gap-1.5"
                variants={itemVariants}
              >
                {isLast ? (
                  <span
                    data-slot="breadcrumb-page"
                    aria-current="page"
                    className="font-normal text-foreground"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <a
                    data-slot="breadcrumb-link"
                    href={crumb.href ?? "#"}
                    className={cn("transition-colors hover:text-foreground")}
                  >
                    {crumb.label}
                  </a>
                )}
              </motion.li>

              {!isLast && (
                <motion.li
                  role="presentation"
                  aria-hidden="true"
                  className="[&>svg]:size-3.5"
                  variants={sepVariants}
                >
                  <ChevronRight />
                </motion.li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </motion.nav>
  );
}
