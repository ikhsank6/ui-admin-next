"use client";

import { Loader2 } from "lucide-react";
import type * as React from "react";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";

type ActionButtonProps = ComponentProps<typeof Button> & {
  icon: React.ReactNode;
  title?: string;
  tooltip?: string;
  loading?: boolean;
};

export function ActionButton({
  icon,
  title,
  tooltip,
  loading,
  className,
  onClick,
  size,
  ...props
}: ActionButtonProps) {
  const resolvedSize = title && size === "icon" ? "sm" : size;

  const button = (
    <Button
      className={cn(title && "gap-1.5", className)}
      onClick={onClick}
      disabled={loading || props.disabled}
      size={resolvedSize}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      {title && <span>{title}</span>}
    </Button>
  );

  if (!tooltip) return button;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
