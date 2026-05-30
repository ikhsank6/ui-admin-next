import { Activity, DollarSign, TrendingUp, Users } from "lucide-react";
import type { Metadata } from "next";
import { ContentCard } from "@/components/shared/content-card";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { PieChart } from "@/components/shared/pie-chart";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Ringkasan aktivitas dan statistik admin panel",
};

const stats = [
  {
    title: "Total Pengguna",
    value: "12,842",
    icon: Users,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    valueColor: "text-blue-600",
  },
  {
    title: "Pendapatan",
    value: "Rp 284,5 jt",
    icon: DollarSign,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
    valueColor: "text-green-600",
  },
  {
    title: "Pertumbuhan",
    value: "23.8%",
    icon: TrendingUp,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
    valueColor: "text-orange-600",
  },
  {
    title: "Aktivitas Hari Ini",
    value: "1,429",
    icon: Activity,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
    valueColor: "text-red-600",
  },
];

const userDistribution = [
  { label: "Admin", value: 12 },
  { label: "Editor", value: 38 },
  { label: "Viewer", value: 150 },
  { label: "Moderator", value: 25 },
  { label: "Analyst", value: 47 },
];

const recentUsers = [
  { name: "Andi Pratama", email: "andi@example.com", role: "Admin", status: "Aktif" },
  { name: "Siti Rahayu", email: "siti@example.com", role: "Editor", status: "Aktif" },
  { name: "Budi Santoso", email: "budi@example.com", role: "Viewer", status: "Pending" },
  { name: "Dewi Kusuma", email: "dewi@example.com", role: "Editor", status: "Aktif" },
  { name: "Raka Wijaya", email: "raka@example.com", role: "Viewer", status: "Ditangguhkan" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageBreadcrumb items={[{ label: "Beranda" }]} />

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="px-4 py-1">
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 ${stat.iconBg}`}
                >
                  <stat.icon className={`h-3.5 w-3.5 ${stat.iconColor}`} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
              </div>
              <p className={`text-xl font-bold ${stat.valueColor}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent users */}
        <ContentCard
          title="Pengguna Terbaru"
          description="5 pengguna yang baru bergabung"
          collapsible
        >
          <div className="space-y-3 p-6">
            {recentUsers.map((user) => (
              <div
                key={user.email}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                    {user.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground hidden sm:block">{user.role}</span>
                  <Badge
                    variant={
                      user.status === "Aktif"
                        ? "plain"
                        : user.status === "Pending"
                          ? "soft"
                          : "solid"
                    }
                    color={
                      user.status === "Aktif"
                        ? "success"
                        : user.status === "Pending"
                          ? "info"
                          : "danger"
                    }
                    className="text-xs"
                  >
                    {user.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ContentCard>

        {/* User distribution pie chart */}
        <ContentCard title="Distribusi Pengguna" description="Berdasarkan role" collapsible>
          <PieChart data={userDistribution} height={380} />
        </ContentCard>
      </div>
    </div>
  );
}
