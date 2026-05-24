"use client";

import Image from "next/image";
import { CalendarDaysIcon, ClockIcon, MailIcon, PhoneIcon, StoreIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { RestaurantRecord } from "@/types/admin";

type RestaurantOverviewTabProps = {
  restaurant: RestaurantRecord;
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(value));
};

export const RestaurantOverviewTab = ({ restaurant }: RestaurantOverviewTabProps) => {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-5">
              <div className="bg-surface-container-low border-border/50 flex size-20 shrink-0 items-center justify-center rounded-2xl border shadow-sm">
                {restaurant.logoUrl ? (
                  <Image
                    src={restaurant.logoUrl}
                    alt={restaurant.name}
                    width={80}
                    height={80}
                    className="size-full rounded-2xl object-cover"
                    unoptimized
                  />
                ) : (
                  <StoreIcon className="text-muted-foreground size-8" />
                )}
              </div>
              <div className="min-w-0 space-y-2">
                <h2 className="text-on-surface text-2xl font-bold tracking-tight">{restaurant.name}</h2>
                <p className="text-muted-foreground text-sm break-all">/{restaurant.slug}</p>
                <p className="text-on-surface-variant mt-3 text-sm leading-relaxed">
                  {restaurant.description || "No description provided."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">
              Owner Information
            </h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
                  <StoreIcon className="size-4" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Name</p>
                  <p className="text-on-surface font-semibold">{restaurant.ownerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
                  <MailIcon className="size-4" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Email</p>
                  <p className="text-on-surface font-semibold break-all">{restaurant.ownerEmail}</p>
                </div>
              </div>
              {restaurant.ownerPhone ? (
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
                    <PhoneIcon className="size-4" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Phone</p>
                    <p className="text-on-surface font-semibold">{restaurant.ownerPhone}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">
              Details
            </h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Status</span>
                <Badge
                  variant={restaurant.isActive ? "default" : "secondary"}
                  className="rounded-full px-3 py-1"
                >
                  {restaurant.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Total Branches</span>
                <span className="text-on-surface text-lg font-bold">{restaurant.totalBranches}</span>
              </div>
              <hr className="border-border/40" />
              <div className="flex items-center gap-3">
                <CalendarDaysIcon className="text-muted-foreground size-4 shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Created</p>
                  <p className="text-on-surface text-sm font-medium">{formatDate(restaurant.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="text-muted-foreground size-4 shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Updated</p>
                  <p className="text-on-surface text-sm font-medium">
                    {restaurant.updatedAt ? formatDate(restaurant.updatedAt) : "Not updated"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
