"use client";

import { useState } from "react";
import { AddButton } from "@/components/shared/button/add-button";
import { ContentCard } from "@/components/shared/content-card";
import type { User } from "@/lib/api/users";
import { UserModal } from "./user-modal";
import { UsersTable } from "./users-table";

type SheetState = {
  open: boolean;
  mode: "tambah" | "edit";
  data: User | null;
};

export function UsersView() {
  const [sheet, setSheet] = useState<SheetState>({
    open: false,
    mode: "tambah",
    data: null,
  });

  function openTambah() {
    setSheet({ open: true, mode: "tambah", data: null });
  }

  function openEdit(user: User) {
    setSheet({ open: true, mode: "edit", data: user });
  }

  function closeSheet(open: boolean) {
    setSheet((prev) => ({ ...prev, open }));
  }

  return (
    <>
      <ContentCard
        title="Pengguna"
        description="Kelola semua pengguna dan hak akses"
        actions={<AddButton action={openTambah} />}
      >
        <UsersTable onEdit={openEdit} />
      </ContentCard>

      <UserModal mode={sheet.mode} data={sheet.data} open={sheet.open} onOpenChange={closeSheet} />
    </>
  );
}
