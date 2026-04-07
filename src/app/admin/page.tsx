import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Star, Award, Hammer, Heart, MessageSquare, Map, Tag, TrendingUp } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboardOverview() {
  const [
    propertyCount,
    leadCount,
    testimonialCount,
    brandCount,
    serviceCount,
    whyCount,
    unreadContactLeads,
    totalContactLeads,
    flagshipCount,
    categoryCount,
    crmLeadCount,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.lead.count(),
    prisma.testimonial.count(),
    prisma.trustedBrand.count(),
    prisma.constructionService.count(),
    prisma.whyChooseUs.count(),
    prisma.contactLead.count({ where: { isRead: false } }),
    prisma.contactLead.count(),
    prisma.flagshipProject.count(),
    prisma.propertyCategory.count(),
    prisma.lead.count(),
  ]);

  const stats = [
    { title: "Unread Messages", value: unreadContactLeads, sub: `${totalContactLeads} total`,       icon: MessageSquare, href: "/admin/contact-leads",        urgent: unreadContactLeads > 0 },
    { title: "CRM Leads",       value: crmLeadCount,       sub: "In pipeline",                      icon: TrendingUp,    href: "/admin/leads",                  urgent: false },
    { title: "Properties",      value: propertyCount,      sub: "Listed",                           icon: Building2,     href: "/admin/properties",             urgent: false },
    { title: "Flagship Projects",value:flagshipCount,      sub: "Active",                           icon: Map,           href: "/admin/flagship-projects",      urgent: false },
    { title: "Categories",      value: categoryCount,      sub: "Property types",                   icon: Tag,           href: "/admin/property-categories",    urgent: false },
    { title: "Brand Partners",  value: brandCount,         sub: "Trusted brands",                   icon: Award,         href: "/admin/trusted-brands",         urgent: false },
    { title: "Services",        value: serviceCount,       sub: "Construction services",            icon: Hammer,        href: "/admin/construction-services",  urgent: false },
    { title: "Why Choose Us",   value: whyCount,           sub: "Value propositions",               icon: Heart,         href: "/admin/why-choose-us",          urgent: false },
    { title: "Testimonials",    value: testimonialCount,   sub: "Client reviews",                   icon: Star,          href: "/admin/testimonials",           urgent: false },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        {unreadContactLeads > 0 && (
          <Link href="/admin/contact-leads" className="text-sm bg-amber-500/10 text-amber-500 border border-amber-500/30 px-4 py-2 rounded-sm hover:bg-amber-500/20 transition-colors">
            🔔 {unreadContactLeads} unread message{unreadContactLeads !== 1 ? "s" : ""}
          </Link>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link href={stat.href} key={stat.title}>
            <Card className={`hover:border-primary/50 transition-colors cursor-pointer ${stat.urgent ? "border-amber-500/50 bg-amber-500/5" : ""}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.urgent ? "text-amber-500" : "text-muted-foreground"}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.urgent ? "text-amber-500" : ""}`}>{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
