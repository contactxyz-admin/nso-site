const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const OWNER = process.env.GITHUB_OWNER ?? "contactxyz-admin";
const REPO = process.env.GITHUB_REPO ?? "nso-site";
const BASE = `https://api.github.com/repos/${OWNER}/${REPO}/contents`;

interface GitHubFile<T> {
  content: T;
  sha: string;
}

export async function readJSON<T>(path: string): Promise<GitHubFile<T>> {
  const res = await fetch(`${BASE}/${path}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GitHub read failed: ${res.status}`);
  const data = await res.json();
  const decoded = Buffer.from(data.content, "base64").toString("utf8");
  return { content: JSON.parse(decoded), sha: data.sha };
}

export async function writeJSON<T>(
  path: string,
  content: T,
  sha: string,
  message: string
): Promise<void> {
  const encoded = Buffer.from(JSON.stringify(content, null, 2)).toString("base64");
  const res = await fetch(`${BASE}/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
    },
    body: JSON.stringify({ message, content: encoded, sha }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub write failed: ${res.status} ${err}`);
  }
}
