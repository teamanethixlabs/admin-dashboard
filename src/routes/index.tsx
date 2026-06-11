import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Package, ShoppingCart, Clock, CheckCircle2, ArrowUpRight, TrendingUp, ArrowRight,
} from "lucide-react";
import { AdminHeader } from "@/components/admin-header";
import { stats, orders, revenueByDay, inr } from "@/lib/mock-data";
import { OrderStatusBadge } from "@/components/order-status-badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — FreshMart Admin" },
      { name: "description", content: "Overview of orders, revenue, and inventory for your store." },
    ],
  }),
  component: Dashboard,
});

const statCards = [
  { label: "Total Products", value: stats.totalProducts.toString(), icon: Package, tone: "bg-blue-50 text-blue-600", delta: "+12 this week", positive: true },
  { label: "Total Orders", value: stats.totalOrders.toLocaleString(), icon: ShoppingCart, tone: "bg-violet-50 text-violet-600", delta: "+86 this week", positive: true },
  { label: "Pending Orders", value: stats.pendingOrders.toString(), icon: Clock, tone: "bg-amber-50 text-amber-600", delta: "Needs attention", positive: false },
  { label: "Delivered Orders", value: stats.deliveredOrders.toLocaleString(), icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-600", delta: "+72 this week", positive: true },
];

function Dashboard() {
  const max = Math.max(...revenueByDay.map((d) => d.revenue));
  const recent = orders.slice(0, 6);
  const peakIdx = revenueByDay.findIndex((d) => d.revenue === max);

  return (
    <>
      <AdminHeader title="Dashboard" subtitle="Today's overview at a glance" />
      <main className="flex-1 space-y-6 p-4 md:p-8">
        {/* Page intro */}
        <section className="flex flex-col gap-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Overview
          </p>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight">Good morning, Ramesh</h2>
            <p className="text-sm text-muted-foreground">
              Here's what's happening at FreshMart today.
            </p>
          </div>
        </section>

        {/* KPI cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((s) => (
            <Card key={s.label} className="border-border/70 shadow-none transition-shadow hover:shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {s.label}
                    </p>
                    <p className="mt-3 text-[28px] font-semibold leading-none tracking-tight">
                      {s.value}
                    </p>
                  </div>
                  <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-md ${s.tone}`}>
                    <s.icon className="h-[18px] w-[18px]" strokeWidth={2} />
                  </div>
                </div>
                <p className={`mt-3 text-[11px] font-medium ${s.positive ? "text-emerald-600" : "text-amber-600"}`}>
                  {s.delta}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue + Quick actions */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="border-border/70 shadow-none lg:col-span-2">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 border-b pb-4">
              <div>
                <CardTitle className="text-[15px] font-semibold tracking-tight">
                  Revenue Summary
                </CardTitle>
                <p className="mt-0.5 text-xs text-muted-foreground">Last 7 days</p>
              </div>
              <Badge
                variant="outline"
                className="gap-1 rounded-full border-emerald-200/60 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700"
              >
                <TrendingUp className="h-3 w-3" /> +18.4%
              </Badge>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    This month
                  </p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight">
                    ₹{stats.revenue.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Peak day
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {revenueByDay[peakIdx]?.day} • {inr(max)}
                  </p>
                </div>
              </div>

              <div className="flex h-52 items-end gap-3">
                {revenueByDay.map((d, i) => {
                  const pct = Math.max(8, Math.round((d.revenue / max) * 100));
                  const isPeak = i === peakIdx;
                  return (
                    <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex w-full flex-1 items-end">
                        <div
                          className={`w-full rounded-t-md transition-colors ${
                            isPeak
                              ? "bg-primary"
                              : "bg-muted hover:bg-primary/80"
                          }`}
                          style={{ height: `${pct}%` }}
                          title={inr(d.revenue)}
                        />
                      </div>
                      <span
                        className={`text-[11px] ${
                          isPeak ? "font-semibold text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 shadow-none">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-[15px] font-semibold tracking-tight">
                Quick Actions
              </CardTitle>
              <p className="mt-0.5 text-xs text-muted-foreground">Jump to common tasks</p>
            </CardHeader>
            <CardContent className="space-y-1.5 pt-4">
              {[
                { to: "/products", label: "Manage Products" },
                { to: "/orders", label: "View Orders" },
                { to: "/customers", label: "Customers" },
                { to: "/categories", label: "Categories" },
              ].map((a) => (
                <Link key={a.to} to={a.to} className="block">
                  <Button
                    variant="ghost"
                    className="group h-11 w-full justify-between rounded-md border border-transparent px-3 text-[13px] font-medium hover:border-border hover:bg-muted/60"
                  >
                    <span>{a.label}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent orders */}
        <Card className="border-border/70 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
            <div>
              <CardTitle className="text-[15px] font-semibold tracking-tight">
                Recent Orders
              </CardTitle>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Latest activity from your store
              </p>
            </div>
            <Link to="/orders">
              <Button variant="ghost" size="sm" className="gap-1 text-[13px]">
                View all <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-11 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Order ID
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Customer
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Phone
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Items
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Amount
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent.map((o) => (
                  <TableRow key={o.id} className="border-b-border/60">
                    <TableCell className="py-3.5 font-mono text-[12px] font-medium text-foreground">
                      {o.id}
                    </TableCell>
                    <TableCell className="text-[13px] font-medium">{o.customerName}</TableCell>
                    <TableCell className="text-[13px] text-muted-foreground">{o.phone}</TableCell>
                    <TableCell className="text-[13px] text-muted-foreground">
                      {o.items.length} items
                    </TableCell>
                    <TableCell className="text-[13px] font-semibold">{inr(o.amount)}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={o.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
