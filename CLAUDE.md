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

> **Referensi lengkap:** lihat [`ui-ux.md`](file:///Users/ikhsank6/Proyek/learn/ui-admin-next/ui-ux.md) untuk panduan desain resmi Portal DJKA.
> Semua aturan di bawah ini **wajib diikuti** saat membuat atau mengubah komponen UI.

### 4 Prinsip Utama

| Prinsip | Deskripsi |
|---|---|
| **Clarity** | Setiap elemen harus punya tujuan jelas. Hindari dekorasi tanpa nilai informasi. |
| **Efficiency** | Pengguna menyelesaikan tugas dengan langkah paling minimal. |
| **Consistency** | Komponen identik harus tampil dan berperilaku sama di seluruh halaman. |
| **Accessibility** | Penuhi WCAG 2.1 Level AA minimum. |

### Tipografi

- **Font utama:** `Plus Jakarta Sans` (300–800).
- **Font monospace:** `JetBrains Mono` — untuk ID, nomor referensi, kode sistem.
- **Teks tombol:** Title Case (`"Simpan Data"`), bukan UPPERCASE atau lowercase.
- **Label overline / grup menu:** `UPPERCASE` dengan `letter-spacing: 0.8px` — satu-satunya penggunaan uppercase.
- **Maksimum 3 ukuran font** dalam satu komponen/card.
- **Angka statistik besar** (dashboard): 28–36px, bobot 700–800, warna semantik.

| Kategori | Size | Weight | Penggunaan |
|---|---|---|---|
| Display | 32px | 800 | Judul landing/hero |
| H1 | 28px | 700 | Judul halaman utama |
| H2 | 22px | 700 | Sub-judul bagian |
| H3 | 18px | 600 | Judul card/widget |
| H4 | 15px | 600 | Label grup, judul kecil |
| Body 1 | 14px | 400 | Paragraf teks utama |
| Body 2 | 13px | 400 | Teks pendukung |
| Button | 13.5px | 600 | Label tombol |
| Caption | 12px | 400 | Keterangan tabel |
| Overline | 11px | 700 | Label grup navigasi |
| Mono | 13px | 400–500 | ID, kode referensi |

### Sistem Warna

Jangan hardcode hex — gunakan CSS custom properties dari `globals.css`.

**Warna Primer:**

| Token | Hex | Deskripsi |
|---|---|---|
| Sidebar BG | `#131A35` | Background sidebar ikon |
| Blue Primary | `#1D4ED8` | Warna aksi utama |
| Blue Hover | `#2563EB` | Hover tombol primary |

**Warna Semantik — hanya untuk makna status, bukan dekorasi:**

| Token | Hex | Makna |
|---|---|---|
| Success | `#16A34A` | Berhasil, disetujui |
| Warning | `#D97706` | Perlu perhatian |
| Danger | `#DC2626` | Gagal, ditolak, error |
| Purple | `#7C3AED` | Proses khusus / hukum |
| Teal | `#0D9488` | Info sekunder |

**Kontras minimum:** 4.5:1 untuk teks body, 3:1 untuk heading besar.

### UX Writing

- Bahasa Indonesia formal, lugas, tidak ambigu — sesuai KBBI/PUEBI.
- Kalimat aktif lebih diutamakan untuk instruksi.
- Judul halaman: kalimat nominal (`"Data Permohonan"`, bukan `"Lihat Data"`).
- Label tombol: imperatif, Title Case, maks 3 kata (`"Simpan Data"`, `"Ajukan Permohonan"`).
- Placeholder input: jelaskan format/contoh, bukan generik (`"Contoh: PT KAI (Persero)"`, bukan `"Masukkan nama..."`).
- Pesan error: kalimat aktif + cara memperbaiki (`"NIP tidak ditemukan. Periksa kembali NIP Anda."`).
- Konfirmasi dialog: judul tanya/tegas, 2 tombol (`"Ya, Hapus"` danger + `"Batalkan"` ghost).
- Format tanggal tampilan: `"26 Maret 2026"` (ISO hanya untuk API/atribut HTML).
- Jangan singkat istilah tidak baku (`"ID Permohonan"` ≠ `"ID Perm."`).

### Layout & Struktur Halaman

**Struktur layout:** Sidebar (72px) + Sub-Navigasi (200–260px) + Area Konten.

**Sidebar:**
- Lebar ikon: 72px tetap. Diperluas: 260px saat label teks.
- Background: `#1a2035` (navy gelap) — tidak boleh warna lain.
- Item aktif: `rgba(37,99,235,.2)` + garis kiri `3px solid #2563EB` + teks `#60A5FA`.
- Transisi: `width 0.25s ease`.

**Topbar:**
- Tinggi: 56px, posisi sticky top-0.
- Background: `#0F172A`.
- Urutan elemen: Search Bar → Spacer → Tanggal/Waktu → Notifikasi → Avatar.
- Search bar wajib tampilkan `Ctrl+K` badge.

**Konten:**
- Padding: 24px (mobile: 16px).
- Card stat: grid 3–4 kolom, gap 16px.
- Breadcrumb wajib ikon + judul konsisten dengan sidebar.

**Urutan elemen halaman (wajib):**
1. Topbar global
2. Breadcrumb / Judul + ikon
3. Alert (jika ada)
4. Kartu statistik (opsional, maks 4)
5. Filter & pencarian
6. Tabel / konten utama
7. Pagination

### Sistem Ikon

- Pustaka: **Lucide Icons** (rekomendasi utama), jangan campur pustaka.
- Gaya: selalu **outline/stroke** (`stroke-width="2"`, `round`).
- Ukuran: navigasi 20px, topbar 18px, tombol 14–16px, input 15px.
- Warna: `currentColor`. Aktif: `#93C5FD`. Normal: `rgba(255,255,255,.4)`.
- Ikon dekoratif: `aria-hidden="true"`. Ikon fungsional tanpa teks: `aria-label`.
- Jangan tampilkan ikon tanpa label kecuali ada tooltip.

### Spacing (Kelipatan 4px)

Seluruh jarak harus kelipatan 4px. Tidak boleh 7px, 11px, 18px.

| Token | Nilai | Penggunaan |
|---|---|---|
| sp-1 | 4px | Jarak mikro: ikon-teks |
| sp-2 | 8px | Padding badge, gap kompak |
| sp-3 | 12px | Padding chip, vertikal input |
| sp-4 | 16px | Padding card, gap kolom tabel |
| sp-5 | 20px | Padding card besar, gap section form |
| sp-6 | 24px | Padding konten halaman, gap dashboard |
| sp-8 | 32px | Jarak antar section besar |

**Konsistensi:** semua card padding 16–20px — tidak boleh beda antar halaman.

### Border Radius

| Nilai | Elemen |
|---|---|
| 2px | Input micro |
| 4px | Tag, chip kecil |
| 6px | Button, input |
| 8px | Dropdown, tooltip |
| 10px | Card standar |
| 12px | Card besar |
| 16px | Modal, panel |
| 9999px | Badge, pill |

### Aksesibilitas (WCAG 2.1 AA)

- Kontras minimum 4.5:1 body, 3:1 heading besar.
- Semua input: `label` terhubung `for/id` atau `aria-label`.
- Status badge: jangan hanya warna, sertakan teks status.
- Disabled: atribut `disabled` HTML (bukan hanya CSS).
- Tab order logis (kiri→kanan, atas→bawah). Jangan `tabindex > 0`.
- Animasi: `@media (prefers-reduced-motion: reduce)` untuk disable.
- Focus ring: `outline: 2px solid #2563EB; outline-offset: 3px`.

### Komponen Atomic Design

**Button:**
- 4 varian: Primary (maks 1 per halaman), Secondary, Outline, Ghost.
- Semantik: Danger (destruktif + konfirmasi), Success, Warning, Dark.
- Ukuran: XS 28px, Small 32px, Medium 38px, Large 44px, XL 52px.
- Ikon selalu di kiri teks, jarak 6px, `stroke-width: 2.5`.
- Hover: `translateY(-1px)` + shadow. Active: `translateY(0)`.

**Input:**
- Tinggi: 40px, radius: 6px, border: `1.5px solid #CBD5E1`.
- Fokus: border `#1D4ED8` + glow `box-shadow: 0 0 0 3px rgba(37,99,235,.12)`.
- Label wajib: tanda `*` merah di kanan label (bukan di placeholder).
- Error: di bawah input, warna `#DC2626`, border merah, pesan spesifik.

**Badge & Status Pill:**
- Bentuk pill (radius 9999px), dot bulat + teks Title Case.
- Satu warna = satu makna status. Jangan buat warna baru.
- Jangan UPPERCASE, jangan gradient, jangan sudut kotak.

**Tabel Data:**
- Header: bg `#F8FAFC`, teks `UPPERCASE` 11.5px, `letter-spacing: 0.4px`, border bawah 2px.
- Zebra striping: ganjil putih, genap `#F8FAFC`. Hover bg `#F8FAFC`.
- ID/referensi: font monospace JetBrains Mono, warna biru.
- Kolom aksi: paling kanan, tombol XS.
- Pagination: info `"Menampilkan X sampai Y dari Z data"` kiri, navigasi kanan.
- Filter & pencarian: di atas tabel, sejajar horizontal.

**Alert:**
- Varian: Info (biru), Success (hijau), Warning (oranye), Error (merah).
- Wajib: judul jelas + deskripsi actionable.
- Posisi: paling atas konten, sebelum form/tabel.
- Maks 2 alert sekaligus.

**Loading & Empty State:**
- Loading: `"Memuat Data... Sedang mengambil data dari server. Mohon tunggu sebentar."`
- Empty: `"Tidak Ada Data — Belum ada yang sesuai filter."` + tombol `"Atur Ulang Filter"`.

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

Proyek ini menggunakan **Bun**.

```bash
# Install dependency
bun install

# Tambah komponen shadcn/ui yang belum ada
bunx shadcn@latest add <nama-komponen>

# Contoh
bunx shadcn@latest add collapsible
bunx shadcn@latest add popover
bunx shadcn@latest add tooltip
```

Sebelum menulis komponen UI baru, cek dulu apakah sudah tersedia di `src/components/ui/`. Jika belum, install via perintah di atas.

---

## Konvensi Kode

- **Import order**: third-party → `@/components/shared` → `@/components/ui` → `@/hooks` → `@/services` → `@/utils` → `@/stores` → `@/lib` → relative
- **"use client"** hanya di komponen yang butuh hooks/event. Server component by default.
- **Zod v4**: gunakan `z.string().pipe(z.email())` bukan `.email()` langsung (deprecated)
- **Scroll animation**: gunakan manual `IntersectionObserver` dengan `root: document.querySelector("main")` — bukan `whileInView` dari framer-motion (scroll ada di dalam `<main>`, bukan window)
- Jangan tambah komentar kecuali ada constraint/invariant non-obvious
