import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { RolesView } from "./roles-view";

export const metadata: Metadata = {
  title: "Roles",
  description: "Kelola role dan hak akses pengguna",
};

export default function RolesPage() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <PageBreadcrumb
        items={[
          { label: "Roles & Hak Akses", href: "/users/roles" },
        ]}
      />
      <RolesView />
    </div>
  );
}
