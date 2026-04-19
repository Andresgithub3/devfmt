import yaml from "js-yaml";
import Papa from "papaparse";
import { format as sqlFormat, type SqlLanguage } from "sql-formatter";

export interface ConversionResult {
  output: string;
  error?: string;
  meta?: Record<string, unknown>;
}

// ── JSON ↔ YAML ─────────────────────────────────────────────────

export function jsonToYaml(raw: string): ConversionResult {
  if (!raw.trim()) return { output: "" };
  try {
    const parsed = JSON.parse(raw);
    const output = yaml.dump(parsed, { indent: 2, lineWidth: 120, noRefs: true });
    return { output };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Invalid JSON" };
  }
}

export function yamlToJson(raw: string, indent: number = 2): ConversionResult {
  if (!raw.trim()) return { output: "" };
  try {
    const parsed = yaml.load(raw);
    const output = JSON.stringify(parsed, null, indent);
    return { output };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Invalid YAML" };
  }
}

// ── CSV → JSON ──────────────────────────────────────────────────

export interface CsvToJsonOptions {
  hasHeader: boolean;
  inferTypes: boolean;
}

function inferValue(val: string): string | number | boolean | null {
  if (val === "") return null;
  if (val === "true") return true;
  if (val === "false") return false;
  const num = Number(val);
  if (!isNaN(num) && val.trim() !== "") return num;
  return val;
}

export function csvToJson(
  raw: string,
  options: CsvToJsonOptions = { hasHeader: true, inferTypes: true }
): ConversionResult {
  if (!raw.trim()) return { output: "" };

  try {
    const result = Papa.parse(raw.trim(), {
      header: options.hasHeader,
      skipEmptyLines: true,
      dynamicTyping: options.inferTypes,
    });

    if (result.errors.length > 0 && result.data.length === 0) {
      const firstError = result.errors[0];
      return { output: "", error: `Row ${firstError.row}: ${firstError.message}` };
    }

    const output = JSON.stringify(result.data, null, 2);
    return {
      output,
      meta: {
        rowCount: result.data.length,
        fields: result.meta?.fields ?? [],
      },
    };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Invalid CSV" };
  }
}

// ── CSV Viewer parsing ──────────────────────────────────────────

export interface CsvTableData {
  headers: string[];
  rows: string[][];
  rowCount: number;
}

export function parseCsvForTable(raw: string): ConversionResult & { table?: CsvTableData } {
  if (!raw.trim()) return { output: "" };

  try {
    const result = Papa.parse(raw.trim(), {
      header: false,
      skipEmptyLines: true,
    });

    if (result.errors.length > 0 && result.data.length === 0) {
      return { output: "", error: `Parse error: ${result.errors[0].message}` };
    }

    const allRows = result.data as string[][];
    if (allRows.length === 0) return { output: "", error: "No data found" };

    const headers = allRows[0];
    const rows = allRows.slice(1);

    return {
      output: raw,
      table: { headers, rows, rowCount: rows.length },
    };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Invalid CSV" };
  }
}

// ── Base64 ──────────────────────────────────────────────────────

export function base64Encode(raw: string, urlSafe: boolean = false): ConversionResult {
  if (!raw) return { output: "" };
  try {
    // Use TextEncoder for proper UTF-8 support
    const bytes = new TextEncoder().encode(raw);
    let base64 = btoa(String.fromCharCode(...bytes));
    if (urlSafe) {
      base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
    return { output: base64 };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Encoding failed" };
  }
}

export function base64Decode(raw: string): ConversionResult {
  if (!raw.trim()) return { output: "" };
  try {
    // Normalize URL-safe base64 back to standard
    let input = raw.trim().replace(/-/g, "+").replace(/_/g, "/");
    // Add padding if needed
    while (input.length % 4 !== 0) input += "=";

    const binary = atob(input);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const output = new TextDecoder("utf-8", { fatal: true }).decode(bytes);

    const isUrlSafe = raw.includes("-") || raw.includes("_");
    return { output, meta: { urlSafe: isUrlSafe } };
  } catch (e) {
    return { output: "", error: "Invalid Base64 input" };
  }
}

export function isBase64(str: string): boolean {
  if (!str.trim()) return false;
  const s = str.trim();
  // Standard or URL-safe base64 pattern (URL-safe may omit padding)
  return /^[A-Za-z0-9+/\-_]+=*$/.test(s) && s.length >= 4;
}

// ── SQL Formatter ───────────────────────────────────────────────

export type SqlDialect = "sql" | "postgresql" | "mysql" | "sqlite";
export type KeywordCase = "upper" | "lower" | "preserve";

export interface SqlFormatOptions {
  dialect: SqlDialect;
  indent: number;
  keywordCase: KeywordCase;
}

export function formatSql(
  raw: string,
  options: SqlFormatOptions = { dialect: "sql", indent: 2, keywordCase: "upper" }
): ConversionResult {
  if (!raw.trim()) return { output: "" };
  try {
    const output = sqlFormat(raw, {
      language: options.dialect as SqlLanguage,
      tabWidth: options.indent,
      keywordCase: options.keywordCase,
    });
    return { output };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Invalid SQL" };
  }
}
