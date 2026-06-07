"use client";

import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// ─── Types ──────────────────────────────────────────────────────────────────────

export type ActiveFilterPill = {
  label: string;
  value: string;
};

export type FilterModalProps = {
  /** Whether the modal is open */
  open: boolean;
  /** Called when modal open-state changes */
  onOpenChange: (open: boolean) => void;
  /** Modal title */
  title: string;
  /** Modal description */
  description: string;
  /** Filter form fields rendered inside the body */
  children: ReactNode;
  /** Active filter pills displayed at the bottom of the body */
  activePills?: ActiveFilterPill[];
  /** Called when the "Terapkan" (apply) button is clicked */
  onApply: () => void;
  /** Called when the "Reset" button is clicked (reset pending to defaults) */
  onResetPending: () => void;
  /** Called when the "Hapus Filter" button is clicked (clear all + close) */
  onClearAll: () => void;
  /** Whether any filter is currently applied */
  hasActiveFilters: boolean;
  /** Whether the pending state differs from applied state */
  hasPendingChanges: boolean;
  /** Whether the pending state is all-default (disable reset button) */
  isPendingDefault: boolean;
};

// ─── Component ──────────────────────────────────────────────────────────────────

export function FilterModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  activePills = [],
  onApply,
  onResetPending,
  onClearAll,
  hasActiveFilters,
  hasPendingChanges,
  isPendingDefault,
}: FilterModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
            </div>
            <div>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <div className="flex flex-col gap-5 py-1">
          {children}

          {/* Active filter pills */}
          {activePills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {activePills.map((pill) => (
                <Badge key={pill.label} variant="soft" color="primary" className="text-xs">
                  {pill.label}: {pill.value}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Separator />

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground"
            onClick={onResetPending}
            disabled={isPendingDefault}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
          {hasActiveFilters && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={onClearAll}
            >
              Hapus Filter
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            className="gap-1.5"
            onClick={onApply}
            disabled={!hasPendingChanges && !hasActiveFilters}
          >
            <Search className="h-3.5 w-3.5" />
            Terapkan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
