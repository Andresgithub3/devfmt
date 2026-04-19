"use client";

import { useState, useCallback, useRef } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { csvToJson } from "@/lib/conversion-tools";

export function CsvToJsonClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [hasHeader, setHasHeader] = useState(true);
  const [inferTypes, setInferTypes] = useState(true);
  const [status, setStatus] = useState<StatusBarInfo>({});
  const lastInputRef = useRef("");

  const convert = useCallback((raw: string, header: boolean, infer: boolean) => {
    if (!raw.trim()) {
      setOutput("");
      setStatus({});
      return;
    }
    const start = performance.now();
    const result = csvToJson(raw, { hasHeader: header, inferTypes: infer });
    const elapsed = performance.now() - start;

    if (result.error) {
      setOutput("");
      setStatus({ inputSize: new Blob([raw]).size, inputLines: raw.split("\n").length, error: result.error });
    } else {
      const rowCount = (result.meta?.rowCount as number) ?? 0;
      const fields = (result.meta?.fields as string[]) ?? [];
      setOutput(result.output);
      setStatus({
        inputSize: new Blob([raw]).size,
        inputLines: raw.split("\n").length,
        outputSize: new Blob([result.output]).size,
        outputLines: result.output.split("\n").length,
        processingTime: elapsed,
        detectedFormat: `CSV → JSON (${rowCount} rows, ${fields.length || "?"} cols)`,
      });
    }
  }, []);

  const handleInputChange = useCallback((v: string) => { setInput(v); lastInputRef.current = v; convert(v, hasHeader, inferTypes); }, [convert, hasHeader, inferTypes]);
  const handleFileUpload = useCallback((c: string) => { setInput(c); lastInputRef.current = c; convert(c, hasHeader, inferTypes); }, [convert, hasHeader, inferTypes]);

  const toggleHeader = useCallback(() => {
    const next = !hasHeader;
    setHasHeader(next);
    convert(lastInputRef.current, next, inferTypes);
  }, [hasHeader, convert, inferTypes]);

  const toggleInfer = useCallback(() => {
    const next = !inferTypes;
    setInferTypes(next);
    convert(lastInputRef.current, hasHeader, next);
  }, [inferTypes, convert, hasHeader]);

  return (
    <ToolLayout
      title="CSV to JSON"
      description="Convert CSV to JSON"
      status={status}
      actions={
        <div className="flex items-center gap-2 text-xs">
          <button onClick={toggleHeader} className={`px-2 py-0.5 rounded font-mono transition-colors ${hasHeader ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            Header Row
          </button>
          <button onClick={toggleInfer} className={`px-2 py-0.5 rounded font-mono transition-colors ${inferTypes ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
            Infer Types
          </button>
        </div>
      }
    >
      <ToolPanel>
        <CodeEditor label="Input — CSV" value={input} onChange={handleInputChange} placeholder="Paste CSV here..." onFileUpload={handleFileUpload} filename="input.csv" />
      </ToolPanel>
      <ToolPanel>
        <CodeEditor label="Output — JSON" value={output} readOnly placeholder="JSON output will appear here..." filename="output.json" />
      </ToolPanel>
    </ToolLayout>
  );
}
