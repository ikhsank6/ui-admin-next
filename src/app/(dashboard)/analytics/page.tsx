import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Analitik",
  description: "Statistik dan laporan performa admin panel",
};

const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"];
const data = [65, 78, 52, 91, 84, 110, 96];
const maxVal = Math.max(...data);

const topPages = [
  { page: "/dashboard", views: 12_400, change: "+12%" },
  { page: "/users", views: 8_920, change: "+5%" },
  { page: "/settings", views: 4_310, change: "-2%" },
  { page: "/analytics", views: 3_870, change: "+28%" },
  { page: "/login", views: 2_140, change: "+1%" },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageBreadcrumb
        items={[
          { label: "Analitik", href: "/analytics" },
        ]}
      />
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analitik</h1>
        <p className="text-sm text-muted-foreground mt-1">Statistik dan tren performa platform</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar chart placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Kunjungan Bulanan</CardTitle>
            <CardDescription>7 bulan terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3 h-48">
              {data.map((val, i) => (
                <div key={months[i]} className="flex flex-col items-center gap-1 flex-1">
                  <span className="text-xs text-muted-foreground">{val}k</span>
                  <div
                    className="w-full rounded-t-md bg-primary/80 hover:bg-primary transition-colors"
                    style={{ height: `${(val / maxVal) * 100}%` }}
                    title={`${months[i]}: ${val}k`}
                  />
                  <span className="text-xs text-muted-foreground">{months[i]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top pages */}
        <Card>
          <CardHeader>
            <CardTitle>Halaman Terpopuler</CardTitle>
            <CardDescription>Berdasarkan jumlah kunjungan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topPages.map((row) => (
              <div key={row.page} className="flex items-center justify-between gap-2">
                <span className="text-sm font-mono text-muted-foreground truncate flex-1">
                  {row.page}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-medium">{row.views.toLocaleString("id-ID")}</span>
                  <Badge
                    variant={row.change.startsWith("+") ? "default" : "destructive"}
                    className="text-xs w-12 justify-center"
                  >
                    {row.change}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Bounce Rate", value: "42.3%", sub: "Rata-rata industri: 51%" },
          { label: "Waktu di Halaman", value: "3m 24s", sub: "+12s dari bulan lalu" },
          { label: "Konversi", value: "5.7%", sub: "+0.3pp bulan ini" },
          { label: "Pengguna Baru", value: "3,284", sub: "dari total 12,842" },
        ].map((card) => (
          <Card key={card.label}>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="text-xl font-bold mt-1">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
