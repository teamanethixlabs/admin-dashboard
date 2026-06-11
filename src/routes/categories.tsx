import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
import { AdminHeader } from "@/components/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { categories as seed, type Category } from "@/lib/mock-data";

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [{ title: "Categories — Queens Departmental Store Admin" }] }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const [items, setItems] = useState<Category[]>(seed);
  const [editing, setEditing] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);

  const save = (name: string, description: string) => {
    if (editing) {
      setItems((prev) => prev.map((c) => c.id === editing.id ? { ...c, name, description } : c));
      toast.success("Category updated");
    } else {
      setItems((prev) => [...prev, { id: `c${Date.now()}`, name, description, productCount: 0 }]);
      toast.success("Category added");
    }
    setOpen(false); setEditing(null);
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((c) => c.id !== id));
    toast.success("Category deleted");
  };

  return (
    <>
      <AdminHeader title="Categories" subtitle={`${items.length} categories`} />
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex justify-end">
          <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setEditing(null); }}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="h-4 w-4" /> Add Category</Button>
            </DialogTrigger>
            <CategoryDialog editing={editing} onSave={save} />
          </Dialog>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((c) => (
            <Card key={c.id} className="group transition-all hover:shadow-md">
              <CardContent className="p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Tag className="h-5 w-5" />
                  </div>
                  <div className="flex opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="ghost" size="icon" className="h-8 w-8"
                      onClick={() => { setEditing(c); setOpen(true); }}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => remove(c.id)}>
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                <p className="mt-3 text-xs font-medium text-muted-foreground">{c.productCount} products</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}

function CategoryDialog({
  editing, onSave,
}: { editing: Category | null; onSave: (name: string, description: string) => void }) {
  const [name, setName] = useState(editing?.name ?? "");
  const [description, setDescription] = useState(editing?.description ?? "");
  return (
    <DialogContent>
      <DialogHeader><DialogTitle>{editing ? "Edit Category" : "Add Category"}</DialogTitle></DialogHeader>
      <div className="grid gap-3 py-2">
        <div className="grid gap-1.5">
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Dairy & Eggs" />
        </div>
        <div className="grid gap-1.5">
          <Label>Description</Label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => onSave(name, description)} disabled={!name}>
          {editing ? "Save changes" : "Add category"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
