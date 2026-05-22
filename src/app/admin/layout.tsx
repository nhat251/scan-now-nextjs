import type { ReactNode } from "react";

import { GlobalLoading } from "@/components/molecules/globals/global-loading";
import { GlobalToast } from "@/components/molecules/globals/global-toast";
import { ReactQueryProvider } from "@/providers/global/query-client-provider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      {children}
      <GlobalToast />
      <GlobalLoading loadingText="Syncing admin data" />
    </ReactQueryProvider>
  );
}
