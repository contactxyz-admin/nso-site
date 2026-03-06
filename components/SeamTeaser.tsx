export default function SeamTeaser() {
  return (
    <section
      id="seam"
      className="px-6 py-32 border-t border-rule"
    >
      <div className="max-w-prose mx-auto flex flex-col gap-12">

        {/* Label + headline */}
        <div className="flex flex-col gap-5">
          <span className="text-text-muted text-xs tracking-eyebrow uppercase">
            First Application
          </span>
          <h2
            className="text-text-primary font-light tracking-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            SEAM
          </h2>
          <p className="text-text-body text-lg leading-relaxed max-w-md">
            A structured environment for exploring faith, philosophy,
            and spiritual lineage.
          </p>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 text-text-body text-base leading-loose">
          <p>
            SEAM is built on NSO&apos;s epistemic engine. It gives a new
            generation the tools to navigate wisdom traditions with the rigor
            those traditions deserve — not as lifestyle content, but as
            coherent systems of thought.
          </p>
          <p>
            Users move through structured paths across theology, philosophy,
            and practice. The system maps connections, surfaces lineage, and
            sequences inquiry toward depth.
          </p>
          <p>
            SEAM is the proof of concept. The engine is the product.
          </p>
        </div>

        {/* Feature list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            ["Structured Inquiry", "Questions that deepen, not just answer."],
            ["Lineage Mapping", "Trace ideas across traditions and centuries."],
            ["Reasoning Verification", "Claims sourced, not asserted."],
            ["Navigable Depth", "Entry points for beginners, rigor for scholars."],
          ].map(([title, desc]) => (
            <div key={title} className="flex flex-col gap-1.5 pt-4 border-t border-rule">
              <span className="text-text-primary text-sm font-medium">{title}</span>
              <span className="text-text-muted text-sm leading-relaxed">{desc}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div>
          <a
            href="/seam"
            className="inline-flex items-center gap-2 text-text-primary text-sm border border-rule px-5 py-2.5 hover:border-text-dim transition-colors"
          >
            Explore SEAM
            <span className="text-text-muted">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
