"use client";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  LayoutGrid,
  LayoutList,
  Loader2,
  Pencil,
  RefreshCw,
  Search,
  Table2,
  Trash2,
  X,
} from "lucide-react";
import * as React from "react";
import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Column<T> {
  key: string;
  header: string;
  cell: (item: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  hideable?: boolean; // bisa disembunyikan user (default: true)
  defaultVisible?: boolean; // tampil saat pertama kali (default: true)
}

export interface CustomAction<T> {
  label: string;
  icon: React.ReactNode;
  onClick: (item: T) => void;
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost";
  className?: string;
  showCondition?: (item: T) => boolean;
}

export interface TableActions<T> {
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  customActions?: CustomAction<T>[];
}

interface DataTableProps<T> {
  // Data
  data: T[];
  columns: Column<T>[];
  actions?: TableActions<T>;
  loading?: boolean;
  keyExtractor: (item: T) => string;
  // Controls
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  searchValue?: string;
  onRefresh?: () => void;
  headerAction?: React.ReactNode;
  filters?: React.ReactNode; // slot filter (dropdown dll) di kiri toolbar
  // Messages
  emptyMessage?: string;
  loadingMessage?: string;
  isError?: boolean;
  errorMessage?: string;
  // Pagination
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  onItemsPerPageChange?: (value: number) => void;
  // Misc
  showViewToggle?: boolean;
  showColumnVisibility?: boolean;
  showRefresh?: boolean;
  className?: string;
}

// ─── DataTable ────────────────────────────────────────────────────────────────

export function DataTable<T>({
  data,
  columns,
  actions,
  loading = false,
  keyExtractor,
  searchPlaceholder = "Search...",
  onSearch,
  searchValue = "",
  onRefresh,
  headerAction,
  filters,
  emptyMessage = "Tidak ada data.",
  loadingMessage = "Memuat data...",
  isError = false,
  errorMessage = "Gagal memuat data.",
  showPagination = true,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems,
  itemsPerPage = 10,
  onItemsPerPageChange,
  showViewToggle = false,
  showColumnVisibility = false,
  showRefresh = false,
  className,
}: DataTableProps<T>) {
  const [viewMode, setViewMode] = React.useState<"table" | "grid">("table");
  const [visibleColumnKeys, setVisibleColumnKeys] = React.useState<Set<string>>(
    () => new Set(columns.filter((c) => c.defaultVisible !== false).map((c) => c.key))
  );

  const hideableColumns = columns.filter((c) => c.hideable !== false);
  const allHideableVisible = hideableColumns.every((c) => visibleColumnKeys.has(c.key));

  // (goToPage dihapus — pagination kini hanya nomor halaman sesuai guideline)
  const visibleColumns = columns.filter(
    (c) => c.hideable === false || visibleColumnKeys.has(c.key)
  );

  function toggleColumn(key: string) {
    setVisibleColumnKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function toggleAllColumns() {
    if (allHideableVisible) {
      setVisibleColumnKeys(new Set(columns.filter((c) => c.hideable === false).map((c) => c.key)));
    } else {
      setVisibleColumnKeys(new Set(columns.map((c) => c.key)));
    }
  }

  React.useEffect(() => {
    const handle = () => setViewMode(window.innerWidth < 768 ? "grid" : "table");
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  // ── Toolbar ──────────────────────────────────────────────────────────────────
  const toolbar = (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b px-4 py-3">
      {/* Left: filters + search */}
      <div className="flex flex-wrap items-center gap-2 w-full sm:flex-1">
        {filters}
        {onSearch && (
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-9 pr-8 h-9"
            />
            {searchValue && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                onClick={() => onSearch("")}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Right: Tampilkan N entri + headerAction + refresh + column visibility + view toggle */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {onItemsPerPageChange && (
          <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="whitespace-nowrap">Tampilkan</span>
            <Select
              value={String(itemsPerPage)}
              onValueChange={(v) => onItemsPerPageChange(Number.parseInt(v, 10))}
            >
              <SelectTrigger className="h-9 w-[72px] text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50, 100].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="whitespace-nowrap">entri</span>
          </div>
        )}
        {headerAction}

        {showRefresh && onRefresh && (
          <ActionButton
            variant="outline"
            size="sm"
            className="h-9 gap-1.5"
            onClick={onRefresh}
            loading={loading}
            icon={<RefreshCw className="h-4 w-4" />}
            title="Muat Ulang"
            tooltip="Muat Ulang"
          />
        )}

        {showColumnVisibility && (
          <Popover>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline" size="sm" className="h-9 gap-1.5">
                      <Table2 className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent>Visibilitas kolom</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <PopoverContent align="end" className="w-48 p-1.5">
              {/* Semua */}
              <button
                type="button"
                onClick={toggleAllColumns}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                  allHideableVisible ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent"
                )}
              >
                {allHideableVisible && <Check className="h-3.5 w-3.5 shrink-0" />}
                <span className={allHideableVisible ? "" : "pl-[18px]"}>Semua</span>
              </button>
              <Separator className="my-1" />
              {/* Non-hideable (locked) */}
              {columns
                .filter((c) => c.hideable === false)
                .map((col) => (
                  <div
                    key={col.key}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 opacity-40" />
                    <span>{col.header}</span>
                  </div>
                ))}
              {/* Hideable columns */}
              {hideableColumns.map((col) => {
                const visible = visibleColumnKeys.has(col.key);
                return (
                  <button
                    key={col.key}
                    type="button"
                    onClick={() => toggleColumn(col.key)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors"
                  >
                    <Check
                      className={cn(
                        "h-3.5 w-3.5 shrink-0 transition-opacity",
                        visible ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span>{col.header}</span>
                  </button>
                );
              })}
            </PopoverContent>
          </Popover>
        )}

        {showViewToggle && (
          <div className="flex items-center rounded-md border bg-muted/30 p-0.5">
            <Button
              type="button"
              variant={viewMode === "table" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7 rounded-sm"
              onClick={() => setViewMode("table")}
            >
              <LayoutList className="h-3.5 w-3.5" />
            </Button>
            <Button
              type="button"
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-7 w-7 rounded-sm"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  // ── Table Content ─────────────────────────────────────────────────────────────
  const colSpan = visibleColumns.length + (actions ? 1 : 0);

  const emptyRow = (
    <TableRow className="dark:bg-[hsl(var(--table-bg))] hover:bg-transparent">
      <TableCell colSpan={colSpan} className="h-48 text-center text-muted-foreground">
        <div className="flex flex-col items-center gap-3">
          <span>{isError ? errorMessage : emptyMessage}</span>
          {isError && onRefresh && (
            <ActionButton
              variant="outline"
              size="icon"
              onClick={onRefresh}
              className="h-8 w-8"
              icon={<RefreshCw className="h-4 w-4" />}
              tooltip="Coba lagi"
            />
          )}
        </div>
      </TableCell>
    </TableRow>
  );

  const loadingRow = (
    <TableRow className="dark:bg-[hsl(var(--table-bg))] hover:bg-transparent">
      <TableCell colSpan={colSpan} className="h-32 text-center">
        <div className="flex justify-center items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingMessage}
        </div>
      </TableCell>
    </TableRow>
  );

  const tableView = (
    <div className="overflow-x-auto">
      <Table className="dark:bg-[hsl(var(--table-bg))]">
        <TableHeader className="bg-[#F8FAFC] dark:bg-[hsl(var(--table-bg))] border-b-2 border-border [&_tr]:border-b-0">
          <TableRow className="hover:bg-transparent">
            {visibleColumns.map((col) => (
              <TableHead
                key={col.key}
                className={cn(
                  "text-[11.5px] font-bold uppercase tracking-[0.4px] text-muted-foreground px-4 py-3",
                  col.headerClassName
                )}
              >
                {col.header}
              </TableHead>
            ))}
            {actions && (
              <TableHead className="text-[11.5px] font-bold uppercase tracking-[0.4px] text-muted-foreground text-right px-4 w-px whitespace-nowrap">
                Aksi
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? loadingRow
            : data.length === 0
              ? emptyRow
              : data.map((item) => (
                  <TableRow
                    key={keyExtractor(item)}
                    className="group bg-card even:bg-[hsl(var(--table-header))] hover:bg-[hsl(var(--row-hover))] dark:bg-[hsl(var(--table-bg))] dark:even:bg-[hsl(var(--table-header))]"
                  >
                    {visibleColumns.map((col) => (
                      <TableCell key={col.key} className={cn("px-4 py-3", col.className)}>
                        {col.cell(item)}
                      </TableCell>
                    ))}
                    {actions && (
                      <TableCell className="text-right px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          {actions.onView && (
                            <ActionButton
                              variant="outline"
                              size="sm"
                              className="h-8 gap-1.5 border-primary/30 text-primary hover:bg-primary-light hover:text-primary hover:border-primary/40"
                              onClick={() => actions.onView?.(item)}
                              icon={<Eye className="h-4 w-4" />}
                              title="Detail"
                              tooltip="Lihat Detail"
                            />
                          )}
                          {actions.onEdit && (
                            <ActionButton
                              variant="outline"
                              size="icon-sm"
                              className="text-muted-foreground hover:text-primary hover:border-primary/40"
                              onClick={() => actions.onEdit?.(item)}
                              icon={<Pencil className="h-4 w-4" />}
                              tooltip="Edit"
                            />
                          )}
                          {actions.onDelete && (
                            <ActionButton
                              variant="outline"
                              size="icon-sm"
                              className="text-muted-foreground hover:text-destructive hover:border-destructive/40"
                              onClick={() => actions.onDelete?.(item)}
                              icon={<Trash2 className="h-4 w-4" />}
                              tooltip="Hapus"
                            />
                          )}
                          {actions.customActions
                            ?.filter((a) => !a.showCondition || a.showCondition(item))
                            .map((a) => (
                              <ActionButton
                                key={a.label}
                                variant={a.variant ?? "outline"}
                                size="icon-sm"
                                className={cn(
                                  "text-muted-foreground hover:text-foreground",
                                  a.className
                                )}
                                onClick={() => a.onClick(item)}
                                icon={a.icon}
                                tooltip={a.label}
                              />
                            ))}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
        </TableBody>
      </Table>
    </div>
  );

  const gridView = (
    <div className="p-4 dark:bg-[hsl(var(--table-bg))]">
      {loading ? (
        <div className="flex justify-center items-center h-48 gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          {loadingMessage}
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground border border-dashed rounded-lg gap-3">
          <span>{isError ? errorMessage : emptyMessage}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map((item) => (
            <div
              key={keyExtractor(item)}
              className="group relative rounded-xl border bg-card p-5 hover:shadow-md transition-shadow"
            >
              <GridCardContent item={item} columns={columns} actions={actions} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ── Pagination ───────────────────────────────────────────────────────────────
  const pagination = showPagination && (
    <div className="border-t px-4 py-3 text-sm text-muted-foreground">
      {/* Mobile: Page X of Y + Previous/Next */}
      <div className="flex items-center justify-between sm:hidden">
        <span>
          Halaman <span className="font-semibold text-foreground">{currentPage}</span> dari{" "}
          <span className="font-semibold text-foreground">{totalPages}</span>
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3"
            disabled={currentPage <= 1 || loading}
            onClick={() => onPageChange?.(currentPage - 1)}
          >
            Sebelumnya
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3"
            disabled={currentPage >= totalPages || loading}
            onClick={() => onPageChange?.(currentPage + 1)}
          >
            Berikutnya
          </Button>
        </div>
      </div>

      {/* Desktop: count (kiri) + pagination (kanan) */}
      <div className="hidden sm:flex items-center justify-between gap-3">
        {/* Menampilkan X sampai Y dari Z data — rata kiri */}
        <p className="text-sm whitespace-nowrap">
          {totalItems !== undefined ? (
            <>
              Menampilkan{" "}
              <span className="font-semibold text-foreground">
                {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}
              </span>
              {" sampai "}
              <span className="font-semibold text-foreground">
                {Math.min(currentPage * itemsPerPage, totalItems)}
              </span>
              {" dari "}
              <span className="font-semibold text-foreground">
                {totalItems.toLocaleString("id-ID")}
              </span>{" "}
              data
            </>
          ) : (
            <>
              <span className="font-semibold text-foreground">{data.length}</span> data
            </>
          )}
        </p>

        {/* Pagination buttons — rata kanan */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            disabled={currentPage <= 1 || loading}
            onClick={() => onPageChange?.(currentPage - 1)}
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {buildPageNumbers(currentPage, totalPages).map((page, idx) =>
            page === "ellipsis" ? (
              // biome-ignore lint/suspicious/noArrayIndexKey: static ellipsis list
              <span key={`e-${idx}`} className="px-2 text-muted-foreground">
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="icon-sm"
                className="text-sm"
                disabled={loading}
                onClick={() => onPageChange?.(page as number)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </Button>
            )
          )}

          <Button
            variant="outline"
            size="icon-sm"
            disabled={currentPage >= totalPages || loading}
            onClick={() => onPageChange?.(currentPage + 1)}
            aria-label="Halaman berikutnya"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("overflow-hidden", className)}>
      {toolbar}
      {viewMode === "table" ? tableView : gridView}
      {pagination}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "ellipsis")[] = [1];
  if (current > 3) pages.push("ellipsis");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push("ellipsis");
  if (!pages.includes(total)) pages.push(total);
  return pages;
}

function GridCardContent<T>({
  item,
  columns,
  actions,
}: {
  item: T;
  columns: Column<T>[];
  actions?: TableActions<T>;
}) {
  return (
    <div className="flex flex-col gap-3">
      {columns.map((col, idx) => (
        <div key={col.key}>
          {idx > 0 && (
            <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/70 block mb-0.5">
              {col.header}
            </span>
          )}
          <div className={cn(idx === 0 ? "text-base font-bold" : "text-sm", col.className)}>
            {col.cell(item)}
          </div>
        </div>
      ))}
      {actions && (
        <div className="flex items-center justify-end gap-2 mt-1 pt-3 border-t border-border/50">
          {actions.onView && (
            <ActionButton
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => actions.onView?.(item)}
              icon={<Eye className="h-4 w-4" />}
              tooltip="Lihat Detail"
            />
          )}
          {actions.onEdit && (
            <ActionButton
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full hover:text-primary"
              onClick={() => actions.onEdit?.(item)}
              icon={<Pencil className="h-4 w-4" />}
              tooltip="Edit"
            />
          )}
          {actions.onDelete && (
            <ActionButton
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full hover:text-destructive"
              onClick={() => actions.onDelete?.(item)}
              icon={<Trash2 className="h-4 w-4" />}
              tooltip="Hapus"
            />
          )}
          {actions.customActions
            ?.filter((a) => !a.showCondition || a.showCondition(item))
            .map((a) => (
              <ActionButton
                key={a.label}
                variant={a.variant ?? "secondary"}
                size="icon"
                className={cn("h-8 w-8 rounded-full", a.className)}
                onClick={() => a.onClick(item)}
                icon={a.icon}
                tooltip={a.label}
              />
            ))}
        </div>
      )}
    </div>
  );
}

// Re-export for backward compat
export type { Column as ColumnDef };
