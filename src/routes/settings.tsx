import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Store, Upload } from "lucide-react";
import { AdminHeader } from "@/components/admin-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Queens Departmental Store Admin" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [name, setName] = useState("Queens Departmental Store");
  const [address, setAddress] = useState("Shop No. 14, MG Road, Pune, Maharashtra 411001");
  const [contact, setContact] = useState("+91 98765 00000");

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Store settings saved");
  };

  return (
    <>
      <AdminHeader title="Settings" subtitle="Manage your store details" />
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <form onSubmit={save} className="grid max-w-3xl gap-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Store Logo</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Store className="h-8 w-8" />
                </div>
                <Button type="button" variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" /> Upload logo
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Store Information</CardTitle></CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-1.5">
                <Label>Store Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid gap-1.5">
                <Label>Store Address</Label>
                <Textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} />
              </div>
              <div className="grid gap-1.5">
                <Label>Contact Number</Label>
                <Input value={contact} onChange={(e) => setContact(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </main>
    </>
  );
}
