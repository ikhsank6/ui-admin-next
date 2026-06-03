import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { UsersView } from "./users-view";

export const metadata: Metadata = {
  title: "Pengguna",
  description: "Kelola semua pengguna admin panel",
};

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <PageBreadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Daftar User", href: "/users" },
        ]}
      />
      <UsersView />
    </div>
  );
}
