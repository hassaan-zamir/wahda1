import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
interface Params { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await req.json();
  const lead = await prisma.contactLead.update({ where: { id }, data: { isRead: body.isRead } });
  return NextResponse.json(lead);
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const { id } = await params;
  await prisma.contactLead.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
