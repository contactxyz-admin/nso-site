"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Paper } from "@/lib/research";

interface Props {
  paper: Paper | null;
  isNew: boolean;
}

export default function ArticleEditor({ paper, isNew }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<Partial<Paper>>({
    slug: paper?.slug ?? "",
    title: paper?.title ?? "",
    subtitle: paper?.subtitle ?? "",
    authors: paper?.authors ?? ["Non-Stationary Objectives"],
    date: paper?.date ?? new Date().toISOString().slice(0, 10),
    tags: paper?.tags ?? [],
    abstract: paper?.abstract ?? "",
    body: paper?.body ?? "",
  });

  function set(field: keyof Paper, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const apiKey = process.env.NEXT_PUBLIC_ARTICLES_API_KEY;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const payload = {
      ...form,
      authors: typeof form.authors === "string"
        ? (form.authors as string).split(",").map((s) => s.trim())
        : form.authors,
      tags: typeof form.tags === "string"
        ? (form.tags as unknown as string).split(",").map((s) => s.trim()).filter(Boolean)
        : form.tags,
    };

    const res = isNew
      ? await fetch("/api/articles", { method: "POST", headers, body: JSON.stringify(payload) })
      : await fetch(`/api/articles/${paper!.slug}`, { method: "PUT", headers, body: JSON.stringify(payload) });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong.");
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${paper?.title}"? This cannot be undone.`)) return;
    setDeleting(true);

    const apiKey = process.env.NEXT_PUBLIC_ARTICLES_API_KEY;
    const res = await fetch(`/api/articles/${paper!.slug}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Delete failed.");
      setDeleting(false);
    }
  }

  return (
    <main className="bg-canvas min-h-screen px-6 py-16">
      <div className="max-w-prose mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link
              href="/admin"
              className="text-text-muted text-xs tracking-eyebrow uppercase hover:text-text-body transition-colors"
            >
              ← Articles
            </Link>
            <h1 className="text-text-primary font-light tracking-tight text-2xl mt-3">
              {isNew ? "New article" : "Edit article"}
            </h1>
          </div>
          {!isNew && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-500 text-xs hover:text-red-400 transition-colors disabled:opacity-40"
            >
              {deleting ? "Deleting…" : "Delete"}
            </button>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-6">

          {/* Title */}
          <Field label="Title" required>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              required
              className={input}
              placeholder="The title of the article"
            />
          </Field>

          {/* Subtitle */}
          <Field label="Subtitle">
            <input
              value={form.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
              className={input}
              placeholder="Optional subtitle"
            />
          </Field>

          {/* Slug */}
          <Field label="Slug" hint={isNew ? "Auto-generated from title if left blank" : "Cannot be changed after creation"}>
            <input
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              className={input}
              placeholder="my-article-slug"
              disabled={!isNew}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <Field label="Date" required>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                required
                className={input}
              />
            </Field>

            {/* Authors */}
            <Field label="Authors" hint="Comma-separated">
              <input
                value={Array.isArray(form.authors) ? form.authors.join(", ") : form.authors}
                onChange={(e) => set("authors", e.target.value)}
                className={input}
                placeholder="Author One, Author Two"
              />
            </Field>
          </div>

          {/* Tags */}
          <Field label="Tags" hint="Comma-separated">
            <input
              value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags}
              onChange={(e) => set("tags", e.target.value)}
              className={input}
              placeholder="alignment, epistemology, AI systems"
            />
          </Field>

          {/* Abstract */}
          <Field label="Abstract" required>
            <textarea
              value={form.abstract}
              onChange={(e) => set("abstract", e.target.value)}
              required
              rows={4}
              className={`${input} resize-y`}
              placeholder="A short summary shown on the research index and in metadata."
            />
          </Field>

          {/* Body */}
          <Field
            label="Body"
            required
            hint="## Heading 2 · ### Heading 3 · **bold** · blank line = new paragraph"
          >
            <textarea
              value={form.body}
              onChange={(e) => set("body", e.target.value)}
              required
              rows={24}
              className={`${input} resize-y font-mono text-xs leading-relaxed`}
              placeholder={"## Introduction\n\nYour first paragraph goes here.\n\n## Section two\n\nAnother paragraph."}
            />
          </Field>

          {error && (
            <p className="text-red-400 text-xs">{error}</p>
          )}

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="text-text-primary text-sm border border-rule px-6 py-2.5 hover:border-text-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? "Saving…" : isNew ? "Publish article" : "Save changes"}
            </button>
            <Link
              href="/admin"
              className="text-text-muted text-sm hover:text-text-body transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline gap-2">
        <label className="text-text-muted text-xs tracking-eyebrow uppercase">
          {label}
          {required && <span className="text-text-dim ml-1">*</span>}
        </label>
        {hint && <span className="text-text-dim text-xs">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

const input =
  "w-full bg-surface border border-rule text-text-primary text-sm px-4 py-3 placeholder:text-text-dim focus:outline-none focus:border-text-muted transition-colors";
