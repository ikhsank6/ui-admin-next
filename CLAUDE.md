# CLAUDE.md — Frontend Engineering Guide

## Role

You are a Senior Frontend Engineer with deep expertise in modern web development, scalable frontend architecture, and exceptional UI/UX implementation.

You specialize in:
- React.js
- Next.js
- TypeScript
- Tailwind CSS
- ShadCN UI
- Framer Motion
- Zustand
- Biome
- Accessibility (a11y)
- Responsive Design
- Frontend Performance Optimization

---

## Engineering Principles

- Write clean, scalable, maintainable code.
- Follow SOLID principles where applicable.
- Prefer composition over inheritance.
- Prioritize readability over cleverness.
- Avoid overengineering.
- Create reusable and modular components.
- Keep components small and focused.
- Use TypeScript properly with strict typing.
- Prefer server state management using React Query.
- Avoid unnecessary re-renders.
- Optimize performance and bundle size.
- Always consider accessibility and responsiveness.

---
### TypeScript
- Avoid using `any`.
- Use explicit types/interfaces.
- Prefer type inference when obvious.
- Create reusable shared types.

### Styling
- Use Tailwind CSS.
- Prefer utility-first styling.
- Use `cn()` helper untuk conditional classes — import dari `@/utils/cn`.
- Maintain consistent spacing and sizing.
- Use modern rounded styles:
  - `rounded-xl`
  - `rounded-2xl`
- Use `rounded-full` only for:
  - chips
  - badges
  - small CTA
  - avatars

### Badge — `@/components/ui/badge`

Props: `variant`, `color`, `radius`, `asChild`.

| Prop | Nilai |
|---|---|
| `variant` | `default` \| `secondary` \| `destructive` \| `outline` \| `ghost` \| `solid` \| `soft` \| `plain` |
| `color` | `none` \| `primary` \| `success` \| `info` \| `warning` \| `danger` |
| `radius` | `md` (default) \| `full` |

```tsx
<Badge variant="soft" color="primary">Admin</Badge>
<Badge variant="plain" color="warning" radius="full">Kustom</Badge>
```

- Gunakan `radius="full"` untuk chip, badge status, tag kecil
- Nama warna bersifat semantik — jangan gunakan nama warna raw (blue, green, dll)

### Sheet — `@/components/ui/sheet`

`SheetContent` mendukung `side="right" | "left" | "top" | "bottom"` dengan animasi slide per arah.
Prop `showCloseButton` (default `true`) untuk mengontrol visibilitas tombol X.

---

## UI/UX Guidelines

- Build modern, clean, professional interfaces.
- Prioritize usability over decoration.
- Maintain proper visual hierarchy.
- Use whitespace effectively.
- Ensure mobile-first responsiveness.
- Avoid cluttered UI.
- Prefer soft shadows and subtle borders.
- Use consistent spacing system.

## Stack

- **Framework**: Next.js 16 App Router (React 19)
- **Styling**: Tailwind CSS v4 — CSS-first config via `@theme inline` di `globals.css`
- **Component base**: Radix UI + shadcn/ui (di `src/components/ui/`)
- **Validation**: Zod v4 + React Hook Form + `@hookform/resolvers/zod`
- **Animation**: framer-motion 12
- **State**: Zustand
- **Toasts**: Sonner (`position="top-right"`)
- **Charts**: Highcharts + `highcharts-react-official`

---

## Struktur Komponen

```
src/components/
├── ui/          # Primitif dari shadcn/ui — JANGAN diubah kecuali untuk theming
├── shared/      # Komponen reusable milik project ini
└── layout/      # Komponen struktur halaman (navbar, sidebar, dll)
```

### Aturan penempatan

| Folder | Isi | Kriteria |
|---|---|---|
| `ui/` | Button, Input, Badge, Card, Sheet, dll | Primitif shadcn — tidak boleh berisi logika bisnis |
| `shared/` | DataTable, FormSheet, ContentCard, PageBreadcrumb, PieChart | Dipakai lebih dari satu modul, mengandung pola/logika reusable |
| `layout/` | AppNavbar, AppSidebar, UserMenu, NotificationMenu | Terkait struktur shell aplikasi |

**Tambahkan ke `shared/` jika:**
- Komponen akan dipakai di lebih dari satu halaman/modul
- Komponen membungkus pola UI yang diulang (tabel, form sheet, breadcrumb, kartu konten)

**Jangan masukkan ke `shared/`:**
- Komponen yang spesifik untuk satu modul (misal `UserModal`, `UsersTable`) → taruh di folder modul itu sendiri
- Primitif shadcn → tetap di `ui/`

---

## Komponen Shared yang Tersedia

### `DataTable` — `@/components/shared/data-table`
Tabel generik dengan search, pagination responsif, column visibility toggle, dan grid view.

```tsx
<DataTable
  data={items}
  columns={columns}
  keyExtractor={(item) => item.id}
  actions={{ onView, onEdit, onDelete }}
  onSearch={setSearch}
  searchValue={search}
  onRefresh={refetch}
  showPagination
  currentPage={page}
  totalPages={totalPages}
  totalItems={total}
  itemsPerPage={limit}
  onPageChange={setPage}
  onItemsPerPageChange={setLimit}
/>
```

- Toolbar: search input + tombol "Muat Ulang" (outline) + column visibility popover
- Pagination mobile: "Page X of Y" + Previous/Next
- Pagination desktop: nomor halaman + Go to page
- Tidak ada drag-reorder

### `FormSheet` + `SheetFormField` — `@/components/shared/form-sheet`
Shell drawer form reusable. Responsif: `side="right"` di desktop, `side="bottom"` di mobile.

```tsx
// Controlled mode (gunakan dari parent)
<FormSheet
  title="Tambah Data"
  open={open}
  onOpenChange={setOpen}
  onSubmit={(close) => { /* validasi lalu */ close(); }}
>
  <SheetFormField label="Nama" required error={errors.name?.message}>
    <Input {...register("name")} />
  </SheetFormField>
</FormSheet>
```

- Click-outside diblokir (`onPointerDownOutside` + `onInteractOutside` preventDefault)
- Validasi error: `error` prop di `SheetFormField` memberi border merah ke `input`/`textarea`/`select` via CSS selector

### `ContentCard` — `@/components/shared/content-card`
Kartu konten dengan header opsional (title, description, actions slot).

```tsx
<ContentCard
  title="Pengguna"
  description="Kelola semua pengguna"
  actions={<Button>Tambah</Button>}
>
  {children}
</ContentCard>
```

### `PageBreadcrumb` — `@/components/shared/page-breadcrumb`
Breadcrumb dengan animasi slide-in stagger (framer-motion). Gunakan di awal setiap halaman.

```tsx
<PageBreadcrumb
  items={[
    { label: "Beranda", href: "/dashboard" },
    { label: "Pengguna" },
  ]}
/>
```

### `PieChart` — `@/components/shared/pie-chart`
Pie chart berbasis Highcharts dengan dukungan dark mode otomatis.

```tsx
<PieChart
  data={[
    { label: "Admin", value: 30 },
    { label: "User", value: 70 },
  ]}
  caption="Distribusi Pengguna"
  height={380}
/>
```

- Warna label dan konektor otomatis menyesuaikan tema (light/dark) via `useTheme`
- Data label menampilkan persentase: `"{point.percentage:.1f}%"`
- Legend di bawah chart

---

## Struktur Folder `src/`

```
src/
├── app/          # Next.js App Router — halaman dan layout
├── components/   # Komponen UI (ui/, shared/, layout/)
├── hooks/        # Custom React hooks
├── lib/          # Konfigurasi library dan abstraksi core (api/, dsb.)
├── stores/       # Zustand stores
├── services/     # API call per domain
├── assets/       # Asset lokal (bukan public/) — gambar, font, data statis
└── utils/        # Pure function & shared helper lintas modul
```

### `src/services/` — API Calls

Satu file per domain, penamaan `[domain].service.ts`.

```
services/
├── auth.service.ts
├── user.service.ts
└── role.service.ts
```

- Berisi fungsi fetch ke API (GET, POST, PUT, DELETE)
- Tidak berisi state, tidak import hooks
- Return tipe data eksplisit, bukan `any`

```ts
// services/user.service.ts
export async function getUsers(params: UserParams): Promise<UserListResponse> {
  const res = await fetch(`/api/users?${new URLSearchParams(params)}`);
  if (!res.ok) throw new Error("Gagal memuat data pengguna");
  return res.json();
}
```

### `src/assets/` — Asset Lokal

Asset yang diimport langsung di kode (bukan diakses via URL publik).

```
assets/
├── images/       # Gambar yang diimport di komponen
├── fonts/        # Font custom jika tidak via next/font
└── data/         # Data statis (JSON, konstanta besar)
```

- Gunakan `src/assets/` untuk file yang perlu diproses webpack (diimport dengan `import`)
- Gunakan `public/` untuk file yang diakses via URL langsung (`/logo.png`, `/favicon.ico`)

### `src/utils/` — Shared Helpers

Fungsi utilitas murni (tidak ada state, tidak ada hooks) yang dipakai lintas modul.

```
utils/
├── cn.ts              # cn() helper — twMerge + clsx
├── nav-config.ts      # Konfigurasi navigasi sidebar (NavItem, NavGroup, primaryNav, navGroups, bottomNav)
├── seo.ts             # constructMetadata() untuk Next.js Metadata
├── format-date.ts     # (contoh) format tanggal
└── format-currency.ts # (contoh) format mata uang
```

- Fungsi harus pure — input masuk, output keluar, tanpa side effect
- Satu file per domain utilitas
- Jangan masukkan logika bisnis kompleks — cukup transformasi/validasi data
- Import `cn` dari `@/utils/cn`, bukan dari `@/lib/utils`

```ts
// utils/cn.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// utils/nav-config.ts — tambah/ubah menu sidebar di sini
export const primaryNav: NavItem[] = [ ... ];
export const navGroups: NavGroup[] = [ ... ];
export const bottomNav: NavItem[] = [ ... ];
```

---

## Pola Halaman (Module Pattern)

Setiap modul di `app/(dashboard)/[modul]/` mengikuti pola:

```
[modul]/
├── page.tsx          # Server component — metadata + layout wrapper
├── [modul]-view.tsx  # Client component — state management (sheet, filter)
├── [modul]-table.tsx # Client component — tabel + kolom spesifik modul
└── [modul]-modal.tsx # Client component — form sheet spesifik modul
```

`page.tsx` cukup render `PageBreadcrumb` + `[Modul]View`. Logika state dan UI ada di `*-view.tsx`.

---

## Theming — CSS Variables

Semua warna didefinisikan di `src/app/globals.css` via `@layer base { :root {} .dark {} }`.

| Variable | Kegunaan |
|---|---|
| `--background` | Background halaman |
| `--card` | Background card/panel (lebih terang dari background di dark mode) |
| `--table-bg` | Background area tabel di dark mode (paling gelap) |
| `--table-header` | Background baris header tabel (light: abu-abu, dark: sama dengan `--table-bg`) |
| `--row-hover` | Hover baris tabel |
| `--navbar` | Background navbar — selalu gelap di kedua mode |
| `--navbar-foreground` | Teks/ikon navbar |
| `--sidebar` | Background sidebar |

Gunakan via Tailwind arbitrary value: `bg-[hsl(var(--navbar))]`.

---

## Package Manager

Proyek ini menggunakan **pnpm**.

```bash
# Install dependency
pnpm install

# Tambah komponen shadcn/ui yang belum ada
pnpm dlx shadcn@latest add <nama-komponen>

# Contoh
pnpm dlx shadcn@latest add collapsible
pnpm dlx shadcn@latest add popover
pnpm dlx shadcn@latest add tooltip
```

Sebelum menulis komponen UI baru, cek dulu apakah sudah tersedia di `src/components/ui/`. Jika belum, install via perintah di atas.

---

## Konvensi Kode

- **Import order**: third-party → `@/components/shared` → `@/components/ui` → `@/hooks` → `@/services` → `@/utils` → `@/stores` → `@/lib` → relative
- **"use client"** hanya di komponen yang butuh hooks/event. Server component by default.
- **Zod v4**: gunakan `z.string().pipe(z.email())` bukan `.email()` langsung (deprecated)
- **Scroll animation**: gunakan manual `IntersectionObserver` dengan `root: document.querySelector("main")` — bukan `whileInView` dari framer-motion (scroll ada di dalam `<main>`, bukan window)
- Jangan tambah komentar kecuali ada constraint/invariant non-obvious
