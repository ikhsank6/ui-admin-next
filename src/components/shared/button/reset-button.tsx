import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type ResetButtonProps = {
  action?: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
};

export function ResetButton({ action, disabled, label = "Reset", className }: ResetButtonProps) {
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={action}
      disabled={disabled}
      className={cn("gap-1.5", className)}
    >
      <RotateCcw className="h-3.5 w-3.5" />
      {label}
    </Button>
  );
}
