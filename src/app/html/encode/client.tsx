"use client";

import { useState, useCallback } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { htmlEncode } from "@/lib/backlog-tools";

export function HtmlEncodeClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<StatusBarInfo>({});

  const process = useCallback((raw: string) => {
    const start = performance.now();
    const result = htmlEncode(raw);
    const elapsed = performance.now() - start;
    setOutput(result.output);
    if (raw) { setStatus({ inputSize: new Blob([raw]).size, outputSize: new Blob([result.output]).size, processingTime: elapsed, detectedFormat: "HTML Entities" }); }
    else { setStatus({}); }
  }, []);

  const handleChange = useCallback((v: string) => { setInput(v); process(v); }, [process]);

  return (
    <ToolLayout title="HTML Encode" description="Escape special characters" status={status}>
      <ToolPanel><CodeEditor label="Input — Text" value={input} onChange={handleChange} placeholder='Paste text with <html> & "special" chars...' /></ToolPanel>
      <ToolPanel><CodeEditor label="Output — Encoded" value={output} readOnly placeholder="HTML-encoded output..." filename="encoded.html" /></ToolPanel>
    </ToolLayout>
  );
}
