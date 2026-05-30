import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type CancelButtonProps = {
  label?: string;
  action?: () => void;
  className?: string;
};

export function CancelButton({ label = "Batal", action, className }: CancelButtonProps) {
  return (
    <Button type="button" variant="ghost" className={cn("gap-1.5", className)} onClick={action}>
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
}
