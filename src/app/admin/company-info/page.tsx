"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CompanyInfo {
  id: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}

export default function CompanyInfoAdminPage() {
  const [info, setInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchInfo = async () => {
    setLoading(true);
    const r = await fetch("/api/admin/company-info");
    setInfo(await r.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const save = async () => {
    if (!info) return;
    const r = await fetch("/api/admin/company-info", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info)
    });
    if (r.ok) {
      toast.success("Company info updated!");
      fetchInfo();
    } else {
      toast.error("Failed to update.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Info</h1>
        <p className="text-muted-foreground mt-2">Manage the contact details displayed across the public-facing site.</p>
      </div>

      <Card>
        <CardContent className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label>Phone Number</Label>
            <Input 
              value={info?.phone || ""} 
              onChange={(e) => setInfo(prev => ({ ...prev!, phone: e.target.value }))}
              placeholder="+92 300 0000000"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>WhatsApp Number</Label>
            <Input 
              value={info?.whatsapp || ""} 
              onChange={(e) => setInfo(prev => ({ ...prev!, whatsapp: e.target.value }))}
              placeholder="+92 300 0000000"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Email Address</Label>
            <Input 
              value={info?.email || ""} 
              onChange={(e) => setInfo(prev => ({ ...prev!, email: e.target.value }))}
              placeholder="info@wahda1.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Office Address</Label>
            <Input 
              value={info?.address || ""} 
              onChange={(e) => setInfo(prev => ({ ...prev!, address: e.target.value }))}
              placeholder="Faisal Hills, Taxila"
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={save}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
