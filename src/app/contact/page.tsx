import type { Metadata } from "next";
import Link from "next/link";

const CONTACT_EMAIL = "hello@devfmt.com";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with DevFmt — report a bug, request a tool, or send feedback.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
            DevFmt
          </Link>
          <span className="text-border">/</span>
          <h1 className="text-sm font-medium">Contact</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-2xl mx-auto space-y-6 text-sm text-muted-foreground leading-relaxed">
          <h2 className="text-lg font-semibold text-foreground">Contact DevFmt</h2>

          <p>
            DevFmt is built and maintained by an independent developer. We read every message and
            genuinely value your input — whether it&rsquo;s a bug report, a feature idea, or a
            request for a tool that isn&rsquo;t here yet.
          </p>

          <h3 className="text-sm font-semibold text-foreground pt-2">Email</h3>
          <p>
            The best way to reach us is by email at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
            . We aim to respond within a few business days.
          </p>

          <h3 className="text-sm font-semibold text-foreground pt-2">What to include</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="text-foreground">Bug reports:</span> the tool you were using, what you
              expected, and what happened instead. A sample of the input that triggered the problem
              helps a lot.
            </li>
            <li>
              <span className="text-foreground">Tool requests:</span> the format or conversion you
              need and how you&rsquo;d use it. Popular requests get prioritized.
            </li>
            <li>
              <span className="text-foreground">Feedback:</span> anything that would make DevFmt
              faster, clearer, or more useful for your workflow.
            </li>
          </ul>

          <h3 className="text-sm font-semibold text-foreground pt-2">A note on privacy</h3>
          <p>
            Because every DevFmt tool runs entirely in your browser, we never see the data you
            format or convert. If you&rsquo;re reporting a bug, please don&rsquo;t send real
            sensitive data — a small, anonymized example that reproduces the issue is perfect.
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
