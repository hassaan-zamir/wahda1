import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserCheck } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full min-h-screen bg-muted/40">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10 w-full shrink-0">
          <SidebarTrigger />
          <div className="flex flex-1 items-center justify-end gap-4">
            <UserCheck className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium">Admin User</span>
          </div>
        </header>
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
