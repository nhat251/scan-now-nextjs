"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { AdminLoginCard } from "@/components/admin/admin-login-card";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { RestaurantForm } from "@/components/admin/restaurant-form";
import { useCreateRestaurantMutation } from "@/hooks/mutations/useCreateRestaurantMutation";
import { useAdminAvailableOwnersQuery } from "@/hooks/queries/useAdminAvailableOwnersQuery";
import { showNotify } from "@/stores/global";
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

export default function AdminCreateRestaurantPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isLogin = useUserStore((state) => state.isLogin);

  const hasToken = typeof window !== "undefined" ? Boolean(localStorage.getItem("jwt")) : false;
  const isAuthorized = hasToken && isLogin;
  const adminUser = useMemo(() => getAdminUserFromStore(user), [user]);

  const createRestaurantMutation = useCreateRestaurantMutation();
  const availableOwnersQuery = useAdminAvailableOwnersQuery(isAuthorized);

  const handleLogout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    logout();
  };

  const handleSave = async (values: { ownerId: string; name: string; slug: string; logoUrl?: string; description?: string | undefined }) => {
    try {
      const response = await createRestaurantMutation.mutateAsync({
        ownerId: values.ownerId,
        name: values.name,
        slug: values.slug,
        logoUrl: values.logoUrl || null,
        description: values.description || null,
      });
      showNotify({ type: "success", message: response.message || "Restaurant created successfully" });
      router.push("/admin/restaurants");
    } catch {
      showNotify({ type: "error", message: "Failed to create restaurant." });
    }
  };

  if (!isAuthorized) {
    return (
      <main className="bg-background flex min-h-screen items-center justify-center px-4 py-10">
        <AdminLoginCard />
      </main>
    );
  }

  const availableOwners = (availableOwnersQuery.data?.items || []).map((o) => ({
    userId: o.userId,
    fullName: o.fullName,
    email: o.email,
    phoneNumber: o.phoneNumber,
  }));

  return (
    <main className="bg-background min-h-screen">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:pl-72">
        <AdminTopbar adminUser={adminUser} />
        <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <RestaurantForm
            restaurant={null}
            availableOwners={availableOwners}
            isSubmitting={createRestaurantMutation.isPending}
            onSave={handleSave}
            onCancel={() => router.push("/admin/restaurants")}
          />
        </div>
      </div>
    </main>
  );
}
