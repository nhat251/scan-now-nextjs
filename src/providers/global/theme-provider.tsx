"use client";

import type { PropsWithChildren } from "react";

type ThemeProviderProps = PropsWithChildren<Record<string, never>>;

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>;
}
