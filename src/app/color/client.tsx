"use client";

import { useState, useCallback } from "react";
import { ToolLayout, type StatusBarInfo } from "@/components/tool-layout";
import { parseColor, type ColorValues } from "@/lib/backlog-tools";

export function ColorClient() {
  const [input, setInput] = useState("");
  const [color, setColor] = useState<ColorValues | null>(null);
  const [status, setStatus] = useState<StatusBarInfo>({});

  const process = useCallback((raw: string) => {
    setInput(raw);
    if (!raw.trim()) { setColor(null); setStatus({}); return; }
    const start = performance.now();
    const result = parseColor(raw);
    const elapsed = performance.now() - start;
    if (result) {
      setColor(result);
      setStatus({ processingTime: elapsed, detectedFormat: result.hex });
    } else {
      setColor(null);
      setStatus({ error: "Unrecognized format. Try #FF5733, rgb(255,87,51), or hsl(11,100%,60%)" });
    }
  }, []);

  return (
    <ToolLayout title="Color Converter" description="Hex ↔ RGB ↔ HSL" status={status}>
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
        {/* Input panel */}
        <div className="flex-1 min-h-0 min-w-0 flex flex-col border-border lg:border-r max-lg:border-b">
          <div className="px-3 py-1.5 border-b border-border bg-muted/50 shrink-0">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Input</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            <input
              type="text"
              value={input}
              onChange={(e) => process(e.target.value)}
              placeholder="#FF5733 or rgb(255,87,51) or hsl(11,100%,60%)"
              className="w-full max-w-md px-4 py-3 text-sm font-mono bg-muted border border-border rounded-md outline-none focus:border-primary text-center"
            />
            {color && (
              <div className="w-32 h-32 rounded-lg border border-border shadow-sm" style={{ backgroundColor: color.hex }} />
            )}
          </div>
        </div>

        {/* Output panel */}
        <div className="flex-1 min-h-0 min-w-0 flex flex-col">
          <div className="px-3 py-1.5 border-b border-border bg-muted/50 shrink-0">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Output</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6">
            {color ? (
              <div className="space-y-3 font-mono text-sm w-full max-w-md">
                <ColorRow label="HEX" value={color.hex} />
                <ColorRow label="RGB" value={`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`} />
                <ColorRow label="HSL" value={`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`} />
                <ColorRow label="R" value={String(color.rgb.r)} />
                <ColorRow label="G" value={String(color.rgb.g)} />
                <ColorRow label="B" value={String(color.rgb.b)} />
              </div>
            ) : (
              <p className="text-muted-foreground/40 text-sm">Enter a color to see conversions...</p>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

function ColorRow({ label, value }: { label: string; value: string }) {
  const copy = () => navigator.clipboard.writeText(value);
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-muted rounded-md">
      <span className="text-muted-foreground text-xs w-8">{label}</span>
      <span className="text-foreground">{value}</span>
      <button onClick={copy} className="text-xs text-muted-foreground hover:text-foreground transition-colors">Copy</button>
    </div>
  );
}
