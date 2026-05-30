"use client";

import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="flex flex-col items-center text-center gap-5 max-w-sm w-full">
        <div className="h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="h-7 w-7 text-destructive" />
        </div>

        <div className="flex flex-col gap-1.5">
          <h1 className="text-xl font-bold">Terjadi Kesalahan</h1>
          <p className="text-sm text-muted-foreground">
            Sesuatu yang tidak terduga terjadi. Silakan coba lagi.
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-muted-foreground/60 mt-1">ID: {error.digest}</p>
          )}
        </div>

        <div className="flex gap-3 w-full">
          <Button className="flex-1" onClick={reset}>
            Coba Lagi
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
