"use client";

import { useState, useCallback } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { base64Decode } from "@/lib/conversion-tools";

export function Base64DecodeClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<StatusBarInfo>({});

  const decode = useCallback((raw: string) => {
    if (!raw.trim()) {
      setOutput("");
      setStatus({});
      return;
    }
    const start = performance.now();
    const result = base64Decode(raw);
    const elapsed = performance.now() - start;

    if (result.error) {
      setOutput("");
      setStatus({ inputSize: new Blob([raw]).size, error: result.error });
    } else {
      const urlSafe = result.meta?.urlSafe as boolean;
      setOutput(result.output);
      setStatus({
        inputSize: new Blob([raw]).size,
        inputLines: 1,
        outputSize: new Blob([result.output]).size,
        outputLines: result.output.split("\n").length,
        processingTime: elapsed,
        detectedFormat: urlSafe ? "Base64 (URL-safe detected)" : "Base64",
      });
    }
  }, []);

  const handleInputChange = useCallback((v: string) => { setInput(v); decode(v); }, [decode]);
  const handleFileUpload = useCallback((c: string) => { setInput(c); decode(c); }, [decode]);

  return (
    <ToolLayout title="Base64 Decode" description="Decode Base64 to text" status={status}>
      <ToolPanel>
        <CodeEditor label="Input — Base64" value={input} onChange={handleInputChange} placeholder="Paste Base64 string here..." onFileUpload={handleFileUpload} filename="input.txt" />
      </ToolPanel>
      <ToolPanel>
        <CodeEditor label="Output — Text" value={output} readOnly placeholder="Decoded text will appear here..." filename="decoded.txt" />
      </ToolPanel>
    </ToolLayout>
  );
}
