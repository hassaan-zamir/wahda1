import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  return NextResponse.json(await prisma.whyChooseUs.findMany({ orderBy: { order: "asc" } }));
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json(await prisma.whyChooseUs.create({ data: body }), { status: 201 });
}
