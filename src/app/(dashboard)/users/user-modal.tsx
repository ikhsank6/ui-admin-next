"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormSheet, SheetFormField } from "@/components/shared/form-sheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { User } from "@/lib/api/users";

// ─── Schema ───────────────────────────────────────────────────────────────────

const userSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").min(3, "Nama minimal 3 karakter"),
  email: z.string().min(1, "Email wajib diisi").pipe(z.email("Format email tidak valid")),
  role: z.enum(["Admin", "Editor", "Viewer"], {
    message: "Role wajib dipilih",
  }),
  status: z.enum(["Aktif", "Pending", "Ditangguhkan"], {
    message: "Status wajib dipilih",
  }),
  keterangan: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

// ─── Component ────────────────────────────────────────────────────────────────

type UserModalProps = {
  mode: "tambah" | "edit";
  data?: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function UserModal({ mode, data, open, onOpenChange }: UserModalProps) {
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role: undefined,
      status: undefined,
      keterangan: "",
    },
  });

  // Sync form dengan data ketika sheet dibuka
  useEffect(() => {
    if (open) {
      reset({
        name: data?.name ?? "",
        email: data?.email ?? "",
        role: (data?.role as UserFormValues["role"]) ?? undefined,
        status: (data?.status as UserFormValues["status"]) ?? undefined,
        keterangan: "",
      });
    }
  }, [open, data, reset]);

  function onSubmit(close: () => void) {
    handleSubmit((values) => {
      if (isEdit) {
        // TODO: panggil API update user
        console.log("Edit:", values);
      } else {
        // TODO: panggil API tambah user
        console.log("Tambah:", values);
      }
      close();
    })();
  }

  return (
    <FormSheet
      title={isEdit ? "Edit Pengguna" : "Tambah Pengguna"}
      infoMessage={isEdit ? undefined : "Data pengguna akan langsung aktif setelah disimpan"}
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
    >
      <SheetFormField label="Nama" required error={errors.name?.message}>
        <Input placeholder="Nama lengkap" {...register("name")} />
      </SheetFormField>

      <SheetFormField label="Email" required error={errors.email?.message}>
        <Input type="email" placeholder="email@contoh.com" {...register("email")} />
      </SheetFormField>

      <SheetFormField label="Role" required error={errors.role?.message}>
        <Select
          value={watch("role")}
          onValueChange={(v) =>
            setValue("role", v as UserFormValues["role"], { shouldValidate: true })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="Viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </SheetFormField>

      <SheetFormField label="Status" required error={errors.status?.message}>
        <Select
          value={watch("status")}
          onValueChange={(v) =>
            setValue("status", v as UserFormValues["status"], { shouldValidate: true })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Aktif">Aktif</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Ditangguhkan">Ditangguhkan</SelectItem>
          </SelectContent>
        </Select>
      </SheetFormField>

      <SheetFormField label="Keterangan" error={errors.keterangan?.message}>
        <Textarea
          placeholder="Keterangan tambahan (opsional)"
          rows={3}
          {...register("keterangan")}
        />
      </SheetFormField>
    </FormSheet>
  );
}
