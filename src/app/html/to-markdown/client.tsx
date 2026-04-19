"use client";

import { useState, useCallback } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { htmlToMarkdown } from "@/lib/backlog-tools";

export function HtmlToMarkdownClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<StatusBarInfo>({});

  const process = useCallback((raw: string) => {
    const start = performance.now();
    const result = htmlToMarkdown(raw);
    const elapsed = performance.now() - start;
    setOutput(result.output);
    if (result.error) { setStatus({ error: result.error }); }
    else if (raw.trim()) { setStatus({ inputSize: new Blob([raw]).size, outputSize: new Blob([result.output]).size, processingTime: elapsed, detectedFormat: "HTML → Markdown" }); }
    else { setStatus({}); }
  }, []);

  const handleChange = useCallback((v: string) => { setInput(v); process(v); }, [process]);

  return (
    <ToolLayout title="HTML to Markdown" description="Convert HTML to Markdown" status={status}>
      <ToolPanel><CodeEditor label="Input — HTML" value={input} onChange={handleChange} placeholder="Paste HTML here..." onFileUpload={(c) => { setInput(c); process(c); }} filename="input.html" /></ToolPanel>
      <ToolPanel><CodeEditor label="Output — Markdown" value={output} readOnly placeholder="Markdown output..." filename="output.md" /></ToolPanel>
    </ToolLayout>
  );
}
