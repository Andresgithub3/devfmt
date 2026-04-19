"use client";

import { useState, useCallback } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { htmlDecode } from "@/lib/backlog-tools";

export function HtmlDecodeClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<StatusBarInfo>({});

  const process = useCallback((raw: string) => {
    const start = performance.now();
    const result = htmlDecode(raw);
    const elapsed = performance.now() - start;
    setOutput(result.output);
    if (result.error) { setStatus({ error: result.error }); }
    else if (raw.trim()) { setStatus({ inputSize: new Blob([raw]).size, outputSize: new Blob([result.output]).size, processingTime: elapsed, detectedFormat: "HTML Decoded" }); }
    else { setStatus({}); }
  }, []);

  const handleChange = useCallback((v: string) => { setInput(v); process(v); }, [process]);

  return (
    <ToolLayout title="HTML Decode" description="Decode HTML entities to text" status={status}>
      <ToolPanel><CodeEditor label="Input — Encoded" value={input} onChange={handleChange} placeholder="Paste HTML entities like &amp;lt;div&amp;gt;..." /></ToolPanel>
      <ToolPanel><CodeEditor label="Output — Decoded" value={output} readOnly placeholder="Decoded text..." filename="decoded.txt" /></ToolPanel>
    </ToolLayout>
  );
}
