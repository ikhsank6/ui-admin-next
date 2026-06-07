"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { bottomNav, navGroups, primaryNav } from "@/utils/nav-config";

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Listen for Ctrl+K / Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  function handleSelect(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center lg:justify-between w-9 lg:w-64 h-9 p-0 lg:px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-left text-sm text-white/40 hover:text-white/60 focus:outline-hidden shrink-0"
        aria-label="Cari menu"
      >
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 shrink-0" />
          <span className="hidden lg:inline">Cari...</span>
        </div>
        <kbd className="hidden lg:inline-flex pointer-events-none h-5 select-none items-center gap-0.5 rounded-xs border border-white/15 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-white/50">
          <span className="text-[9px]">Ctrl+</span>K
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Pencarian Menu"
        description="Saring menu navigasi..."
      >
        <CommandInput placeholder="Ketik nama menu untuk mencari..." />
        <CommandList>
          <CommandEmpty>Menu tidak ditemukan.</CommandEmpty>
          
          <CommandGroup heading="Utama">
            {primaryNav.map((item) => (
              <CommandItem
                key={item.href}
                value={`Utama ${item.title}`}
                onSelect={() => handleSelect(item.href)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <item.icon className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
                <span className="flex-1 font-medium">{item.title}</span>
                <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm shrink-0">
                  Utama
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          {navGroups.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.href}
                  value={`${group.title} ${item.title}`}
                  onSelect={() => handleSelect(item.href)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <item.icon className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
                  <span className="flex-1 font-medium">{item.title}</span>
                  <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm shrink-0">
                    {group.title}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}

          <CommandGroup heading="Lainnya">
            {bottomNav.map((item) => (
              <CommandItem
                key={item.href}
                value={`Lainnya ${item.title}`}
                onSelect={() => handleSelect(item.href)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <item.icon className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
                <span className="flex-1 font-medium">{item.title}</span>
                <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm shrink-0">
                  Lainnya
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
