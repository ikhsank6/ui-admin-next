"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const SIDEBAR_COOKIE = "sidebar:state";

type SidebarContextValue = {
  expanded: boolean;
  mobileOpen: boolean;
  toggle: () => void;
  toggleMobile: () => void;
  setMobileOpen: (open: boolean) => void;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebarState(): SidebarContextValue {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const stored = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${SIDEBAR_COOKIE}=`))
      ?.split("=")[1];
    if (stored !== undefined) {
      setExpanded(stored === "true");
    }
  }, []);

  const toggle = useCallback(() => {
    setExpanded((prev) => {
      const next = !prev;
      // biome-ignore lint/suspicious/noDocumentCookie: persisting sidebar state in cookie
      document.cookie = `${SIDEBAR_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
      return next;
    });
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  return { expanded, mobileOpen, toggle, toggleMobile, setMobileOpen };
}

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
