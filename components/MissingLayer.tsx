const pillars = [
  {
    label: "Map",
    description:
      "Represent complex knowledge systems as navigable structure, not flat text.",
  },
  {
    label: "Verify",
    description:
      "Trace reasoning across traditions, sources, and logical chains.",
  },
  {
    label: "Sequence",
    description:
      "Order human thought so attention moves toward depth, not drift.",
  },
] as const;

export default function MissingLayer() {
  return (
    <section
      id="thesis"
      className="px-6 py-32 border-t border-rule"
    >
      <div className="max-w-prose mx-auto flex flex-col gap-16">

        {/* Header */}
        <div className="flex flex-col gap-5">
          <span className="text-text-muted text-xs tracking-eyebrow uppercase">
            Epistemic Infrastructure
          </span>
          <h2
            className="text-text-primary font-light tracking-tight leading-[1.15]"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            The Missing Layer
            <br />
            of the Internet
          </h2>
          <p className="text-text-body text-lg leading-relaxed">
            The internet solved distribution. AI solved generation.
            <br className="hidden sm:block" />
            Neither solved orientation.
          </p>
        </div>

        {/* Divider */}
        <hr className="border-none border-t border-rule h-px bg-rule" />

        {/* Problem */}
        <div className="flex flex-col gap-4 text-text-body text-base leading-loose">
          <p>
            Every civilization in history has built structures to navigate
            knowledge: traditions, institutions, canons, lineages. These were
            humanity&apos;s epistemic infrastructure — the systems that gave
            information direction and weight.
          </p>
          <p>
            The internet dissolved those structures. AI accelerates the
            dissolution. Without a layer of the stack dedicated to epistemic
            coherence, we are building faster engines with no map.
          </p>
          <p>
            Information is now infinite. Meaning is not.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {pillars.map(({ label, description }) => (
            <div
              key={label}
              className="flex flex-col gap-3 pt-5 border-t border-rule"
            >
              <span className="text-text-primary text-xs font-medium tracking-eyebrow uppercase">
                {label}
              </span>
              <p className="text-text-muted text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-none border-t border-rule h-px bg-rule" />

        {/* Solution */}
        <div className="flex flex-col gap-5">
          <h3 className="text-text-primary text-lg font-medium tracking-snug">
            Why we start with wisdom traditions.
          </h3>
          <div className="flex flex-col gap-4 text-text-body text-base leading-loose">
            <p>
              Spiritual and philosophical traditions are among the most
              sophisticated knowledge systems humanity has ever produced. They
              encode centuries of structured reasoning about the hardest
              questions: what is true, what is good, how should a life be
              ordered.
            </p>
            <p>
              A system capable of navigating that terrain — with precision and
              without reduction — can ultimately map the architecture of human
              knowledge itself.
            </p>
            <p className="text-text-primary italic">
              That is the system we are building.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-8">
          <a
            href="#seam"
            className="text-text-muted text-sm border-b border-rule pb-0.5 hover:text-text-body hover:border-text-dim transition-colors"
          >
            Learn about SEAM →
          </a>
          <a
            href="/research"
            className="text-text-muted text-sm border-b border-rule pb-0.5 hover:text-text-body hover:border-text-dim transition-colors"
          >
            Read our research →
          </a>
        </div>

      </div>
    </section>
  );
}
