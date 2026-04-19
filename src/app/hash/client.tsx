"use client";

import { useState, useCallback, useEffect } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { generateHash, type HashAlgorithm } from "@/lib/backlog-tools";

const ALGORITHMS: HashAlgorithm[] = ["SHA-1", "SHA-256", "SHA-512"];

export function HashClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const [status, setStatus] = useState<StatusBarInfo>({});

  const compute = useCallback(async (raw: string, algo: HashAlgorithm) => {
    if (!raw) { setOutput(""); setStatus({}); return; }
    const start = performance.now();
    const result = await generateHash(raw, algo);
    const elapsed = performance.now() - start;
    setOutput(result.output);
    if (result.error) { setStatus({ error: result.error }); }
    else { setStatus({ inputSize: new Blob([raw]).size, outputSize: new Blob([result.output]).size, processingTime: elapsed, detectedFormat: algo }); }
  }, []);

  const handleChange = useCallback((v: string) => { setInput(v); compute(v, algorithm); }, [compute, algorithm]);
  const handleAlgo = useCallback((a: HashAlgorithm) => { setAlgorithm(a); compute(input, a); }, [compute, input]);

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate SHA hashes"
      status={status}
      actions={
        <div className="flex items-center gap-1.5 text-xs">
          {ALGORITHMS.map((a) => (
            <button key={a} onClick={() => handleAlgo(a)} className={`px-2 py-0.5 rounded font-mono transition-colors ${algorithm === a ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {a}
            </button>
          ))}
        </div>
      }
    >
      <ToolPanel><CodeEditor label="Input — Text" value={input} onChange={handleChange} placeholder="Paste text to hash..." /></ToolPanel>
      <ToolPanel><CodeEditor label="Output — Hash" value={output} readOnly placeholder="Hash will appear here..." filename="hash.txt" /></ToolPanel>
    </ToolLayout>
  );
}
