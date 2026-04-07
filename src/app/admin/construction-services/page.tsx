"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ConstructionService {
  id: string; icon: string; title: string; description: string; bullets: string[]; order: number;
}
const BLANK = { icon: "", title: "", description: "", bullets: [], order: 0 };

export default function ConstructionServicesAdminPage() {
  const [items, setItems] = useState<ConstructionService[]>([]);
  const [editing, setEditing] = useState<Partial<ConstructionService & { id?: string; bulletsText?: string }> | null>(null);
  const fetch_ = async () => { const r = await fetch("/api/admin/construction-services"); setItems(await r.json()); };
  useEffect(() => { fetch_(); }, []);

  const save = async () => {
    if (!editing) return;
    const payload = { ...editing, bullets: editing.bulletsText?.split("\n").filter(Boolean) ?? editing.bullets };
    delete (payload as Record<string, unknown>).bulletsText;
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/admin/construction-services/${editing.id}` : "/api/admin/construction-services";
    const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (r.ok) { toast.success("Saved!"); setEditing(null); fetch_(); } else toast.error("Failed");
  };
  const del = async (id: string) => { if (!confirm("Delete?")) return; await fetch(`/api/admin/construction-services/${id}`, { method: "DELETE" }); toast.success("Deleted"); fetch_(); };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Construction Services</h1>
        <Button onClick={() => setEditing({ ...BLANK, bulletsText: "" })}>+ New Service</Button>
      </div>
      {editing && (
        <Card><CardContent className="p-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5"><Label>Icon (emoji)</Label><Input value={editing.icon || ""} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} /></div>
          <div className="flex flex-col gap-1.5"><Label>Title</Label><Input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
          <div className="col-span-2 flex flex-col gap-1.5"><Label>Description</Label><Textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
          <div className="col-span-2 flex flex-col gap-1.5">
            <Label>Bullets (one per line)</Label>
            <Textarea value={editing.bulletsText ?? (editing.bullets as string[] || []).join("\n")} onChange={(e) => setEditing({ ...editing, bulletsText: e.target.value })} rows={4} />
          </div>
          <div className="col-span-2 flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </div>
        </CardContent></Card>
      )}
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <Card key={item.id}><CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-2xl">{item.icon}</span>
              <div className="min-w-0"><p className="font-semibold">{item.title}</p><p className="text-sm text-muted-foreground truncate">{item.description}</p></div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={() => setEditing({ ...item, bulletsText: (item.bullets || []).join("\n") })}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => del(item.id)}>Delete</Button>
            </div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
