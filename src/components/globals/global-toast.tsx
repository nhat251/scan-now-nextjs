"use client";

import { useTheme } from "next-themes";
import type * as React from "react";
import type { ExternalToast } from "sonner";
import { toast, Toaster } from "sonner";

import type { AlertType } from "@/stores/global";
import { DEFAULT_DURATION_NOTIFICATION, DEFAULT_POSITION_NOTIFICATION } from "@/stores/global";

// Style configuration for each toast type
const TOAST_STYLES: Record<AlertType, React.CSSProperties> = {
  success: {
    "--normal-bg":
      "color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))",
    "--normal-text": "light-dark(var(--color-green-600), var(--color-green-400))",
    "--normal-border": "light-dark(var(--color-green-600), var(--color-green-400))",
  } as React.CSSProperties,
  error: {
    "--normal-bg":
      "color-mix(in oklab, light-dark(var(--color-red-600), var(--color-red-400)) 10%, var(--background))",
    "--normal-text": "light-dark(var(--color-red-600), var(--color-red-400))",
    "--normal-border": "light-dark(var(--color-red-600), var(--color-red-400))",
  } as React.CSSProperties,
  warning: {
    "--normal-bg":
      "color-mix(in oklab, light-dark(var(--color-yellow-600), var(--color-yellow-400)) 10%, var(--background))",
    "--normal-text": "light-dark(var(--color-yellow-600), var(--color-yellow-400))",
    "--normal-border": "light-dark(var(--color-yellow-600), var(--color-yellow-400))",
  } as React.CSSProperties,
  info: {
    "--normal-bg":
      "color-mix(in oklab, light-dark(var(--color-blue-600), var(--color-blue-400)) 10%, var(--background))",
    "--normal-text": "light-dark(var(--color-blue-600), var(--color-blue-400))",
    "--normal-border": "light-dark(var(--color-blue-600), var(--color-blue-400))",
  } as React.CSSProperties,
};

export function showToast(
  type: AlertType,
  message: string,
  options?: Omit<ExternalToast, "style">
) {
  const toastOptions: ExternalToast = {
    position: DEFAULT_POSITION_NOTIFICATION,
    duration: DEFAULT_DURATION_NOTIFICATION,
    style: TOAST_STYLES[type],
    ...options,
  };

  toast[type](message, toastOptions);
}

export function GlobalToast() {
  const { theme } = useTheme();

  return (
    <Toaster
      theme={theme as "light" | "dark"}
      className="toaster group whitespace-pre-line"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
    />
  );
}
