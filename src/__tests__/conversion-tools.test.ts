import { describe, it, expect } from "vitest";
import {
  jsonToYaml,
  yamlToJson,
  csvToJson,
  base64Encode,
  base64Decode,
  isBase64,
  formatSql,
  parseCsvForTable,
} from "@/lib/conversion-tools";

// ── JSON ↔ YAML ─────────────────────────────────────────────────

describe("jsonToYaml", () => {
  it("converts simple JSON to YAML", () => {
    const result = jsonToYaml('{"name":"Alice","age":30}');
    expect(result.output).toContain("name: Alice");
    expect(result.output).toContain("age: 30");
    expect(result.error).toBeUndefined();
  });

  it("handles nested objects", () => {
    const result = jsonToYaml('{"a":{"b":{"c":1}}}');
    expect(result.output).toContain("a:");
    expect(result.output).toContain("b:");
    expect(result.output).toContain("c: 1");
  });

  it("handles arrays", () => {
    const result = jsonToYaml('[1,2,3]');
    expect(result.output).toContain("- 1");
    expect(result.output).toContain("- 2");
  });

  it("returns error for invalid JSON", () => {
    const result = jsonToYaml("{bad");
    expect(result.error).toBeDefined();
  });

  it("returns empty for empty input", () => {
    expect(jsonToYaml("").output).toBe("");
  });
});

describe("yamlToJson", () => {
  it("converts simple YAML to JSON", () => {
    const result = yamlToJson("name: Alice\nage: 30");
    expect(result.error).toBeUndefined();
    const parsed = JSON.parse(result.output);
    expect(parsed.name).toBe("Alice");
    expect(parsed.age).toBe(30);
  });

  it("handles nested YAML", () => {
    const result = yamlToJson("a:\n  b:\n    c: 1");
    const parsed = JSON.parse(result.output);
    expect(parsed.a.b.c).toBe(1);
  });

  it("respects indent option", () => {
    const result = yamlToJson("a: 1", 4);
    expect(result.output).toContain("    ");
  });

  it("returns error for invalid YAML", () => {
    const result = yamlToJson("  bad:\n bad: : :");
    // js-yaml may or may not error on this, but let's test something clearly broken
    const result2 = yamlToJson("{{{{");
    expect(result2.error).toBeDefined();
  });

  it("returns empty for empty input", () => {
    expect(yamlToJson("").output).toBe("");
  });
});

// ── CSV → JSON ──────────────────────────────────────────────────

describe("csvToJson", () => {
  it("converts CSV with header", () => {
    const result = csvToJson("name,age\nAlice,30\nBob,25");
    expect(result.error).toBeUndefined();
    const parsed = JSON.parse(result.output);
    expect(parsed).toHaveLength(2);
    expect(parsed[0].name).toBe("Alice");
  });

  it("infers numeric types", () => {
    const result = csvToJson("val\n42\n3.14", { hasHeader: true, inferTypes: true });
    const parsed = JSON.parse(result.output);
    expect(parsed[0].val).toBe(42);
    expect(parsed[1].val).toBe(3.14);
  });

  it("infers boolean types", () => {
    const result = csvToJson("flag\ntrue\nfalse", { hasHeader: true, inferTypes: true });
    const parsed = JSON.parse(result.output);
    expect(parsed[0].flag).toBe(true);
    expect(parsed[1].flag).toBe(false);
  });

  it("works without header row", () => {
    const result = csvToJson("Alice,30\nBob,25", { hasHeader: false, inferTypes: false });
    const parsed = JSON.parse(result.output);
    expect(parsed).toHaveLength(2);
    expect(Array.isArray(parsed[0])).toBe(true);
  });

  it("reports row count in meta", () => {
    const result = csvToJson("a\n1\n2\n3");
    expect(result.meta?.rowCount).toBe(3);
  });

  it("returns empty for empty input", () => {
    expect(csvToJson("").output).toBe("");
  });
});

// ── CSV Table parsing ───────────────────────────────────────────

describe("parseCsvForTable", () => {
  it("parses CSV into headers and rows", () => {
    const result = parseCsvForTable("name,age\nAlice,30\nBob,25");
    expect(result.table).toBeDefined();
    expect(result.table!.headers).toEqual(["name", "age"]);
    expect(result.table!.rows).toHaveLength(2);
    expect(result.table!.rowCount).toBe(2);
  });

  it("returns empty for empty input", () => {
    expect(parseCsvForTable("").output).toBe("");
  });
});

// ── Base64 ──────────────────────────────────────────────────────

describe("base64Encode", () => {
  it("encodes text to base64", () => {
    const result = base64Encode("Hello, World!");
    expect(result.output).toBe("SGVsbG8sIFdvcmxkIQ==");
  });

  it("encodes with URL-safe mode", () => {
    // A string that produces +/= in standard base64
    const result = base64Encode("subjects?_d", true);
    expect(result.output).not.toContain("+");
    expect(result.output).not.toContain("/");
    expect(result.output).not.toContain("=");
  });

  it("handles UTF-8 characters", () => {
    const result = base64Encode("Hello 🌍");
    expect(result.error).toBeUndefined();
    expect(result.output.length).toBeGreaterThan(0);
  });

  it("returns empty for empty input", () => {
    expect(base64Encode("").output).toBe("");
  });
});

describe("base64Decode", () => {
  it("decodes base64 to text", () => {
    const result = base64Decode("SGVsbG8sIFdvcmxkIQ==");
    expect(result.output).toBe("Hello, World!");
  });

  it("decodes URL-safe base64", () => {
    // First encode URL-safe, then decode
    const encoded = base64Encode("subjects?_d", true);
    const decoded = base64Decode(encoded.output);
    expect(decoded.output).toBe("subjects?_d");
    expect(decoded.meta?.urlSafe).toBe(true);
  });

  it("returns error for invalid base64", () => {
    const result = base64Decode("!!!not-base64!!!");
    expect(result.error).toBeDefined();
  });

  it("returns empty for empty input", () => {
    expect(base64Decode("").output).toBe("");
  });

  it("roundtrips with encode", () => {
    const original = "The quick brown fox jumps over the lazy dog";
    const encoded = base64Encode(original);
    const decoded = base64Decode(encoded.output);
    expect(decoded.output).toBe(original);
  });
});

describe("isBase64", () => {
  it("identifies valid base64", () => {
    expect(isBase64("SGVsbG8=")).toBe(true);
  });

  it("identifies URL-safe base64", () => {
    expect(isBase64("SGVsbG8")).toBe(true);
  });

  it("rejects non-base64", () => {
    expect(isBase64("hello world!@#")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(isBase64("")).toBe(false);
  });
});

// ── SQL Formatter ───────────────────────────────────────────────

describe("formatSql", () => {
  it("formats a simple SELECT", () => {
    const result = formatSql("select id, name from users where id = 1");
    expect(result.error).toBeUndefined();
    expect(result.output).toContain("SELECT");
    expect(result.output).toContain("FROM");
    expect(result.output).toContain("WHERE");
  });

  it("uppercases keywords by default", () => {
    const result = formatSql("select * from users");
    expect(result.output).toContain("SELECT");
    expect(result.output).toContain("FROM");
  });

  it("lowercases keywords when configured", () => {
    const result = formatSql("SELECT * FROM users", { dialect: "sql", indent: 2, keywordCase: "lower" });
    expect(result.output).toContain("select");
    expect(result.output).toContain("from");
  });

  it("handles different dialects", () => {
    const result = formatSql("SELECT * FROM users LIMIT 10", { dialect: "postgresql", indent: 2, keywordCase: "upper" });
    expect(result.error).toBeUndefined();
    expect(result.output).toContain("LIMIT");
  });

  it("returns empty for empty input", () => {
    expect(formatSql("").output).toBe("");
  });

  it("formats complex joins", () => {
    const sql = "select u.id, o.total from users u inner join orders o on u.id = o.user_id where o.total > 100";
    const result = formatSql(sql);
    expect(result.output).toContain("INNER JOIN");
    expect(result.output).toContain("ON");
  });
});
