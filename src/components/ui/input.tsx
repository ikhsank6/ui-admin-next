import type * as React from "react";

import { cn } from "@/utils/cn";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-md border-[1.5px] border-input bg-card px-3 py-1 text-base transition-[color,box-shadow,border-color] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground md:text-sm dark:bg-input/30",
        "focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_hsl(var(--ring)/0.15)]",
        "aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_3px_hsl(var(--destructive)/0.15)]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
