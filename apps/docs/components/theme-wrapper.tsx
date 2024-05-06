"use client";

import { cn } from "@raonc/ui/lib/utils";

interface ThemeWrapperProps extends React.ComponentProps<"div"> {
  defaultTheme?: string;
}

export function ThemeWrapper({
  defaultTheme,
  children,
  className,
}: ThemeWrapperProps) {
  return (
    <div
      className={cn(`theme-${defaultTheme}`, "w-full", className)}
      style={
        {
          "--radius": `0.5rem`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
