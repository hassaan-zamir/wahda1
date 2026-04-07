"use server";

import prisma from "@/lib/prisma";

export async function submitInquiry(data: any) {
  try {
    await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message || "No message provided",
        status: "New",
      },
    });
    return { success: true };
  } catch (error: any) {
    console.error("Failed to submit inquiry:", error);
    return { success: false, error: "Failed to submit your inquiry. Please try again later." };
  }
}
