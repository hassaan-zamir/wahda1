import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("flagshipProjectId");
  const where = projectId ? { flagshipProjectId: projectId } : {};
  const items = await prisma.property.findMany({ where, orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const item = await prisma.property.create({ data: body });
  return NextResponse.json(item, { status: 201 });
}
