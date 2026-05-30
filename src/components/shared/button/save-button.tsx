import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type SaveButtonProps = {
  label?: string;
  action?: () => void;
  loading?: boolean;
  className?: string;
};

export function SaveButton({
  label = "Simpan",
  action,
  loading = false,
  className,
}: SaveButtonProps) {
  return (
    <Button
      type={action ? "button" : "submit"}
      className={cn("gap-1.5", className)}
      onClick={action}
      disabled={loading}
    >
      <Save className="h-4 w-4" />
      {label}
    </Button>
  );
}
