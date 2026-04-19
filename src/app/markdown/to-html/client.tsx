"use client";

import { useState, useCallback } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { markdownToHtml } from "@/lib/backlog-tools";

export function MarkdownToHtmlClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<StatusBarInfo>({});

  const process = useCallback((raw: string) => {
    const start = performance.now();
    const result = markdownToHtml(raw);
    const elapsed = performance.now() - start;
    setOutput(result.output);
    if (result.error) { setStatus({ error: result.error }); }
    else if (raw.trim()) { setStatus({ inputSize: new Blob([raw]).size, outputSize: new Blob([result.output]).size, outputLines: result.output.split("\n").length, processingTime: elapsed, detectedFormat: "Markdown → HTML" }); }
    else { setStatus({}); }
  }, []);

  const handleChange = useCallback((v: string) => { setInput(v); process(v); }, [process]);

  return (
    <ToolLayout title="Markdown to HTML" description="Convert Markdown to HTML" status={status}>
      <ToolPanel><CodeEditor label="Input — Markdown" value={input} onChange={handleChange} placeholder="# Paste Markdown here..." onFileUpload={(c) => { setInput(c); process(c); }} filename="input.md" /></ToolPanel>
      <ToolPanel><CodeEditor label="Output — HTML" value={output} readOnly placeholder="HTML output..." filename="output.html" /></ToolPanel>
    </ToolLayout>
  );
}
