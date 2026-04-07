import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
interface Params { params: Promise<{ id: string }> }
export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  return NextResponse.json(await prisma.trustedBrand.update({ where: { id }, data: await req.json() }));
}
export async function DELETE(_: NextRequest, { params }: Params) {
  const { id } = await params;
  await prisma.trustedBrand.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
