import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await req.json();
  const item = await prisma.propertyCategory.update({ where: { id }, data: body });
  return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  await prisma.propertyCategory.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
