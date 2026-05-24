"use client";

import { BadgePercentIcon, CalendarDaysIcon, CircleCheckBigIcon, CircleXIcon, ClockIcon, DollarSignIcon, LoaderCircle, MailIcon, MapPinIcon, PhoneIcon, StoreIcon, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useAdminBranchDetailQuery } from "@/hooks/queries/useAdminBranchDetailQuery";

type BranchDetailDialogProps = {
  open: boolean;
  restaurantId: string | null;
  branchId: string | null;
  onClose: () => void;
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

export const BranchDetailDialog = ({
  open,
  restaurantId,
  branchId,
  onClose,
}: BranchDetailDialogProps) => {
  const branchQuery = useAdminBranchDetailQuery(restaurantId, branchId, open && Boolean(branchId));

  const branch = branchQuery.data;

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent size="xl" className="border-border/50 bg-background flex h-[90vh] flex-col rounded-[28px] p-0 sm:h-auto sm:max-h-[95vh]">
        <div className="from-primary/12 pointer-events-none absolute -top-20 -right-10 h-40 w-40 rounded-full bg-gradient-to-br to-transparent blur-3xl" />

        <div className="shrink-0 space-y-3 px-6 pt-6 sm:px-8 sm:pt-8">
          <DialogHeader className="space-y-3 text-left">
            <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl">
              <StoreIcon className="size-5" />
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight">Branch Detail</DialogTitle>
            <DialogDescription className="text-on-surface-variant text-sm leading-relaxed">
              Detailed information about this branch.
            </DialogDescription>
          </DialogHeader>
          <Separator className="bg-border/60" />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4 sm:px-8">
          {branchQuery.isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoaderCircle className="text-muted-foreground size-6 animate-spin" />
            </div>
          ) : branchQuery.isError ? (
            <p className="text-destructive py-8 text-center text-sm">
              Unable to load branch details.
            </p>
          ) : branch ? (
            <div className="space-y-5">
              <div className="border-border/40 bg-surface-container-lowest space-y-4 rounded-2xl border p-5">
                <h4 className="text-on-surface-variant text-xs font-black tracking-[0.22em] uppercase">General Information</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoRow icon={StoreIcon} label="Name" value={branch.name} />
                  <InfoRow icon={UserIcon} label="Manager" value={branch.managerName || "Unassigned"} />
                  <div className="sm:col-span-2">
                    <InfoRow icon={MapPinIcon} label="Address" value={branch.address || "No address"} />
                  </div>
                  <InfoRow icon={branch.isActive ? CircleCheckBigIcon : CircleXIcon} label="Status" value={branch.isActive ? "Active" : "Inactive"} iconClass={branch.isActive ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"} />
                </div>
              </div>

              <div className="border-border/40 bg-surface-container-lowest space-y-4 rounded-2xl border p-5">
                <h4 className="text-on-surface-variant text-xs font-black tracking-[0.22em] uppercase">Contact Information</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoRow icon={PhoneIcon} label="Phone" value={branch.phone || "No phone"} />
                  <InfoRow icon={MailIcon} label="Email" value={branch.email || "No email"} />
                  <InfoRow icon={ClockIcon} label="Operating Hours" value={`${formatTime(branch.openTime)} - ${formatTime(branch.closeTime)}`} />
                </div>
              </div>

              <div className="border-border/40 bg-surface-container-lowest space-y-4 rounded-2xl border p-5">
                <h4 className="text-on-surface-variant text-xs font-black tracking-[0.22em] uppercase">Fees & Charges</h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  <InfoRow icon={BadgePercentIcon} label="VAT" value={`${branch.vatPercent}%`} iconClass="bg-amber-500/10 text-amber-600" />
                  <InfoRow icon={BadgePercentIcon} label="Service Charge" value={`${branch.serviceChargePercent}%`} iconClass="bg-amber-500/10 text-amber-600" />
                  <InfoRow icon={DollarSignIcon} label="Fixed Charge" value={new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(branch.serviceChargeFixed)} iconClass="bg-emerald-500/10 text-emerald-600" />
                </div>
              </div>

              <div className="border-border/40 bg-surface-container-lowest space-y-4 rounded-2xl border p-5">
                <h4 className="text-on-surface-variant text-xs font-black tracking-[0.22em] uppercase">System</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoRow icon={CalendarDaysIcon} label="Created" value={formatDate(branch.createdAt)} />
                  <InfoRow icon={CalendarDaysIcon} label="Updated" value={branch.updatedAt ? formatDate(branch.updatedAt) : "Not updated"} />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="border-border/60 shrink-0 border-t px-6 py-4 sm:px-8">
          <div className="flex justify-end">
            <Button variant="outline" className="rounded-xl" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
