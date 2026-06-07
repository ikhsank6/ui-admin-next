import {
  BarChart3,
  BookOpen,
  Clock,
  FolderOpen,
  Home,
  LayoutGrid,
  type LucideIcon,
  Settings,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
};

// Satu section = satu ikon di rail kiri + satu daftar submenu di kolom kedua.
export type NavSection = {
  title: string; // overline header pada panel submenu
  icon: LucideIcon; // ikon di rail (kolom 1)
  items: NavItem[]; // submenu (kolom 2)
};

export const navSections: NavSection[] = [
  {
    title: "Beranda",
    icon: LayoutGrid,
    items: [
      { title: "Dashboard", href: "/dashboard", icon: Home },
      { title: "Analitik", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Manajemen Pengguna",
    icon: Users,
    items: [
      { title: "Daftar User", href: "/users", icon: Users, badge: 12 },
      { title: "Roles & Hak Akses", href: "/users/roles", icon: ShieldCheck },
    ],
  },
  {
    title: "Akun & Preferensi",
    icon: Settings,
    items: [
      { title: "Profil Saya", href: "/settings", icon: BookOpen },
      { title: "Aktivitas", href: "/settings/activity", icon: Clock },
      { title: "Favorit", href: "/settings/favorites", icon: Star },
      { title: "Arsip", href: "/settings/archive", icon: FolderOpen },
    ],
  },
];

// Semua leaf item (untuk pencarian / fallback flat list).
export const allNavItems: NavItem[] = navSections.flatMap((s) => s.items);

// Cari index section yang aktif berdasarkan path (prefix match terpanjang).
export function findActiveSectionIndex(pathname: string): number {
  let best = 0;
  let bestLen = -1;
  navSections.forEach((section, i) => {
    for (const item of section.items) {
      const match = pathname === item.href || pathname.startsWith(`${item.href}/`);
      if (match && item.href.length > bestLen) {
        best = i;
        bestLen = item.href.length;
      }
    }
  });
  return best;
}

export function isItemActive(pathname: string, href: string): boolean {
  if (pathname === href) return true;
  if (pathname.startsWith(`${href}/`)) {
    // Saring jika ada nav item lain yang lebih spesifik (href lebih panjang) yang juga cocok dengan pathname
    const hasMoreSpecificMatch = allNavItems.some((item) => {
      if (item.href === href) return false;
      const isMatch = pathname === item.href || pathname.startsWith(`${item.href}/`);
      return isMatch && item.href.length > href.length;
    });
    return !hasMoreSpecificMatch;
  }
  return false;
}

// Cari NavItem berdasarkan href — untuk sinkronisasi ikon breadcrumb dengan sidebar.
export function getNavItem(href: string): NavItem | undefined {
  return allNavItems.find((item) => item.href === href);
}

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
