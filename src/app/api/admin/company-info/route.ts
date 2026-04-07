import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const info = await prisma.companyInfo.findFirst();
  return NextResponse.json(info || {});
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const info = await prisma.companyInfo.findFirst();
  if (info) {
    const updated = await prisma.companyInfo.update({
      where: { id: info.id },
      data: {
        phone: body.phone,
        whatsapp: body.whatsapp,
        email: body.email,
        address: body.address
      }
    });
    return NextResponse.json(updated);
  } else {
    const created = await prisma.companyInfo.create({
      data: {
        phone: body.phone,
        whatsapp: body.whatsapp,
        email: body.email,
        address: body.address
      }
    });
    return NextResponse.json(created, { status: 201 });
  }
}
