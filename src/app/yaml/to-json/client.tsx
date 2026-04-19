"use client";

import { useState, useCallback, useRef } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { yamlToJson } from "@/lib/conversion-tools";

export function YamlToJsonClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<2 | 4>(2);
  const [status, setStatus] = useState<StatusBarInfo>({});
  const lastInputRef = useRef("");

  const convert = useCallback((raw: string, ind: number) => {
    if (!raw.trim()) {
      setOutput("");
      setStatus({});
      return;
    }
    const start = performance.now();
    const result = yamlToJson(raw, ind);
    const elapsed = performance.now() - start;

    if (result.error) {
      setOutput("");
      setStatus({ inputSize: new Blob([raw]).size, inputLines: raw.split("\n").length, error: result.error });
    } else {
      setOutput(result.output);
      setStatus({
        inputSize: new Blob([raw]).size,
        inputLines: raw.split("\n").length,
        outputSize: new Blob([result.output]).size,
        outputLines: result.output.split("\n").length,
        processingTime: elapsed,
        detectedFormat: "YAML → JSON",
      });
    }
  }, []);

  const handleInputChange = useCallback((v: string) => { setInput(v); lastInputRef.current = v; convert(v, indent); }, [convert, indent]);
  const handleFileUpload = useCallback((c: string) => { setInput(c); lastInputRef.current = c; convert(c, indent); }, [convert, indent]);
  const handleIndentChange = useCallback((n: 2 | 4) => { setIndent(n); convert(lastInputRef.current, n); }, [convert]);

  return (
    <ToolLayout
      title="YAML to JSON"
      description="Convert YAML to JSON"
      status={status}
      actions={
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-muted-foreground">Indent:</span>
          {([2, 4] as const).map((opt) => (
            <button key={opt} onClick={() => handleIndentChange(opt)} className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${indent === opt ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {opt}
            </button>
          ))}
        </div>
      }
    >
      <ToolPanel>
        <CodeEditor label="Input — YAML" value={input} onChange={handleInputChange} placeholder="Paste YAML here..." onFileUpload={handleFileUpload} filename="input.yaml" />
      </ToolPanel>
      <ToolPanel>
        <CodeEditor label="Output — JSON" value={output} readOnly placeholder="JSON output will appear here..." filename="output.json" />
      </ToolPanel>
    </ToolLayout>
  );
}
