import { NextRequest, NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/github";
import type { Paper } from "@/lib/research";

const FILE = "content/research.json";

function auth(req: NextRequest) {
  const header = req.headers.get("authorization") ?? "";
  const token = header.replace(/^Bearer\s+/i, "");
  return token === process.env.ARTICLES_API_KEY;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// GET /api/articles — list all
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { content } = await readJSON<Paper[]>(FILE);
    return NextResponse.json(content);
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// POST /api/articles — create new article
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Partial<Paper>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const required = ["title", "authors", "date", "abstract", "body"] as const;
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
    }
  }

  const { content: papers, sha } = await readJSON<Paper[]>(FILE);

  const slug = body.slug ?? slugify(body.title!);
  if (papers.find((p) => p.slug === slug)) {
    return NextResponse.json({ error: `Slug already exists: ${slug}` }, { status: 409 });
  }

  const paper: Paper = {
    slug,
    title: body.title!,
    subtitle: body.subtitle,
    authors: body.authors!,
    date: body.date!,
    tags: body.tags ?? [],
    abstract: body.abstract!,
    body: body.body!,
  };

  await writeJSON(FILE, [...papers, paper], sha, `Add article: ${paper.title}`);
  return NextResponse.json(paper, { status: 201 });
}
