"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { useTable } from "@/hooks/use-table";
import type { Role } from "@/lib/api/roles";
import { fetchRoles } from "@/lib/api/roles";
import type { TableFilters } from "@/stores/table.store";

const TABLE_KEY = "roles";

const COLUMNS = [
  {
    key: "name",
    header: "Nama Role",
    hideable: false,
    cell: (role: Role) => (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
          {role.name[0]}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{role.name}</span>
          <span className="text-xs text-muted-foreground line-clamp-1">{role.description}</span>
        </div>
      </div>
    ),
  },
  {
    key: "type",
    header: "Tipe",
    cell: (role: Role) => (
      <Badge
        variant={role.type === "Sistem" ? "plain" : "plain"}
        color={role.type === "Sistem" ? "primary" : "warning"}
        radius={"full"}
      >
        {role.type}
      </Badge>
    ),
  },
  {
    key: "permissions",
    header: "Izin",
    cell: (role: Role) => (
      <div className="flex flex-wrap gap-1 max-w-[220px]">
        {role.permissions.slice(0, 3).map((p) => (
          <Badge key={p} variant="plain" color="info">
            {p}
          </Badge>
        ))}
        {role.permissions.length > 3 && (
          <Badge variant="plain" color="info">
            +{role.permissions.length - 3}
          </Badge>
        )}
      </div>
    ),
  },
  {
    key: "userCount",
    header: "Pengguna",
    cell: (role: Role) => <span className="text-sm font-medium">{role.userCount}</span>,
  },
  {
    key: "createdAt",
    header: "Dibuat",
    cell: (role: Role) => (
      <span className="text-muted-foreground text-sm">
        {new Date(role.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </span>
    ),
  },
];

type RolesTableProps = {
  onEdit?: (role: Role) => void;
  filters?: TableFilters;
};

export function RolesTable({ onEdit, filters }: RolesTableProps) {
  const table = useTable<Role>(TABLE_KEY, fetchRoles);

  useEffect(() => {
    if (filters) table.setFilters(filters);
  }, [filters, table.setFilters]);

  return (
    <DataTable<Role>
      data={table.data}
      columns={COLUMNS}
      actions={{
        onView: (role) => toast.info(`Melihat detail ${role.name}`),
        onEdit: onEdit ?? ((role) => toast.info(`Edit role ${role.name}`)),
        onDelete: (role) => toast.error(`Hapus role ${role.name}?`),
      }}
      loading={table.loading}
      isError={table.error}
      keyExtractor={(r) => r.id}
      searchPlaceholder="Cari nama atau deskripsi..."
      searchValue={String(table.filters.search ?? "")}
      onSearch={(v) => table.setFilters({ ...filters, search: v })}
      onRefresh={table.refresh}
      showPagination
      currentPage={table.page}
      totalPages={table.totalPages}
      totalItems={table.totalItems}
      itemsPerPage={table.limit}
      onPageChange={table.setPage}
      onItemsPerPageChange={table.setLimit}
    />
  );
}
