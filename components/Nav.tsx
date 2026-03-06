"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-canvas/90 backdrop-blur-md border-b border-rule"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-wide mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="text-text-primary text-sm font-medium tracking-snug hover:text-white transition-colors"
        >
          NSO
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8">
          <Link
            href="#thesis"
            className="text-text-muted text-sm hover:text-text-body transition-colors"
          >
            Thesis
          </Link>
          <Link
            href="#seam"
            className="text-text-muted text-sm hover:text-text-body transition-colors"
          >
            SEAM
          </Link>
          <Link
            href="/research"
            className="text-text-muted text-sm hover:text-text-body transition-colors"
          >
            Research
          </Link>
          <Link
            href="/contact"
            className="text-text-primary text-sm border border-rule px-4 py-1.5 hover:border-text-dim transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
