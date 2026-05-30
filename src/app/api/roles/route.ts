import { type NextRequest, NextResponse } from "next/server";
import type { Role } from "@/lib/api/roles";

const ROLES: Role[] = [
  {
    id: "r-001",
    name: "Admin",
    description: "Akses penuh ke seluruh fitur dan pengaturan sistem",
    type: "Sistem",
    userCount: 5,
    permissions: [
      "Baca",
      "Tulis",
      "Hapus",
      "Kelola Pengguna",
      "Kelola Role",
      "Lihat Analitik",
      "Ekspor Data",
      "Pengaturan Sistem",
    ],
    createdAt: "2025-01-01",
  },
  {
    id: "r-002",
    name: "Editor",
    description: "Dapat membuat dan mengedit konten, tidak bisa mengelola pengguna",
    type: "Sistem",
    userCount: 14,
    permissions: ["Baca", "Tulis", "Hapus", "Lihat Analitik"],
    createdAt: "2025-01-01",
  },
  {
    id: "r-003",
    name: "Viewer",
    description: "Hanya bisa melihat data, tidak dapat melakukan perubahan",
    type: "Sistem",
    userCount: 28,
    permissions: ["Baca"],
    createdAt: "2025-01-01",
  },
  {
    id: "r-004",
    name: "Content Manager",
    description: "Mengelola dan mempublikasikan konten dengan akses penuh ke modul konten",
    type: "Kustom",
    userCount: 3,
    permissions: ["Baca", "Tulis", "Hapus", "Ekspor Data"],
    createdAt: "2025-02-10",
  },
  {
    id: "r-005",
    name: "Moderator",
    description: "Moderasi komentar dan aktivitas pengguna",
    type: "Kustom",
    userCount: 6,
    permissions: ["Baca", "Tulis", "Kelola Pengguna"],
    createdAt: "2025-02-15",
  },
  {
    id: "r-006",
    name: "Analyst",
    description: "Akses ke laporan, analitik, dan ekspor data",
    type: "Kustom",
    userCount: 4,
    permissions: ["Baca", "Lihat Analitik", "Ekspor Data"],
    createdAt: "2025-03-01",
  },
  {
    id: "r-007",
    name: "Support",
    description: "Tim dukungan pelanggan dengan akses terbatas ke data pengguna",
    type: "Kustom",
    userCount: 8,
    permissions: ["Baca", "Kelola Pengguna"],
    createdAt: "2025-03-20",
  },
  {
    id: "r-008",
    name: "Developer",
    description: "Akses teknis untuk integrasi API dan konfigurasi sistem",
    type: "Kustom",
    userCount: 2,
    permissions: ["Baca", "Tulis", "Lihat Analitik", "Pengaturan Sistem"],
    createdAt: "2025-04-05",
  },
  {
    id: "r-009",
    name: "Finance",
    description: "Akses ke laporan keuangan dan ekspor data transaksi",
    type: "Kustom",
    userCount: 3,
    permissions: ["Baca", "Lihat Analitik", "Ekspor Data"],
    createdAt: "2025-04-20",
  },
  {
    id: "r-010",
    name: "HR Manager",
    description: "Mengelola data SDM dan hak akses karyawan",
    type: "Kustom",
    userCount: 2,
    permissions: ["Baca", "Tulis", "Kelola Pengguna", "Ekspor Data"],
    createdAt: "2025-05-01",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const limit = Number.parseInt(searchParams.get("limit") ?? "10", 10);
  const search = (searchParams.get("search") ?? "").toLowerCase();
  const type = searchParams.get("type") ?? "";
  const minUsers = Number(searchParams.get("minUsers") ?? "0");
  const permission = searchParams.get("permission") ?? "";

  let filtered = ROLES;

  if (search) {
    filtered = filtered.filter(
      (r) => r.name.toLowerCase().includes(search) || r.description.toLowerCase().includes(search)
    );
  }

  if (type) {
    filtered = filtered.filter((r) => r.type === type);
  }

  if (minUsers > 0) {
    filtered = filtered.filter((r) => r.userCount >= minUsers);
  }

  if (permission) {
    filtered = filtered.filter((r) => r.permissions.includes(permission));
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  await new Promise((r) => setTimeout(r, 100));

  return NextResponse.json({
    data,
    meta: {
      page: {
        total,
        current: page,
        perPage: limit,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    },
  });
}
