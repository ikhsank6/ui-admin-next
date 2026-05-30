"use client";

import { Info, Plus, X } from "lucide-react";
import type * as React from "react";
import { useEffect, useState } from "react";
import { CancelButton } from "@/components/shared/button/cancel-button";
import { SaveButton } from "@/components/shared/button/save-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/utils/cn";

// ─── SheetFormField ───────────────────────────────────────────────────────────

type SheetFormFieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

export function SheetFormField({
  label,
  required,
  error,
  children,
  className,
}: SheetFormFieldProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        error &&
          "[&_input]:border-destructive [&_textarea]:border-destructive [&_[data-slot=select-trigger]]:border-destructive",
        className
      )}
    >
      <Label className="text-sm font-medium">
        {required && <span className="text-destructive mr-1">*</span>}
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

// ─── FormSheet ────────────────────────────────────────────────────────────────

type FormSheetProps = {
  title: string;
  /** Custom trigger element. Jika tidak diisi, render tombol Tambah default. */
  trigger?: React.ReactNode;
  /** Label tombol trigger default (hanya dipakai jika `trigger` tidak diisi). */
  triggerLabel?: string;
  children: React.ReactNode;
  infoMessage?: string;
  submitLabel?: string;
  onSubmit?: (close: () => void) => void;
  /** Controlled mode */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function FormSheet({
  title,
  trigger,
  triggerLabel = "Tambah",
  children,
  infoMessage,
  submitLabel = "Simpan",
  onSubmit,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: FormSheetProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 880px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 880px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  function setOpen(value: boolean) {
    if (isControlled) {
      controlledOnOpenChange?.(value);
    } else {
      setInternalOpen(value);
    }
    if (!value) setShowInfo(true);
  }

  function handleSubmit() {
    if (onSubmit) {
      onSubmit(() => setOpen(false));
    } else {
      setOpen(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {(!isControlled || trigger) && (
        <SheetTrigger asChild>
          {trigger ?? (
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              {triggerLabel}
            </Button>
          )}
        </SheetTrigger>
      )}

      <SheetContent
        side={isMobile ? "bottom" : "right"}
        showCloseButton={false}
        floating={!isMobile}
        className={cn(
          "p-0 flex flex-col gap-0",
          isMobile ? "h-[85svh] rounded-t-2xl" : "sm:max-w-md shadow-xl"
        )}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b shrink-0 space-y-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <SheetTitle className="text-xl font-bold">{title}</SheetTitle>
              <div className="h-0.5 w-10 bg-primary rounded-full mt-2" />
            </div>
            <SheetClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 -mt-1 -mr-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        {/* Body */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="px-6 py-5 flex flex-col gap-5">
            {infoMessage && showInfo && (
              <div className="flex items-start gap-2.5 bg-muted rounded-lg px-4 py-3 text-sm text-muted-foreground">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="flex-1">{infoMessage}</span>
                <button
                  type="button"
                  onClick={() => setShowInfo(false)}
                  className="shrink-0 hover:text-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            {children}
          </div>
        </div>

        {/* Footer */}
        <SheetFooter className="px-6 py-4 border-t flex-row gap-3 shrink-0">
          <SaveButton label={submitLabel} action={handleSubmit} />
          <CancelButton action={() => setOpen(false)} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
