"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteLead } from "./actions";
import { toast } from "sonner";

export function DeleteLeadButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={() => {
        if (confirm("Are you sure you want to delete this lead?")) {
          startTransition(async () => {
            const res = await deleteLead(id);
            if (res.success) {
              toast.success("Lead deleted");
            } else {
              toast.error(res.error || "Failed to delete");
            }
          });
        }
      }}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
