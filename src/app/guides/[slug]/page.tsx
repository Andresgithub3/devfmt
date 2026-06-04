import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GUIDES, getGuideBySlug } from "@/lib/guides";
import { getToolByHref } from "@/lib/tools";

const SITE_URL = "https://devfmt.com";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: `${SITE_URL}/guides/${guide.slug}` },
  };
}

// Renders inline **bold** segments within a paragraph string.
function renderText(text: string) {
  return text.split("**").map((segment, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-foreground font-medium">
        {segment}
      </strong>
    ) : (
      segment
    )
  );
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: guide.title,
    description: guide.description,
    url: `${SITE_URL}/guides/${guide.slug}`,
    author: { "@type": "Organization", name: "DevFmt" },
    publisher: { "@type": "Organization", name: "DevFmt" },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <header className="border-b border-border px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            DevFmt
          </Link>
          <span className="text-border">/</span>
          <Link
            href="/guides"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Guides
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            {guide.title}
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground/50 mt-2">
            {guide.readingTime}
          </p>

          <div className="mt-6 space-y-4">
            {guide.intro.map((para, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                {renderText(para)}
              </p>
            ))}
          </div>

          {guide.sections.map((section, i) => (
            <section key={i} className="mt-8">
              <h2 className="text-base font-semibold text-foreground mb-3">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.body.map((para, j) => (
                  <p key={j} className="text-sm text-muted-foreground leading-relaxed">
                    {renderText(para)}
                  </p>
                ))}
              </div>
            </section>
          ))}

          {guide.related.length > 0 && (
            <div className="mt-10 border-t border-border pt-6">
              <h2 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">
                Try the tools
              </h2>
              <div className="flex flex-wrap gap-2">
                {guide.related.map((href) => {
                  const tool = getToolByHref(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="text-xs text-primary hover:text-primary/80 bg-primary/10 px-2.5 py-1.5 rounded transition-colors"
                    >
                      {tool ? tool.name : href}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center gap-4">
            <Link
              href="/guides"
              className="text-primary hover:text-primary/80 text-sm transition-colors"
            >
              &larr; All guides
            </Link>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Back to tools
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
