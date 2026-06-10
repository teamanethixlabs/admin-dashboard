import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/lib/mock-data";

const styles: Record<OrderStatus, string> = {
  Pending: "bg-amber-500/15 text-amber-700 hover:bg-amber-500/20 border-amber-500/20",
  Confirmed: "bg-blue-500/15 text-blue-700 hover:bg-blue-500/20 border-blue-500/20",
  Packed: "bg-violet-500/15 text-violet-700 hover:bg-violet-500/20 border-violet-500/20",
  "Out for Delivery": "bg-orange-500/15 text-orange-700 hover:bg-orange-500/20 border-orange-500/20",
  Delivered: "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20 border-emerald-500/20",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge variant="outline" className={`font-medium ${styles[status]}`}>
      {status}
    </Badge>
  );
}
