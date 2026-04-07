"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface ContactLead {
  id: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  message?: string | null;
  isRead: boolean;
  ipAddress?: string | null;
  createdAt: string;
}

export default function ContactLeadsPage() {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    const res = await fetch("/api/admin/contact-leads");
    const data = await res.json();
    setLeads(data.leads || []);
    setUnreadCount(data.unreadCount || 0);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const toggleRead = async (lead: ContactLead) => {
    await fetch(`/api/admin/contact-leads/${lead.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: !lead.isRead }),
    });
    toast.success(`Marked as ${lead.isRead ? "unread" : "read"}`);
    fetchLeads();
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/contact-leads/${id}`, { method: "DELETE" });
    toast.success("Message deleted");
    fetchLeads();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
        {unreadCount > 0 && (
          <Badge variant="destructive">{unreadCount} unread</Badge>
        )}
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : leads.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No contact submissions yet.
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {leads.map((lead) => (
            <Card key={lead.id} className={lead.isRead ? "opacity-70" : "border-primary/30"}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${lead.isRead ? "bg-muted-foreground" : "bg-primary"}`} />
                    <CardTitle className="text-base">{lead.name}</CardTitle>
                    {!lead.isRead && <Badge className="text-xs">New</Badge>}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" onClick={() => toggleRead(lead)}>
                      {lead.isRead ? "Mark Unread" : "Mark Read"}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteLead(lead.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {lead.phone  && <div><span className="text-muted-foreground">Phone:</span> <span>{lead.phone}</span></div>}
                  {lead.email  && <div><span className="text-muted-foreground">Email:</span> <span>{lead.email}</span></div>}
                  {lead.message && (
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Message:</span>
                      <p className="mt-1">{lead.message}</p>
                    </div>
                  )}
                  <div><span className="text-muted-foreground">Received:</span> <span>{new Date(lead.createdAt).toLocaleString()}</span></div>
                  {lead.ipAddress && <div><span className="text-muted-foreground">IP:</span> <span className="font-mono text-xs">{lead.ipAddress}</span></div>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
