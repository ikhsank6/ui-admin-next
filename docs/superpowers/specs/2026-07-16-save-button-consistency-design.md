# Save/Update Button Consistency — Design

## Problem

`SaveButton` (`src/components/shared/button/save-button.tsx`) already exists as the reusable
save-action button (Save icon + label), and is wired into `FormSheet`. But it isn't applied
consistently:

- `settings-view.tsx` has two submit buttons (`"Simpan Perubahan"`, `"Ubah Password"`) that use
  a raw `<Button>` — no Save icon, no loading feedback, despite tracking `formState.isSubmitting`.
- `SaveButton`'s `loading` prop only disables the button; it never shows a spinner, unlike the
  established pattern in `ActionButton` (`ui/action-button.tsx`), which swaps its icon for a
  spinning `Loader2`.
- `FormSheet` never passes `loading` to its internal `SaveButton` at all — the prop is dead code.
- Nothing distinguishes "Simpan" (create) from "Perbarui" (update) label text, even though
  `UserModal` and `RoleModal` already know `mode: "tambah" | "edit"` and use it to vary the sheet
  title.

## Scope

In scope: `SaveButton`, `FormSheet`, and the three call sites that perform a save/update action
(`UserModal`, `RoleModal`, `settings-view.tsx`'s two forms).

Out of scope: Login's submit button (different semantic — "Masuk", not a save action, already has
its own loading treatment). No other shared buttons (`AddButton`, `CancelButton`, `FilterButton`,
`ResetButton`) are touched — they aren't inconsistent today.

## Design

### 1. `SaveButton`

Add two props:

- `mode?: "tambah" | "edit"` (default `"tambah"`) — matches the exact union already used by
  `UserModalProps.mode` / `RoleModalProps.mode`, so callers forward it with zero translation.
  Drives the default label: `"tambah"` → `"Simpan"`, `"edit"` → `"Perbarui"`. The existing
  `label` prop still overrides this default (needed for `"Ubah Password"`).
- `loading` (already exists) now has real visual effect: icon swaps to `Loader2` with
  `animate-spin` (same treatment as `ActionButton`), and the label swaps to a loading variant:
  `"Menyimpan..."` for `tambah`, `"Memperbarui..."` for `edit`, or a custom `loadingLabel`
  override — used by the password form to show `"Mengubah..."`.

### 2. `FormSheet`

Accepts `mode?: "tambah" | "edit"` and `loading?: boolean`, forwards both to its internal
`SaveButton` call. `submitLabel` remains as an explicit override, taking precedence over the
mode-derived default.

### 3. Call sites

- `UserModal` / `RoleModal`: pass `mode={mode}` to `FormSheet` (the prop already exists on both
  components with the exact matching type).
- `settings-view.tsx`: replace both raw `<Button type="submit">` elements with `SaveButton`,
  `mode="edit"` for both (both forms update existing data), wired to each form's
  `formState.isSubmitting` via `loading`. The password form passes
  `label="Ubah Password"` / `loadingLabel="Mengubah..."` to override the generic edit copy.

## Testing

Manual verification via the running dev server: both light/dark theme, both `tambah`/`edit` modes
(User and Role modals), and the loading state on all three call sites (toggle via React DevTools
or a temporary artificial delay while testing, then removed).
