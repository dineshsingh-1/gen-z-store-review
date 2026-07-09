import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const { allowed } = rateLimit(ip);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { stars, language, source, keywords, text } = body;

    if (!stars || !Number.isInteger(stars) || stars < 1 || stars > 5) {
      return NextResponse.json({ error: "Stars must be between 1 and 5" }, { status: 400 });
    }
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "Review text is required" }, { status: 400 });
    }
    if (!["en", "hi", "hinglish"].includes(language)) {
      return NextResponse.json({ error: "Invalid language" }, { status: 400 });
    }
    if (!["custom", "generated", "generated_edited"].includes(source)) {
      return NextResponse.json({ error: "Invalid source" }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        stars,
        language,
        source,
        keywords: keywords || null,
        text: text.trim(),
        status: "new",
      },
    });

    return NextResponse.json({ id: review.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
