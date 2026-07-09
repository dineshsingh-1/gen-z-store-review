import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { Prisma } from "@prisma/client";

async function requireAuth() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(req: NextRequest) {
  const authErr = await requireAuth();
  if (authErr) return authErr;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const stars = searchParams.get("stars");

  const where: Prisma.ReviewWhereInput = {};
  if (status) where.status = status;
  if (stars) {
    const val = parseInt(stars);
    if (!isNaN(val)) where.stars = val;
  }

  const reviews = await prisma.review.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}

export async function PATCH(req: NextRequest) {
  const authErr = await requireAuth();
  if (authErr) return authErr;

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "id and status required" }, { status: 400 });
    }
    if (!["new", "read", "resolved"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const review = await prisma.review.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(review);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
