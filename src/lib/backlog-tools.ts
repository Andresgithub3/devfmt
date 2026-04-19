import { diffLines, diffWords, type Change } from "diff";
import { marked } from "marked";
import TurndownService from "turndown";
import cronstrue from "cronstrue";

export interface ConversionResult {
  output: string;
  error?: string;
  meta?: Record<string, unknown>;
}

// ── Text Diff ───────────────────────────────────────────────────

export type DiffMode = "lines" | "words";

export interface DiffResult {
  changes: Change[];
  additions: number;
  deletions: number;
}

export function computeDiff(left: string, right: string, mode: DiffMode): DiffResult {
  const changes = mode === "lines" ? diffLines(left, right) : diffWords(left, right);
  let additions = 0;
  let deletions = 0;
  for (const c of changes) {
    if (c.added) additions += c.count ?? 0;
    if (c.removed) deletions += c.count ?? 0;
  }
  return { changes, additions, deletions };
}

// ── URL Encode / Decode ─────────────────────────────────────────

export function urlEncode(raw: string, component: boolean = true): ConversionResult {
  if (!raw) return { output: "" };
  try {
    const output = component ? encodeURIComponent(raw) : encodeURI(raw);
    return { output };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Encoding failed" };
  }
}

export function urlDecode(raw: string, component: boolean = true): ConversionResult {
  if (!raw.trim()) return { output: "" };
  try {
    const output = component ? decodeURIComponent(raw) : decodeURI(raw);
    return { output };
  } catch (e) {
    return { output: "", error: "Invalid URL-encoded input" };
  }
}

// ── HTML Entity Encode / Decode ─────────────────────────────────

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function htmlEncode(raw: string): ConversionResult {
  if (!raw) return { output: "" };
  const output = raw.replace(/[&<>"']/g, (ch) => HTML_ENTITIES[ch] ?? ch);
  return { output };
}

export function htmlDecode(raw: string): ConversionResult {
  if (!raw.trim()) return { output: "" };
  try {
    const textarea = typeof document !== "undefined"
      ? document.createElement("textarea")
      : null;
    if (textarea) {
      textarea.innerHTML = raw;
      return { output: textarea.value };
    }
    // Fallback for SSR
    const output = raw
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
      .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
    return { output };
  } catch {
    return { output: "", error: "Failed to decode HTML entities" };
  }
}

// ── Markdown → HTML ─────────────────────────────────────────────

export function markdownToHtml(raw: string): ConversionResult {
  if (!raw.trim()) return { output: "" };
  try {
    const output = marked.parse(raw, { async: false }) as string;
    return { output };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Markdown parse error" };
  }
}

// ── HTML → Markdown ─────────────────────────────────────────────

export function htmlToMarkdown(raw: string): ConversionResult {
  if (!raw.trim()) return { output: "" };
  try {
    const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
    const output = td.turndown(raw);
    return { output };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Conversion failed" };
  }
}

// ── Regex Tester ────────────────────────────────────────────────

export interface RegexMatch {
  match: string;
  index: number;
  groups: Record<string, string> | null;
}

export function testRegex(
  pattern: string,
  flags: string,
  input: string
): { matches: RegexMatch[]; error?: string } {
  if (!pattern || !input) return { matches: [] };
  try {
    const re = new RegExp(pattern, flags);
    const matches: RegexMatch[] = [];
    if (flags.includes("g")) {
      let m: RegExpExecArray | null;
      while ((m = re.exec(input)) !== null) {
        matches.push({
          match: m[0],
          index: m.index,
          groups: m.groups ? { ...m.groups } : null,
        });
        if (!m[0]) re.lastIndex++; // avoid infinite loop on zero-width match
      }
    } else {
      const m = re.exec(input);
      if (m) {
        matches.push({
          match: m[0],
          index: m.index,
          groups: m.groups ? { ...m.groups } : null,
        });
      }
    }
    return { matches };
  } catch (e) {
    return { matches: [], error: e instanceof Error ? e.message : "Invalid regex" };
  }
}

// ── Hash Generator ──────────────────────────────────────────────

export type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-512";

export async function generateHash(
  input: string,
  algorithm: HashAlgorithm
): Promise<ConversionResult> {
  if (!input) return { output: "" };
  try {
    const data = new TextEncoder().encode(input);
    const buffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(buffer));
    const output = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return { output };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Hashing failed" };
  }
}

// ── UUID Generator ──────────────────────────────────────────────

export function generateUuid(): string {
  return crypto.randomUUID();
}

export function generateBulkUuids(count: number): string {
  return Array.from({ length: count }, () => crypto.randomUUID()).join("\n");
}

// ── Unix Timestamp ──────────────────────────────────────────────

export function timestampToDate(ts: string): ConversionResult {
  if (!ts.trim()) return { output: "" };
  const num = Number(ts.trim());
  if (isNaN(num)) return { output: "", error: "Invalid timestamp — must be a number" };

  // Auto-detect seconds vs milliseconds
  const ms = num > 1e12 ? num : num * 1000;
  const date = new Date(ms);
  if (isNaN(date.getTime())) return { output: "", error: "Invalid timestamp value" };

  const iso = date.toISOString();
  const local = date.toLocaleString();
  const utc = date.toUTCString();
  const relative = getRelativeTime(date);

  const output = [
    `ISO 8601:  ${iso}`,
    `UTC:       ${utc}`,
    `Local:     ${local}`,
    `Relative:  ${relative}`,
    ``,
    `Unix (s):  ${Math.floor(ms / 1000)}`,
    `Unix (ms): ${ms}`,
  ].join("\n");

  return { output, meta: { isMilliseconds: num > 1e12 } };
}

export function dateToTimestamp(dateStr: string): ConversionResult {
  if (!dateStr.trim()) return { output: "" };
  const date = new Date(dateStr.trim());
  if (isNaN(date.getTime())) return { output: "", error: "Invalid date string" };

  const s = Math.floor(date.getTime() / 1000);
  const ms = date.getTime();
  const output = [
    `Unix (s):  ${s}`,
    `Unix (ms): ${ms}`,
    `ISO 8601:  ${date.toISOString()}`,
  ].join("\n");

  return { output };
}

function getRelativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const abs = Math.abs(diff);
  const future = diff < 0;
  const suffix = future ? "from now" : "ago";

  if (abs < 60_000) return `${Math.floor(abs / 1000)} seconds ${suffix}`;
  if (abs < 3_600_000) return `${Math.floor(abs / 60_000)} minutes ${suffix}`;
  if (abs < 86_400_000) return `${Math.floor(abs / 3_600_000)} hours ${suffix}`;
  if (abs < 2_592_000_000) return `${Math.floor(abs / 86_400_000)} days ${suffix}`;
  if (abs < 31_536_000_000) return `${Math.floor(abs / 2_592_000_000)} months ${suffix}`;
  return `${Math.floor(abs / 31_536_000_000)} years ${suffix}`;
}

// ── Color Converter ─────────────────────────────────────────────

export interface ColorValues {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

export function parseColor(input: string): ColorValues | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Try hex
  const hexMatch = trimmed.match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { hex: `#${hex.toUpperCase()}`, rgb: { r, g, b }, hsl: rgbToHsl(r, g, b) };
  }

  // Try rgb(r, g, b)
  const rgbMatch = trimmed.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/);
  if (rgbMatch) {
    const r = Math.min(255, Number(rgbMatch[1]));
    const g = Math.min(255, Number(rgbMatch[2]));
    const b = Math.min(255, Number(rgbMatch[3]));
    const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
    return { hex, rgb: { r, g, b }, hsl: rgbToHsl(r, g, b) };
  }

  // Try hsl(h, s%, l%)
  const hslMatch = trimmed.match(/^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?/);
  if (hslMatch) {
    const h = Number(hslMatch[1]) % 360;
    const s = Math.min(100, Number(hslMatch[2]));
    const l = Math.min(100, Number(hslMatch[3]));
    const { r, g, b } = hslToRgb(h, s, l);
    const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
    return { hex, rgb: { r, g, b }, hsl: { h, s, l } };
  }

  return null;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

// ── JWT Decoder ─────────────────────────────────────────────────

export interface JwtParts {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

export function decodeJwt(token: string): { result?: JwtParts; error?: string } {
  const trimmed = token.trim();
  if (!trimmed) return {};

  const parts = trimmed.split(".");
  if (parts.length !== 3) return { error: "Invalid JWT — expected 3 dot-separated parts" };

  try {
    const decodeBase64Url = (s: string) => {
      let base64 = s.replace(/-/g, "+").replace(/_/g, "/");
      while (base64.length % 4 !== 0) base64 += "=";
      return JSON.parse(atob(base64));
    };

    const header = decodeBase64Url(parts[0]);
    const payload = decodeBase64Url(parts[1]);
    return { result: { header, payload, signature: parts[2] } };
  } catch {
    return { error: "Failed to decode JWT — invalid Base64 or JSON" };
  }
}

// ── Cron Expression Parser ──────────────────────────────────────

export function parseCron(expression: string): ConversionResult {
  if (!expression.trim()) return { output: "" };
  try {
    const description = cronstrue.toString(expression.trim());
    return { output: description };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Invalid cron expression" };
  }
}
