import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "DevFmt privacy policy — your data never leaves your browser.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
            DevFmt
          </Link>
          <span className="text-border">/</span>
          <h1 className="text-sm font-medium">Privacy Policy</h1>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-2xl mx-auto space-y-6 text-sm text-muted-foreground leading-relaxed">
          <h2 className="text-lg font-semibold text-foreground">Privacy Policy</h2>
          <p className="text-xs text-muted-foreground">Last updated: April 2026</p>

          <h3 className="text-sm font-semibold text-foreground pt-2">Your data stays in your browser</h3>
          <p>
            DevFmt processes all data entirely in your web browser using client-side JavaScript.
            When you paste text into any tool, it is parsed, formatted, or converted locally on
            your machine. <strong className="text-foreground">No input data is ever sent to our servers, stored in any
            database, or logged in any form.</strong>
          </p>
          <p>
            This is not a policy decision — it's an architectural one. DevFmt has no backend API
            for data processing. The tools are static pages served by a CDN. There is no server
            capable of receiving your data, even if we wanted to.
          </p>

          <h3 className="text-sm font-semibold text-foreground pt-2">What we do collect</h3>
          <p>We use the following third-party services that collect anonymous, aggregated data:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-foreground">Google Analytics (GA4)</strong> — collects anonymous page view data,
              session duration, and general geographic region. No personally identifiable information
              is collected. We use this to understand which tools are popular and how to improve the site.
            </li>
            <li>
              <strong className="text-foreground">Google AdSense</strong> — may display ads and use cookies for
              ad personalization. You can opt out of personalized ads through Google's ad settings.
            </li>
          </ul>

          <h3 className="text-sm font-semibold text-foreground pt-2">Cookies</h3>
          <p>
            DevFmt itself does not set any cookies. Google Analytics and AdSense may set cookies
            for analytics and ad personalization. You can control cookie behavior through your
            browser settings.
          </p>

          <h3 className="text-sm font-semibold text-foreground pt-2">No accounts or personal data</h3>
          <p>
            DevFmt does not require signup, login, or any personal information. We don't collect
            email addresses, names, or any form of PII. There is nothing to delete because we
            never store anything in the first place.
          </p>

          <h3 className="text-sm font-semibold text-foreground pt-2">How to verify</h3>
          <p>
            Open your browser's developer tools (F12), go to the Network tab, and use any tool.
            You'll see that no requests are made with your input data. The only network requests
            are for page assets (HTML, CSS, JS) and analytics/ad scripts.
          </p>

          <h3 className="text-sm font-semibold text-foreground pt-2">Contact</h3>
          <p>
            Questions about this policy? Reach out via the contact information on our About page.
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
