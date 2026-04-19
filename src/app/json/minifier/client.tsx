"use client";

import { useState, useCallback } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { minifyJson } from "@/lib/json-tools";

export function JsonMinifierClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<StatusBarInfo>({});

  const process = useCallback((raw: string) => {
    if (!raw.trim()) {
      setOutput("");
      setStatus({});
      return;
    }

    const start = performance.now();
    const result = minifyJson(raw);
    const elapsed = performance.now() - start;

    if (result.error) {
      setOutput("");
      setStatus({
        inputSize: new Blob([raw]).size,
        inputLines: raw.split("\n").length,
        error: result.error,
      });
    } else {
      const inputBytes = (result.meta?.inputBytes as number) ?? 0;
      const saved = (result.meta?.bytesSaved as number) ?? 0;

      setOutput(result.output);
      setStatus({
        inputSize: inputBytes,
        inputLines: raw.split("\n").length,
        outputSize: new Blob([result.output]).size,
        outputLines: 1,
        processingTime: elapsed,
        detectedFormat:
          saved > 0
            ? `JSON — ${saved} bytes saved (${((saved / inputBytes) * 100).toFixed(1)}%)`
            : "JSON — already minified",
      });
    }
  }, []);

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      process(value);
    },
    [process]
  );

  const handleFileUpload = useCallback(
    (content: string) => {
      setInput(content);
      process(content);
    },
    [process]
  );

  return (
    <ToolLayout
      title="JSON Minifier"
      description="Compress JSON to a single line"
      status={status}
    >
      <ToolPanel>
        <CodeEditor
          label="Input"
          value={input}
          onChange={handleInputChange}
          placeholder="Paste formatted JSON here..."
          onFileUpload={handleFileUpload}
          filename="input.json"
        />
      </ToolPanel>
      <ToolPanel>
        <CodeEditor
          label="Output"
          value={output}
          readOnly
          placeholder="Minified JSON will appear here..."
          filename="minified.json"
        />
      </ToolPanel>
    </ToolLayout>
  );
}
