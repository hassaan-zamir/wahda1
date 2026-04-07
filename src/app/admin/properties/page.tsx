"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Property {
  id: string; title: string; slug: string; type: string; typelabel: string;
  description?: string | null; price: string; location: string; badge: string;
  size?: string | null; detail1Label?: string | null; detail1Value?: string | null;
  detail2Label?: string | null; detail2Value?: string | null; status: string;
  featured: boolean; flagshipProjectId?: string | null;
}
const BLANK: Omit<Property, "id"> = {
  title: "", slug: "", type: "residential", typelabel: "", description: "",
  price: "", location: "", badge: "Available", size: "", detail1Label: "", detail1Value: "",
  detail2Label: "", detail2Value: "", status: "Available", featured: true, flagshipProjectId: null,
};

const STATUS_COLORS: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Available: "default", Sold: "secondary",
};

export default function PropertiesAdminPage() {
  const [items, setItems] = useState<Property[]>([]);
  const [editing, setEditing] = useState<Partial<Property & { id?: string }> | null>(null);
  const [filter, setFilter] = useState("all");
  const fetch_ = async () => { const r = await fetch("/api/admin/properties"); setItems(await r.json()); };
  useEffect(() => { fetch_(); }, []);

  const save = async () => {
    if (!editing) return;
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/admin/properties/${editing.id}` : "/api/admin/properties";
    const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    if (r.ok) { toast.success("Saved!"); setEditing(null); fetch_(); } else toast.error("Failed");
  };
  const del = async (id: string) => { if (!confirm("Delete?")) return; await fetch(`/api/admin/properties/${id}`, { method: "DELETE" }); toast.success("Deleted"); fetch_(); };

  const filtered = filter === "all" ? items : items.filter((i) => i.type === filter);
  const types = ["all", "residential", "commercial", "villa", "apartment", "shop"];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
        <Button onClick={() => setEditing({ ...BLANK })}>+ New Property</Button>
      </div>

      {editing && (
        <Card><CardContent className="p-4 grid grid-cols-2 gap-4">
          {(["title","slug","type","typelabel","price","location","badge","size","status","detail1Label","detail1Value","detail2Label","detail2Value","flagshipProjectId"] as const).map((field) => (
            <div key={field} className="flex flex-col gap-1.5"><Label className="capitalize">{field.replace(/([A-Z])/g," $1")}</Label>
              <Input value={(editing as Record<string,unknown>)[field] as string || ""} onChange={(e) => setEditing({ ...editing, [field]: e.target.value || null })} />
            </div>
          ))}
          <div className="col-span-2 flex flex-col gap-1.5"><Label>Description</Label><Textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
          <div className="flex gap-1.5 items-center">
            <input type="checkbox" id="featured" checked={editing.featured ?? false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} />
            <Label htmlFor="featured">Featured on home page</Label>
          </div>
          <div className="col-span-2 flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </div>
        </CardContent></Card>
      )}

      <div className="flex gap-2 flex-wrap">
        {types.map((t) => (
          <Button key={t} size="sm" variant={filter === t ? "default" : "outline"} onClick={() => setFilter(t)} className="capitalize">{t}</Button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((item) => (
          <Card key={item.id}><CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-semibold">{item.title}</span>
                <Badge variant={STATUS_COLORS[item.status] || "outline"}>{item.status}</Badge>
                {item.featured && <Badge variant="outline">Featured</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">{item.location} · {item.price} · {item.type}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={() => setEditing(item)}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => del(item.id)}>Delete</Button>
            </div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
