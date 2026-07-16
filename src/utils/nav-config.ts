import {
  BarChart3,
  BookOpen,
  Clock,
  FolderOpen,
  Home,
  LayoutDashboard,
  type LucideIcon,
  Settings,
  Star,
  Users,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export const primaryNav: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Analitik", href: "/analytics", icon: BarChart3 },
];

export const navGroups: NavGroup[] = [
  {
    title: "Pengguna",
    items: [
      { title: "Daftar User", href: "/users", icon: Users, badge: 12 },
      { title: "Roles", href: "/users/roles", icon: LayoutDashboard },
    ],
  },
  {
    title: "Anda",
    items: [
      { title: "Profil Saya", href: "/settings", icon: BookOpen },
      { title: "Aktivitas", href: "/settings/activity", icon: Clock },
      { title: "Favorit", href: "/settings/favorites", icon: Star },
      { title: "Arsip", href: "/settings/archive", icon: FolderOpen },
    ],
  },
];

export const bottomNav: NavItem[] = [{ title: "Pengaturan", href: "/settings", icon: Settings }];

export const categoryChips = [
  "Semua",
  "Pengguna Baru",
  "Aktif",
  "Tidak Aktif",
  "Admin",
  "Premium",
  "Verifikasi Pending",
  "Ditangguhkan",
];

export function getNavItem(key: string): NavItem | undefined {
  const allNavItems = [...primaryNav, ...navGroups.flatMap((g) => g.items), ...bottomNav];
  return allNavItems.find(
    (item) =>
      item.href === key ||
      item.title.toLowerCase() === key.toLowerCase() ||
      key.toLowerCase().includes(item.title.toLowerCase()) ||
      item.title.toLowerCase().includes(key.toLowerCase())
  );
}
