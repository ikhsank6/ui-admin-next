"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormSheet, SheetFormField } from "@/components/shared/form-sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Role } from "@/lib/api/roles";

// ─── Schema ───────────────────────────────────────────────────────────────────

const ALL_PERMISSIONS = [
  "Baca",
  "Tulis",
  "Hapus",
  "Kelola Pengguna",
  "Kelola Role",
  "Lihat Analitik",
  "Ekspor Data",
  "Pengaturan Sistem",
] as const;

const roleSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").min(2, "Nama minimal 2 karakter"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  type: z.enum(["Sistem", "Kustom"], { message: "Tipe wajib dipilih" }),
  permissions: z.array(z.string()).min(1, "Pilih minimal satu izin"),
});

type RoleFormValues = z.infer<typeof roleSchema>;

// ─── Component ────────────────────────────────────────────────────────────────

type RoleModalProps = {
  mode: "tambah" | "edit";
  data?: Role | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RoleModal({ mode, data, open, onOpenChange }: RoleModalProps) {
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
      type: undefined,
      permissions: [],
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: data?.name ?? "",
        description: data?.description ?? "",
        type: (data?.type as RoleFormValues["type"]) ?? undefined,
        permissions: data?.permissions ?? [],
      });
    }
  }, [open, data, reset]);

  const selectedPermissions = watch("permissions") ?? [];

  function togglePermission(perm: string) {
    const current = selectedPermissions;
    const next = current.includes(perm) ? current.filter((p) => p !== perm) : [...current, perm];
    setValue("permissions", next, { shouldValidate: true });
  }

  function onSubmit(close: () => void) {
    handleSubmit((values) => {
      console.log(isEdit ? "Edit:" : "Tambah:", values);
      close();
    })();
  }

  return (
    <FormSheet
      title={isEdit ? "Edit Role" : "Tambah Role"}
      infoMessage={
        isEdit ? undefined : "Role baru akan langsung aktif dan dapat diassign ke pengguna"
      }
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
    >
      <SheetFormField label="Nama Role" required error={errors.name?.message}>
        <Input placeholder="Contoh: Content Manager" {...register("name")} />
      </SheetFormField>

      <SheetFormField label="Deskripsi" required error={errors.description?.message}>
        <Textarea
          placeholder="Jelaskan fungsi dan batasan role ini"
          rows={3}
          {...register("description")}
        />
      </SheetFormField>

      <SheetFormField label="Tipe" required error={errors.type?.message}>
        <Select
          value={watch("type")}
          onValueChange={(v) =>
            setValue("type", v as RoleFormValues["type"], { shouldValidate: true })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih tipe role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sistem">Sistem</SelectItem>
            <SelectItem value="Kustom">Kustom</SelectItem>
          </SelectContent>
        </Select>
      </SheetFormField>

      <SheetFormField label="Izin Akses" required error={errors.permissions?.message}>
        <div className="grid grid-cols-2 gap-2">
          {ALL_PERMISSIONS.map((perm) => (
            <div key={perm} className="flex items-center gap-2">
              <Checkbox
                id={`perm-${perm}`}
                checked={selectedPermissions.includes(perm)}
                onCheckedChange={() => togglePermission(perm)}
              />
              <Label htmlFor={`perm-${perm}`} className="text-sm font-normal cursor-pointer">
                {perm}
              </Label>
            </div>
          ))}
        </div>
      </SheetFormField>
    </FormSheet>
  );
}
