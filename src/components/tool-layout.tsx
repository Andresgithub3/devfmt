"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface StatusBarInfo {
  inputSize?: number;
  inputLines?: number;
  outputSize?: number;
  outputLines?: number;
  processingTime?: number;
  detectedFormat?: string;
  error?: string;
}

interface ToolLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  status?: StatusBarInfo;
  actions?: ReactNode;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ToolLayout({
  title,
  description,
  children,
  status,
  actions,
}: ToolLayoutProps) {
  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Top bar */}
      <header className="shrink-0 flex items-center justify-between px-4 py-2 border-b border-border">
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            DevFmt
          </a>
          <span className="text-border">/</span>
          <h1 className="text-sm font-medium text-foreground">{title}</h1>
          {description && (
            <span className="hidden sm:inline text-xs text-muted-foreground">
              {description}
            </span>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </header>

      {/* Two-panel editor area */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
        {children}
      </div>

      {/* Status bar */}
      <footer className="shrink-0 flex items-center gap-4 px-4 py-1.5 border-t border-border bg-muted/30 text-xs font-mono text-muted-foreground">
        {status?.error ? (
          <span className="text-destructive">{status.error}</span>
        ) : (
          <>
            {status?.detectedFormat && (
              <StatusItem label="Format" value={status.detectedFormat} />
            )}
            {status?.inputSize !== undefined && (
              <StatusItem
                label="Input"
                value={`${formatBytes(status.inputSize)}${status.inputLines !== undefined ? ` / ${status.inputLines} lines` : ""}`}
              />
            )}
            {status?.outputSize !== undefined && (
              <StatusItem
                label="Output"
                value={`${formatBytes(status.outputSize)}${status.outputLines !== undefined ? ` / ${status.outputLines} lines` : ""}`}
              />
            )}
            {status?.processingTime !== undefined && (
              <StatusItem
                label="Time"
                value={
                  status.processingTime < 1
                    ? `${(status.processingTime * 1000).toFixed(0)}µs`
                    : `${status.processingTime.toFixed(1)}ms`
                }
              />
            )}
          </>
        )}
        <span className="ml-auto text-muted-foreground/50">
          All processing happens locally in your browser
        </span>
      </footer>
    </div>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-muted-foreground/60">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

/** Wrapper for the two-panel split. Use inside ToolLayout. */
export function ToolPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex-1 min-h-0 min-w-0 flex flex-col border-border",
        "lg:first:border-r",
        "max-lg:first:border-b",
        className
      )}
    >
      {children}
    </div>
  );
}
