"use client";

import { useState, useCallback, useRef } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { base64Encode } from "@/lib/conversion-tools";

export function Base64EncodeClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);
  const [status, setStatus] = useState<StatusBarInfo>({});
  const lastInputRef = useRef("");

  const encode = useCallback((raw: string, safe: boolean) => {
    if (!raw) {
      setOutput("");
      setStatus({});
      return;
    }
    const start = performance.now();
    const result = base64Encode(raw, safe);
    const elapsed = performance.now() - start;

    if (result.error) {
      setOutput("");
      setStatus({ inputSize: new Blob([raw]).size, error: result.error });
    } else {
      setOutput(result.output);
      setStatus({
        inputSize: new Blob([raw]).size,
        inputLines: raw.split("\n").length,
        outputSize: new Blob([result.output]).size,
        outputLines: 1,
        processingTime: elapsed,
        detectedFormat: safe ? "Base64 (URL-safe)" : "Base64",
      });
    }
  }, []);

  const handleInputChange = useCallback((v: string) => { setInput(v); lastInputRef.current = v; encode(v, urlSafe); }, [encode, urlSafe]);
  const handleFileUpload = useCallback((c: string) => { setInput(c); lastInputRef.current = c; encode(c, urlSafe); }, [encode, urlSafe]);
  const toggleUrlSafe = useCallback(() => { const next = !urlSafe; setUrlSafe(next); encode(lastInputRef.current, next); }, [urlSafe, encode]);

  return (
    <ToolLayout
      title="Base64 Encode"
      description="Encode text to Base64"
      status={status}
      actions={
        <button onClick={toggleUrlSafe} className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${urlSafe ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
          URL-safe
        </button>
      }
    >
      <ToolPanel>
        <CodeEditor label="Input — Text" value={input} onChange={handleInputChange} placeholder="Paste text to encode..." onFileUpload={handleFileUpload} filename="input.txt" />
      </ToolPanel>
      <ToolPanel>
        <CodeEditor label="Output — Base64" value={output} readOnly placeholder="Base64 output will appear here..." filename="encoded.txt" />
      </ToolPanel>
    </ToolLayout>
  );
}
