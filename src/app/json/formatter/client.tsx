"use client";

import { useState, useCallback, useRef } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { formatJson, type IndentType } from "@/lib/json-tools";

export function JsonFormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<IndentType>("2");
  const [status, setStatus] = useState<StatusBarInfo>({});
  const lastInputRef = useRef("");

  const process = useCallback((raw: string, indentType: IndentType) => {
    if (!raw.trim()) {
      setOutput("");
      setStatus({});
      return;
    }

    const start = performance.now();
    const result = formatJson(raw, indentType);
    const elapsed = performance.now() - start;

    if (result.error) {
      setOutput("");
      setStatus({
        inputSize: new Blob([raw]).size,
        inputLines: raw.split("\n").length,
        error: result.error,
      });
    } else {
      setOutput(result.output);
      setStatus({
        inputSize: new Blob([raw]).size,
        inputLines: raw.split("\n").length,
        outputSize: new Blob([result.output]).size,
        outputLines: result.output.split("\n").length,
        processingTime: elapsed,
        detectedFormat: "JSON",
      });
    }
  }, []);

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value);
      lastInputRef.current = value;
      process(value, indent);
    },
    [process, indent]
  );

  const handleIndentChange = useCallback(
    (newIndent: IndentType) => {
      setIndent(newIndent);
      process(lastInputRef.current, newIndent);
    },
    [process]
  );

  const handleFileUpload = useCallback(
    (content: string) => {
      setInput(content);
      lastInputRef.current = content;
      process(content, indent);
    },
    [process, indent]
  );

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Beautify & validate JSON"
      status={status}
      actions={
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-muted-foreground">Indent:</span>
          {(["2", "4", "tab"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => handleIndentChange(opt)}
              className={`px-2 py-0.5 rounded text-xs font-mono transition-colors ${
                indent === opt
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt === "tab" ? "Tab" : opt}
            </button>
          ))}
        </div>
      }
    >
      <ToolPanel>
        <CodeEditor
          label="Input"
          value={input}
          onChange={handleInputChange}
          placeholder="Paste JSON here..."
          onFileUpload={handleFileUpload}
          filename="input.json"
        />
      </ToolPanel>
      <ToolPanel>
        <CodeEditor
          label="Output"
          value={output}
          readOnly
          placeholder="Formatted JSON will appear here..."
          filename="formatted.json"
        />
      </ToolPanel>
    </ToolLayout>
  );
}
