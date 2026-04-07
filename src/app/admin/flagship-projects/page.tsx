"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";

interface FlagshipProject {
  id: string; name: string; slug: string; subtitle?: string | null;
  location: string; description: string; badge?: string | null;
  ribbon?: string | null; accentTitle?: string | null; accentSub?: string | null;
  accentNote?: string | null; active: boolean; order: number;
}

const BLANK: Omit<FlagshipProject, "id"> = {
  name: "", slug: "", subtitle: "", location: "", description: "",
  badge: "", ribbon: "", accentTitle: "", accentSub: "", accentNote: "",
  active: true, order: 0,
};

export default function FlagshipProjectsAdminPage() {
  const [projects, setProjects] = useState<FlagshipProject[]>([]);
  const [editing, setEditing] = useState<Partial<FlagshipProject & { id?: string }> | null>(null);

  const fetchProjects = async () => {
    const res = await fetch("/api/admin/flagship-projects");
    setProjects(await res.json());
  };
  useEffect(() => { fetchProjects(); }, []);

  const save = async () => {
    if (!editing) return;
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/admin/flagship-projects/${editing.id}` : "/api/admin/flagship-projects";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    if (res.ok) { toast.success("Saved!"); setEditing(null); fetchProjects(); }
    else toast.error("Failed to save");
  };

  const del = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/flagship-projects/${id}`, { method: "DELETE" });
    toast.success("Deleted"); fetchProjects();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Flagship Projects</h1>
        <Button onClick={() => setEditing({ ...BLANK })}>+ New Project</Button>
      </div>

      {editing && (
        <Card>
          <CardHeader><CardTitle>{editing.id ? "Edit Project" : "New Project"}</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {(["name","slug","subtitle","location","badge","ribbon","accentTitle","accentSub","accentNote"] as const).map((field) => (
              <div key={field} className="flex flex-col gap-1.5">
                <Label className="capitalize">{field.replace(/([A-Z])/g," $1")}</Label>
                <Input value={(editing as Record<string,unknown>)[field] as string || ""} onChange={(e) => setEditing({ ...editing, [field]: e.target.value })} />
              </div>
            ))}
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label>Description</Label>
              <Textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} />
            </div>
            <div className="flex gap-1.5 items-center">
              <input type="checkbox" id="active" checked={editing.active ?? true} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} />
              <Label htmlFor="active">Active (visible on site)</Label>
            </div>
            <div className="col-span-2 flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button onClick={save}>Save</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-3">
        {projects.map((proj) => (
          <Card key={proj.id}>
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{proj.name}</span>
                  {!proj.active && <Badge variant="secondary">Hidden</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{proj.location}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/properties?flagshipProjectId=${proj.id}`}>View Properties</Link>
                </Button>
                <Button variant="outline" size="sm" onClick={() => setEditing(proj)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => del(proj.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
