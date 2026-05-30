"use client";

import { ArrowUpLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const DASHES = [
  // kiri
  { id: "l1", color: "#22c55e", top: 8, left: 0, width: 44, height: 7 },
  { id: "l2", color: "#eab308", top: 20, left: -6, width: 28, height: 7 },
  { id: "l3", color: "#3b82f6", top: 33, left: -2, width: 36, height: 7 },
  { id: "l4", color: "#ef4444", top: 46, left: 1, width: 20, height: 7 },
  { id: "l5", color: "#22c55e", top: 60, left: -4, width: 32, height: 7 },
  { id: "l6", color: "#eab308", top: 74, left: 2, width: 18, height: 7 },
  { id: "l7", color: "#3b82f6", top: 86, left: -1, width: 26, height: 7 },
  // atas tengah
  { id: "t1", color: "#3b82f6", top: 2, left: 30, width: 20, height: 7 },
  { id: "t2", color: "#ef4444", top: -5, left: 42, width: 16, height: 7 },
  { id: "t3", color: "#22c55e", top: 2, left: 55, width: 24, height: 7 },
  { id: "t4", color: "#eab308", top: -3, left: 68, width: 14, height: 7 },
  // bawah tengah
  { id: "b1", color: "#ef4444", top: 92, left: 35, width: 28, height: 7 },
  { id: "b2", color: "#22c55e", top: 98, left: 50, width: 18, height: 7 },
  { id: "b3", color: "#3b82f6", top: 92, left: 62, width: 22, height: 7 },
  // kanan
  { id: "r1", color: "#22c55e", top: 10, left: 90, width: 38, height: 7 },
  { id: "r2", color: "#eab308", top: 24, left: 96, width: 22, height: 7 },
  { id: "r3", color: "#ef4444", top: 38, left: 92, width: 30, height: 7 },
  { id: "r4", color: "#3b82f6", top: 52, left: 94, width: 18, height: 7 },
  { id: "r5", color: "#22c55e", top: 66, left: 91, width: 26, height: 7 },
  { id: "r6", color: "#eab308", top: 80, left: 93, width: 14, height: 7 },
];

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-10 p-6">
      {/* 404 illustration */}
      <div className="relative select-none" style={{ width: 340, height: 200 }}>
        {/* Dashes */}
        {DASHES.map((d) => (
          <span
            key={d.id}
            className="absolute rounded-full"
            style={{
              backgroundColor: d.color,
              top: `${d.top}%`,
              left: `${d.left}%`,
              width: d.width,
              height: d.height,
            }}
          />
        ))}

        {/* Numbers */}
        <div
          className="absolute inset-0 flex items-center justify-center gap-1 leading-none font-black"
          style={{ fontSize: 160 }}
        >
          <span style={{ color: "#f59e0b" }}>4</span>
          <span style={{ color: "#ef4444" }}>0</span>
          <span style={{ color: "#3b82f6" }}>4</span>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-3xl font-black tracking-tight">Halaman tidak ditemukan</h1>
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau alamatnya tidak valid.
        </p>
      </div>

      {/* Back button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Kembali"
              className="flex items-center justify-center w-14 h-14 rounded-full bg-foreground text-background hover:opacity-80 transition-opacity"
            >
              <ArrowUpLeft className="w-6 h-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Kembali ke halaman sebelumnya</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
