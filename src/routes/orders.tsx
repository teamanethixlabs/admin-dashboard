import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Eye } from "lucide-react";
import { AdminHeader } from "@/components/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { OrderStatusBadge } from "@/components/order-status-badge";
import { toast } from "sonner";
import {
  orders as seed, orderStatuses, inr,
  type Order, type OrderStatus,
} from "@/lib/mock-data";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Orders — FreshMart Admin" }] }),
  component: OrdersPage,
});

function OrdersPage() {
  const [items, setItems] = useState<Order[]>(seed);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [viewing, setViewing] = useState<Order | null>(null);

  const filtered = useMemo(() => items.filter((o) => {
    const q = query.toLowerCase();
    const matchesQ = o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.phone.includes(q);
    const matchesS = filter === "all" || o.status === filter;
    return matchesQ && matchesS;
  }), [items, query, filter]);

  const changeStatus = (id: string, status: OrderStatus) => {
    setItems((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    toast.success(`Order ${id} → ${status}`);
  };

  return (
    <>
      <AdminHeader title="Orders" subtitle={`${items.length} total orders`} />
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <Card>
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by order ID, customer or phone..." className="pl-8"
                value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="sm:w-56"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {orderStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
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
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">{o.id}</TableCell>
                    <TableCell>{o.customerName}</TableCell>
                    <TableCell className="text-muted-foreground">{o.phone}</TableCell>
                    <TableCell>{o.items.length}</TableCell>
                    <TableCell className="font-medium">{inr(o.amount)}</TableCell>
                    <TableCell>
                      <Select value={o.status} onValueChange={(v) => changeStatus(o.id, v as OrderStatus)}>
                        <SelectTrigger className="h-8 w-44 border-none bg-transparent p-0 hover:bg-muted/40">
                          <OrderStatusBadge status={o.status} />
                        </SelectTrigger>
                        <SelectContent>
                          {orderStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => setViewing(o)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <Sheet open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <SheetContent className="w-full sm:max-w-md">
          {viewing && (
            <>
              <SheetHeader>
                <SheetTitle>{viewing.id}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-5 px-4">
                <div>
                  <p className="text-xs text-muted-foreground">Customer</p>
                  <p className="font-medium">{viewing.customerName}</p>
                  <p className="text-sm text-muted-foreground">{viewing.phone}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Items</p>
                  <div className="space-y-2 rounded-lg border p-3">
                    {viewing.items.map((it) => (
                      <div key={it.productId} className="flex items-center justify-between text-sm">
                        <span>{it.name} × {it.qty}</span>
                        <span className="font-medium">{inr(it.price * it.qty)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="text-lg font-semibold">{inr(viewing.amount)}</span>
                </div>
                <div>
                  <p className="mb-2 text-xs text-muted-foreground">Status</p>
                  <OrderStatusBadge status={viewing.status} />
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
