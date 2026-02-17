"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="cursor-pointer"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="transition-all" />
      ) : (
        <Moon className="transition-all" />
      )}
    </Button>
  );
}
