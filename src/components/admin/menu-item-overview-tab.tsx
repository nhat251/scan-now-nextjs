"use client";

import Image from "next/image";
import { CalendarDaysIcon, ClockIcon, DollarSignIcon, HashIcon, ImageIcon, ListOrderedIcon, StoreIcon, TextIcon, TimerIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { MenuItemRecord } from "@/types/admin";

type MenuItemOverviewTabProps = {
  menuItem: MenuItemRecord;
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(value));
};

const DetailRow = ({ icon: Icon, label, value, iconClass = "bg-primary/10 text-primary" }: { icon: React.ElementType; label: string; value: React.ReactNode; iconClass?: string }) => (
  <div className="flex items-center gap-3">
    <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
      <Icon className="size-[18px]" />
    </div>
    <div className="min-w-0">
      <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">{label}</p>
      <p className="text-on-surface text-sm font-semibold">{value}</p>
    </div>
  </div>
);

export const MenuItemOverviewTab = ({ menuItem }: MenuItemOverviewTabProps) => {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">Basic Information</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <DetailRow icon={TextIcon} label="Name" value={menuItem.name} />
              <DetailRow icon={StoreIcon} label="Branch" value={menuItem.branchName || "—"} />
              <DetailRow icon={ListOrderedIcon} label="Category" value={menuItem.categoryName || "Uncategorized"} />
              <DetailRow icon={ListOrderedIcon} label="Display Order" value={menuItem.displayOrder} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">Pricing & Time</h3>
            <div className="grid gap-5 sm:grid-cols-3">
              <DetailRow icon={DollarSignIcon} label="Price" value={new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(menuItem.price)} iconClass="bg-emerald-500/10 text-emerald-600" />
              <DetailRow icon={DollarSignIcon} label="Cost Price" value={new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(menuItem.costPrice)} iconClass="bg-amber-500/10 text-amber-600" />
              <DetailRow icon={TimerIcon} label="Prep Time" value={`${menuItem.preparationTime} min`} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">Description</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {menuItem.description || "No description provided."}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">Image</h3>
            {menuItem.imageUrl ? (
              <Image
                src={menuItem.imageUrl}
                alt={menuItem.name}
                width={400}
                height={300}
                className="border-border/40 w-full rounded-2xl border object-cover"
                unoptimized
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
            <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Available</span>
                <Badge variant={menuItem.isAvailable ? "default" : "secondary"} className="rounded-full px-3 py-1">
                  {menuItem.isAvailable ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Featured</span>
                <Badge variant={menuItem.isFeatured ? "default" : "secondary"} className="rounded-full px-3 py-1">
                  {menuItem.isFeatured ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Active</span>
                <Badge variant={menuItem.isActive ? "default" : "secondary"} className="rounded-full px-3 py-1">
                  {menuItem.isActive ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
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
                  <p className="text-on-surface text-sm font-medium">{formatDate(menuItem.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="text-muted-foreground size-4 shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Updated</p>
                  <p className="text-on-surface text-sm font-medium">
                    {menuItem.updatedAt ? formatDate(menuItem.updatedAt) : "Not updated"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HashIcon className="text-muted-foreground size-4 shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">ID</p>
                  <p className="text-on-surface font-mono text-xs break-all">{menuItem.menuItemId}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
