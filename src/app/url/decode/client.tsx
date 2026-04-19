"use client";

import { useState, useCallback } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { urlDecode } from "@/lib/backlog-tools";

export function UrlDecodeClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<StatusBarInfo>({});

  const process = useCallback((raw: string) => {
    const start = performance.now();
    const result = urlDecode(raw);
    const elapsed = performance.now() - start;
    setOutput(result.output);
    if (result.error) { setStatus({ error: result.error }); }
    else if (raw.trim()) { setStatus({ inputSize: new Blob([raw]).size, outputSize: new Blob([result.output]).size, processingTime: elapsed, detectedFormat: "URL Decoded" }); }
    else { setStatus({}); }
  }, []);

  const handleChange = useCallback((v: string) => { setInput(v); process(v); }, [process]);

  return (
    <ToolLayout title="URL Decode" description="Decode percent-encoded strings" status={status}>
      <ToolPanel><CodeEditor label="Input — Encoded" value={input} onChange={handleChange} placeholder="Paste URL-encoded string..." /></ToolPanel>
      <ToolPanel><CodeEditor label="Output — Decoded" value={output} readOnly placeholder="Decoded output..." filename="decoded.txt" /></ToolPanel>
    </ToolLayout>
  );
}
