"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  }

  return (
    <main className="bg-canvas min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-text-muted text-xs tracking-eyebrow uppercase mb-8">
          NSO Admin
        </p>
        <h1 className="text-text-primary font-light tracking-tight text-2xl mb-10">
          Sign in
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface border border-rule text-text-primary text-sm px-4 py-3 placeholder:text-text-dim focus:outline-none focus:border-text-muted transition-colors"
            autoFocus
          />

          {error && (
            <p className="text-red-400 text-xs">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full border border-rule text-text-primary text-sm px-4 py-3 hover:border-text-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
