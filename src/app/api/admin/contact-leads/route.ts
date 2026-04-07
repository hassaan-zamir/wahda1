import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const [leads, unreadCount] = await Promise.all([
    prisma.contactLead.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.contactLead.count({ where: { isRead: false } }),
  ]);
  return NextResponse.json({ leads, unreadCount });
}
