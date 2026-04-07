"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface TrustedBrand {
  id: string; name: string; initials: string; bgColor: string; textColor: string;
  roleTag: string; description: string; order: number;
}
const BLANK = { name: "", initials: "", bgColor: "#C8A951", textColor: "#070B14", roleTag: "", description: "", order: 0 };

export default function TrustedBrandsAdminPage() {
  const [items, setItems] = useState<TrustedBrand[]>([]);
  const [editing, setEditing] = useState<Partial<TrustedBrand & { id?: string }> | null>(null);
  const fetch_ = async () => { const r = await fetch("/api/admin/trusted-brands"); setItems(await r.json()); };
  useEffect(() => { fetch_(); }, []);

  const save = async () => {
    if (!editing) return;
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/admin/trusted-brands/${editing.id}` : "/api/admin/trusted-brands";
    const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    if (r.ok) { toast.success("Saved!"); setEditing(null); fetch_(); } else toast.error("Failed");
  };
  const del = async (id: string) => { if (!confirm("Delete?")) return; await fetch(`/api/admin/trusted-brands/${id}`, { method: "DELETE" }); toast.success("Deleted"); fetch_(); };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Trusted Brands</h1>
        <Button onClick={() => setEditing({ ...BLANK })}>+ New Brand</Button>
      </div>
      {editing && (
        <Card><CardContent className="p-4 grid grid-cols-2 gap-4">
          {(["name","initials","roleTag"] as const).map((field) => (
            <div key={field} className="flex flex-col gap-1.5"><Label className="capitalize">{field}</Label>
              <Input value={(editing as Record<string, unknown>)[field] as string || ""} onChange={(e) => setEditing({ ...editing, [field]: e.target.value })} />
            </div>
          ))}
          <div className="flex flex-col gap-1.5"><Label>BG Color</Label><Input value={editing.bgColor || ""} onChange={(e) => setEditing({ ...editing, bgColor: e.target.value })} /></div>
          <div className="flex flex-col gap-1.5"><Label>Text Color</Label><Input value={editing.textColor || ""} onChange={(e) => setEditing({ ...editing, textColor: e.target.value })} /></div>
          <div className="col-span-2 flex flex-col gap-1.5"><Label>Description</Label><Textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
          <div className="col-span-2 flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </div>
        </CardContent></Card>
      )}
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <Card key={item.id}><CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div style={{ width: 40, height: 40, borderRadius: 6, background: item.bgColor, color: item.textColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>{item.initials}</div>
              <div><p className="font-semibold">{item.name}</p><p className="text-sm text-muted-foreground">{item.roleTag}</p></div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditing(item)}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => del(item.id)}>Delete</Button>
            </div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
