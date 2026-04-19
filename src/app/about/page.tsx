import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About DevFmt — fast, private developer data tools.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
            DevFmt
          </Link>
          <span className="text-border">/</span>
          <h1 className="text-sm font-medium">About</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-2xl mx-auto space-y-6 text-sm text-muted-foreground leading-relaxed">
          <h2 className="text-lg font-semibold text-foreground">About DevFmt</h2>

          <p>
            DevFmt is a collection of developer data tools — formatters, converters, and encoders
            built for speed and privacy. No accounts, no uploads, no tracking beyond anonymous analytics.
          </p>

          <h3 className="text-sm font-semibold text-foreground pt-2">How it works</h3>
          <p>
            Every tool on DevFmt runs entirely in your browser. When you paste JSON, CSV, SQL, or
            any other data into a tool, it's processed locally using JavaScript. Nothing is sent to
            a server. Nothing is stored. Nothing is logged.
          </p>
          <p>
            This isn't just a privacy claim — it's an architectural decision. The site has no
            backend API for data processing. The tools are static pages with client-side logic.
            You can verify this by checking the network tab in your browser's developer tools.
          </p>

          <h3 className="text-sm font-semibold text-foreground pt-2">Why this exists</h3>
          <p>
            Developers need formatting and conversion tools daily. Most existing options are slow,
            cluttered with ads, or send your data to a server. DevFmt is the tool we wanted to exist:
            fast, clean, private, and keyboard-friendly.
          </p>

          <h3 className="text-sm font-semibold text-foreground pt-2">Tech stack</h3>
          <p>
            Built with Next.js, TypeScript, and Tailwind CSS. Hosted on Vercel. Open to feedback
            and tool requests.
          </p>

          <div className="pt-4">
            <Link href="/" className="text-primary hover:text-primary/80 text-sm transition-colors">
              &larr; Back to tools
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
