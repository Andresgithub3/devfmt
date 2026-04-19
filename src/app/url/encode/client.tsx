"use client";

import { useState, useCallback } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { urlEncode } from "@/lib/backlog-tools";

export function UrlEncodeClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<StatusBarInfo>({});

  const process = useCallback((raw: string) => {
    const start = performance.now();
    const result = urlEncode(raw);
    const elapsed = performance.now() - start;
    setOutput(result.output);
    if (result.error) { setStatus({ error: result.error }); }
    else if (raw) { setStatus({ inputSize: new Blob([raw]).size, outputSize: new Blob([result.output]).size, processingTime: elapsed, detectedFormat: "URL Encoded" }); }
    else { setStatus({}); }
  }, []);

  const handleChange = useCallback((v: string) => { setInput(v); process(v); }, [process]);

  return (
    <ToolLayout title="URL Encode" description="Percent-encode text for URLs" status={status}>
      <ToolPanel><CodeEditor label="Input — Text" value={input} onChange={handleChange} placeholder="Paste text to encode..." /></ToolPanel>
      <ToolPanel><CodeEditor label="Output — Encoded" value={output} readOnly placeholder="Encoded output..." filename="encoded.txt" /></ToolPanel>
    </ToolLayout>
  );
}
