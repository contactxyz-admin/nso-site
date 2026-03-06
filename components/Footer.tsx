export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 py-16 border-t border-rule">
      <div className="max-w-wide mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

        {/* Left */}
        <div className="flex flex-col gap-2">
          <span className="text-text-primary text-sm font-medium">NSO</span>
          <span className="text-text-muted text-xs">
            Non-Stationary Objectives
          </span>
        </div>

        {/* Center — tagline */}
        <p className="text-text-muted text-xs tracking-eyebrow uppercase hidden sm:block">
          Faith · Truth · Love
        </p>

        {/* Right */}
        <div className="flex items-center gap-6">
          <a href="/research" className="text-text-muted text-xs hover:text-text-body transition-colors">
            Research
          </a>
          <a href="/seam" className="text-text-muted text-xs hover:text-text-body transition-colors">
            SEAM
          </a>
          <a href="/contact" className="text-text-muted text-xs hover:text-text-body transition-colors">
            Contact
          </a>
          <span className="text-text-dim text-xs">© {year}</span>
        </div>

      </div>
    </footer>
  );
}
