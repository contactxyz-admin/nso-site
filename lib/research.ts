import data from "@/content/research.json";

export interface Paper {
  slug: string;
  title: string;
  subtitle?: string;
  authors: string[];
  date: string; // ISO YYYY-MM-DD
  tags: string[];
  abstract: string;
  body: string; // ## h2, ### h3, **bold**, paragraphs separated by \n\n
}

export const papers: Paper[] = data as Paper[];

export function getPaper(slug: string): Paper | undefined {
  return papers.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
