import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/github";
import type { Paper } from "@/lib/research";

const FILE = "content/research.json";

function auth(req: NextRequest) {
  const header = req.headers.get("authorization") ?? "";
  const token = header.replace(/^Bearer\s+/i, "");
  return token === process.env.ARTICLES_API_KEY;
}

// GET /api/articles/[slug] — fetch one
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const { content: papers } = await readJSON<Paper[]>(FILE);
  const paper = papers.find((p) => p.slug === slug);
  if (!paper) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(paper);
}

// PUT /api/articles/[slug] — full or partial update
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

// DELETE /api/articles/[slug] — remove
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;

  const { content: papers, sha } = await readJSON<Paper[]>(FILE);
  const idx = papers.findIndex((p) => p.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const removed = papers[idx];
  const next = papers.filter((p) => p.slug !== slug);
  await writeJSON(FILE, next, sha, `Delete article: ${removed.title}`);
  return NextResponse.json({ deleted: slug });
}
