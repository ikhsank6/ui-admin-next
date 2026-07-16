import {
  BarChart3,
  BookOpen,
  Building2,
  ClipboardCheck,
  ClipboardCopy,
  ClipboardList,
  Database,
  FileArchive,
  FileBadge,
  FileCheck,
  FileSpreadsheet,
  FileStack,
  FileText,
  FolderOpen,
  Layers,
  LayoutDashboard,
  Lock,
  type LucideIcon,
  Mail,
  Receipt,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react";

// ─── MenuItem — Tipe flat dengan role‑based access control ──────────────────────

export type MenuItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  roles: string[];
  permissions?: string[];
  children?: MenuItem[];
};

export const allMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    roles: [
      "pemohon",
      "staff",
      "koordinator",
      "kasubdit",
      "direktur",
      "superadmin",
      "balai",
      "sesdit",
      "menteri",
      "dirjen",
      "sekjen",
      "hukum",
    ],
  },
  {
    id: "permohonan",
    label: "Permohonan",
    icon: FileText,
    href: "/dashboard/permohonan",
    roles: ["pemohon", "staff", "superadmin"],
  },
  {
    id: "monitoring-permohonan",
    label: "Monitoring Permohonan",
    icon: ClipboardList,
    href: "/dashboard/monitoring-permohonan",
    roles: ["superadmin"],
  },
  {
    id: "perusahaan",
    label: "Perusahaan",
    icon: Building2,
    href: "/dashboard/perusahaan",
    roles: ["superadmin", "koordinator", "kasubdit", "direktur"],
  },
  {
    id: "rekap-data",
    label: "Rekap Data",
    icon: FileSpreadsheet,
    href: "/dashboard/rekap-data",
    roles: ["superadmin"],
  },
  {
    id: "user-management",
    label: "User Management",
    icon: Users,
    href: "/users",
    roles: ["superadmin"],
    permissions: ["admin.user_management"],
  },
  {
    id: "role-management",
    label: "Role Management",
    icon: Shield,
    href: "/users/roles",
    roles: ["superadmin"],
    permissions: ["admin.role_management"],
  },
  {
    id: "master",
    label: "Master",
    icon: Settings,
    href: "/dashboard/master",
    roles: ["superadmin"],
    children: [
      {
        id: "master-layanan",
        label: "Layanan",
        icon: FileBadge,
        href: "/dashboard/master/layanan",
        roles: ["superadmin"],
      },
      {
        id: "master-bidang",
        label: "Bidang",
        icon: FolderOpen,
        href: "/dashboard/master/bidang",
        roles: ["superadmin"],
      },
      {
        id: "master-dokumen",
        label: "Dokumen",
        icon: FileCheck,
        href: "/dashboard/master/dokumen",
        roles: ["superadmin"],
      },
      {
        id: "master-jenis",
        label: "Jenis",
        icon: FileBadge,
        href: "/dashboard/master/jenis",
        roles: ["superadmin"],
      },
      {
        id: "master-jenis-detail",
        label: "Jenis Detail",
        icon: Layers,
        href: "/dashboard/master/jenis-detail",
        roles: ["superadmin"],
      },
      {
        id: "master-tarif",
        label: "Tarif",
        icon: Receipt,
        href: "/dashboard/master/tarif",
        roles: ["superadmin"],
      },
    ],
  },
  {
    id: "profil",
    label: "Profil",
    icon: User,
    href: "/dashboard/profil",
    roles: ["superadmin"],
    children: [
      {
        id: "profil-badan-usaha",
        label: "Badan Usaha",
        icon: Building2,
        href: "/dashboard/profil/badan-usaha",
        roles: ["superadmin"],
      },
      {
        id: "profil-instansi",
        label: "Instansi",
        icon: Database,
        href: "/dashboard/profil/instansi",
        roles: ["superadmin"],
      },
    ],
  },
  {
    id: "laporan",
    label: "Laporan",
    icon: BarChart3,
    href: "/dashboard/laporan",
    roles: ["superadmin", "koordinator", "kasubdit", "direktur"],
    children: [
      {
        id: "laporan-permohonan",
        label: "Laporan Permohonan",
        icon: FileText,
        href: "/dashboard/laporan/permohonan",
        roles: ["superadmin", "koordinator", "kasubdit", "direktur"],
      },
      {
        id: "laporan-surat-undangan",
        label: "Laporan Surat Undangan",
        icon: Mail,
        href: "/dashboard/laporan/surat-undangan",
        roles: ["superadmin", "koordinator", "kasubdit", "direktur"],
      },
      {
        id: "laporan-surat-penugasan",
        label: "Laporan Surat Penugasan",
        icon: ClipboardCheck,
        href: "/dashboard/laporan/surat-penugasan",
        roles: ["superadmin", "koordinator", "kasubdit", "direktur"],
      },
      {
        id: "laporan-nota-dinas",
        label: "Laporan Nota Dinas",
        icon: FileStack,
        href: "/dashboard/laporan/nota-dinas",
        roles: ["superadmin", "koordinator", "kasubdit", "direktur"],
      },
      {
        id: "laporan-pnbp",
        label: "Laporan PNBP",
        icon: Receipt,
        href: "/dashboard/laporan/pnbp",
        roles: ["superadmin", "koordinator", "kasubdit", "direktur"],
      },
    ],
  },
  {
    id: "revisi-hasil-survey",
    label: "Revisi Hasil Survey",
    icon: ClipboardCopy,
    href: "/dashboard/revisi-hasil-survey",
    roles: ["pemohon"],
  },
  {
    id: "pnbp",
    label: "PNBP",
    icon: Receipt,
    href: "/dashboard/pnbp",
    roles: ["pemohon"],
  },
  {
    id: "data-sk",
    label: "Data SK",
    icon: FileArchive,
    href: "/dashboard/data-sk",
    roles: ["pemohon", "koordinator", "kasubdit", "direktur"],
  },
  {
    id: "surat-undangan",
    label: "Surat Undangan",
    icon: Mail,
    href: "/dashboard/surat-undangan",
    roles: ["koordinator", "kasubdit", "direktur", "staff"],
  },
  {
    id: "surat-penugasan",
    label: "Surat Penugasan",
    icon: ClipboardCheck,
    href: "/dashboard/surat-penugasan",
    roles: ["koordinator", "kasubdit", "direktur", "staff", "balai"],
  },
  {
    id: "nota-dinas-sk",
    label: "Nota Dinas & SK",
    icon: FileBadge,
    href: "/dashboard/nota-dinas-sk",
    roles: ["koordinator", "kasubdit", "direktur"],
  },
  {
    id: "rapat-teknis",
    label: "Rapat Teknis",
    icon: BookOpen,
    href: "/dashboard/rapat-teknis",
    roles: ["staff"],
  },
  {
    id: "laporan-survey",
    label: "Laporan Survey",
    icon: BarChart3,
    href: "/dashboard/laporan-survey",
    roles: ["staff", "balai"],
  },
  {
    id: "nota-dinas",
    label: "Nota Dinas",
    icon: FileStack,
    href: "/dashboard/nota-dinas",
    roles: ["staff"],
  },
  {
    id: "data-sk-proses",
    label: "Data SK",
    icon: FileArchive,
    href: "/dashboard/data-sk",
    roles: ["staff"],
    children: [
      {
        id: "data-sk-proses-sesdit",
        label: "Proses Sesdit",
        icon: ClipboardList,
        href: "/dashboard/data-sk/proses-sesdit",
        roles: ["staff"],
      },
      {
        id: "data-sk-penyerahan-sk",
        label: "Penyerahan SK",
        icon: FileCheck,
        href: "/dashboard/data-sk/penyerahan-sk",
        roles: ["staff"],
      },
      {
        id: "data-sk-sk-terbit",
        label: "SK Terbit",
        icon: FileBadge,
        href: "/dashboard/data-sk/sk-terbit",
        roles: ["staff"],
      },
      {
        id: "data-sk-sk-lampau",
        label: "SK Lampau",
        icon: FileArchive,
        href: "/dashboard/data-sk/sk-lampau",
        roles: ["staff"],
      },
    ],
  },
  {
    id: "proses-sesdit",
    label: "Proses Sesdit",
    icon: ClipboardList,
    href: "/dashboard/proses-sesdit",
    roles: ["sesdit"],
  },
  {
    id: "profil-pegawai",
    label: "Profil Pegawai",
    icon: User,
    href: "/dashboard/profil-pegawai",
    roles: [
      "pemohon",
      "staff",
      "koordinator",
      "kasubdit",
      "direktur",
      "superadmin",
      "balai",
      "sesdit",
      "menteri",
      "dirjen",
      "sekjen",
      "hukum",
    ],
  },
  {
    id: "ubah-password",
    label: "Ubah Password",
    icon: Lock,
    href: "/dashboard/ubah-password",
    roles: [
      "pemohon",
      "staff",
      "koordinator",
      "kasubdit",
      "direktur",
      "superadmin",
      "balai",
      "sesdit",
      "menteri",
      "dirjen",
      "sekjen",
      "hukum",
    ],
  },
];

// ─── Helper: filter menu items berdasarkan role ─────────────────────────────────

export function getMenuItemsForRole(role: string): MenuItem[] {
  return allMenuItems
    .filter((item) => item.roles.includes(role))
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) => child.roles.includes(role)),
    }));
}

// Flatten semua menu items (termasuk children) untuk pencarian.
export function flattenMenuItems(items: MenuItem[] = allMenuItems): MenuItem[] {
  return items.flatMap((item) => [item, ...(item.children ?? [])]);
}

// ─── NavItem / NavSection — backward‑compatible dengan sidebar ──────────────────

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

// Helper untuk konversi MenuItem → NavItem
function menuToNav(m: MenuItem): NavItem {
  return { title: m.label, href: m.href, icon: m.icon };
}

// Grup menu items ke dalam NavSection untuk sidebar rail + panel.
// Mapping: allMenuItems → navSections berdasarkan kategori logis.
export const navSections: NavSection[] = [
  {
    title: "Beranda",
    icon: LayoutDashboard,
    items: [menuToNav(allMenuItems.find((m) => m.id === "dashboard")!)],
  },
  {
    title: "Permohonan",
    icon: FileText,
    items: [
      menuToNav(allMenuItems.find((m) => m.id === "permohonan")!),
      menuToNav(allMenuItems.find((m) => m.id === "monitoring-permohonan")!),
      menuToNav(allMenuItems.find((m) => m.id === "revisi-hasil-survey")!),
      menuToNav(allMenuItems.find((m) => m.id === "pnbp")!),
    ],
  },
  {
    title: "Operasional",
    icon: ClipboardList,
    items: [
      menuToNav(allMenuItems.find((m) => m.id === "perusahaan")!),
      menuToNav(allMenuItems.find((m) => m.id === "rekap-data")!),
      menuToNav(allMenuItems.find((m) => m.id === "surat-undangan")!),
      menuToNav(allMenuItems.find((m) => m.id === "surat-penugasan")!),
      menuToNav(allMenuItems.find((m) => m.id === "nota-dinas-sk")!),
      menuToNav(allMenuItems.find((m) => m.id === "rapat-teknis")!),
      menuToNav(allMenuItems.find((m) => m.id === "laporan-survey")!),
      menuToNav(allMenuItems.find((m) => m.id === "nota-dinas")!),
      menuToNav(allMenuItems.find((m) => m.id === "data-sk")!),
      menuToNav(allMenuItems.find((m) => m.id === "proses-sesdit")!),
    ],
  },
  {
    title: "Manajemen",
    icon: Users,
    items: [
      menuToNav(allMenuItems.find((m) => m.id === "user-management")!),
      menuToNav(allMenuItems.find((m) => m.id === "role-management")!),
    ],
  },
  {
    title: "Master Data",
    icon: Settings,
    items: [...(allMenuItems.find((m) => m.id === "master")?.children ?? []).map(menuToNav)],
  },
  {
    title: "Profil",
    icon: User,
    items: [...(allMenuItems.find((m) => m.id === "profil")?.children ?? []).map(menuToNav)],
  },
  {
    title: "Laporan",
    icon: BarChart3,
    items: [...(allMenuItems.find((m) => m.id === "laporan")?.children ?? []).map(menuToNav)],
  },
  {
    title: "Akun & Preferensi",
    icon: Lock,
    items: [
      menuToNav(allMenuItems.find((m) => m.id === "profil-pegawai")!),
      menuToNav(allMenuItems.find((m) => m.id === "ubah-password")!),
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
