import type { TableFilters } from "@/stores/table.store";

export type RoleType = "Sistem" | "Kustom";

export interface Role {
  id: string;
  name: string;
  description: string;
  type: RoleType;
  userCount: number;
  permissions: string[];
  createdAt: string;
}

interface RolesResponse {
  data: Role[];
  meta: { page: { total: number } };
}

export async function fetchRoles(
  page: number,
  limit: number,
  filters: TableFilters
): Promise<RolesResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (filters.search) params.set("search", String(filters.search));
  if (filters.type) params.set("type", String(filters.type));

  const res = await fetch(`/api/roles?${params}`);
  if (!res.ok) throw new Error("Failed to fetch roles");
  return res.json() as Promise<RolesResponse>;
}
