"use client";

import { useState, useCallback } from "react";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { decodeJwt } from "@/lib/backlog-tools";

export function JwtDecodeClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<StatusBarInfo>({});

  const process = useCallback((raw: string) => {
    if (!raw.trim()) { setOutput(""); setStatus({}); return; }
    const start = performance.now();
    const { result, error } = decodeJwt(raw);
    const elapsed = performance.now() - start;

    if (error) { setOutput(""); setStatus({ error }); return; }
    if (!result) return;

    const lines: string[] = [
      "=== HEADER ===",
      JSON.stringify(result.header, null, 2),
      "",
      "=== PAYLOAD ===",
      JSON.stringify(result.payload, null, 2),
    ];

    // Show expiration info if present
    const exp = result.payload.exp;
    if (typeof exp === "number") {
      const expDate = new Date(exp * 1000);
      const isExpired = expDate.getTime() < Date.now();
      lines.push("", `=== EXPIRATION ===`);
      lines.push(`Expires: ${expDate.toISOString()}`);
      lines.push(`Status:  ${isExpired ? "EXPIRED" : "Valid"}`);
    }

    const iat = result.payload.iat;
    if (typeof iat === "number") {
      lines.push(`Issued:  ${new Date(iat * 1000).toISOString()}`);
    }

    lines.push("", "=== SIGNATURE ===", result.signature);

    const out = lines.join("\n");
    setOutput(out);
    setStatus({
      processingTime: elapsed,
      detectedFormat: `JWT (${result.header.alg ?? "unknown"})`,
    });
  }, []);

  const handleChange = useCallback((v: string) => { setInput(v); process(v); }, [process]);

  return (
    <ToolLayout title="JWT Decoder" description="Decode JSON Web Tokens" status={status}>
      <ToolPanel><CodeEditor label="Input — JWT" value={input} onChange={handleChange} placeholder="Paste JWT token (eyJhbG...)..." /></ToolPanel>
      <ToolPanel><CodeEditor label="Output — Decoded" value={output} readOnly placeholder="Decoded header, payload, and signature..." filename="jwt-decoded.txt" /></ToolPanel>
    </ToolLayout>
  );
}
