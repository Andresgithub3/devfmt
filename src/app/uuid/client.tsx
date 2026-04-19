"use client";

import { useState, useCallback } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { generateUuid, generateBulkUuids } from "@/lib/backlog-tools";

export function UuidClient() {
  const [output, setOutput] = useState("");
  const [count, setCount] = useState(1);
  const [status, setStatus] = useState<StatusBarInfo>({});

  const generate = useCallback((n: number) => {
    const start = performance.now();
    const result = n === 1 ? generateUuid() : generateBulkUuids(n);
    const elapsed = performance.now() - start;
    setOutput(result);
    setStatus({ outputSize: new Blob([result]).size, outputLines: n, processingTime: elapsed, detectedFormat: `UUID v4 (${n})` });
  }, []);

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate v4 UUIDs"
      status={status}
      actions={
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Count:</span>
          {[1, 5, 10, 50].map((n) => (
            <button key={n} onClick={() => { setCount(n); generate(n); }} className={`px-2 py-0.5 rounded font-mono transition-colors ${count === n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {n}
            </button>
          ))}
          <button onClick={() => generate(count)} className="px-2 py-0.5 rounded font-mono bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
            Generate
          </button>
        </div>
      }
    >
      <ToolPanel>
        <div className="flex items-center justify-center h-full text-muted-foreground/40 text-sm px-4 text-center">
          Click Generate or choose a count to create UUIDs
        </div>
      </ToolPanel>
      <ToolPanel>
        <CodeEditor label="Output — UUIDs" value={output} readOnly placeholder="UUIDs will appear here..." filename="uuids.txt" />
      </ToolPanel>
    </ToolLayout>
  );
}
