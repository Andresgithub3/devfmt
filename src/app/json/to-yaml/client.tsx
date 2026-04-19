"use client";

import { useState, useCallback } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { jsonToYaml } from "@/lib/conversion-tools";

export function JsonToYamlClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<StatusBarInfo>({});

  const convert = useCallback((raw: string) => {
    if (!raw.trim()) {
      setOutput("");
      setStatus({});
      return;
    }
    const start = performance.now();
    const result = jsonToYaml(raw);
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
        detectedFormat: "JSON → YAML",
      });
    }
  }, []);

  const handleInputChange = useCallback((v: string) => { setInput(v); convert(v); }, [convert]);
  const handleFileUpload = useCallback((c: string) => { setInput(c); convert(c); }, [convert]);

  return (
    <ToolLayout title="JSON to YAML" description="Convert JSON to YAML" status={status}>
      <ToolPanel>
        <CodeEditor label="Input — JSON" value={input} onChange={handleInputChange} placeholder="Paste JSON here..." onFileUpload={handleFileUpload} filename="input.json" />
      </ToolPanel>
      <ToolPanel>
        <CodeEditor label="Output — YAML" value={output} readOnly placeholder="YAML output will appear here..." filename="output.yaml" />
      </ToolPanel>
    </ToolLayout>
  );
}
