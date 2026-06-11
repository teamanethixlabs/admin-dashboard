import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/lib/mock-data";

const styles: Record<OrderStatus, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-500/10 dark:text-amber-400",
  Confirmed: "bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-500/10 dark:text-blue-400",
  Packed: "bg-violet-50 text-violet-700 border-violet-200/60 dark:bg-violet-500/10 dark:text-violet-400",
  "Out for Delivery": "bg-orange-50 text-orange-700 border-orange-200/60 dark:bg-orange-500/10 dark:text-orange-400",
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-500/10 dark:text-emerald-400",
};

const dotStyles: Record<OrderStatus, string> = {
  Pending: "bg-amber-500",
  Confirmed: "bg-blue-500",
  Packed: "bg-violet-500",
  "Out for Delivery": "bg-orange-500",
  Delivered: "bg-emerald-500",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge
      variant="outline"
      className={`gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} />
      {status}
    </Badge>
  );
}
