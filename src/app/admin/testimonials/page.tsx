"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Testimonial {
  id: string; name: string; initials: string; role?: string | null;
  content: string; rating: number; active: boolean;
}
const BLANK = { name: "", initials: "", role: "", content: "", rating: 5, active: true };

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Partial<Testimonial & { id?: string }> | null>(null);
  const fetch_ = async () => { const r = await fetch("/api/admin/testimonials"); setItems(await r.json()); };
  useEffect(() => { fetch_(); }, []);

  const save = async () => {
    if (!editing) return;
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/admin/testimonials/${editing.id}` : "/api/admin/testimonials";
    const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    if (r.ok) { toast.success("Saved!"); setEditing(null); fetch_(); } else toast.error("Failed");
  };
  const del = async (id: string) => { if (!confirm("Delete?")) return; await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" }); toast.success("Deleted"); fetch_(); };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
        <Button onClick={() => setEditing({ ...BLANK })}>+ New Testimonial</Button>
      </div>
      {editing && (
        <Card><CardContent className="p-4 grid grid-cols-2 gap-4">
          {(["name","initials","role"] as const).map((field) => (
            <div key={field} className="flex flex-col gap-1.5"><Label className="capitalize">{field}</Label>
              <Input value={(editing as Record<string, unknown>)[field] as string || ""} onChange={(e) => setEditing({ ...editing, [field]: e.target.value })} />
            </div>
          ))}
          <div className="flex flex-col gap-1.5"><Label>Rating (1-5)</Label><Input type="number" min="1" max="5" value={editing.rating ?? 5} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} /></div>
          <div className="col-span-2 flex flex-col gap-1.5"><Label>Content</Label><Textarea value={editing.content || ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} /></div>
          <div className="flex gap-1.5 items-center">
            <input type="checkbox" id="active" checked={editing.active ?? true} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} />
            <Label htmlFor="active">Active (visible on site)</Label>
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
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{item.name}</span>
                <Badge variant={item.active ? "default" : "secondary"}>{item.active ? "Active" : "Hidden"}</Badge>
                <span className="text-amber-500 text-sm">{"★".repeat(item.rating)}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{item.content}</p>
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
