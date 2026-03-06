export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-end pb-24 px-6 pt-32">
      <div className="max-w-wide mx-auto w-full">
        {/* Label */}
        <p className="text-text-muted text-xs tracking-eyebrow uppercase mb-10">
          Applied AI Research
        </p>

        {/* Headline */}
        <h1 className="text-text-primary font-light tracking-tight leading-[1.1] mb-10"
          style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
        >
          Cognitive infrastructure
          <br />
          for humanity's
          <br />
          <span className="text-text-body">highest goods.</span>
        </h1>

        {/* Subline */}
        <p className="text-text-body text-lg leading-relaxed max-w-prose mb-16">
          Non-Stationary Objectives builds epistemic systems — architectures
          that navigate knowledge rather than generate noise.
        </p>

        {/* Divider with scroll cue */}
        <div className="flex items-center gap-6">
          <div className="h-px w-12 bg-rule" />
          <span className="text-text-muted text-xs tracking-eyebrow uppercase">
            Faith · Truth · Love
          </span>
        </div>
      </div>
    </section>
  );
}
