import Papa from "papaparse";

export type IndentType = "2" | "4" | "tab";
export type Delimiter = "," | "\t" | ";";

export interface ConversionResult {
  output: string;
  error?: string;
  meta?: Record<string, unknown>;
}

/** Format (prettify) a JSON string. */
export function formatJson(raw: string, indent: IndentType): ConversionResult {
  if (!raw.trim()) return { output: "" };

  try {
    const parsed = JSON.parse(raw);
    const indentValue = indent === "tab" ? "\t" : Number(indent);
    return { output: JSON.stringify(parsed, null, indentValue) };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Invalid JSON" };
  }
}

/** Minify a JSON string to a single line. */
export function minifyJson(raw: string): ConversionResult {
  if (!raw.trim()) return { output: "" };

  try {
    const parsed = JSON.parse(raw);
    const minified = JSON.stringify(parsed);
    const inputBytes = new Blob([raw]).size;
    const outputBytes = new Blob([minified]).size;
    const saved = inputBytes - outputBytes;

    return {
      output: minified,
      meta: { bytesSaved: saved, inputBytes, outputBytes },
    };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Invalid JSON" };
  }
}

/** Flatten a nested object into dot-notation keys. */
export function flattenObject(
  obj: Record<string, unknown>,
  prefix = ""
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (value === null || value === undefined) {
      result[path] = "";
    } else if (Array.isArray(value)) {
      result[path] = JSON.stringify(value);
    } else if (typeof value === "object") {
      Object.assign(result, flattenObject(value as Record<string, unknown>, path));
    } else {
      result[path] = String(value);
    }
  }

  return result;
}

/** Convert a JSON array (or single object) to CSV. */
export function jsonToCsv(raw: string, delimiter: Delimiter): ConversionResult {
  if (!raw.trim()) return { output: "" };

  try {
    const parsed = JSON.parse(raw);

    let rows: Record<string, string>[];

    if (Array.isArray(parsed)) {
      if (parsed.length === 0) {
        return { output: "", error: "Empty array — nothing to convert" };
      }
      rows = parsed.map((item) =>
        typeof item === "object" && item !== null
          ? flattenObject(item as Record<string, unknown>)
          : { value: String(item) }
      );
    } else if (typeof parsed === "object" && parsed !== null) {
      rows = [flattenObject(parsed as Record<string, unknown>)];
    } else {
      return { output: "", error: "Input must be a JSON array or object" };
    }

    const csv = Papa.unparse(rows, { delimiter });
    return { output: csv, meta: { rowCount: rows.length } };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Invalid JSON" };
  }
}
