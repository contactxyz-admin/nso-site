import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Non-Stationary Objectives",
  description:
    "Applied AI research building epistemic infrastructure — systems that help humans navigate knowledge rather than drown in it.",
  openGraph: {
    title: "Non-Stationary Objectives",
    description:
      "Cognitive infrastructure oriented toward humanity's highest goods: Faith, Truth, and Love.",
    siteName: "NSO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Non-Stationary Objectives",
    description:
      "Cognitive infrastructure oriented toward humanity's highest goods: Faith, Truth, and Love.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
