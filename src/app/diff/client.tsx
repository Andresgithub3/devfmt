"use client";

import { useState, useCallback, useRef } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { computeDiff, type DiffMode } from "@/lib/backlog-tools";
import type { Change } from "diff";

export function DiffClient() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [mode, setMode] = useState<DiffMode>("lines");
  const [changes, setChanges] = useState<Change[]>([]);
  const [status, setStatus] = useState<StatusBarInfo>({});
  const leftRef = useRef("");
  const rightRef = useRef("");

  const compare = useCallback((l: string, r: string, m: DiffMode) => {
    if (!l && !r) { setChanges([]); setStatus({}); return; }
    const start = performance.now();
    const result = computeDiff(l, r, m);
    const elapsed = performance.now() - start;
    setChanges(result.changes);
    setStatus({
      processingTime: elapsed,
      detectedFormat: `${result.additions} additions, ${result.deletions} deletions`,
    });
  }, []);

  const handleLeft = useCallback((v: string) => { setLeft(v); leftRef.current = v; compare(v, rightRef.current, mode); }, [compare, mode]);
  const handleRight = useCallback((v: string) => { setRight(v); rightRef.current = v; compare(leftRef.current, v, mode); }, [compare, mode]);
  const handleMode = useCallback((m: DiffMode) => { setMode(m); compare(leftRef.current, rightRef.current, m); }, [compare]);

  const diffOutput = changes.map((c) => {
    if (c.added) return c.value.split("\n").map((l) => `+ ${l}`).join("\n");
    if (c.removed) return c.value.split("\n").map((l) => `- ${l}`).join("\n");
    return c.value.split("\n").map((l) => `  ${l}`).join("\n");
  }).join("\n");

  return (
    <ToolLayout
      title="Text Diff"
      description="Compare two texts"
      status={status}
      actions={
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-muted-foreground">Mode:</span>
          {(["lines", "words"] as const).map((m) => (
            <button key={m} onClick={() => handleMode(m)} className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {m}
            </button>
          ))}
        </div>
      }
    >
      <ToolPanel>
        <div className="flex flex-col h-full min-h-0">
          <div className="flex-1 min-h-0 border-b border-border">
            <CodeEditor label="Original" value={left} onChange={handleLeft} placeholder="Paste original text..." />
          </div>
          <div className="flex-1 min-h-0">
            <CodeEditor label="Modified" value={right} onChange={handleRight} placeholder="Paste modified text..." />
          </div>
        </div>
      </ToolPanel>
      <ToolPanel>
        <CodeEditor label="Diff Output" value={diffOutput} readOnly placeholder="Diff will appear here..." filename="diff.txt" />
      </ToolPanel>
    </ToolLayout>
  );
}
