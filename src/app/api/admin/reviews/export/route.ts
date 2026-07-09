import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const stars = searchParams.get("stars");

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (stars) where.stars = parseInt(stars);

  const reviews = await prisma.review.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const headerRow = "ID,Stars,Language,Source,Keywords,Text,Status,Created At\n";
  const csvRows = reviews.map(
    (r) =>
      `"${r.id}",${r.stars},"${r.language}","${r.source}","${r.keywords || ""}","${r.text.replace(/"/g, '""')}","${r.status}","${r.createdAt.toISOString()}"`
  );
  const csv = headerRow + csvRows.join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=reviews.csv",
    },
  });
}
