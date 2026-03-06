import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0a0a0a",
        surface: "#111111",
        rule: "#1e1e1e",
        "text-primary": "#f0ede8",
        "text-body": "#b0ada8",
        "text-muted": "#6b6b6b",
        "text-dim": "#3a3a3a",
      },
      fontFamily: {
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.12em",
        tight: "-0.02em",
        snug: "-0.01em",
      },
      maxWidth: {
        prose: "680px",
        wide: "1080px",
      },
    },
  },
  plugins: [],
};

export default config;
