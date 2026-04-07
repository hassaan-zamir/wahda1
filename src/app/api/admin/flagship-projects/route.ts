import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const items = await prisma.flagshipProject.findMany({ orderBy: { order: "asc" }, include: { properties: true } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const item = await prisma.flagshipProject.create({ data: body });
  return NextResponse.json(item, { status: 201 });
}
