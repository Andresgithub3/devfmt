"use client";

import { useState } from "react";
import Link from "next/link";
import type { Tool } from "@/lib/tools";
import { ChevronDown, ChevronUp } from "lucide-react";

export function ToolSeoContent({ tool }: { tool: Tool }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-t border-border bg-muted/20">
      {/* Collapsed toggle for desktop, always visible on mobile */}
      <div className="max-w-4xl mx-auto px-4 py-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? "Hide" : "About this tool"}
        </button>

        {/* Content: always visible on mobile, toggle on desktop */}
        <div className={`mt-3 lg:${expanded ? "block" : "hidden"}`}>
          {/* How to use */}
          <div className="prose prose-sm prose-invert max-w-none">
            <h2 className="text-sm font-semibold text-foreground mb-2">
              How to use {tool.name}
            </h2>
            {tool.content.split("\n\n").map((p, i) => (
              <p key={i} className="text-xs text-muted-foreground leading-relaxed mb-2">
                {p.split("**").map((segment, j) =>
                  j % 2 === 1 ? (
                    <strong key={j} className="text-foreground font-medium">{segment}</strong>
                  ) : (
                    segment
                  )
                )}
              </p>
            ))}
          </div>

          {/* FAQ */}
          {tool.faq.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">
                FAQ
              </h3>
              <dl className="space-y-3">
                {tool.faq.map((item, i) => (
                  <div key={i}>
                    <dt className="text-xs font-medium text-foreground">{item.q}</dt>
                    <dd className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Related tools */}
          {tool.relatedTools.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">
                Related tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.relatedTools.map((href) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-xs text-primary hover:text-primary/80 bg-primary/10 px-2 py-1 rounded transition-colors"
                  >
                    {href}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
