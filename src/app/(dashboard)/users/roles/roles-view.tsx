"use client";

import { LayoutDashboard, Settings, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { AddButton } from "@/components/shared/button/add-button";
import { ContentCard } from "@/components/shared/content-card";
import { type ActiveFilterPill, FilterModal } from "@/components/shared/filter-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Role } from "@/lib/api/roles";
import type { TableFilters } from "@/stores/table.store";
import { cn } from "@/utils/cn";
import { RoleModal } from "./role-modal";
import { RolesTable } from "./roles-table";

// ─── Constants ────────────────────────────────────────────────────────────────

type TypeFilter = "Semua" | "Sistem" | "Kustom";

const TYPE_FILTERS = [
  { label: "Semua" as TypeFilter, icon: LayoutDashboard },
  { label: "Sistem" as TypeFilter, icon: Settings },
  { label: "Kustom" as TypeFilter, icon: Users },
];

const MIN_USERS_OPTIONS = [
  { label: "Semua", value: "" },
  { label: "≥1", value: "1" },
  { label: "≥5", value: "5" },
  { label: "≥10", value: "10" },
];

const ALL_PERMISSIONS = [
  "Baca",
  "Tulis",
  "Hapus",
  "Kelola Pengguna",
  "Kelola Role",
  "Lihat Analitik",
  "Ekspor Data",
  "Pengaturan Sistem",
];

type PendingFilters = {
  type: TypeFilter;
  minUsers: string;
  permission: string;
};

const DEFAULT_FILTERS: PendingFilters = {
  type: "Semua",
  minUsers: "",
  permission: "",
};

// ─── Component ────────────────────────────────────────────────────────────────

type SheetState = {
  open: boolean;
  mode: "tambah" | "edit";
  data: Role | null;
};

export function RolesView() {
  const [sheet, setSheet] = useState<SheetState>({
    open: false,
    mode: "tambah",
    data: null,
  });

  const [pending, setPending] = useState<PendingFilters>(DEFAULT_FILTERS);
  const [applied, setApplied] = useState<PendingFilters>(DEFAULT_FILTERS);
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  function openTambah() {
    setSheet({ open: true, mode: "tambah", data: null });
  }

  function openEdit(role: Role) {
    setSheet({ open: true, mode: "edit", data: role });
  }

  function closeSheet(open: boolean) {
    setSheet((prev) => ({ ...prev, open }));
  }

  function openFilterModal() {
    // Reset pending ke applied saat buka modal agar tidak ada perubahan tak tersimpan
    setPending({ ...applied });
    setFilterModalOpen(true);
  }

  function applyFilters() {
    setApplied({ ...pending });
    setFilterModalOpen(false);
  }

  function resetFilters() {
    setPending(DEFAULT_FILTERS);
    setApplied(DEFAULT_FILTERS);
    setFilterModalOpen(false);
  }

  function resetPending() {
    setPending(DEFAULT_FILTERS);
  }

  const hasActiveFilters =
    applied.type !== "Semua" || applied.minUsers !== "" || applied.permission !== "";

  const hasPendingChanges =
    pending.type !== applied.type ||
    pending.minUsers !== applied.minUsers ||
    pending.permission !== applied.permission;

  const filterCount = [
    applied.type !== "Semua",
    applied.minUsers !== "",
    applied.permission !== "",
  ].filter(Boolean).length;

  const filters = useMemo<TableFilters>(
    () => ({
      type: applied.type === "Semua" ? undefined : applied.type,
      minUsers: applied.minUsers || undefined,
      permission: applied.permission || undefined,
    }),
    [applied]
  );

  const activePills = useMemo<ActiveFilterPill[]>(() => {
    const pills: ActiveFilterPill[] = [];
    if (applied.type !== "Semua") pills.push({ label: "Tipe", value: applied.type });
    if (applied.minUsers !== "")
      pills.push({ label: "Min. Pengguna", value: `≥${applied.minUsers}` });
    if (applied.permission !== "") pills.push({ label: "Izin", value: applied.permission });
    return pills;
  }, [applied]);

  return (
    <>
      {/* Table Card */}
      <ContentCard
        title="Daftar Role"
        description="Kelola role dan izin akses pengguna"
        actions={<AddButton action={openTambah} label="Tambah Role" />}
      >
        <RolesTable
          onEdit={openEdit}
          filters={filters}
          onFilterOpen={openFilterModal}
          filterCount={filterCount}
        />
      </ContentCard>

      {/* Filter Modal */}
      <FilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        title="Filter Role"
        description="Saring daftar role berdasarkan kriteria"
        activePills={activePills}
        onApply={applyFilters}
        onResetPending={resetPending}
        onClearAll={resetFilters}
        hasActiveFilters={hasActiveFilters}
        hasPendingChanges={hasPendingChanges}
        isPendingDefault={
          pending.type === "Semua" && pending.minUsers === "" && pending.permission === ""
        }
      >
        {/* Tipe Role */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            Tipe Role
          </p>
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1 self-start">
            {TYPE_FILTERS.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => setPending((p) => ({ ...p, type: label }))}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                  pending.type === label
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Min. Pengguna */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            Min. Pengguna
          </p>
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1 self-start">
            {MIN_USERS_OPTIONS.map((opt) => (
              <button
                key={opt.value || "all"}
                type="button"
                onClick={() => setPending((p) => ({ ...p, minUsers: opt.value }))}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                  pending.minUsers === opt.value
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Memiliki Izin */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
            Memiliki Izin
          </p>
          <Select
            value={pending.permission || "__all__"}
            onValueChange={(v) =>
              setPending((p) => ({ ...p, permission: v === "__all__" ? "" : v }))
            }
          >
            <SelectTrigger className="h-9 text-sm w-full">
              <SelectValue placeholder="Semua izin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">Semua izin</SelectItem>
              {ALL_PERMISSIONS.map((perm) => (
                <SelectItem key={perm} value={perm}>
                  {perm}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </FilterModal>

      <RoleModal mode={sheet.mode} data={sheet.data} open={sheet.open} onOpenChange={closeSheet} />
    </>
  );
}
