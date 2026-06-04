import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "DevFmt terms of use — free developer data tools with no warranty.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
            DevFmt
          </Link>
          <span className="text-border">/</span>
          <h1 className="text-sm font-medium">Terms of Use</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-2xl mx-auto space-y-6 text-sm text-muted-foreground leading-relaxed">
          <h2 className="text-lg font-semibold text-foreground">Terms of Use</h2>
          <p className="text-xs text-muted-foreground">Last updated: June 2026</p>

          <h3 className="text-sm font-semibold text-foreground pt-2">Acceptance</h3>
          <p>
            By using DevFmt (<Link href="/" className="text-primary hover:text-primary/80 transition-colors">devfmt.com</Link>),
            you agree to these terms. If you do not agree, do not use the site.
          </p>

          <h3 className="text-sm font-semibold text-foreground pt-2">What DevFmt provides</h3>
          <p>
            DevFmt is a collection of free, browser-based developer data tools including formatters,
            converters, and encoders. All processing happens locally in your browser. No account or
            signup is required.
          </p>

          <h3 className="text-sm font-semibold text-foreground pt-2">No warranty</h3>
          <p>
            DevFmt is provided <strong className="text-foreground">&ldquo;as is&rdquo; without warranty of any kind</strong>,
            express or implied. We do not guarantee that the tools will be error-free, uninterrupted,
            or that output will be accurate for every input. You are responsible for verifying any
            output before using it in production systems.
          </p>

          <h3 className="text-sm font-semibold text-foreground pt-2">Limitation of liability</h3>
          <p>
            To the fullest extent permitted by law, DevFmt and its operators shall not be liable for
            any damages arising from the use of, or inability to use, the tools — including but not
            limited to data loss, incorrect output, or system downtime.
          </p>

          <h3 className="text-sm font-semibold text-foreground pt-2">Acceptable use</h3>
          <p>
            You may use DevFmt for any lawful purpose. You agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Interfere with the site's operation or availability</li>
            <li>Attempt to access systems or data beyond what is publicly available</li>
            <li>Use automated tools to scrape the site at a rate that degrades service for others</li>
          </ul>

          <h3 className="text-sm font-semibold text-foreground pt-2">Intellectual property</h3>
          <p>
            The DevFmt name, design, and code are the property of their respective owners. The tools
            are free to use but the site itself may not be copied or redistributed in its entirety.
          </p>

          <h3 className="text-sm font-semibold text-foreground pt-2">Third-party services</h3>
          <p>
            DevFmt uses Google Analytics and Google AdSense. Your interaction with these services is
            governed by their respective terms and privacy policies. See our{" "}
            <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">Privacy Policy</Link>{" "}
            for details.
          </p>

          <h3 className="text-sm font-semibold text-foreground pt-2">Changes to these terms</h3>
          <p>
            We may update these terms at any time. Continued use of DevFmt after changes constitutes
            acceptance of the revised terms. The &ldquo;last updated&rdquo; date at the top reflects
            the most recent revision.
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
