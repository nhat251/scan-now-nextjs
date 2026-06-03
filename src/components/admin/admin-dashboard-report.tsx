"use client";

import { BarChart3, Building2, ReceiptText, Store, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminDashboardReportQuery } from "@/hooks/queries/useAdminDashboardReportQuery";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);

const maxOf = (values: number[]) => Math.max(...values, 1);

export const AdminDashboardReport = ({ enabled }: { enabled: boolean }) => {
  const reportQuery = useAdminDashboardReportQuery(enabled);
  const report = reportQuery.data;

  if (reportQuery.isLoading) {
    return <div className="border-border/60 bg-card rounded-xl border p-5 text-sm font-medium">Loading platform dashboard...</div>;
  }

  if (reportQuery.isError || !report) {
    return <div className="border-destructive/40 bg-destructive/10 text-destructive rounded-xl border p-5 text-sm">Unable to load dashboard report.</div>;
  }

  return (
    <section className="mb-8 space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard icon={<Users className="size-5" />} label="Users" value={String(report.totalUsers)} />
        <MetricCard icon={<Store className="size-5" />} label="Restaurants" value={String(report.totalRestaurants)} />
        <MetricCard icon={<Building2 className="size-5" />} label="Branches" value={String(report.totalBranches)} />
        <MetricCard icon={<ReceiptText className="size-5" />} label="Orders" value={String(report.totalOrders)} />
        <MetricCard icon={<BarChart3 className="size-5" />} label="Revenue" value={formatCurrency(report.totalRevenue)} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ChartCard
          title="Platform growth"
          data={report.platformGrowth.map((point) => ({ label: point.label, value: point.orders }))}
          formatValue={(value) => `${value} new records`}
        />
        <ChartCard
          title="Revenue by month"
          data={report.revenueByMonth.map((point) => ({ label: point.label, value: point.revenue }))}
          formatValue={formatCurrency}
        />
      </div>
    </section>
  );
};

const MetricCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <Card className="border-border/60 bg-surface-container-lowest rounded-xl shadow-sm">
    <CardContent className="flex items-center gap-3 p-5">
      <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-xl">{icon}</div>
      <div className="min-w-0">
        <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">{label}</p>
        <p className="truncate text-2xl font-black">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const ChartCard = ({
  title,
  data,
  formatValue,
}: {
  title: string;
  data: Array<{ label: string; value: number }>;
  formatValue: (value: number) => string;
}) => {
  const max = maxOf(data.map((item) => item.value));

  return (
    <Card className="border-border/60 bg-surface-container-lowest rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-72 items-end gap-2 overflow-x-auto pb-2">
          {data.map((item) => (
            <div key={item.label} className="flex min-w-14 flex-1 flex-col items-center gap-2">
              <div className="bg-muted/50 flex h-52 w-full items-end rounded-lg px-1.5">
                <div
                  className="bg-primary/80 w-full rounded-md"
                  style={{ height: `${Math.max(4, (item.value / max) * 100)}%` }}
                  title={`${item.label}: ${formatValue(item.value)}`}
                />
              </div>
              <span className="text-muted-foreground max-w-16 truncate text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
