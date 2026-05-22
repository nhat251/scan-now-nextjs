"use client";

import { useMemo, useState } from "react";

import { AdminLoginCard } from "@/components/admin/admin-login-card";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { OwnerManagementView } from "@/components/admin/owner-management-view";
import { Button } from "@/components/ui/button";
import { logout, useUserStore } from "@/stores/user";
import type { AdminUser } from "@/types/admin";

const getAdminUserFromStore = (user: ReturnType<typeof useUserStore.getState>["user"]): AdminUser | null => {
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    username: user.username || user.email,
    fullName: user.name,
    avatarUrl: user.avatar,
    role: user.role || "ADMIN",
    isEmailVerified: true,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };
};

export default function AdminPage() {
  const user = useUserStore((state) => state.user);
  const isLogin = useUserStore((state) => state.isLogin);
  const [refreshKey, setRefreshKey] = useState(0);

  const hasToken = typeof window !== "undefined" ? Boolean(localStorage.getItem("jwt")) : false;
  const isAuthorized = hasToken && isLogin;
  const adminUser = useMemo(() => getAdminUserFromStore(user), [user]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
    }
    logout();
    setRefreshKey((value) => value + 1);
  };

  if (!isAuthorized) {
    return (
      <main className="bg-background flex min-h-screen items-center justify-center px-4 py-10">
        <AdminLoginCard onSuccess={() => setRefreshKey((value) => value + 1)} key={refreshKey} />
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:pl-72">
        <AdminTopbar adminUser={adminUser} />
        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <OwnerManagementView isAuthorized={isAuthorized} />
        </div>
        <div className="border-border/60 border-t px-4 py-4 text-right sm:px-6 lg:hidden">
          <Button variant="ghost" className="text-destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </main>
  );
}
