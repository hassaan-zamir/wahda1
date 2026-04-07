import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const RATE_LIMIT = 3;      // max submissions
const WINDOW_HOURS = 24;   // per day

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const body = await req.json();
    const { name, phone, email, message } = body;

    if (!name || (!phone && !email)) {
      return NextResponse.json({ error: "Please provide your name and a phone number or email." }, { status: 400 });
    }

    // Rate limit: check submissions in last 24h from this IP
    const windowStart = new Date(Date.now() - WINDOW_HOURS * 60 * 60 * 1000);
    const recentCount = await prisma.contactLead.count({
      where: { ipAddress: ip, createdAt: { gte: windowStart } },
    });

    if (recentCount >= RATE_LIMIT) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again after 24 hours or call us directly." },
        { status: 429 }
      );
    }

    await prisma.contactLead.create({
      data: {
        name: String(name).slice(0, 200),
        phone: phone ? String(phone).slice(0, 50) : null,
        email: email ? String(email).slice(0, 200) : null,
        message: message ? String(message).slice(0, 2000) : null,
        ipAddress: ip,
        isRead: false,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact API]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
