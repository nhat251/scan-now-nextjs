"use client";

import { useMemo } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
    []
  );
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
