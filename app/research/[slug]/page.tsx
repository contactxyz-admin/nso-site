import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { papers, getPaper, formatDate } from "@/lib/research";
import type { Metadata } from "next";

export function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) return {};
  return {
    title: `${paper.title} — NSO`,
    description: paper.abstract,
  };
}

// Render a paragraph: handle **bold** inline
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-text-primary font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function renderBody(body: string) {
  const blocks = body.trim().split(/\n\n+/);
  return blocks.map((block, i) => {
    if (block.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="text-text-primary font-light tracking-tight text-lg mt-10 mb-3"
        >
          {block.slice(4)}
        </h3>
      );
    }
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="text-text-primary font-light tracking-tight text-2xl mt-14 mb-4 pt-10 border-t border-rule"
        >
          {block.slice(3)}
        </h2>
      );
    }
    return (
      <p key={i} className="text-text-body leading-[1.8] mb-0">
        {renderInline(block)}
      </p>
    );
  });
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaper(slug);
  if (!paper) notFound();

  return (
    <main className="bg-canvas min-h-screen">
      <Nav />

      {/* Header */}
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-prose mx-auto">
          {/* Back */}
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-text-muted text-xs tracking-eyebrow uppercase hover:text-text-body transition-colors mb-12"
          >
            ← Research
          </Link>

          {/* Eyebrow */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-text-muted text-xs tracking-eyebrow uppercase">
              {formatDate(paper.date)}
            </span>
            <span className="text-rule">·</span>
            {paper.tags.map((tag) => (
              <span
                key={tag}
                className="text-text-muted text-xs border border-rule px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="text-text-primary font-light tracking-tight leading-[1.1] mb-4"
            style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
          >
            {paper.title}
          </h1>
          {paper.subtitle && (
            <p className="text-text-muted text-lg mb-10">{paper.subtitle}</p>
          )}

          {/* Authors */}
          <p className="text-text-muted text-sm">
            {paper.authors.join(", ")}
          </p>
        </div>
      </section>

      {/* Abstract */}
      <section className="px-6 pb-12">
        <div className="max-w-prose mx-auto">
          <div className="border border-rule bg-surface p-6">
            <p className="text-text-muted text-xs tracking-eyebrow uppercase mb-3">
              Abstract
            </p>
            <p className="text-text-body leading-relaxed text-sm">
              {paper.abstract}
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="px-6 pb-32">
        <div className="max-w-prose mx-auto space-y-6">
          {renderBody(paper.body)}
        </div>
      </article>

      <Footer />
    </main>
  );
}
