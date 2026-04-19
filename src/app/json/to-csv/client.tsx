"use client";

import { useState, useCallback, useRef } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { jsonToCsv, type Delimiter } from "@/lib/json-tools";

export function JsonToCsvClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [delimiter, setDelimiter] = useState<Delimiter>(",");
  const [status, setStatus] = useState<StatusBarInfo>({});
  const lastInputRef = useRef("");

  const convert = useCallback((raw: string, delim: Delimiter) => {
    if (!raw.trim()) {
      setOutput("");
      setStatus({});
      return;
    }

    const start = performance.now();
    const result = jsonToCsv(raw, delim);
    const elapsed = performance.now() - start;

    if (result.error) {
      setOutput("");
      setStatus({
        inputSize: new Blob([raw]).size,
        inputLines: raw.split("\n").length,
        error: result.error,
      });
    } else {
      const rowCount = (result.meta?.rowCount as number) ?? 0;
      setOutput(result.output);
      setStatus({
        inputSize: new Blob([raw]).size,
        inputLines: raw.split("\n").length,
        outputSize: new Blob([result.output]).size,
        outputLines: result.output.split("\n").length,
        processingTime: elapsed,
        detectedFormat: `JSON → CSV (${rowCount} rows)`,
      });
    }
  }, []);

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      lastInputRef.current = value;
      convert(value, delimiter);
    },
    [convert, delimiter]
  );

  const handleDelimiterChange = useCallback(
    (newDelim: Delimiter) => {
      setDelimiter(newDelim);
      convert(lastInputRef.current, newDelim);
    },
    [convert]
  );

  const handleFileUpload = useCallback(
    (content: string) => {
      setInput(content);
      lastInputRef.current = content;
      convert(content, delimiter);
    },
    [convert, delimiter]
  );

  return (
    <ToolLayout
      title="JSON to CSV"
      description="Convert JSON arrays to CSV"
      status={status}
      actions={
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-muted-foreground">Delimiter:</span>
          {([
            [",", "Comma"],
            ["\t", "Tab"],
            [";", "Semi"],
          ] as const).map(([d, label]) => (
            <button
              key={label}
              onClick={() => handleDelimiterChange(d as Delimiter)}
              className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${
                delimiter === d
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      }
    >
      <ToolPanel>
        <CodeEditor
          label="Input — JSON"
          value={input}
          onChange={handleInputChange}
          placeholder='Paste a JSON array, e.g. [{"name":"Alice","age":30}]'
          onFileUpload={handleFileUpload}
          filename="input.json"
        />
      </ToolPanel>
      <ToolPanel>
        <CodeEditor
          label="Output — CSV"
          value={output}
          readOnly
          placeholder="CSV output will appear here..."
          filename="output.csv"
        />
      </ToolPanel>
    </ToolLayout>
  );
}
