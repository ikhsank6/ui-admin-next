"use client";

import { AppFooter } from "@/components/layout/app-footer";
import { AppNavbar } from "@/components/layout/app-navbar";
import { SidebarPanel, SidebarRail } from "@/components/layout/app-sidebar";
import { SidebarContext, useSidebarState } from "@/hooks/use-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useSidebarState();

  return (
    <SidebarContext.Provider value={sidebar}>
      <div className="flex h-screen overflow-hidden">
        {/* Kolom 1 — Rail ikon full-height */}
        <SidebarRail />

        {/* Kolom kanan — topbar + (submenu + konten) */}
        <div className="flex flex-1 flex-col overflow-hidden min-w-0">
          <AppNavbar />
          <div className="flex flex-1 overflow-hidden min-h-0">
            <SidebarPanel />
            <main className="flex-1 overflow-y-auto flex flex-col min-w-0">
              <div className="flex-1">{children}</div>
              <AppFooter />
            </main>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
