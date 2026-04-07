import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const item = await prisma.flagshipProject.findUnique({ where: { id }, include: { properties: true } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await req.json();
  const item = await prisma.flagshipProject.update({ where: { id }, data: body });
  return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  await prisma.flagshipProject.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
