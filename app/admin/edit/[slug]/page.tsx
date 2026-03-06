import { readJSON } from "@/lib/github";
import type { Paper } from "@/lib/research";
import ArticleEditor from "./ArticleEditor";

export const dynamic = "force-dynamic";

export default async function EditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const isNew = slug === "new";

  let paper: Paper | null = null;
  if (!isNew) {
    const { content: papers } = await readJSON<Paper[]>("content/research.json");
    paper = papers.find((p) => p.slug === slug) ?? null;
  }

  return <ArticleEditor paper={paper} isNew={isNew} />;
}
