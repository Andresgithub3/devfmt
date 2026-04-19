"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import type { Tool } from "@/lib/tools";
import { Search } from "lucide-react";

interface HomeClientProps {
  tools: Tool[];
  categories: string[];
}

export function HomeClient({ tools, categories }: HomeClientProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

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
        </div>
      </main>

      <footer className="border-t border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground/60">
            Your data never leaves your browser. All formatting and conversion
            happens locally.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground/40">
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
