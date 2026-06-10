import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { AdminHeader } from "@/components/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { products as seedProducts, categories, type Product, type ProductStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Products — FreshMart Admin" }] }),
  component: ProductsPage,
});

const statusTone: Record<ProductStatus, string> = {
  "In Stock": "bg-emerald-500/15 text-emerald-700 border-emerald-500/20",
  "Low Stock": "bg-amber-500/15 text-amber-700 border-amber-500/20",
  "Out of Stock": "bg-rose-500/15 text-rose-700 border-rose-500/20",
};

function deriveStatus(stock: number): ProductStatus {
  if (stock <= 0) return "Out of Stock";
  if (stock < 10) return "Low Stock";
  return "In Stock";
}

function ProductsPage() {
  const [items, setItems] = useState<Product[]>(seedProducts);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const matchesQ = p.name.toLowerCase().includes(query.toLowerCase());
      const matchesC = cat === "all" || p.category === cat;
      return matchesQ && matchesC;
    });
  }, [items, query, cat]);

  const onSave = (data: Omit<Product, "id" | "status" | "image">) => {
    if (editing) {
      setItems((prev) =>
        prev.map((p) =>
          p.id === editing.id ? { ...p, ...data, status: deriveStatus(data.stock) } : p,
        ),
      );
      toast.success("Product updated");
    } else {
      const id = `p${Date.now()}`;
      setItems((prev) => [
        { id, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80", status: deriveStatus(data.stock), ...data },
        ...prev,
      ]);
      toast.success("Product added");
    }
    setOpen(false);
    setEditing(null);
  };

  const onDelete = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted");
  };

  return (
    <>
      <AdminHeader title="Products" subtitle={`${items.length} items in your catalog`} />
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <Card>
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-8"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Select value={cat} onValueChange={setCat}>
                <SelectTrigger className="sm:w-56"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setEditing(null); }}>
              <DialogTrigger asChild>
                <Button className="gap-2"><Plus className="h-4 w-4" /> Add Product</Button>
              </DialogTrigger>
              <ProductDialog editing={editing} onSave={onSave} />
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="h-10 w-10 shrink-0 rounded-md object-cover" />
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{p.category}</TableCell>
                    <TableCell>₹{p.price}</TableCell>
                    <TableCell>{p.stock} {p.unit}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusTone[p.status]}>{p.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => { setEditing(p); setOpen(true); }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => onDelete(p.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

function ProductDialog({
  editing,
  onSave,
}: {
  editing: Product | null;
  onSave: (data: Omit<Product, "id" | "status" | "image">) => void;
}) {
  const [name, setName] = useState(editing?.name ?? "");
  const [category, setCategory] = useState(editing?.category ?? categories[0].name);
  const [price, setPrice] = useState(editing?.price ?? 0);
  const [stock, setStock] = useState(editing?.stock ?? 0);
  const [unit, setUnit] = useState(editing?.unit ?? "pack");

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-3 py-2">
        <div className="grid gap-1.5">
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Amul Milk 1L" />
        </div>
        <div className="grid gap-1.5">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {categories.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="grid gap-1.5">
            <Label>Price (₹)</Label>
            <Input type="number" value={price} onChange={(e) => setPrice(+e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label>Stock</Label>
            <Input type="number" value={stock} onChange={(e) => setStock(+e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label>Unit</Label>
            <Input value={unit} onChange={(e) => setUnit(e.target.value)} />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => onSave({ name, category, price, stock, unit })} disabled={!name}>
          {editing ? "Save changes" : "Add product"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
