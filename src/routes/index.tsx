import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Package, ShoppingCart, Clock, CheckCircle2, ArrowUpRight, TrendingUp, TrendingDown,
  ArrowRight, IndianRupee, Users, AlertTriangle, BarChart3, Wallet,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";
import { AdminHeader } from "@/components/admin-header";
import {
  stats, orders, revenueByMonth, categoryRevenue, topSellingProducts,
  inventoryAlerts, inr,
} from "@/lib/mock-data";
import { OrderStatusBadge } from "@/components/order-status-badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Queens Departmental Store Admin" },
      { name: "description", content: "Overview of orders, revenue, and inventory for your store." },
    ],
  }),
  component: Dashboard,
});

/* ── KPI card definitions ─────────────────────────────── */
const kpiCards = [
  {
    label: "Total Revenue",
    value: `₹${(stats.revenue / 100000).toFixed(1)}L`,
    subtitle: "This month",
    icon: IndianRupee,
    delta: "+18.4%",
    positive: true,
    gradient: "gradient-blue",
    iconBg: "bg-white/20",
  },
  {
    label: "Total Orders",
    value: stats.totalOrders.toLocaleString(),
    subtitle: "All time",
    icon: ShoppingCart,
    delta: "+86 this week",
    positive: true,
    gradient: "gradient-emerald",
    iconBg: "bg-white/20",
  },
  {
    label: "Pending Orders",
    value: stats.pendingOrders.toString(),
    subtitle: "Requires action",
    icon: Clock,
    delta: "5 urgent",
    positive: false,
    gradient: "gradient-amber",
    iconBg: "bg-white/20",
  },
  {
    label: "Active Customers",
    value: stats.returningCustomers.toString() + "%",
    subtitle: "Returning rate",
    icon: Users,
    delta: "+4.2% vs last month",
    positive: true,
    gradient: "gradient-violet",
    iconBg: "bg-white/20",
  },
];

/* ── Custom chart tooltip ─────────────────────────────── */
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border/50 bg-card px-4 py-3 shadow-xl shadow-black/5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="text-sm font-bold">{p.name === "revenue" ? inr(p.value) : p.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Dashboard component ──────────────────────────────── */
function Dashboard() {
  const recent = orders.slice(0, 6);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <>
      <AdminHeader title="Dashboard" subtitle="Store analytics & overview" />
      <main className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 custom-scrollbar overflow-y-auto">

        {/* ── Welcome section ── */}
        <section className="animate-fade-in-up">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                Overview
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight lg:text-[28px]">
                {greeting}, Ramesh 👋
              </h2>
              <p className="mt-0.5 text-[13px] text-muted-foreground">
                Here's what's happening at your store today.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Button variant="outline" size="sm" className="h-9 gap-1.5 rounded-lg text-[12px] font-medium border-border/60">
                <BarChart3 className="h-3.5 w-3.5" /> Download Report
              </Button>
              <Link to="/products">
                <Button size="sm" className="h-9 gap-1.5 rounded-lg text-[12px] font-semibold bg-primary hover:bg-primary/90 shadow-md shadow-primary/20">
                  <Package className="h-3.5 w-3.5" /> Add Product
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── KPI cards ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiCards.map((s, i) => (
            <div
              key={s.label}
              className={`animate-fade-in-up delay-${i + 1} group relative overflow-hidden rounded-2xl ${s.gradient} p-5 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5`}
            >
              {/* Decorative circle */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/[0.07]" />
              <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-white/[0.05]" />

              <div className="relative flex items-start justify-between">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                    {s.label}
                  </p>
                  <p className="mt-2 text-[32px] font-extrabold leading-none tracking-tight">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-white/50">
                    {s.subtitle}
                  </p>
                </div>
                <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${s.iconBg} backdrop-blur-sm`}>
                  <s.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
              </div>

              <div className="relative mt-4 flex items-center gap-1.5">
                {s.positive ? (
                  <TrendingUp className="h-3 w-3 text-white/80" />
                ) : (
                  <AlertTriangle className="h-3 w-3 text-white/80" />
                )}
                <p className="text-[11px] font-semibold text-white/80">
                  {s.delta}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Revenue chart + Category breakdown ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 animate-fade-in-up delay-5">
          {/* Revenue area chart */}
          <Card className="lg:col-span-2 border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-[15px] font-bold tracking-tight">
                  Revenue Trend
                </CardTitle>
                <p className="mt-0.5 text-[12px] text-muted-foreground">Monthly revenue over 6 months</p>
              </div>
              <Badge
                variant="outline"
                className="gap-1 rounded-full border-emerald-200/60 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700"
              >
                <TrendingUp className="h-3 w-3" /> +18.4%
              </Badge>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex items-end justify-between gap-4 mb-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    This month
                  </p>
                  <p className="mt-0.5 text-3xl font-extrabold tracking-tight">
                    ₹{(stats.revenue / 100000).toFixed(2)}L
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Avg. order value
                  </p>
                  <p className="mt-0.5 text-lg font-bold">
                    {inr(stats.avgOrderValue)}
                  </p>
                </div>
              </div>

              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueByMonth} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 500 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 500 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366f1"
                      strokeWidth={2.5}
                      fill="url(#revenueGrad)"
                      dot={false}
                      activeDot={{ r: 6, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category revenue */}
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-[15px] font-bold tracking-tight">
                Sales by Category
              </CardTitle>
              <p className="mt-0.5 text-[12px] text-muted-foreground">Revenue distribution</p>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[180px] w-full mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryRevenue} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#9ca3af", fontSize: 10, fontWeight: 500 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={28}>
                      {categoryRevenue.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} opacity={0.85} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Category legend */}
              <div className="space-y-2.5">
                {categoryRevenue.slice(0, 4).map((c) => (
                  <div key={c.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="text-[12px] font-medium text-foreground">{c.name}</span>
                    </div>
                    <span className="text-[12px] font-bold">{inr(c.value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Top selling + Inventory alerts ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 animate-fade-in-up delay-6">
          {/* Top selling products */}
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-[15px] font-bold tracking-tight">
                  Top Selling Products
                </CardTitle>
                <p className="mt-0.5 text-[12px] text-muted-foreground">By units sold this month</p>
              </div>
              <Link to="/products">
                <Button variant="ghost" size="sm" className="gap-1 text-[12px] text-primary hover:text-primary">
                  View all <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {topSellingProducts.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted/50">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted/80 text-[13px] font-extrabold text-muted-foreground">
                      #{i + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold">{p.name}</p>
                      <p className="text-[11px] text-muted-foreground">{p.sold} units sold</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-bold">{inr(p.revenue)}</p>
                      <div className={`flex items-center justify-end gap-0.5 text-[11px] font-semibold ${p.trend > 0 ? "text-emerald-600" : "text-rose-500"}`}>
                        {p.trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {Math.abs(p.trend)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inventory alerts */}
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-[15px] font-bold tracking-tight flex items-center gap-2">
                  Inventory Alerts
                  <Badge className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700 border-0">
                    {inventoryAlerts.length}
                  </Badge>
                </CardTitle>
                <p className="mt-0.5 text-[12px] text-muted-foreground">Products needing restock</p>
              </div>
              <Link to="/products">
                <Button variant="ghost" size="sm" className="gap-1 text-[12px] text-primary hover:text-primary">
                  Manage <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {inventoryAlerts.map((a) => (
                  <div key={a.product} className="rounded-xl border border-border/50 p-3 transition-colors hover:bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] font-semibold">{a.product}</span>
                      <Badge
                        variant="outline"
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          a.status === "Out of Stock"
                            ? "border-rose-200 bg-rose-50 text-rose-700"
                            : "border-amber-200 bg-amber-50 text-amber-700"
                        }`}
                      >
                        {a.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress
                        value={Math.min(100, (a.stock / a.threshold) * 100)}
                        className="h-1.5 flex-1"
                      />
                      <span className="text-[11px] font-bold text-muted-foreground whitespace-nowrap">
                        {a.stock}/{a.threshold}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Recent orders ── */}
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow animate-fade-in-up delay-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-[15px] font-bold tracking-tight">
                Recent Orders
              </CardTitle>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                Latest activity from your store
              </p>
            </div>
            <Link to="/orders">
              <Button variant="outline" size="sm" className="gap-1.5 rounded-lg text-[12px] font-medium border-border/60">
                View all orders <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="h-11 pl-6 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      Order ID
                    </TableHead>
                    <TableHead className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      Customer
                    </TableHead>
                    <TableHead className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      Phone
                    </TableHead>
                    <TableHead className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      Items
                    </TableHead>
                    <TableHead className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      Amount
                    </TableHead>
                    <TableHead className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recent.map((o) => (
                    <TableRow key={o.id} className="border-border/40 hover:bg-muted/30 transition-colors">
                      <TableCell className="py-3.5 pl-6 font-mono text-[12px] font-semibold text-primary">
                        {o.id}
                      </TableCell>
                      <TableCell className="text-[13px] font-medium">{o.customerName}</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground">{o.phone}</TableCell>
                      <TableCell className="text-[13px] text-muted-foreground">
                        <Badge variant="secondary" className="rounded-full text-[11px] font-medium">
                          {o.items.length} items
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[13px] font-bold">{inr(o.amount)}</TableCell>
                      <TableCell>
                        <OrderStatusBadge status={o.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* ── Quick actions footer ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 animate-fade-in-up delay-6">
          {[
            { to: "/products", label: "Manage Products", icon: Package, desc: "214 products" },
            { to: "/orders", label: "View Orders", icon: ShoppingCart, desc: "28 pending" },
            { to: "/customers", label: "Customers", icon: Users, desc: "8 active" },
            { to: "/categories", label: "Categories", icon: Wallet, desc: "8 categories" },
          ].map((a) => (
            <Link key={a.to} to={a.to}>
              <Card className="group border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
                    <a.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold">{a.label}</p>
                    <p className="text-[11px] text-muted-foreground">{a.desc}</p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground/40 transition-all group-hover:text-primary group-hover:translate-x-0.5" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
