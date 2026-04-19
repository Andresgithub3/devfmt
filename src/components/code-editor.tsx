"use client";

import {
  useRef,
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type UIEvent,
} from "react";
import { cn } from "@/lib/utils";
import { Copy, Download, Trash2, Check, Upload } from "lucide-react";

export interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  label?: string;
  filename?: string;
  language?: string;
  className?: string;
  onFileUpload?: (content: string, filename: string) => void;
}

export function CodeEditor({
  value,
  onChange,
  readOnly = false,
  placeholder = "Paste or type here...",
  label,
  filename = "output.txt",
  className,
  onFileUpload,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  const lineCount = value ? value.split("\n").length : 1;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab" && !e.shiftKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newValue =
          value.substring(0, start) + "  " + value.substring(end);
        onChange?.(newValue);
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        });
      }
    },
    [value, onChange]
  );

  const handleScroll = useCallback((e: UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  }, []);

  const handleCopy = useCallback(async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [value]);

  const handleDownload = useCallback(() => {
    if (!value) return;
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [value, filename]);

  const handleClear = useCallback(() => {
    onChange?.("");
    textareaRef.current?.focus();
  }, [onChange]);

  const handleFileClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        onFileUpload?.(content, file.name);
      };
      reader.readAsText(file);
      e.target.value = "";
    },
    [onFileUpload]
  );

  // Sync scroll on mount if needed
  useEffect(() => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, [value]);

  return (
    <div className={cn("flex flex-col h-full min-h-0", className)}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-muted/50 shrink-0">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <div className="flex items-center gap-1">
          {onFileUpload && !readOnly && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".json,.csv,.yaml,.yml,.sql,.txt,.xml"
              />
              <button
                type="button"
                onClick={handleFileClick}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title="Upload file"
              >
                <Upload className="w-3.5 h-3.5" />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={handleCopy}
            disabled={!value}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-success" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!value}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Download"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          {!readOnly && (
            <button
              type="button"
              onClick={handleClear}
              disabled={!value}
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Clear"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Editor area */}
      <div className="relative flex flex-1 min-h-0 overflow-hidden bg-background">
        {/* Line numbers */}
        <div
          ref={lineNumbersRef}
          className="shrink-0 overflow-hidden select-none py-3 pr-3 pl-3 text-right border-r border-border bg-muted/30"
          aria-hidden="true"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={i}
              className="font-mono text-[13px] leading-[1.5] text-muted-foreground/50"
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={!readOnly ? handleKeyDown : undefined}
          onScroll={handleScroll}
          readOnly={readOnly}
          placeholder={placeholder}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          className={cn(
            "flex-1 min-h-0 resize-none p-3 font-mono text-sm leading-[1.5] bg-transparent outline-none overflow-auto",
            "placeholder:text-muted-foreground/40",
            readOnly && "cursor-default"
          )}
        />
      </div>
    </div>
  );
}
