"use client";

import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/stores/global";
import { Spinner } from "@/ui/spinner";

type Props = {
  loadingText?: string;
};

export function GlobalLoading({ loadingText }: Props) {
  const loading = useGlobalStore((state) => state.loading);

  if (!loading) return null;

  return (
    <div
      className={cn(
        "bg-background/40 fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm transition-all duration-300",
        "animate-in fade-in-0"
      )}
    >
      <div className="relative flex flex-col items-center gap-4">
        <Spinner className="size-8" />

        <p className="text-primary animate-pulse text-sm font-medium tracking-widest uppercase">
          {loadingText}
        </p>
      </div>
    </div>
  );
}
