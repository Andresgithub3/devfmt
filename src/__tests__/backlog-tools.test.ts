import { describe, it, expect } from "vitest";
import {
  computeDiff,
  urlEncode,
  urlDecode,
  htmlEncode,
  htmlDecode,
  markdownToHtml,
  htmlToMarkdown,
  testRegex,
  generateHash,
  generateUuid,
  generateBulkUuids,
  timestampToDate,
  dateToTimestamp,
  parseColor,
  decodeJwt,
  parseCron,
} from "@/lib/backlog-tools";

// ── Text Diff ───────────────────────────────────────────────────

describe("computeDiff", () => {
  it("detects additions in line mode", () => {
    const result = computeDiff("a\n", "a\nb\n", "lines");
    expect(result.additions).toBeGreaterThan(0);
  });

  it("detects deletions in line mode", () => {
    const result = computeDiff("a\nb\n", "a\n", "lines");
    expect(result.deletions).toBeGreaterThan(0);
  });

  it("detects word-level changes", () => {
    const result = computeDiff("hello world", "hello there", "words");
    expect(result.additions).toBeGreaterThan(0);
    expect(result.deletions).toBeGreaterThan(0);
  });

  it("handles identical inputs", () => {
    const result = computeDiff("same", "same", "lines");
    expect(result.additions).toBe(0);
    expect(result.deletions).toBe(0);
  });
});

// ── URL Encode / Decode ─────────────────────────────────────────

describe("urlEncode", () => {
  it("encodes special characters", () => {
    expect(urlEncode("hello world").output).toBe("hello%20world");
  });

  it("encodes query parameter characters", () => {
    expect(urlEncode("a=1&b=2").output).toBe("a%3D1%26b%3D2");
  });

  it("returns empty for empty input", () => {
    expect(urlEncode("").output).toBe("");
  });
});

describe("urlDecode", () => {
  it("decodes percent-encoded strings", () => {
    expect(urlDecode("hello%20world").output).toBe("hello world");
  });

  it("roundtrips with encode", () => {
    const original = "name=John Doe&city=New York";
    expect(urlDecode(urlEncode(original).output).output).toBe(original);
  });

  it("returns error for invalid encoding", () => {
    expect(urlDecode("%ZZ").error).toBeDefined();
  });

  it("returns empty for empty input", () => {
    expect(urlDecode("").output).toBe("");
  });
});

// ── HTML Entities ───────────────────────────────────────────────

describe("htmlEncode", () => {
  it("encodes angle brackets", () => {
    expect(htmlEncode("<div>").output).toBe("&lt;div&gt;");
  });

  it("encodes ampersands", () => {
    expect(htmlEncode("a & b").output).toBe("a &amp; b");
  });

  it("encodes quotes", () => {
    expect(htmlEncode('"hello"').output).toBe("&quot;hello&quot;");
  });

  it("returns empty for empty input", () => {
    expect(htmlEncode("").output).toBe("");
  });
});

describe("htmlDecode", () => {
  it("decodes named entities", () => {
    const result = htmlDecode("&lt;div&gt;");
    expect(result.output).toBe("<div>");
  });

  it("returns empty for empty input", () => {
    expect(htmlDecode("").output).toBe("");
  });
});

// ── Markdown ↔ HTML ─────────────────────────────────────────────

describe("markdownToHtml", () => {
  it("converts headings", () => {
    expect(markdownToHtml("# Hello").output).toContain("<h1>");
  });

  it("converts bold text", () => {
    expect(markdownToHtml("**bold**").output).toContain("<strong>");
  });

  it("converts links", () => {
    const result = markdownToHtml("[test](http://example.com)");
    expect(result.output).toContain("href");
  });

  it("returns empty for empty input", () => {
    expect(markdownToHtml("").output).toBe("");
  });
});

describe("htmlToMarkdown", () => {
  it("converts h1 tags", () => {
    expect(htmlToMarkdown("<h1>Hello</h1>").output).toContain("# Hello");
  });

  it("converts bold tags", () => {
    expect(htmlToMarkdown("<strong>bold</strong>").output).toContain("**bold**");
  });

  it("returns empty for empty input", () => {
    expect(htmlToMarkdown("").output).toBe("");
  });
});

// ── Regex Tester ────────────────────────────────────────────────

describe("testRegex", () => {
  it("finds matches with global flag", () => {
    const result = testRegex("\\d+", "g", "abc 123 def 456");
    expect(result.matches).toHaveLength(2);
    expect(result.matches[0].match).toBe("123");
    expect(result.matches[1].match).toBe("456");
  });

  it("captures named groups", () => {
    const result = testRegex("(?<year>\\d{4})-(?<month>\\d{2})", "g", "2024-01");
    expect(result.matches[0].groups?.year).toBe("2024");
    expect(result.matches[0].groups?.month).toBe("01");
  });

  it("returns error for invalid regex", () => {
    expect(testRegex("[invalid", "g", "test").error).toBeDefined();
  });

  it("returns empty for no input", () => {
    expect(testRegex("", "g", "test").matches).toHaveLength(0);
  });
});

// ── Hash Generator ──────────────────────────────────────────────

describe("generateHash", () => {
  it("generates SHA-256 hash", async () => {
    const result = await generateHash("hello", "SHA-256");
    expect(result.output).toBe("2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824");
  });

  it("generates SHA-1 hash", async () => {
    const result = await generateHash("hello", "SHA-1");
    expect(result.output).toBe("aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d");
  });

  it("returns empty for empty input", async () => {
    expect((await generateHash("", "SHA-256")).output).toBe("");
  });
});

// ── UUID Generator ──────────────────────────────────────────────

describe("generateUuid", () => {
  it("generates valid v4 UUID format", () => {
    const uuid = generateUuid();
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it("generates unique UUIDs", () => {
    const a = generateUuid();
    const b = generateUuid();
    expect(a).not.toBe(b);
  });
});

describe("generateBulkUuids", () => {
  it("generates correct number of UUIDs", () => {
    const result = generateBulkUuids(5);
    expect(result.split("\n")).toHaveLength(5);
  });
});

// ── Timestamp ───────────────────────────────────────────────────

describe("timestampToDate", () => {
  it("converts seconds timestamp", () => {
    const result = timestampToDate("0");
    expect(result.output).toContain("1970");
  });

  it("converts milliseconds timestamp", () => {
    const result = timestampToDate("1700000000000");
    expect(result.output).toContain("2023");
  });

  it("returns error for non-numeric input", () => {
    expect(timestampToDate("abc").error).toBeDefined();
  });

  it("returns empty for empty input", () => {
    expect(timestampToDate("").output).toBe("");
  });
});

describe("dateToTimestamp", () => {
  it("converts ISO date string", () => {
    const result = dateToTimestamp("2024-01-01T00:00:00Z");
    expect(result.output).toContain("1704067200");
  });

  it("returns error for invalid date", () => {
    expect(dateToTimestamp("not a date").error).toBeDefined();
  });
});

// ── Color Converter ─────────────────────────────────────────────

describe("parseColor", () => {
  it("parses hex colors", () => {
    const c = parseColor("#FF0000");
    expect(c).not.toBeNull();
    expect(c!.rgb).toEqual({ r: 255, g: 0, b: 0 });
    expect(c!.hsl.h).toBe(0);
  });

  it("parses 3-digit hex", () => {
    const c = parseColor("#F00");
    expect(c!.rgb).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("parses rgb() notation", () => {
    const c = parseColor("rgb(0, 128, 255)");
    expect(c!.hex).toBe("#0080FF");
  });

  it("parses hsl() notation", () => {
    const c = parseColor("hsl(0, 100%, 50%)");
    expect(c!.rgb).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("returns null for invalid input", () => {
    expect(parseColor("not a color")).toBeNull();
  });

  it("returns null for empty input", () => {
    expect(parseColor("")).toBeNull();
  });
});

// ── JWT Decoder ─────────────────────────────────────────────────

describe("decodeJwt", () => {
  // A known test JWT (not a real secret)
  const testJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

  it("decodes valid JWT", () => {
    const { result, error } = decodeJwt(testJwt);
    expect(error).toBeUndefined();
    expect(result!.header.alg).toBe("HS256");
    expect(result!.payload.name).toBe("John Doe");
  });

  it("returns error for non-3-part string", () => {
    expect(decodeJwt("not.a.jwt.token").error).toBeDefined();
  });

  it("returns error for invalid base64", () => {
    expect(decodeJwt("a.b.c").error).toBeDefined();
  });

  it("returns empty for empty input", () => {
    const { result, error } = decodeJwt("");
    expect(result).toBeUndefined();
    expect(error).toBeUndefined();
  });
});

// ── Cron Parser ─────────────────────────────────────────────────

describe("parseCron", () => {
  it("parses every minute", () => {
    const result = parseCron("* * * * *");
    expect(result.output.toLowerCase()).toContain("every minute");
  });

  it("parses daily at midnight", () => {
    const result = parseCron("0 0 * * *");
    expect(result.output).toBeTruthy();
  });

  it("returns error for invalid expression", () => {
    expect(parseCron("invalid").error).toBeDefined();
  });

  it("returns empty for empty input", () => {
    expect(parseCron("").output).toBe("");
  });
});
