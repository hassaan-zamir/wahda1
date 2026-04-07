"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Building2, LayoutDashboard, Users, Settings, Star,
  Map, Tag, Award, Hammer, Heart, MessageSquare, TrendingUp, Phone
} from "lucide-react";
import { AdminLogoutButton } from "./admin-logout-button";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard",            url: "/admin",                        icon: LayoutDashboard },
  { title: "Contact Leads",        url: "/admin/contact-leads",          icon: MessageSquare },
  { title: "CRM Leads",            url: "/admin/leads",                  icon: TrendingUp },
  { title: "Flagship Projects",    url: "/admin/flagship-projects",      icon: Map },
  { title: "Properties",          url: "/admin/properties",             icon: Building2 },
  { title: "Property Categories",  url: "/admin/property-categories",    icon: Tag },
  { title: "Trusted Brands",       url: "/admin/trusted-brands",         icon: Award },
  { title: "Construction Services",url: "/admin/construction-services",  icon: Hammer },
  { title: "Why Choose Us",        url: "/admin/why-choose-us",          icon: Heart },
  { title: "Testimonials",         url: "/admin/testimonials",           icon: Star },
  { title: "Company Info",         url: "/admin/company-info",           icon: Phone },
  { title: "Settings",             url: "/admin/settings",               icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <Image src="/images/logo.png" alt="Wahda 1" width={150} height={40} className="object-contain h-8 w-auto" priority />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.url || (item.url !== "/admin" && pathname.startsWith(item.url));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-4">
        <AdminLogoutButton />
      </div>
    </Sidebar>
  );
}
