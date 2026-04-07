"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface WhyPoint { id: string; icon: string; title: string; description: string; order: number; }
const BLANK = { icon: "", title: "", description: "", order: 0 };

export default function WhyChooseUsAdminPage() {
  const [items, setItems] = useState<WhyPoint[]>([]);
  const [editing, setEditing] = useState<Partial<WhyPoint & { id?: string }> | null>(null);
  const fetch_ = async () => { const r = await fetch("/api/admin/why-choose-us"); setItems(await r.json()); };
  useEffect(() => { fetch_(); }, []);

  const save = async () => {
    if (!editing) return;
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/admin/why-choose-us/${editing.id}` : "/api/admin/why-choose-us";
    const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    if (r.ok) { toast.success("Saved!"); setEditing(null); fetch_(); } else toast.error("Failed");
  };
  const del = async (id: string) => { if (!confirm("Delete?")) return; await fetch(`/api/admin/why-choose-us/${id}`, { method: "DELETE" }); toast.success("Deleted"); fetch_(); };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Why Choose Us</h1>
        <Button onClick={() => setEditing({ ...BLANK })}>+ New Point</Button>
      </div>
      {editing && (
        <Card><CardContent className="p-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5"><Label>Icon (emoji)</Label><Input value={editing.icon || ""} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} /></div>
          <div className="flex flex-col gap-1.5"><Label>Title</Label><Input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></div>
          <div className="col-span-2 flex flex-col gap-1.5"><Label>Description</Label><Textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
          <div className="col-span-2 flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </div>
        </CardContent></Card>
      )}
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <Card key={item.id}><CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div><p className="font-semibold">{item.title}</p><p className="text-sm text-muted-foreground">{item.description}</p></div>
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
