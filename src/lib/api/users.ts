import type { TableFilters } from "@/stores/table.store";

export type UserRole = "Admin" | "Editor" | "Viewer";
export type UserStatus = "Aktif" | "Pending" | "Ditangguhkan";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedAt: string;
}

interface UsersResponse {
  data: User[];
  meta: { page: { total: number } };
}

export async function fetchUsers(
  page: number,
  limit: number,
  filters: TableFilters
): Promise<UsersResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (filters.search) params.set("search", String(filters.search));
  if (filters.status) params.set("status", String(filters.status));

  const res = await fetch(`/api/users?${params}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json() as Promise<UsersResponse>;
}
