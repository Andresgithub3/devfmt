import { describe, it, expect } from "vitest";
import { formatJson, minifyJson, flattenObject, jsonToCsv } from "@/lib/json-tools";

// ── formatJson ──────────────────────────────────────────────────

describe("formatJson", () => {
  it("formats minified JSON with 2-space indent", () => {
    const result = formatJson('{"a":1,"b":2}', "2");
    expect(result.output).toBe('{\n  "a": 1,\n  "b": 2\n}');
    expect(result.error).toBeUndefined();
  });

  it("formats with 4-space indent", () => {
    const result = formatJson('{"a":1}', "4");
    expect(result.output).toBe('{\n    "a": 1\n}');
  });

  it("formats with tab indent", () => {
    const result = formatJson('{"a":1}', "tab");
    expect(result.output).toBe('{\n\t"a": 1\n}');
  });

  it("returns error for invalid JSON", () => {
    const result = formatJson("{bad json", "2");
    expect(result.output).toBe("");
    expect(result.error).toBeDefined();
  });

  it("returns empty output for empty input", () => {
    const result = formatJson("", "2");
    expect(result.output).toBe("");
    expect(result.error).toBeUndefined();
  });

  it("handles deeply nested objects", () => {
    const input = '{"a":{"b":{"c":1}}}';
    const result = formatJson(input, "2");
    expect(result.output).toContain('"c": 1');
    expect(result.error).toBeUndefined();
  });

  it("handles arrays", () => {
    const result = formatJson("[1,2,3]", "2");
    expect(result.output).toBe("[\n  1,\n  2,\n  3\n]");
  });

  it("preserves unicode characters", () => {
    const result = formatJson('{"emoji":"🚀","kanji":"漢字"}', "2");
    expect(result.output).toContain("🚀");
    expect(result.output).toContain("漢字");
  });
});

// ── minifyJson ──────────────────────────────────────────────────

describe("minifyJson", () => {
  it("minifies formatted JSON", () => {
    const input = '{\n  "a": 1,\n  "b": 2\n}';
    const result = minifyJson(input);
    expect(result.output).toBe('{"a":1,"b":2}');
    expect(result.error).toBeUndefined();
  });

  it("reports bytes saved", () => {
    const input = '{\n  "a": 1,\n  "b": 2\n}';
    const result = minifyJson(input);
    expect(result.meta?.bytesSaved).toBeGreaterThan(0);
  });

  it("handles already minified JSON", () => {
    const input = '{"a":1}';
    const result = minifyJson(input);
    expect(result.output).toBe('{"a":1}');
    expect(result.meta?.bytesSaved).toBe(0);
  });

  it("returns error for invalid JSON", () => {
    const result = minifyJson("not json");
    expect(result.output).toBe("");
    expect(result.error).toBeDefined();
  });

  it("returns empty for empty input", () => {
    const result = minifyJson("");
    expect(result.output).toBe("");
  });
});

// ── flattenObject ───────────────────────────────────────────────

describe("flattenObject", () => {
  it("flattens nested objects with dot notation", () => {
    const result = flattenObject({ a: { b: { c: 1 } } });
    expect(result).toEqual({ "a.b.c": "1" });
  });

  it("handles null values", () => {
    const result = flattenObject({ a: null });
    expect(result).toEqual({ a: "" });
  });

  it("stringifies arrays", () => {
    const result = flattenObject({ tags: [1, 2, 3] });
    expect(result).toEqual({ tags: "[1,2,3]" });
  });

  it("handles flat objects", () => {
    const result = flattenObject({ name: "Alice", age: 30 });
    expect(result).toEqual({ name: "Alice", age: "30" });
  });

  it("handles mixed nesting", () => {
    const result = flattenObject({
      name: "Alice",
      address: { city: "NYC", zip: "10001" },
    });
    expect(result).toEqual({
      name: "Alice",
      "address.city": "NYC",
      "address.zip": "10001",
    });
  });
});

// ── jsonToCsv ───────────────────────────────────────────────────

describe("jsonToCsv", () => {
  it("converts a simple array of objects", () => {
    const input = '[{"name":"Alice","age":30},{"name":"Bob","age":25}]';
    const result = jsonToCsv(input, ",");
    expect(result.output).toContain("name,age");
    expect(result.output).toContain("Alice,30");
    expect(result.output).toContain("Bob,25");
    expect(result.error).toBeUndefined();
  });

  it("handles tab delimiter", () => {
    const input = '[{"a":1,"b":2}]';
    const result = jsonToCsv(input, "\t");
    expect(result.output).toContain("a\tb");
    expect(result.output).toContain("1\t2");
  });

  it("handles semicolon delimiter", () => {
    const input = '[{"a":1,"b":2}]';
    const result = jsonToCsv(input, ";");
    expect(result.output).toContain("a;b");
  });

  it("flattens nested objects", () => {
    const input = '[{"name":"Alice","address":{"city":"NYC"}}]';
    const result = jsonToCsv(input, ",");
    expect(result.output).toContain("address.city");
    expect(result.output).toContain("NYC");
  });

  it("wraps single object in array", () => {
    const input = '{"name":"Alice","age":30}';
    const result = jsonToCsv(input, ",");
    expect(result.output).toContain("name,age");
    expect(result.output).toContain("Alice,30");
    expect(result.meta?.rowCount).toBe(1);
  });

  it("returns error for empty array", () => {
    const result = jsonToCsv("[]", ",");
    expect(result.error).toContain("Empty array");
  });

  it("returns error for primitive values", () => {
    const result = jsonToCsv("42", ",");
    expect(result.error).toContain("must be a JSON array or object");
  });

  it("returns error for invalid JSON", () => {
    const result = jsonToCsv("{bad", ",");
    expect(result.error).toBeDefined();
  });

  it("handles array of primitives", () => {
    const result = jsonToCsv("[1,2,3]", ",");
    expect(result.output).toContain("value");
    expect(result.output).toContain("1");
    expect(result.output).toContain("2");
    expect(result.output).toContain("3");
  });

  it("reports row count in meta", () => {
    const input = '[{"a":1},{"a":2},{"a":3}]';
    const result = jsonToCsv(input, ",");
    expect(result.meta?.rowCount).toBe(3);
  });
});
