"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export default function NextThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      storageKey="themeScheme"
      enableSystem={false}
      themes={["dark", "light"]}
      attribute="class"
    >
      {children}
    </ThemeProvider>
  );
}
