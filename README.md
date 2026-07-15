# AdminPanel — Template Dashboard

Template admin dashboard modern berbasis Next.js dengan UI yang bersih, responsif, dan mendukung dark mode.

---

## Tech Stack

### Core
| Teknologi | Versi | Keterangan |
|---|---|---|
| [Next.js](https://nextjs.org) | 16 | App Router, React Server Components |
| [React](https://react.dev) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org) | 5 | Static typing |

### Styling
| Teknologi | Versi | Keterangan |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com) | 4 | CSS-first config via `@theme inline` |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | — | Utility `cn()` untuk conditional classes |

### UI Components
| Teknologi | Versi | Keterangan |
|---|---|---|
| [Radix UI](https://www.radix-ui.com) | 1 | Headless primitif aksesibel |
| [shadcn/ui](https://ui.shadcn.com) | — | Komponen siap pakai berbasis Radix |
| [Lucide React](https://lucide.dev) | — | Icon set |
| [Framer Motion](https://www.framer.com/motion) | 12 | Animasi (breadcrumb, transisi) |

### Form & Validasi
| Teknologi | Versi | Keterangan |
|---|---|---|
| [React Hook Form](https://react-hook-form.com) | 7 | Manajemen form |
| [Zod](https://zod.dev) | 4 | Schema validasi |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | 5 | Integrasi Zod + RHF |

### State & Data
| Teknologi | Versi | Keterangan |
|---|---|---|
| [Zustand](https://zustand-demo.pmnd.rs) | 5 | Global state management |
| [Highcharts](https://www.highcharts.com) | 12 | Chart & visualisasi data |
| [Sonner](https://sonner.emilkowal.ski) | 2 | Toast notifications |

### Developer Tools
| Teknologi | Versi | Keterangan |
|---|---|---|
| [Biome](https://biomejs.dev) | 2 | Linter + formatter (pengganti ESLint + Prettier) |
| [Bun](https://bun.sh) | — | Package manager & runtime |

---

## Struktur Folder

```
src/
├── app/          # Next.js App Router — halaman dan layout
├── components/
│   ├── ui/       # Primitif shadcn/ui
│   ├── shared/   # Komponen reusable (DataTable, FormSheet, ContentCard, dll)
│   └── layout/   # Shell aplikasi (Navbar, Sidebar, UserMenu)
├── hooks/        # Custom React hooks
├── lib/          # Konfigurasi library & API
├── stores/       # Zustand stores
├── services/     # API call per domain
├── assets/       # Asset lokal (gambar, font, data statis)
└── utils/        # Pure helper (cn, nav-config, seo, dll)
```

---

## Cara Menjalankan

### Prasyarat
- [Bun](https://bun.sh) >= 1.0

```bash
# Install Bun jika belum ada
curl -fsSL https://bun.sh/install | bash
```

### Development

```bash
# 1. Install dependencies
bun install

# 2. Jalankan dev server
bun run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Production

```bash
# Build
bun run build

# Jalankan production server
bun run start
```

### Perintah Lain

```bash
# Cek linting
bun run lint

# Format kode
bun run format

# Type check
bun run typecheck
```

---

## Kredensial Demo

| Field | Value |
|---|---|
| Email | `admin@example.com` |
| Password | `password` |