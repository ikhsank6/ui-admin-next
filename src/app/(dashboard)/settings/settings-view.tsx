"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SaveButton } from "@/components/shared/button/save-button";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { PasswordStrength, passwordSchema } from "@/components/shared/password-strength";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/cn";

type Tab = "general" | "security";

const profileSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().min(1, "Email wajib diisi").pipe(z.email("Email tidak valid")),
});
type ProfileForm = z.infer<typeof profileSchema>;

const securitySchema = z
  .object({
    currentPassword: z.string().min(1, "Password saat ini wajib diisi"),
    newPassword: passwordSchema("Password baru belum memenuhi seluruh ketentuan"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });
type SecurityForm = z.infer<typeof securitySchema>;

function PasswordInput({
  id,
  placeholder,
  ...props
}: React.ComponentProps<typeof Input> & { id: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        id={id}
        type={show ? "text" : "password"}
        className="pl-9 pr-10"
        placeholder={placeholder}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShow((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "Administrator", email: "admin@example.com" },
  });

  const securityForm = useForm<SecurityForm>({
    resolver: zodResolver(securitySchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  }

  function onProfileSubmit(values: ProfileForm) {
    console.log(values);
    toast.success("Profil berhasil disimpan!");
  }

  function onSecuritySubmit(values: SecurityForm) {
    console.log(values);
    toast.success("Password berhasil diubah!");
    securityForm.reset();
  }

  const displayName = profileForm.watch("name") || "Administrator";

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageBreadcrumb items={[{ label: "Pengaturan", href: "/settings" }]} />

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pengaturan Profil</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola informasi akun dan keamanan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ── Avatar Card ── */}
        <Card className="p-6 flex flex-col items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-28 h-28 rounded-full overflow-hidden bg-muted border-2 border-border hover:opacity-90 transition-opacity shrink-0"
              aria-label="Ganti foto profil"
            >
              {avatar ? (
                <Image
                  src={avatar}
                  alt="Avatar"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-3xl font-bold text-muted-foreground select-none">
                  {displayName[0]?.toUpperCase()}
                </span>
              )}
            </button>
            {avatar && (
              <button
                type="button"
                onClick={() => setAvatar(null)}
                className="absolute top-0.5 right-0.5 h-6 w-6 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/80 transition-colors"
                aria-label="Hapus foto"
              >
                <span className="text-sm font-bold leading-none">×</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <p className="font-bold text-base text-center">{displayName}</p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Ganti foto
          </button>
        </Card>

        {/* ── Tabs + Form Card ── */}
        <Card className="lg:col-span-3 p-6 flex flex-col gap-6">
          {/* Tab bar */}
          <div className="flex rounded-xl bg-muted p-1 gap-1">
            {(["general", "security"] as Tab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors",
                  activeTab === tab
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab === "general" ? "Informasi Umum" : "Keamanan"}
              </button>
            ))}
          </div>

          {/* General Tab */}
          {activeTab === "general" && (
            <form
              onSubmit={profileForm.handleSubmit(onProfileSubmit)}
              className="flex flex-col gap-5"
            >
              <div>
                <h2 className="text-base font-semibold">Profil</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Perbarui informasi nama dan alamat email Anda.
                </p>
              </div>
              <Separator />

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      className="pl-9"
                      placeholder="Nama Anda"
                      aria-invalid={!!profileForm.formState.errors.name}
                      {...profileForm.register("name")}
                    />
                  </div>
                  {profileForm.formState.errors.name && (
                    <p className="text-xs text-destructive">
                      {profileForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-9"
                      placeholder="email@example.com"
                      aria-invalid={!!profileForm.formState.errors.email}
                      {...profileForm.register("email")}
                    />
                  </div>
                  {profileForm.formState.errors.email && (
                    <p className="text-xs text-destructive">
                      {profileForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <Separator />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  Terakhir diperbarui: 28/1/2026
                </div>
                <SaveButton label="Simpan Perubahan" loading={profileForm.formState.isSubmitting} />
              </div>
            </form>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <form
              onSubmit={securityForm.handleSubmit(onSecuritySubmit)}
              className="flex flex-col gap-5"
            >
              <div>
                <h2 className="text-base font-semibold">Keamanan</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Perbarui password untuk menjaga keamanan akun Anda.
                </p>
              </div>
              <Separator />

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="currentPassword">Password Saat Ini</Label>
                  <PasswordInput
                    id="currentPassword"
                    aria-invalid={!!securityForm.formState.errors.currentPassword}
                    {...securityForm.register("currentPassword")}
                  />
                  {securityForm.formState.errors.currentPassword && (
                    <p className="text-xs text-destructive">
                      {securityForm.formState.errors.currentPassword.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="newPassword">Password Baru</Label>
                  <PasswordInput
                    id="newPassword"
                    aria-invalid={!!securityForm.formState.errors.newPassword}
                    {...securityForm.register("newPassword")}
                  />
                  <PasswordStrength value={securityForm.watch("newPassword")} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                  <PasswordInput
                    id="confirmPassword"
                    aria-invalid={!!securityForm.formState.errors.confirmPassword}
                    {...securityForm.register("confirmPassword")}
                  />
                  {securityForm.formState.errors.confirmPassword && (
                    <p className="text-xs text-destructive">
                      {securityForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <Separator />
              <div className="flex justify-end">
                <SaveButton label="Ubah Password" loading={securityForm.formState.isSubmitting} />
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
