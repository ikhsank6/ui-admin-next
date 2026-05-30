"use client";

import { Mic, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center gap-2 w-full max-w-xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
        <Input
          type="search"
          placeholder="Cari..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-4 h-9 bg-white/8 border-white/12 text-white placeholder:text-white/35 focus-visible:bg-white/12 focus-visible:border-white/25"
          aria-label="Pencarian global"
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 shrink-0 text-white/50 hover:text-white hover:bg-white/10"
        aria-label="Pencarian suara"
      >
        <Mic className="h-4 w-4" />
      </Button>
    </div>
  );
}
