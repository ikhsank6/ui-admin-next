"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const SIDEBAR_COOKIE = "sidebar:state";

type SidebarContextValue = {
  expanded: boolean;
  mobileOpen: boolean;
  toggle: () => void;
  open: () => void;
  toggleMobile: () => void;
  setMobileOpen: (open: boolean) => void;
  selectedSection: number;
  setSelectedSection: (index: number) => void;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebarState(): SidebarContextValue {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(0);

  useEffect(() => {
    const stored = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${SIDEBAR_COOKIE}=`))
      ?.split("=")[1];
    if (stored !== undefined) {
      setExpanded(stored === "true");
    }
  }, []);

  const persistExpanded = useCallback((next: boolean) => {
    // biome-ignore lint/suspicious/noDocumentCookie: persisting sidebar state in cookie
    document.cookie = `${SIDEBAR_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
  }, []);

  const toggle = useCallback(() => {
    setExpanded((prev) => {
      const next = !prev;
      persistExpanded(next);
      return next;
    });
  }, [persistExpanded]);

  const open = useCallback(() => {
    setExpanded(true);
    persistExpanded(true);
  }, [persistExpanded]);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  return {
    expanded,
    mobileOpen,
    toggle,
    open,
    toggleMobile,
    setMobileOpen,
    selectedSection,
    setSelectedSection,
  };
}

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
