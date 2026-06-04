"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Tool } from "@/lib/tools";
import { Search } from "lucide-react";

function detectFormat(text: string): string | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  // JWT: three dot-separated base64url segments
  if (/^eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(trimmed)) {
    return "/jwt/decode";
  }

  // JSON: starts with { or [
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      JSON.parse(trimmed);
      return "/json/formatter";
    } catch {
      // not valid JSON, continue
    }
  }

  // SQL keywords
  if (/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|WITH)\b/i.test(trimmed)) {
    return "/sql/formatter";
  }

  const lines = trimmed.split("\n");

  // YAML: key: value patterns across multiple lines
  if (lines.length > 1 && /^[\w][\w\s-]*:(\s|$)/m.test(trimmed) && !trimmed.startsWith("{")) {
    return "/yaml/to-json";
  }

  // CSV: consistent delimiters across multiple lines
  if (lines.length > 1) {
    const commaCount = (lines[0].match(/,/g) || []).length;
    const tabCount = (lines[0].match(/\t/g) || []).length;
    if (commaCount > 0 && lines.slice(0, 3).every((l) => (l.match(/,/g) || []).length === commaCount)) {
      return "/csv/formatter";
    }
    if (tabCount > 0 && lines.slice(0, 3).every((l) => (l.match(/\t/g) || []).length === tabCount)) {
      return "/csv/formatter";
    }
  }

  // Base64: long string of base64 characters
  if (/^[A-Za-z0-9+/\n\r]+=*$/.test(trimmed) && trimmed.length > 20) {
    return "/base64/decode";
  }

  return null;
}

interface HomeClientProps {
  tools: Tool[];
  categories: string[];
}

export function HomeClient({ tools, categories }: HomeClientProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus search on / key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Ctrl+V auto-detect: detect pasted format and navigate to tool
  useEffect(() => {
    function onPaste(e: ClipboardEvent) {
      if (document.activeElement === searchRef.current) return;
      const text = e.clipboardData?.getData("text/plain");
      if (!text?.trim()) return;
      const route = detectFormat(text);
      if (route) {
        try {
          sessionStorage.setItem("devfmt-paste", text);
        } catch {
          return; // sessionStorage unavailable
        }
        router.push(route);
      }
    }
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [router]);

  const filtered = useMemo(() => {
    let result = tools;
    if (activeCategory) {
      result = result.filter((t) => t.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.includes(q))
      );
    }
    return result;
  }, [tools, query, activeCategory]);

  const handleCategoryClick = useCallback(
    (cat: string) => {
      setActiveCategory((prev) => (prev === cat ? null : cat));
    },
    []
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-semibold text-primary tracking-tight">
              DevFmt
            </h1>
            <span className="text-sm text-muted-foreground">
              Format. Convert. Ship.
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1 max-w-lg">
            Developer data tools — fast, private, no signup. All processing
            happens in your browser.
          </p>

          {/* Search + filters */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search tools...  Press "/" to focus'
                className="w-full pl-9 pr-3 py-2 text-sm font-mono bg-muted border border-border rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 placeholder:text-muted-foreground/40"
              />
            </div>
            <div className="flex items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-mono transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-6">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground py-12 text-center">
              No tools match &ldquo;{query}&rdquo;
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group block p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-primary/70 bg-primary/10 px-1.5 py-0.5 rounded">
                      {tool.category}
                    </span>
                  </div>
                  <h2 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {tool.name}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {/* Value / intro content — for visitors and search engines */}
          <section className="mt-14 border-t border-border pt-8 max-w-3xl text-sm text-muted-foreground leading-relaxed space-y-4">
            <h2 className="text-base font-semibold text-foreground">
              Developer tools that respect your data and your time
            </h2>
            <p>
              DevFmt is a free collection of fast, privacy-first formatting and conversion
              tools for developers, data engineers, and anyone who works with structured data.
              Format and validate JSON, convert between JSON, CSV, and YAML, encode and decode
              Base64 and URLs, format SQL, decode JWTs, test regular expressions, generate hashes
              and UUIDs, and more — all from one clean, keyboard-friendly workspace.
            </p>

            <h3 className="text-sm font-semibold text-foreground pt-2">Everything runs in your browser</h3>
            <p>
              Unlike many online formatters, DevFmt never uploads your data. Every tool processes
              your input locally using JavaScript — there is no backend that receives, stores, or
              logs what you paste. That means you can safely format production API responses,
              configuration files, access tokens, and other sensitive data without it ever leaving
              your machine. You can verify this yourself in your browser&rsquo;s network tab.
            </p>

            <h3 className="text-sm font-semibold text-foreground pt-2">Built for speed</h3>
            <p>
              No sign-up, no paywalls, and no intrusive pop-ups. Tools load instantly and process
              input as you type. Paste detection routes your clipboard to the right tool
              automatically, and keyboard shortcuts keep your hands off the mouse.
            </p>

            <h3 className="text-sm font-semibold text-foreground pt-2">One toolkit, many formats</h3>
            <p>
              DevFmt covers the conversions and transformations developers reach for every day:
              JSON formatting and minification, JSON, CSV, and YAML conversion, Base64 and URL
              encoding, HTML entity escaping, Markdown and HTML conversion, SQL beautification,
              regex testing, hashing, UUID generation, timestamp conversion, color conversion, JWT
              decoding, and cron expression parsing. New tools are added regularly.
            </p>
            <p>
              Browse the full list above, or read our{" "}
              <Link href="/guides" className="text-primary hover:text-primary/80 transition-colors">
                developer guides
              </Link>{" "}
              to learn more about each format and when to use each tool.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground/60">
            Your data never leaves your browser. All formatting and conversion
            happens locally.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground/40">
            <Link href="/guides" className="hover:text-foreground transition-colors">Guides</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
