"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon, CalendarDaysIcon, CircleCheckBigIcon, CircleXIcon, HashIcon, ImageIcon, ListOrderedIcon, StoreIcon, TextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAdminBranchCategoryDetailQuery } from "@/hooks/queries/useAdminBranchCategoryDetailQuery";
import { cn } from "@/lib/utils";

type CategoryDetailViewProps = {
  branchId: string;
  branchIdentifier: string;
  categoryId: string;
  restaurantIdentifier: string | null;
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(value));
};

const DetailRow = ({ icon: Icon, label, value, className }: { icon: React.ElementType; label: string; value: React.ReactNode; className?: string }) => (
  <div className={cn("flex items-center gap-3", className)}>
    <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-xl">
      <Icon className="size-[18px]" />
    </div>
    <div className="min-w-0">
      <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">{label}</p>
      <p className="text-on-surface text-sm font-semibold">{value}</p>
    </div>
  </div>
);

export const CategoryDetailView = ({ branchId, branchIdentifier, categoryId, restaurantIdentifier }: CategoryDetailViewProps) => {
  const router = useRouter();

  const categoryQuery = useAdminBranchCategoryDetailQuery(branchId, categoryId, true);

  const handleBack = () => {
    const href = restaurantIdentifier
      ? `/admin/branches/${branchIdentifier}?restaurantSlug=${restaurantIdentifier}`
      : `/admin/branches/${branchIdentifier}`;
    router.push(href);
  };

  if (categoryQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground text-sm">Loading category details...</p>
      </div>
    );
  }

  if (categoryQuery.isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-destructive text-sm">Unable to load category details.</p>
        <Button variant="outline" className="rounded-xl" onClick={handleBack}>
          Back to Branch
        </Button>
      </div>
    );
  }

  const category = categoryQuery.data;

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-muted-foreground text-sm">Category not found.</p>
        <Button variant="outline" className="rounded-xl" onClick={handleBack}>
          Back to Branch
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleBack}>
          <ArrowLeftIcon className="size-5" />
        </Button>
        <div>
          <h1 className="text-on-surface text-2xl font-black tracking-tight sm:text-3xl">{category.name}</h1>
          <p className="text-on-surface-variant text-sm">Category Detail</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">Basic Information</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <DetailRow icon={TextIcon} label="Name" value={category.name} />
                <DetailRow icon={StoreIcon} label="Branch" value={category.branchName || "—"} />
                <DetailRow icon={ListOrderedIcon} label="Display Order" value={category.displayOrder} />
                <DetailRow icon={category.isActive ? CircleCheckBigIcon : CircleXIcon} label="Status" value={category.isActive ? "Active" : "Inactive"} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">Description</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {category.description || "No description provided."}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">Image</h3>
              {category.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="border-border/40 w-full rounded-2xl border object-cover"
                />
              ) : (
                <div className="bg-surface-container-low border-border/40 flex aspect-video items-center justify-center rounded-2xl border">
                  <ImageIcon className="text-muted-foreground size-8" />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">System</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <CalendarDaysIcon className="text-muted-foreground size-4 shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Created</p>
                    <p className="text-on-surface text-sm font-medium">{formatDate(category.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HashIcon className="text-muted-foreground size-4 shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">ID</p>
                    <p className="text-on-surface font-mono text-xs break-all">{category.categoryId}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
