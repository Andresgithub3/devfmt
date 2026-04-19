"use client";

import { useState, useCallback, useMemo } from "react";
import Papa from "papaparse";
import { CodeEditor } from "@/components/code-editor";
import { ToolLayout, ToolPanel, type StatusBarInfo } from "@/components/tool-layout";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, Download } from "lucide-react";

interface TableData {
  headers: string[];
  rows: string[][];
}

export function CsvViewerClient() {
  const [input, setInput] = useState("");
  const [table, setTable] = useState<TableData | null>(null);
  const [status, setStatus] = useState<StatusBarInfo>({});
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [filter, setFilter] = useState("");

  const parse = useCallback((raw: string) => {
    if (!raw.trim()) {
      setTable(null);
      setStatus({});
      return;
    }

    const start = performance.now();
    const result = Papa.parse(raw.trim(), { header: false, skipEmptyLines: true });
    const elapsed = performance.now() - start;

    if (result.data.length === 0) {
      setTable(null);
      setStatus({ error: "No data found" });
      return;
    }

    const allRows = result.data as string[][];
    const headers = allRows[0];
    const rows = allRows.slice(1);

    setTable({ headers, rows });
    setSortCol(null);
    setFilter("");
    setStatus({
      inputSize: new Blob([raw]).size,
      inputLines: raw.split("\n").length,
      processingTime: elapsed,
      detectedFormat: `CSV (${rows.length} rows, ${headers.length} cols)`,
    });
  }, []);

  const handleInputChange = useCallback((v: string) => { setInput(v); parse(v); }, [parse]);
  const handleFileUpload = useCallback((c: string) => { setInput(c); parse(c); }, [parse]);

  const handleSort = useCallback((colIndex: number) => {
    setSortCol((prev) => {
      if (prev === colIndex) {
        setSortAsc((a) => !a);
        return colIndex;
      }
      setSortAsc(true);
      return colIndex;
    });
  }, []);

  const filteredAndSorted = useMemo(() => {
    if (!table) return [];
    let rows = table.rows;

    if (filter) {
      const lf = filter.toLowerCase();
      rows = rows.filter((row) => row.some((cell) => cell.toLowerCase().includes(lf)));
    }

    if (sortCol !== null) {
      rows = [...rows].sort((a, b) => {
        const va = a[sortCol] ?? "";
        const vb = b[sortCol] ?? "";
        const na = Number(va);
        const nb = Number(vb);
        if (!isNaN(na) && !isNaN(nb)) return sortAsc ? na - nb : nb - na;
        return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
      });
    }

    return rows;
  }, [table, filter, sortCol, sortAsc]);

  const handleExport = useCallback(() => {
    if (!table) return;
    const csv = Papa.unparse({ fields: table.headers, data: filteredAndSorted });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [table, filteredAndSorted]);

  return (
    <ToolLayout
      title="CSV Viewer"
      description="View & filter CSV data"
      status={status}
      actions={
        table && (
          <button onClick={handleExport} className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Download className="w-3 h-3" /> Export
          </button>
        )
      }
    >
      <ToolPanel>
        <CodeEditor label="Input — CSV" value={input} onChange={handleInputChange} placeholder="Paste CSV data here..." onFileUpload={handleFileUpload} filename="input.csv" />
      </ToolPanel>
      <ToolPanel>
        <div className="flex flex-col h-full min-h-0">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-muted/50 shrink-0">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Table View
            </span>
            {table && (
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter rows..."
                className="px-2 py-0.5 text-xs font-mono bg-background border border-border rounded w-48 outline-none focus:border-primary"
              />
            )}
          </div>
          <div className="flex-1 min-h-0 overflow-auto">
            {table ? (
              <table className="w-full text-xs font-mono border-collapse">
                <thead className="sticky top-0 bg-muted z-10">
                  <tr>
                    <th className="px-3 py-2 text-left text-muted-foreground border-b border-border w-10">#</th>
                    {table.headers.map((h, i) => (
                      <th
                        key={i}
                        onClick={() => handleSort(i)}
                        className="px-3 py-2 text-left border-b border-border cursor-pointer hover:bg-muted/80 select-none whitespace-nowrap"
                      >
                        <span className="flex items-center gap-1">
                          {h}
                          {sortCol === i && (sortAsc ? <ArrowUp className="w-3 h-3 text-primary" /> : <ArrowDown className="w-3 h-3 text-primary" />)}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSorted.map((row, ri) => (
                    <tr key={ri} className={cn("border-b border-border/50 hover:bg-muted/30", ri % 2 === 0 && "bg-muted/10")}>
                      <td className="px-3 py-1.5 text-muted-foreground/50">{ri + 1}</td>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-3 py-1.5 whitespace-nowrap max-w-[300px] truncate">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground/40 text-sm">
                Paste CSV to view as table...
              </div>
            )}
          </div>
        </div>
      </ToolPanel>
    </ToolLayout>
  );
}
