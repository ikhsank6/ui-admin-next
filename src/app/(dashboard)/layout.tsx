"use client";

import { AppFooter } from "@/components/layout/app-footer";
import { AppNavbar } from "@/components/layout/app-navbar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarContext, useSidebarState } from "@/hooks/use-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useSidebarState();

  return (
    <SidebarContext.Provider value={sidebar}>
      <div className="flex flex-col h-screen overflow-hidden">
        <AppNavbar />
        <div className="flex flex-1 overflow-hidden min-h-0">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto flex flex-col">
            <div className="flex-1">{children}</div>
            <AppFooter />
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
