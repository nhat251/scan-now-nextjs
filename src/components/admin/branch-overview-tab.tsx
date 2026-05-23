"use client";

import { CalendarDaysIcon, CircleCheckBigIcon, CircleXIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon, StoreIcon, UserIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { BranchRecord } from "@/types/admin";

type BranchOverviewTabProps = {
  branch: BranchRecord;
};

const formatTime = (value: string | null) => {
  if (!value) return "—";
  return value.slice(0, 5);
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(value));
};

const InfoRow = ({ icon: Icon, label, value, iconClass = "bg-primary/10 text-primary" }: { icon: React.ElementType; label: string; value: React.ReactNode; iconClass?: string }) => (
  <div className="flex items-center gap-3">
    <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
      <Icon className="size-[18px]" />
    </div>
    <div className="min-w-0">
      <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">{label}</p>
      <p className="text-on-surface truncate text-sm font-semibold">{value}</p>
    </div>
  </div>
);

export const BranchOverviewTab = ({ branch }: BranchOverviewTabProps) => {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">General Information</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <InfoRow icon={StoreIcon} label="Branch Name" value={branch.name} />
              <InfoRow icon={UserIcon} label="Manager" value={branch.managerName || "Unassigned"} />
              <div className="sm:col-span-2">
                <InfoRow icon={MapPinIcon} label="Address" value={branch.address || "No address"} />
              </div>
              <InfoRow icon={branch.isActive ? CircleCheckBigIcon : CircleXIcon} label="Status" value={branch.isActive ? "Active" : "Inactive"} iconClass={branch.isActive ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">Contact Information</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <InfoRow icon={PhoneIcon} label="Phone" value={branch.phone || "No phone"} />
              <InfoRow icon={MailIcon} label="Email" value={branch.email || "No email"} />
              <InfoRow icon={ClockIcon} label="Operating Hours" value={`${formatTime(branch.openTime)} - ${formatTime(branch.closeTime)}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-border/60 bg-surface-container-lowest rounded-3xl shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-on-surface-variant mb-5 text-xs font-black tracking-[0.22em] uppercase">Fees & Charges</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">VAT</span>
                <span className="text-on-surface text-lg font-bold">{branch.vatPercent}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Service Charge</span>
                <span className="text-on-surface text-lg font-bold">{branch.serviceChargePercent}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Fixed Charge</span>
                <span className="text-on-surface text-lg font-bold">
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(branch.serviceChargeFixed)}
                </span>
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
                  <p className="text-on-surface text-sm font-medium">{formatDate(branch.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="text-muted-foreground size-4 shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Updated</p>
                  <p className="text-on-surface text-sm font-medium">
                    {branch.updatedAt ? formatDate(branch.updatedAt) : "Not updated"}
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
