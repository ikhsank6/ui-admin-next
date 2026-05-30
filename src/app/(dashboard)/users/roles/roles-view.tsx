"use client";

import { ChevronDown, LayoutDashboard, Settings, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { AddButton } from "@/components/shared/button/add-button";
import { FilterButton } from "@/components/shared/button/filter-button";
import { ResetButton } from "@/components/shared/button/reset-button";
import { ContentCard } from "@/components/shared/content-card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
  const [openFilter, setOpenFilter] = useState(true);

  function openTambah() {
    setSheet({ open: true, mode: "tambah", data: null });
  }

  function openEdit(role: Role) {
    setSheet({ open: true, mode: "edit", data: role });
  }

  function closeSheet(open: boolean) {
    setSheet((prev) => ({ ...prev, open }));
  }

  function applyFilters() {
    setApplied({ ...pending });
  }

  function resetFilters() {
    setPending(DEFAULT_FILTERS);
    setApplied(DEFAULT_FILTERS);
  }

  const hasActiveFilters =
    applied.type !== "Semua" || applied.minUsers !== "" || applied.permission !== "";

  const hasPendingChanges =
    pending.type !== applied.type ||
    pending.minUsers !== applied.minUsers ||
    pending.permission !== applied.permission;

  const filters = useMemo<TableFilters>(
    () => ({
      type: applied.type === "Semua" ? undefined : applied.type,
      minUsers: applied.minUsers || undefined,
      permission: applied.permission || undefined,
    }),
    [applied]
  );

  return (
    <>
      {/* Filter Card */}
      <Collapsible open={openFilter} onOpenChange={setOpenFilter}>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          {/* Header / Trigger */}
          <CollapsibleTrigger className="flex items-center justify-between w-full px-5 py-3 group">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">Filter Role</p>
              {hasActiveFilters && (
                <Badge variant="soft" color="primary">
                  {
                    [
                      applied.type !== "Semua",
                      applied.minUsers !== "",
                      applied.permission !== "",
                    ].filter(Boolean).length
                  }{" "}
                  aktif
                </Badge>
              )}
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform duration-200",
                openFilter && "rotate-180"
              )}
            />
          </CollapsibleTrigger>

          {/* Collapsible content */}
          <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
            <Separator />
            <div className="px-5 pt-4 pb-4 flex flex-col gap-4">
              {/* Filter fields */}
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
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
                    <SelectTrigger className="h-9 text-sm w-48">
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
              </div>

              {/* Footer: buttons */}
              <div className="flex items-center justify-end gap-2 pt-1 border-t">
                <ResetButton
                  action={resetFilters}
                  disabled={!hasActiveFilters && !hasPendingChanges}
                />
                <FilterButton action={applyFilters} disabled={!hasPendingChanges} />
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Table Card */}
      <ContentCard
        title="Daftar Role"
        description="Kelola role dan izin akses pengguna"
        actions={<AddButton action={openTambah} label="Tambah Role" />}
      >
        <RolesTable onEdit={openEdit} filters={filters} />
      </ContentCard>

      <RoleModal mode={sheet.mode} data={sheet.data} open={sheet.open} onOpenChange={closeSheet} />
    </>
  );
}
