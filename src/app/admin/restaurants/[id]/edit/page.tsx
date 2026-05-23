"use client";

import { use, useMemo } from "react";
import { useRouter } from "next/navigation";

import { AdminLoginCard } from "@/components/admin/admin-login-card";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { RestaurantForm } from "@/components/admin/restaurant-form";
import { Button } from "@/components/ui/button";
import { useUpdateRestaurantMutation } from "@/hooks/mutations/useUpdateRestaurantMutation";
import { useAdminRestaurantDetailQuery } from "@/hooks/queries/useAdminRestaurantDetailQuery";
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

type AdminEditRestaurantPageProps = {
  params: Promise<{ id: string }>;
};

export default function AdminEditRestaurantPage({ params }: AdminEditRestaurantPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isLogin = useUserStore((state) => state.isLogin);

  const hasToken = typeof window !== "undefined" ? Boolean(localStorage.getItem("jwt")) : false;
  const isAuthorized = hasToken && isLogin;
  const adminUser = useMemo(() => getAdminUserFromStore(user), [user]);

  const restaurantQuery = useAdminRestaurantDetailQuery(id, isAuthorized);
  const updateRestaurantMutation = useUpdateRestaurantMutation();

  const handleLogout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    logout();
  };

  const handleSave = async (values: { ownerId: string; name: string; slug: string; logoUrl?: string | undefined; description?: string | undefined }) => {
    try {
      const response = await updateRestaurantMutation.mutateAsync({
        id,
        payload: {
          name: values.name,
          slug: values.slug,
          logoUrl: values.logoUrl || null,
          description: values.description || null,
        },
      });
      showNotify({ type: "success", message: response.message || "Restaurant updated successfully" });
      router.push(`/admin/restaurants/${id}`);
    } catch {
      showNotify({ type: "error", message: "Failed to update restaurant." });
    }
  };

  if (!isAuthorized) {
    return (
      <main className="bg-background flex min-h-screen items-center justify-center px-4 py-10">
        <AdminLoginCard />
      </main>
    );
  }

  if (restaurantQuery.isLoading) {
    return (
      <main className="bg-background min-h-screen">
        <AdminSidebar onLogout={handleLogout} />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:pl-72">
          <AdminTopbar adminUser={adminUser} />
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground text-sm">Loading restaurant data...</p>
          </div>
        </div>
      </main>
    );
  }

  if (restaurantQuery.isError || !restaurantQuery.data) {
    return (
      <main className="bg-background min-h-screen">
        <AdminSidebar onLogout={handleLogout} />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:pl-72">
          <AdminTopbar adminUser={adminUser} />
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <p className="text-destructive text-sm">Unable to load restaurant data.</p>
            <Button variant="outline" className="rounded-xl" onClick={() => router.push("/admin/restaurants")}>
              Back to Restaurants
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:pl-72">
        <AdminTopbar adminUser={adminUser} />
        <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <RestaurantForm
            restaurant={restaurantQuery.data}
            availableOwners={[]}
            isSubmitting={updateRestaurantMutation.isPending}
            onSave={handleSave}
            onCancel={() => router.push(`/admin/restaurants/${id}`)}
          />
        </div>
      </div>
    </main>
  );
}
