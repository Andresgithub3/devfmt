"use client";

import { useState, useCallback, useEffect } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { timestampToDate, dateToTimestamp } from "@/lib/backlog-tools";

type Mode = "ts-to-date" | "date-to-ts";

export function TimestampClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("ts-to-date");
  const [now, setNow] = useState("");
  const [status, setStatus] = useState<StatusBarInfo>({});

  useEffect(() => {
    const tick = () => setNow(Math.floor(Date.now() / 1000).toString());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const process = useCallback((raw: string, m: Mode) => {
    const start = performance.now();
    const result = m === "ts-to-date" ? timestampToDate(raw) : dateToTimestamp(raw);
    const elapsed = performance.now() - start;
    setOutput(result.output);
    if (result.error) { setStatus({ error: result.error }); }
    else if (raw.trim()) { setStatus({ processingTime: elapsed, detectedFormat: m === "ts-to-date" ? "Timestamp → Date" : "Date → Timestamp" }); }
    else { setStatus({}); }
  }, []);

  const handleChange = useCallback((v: string) => { setInput(v); process(v, mode); }, [process, mode]);
  const handleMode = useCallback((m: Mode) => { setMode(m); process(input, m); }, [process, input]);

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Unix timestamp ↔ Date"
      status={status}
      actions={
        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono text-muted-foreground">Now: {now}</span>
          <button onClick={() => { setInput(now); process(now, "ts-to-date"); setMode("ts-to-date"); }} className="px-2 py-0.5 rounded font-mono bg-muted text-muted-foreground hover:text-foreground transition-colors">
            Use Now
          </button>
          {([["ts-to-date", "TS→Date"], ["date-to-ts", "Date→TS"]] as const).map(([m, label]) => (
            <button key={m} onClick={() => handleMode(m)} className={`px-2 py-0.5 rounded font-mono transition-colors ${mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {label}
            </button>
          ))}
        </div>
      }
    >
      <ToolPanel>
        <CodeEditor label={mode === "ts-to-date" ? "Input — Timestamp" : "Input — Date String"} value={input} onChange={handleChange} placeholder={mode === "ts-to-date" ? "Enter Unix timestamp (seconds or ms)..." : "Enter date string (ISO 8601, etc.)..."} />
      </ToolPanel>
      <ToolPanel>
        <CodeEditor label="Output" value={output} readOnly placeholder="Converted output..." filename="timestamp.txt" />
      </ToolPanel>
    </ToolLayout>
  );
}
