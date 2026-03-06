import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/github";
import type { Paper } from "@/lib/research";

const FILE = "content/research.json";

// PUT /api/admin/articles/[slug] — update article (cookie-authenticated via middleware)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  let updates: Partial<Paper>;
  try {
    updates = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { content: papers, sha } = await readJSON<Paper[]>(FILE);
  const idx = papers.findIndex((p) => p.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated: Paper = { ...papers[idx], ...updates, slug };
  const next = [...papers];
  next[idx] = updated;

  await writeJSON(FILE, next, sha, `Update article: ${updated.title}`);
  return NextResponse.json(updated);
}

// DELETE /api/admin/articles/[slug] — remove article (cookie-authenticated via middleware)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { content: papers, sha } = await readJSON<Paper[]>(FILE);
  const idx = papers.findIndex((p) => p.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const removed = papers[idx];
  const next = papers.filter((p) => p.slug !== slug);
  await writeJSON(FILE, next, sha, `Delete article: ${removed.title}`);
  return NextResponse.json({ deleted: slug });
}
