import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { papers, formatDate } from "@/lib/research";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research — Non-Stationary Objectives",
  description:
    "Papers and writing from NSO on epistemic infrastructure, AI alignment, and cognitive systems.",
};

export default function ResearchIndex() {
  return (
    <main className="bg-canvas min-h-screen">
      <Nav />

      {/* Page header */}
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-wide mx-auto">
          <p className="text-text-muted text-xs tracking-eyebrow uppercase mb-8">
            Research
          </p>
          <h1
            className="text-text-primary font-light tracking-tight leading-[1.1] mb-6"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            Writing & papers
          </h1>
          <p className="text-text-body text-lg leading-relaxed max-w-prose">
            Ongoing work on epistemic infrastructure, AI alignment, and the
            design of systems oriented toward Faith, Truth, and Love.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6">
        <div className="max-w-wide mx-auto border-t border-rule" />
      </div>

      {/* Paper list */}
      <section className="px-6 py-16">
        <div className="max-w-wide mx-auto space-y-0">
          {papers.map((paper, i) => (
            <Link
              key={paper.slug}
              href={`/research/${paper.slug}`}
              className="group block py-10 border-b border-rule hover:bg-surface transition-colors -mx-6 px-6"
            >
              <div className="max-w-wide mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                {/* Left: meta */}
                <div className="flex flex-col gap-3 md:w-40 shrink-0">
                  <p className="text-text-muted text-xs tracking-eyebrow uppercase">
                    {formatDate(paper.date)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {paper.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-text-muted text-xs border border-rule px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: content */}
                <div className="flex-1 max-w-prose">
                  <h2 className="text-text-primary font-light tracking-tight text-xl mb-2 group-hover:text-white transition-colors">
                    {paper.title}
                  </h2>
                  {paper.subtitle && (
                    <p className="text-text-muted text-sm mb-4">
                      {paper.subtitle}
                    </p>
                  )}
                  <p className="text-text-body text-sm leading-relaxed line-clamp-3">
                    {paper.abstract}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center text-text-dim group-hover:text-text-muted transition-colors pt-1">
                  <span className="text-sm">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
