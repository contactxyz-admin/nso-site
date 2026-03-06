import Link from "next/link";
import { readJSON } from "@/lib/github";
import type { Paper } from "@/lib/research";
import { formatDate } from "@/lib/research";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminIndex() {
  const { content: papers } = await readJSON<Paper[]>("content/research.json");

  return (
    <main className="bg-canvas min-h-screen px-6 py-16">
      <div className="max-w-wide mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-text-muted text-xs tracking-eyebrow uppercase mb-2">
              NSO Admin
            </p>
            <h1 className="text-text-primary font-light tracking-tight text-2xl">
              Research articles
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/edit/new"
              className="text-text-primary text-sm border border-rule px-4 py-2 hover:border-text-muted transition-colors"
            >
              + New article
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-rule mb-0" />

        {/* Article list */}
        {papers.length === 0 ? (
          <p className="text-text-muted text-sm py-16 text-center">
            No articles yet.{" "}
            <Link href="/admin/edit/new" className="text-text-body hover:text-text-primary underline">
              Create one.
            </Link>
          </p>
        ) : (
          <ul>
            {papers.map((paper) => (
              <li key={paper.slug} className="flex items-center justify-between gap-6 py-6 border-b border-rule group">
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary text-sm font-medium truncate group-hover:text-white transition-colors">
                    {paper.title}
                  </p>
                  <p className="text-text-muted text-xs mt-1">
                    {formatDate(paper.date)} · {paper.tags.join(", ")}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <Link
                    href={`/research/${paper.slug}`}
                    target="_blank"
                    className="text-text-muted text-xs hover:text-text-body transition-colors"
                  >
                    View ↗
                  </Link>
                  <Link
                    href={`/admin/edit/${paper.slug}`}
                    className="text-text-primary text-xs border border-rule px-3 py-1.5 hover:border-text-muted transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
