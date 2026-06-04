import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Developer Guides",
  description:
    "In-depth guides on data formats, encoding, and developer tooling — JSON, YAML, CSV, Base64, JWTs, regular expressions, and more.",
  keywords: [
    "developer guides",
    "json guide",
    "data format guide",
    "base64 guide",
    "jwt guide",
    "regex guide",
  ],
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            DevFmt
          </Link>
          <span className="text-border">/</span>
          <h1 className="text-sm font-medium">Guides</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3 mb-8">
            <h2 className="text-lg font-semibold text-foreground">Developer Guides</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Practical, in-depth articles on the data formats and encodings developers
              work with every day. Each guide explains how something works, when to use it,
              and the pitfalls to avoid — paired with the DevFmt tools that put it to use.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group block p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-muted/50 transition-colors"
              >
                <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {guide.description}
                </p>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/50 mt-2 inline-block">
                  {guide.readingTime}
                </span>
              </Link>
            ))}
          </div>

          <div className="pt-8">
            <Link
              href="/"
              className="text-primary hover:text-primary/80 text-sm transition-colors"
            >
              &larr; Back to tools
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
