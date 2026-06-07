# UI/UX Design Guidelines
> **Portal DJKA Kemenhub** — v1.0 · 2026  
> Panduan desain resmi mencakup fondasi visual, sistem komponen, aturan layout, tipografi, dan standar interaksi.

---

## Daftar Isi

1. [Fondasi Desain](#1-fondasi-desain)
2. [Tipografi](#2-tipografi)
3. [Sistem Warna](#3-sistem-warna)
4. [UX Writing](#4-ux-writing)
5. [Layout & Struktur Halaman](#5-layout--struktur-halaman)
6. [Sistem Ikon](#6-sistem-ikon)
7. [Spacing](#7-spacing)
8. [Border Radius](#8-border-radius)
9. [Aksesibilitas](#9-aksesibilitas)
10. [Atomic Design System](#10-atomic-design-system)
    - [Atom: Button](#atom-button)
    - [Atom: Input](#atom-input)
    - [Atom: Badge & Status Pill](#atom-badge--status-pill)
    - [Molekul: Search Bar](#molekul-search-bar)
    - [Molekul: Filter & Stat Card](#molekul-filter--stat-card)
    - [Organisme: Tabel Data](#organisme-tabel-data)
    - [Organisme: Alert](#organisme-alert)
    - [Template & Halaman](#template--halaman)
    - [Komponen Pendukung](#komponen-pendukung)

---

## 1. Fondasi Desain

Portal DJKA menggunakan pendekatan desain yang mengutamakan kejelasan informasi, efisiensi navigasi, dan konsistensi visual. Sistem ini mengadaptasi prinsip **Google Material Design 3** yang disesuaikan untuk portal pemerintah Indonesia.

### 4 Prinsip Utama

| Prinsip | Deskripsi |
|---|---|
| **Clarity (Kejelasan)** | Setiap elemen harus memiliki tujuan yang jelas dan dapat dipahami tanpa penjelasan tambahan. Hindari dekorasi yang tidak memberikan nilai informasi. |
| **Efficiency (Efisiensi)** | Pengguna harus dapat menyelesaikan tugasnya dengan langkah yang paling minimal. Desain yang baik mengurangi beban kognitif pengguna. |
| **Consistency (Konsistensi)** | Komponen yang identik harus tampil dan berperilaku sama di seluruh halaman portal. Konsistensi membangun kepercayaan dan mengurangi waktu belajar. |
| **Accessibility (Aksesibilitas)** | Desain harus dapat digunakan oleh semua pegawai, termasuk pengguna dengan keterbatasan visual atau motorik. Penuhi standar **WCAG 2.1 Level AA** minimum. |

### Font Resmi

Portal DJKA menggunakan dua jenis huruf utama:

**Font Antarmuka Utama — `Plus Jakarta Sans`**  
Digunakan untuk semua elemen antarmuka: judul, isi, label, tombol, dan navigasi.

```
Light 300 · Regular 400 · Medium 500 · SemiBold 600 · Bold 700 · ExtraBold 800
```

**Font Monospace — `JetBrains Mono`**  
Khusus untuk ID permohonan, nomor referensi, kode sistem, dan data teknis berformat tetap.

```
Contoh: TKT-DJKA-2026-0001 · 260303499 · CEK001/A02/11/2026
```

**Implementasi CSS:**

```css
/* Import via Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

/* CSS Variables */
--font-ui:   'Plus Jakarta Sans', sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Penggunaan */
body    { font-family: var(--font-ui); }
.id-ref { font-family: var(--font-mono); }
```

---

## 2. Tipografi

Sistem tipografi mengadaptasi panduan Google Material Design 3 menggunakan **Plus Jakarta Sans**. Hierarki visual dikomunikasikan melalui kombinasi ukuran, bobot (weight), dan warna — bukan dekorasi berlebihan.

### Type Scale

| Kategori | Contoh | Size | Weight | Line Height | Penggunaan |
|---|---|---|---|---|---|
| Display | Portal DJKA | 32px | 800 | 1.1 | Judul halaman landing / hero |
| H1 | Data Permohonan | 28px | 700 | 1.2 | Judul halaman utama konten |
| H2 | Sertifikasi Sarana | 22px | 700 | 1.3 | Sub-judul bagian / seksi |
| H3 | Breakdown per Jenis | 18px | 600 | 1.4 | Judul card / widget |
| H4 | Filter Tahun | 15px | 600 | 1.4 | Label grup, judul kecil |
| Subtitle 1 | Layanan Data Perkeretaapian | 15px | 500 | 1.5 | Subtitle medium emphasis |
| Subtitle 2 | Menunggu Approval Dirjen | 13.5px | 600 | 1.5 | Label status, subtitle kecil |
| Body 1 | Distribusi jumlah pegawai... | 14px | 400 | 1.6 | Paragraf teks utama |
| Body 2 | Data diperbarui setiap hari kerja... | 13px | 400 | 1.6 | Teks pendukung, deskripsi |
| Button | Simpan Data | 13.5px | 600 | 1 | Label tombol — Title Case |
| Caption | Menampilkan 1 sampai 6 dari 6 data | 12px | 400 | 1.5 | Keterangan tabel, caption |
| Overline | LAYANAN DATA | 11px | 700 | 1.5 | Label grup navigasi, overline |
| Mono | 260303499 · TKT-2026-0001 | 13px | 400–500 | 1.6 | ID, kode referensi, data teknis |

### Aturan Penggunaan Tipografi

1. **Teks tombol:** gunakan Title Case. Contoh: `"Simpan Data"`, bukan `"SIMPAN DATA"` atau `"simpan data"`.
2. **Label overline / grup menu:** gunakan `UPPERCASE` dengan `letter-spacing: 0.8px`. Ini satu-satunya penggunaan uppercase yang diizinkan.
3. **Maksimum 3 ukuran font** dalam satu komponen/card. Hindari variasi ukuran yang terlalu banyak dalam satu area kecil.
4. **ID dan nomor referensi wajib** menggunakan font monospace JetBrains Mono agar mudah dibaca dan dibandingkan.
5. **Angka statistik besar** (seperti di dashboard) gunakan ukuran 28–36px dengan bobot 700–800 dan warna yang mengindikasikan status.

---

## 3. Sistem Warna

Sistem warna terdiri dari warna primer (biru–navy), warna semantik (status), dan warna netral. Setiap warna didefinisikan sebagai CSS custom property.

### Warna Primer & Brand

| Token | Hex | Deskripsi |
|---|---|---|
| Sidebar BG | `#131A35` | Background sidebar ikon |
| Navy 800 | `#1E293B` | Elemen navigasi dark |
| Blue Primary | `#1D4ED8` | Warna aksi utama |
| Blue Hover | `#2563EB` | State hover tombol primary |
| Blue 400 | `#3B82F6` | Aksen biru medium |
| Blue 300 | `#60A5FA` | Ikon navigasi aktif |
| Blue Border | `#BFDBFE` | Border elemen biru |
| Blue BG | `#EFF6FF` | Background highlight biru |

### Warna Semantik / Status

> Gunakan warna semantik **hanya** untuk menyampaikan makna status. Jangan gunakan untuk tujuan dekoratif.

| Token | Hex | Makna |
|---|---|---|
| Success | `#16A34A` | Berhasil, disetujui, selesai |
| Success BG | `#DCFCE7` | Background status sukses |
| Warning | `#D97706` | Perlu perhatian, butuh tindakan |
| Warning BG | `#FEF3C7` | Background status peringatan |
| Danger | `#DC2626` | Gagal, ditolak, error kritis |
| Danger BG | `#FEE2E2` | Background status bahaya |
| Purple | `#7C3AED` | Proses khusus / bagian hukum |
| Teal | `#0D9488` | Informasi / info sekunder |
| Pink | `#DB2777` | Kategori khusus |

### Warna Netral

| Token | Skala |
|---|---|
| Gray 50–900 | Skala penuh abu dari terang ke gelap |

### Token Warna CSS

```css
:root {
  /* Primary */
  --color-primary:        #1D4ED8;
  --color-primary-hover:  #2563EB;
  --color-primary-light:  #EFF6FF;
  --color-primary-border: #BFDBFE;

  /* Semantic */
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-danger:  #DC2626;
  --color-info:    #0284C7;

  /* Surface */
  --color-surface: #FFFFFF;
  --color-bg:      #F8FAFC;
  --color-border:  #E2E8F0;
  --color-text:    #0F172A;
  --color-muted:   #64748B;
}
```

> ⚠️ **Wajib digunakan.** Jangan hardcode nilai hex langsung di komponen.

### Panduan Kontras Warna

| ✓ Lakukan | ✕ Hindari |
|---|---|
| Teks putih di atas biru — rasio 4.7:1 ✓ | Teks biru muda di atas biru muda — kontras rendah ✗ |
| Teks putih di atas navy — rasio 18.1:1 ✓ | Teks abu muda di atas putih — sulit dibaca ✗ |
| Rasio kontras minimal **4.5:1** untuk teks body | Jangan gunakan warna teks dan background dengan perbedaan kecerahan kecil |
| Rasio kontras minimal **3:1** untuk heading besar | — |

---

## 4. UX Writing

Portal DJKA mengikuti kaidah Bahasa Indonesia yang baik dan benar sesuai **KBBI Edisi V** dan **Pedoman Umum Ejaan Bahasa Indonesia (PUEBI)**. Bahasa bersifat formal, lugas, dan tidak ambigu.

### Prinsip Utama

- **Formal namun Jelas** — gunakan bahasa resmi pemerintahan, hindari kalimat yang terlalu panjang atau berbelit.
- **Aktif bukan Pasif** — preferensi kalimat aktif untuk instruksi pengguna.
- **Spesifik** — sebutkan objek yang dimaksud secara eksplisit.
- **Konsisten** — satu istilah untuk satu konsep, tidak boleh berganti-ganti.

### Alur Status Permohonan

```
Draf → Diajukan → Sedang Dikaji → Ditindaklanjuti → Dikoordinasikan → Selesai
                              ↘ Perlu Perbaikan
                              ↘ Ditolak
                              ↘ Dalam Proses Bagian Hukum
```

### Kamus Istilah Resmi

| ✓ Istilah Benar | ✕ Jangan Gunakan | Penjelasan |
|---|---|---|
| **Ditindaklanjuti** | Follow Up, Difollow Up, On Progress, Diproses | Bentuk baku dari "tindak lanjut". Digunakan saat permohonan sedang mendapat respons aktif. |
| **Dikoordinasikan** | Dikordinir, Dikoordinir, Koordinasi, Di-koordinasi | Bentuk baku: kata dasar "koordinasi" + di-…-kan. |
| **Selesai** | Completed, Done, Finish, Closed, Resolved | Status bahwa seluruh proses telah tuntas. Gunakan Bahasa Indonesia. |
| **Perlu Perbaikan** | Revisi, Need Revision, Rejected (Partial), Incomplete | Dokumen tidak lengkap tapi permohonan tidak ditolak sepenuhnya. Pemohon masih dapat memperbaiki. |
| **Menunggu Persetujuan Direktur** | Waiting Director Approval, Pending Direktur | Sebutkan jabatan secara eksplisit: "Direktur" atau "Direktur Jenderal". |
| **Ditolak** | Rejected, Decline, Tidak Disetujui | Bermakna lebih tegas secara hukum dan mengindikasikan keputusan final. Selalu sertakan alasan. |
| **Uji Pertama / Uji Berkala / Uji Ulang** | First Test, Periodic Test, Re-test | Istilah teknis perkeretaapian sesuai Peraturan Menteri Perhubungan. |

### Panduan Penulisan Teks UI

1. **Judul halaman:** gunakan kalimat nominal (kata benda). Contoh: `"Data Permohonan Sertifikasi Sarana"`, bukan `"Lihat Data Permohonan"`.
2. **Label tombol:** kalimat imperatif singkat dalam Title Case, maksimum 3 kata. Contoh: `"Simpan Data"`, `"Ajukan Permohonan"`, `"Ekspor Laporan"`.
3. **Placeholder input:** jelaskan format atau contoh nilai. Contoh: `"Contoh: PT Kereta Api Indonesia (Persero)"`, bukan hanya `"Masukkan nama..."`.
4. **Pesan error:** tulis dalam kalimat aktif dan sebutkan cara memperbaiki. Contoh: `"Nomor Induk Pegawai tidak ditemukan. Periksa kembali NIP yang Anda masukkan."`, bukan hanya `"NIP salah"`.
5. **Konfirmasi dialog:** judul menggunakan kalimat tanya atau pernyataan tegas. Dua tombol: `"Ya, Hapus"` (danger) dan `"Batalkan"` (ghost).
6. **Jangan gunakan singkatan tidak baku.** `"ID Permohonan"` tidak boleh disingkat `"ID Perm."` atau `"No. Perm."`.
7. **Format tanggal:** gunakan `"26 Maret 2026"` untuk tampilan (bukan `"26/03/2026"`). Format ISO hanya untuk atribut HTML dan API.

### Contoh Pesan yang Benar

| ✓ Penulisan yang Benar | ✕ Penulisan yang Perlu Diperbaiki |
|---|---|
| **Permohonan Berhasil Diajukan** — Permohonan No. 260303499 telah berhasil diajukan pada 26 Maret 2026. Proses verifikasi dokumen akan diselesaikan dalam 3 hari kerja. | **Sukses!** Data berhasil disimpan. *(Terlalu generik, tidak menyebut nomor referensi, tidak formal untuk portal pemerintah.)* |

---

## 5. Layout & Struktur Halaman

Portal DJKA menggunakan **layout tiga kolom**: sidebar navigasi ikon, sub-navigasi kontekstual, dan area konten utama.

### Struktur Layout Utama

```
┌──────────┬───────────────────┬──────────────────────────────────┐
│ Sidebar  │  Sub-Navigasi     │  Area Konten                     │
│  Ikon    │  Kontekstual      │                                  │
│  72px    │  200–260px        │  [Topbar 56px — sticky]          │
│          │  (sesuai modul    │  Konten utama halaman            │
│          │  yang dipilih)    │  Padding: 24px semua sisi        │
└──────────┴───────────────────┴──────────────────────────────────┘
```

### Aturan Sidebar

| # | Aturan |
|---|---|
| 1 | Lebar sidebar ikon selalu tetap **72px**. Tidak boleh dipersempit atau diperlebar. |
| 2 | Lebar sidebar diperluas: **260px** saat menampilkan label teks lengkap. |
| 3 | Background sidebar: warna `#1a2035` (navy gelap). Tidak boleh menggunakan warna lain. |
| 4 | Item aktif: background `rgba(37,99,235,.2)` + garis kiri `3px solid #2563EB` + warna teks `#60A5FA`. |
| 5 | Transisi buka/tutup: `width 0.25s ease`. Tidak boleh lebih lambat dari itu. |
| 6 | Logo Portal DJKA wajib di paling atas sidebar dengan area minimal `56px × 72px`. |

### Aturan Topbar

| # | Aturan |
|---|---|
| 1 | Tinggi Topbar: selalu **56px**, posisi `sticky top: 0` agar selalu terlihat saat scroll. |
| 2 | Background Topbar: `#0F172A` (navy primer). Konsisten dengan tema gelap navigasi. |
| 3 | Urutan elemen (kiri ke kanan): Search Bar → Spacer → Tanggal/Waktu → Ikon Notifikasi → Avatar Pengguna. |
| 4 | Search bar: shortcut keyboard `Ctrl+K` wajib ditampilkan sebagai badge monospace di kanan kolom pencarian. |

### Aturan Konten Halaman

| # | Aturan |
|---|---|
| 1 | Padding konten: **24px** di semua sisi. Pada layar kecil: **16px**. |
| 2 | Lebar konten: tidak ada batasan — melebar penuh mengisi sisa ruang setelah sidebar dan sub-nav. |
| 3 | Card stat di bagian atas: selalu dalam grid **3 kolom atau 4 kolom** sesuai jumlah metrik, dengan jarak 16px. |
| 4 | Breadcrumb/judul halaman: wajib menggunakan ikon dan judul yang konsisten dengan nama menu di sidebar. |

### Struktur Halaman Standar (Urutan Wajib)

```
1. Topbar global
2. Breadcrumb / Judul halaman dengan ikon
3. Alert (jika ada)
4. Kartu statistik (opsional, maks. 4)
5. Filter & pencarian
6. Tabel / konten utama
7. Pagination
```

---

## 6. Sistem Ikon

Portal DJKA menggunakan pendekatan **Open-source icon system + design constraint internal**.

### Pustaka Ikon yang Direkomendasikan

| Pustaka | Lisensi | Jumlah | Keterangan |
|---|---|---|---|
| **Lucide Icons** | MIT | 1.400+ ikon | ⭐ **Rekomendasi Utama.** Stroke bersih dan konsisten. NPM: `lucide-react`, `lucide-vue`. |
| **Heroicons** | MIT | 292 ikon | Alternatif pilihan pertama. |
| **Tabler Icons** | MIT | 5.400+ ikon | Koleksi terbesar. Ada ikon spesifik perkeretaapian. `stroke-width="2"` konsisten. |
| **Phosphor Icons** | MIT | 9.000+ ikon | Koleksi paling lengkap jika butuh ikon sangat spesifik. |

### Aturan Penggunaan Ikon

| # | Aturan |
|---|---|
| 1 | **Gaya:** selalu gunakan ikon **outline/stroke**. Dilarang menggunakan ikon filled/solid kecuali untuk status aktif yang sangat spesifik. |
| 2 | **Ketebalan garis:** `stroke-width="2"` untuk semua ikon. Gunakan `stroke-linecap="round"` dan `stroke-linejoin="round"`. |
| 3 | **Ukuran standar:** navigasi `20px`, topbar `18px`, dalam tombol `14–16px`, dalam input `15px`. Jangan gunakan ukuran di luar skema ini. |
| 4 | **Warna:** ikuti warna teks parent menggunakan `currentColor`. Ikon navigasi aktif: `#93C5FD`. Ikon navigasi normal: `rgba(255,255,255,.4)`. |
| 5 | **Aksesibilitas:** ikon dekoratif wajib `aria-hidden="true"`. Ikon fungsional tanpa teks label wajib `aria-label` yang deskriptif. |
| 6 | **Konsistensi sumber:** seluruh ikon dalam satu proyek wajib berasal dari **satu pustaka yang sama**. Jangan mencampur Lucide dan Heroicons dalam halaman yang sama. |
| 7 | Jangan gunakan ikon tanpa label kecuali di dalam tombol ikon yang memiliki tooltip penjelasan. |

### Do's & Don'ts Ikon

| ✓ Lakukan | ✕ Hindari |
|---|---|
| Gunakan ikon outline (stroke) | Jangan gunakan filled icon (kecuali sangat spesifik) |
| Gunakan ukuran standar | Jangan gunakan ukuran bebas |
| Gunakan `currentColor` | Jangan gunakan warna bebas |
| Berikan label aksesibilitas | Jangan tanpa label jika fungsional |
| Konsisten satu pustaka ikon | Jangan campur pustaka ikon |

---

## 7. Spacing

Sistem spacing menggunakan **basis kelipatan 4px**. Seluruh jarak — padding, margin, maupun gap — harus merupakan kelipatan 4px.

### Tabel Token Spacing

| Token | Nilai | Penggunaan |
|---|---|---|
| `sp-1` | 4px | Jarak mikro: ikon-teks, dot-label dalam badge |
| `sp-2` | 8px | Jarak kecil: padding dalam badge, gap antara item kompak |
| `sp-3` | 12px | Padding dalam chip, input padding vertikal kecil |
| `sp-4` | 16px | Padding standar card, gap kolom tabel, padding tombol |
| `sp-5` | 20px | Padding card besar, jarak antar section dalam form |
| `sp-6` | 24px | Padding konten halaman, gap kartu dashboard |
| `sp-8` | 32px | Jarak antar section besar, margin bawah heading |
| `sp-10` | 40px | Padding hero section, jarak antar grup konten |
| `sp-12` | 48px | Padding halaman landing |
| `sp-16` | 64px | Jarak besar antar modul / section utama |

### Prinsip Spacing

1. **Selalu gunakan kelipatan 4px.** Tidak boleh menggunakan nilai seperti 7px, 11px, atau 18px.
2. Elemen yang berkaitan erat → spacing kecil (4–8px). Elemen yang berbeda kelompok → spacing besar (24–32px).
3. **Konsistensi padding card:** semua card menggunakan padding 16–20px. Tidak boleh ada card dengan padding 10px di satu halaman dan 25px di halaman lain.

---

## 8. Border Radius

Kelengkungan sudut diatur secara konsisten berdasarkan ukuran dan jenis elemen.

| Nilai | Elemen |
|---|---|
| `2px` | Input micro |
| `4px` | Tag, chip kecil |
| `6px` | Button, input |
| `8px` | Dropdown, tooltip |
| `10px` | Card standar |
| `12px` | Card besar |
| `16px` | Modal, panel |
| `9999px` | Badge, pill |

> **Prinsip:** Gunakan radius yang lebih kecil untuk elemen yang lebih kecil, dan radius yang lebih besar untuk elemen yang lebih besar.

---

## 9. Aksesibilitas

Portal DJKA wajib memenuhi standar **WCAG 2.1 Level AA** sesuai Peraturan Menteri PANRB tentang SPBE.

### Focus State / Navigasi Keyboard

```css
/* Focus ring standar — WAJIB ada di semua elemen interaktif */
*:focus-visible {
  outline: 2px solid #2563EB;
  outline-offset: 3px;
  border-radius: 4px; /* agar mengikuti bentuk elemen */
}

/* Untuk input field, gunakan box-shadow agar tidak mengganggu border */
.form-input:focus {
  border-color: #1D4ED8;
  box-shadow: 0 0 0 3px rgba(37,99,235,.12);
}
```

### Checklist Aksesibilitas

- ✅ Rasio kontras minimum **4.5:1** untuk teks body (≤ 18px) dan **3:1** untuk teks besar (≥ 18px bold atau ≥ 24px regular).
- ✅ Semua input form harus memiliki atribut `label` yang terhubung melalui `for/id` atau `aria-label`.
- ✅ Ikon dekoratif: gunakan `aria-hidden="true"`. Ikon fungsional: sertakan `aria-label` yang deskriptif.
- ✅ Status badge: jangan hanya mengandalkan warna, selalu sertakan teks status yang jelas untuk screen reader.
- ✅ Tombol disabled: gunakan atribut `disabled` pada HTML (bukan hanya CSS) agar tidak dapat difokus melalui keyboard.
- ✅ Tab order harus logis (kiri ke kanan, atas ke bawah). Jangan pernah menggunakan `tabindex > 0`.
- ✅ Animasi: gunakan `@media (prefers-reduced-motion: reduce)` untuk menonaktifkan animasi bagi pengguna yang sensitif terhadap gerakan.

---

## 10. Atomic Design System

Portal DJKA mengadopsi metodologi **Atomic Design** (Brad Frost) untuk membangun sistem desain secara bertahap dari komponen paling kecil hingga halaman penuh.

```
Atom → Molekul → Organisme → Template → Halaman
```

---

### Atom: Button

Sistem tombol memiliki **empat varian utama** berdasarkan tingkat penekanan (emphasis).

#### Varian Tombol

| Varian | Class | Penggunaan |
|---|---|---|
| **Primary** | `.btn-primary` | Aksi paling penting di halaman. **Maksimal 1 tombol primary per halaman/form.** |
| **Secondary** | `.btn-secondary` | Aksi penting namun tidak sepenting Primary. Dapat muncul lebih dari sekali. |
| **Outline** | `.btn-outline` | Aksi sekunder berdampak rendah, atau pilihan yang tidak terlalu menonjol. |
| **Ghost** | `.btn-ghost` | Aksi paling rendah prioritasnya. Contoh: "Batal", "Kembali". |

#### Tombol Semantik

| Varian | Class | Contoh | Kapan Digunakan |
|---|---|---|---|
| Danger | `.btn-danger` | Tolak Permohonan, Hapus | Tindakan destruktif / tidak dapat dibatalkan. Selalu sertakan dialog konfirmasi. |
| Success | `.btn-success` | Setujui | Tindakan konfirmasi positif. |
| Warning | `.btn-warning` | Tunda Review | Tindakan yang memerlukan perhatian. |
| Dark | `.btn-dark` | Ekspor PDF | Tindakan netral/sistem. |

#### Ukuran Tombol

| Ukuran | Tinggi |
|---|---|
| XS | 28px |
| Small | 32px |
| Medium (default) | 38px |
| Large | 44px |
| Extra Large | 52px |

#### Ikon pada Tombol

- Ikon menggunakan `stroke-width: 2.5`.
- Jarak antara ikon dan teks: `6px`.
- Ikon selalu berada di **kiri teks label**.

#### State Transitions

```css
.btn-primary {
  transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
}
.btn-primary:hover {
  background: #2563EB;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37,99,235,.35);
}
.btn-primary:active {
  background: #1D4ED8;
  transform: translateY(0);
  box-shadow: none;
}
.btn:disabled {
  background: #E2E8F0;
  color: #94A3B8;
  cursor: not-allowed;
  pointer-events: none;
}
```

---

### Atom: Input

#### Spesifikasi

| Properti | Nilai |
|---|---|
| Tinggi | `40px` (default) |
| Border radius | `6px` |
| Border default | `1.5px solid #CBD5E1` |
| Border fokus | `#1D4ED8` dengan glow `box-shadow: 0 0 0 3px rgba(37,99,235,.12)` |
| Input disabled | background `#F1F5F9`, teks `#94A3B8`, `cursor: not-allowed` |
| Hint / helper text | 12px, warna `#64748B` |

#### Aturan Input

1. **Label wajib:** tambahkan tanda `*` berwarna merah di sebelah kanan label. Tidak boleh diletakkan di dalam placeholder.
2. **Pesan error:** tampilkan di bawah input dengan warna `#DC2626` dan ikon `✕`. Ubah border input menjadi merah.
3. **Input disabled:** gunakan atribut `disabled` pada HTML (bukan hanya CSS).

#### Cara Menampilkan Pesan Error

| ✓ Cara yang Benar | ✕ Cara yang Salah |
|---|---|
| Error ditampilkan di bawah field yang bermasalah. Border input berubah merah. Pesan spesifik dan actionable. Contoh: `"NIP tidak ditemukan dalam sistem BKN. Periksa kembali NIP yang Anda masukkan."` | Pesan error generik di bagian atas form. Contoh: `"⚠️ Terjadi kesalahan. Silakan coba lagi."` |

---

### Atom: Badge & Status Pill

Badge status adalah elemen yang paling sering digunakan di seluruh portal DJKA.

#### Standar Warna Status Badge

| Status | Warna | Hex | Konteks Penggunaan |
|---|---|---|---|
| Disetujui / Completed | 🟢 Hijau | `#16A34A` | Status berhasil, permohonan selesai, on-time |
| Menunggu Approval Dirjen | 🔵 Biru | `#1D4ED8` | Dalam proses, menunggu tindakan pihak lain |
| Menunggu Approval Direktur | 🟠 Oranye | `#D97706` | Butuh perhatian, perlu tindakan segera |
| Ditolak | 🔴 Merah | `#DC2626` | Gagal, ditolak, error kritis |
| Dalam Proses Hukum | 🟣 Ungu | `#7C3AED` | Proses khusus / bagian hukum |
| Perlu Revisi | 🟡 Kuning | `#CA8A04` | Butuh perbaikan dari pemohon |
| Draft / Belum Dikirim | ⚫ Abu | `#64748B` | Status netral, belum diproses |

#### Aturan Badge

| ✓ Lakukan | ✕ Hindari |
|---|---|
| Gunakan dot bulat + teks Title Case | Jangan buat warna badge baru |
| Konsisten — satu warna untuk satu makna status | Jangan pakai UPPERCASE teks |
| — | Jangan gunakan gradient |
| — | Jangan pakai bentuk sudut kotak (pill saja) |

---

### Molekul: Search Bar

Search bar (tanpa tombol Cari terpisah) digunakan untuk pencarian real-time pada tabel data yang memiliki lebih dari **10 baris**.

- Shortcut `Ctrl+K` wajib ditampilkan untuk aksesibilitas keyboard.
- Placeholder wajib menjelaskan objek yang dicari: `"Cari data permohonan..."`, bukan hanya `"Cari..."`.

---

### Molekul: Filter & Stat Card

#### Stat Card

Gunakan di bagian atas halaman dashboard untuk menampilkan **maksimum 4 metrik utama**.

- Setiap kartu hanya menampilkan satu angka kunci beserta labelnya.
- Warna angka harus mengikuti warna semantik: hijau = baik, merah = buruk.
- Layout: grid 3 atau 4 kolom dengan gap `16px`.

---

### Organisme: Tabel Data

Tabel data digunakan untuk menampilkan data tabular terstruktur dengan **lebih dari 5 baris**.

#### Aturan Tabel

| # | Aturan |
|---|---|
| 1 | Header tabel: background `#F8FAFC`, teks `UPPERCASE` 11.5px dengan `letter-spacing: 0.4px`, border bawah 2px. |
| 2 | Zebra striping: baris ganjil putih, baris genap `#F8FAFC`. Tambahkan hover background `#F8FAFC`. |
| 3 | Nomor ID/referensi: wajib menggunakan font monospace **JetBrains Mono** dengan warna biru agar mudah dibedakan. |
| 4 | Kolom aksi: selalu di kolom paling kanan. Gunakan tombol ukuran XS. |
| 5 | Pagination: info `"Menampilkan X sampai Y dari Z data"` di kiri. Tombol navigasi halaman di kanan. |
| 6 | Filter & pencarian: letakkan di atas tabel, sejajar secara horizontal. Filter menggunakan dropdown, pencarian menggunakan search input. |

---

### Organisme: Alert

Alert ditempatkan di bagian paling atas konten halaman, sebelum form atau tabel yang berkaitan.

#### Varian Alert

| Tipe | Warna | Contoh |
|---|---|---|
| Info | Biru | "Filter tahun hanya menampilkan data permohonan yang diajukan pada tahun yang dipilih." |
| Success | Hijau | "Permohonan ID 260303499 telah disetujui oleh Direktur Jenderal pada 26 Maret 2026." |
| Warning | Oranye | "Sertifikat No. ST-2022-0341 akan berakhir pada 15 Mei 2026. Ajukan permohonan perpanjangan minimal 30 hari sebelum tanggal berakhir." |
| Error | Merah | "Permohonan ID 260303490 tidak dapat diproses karena dokumen persyaratan tidak lengkap." |

#### Aturan Alert

1. Selalu sertakan judul yang jelas (`alert-title`) dan deskripsi yang actionable (`alert-text`).
2. Letakkan alert di bagian **paling atas** konten halaman, sebelum form atau tabel yang berkaitan.
3. **Jangan tampilkan lebih dari 2 alert sekaligus.** Jika ada banyak pesan, gunakan komponen notifikasi list.
4. Alert error harus menjelaskan apa yang terjadi **dan** langkah yang harus diambil pengguna.

---

### Template & Halaman

Template adalah kerangka tata letak yang mendefinisikan di mana setiap organisme diletakkan tanpa data nyata. Halaman adalah implementasi template yang diisi dengan data sesungguhnya dari sistem.

#### Struktur Halaman Standar (Wajib Diikuti)

```
(1) Topbar global
(2) Breadcrumb / Judul halaman dengan ikon
(3) Alert (jika ada)
(4) Kartu statistik (opsional, maks. 4)
(5) Filter & pencarian
(6) Tabel / konten utama
(7) Pagination
```

> ⚠️ Jangan mengubah struktur template tanpa koordinasi dengan tim desainer.

---

### Komponen Pendukung

#### Tab Bar

Gunakan untuk menampilkan dua atau lebih tampilan data yang saling berkaitan dalam satu halaman yang sama.

#### Checkbox & Radio

Digunakan untuk pilihan yang tidak eksklusif (checkbox) atau eksklusif (radio button) dalam form.

#### Toggle Switch

Digunakan untuk mengaktifkan/menonaktifkan fitur atau preferensi pengguna secara langsung (tanpa submit form).

#### Loading & Empty State

| State | Deskripsi |
|---|---|
| **Loading** | Tampilkan pesan: `"Memuat Data... Sedang mengambil data dari server. Mohon tunggu sebentar."` |
| **Empty** | Tampilkan pesan: `"Tidak Ada Data — Belum ada permohonan yang sesuai dengan filter yang diterapkan."` + tombol `"Atur Ulang Filter"` |

---

*Portal DJKA UI/UX Design Guidelines · Direktorat Jenderal Perkeretaapian · Kementerian Perhubungan Republik Indonesia*  
*Versi 1.0 · 2026 · Diperbarui sesuai kebutuhan sistem dan regulasi yang berlaku*
