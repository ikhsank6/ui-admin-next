"use client";

import { ArrowLeft, CircleHelp, LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [confirmOpen, setConfirmOpen] = useState(false);

  function handleLogout() {
    // biome-ignore lint/suspicious/noDocumentCookie: mock auth for demo purposes
    document.cookie = "session=; path=/; max-age=0";
    router.push("/login");
  }

  return (
    <>
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent size="default" className="max-w-sm gap-5">
          <div className="flex justify-center">
            <CircleHelp className="w-18 h-18 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1.5 text-center">
            <AlertDialogTitle className="text-base">Keluar dari akun?</AlertDialogTitle>
            <AlertDialogDescription>
              Sesi Anda akan diakhiri dan Anda akan diarahkan ke halaman login.
            </AlertDialogDescription>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="gap-2 border-0 shadow-none bg-transparent hover:bg-transparent p-0 h-auto text-sm font-medium">
              <ArrowLeft className="h-4 w-4" />
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="rounded-full ring-2 ring-transparent hover:ring-white/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Menu pengguna"
          >
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarFallback className="rounded-full">AD</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64 p-0" sideOffset={8}>
          {/* Profile header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b">
            <Avatar className="h-10 w-10 shrink-0 rounded-full">
              <AvatarFallback className="text-sm font-semibold rounded-full">AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-semibold truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">admin@example.com</p>
            </div>
          </div>

          {/* Menu items */}
          <div className="p-1.5">
            <DropdownMenuItem
              onClick={() => router.push("/settings")}
              className="gap-2.5 rounded-lg px-3 py-2"
            >
              <User className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm">Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/settings")}
              className="gap-2.5 rounded-lg px-3 py-2"
            >
              <Settings className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm">Pengaturan</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1.5" />

            <DropdownMenuItem
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="gap-2.5 rounded-lg px-3 py-2"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4 text-muted-foreground shrink-0" />
              ) : (
                <Moon className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
              <span className="text-sm">
                {resolvedTheme === "dark" ? "Mode Terang" : "Mode Gelap"}
              </span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1.5" />

            <DropdownMenuItem
              onClick={() => setConfirmOpen(true)}
              className="gap-2.5 rounded-lg px-3 py-2 text-muted- shrink-0 focus:text-destructive focus:bg-destructive/10"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span className="text-sm">Keluar</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
