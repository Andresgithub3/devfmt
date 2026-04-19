"use client";

import { useState, useCallback, useRef } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { formatSql, type SqlDialect, type KeywordCase } from "@/lib/conversion-tools";

const DIALECTS: { value: SqlDialect; label: string }[] = [
  { value: "sql", label: "Standard" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "sqlite", label: "SQLite" },
];

export function SqlFormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [dialect, setDialect] = useState<SqlDialect>("sql");
  const [indent, setIndent] = useState(2);
  const [keywordCase, setKeywordCase] = useState<KeywordCase>("upper");
  const [status, setStatus] = useState<StatusBarInfo>({});
  const lastInputRef = useRef("");

  const format = useCallback((raw: string, d: SqlDialect, ind: number, kc: KeywordCase) => {
    if (!raw.trim()) {
      setOutput("");
      setStatus({});
      return;
    }
    const start = performance.now();
    const result = formatSql(raw, { dialect: d, indent: ind, keywordCase: kc });
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
        detectedFormat: `SQL (${d})`,
      });
    }
  }, []);

  const handleInputChange = useCallback((v: string) => { setInput(v); lastInputRef.current = v; format(v, dialect, indent, keywordCase); }, [format, dialect, indent, keywordCase]);
  const handleFileUpload = useCallback((c: string) => { setInput(c); lastInputRef.current = c; format(c, dialect, indent, keywordCase); }, [format, dialect, indent, keywordCase]);

  const handleDialectChange = useCallback((d: SqlDialect) => { setDialect(d); format(lastInputRef.current, d, indent, keywordCase); }, [format, indent, keywordCase]);
  const handleKeywordCaseChange = useCallback((kc: KeywordCase) => { setKeywordCase(kc); format(lastInputRef.current, dialect, indent, kc); }, [format, dialect, indent]);
  const handleIndentChange = useCallback((n: number) => { setIndent(n); format(lastInputRef.current, dialect, n, keywordCase); }, [format, dialect, keywordCase]);

  return (
    <ToolLayout
      title="SQL Formatter"
      description="Beautify SQL queries"
      status={status}
      actions={
        <div className="flex items-center gap-3 text-xs flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Dialect:</span>
            {DIALECTS.map((d) => (
              <button key={d.value} onClick={() => handleDialectChange(d.value)} className={`px-2 py-0.5 rounded font-mono transition-colors ${dialect === d.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                {d.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Case:</span>
            {(["upper", "lower", "preserve"] as const).map((kc) => (
              <button key={kc} onClick={() => handleKeywordCaseChange(kc)} className={`px-2 py-0.5 rounded font-mono transition-colors ${keywordCase === kc ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                {kc === "upper" ? "UPPER" : kc === "lower" ? "lower" : "As-is"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Indent:</span>
            {[2, 4].map((n) => (
              <button key={n} onClick={() => handleIndentChange(n)} className={`px-2 py-0.5 rounded font-mono transition-colors ${indent === n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                {n}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <ToolPanel>
        <CodeEditor label="Input — SQL" value={input} onChange={handleInputChange} placeholder="Paste SQL query here..." onFileUpload={handleFileUpload} filename="input.sql" />
      </ToolPanel>
      <ToolPanel>
        <CodeEditor label="Output — Formatted SQL" value={output} readOnly placeholder="Formatted SQL will appear here..." filename="formatted.sql" />
      </ToolPanel>
    </ToolLayout>
  );
}
