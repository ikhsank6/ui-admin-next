"use client";

import { toast } from "sonner";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { useTable } from "@/hooks/use-table";
import type { User } from "@/lib/api/users";
import { fetchUsers } from "@/lib/api/users";

const TABLE_KEY = "users";

const ROLE_VARIANT = {
  Admin: "default",
  Editor: "secondary",
  Viewer: "outline",
} as const;

const STATUS_VARIANT = {
  Aktif: "default",
  Pending: "secondary",
  Ditangguhkan: "destructive",
} as const;

const COLUMNS = [
  {
    key: "name",
    header: "Nama",
    hideable: false,
    cell: (user: User) => (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">
          {user.name[0]}
        </div>
        <span className="font-medium text-sm">{user.name}</span>
      </div>
    ),
  },
  {
    key: "email",
    header: "Email",
    cell: (user: User) => <span className="text-muted-foreground text-sm">{user.email}</span>,
  },
  {
    key: "role",
    header: "Role",
    cell: (user: User) => (
      <Badge variant={ROLE_VARIANT[user.role]} className="text-xs">
        {user.role}
      </Badge>
    ),
  },
  {
    key: "status",
    header: "Status",
    cell: (user: User) => (
      <Badge variant={STATUS_VARIANT[user.status]} className="text-xs">
        {user.status}
      </Badge>
    ),
  },
  {
    key: "joinedAt",
    header: "Bergabung",
    cell: (user: User) => (
      <span className="text-muted-foreground text-sm">
        {new Date(user.joinedAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </span>
    ),
  },
];

type UsersTableProps = {
  onEdit?: (user: User) => void;
};

export function UsersTable({ onEdit }: UsersTableProps) {
  const table = useTable<User>(TABLE_KEY, fetchUsers);

  return (
    <DataTable<User>
      data={table.data}
      columns={COLUMNS}
      actions={{
        onView: (user) => toast.info(`Melihat profil ${user.name}`),
        onEdit: onEdit ?? ((user) => toast.info(`Edit pengguna ${user.name}`)),
        onDelete: (user) => toast.error(`Hapus ${user.name}?`),
      }}
      loading={table.loading}
      isError={table.error}
      keyExtractor={(u) => u.id}
      searchPlaceholder="Cari nama atau email..."
      searchValue={String(table.filters.search ?? "")}
      onSearch={(v) => table.setFilters({ search: v })}
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
