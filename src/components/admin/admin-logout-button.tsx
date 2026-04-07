"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/admin/login/actions";
import { useTransition } from "react";

export function AdminLogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-muted-foreground hover:text-foreground"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await logout();
        });
      }}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}
