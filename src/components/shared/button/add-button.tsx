import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type AddButtonProps = {
  label?: string;
  action?: () => void;
  className?: string;
};

export function AddButton({ label = "Tambah", action, className }: AddButtonProps) {
  return (
    <Button size="sm" className={cn("gap-1.5", className)} onClick={action}>
      <CirclePlus className="h-4 w-4" />
      {label}
    </Button>
  );
}
