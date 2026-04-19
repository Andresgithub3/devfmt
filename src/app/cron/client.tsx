"use client";

import { useState, useCallback } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { parseCron } from "@/lib/backlog-tools";

const EXAMPLES = [
  { expr: "* * * * *", label: "Every minute" },
  { expr: "0 * * * *", label: "Every hour" },
  { expr: "0 0 * * *", label: "Daily midnight" },
  { expr: "0 9 * * 1-5", label: "Weekdays 9am" },
  { expr: "*/5 * * * *", label: "Every 5 min" },
  { expr: "0 0 1 * *", label: "Monthly" },
];

export function CronClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<StatusBarInfo>({});

  const process = useCallback((raw: string) => {
    const start = performance.now();
    const result = parseCron(raw);
    const elapsed = performance.now() - start;
    setOutput(result.output);
    if (result.error) { setStatus({ error: result.error }); }
    else if (raw.trim()) { setStatus({ processingTime: elapsed, detectedFormat: "Cron" }); }
    else { setStatus({}); }
  }, []);

  const handleChange = useCallback((v: string) => { setInput(v); process(v); }, [process]);

  return (
    <ToolLayout
      title="Cron Parser"
      description="Explain cron expressions"
      status={status}
      actions={
        <div className="flex items-center gap-1.5 text-xs flex-wrap">
          {EXAMPLES.map((ex) => (
            <button key={ex.expr} onClick={() => { setInput(ex.expr); process(ex.expr); }} className="px-2 py-0.5 rounded font-mono bg-muted text-muted-foreground hover:text-foreground transition-colors" title={ex.label}>
              {ex.expr}
            </button>
          ))}
        </div>
      }
    >
      <ToolPanel>
        <CodeEditor label="Input — Cron Expression" value={input} onChange={handleChange} placeholder="Enter cron expression, e.g. */5 * * * *" />
      </ToolPanel>
      <ToolPanel>
        <CodeEditor label="Output — Description" value={output} readOnly placeholder="Human-readable description..." filename="cron.txt" />
      </ToolPanel>
    </ToolLayout>
  );
}
