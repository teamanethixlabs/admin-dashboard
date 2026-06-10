import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Package, ShoppingCart, Clock, CheckCircle2, IndianRupee, ArrowUpRight, TrendingUp,
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
  { label: "Total Products", value: stats.totalProducts.toString(), icon: Package, tone: "bg-blue-500/10 text-blue-600", delta: "+12 this week" },
  { label: "Total Orders", value: stats.totalOrders.toLocaleString(), icon: ShoppingCart, tone: "bg-violet-500/10 text-violet-600", delta: "+86 this week" },
  { label: "Pending Orders", value: stats.pendingOrders.toString(), icon: Clock, tone: "bg-amber-500/10 text-amber-600", delta: "Needs attention" },
  { label: "Delivered Orders", value: stats.deliveredOrders.toLocaleString(), icon: CheckCircle2, tone: "bg-emerald-500/10 text-emerald-600", delta: "+72 this week" },
];

function Dashboard() {
  const max = Math.max(...revenueByDay.map((d) => d.revenue));
  const recent = orders.slice(0, 6);

  return (
    <>
      <AdminHeader title="Dashboard" subtitle="Today's overview at a glance" />
      <main className="flex-1 space-y-6 p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((s) => (
            <Card key={s.label} className="border-border/60">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">{s.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.delta}</p>
                  </div>
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${s.tone}`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Revenue Summary</CardTitle>
                <p className="text-sm text-muted-foreground">Last 7 days</p>
              </div>
              <Badge variant="secondary" className="gap-1">
                <TrendingUp className="h-3 w-3" /> +18.4%
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-baseline gap-2">
                <IndianRupee className="h-5 w-5 text-muted-foreground" />
                <span className="text-3xl font-semibold tracking-tight">
                  {stats.revenue.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-muted-foreground">this month</span>
              </div>
              <div className="flex h-48 items-end gap-3">
                {revenueByDay.map((d) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-primary/80 to-primary/40 transition-all hover:from-primary hover:to-primary/60"
                        style={{ height: `${(d.revenue / max) * 100}%` }}
                        title={inr(d.revenue)}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/products" className="block">
                <Button variant="outline" className="w-full justify-between">
                  Manage Products <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/orders" className="block">
                <Button variant="outline" className="w-full justify-between">
                  View Orders <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/customers" className="block">
                <Button variant="outline" className="w-full justify-between">
                  Customers <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/categories" className="block">
                <Button variant="outline" className="w-full justify-between">
                  Categories <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Recent Orders</CardTitle>
            <Link to="/orders">
              <Button variant="ghost" size="sm" className="gap-1">
                View all <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">{o.id}</TableCell>
                    <TableCell>{o.customerName}</TableCell>
                    <TableCell className="text-muted-foreground">{o.phone}</TableCell>
                    <TableCell>{o.items.length} items</TableCell>
                    <TableCell className="font-medium">{inr(o.amount)}</TableCell>
                    <TableCell><OrderStatusBadge status={o.status} /></TableCell>
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
