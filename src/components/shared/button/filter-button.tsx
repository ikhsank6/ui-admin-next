import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type FilterButtonProps = {
  action?: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
};

export function FilterButton({
  action,
  disabled,
  label = "Terapkan",
  className,
}: FilterButtonProps) {
  return (
    <Button size="sm" onClick={action} disabled={disabled} className={cn("gap-1.5", className)}>
      <Search className="h-3.5 w-3.5" />
      {label}
    </Button>
  );
}
