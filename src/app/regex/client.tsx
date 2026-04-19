"use client";

import { useState, useCallback, useRef } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { testRegex, type RegexMatch } from "@/lib/backlog-tools";

const FLAG_OPTIONS = [
  { flag: "g", label: "global" },
  { flag: "i", label: "case-insensitive" },
  { flag: "m", label: "multiline" },
  { flag: "s", label: "dotAll" },
];

export function RegexClient() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [input, setInput] = useState("");
  const [matches, setMatches] = useState<RegexMatch[]>([]);
  const [status, setStatus] = useState<StatusBarInfo>({});
  const patternRef = useRef("");
  const flagsRef = useRef("g");
  const inputRef = useRef("");

  const run = useCallback((p: string, f: string, inp: string) => {
    if (!p || !inp) { setMatches([]); setStatus({}); return; }
    const start = performance.now();
    const result = testRegex(p, f, inp);
    const elapsed = performance.now() - start;
    setMatches(result.matches);
    if (result.error) { setStatus({ error: result.error }); }
    else { setStatus({ processingTime: elapsed, detectedFormat: `${result.matches.length} match${result.matches.length !== 1 ? "es" : ""}` }); }
  }, []);

  const handlePatternChange = useCallback((v: string) => { setPattern(v); patternRef.current = v; run(v, flagsRef.current, inputRef.current); }, [run]);
  const handleInputChange = useCallback((v: string) => { setInput(v); inputRef.current = v; run(patternRef.current, flagsRef.current, v); }, [run]);
  const toggleFlag = useCallback((f: string) => {
    const next = flagsRef.current.includes(f) ? flagsRef.current.replace(f, "") : flagsRef.current + f;
    setFlags(next); flagsRef.current = next;
    run(patternRef.current, next, inputRef.current);
  }, [run]);

  const output = matches.length > 0
    ? matches.map((m, i) => {
        let line = `Match ${i + 1}: "${m.match}" at index ${m.index}`;
        if (m.groups) line += `\n  Groups: ${JSON.stringify(m.groups)}`;
        return line;
      }).join("\n\n")
    : "";

  return (
    <ToolLayout
      title="Regex Tester"
      description="Test regular expressions"
      status={status}
      actions={
        <div className="flex items-center gap-1.5 text-xs">
          {FLAG_OPTIONS.map(({ flag, label }) => (
            <button key={flag} onClick={() => toggleFlag(flag)} className={`px-2 py-0.5 rounded font-mono transition-colors ${flags.includes(flag) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`} title={label}>
              {flag}
            </button>
          ))}
        </div>
      }
    >
      <ToolPanel>
        <div className="flex flex-col h-full min-h-0">
          <div className="shrink-0 px-3 py-2 border-b border-border bg-muted/50">
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-muted-foreground">/</span>
              <input type="text" value={pattern} onChange={(e) => handlePatternChange(e.target.value)} placeholder="pattern" className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/40" />
              <span className="text-muted-foreground">/{flags}</span>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <CodeEditor label="Test String" value={input} onChange={handleInputChange} placeholder="Paste text to test against..." />
          </div>
        </div>
      </ToolPanel>
      <ToolPanel>
        <CodeEditor label="Matches" value={output} readOnly placeholder="Matches will appear here..." filename="matches.txt" />
      </ToolPanel>
    </ToolLayout>
  );
}
