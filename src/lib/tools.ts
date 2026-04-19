export interface Tool {
  name: string;
  slug: string;
  href: string;
  category: string;
  description: string;
  keywords: string[];
  relatedTools: string[];
  faq: { q: string; a: string }[];
  content: string;
}

export const TOOLS: Tool[] = [
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    href: "/json/formatter",
    category: "JSON",
    description: "Beautify & validate JSON with configurable indentation",
    keywords: ["json formatter", "json beautifier", "json pretty print", "format json online"],
    relatedTools: ["/json/minifier", "/json/to-csv", "/json/to-yaml"],
    faq: [
      { q: "How do I format JSON online?", a: "Paste your raw or minified JSON into the input panel. DevFmt instantly formats it with syntax validation, configurable indentation (2 spaces, 4 spaces, or tabs), and line numbers. No signup required." },
      { q: "Does this tool validate JSON?", a: "Yes. If your JSON has syntax errors, the status bar shows the exact error message with position information so you can fix the issue quickly." },
      { q: "Is my JSON data sent to a server?", a: "No. All formatting happens entirely in your browser using JavaScript. Your data never leaves your machine — we don't send, store, or log any input." },
      { q: "Can I format large JSON files?", a: "Yes. The formatter handles files of several megabytes directly in the browser. For very large files, use the file upload button instead of pasting." },
    ],
    content: `JSON Formatter is a free online tool that beautifies and validates JSON data instantly in your browser. Paste raw, minified, or compact JSON and get perfectly indented output with your choice of 2 spaces, 4 spaces, or tab indentation.

The formatter validates your JSON in real-time. If your input contains syntax errors — missing commas, unmatched brackets, or invalid escape sequences — you'll see the exact error message in the status bar so you can fix problems fast.

**Key features:** configurable indentation, real-time syntax validation, file upload support (.json files), one-click copy and download, line numbers, and byte-size comparison between input and output.

All processing happens client-side in your browser. Your data is never sent to any server, making this tool safe for sensitive configuration files, API responses, and production data. DevFmt is built for developers who need a fast, private JSON formatting tool without signup walls or ads blocking the interface.`,
  },
  {
    name: "JSON Minifier",
    slug: "json-minifier",
    href: "/json/minifier",
    category: "JSON",
    description: "Compress JSON by removing all whitespace",
    keywords: ["json minifier", "json compressor", "minify json online", "compress json"],
    relatedTools: ["/json/formatter", "/json/to-csv", "/json/to-yaml"],
    faq: [
      { q: "What does JSON minification do?", a: "JSON minification removes all unnecessary whitespace, newlines, and indentation from your JSON, producing the most compact valid representation. This reduces file size for storage and network transfer." },
      { q: "How much space does minification save?", a: "Typically 20-60% depending on how much whitespace the original JSON contains. The status bar shows exact bytes saved and the percentage reduction." },
      { q: "Does minification change the data?", a: "No. Minification only removes whitespace. The data structure, values, and keys remain exactly the same. You can re-format the minified output and get identical data." },
    ],
    content: `JSON Minifier compresses JSON by stripping all unnecessary whitespace, newlines, and indentation. The result is a single-line, compact JSON string — ideal for reducing payload size in API responses, configuration files, and data storage.

Paste formatted JSON into the input panel and instantly see the minified output. The status bar shows you exactly how many bytes were saved and the compression percentage so you can measure the impact.

**Key features:** instant minification, byte savings display with percentage, one-click copy, download as file, and real-time validation. If your input JSON is invalid, you'll see the error immediately.

All processing runs locally in your browser — no data is ever sent to a server. This makes the tool safe for minifying sensitive production JSON, API keys in configuration, or any data you don't want leaving your machine.`,
  },
  {
    name: "JSON to CSV",
    slug: "json-to-csv",
    href: "/json/to-csv",
    category: "JSON",
    description: "Convert JSON arrays to CSV with nested object support",
    keywords: ["json to csv", "convert json to csv online", "json to csv converter", "json array to csv"],
    relatedTools: ["/csv/to-json", "/json/formatter", "/csv/formatter"],
    faq: [
      { q: "How do I convert JSON to CSV?", a: "Paste a JSON array of objects into the input panel. DevFmt automatically extracts headers from the object keys and converts each object to a CSV row. Nested objects are flattened using dot notation (e.g., address.city)." },
      { q: "Can it handle nested JSON objects?", a: "Yes. Nested objects are flattened with dot-notation keys (e.g., 'user.address.city'). Arrays within objects are serialized as JSON strings in the CSV cell." },
      { q: "What delimiters are supported?", a: "Comma (default), tab, and semicolon. Use the delimiter selector in the toolbar to switch between them." },
      { q: "Can I convert a single JSON object?", a: "Yes. A single object is automatically wrapped into a one-row CSV with the object's keys as headers." },
    ],
    content: `JSON to CSV Converter transforms JSON arrays of objects into clean CSV format. Paste a JSON array and get properly formatted CSV with headers automatically derived from object keys.

The converter handles nested objects by flattening them with dot notation — for example, \`{"user": {"name": "Alice"}}\` becomes a column \`user.name\`. Arrays within objects are serialized as JSON strings so no data is lost in the conversion.

**Key features:** automatic header extraction, nested object flattening, configurable delimiters (comma, tab, semicolon), single-object support, download as .csv file, and row count display.

Choose between comma, tab, or semicolon delimiters depending on your use case. Tab-separated values work well for pasting into spreadsheets, while semicolons are common in European locales where commas are decimal separators.

All conversion runs locally in your browser — your data stays private and is never uploaded to any server.`,
  },
  {
    name: "JSON to YAML",
    slug: "json-to-yaml",
    href: "/json/to-yaml",
    category: "JSON",
    description: "Convert JSON to YAML format",
    keywords: ["json to yaml", "convert json to yaml", "json to yaml converter"],
    relatedTools: ["/yaml/to-json", "/json/formatter", "/json/to-csv"],
    faq: [
      { q: "How do I convert JSON to YAML?", a: "Paste your JSON into the input panel and the YAML output appears instantly. The converter handles nested objects, arrays, and all standard JSON data types." },
      { q: "Why convert JSON to YAML?", a: "YAML is more human-readable than JSON for configuration files. It's the standard format for Kubernetes manifests, Docker Compose files, CI/CD pipelines, and many other DevOps tools." },
      { q: "Does the converter handle complex nested structures?", a: "Yes. Deeply nested objects, arrays of objects, mixed types, and multi-line strings are all converted correctly to proper YAML syntax." },
    ],
    content: `JSON to YAML Converter transforms JSON data into clean, properly indented YAML format. This is useful when migrating configuration from JSON-based systems to YAML-based tools like Kubernetes, Docker Compose, Ansible, or GitHub Actions.

Paste any valid JSON — objects, arrays, nested structures — and get correctly formatted YAML output instantly. The converter preserves all data types and handles edge cases like null values, boolean literals, and numeric types.

**Key features:** handles nested objects and arrays, proper YAML indentation, one-click copy and download, real-time conversion, and file upload support.

All conversion happens client-side in your browser. No data is transmitted to any server, making this safe for converting sensitive configuration files and credentials.`,
  },
  {
    name: "CSV to JSON",
    slug: "csv-to-json",
    href: "/csv/to-json",
    category: "CSV",
    description: "Convert CSV to JSON with type inference",
    keywords: ["csv to json", "csv to json converter", "convert csv to json online"],
    relatedTools: ["/json/to-csv", "/csv/formatter", "/json/formatter"],
    faq: [
      { q: "How do I convert CSV to JSON?", a: "Paste your CSV data into the input panel. DevFmt auto-detects the delimiter and converts each row to a JSON object using the header row as keys. The output is a JSON array of objects." },
      { q: "Does it auto-detect data types?", a: "Yes. With 'Infer Types' enabled (default), numbers become JSON numbers and 'true'/'false' become JSON booleans. Toggle it off to keep everything as strings." },
      { q: "What if my CSV doesn't have a header row?", a: "Toggle off 'Header Row' in the toolbar. The output will be a JSON array of arrays instead of objects." },
      { q: "What delimiters are supported?", a: "The parser auto-detects commas, tabs, semicolons, and pipes. No manual configuration needed in most cases." },
    ],
    content: `CSV to JSON Converter transforms CSV data into a JSON array of objects. Paste comma-separated, tab-separated, or semicolon-separated data and get properly structured JSON output.

The converter uses the first row as headers by default, creating JSON objects with those keys. Toggle "Header Row" off if your CSV doesn't have headers — the output becomes an array of arrays instead.

**Key features:** automatic delimiter detection, type inference (numbers and booleans), header row toggle, file upload support, and real-time conversion with row/column counts in the status bar.

Type inference is enabled by default: numeric strings become JSON numbers, and "true"/"false" become JSON booleans. Disable it if you need all values as strings.

All processing runs entirely in your browser using PapaParse — no data is sent to any server.`,
  },
  {
    name: "CSV Viewer",
    slug: "csv-viewer",
    href: "/csv/formatter",
    category: "CSV",
    description: "View, sort, and filter CSV data in a table",
    keywords: ["csv viewer online", "csv formatter", "view csv file", "csv table viewer"],
    relatedTools: ["/csv/to-json", "/json/to-csv"],
    faq: [
      { q: "How do I view a CSV file online?", a: "Paste CSV text or upload a .csv file. DevFmt renders it as an interactive table with sortable columns, row filtering, and row numbers." },
      { q: "Can I sort and filter the data?", a: "Yes. Click any column header to sort ascending/descending. Use the filter box to search across all columns — only matching rows are displayed." },
      { q: "Can I export the filtered data?", a: "Yes. Click the Export button to download the currently visible (filtered/sorted) rows as a new CSV file." },
    ],
    content: `CSV Viewer renders your CSV data as an interactive, sortable table directly in the browser. Paste CSV text or upload a file to instantly see your data in a clean, readable format.

Click any column header to sort the table by that column — click again to reverse the sort order. Numeric columns are sorted numerically, text columns alphabetically. Use the filter box to search across all columns and narrow down to the rows you need.

**Key features:** sortable columns, full-text row filtering, row numbers, zebra-striped rows for readability, and CSV export of filtered results.

The export button downloads the currently visible rows as a clean CSV file — useful for extracting subsets of large datasets without writing code.

All rendering and sorting happens locally in your browser. Your CSV data is never uploaded to any server.`,
  },
  {
    name: "Base64 Encode",
    slug: "base64-encode",
    href: "/base64/encode",
    category: "Base64",
    description: "Encode text or files to Base64",
    keywords: ["base64 encode", "base64 encoder", "text to base64", "base64 converter"],
    relatedTools: ["/base64/decode"],
    faq: [
      { q: "How do I encode text to Base64?", a: "Paste or type text into the input panel. The Base64-encoded output appears instantly. Toggle 'URL-safe' mode for URL-safe Base64 encoding that replaces + with - and / with _." },
      { q: "What is URL-safe Base64?", a: "URL-safe Base64 replaces + with -, / with _, and removes trailing = padding. This makes the output safe for use in URLs, filenames, and query parameters without additional encoding." },
      { q: "Does it support UTF-8?", a: "Yes. The encoder handles full UTF-8 text including emojis, CJK characters, and accented letters." },
    ],
    content: `Base64 Encoder converts text to Base64 encoding instantly in your browser. Supports standard Base64 and URL-safe Base64 variants.

Paste text into the input panel and the encoded output appears in real-time. Toggle URL-safe mode to produce output suitable for URLs, filenames, and query parameters — it replaces + with -, / with _, and strips trailing = padding.

**Key features:** standard and URL-safe Base64 encoding, full UTF-8 support (emojis, international characters), file upload, one-click copy, and download.

All encoding runs locally in your browser. Your data is never sent to any server.`,
  },
  {
    name: "Base64 Decode",
    slug: "base64-decode",
    href: "/base64/decode",
    category: "Base64",
    description: "Decode Base64 strings to text",
    keywords: ["base64 decode", "base64 decoder", "base64 to text", "base64 converter"],
    relatedTools: ["/base64/encode"],
    faq: [
      { q: "How do I decode Base64?", a: "Paste a Base64 string into the input panel. The decoded text output appears instantly. The tool auto-detects URL-safe Base64 encoding." },
      { q: "Does it handle URL-safe Base64?", a: "Yes. The decoder automatically detects and handles URL-safe Base64 (with - and _ characters) and adds missing padding as needed." },
      { q: "What if my Base64 string is invalid?", a: "The status bar shows an error message. Common issues include extra whitespace, line breaks, or non-Base64 characters in the input." },
    ],
    content: `Base64 Decoder converts Base64-encoded strings back to readable text. Supports both standard and URL-safe Base64 formats with automatic detection.

Paste a Base64 string and see the decoded output instantly. The decoder handles URL-safe variants automatically — it detects the use of - and _ characters and normalizes padding before decoding.

**Key features:** automatic URL-safe detection, UTF-8 output support, error reporting for invalid input, one-click copy, and download.

All decoding happens locally in your browser. No data is ever sent to a server.`,
  },
  {
    name: "SQL Formatter",
    slug: "sql-formatter",
    href: "/sql/formatter",
    category: "SQL",
    description: "Beautify SQL queries with dialect support",
    keywords: ["sql formatter", "sql beautifier", "format sql online", "sql pretty print"],
    relatedTools: [],
    faq: [
      { q: "How do I format SQL online?", a: "Paste your SQL query into the input panel. DevFmt formats it with proper indentation and keyword uppercasing. Choose your SQL dialect (Standard, PostgreSQL, MySQL, SQLite) for accurate formatting." },
      { q: "What SQL dialects are supported?", a: "Standard SQL, PostgreSQL, MySQL, and SQLite. Each dialect handles its specific syntax and keywords correctly." },
      { q: "Can I control keyword casing?", a: "Yes. Choose between UPPER case (default), lower case, or preserve the original casing of SQL keywords." },
      { q: "Does it handle complex queries?", a: "Yes. The formatter handles JOINs, subqueries, CTEs (WITH clauses), window functions, UNION, and other complex SQL constructs." },
    ],
    content: `SQL Formatter beautifies SQL queries with proper indentation, keyword formatting, and dialect-aware syntax handling. Supports Standard SQL, PostgreSQL, MySQL, and SQLite.

Paste any SQL query — from simple SELECTs to complex multi-table JOINs with subqueries — and get clean, readable output instantly. Configure keyword casing (UPPER, lower, or as-is) and indentation (2 or 4 spaces) to match your team's style guide.

**Key features:** 4 SQL dialect modes, configurable keyword casing, adjustable indentation, support for complex queries (JOINs, CTEs, subqueries, window functions), one-click copy, and download.

All formatting runs locally in your browser using the sql-formatter library. Your queries are never sent to any server — safe for formatting production SQL containing table names, column names, or sensitive query patterns.`,
  },
  {
    name: "YAML to JSON",
    slug: "yaml-to-json",
    href: "/yaml/to-json",
    category: "YAML",
    description: "Convert YAML to JSON format",
    keywords: ["yaml to json", "convert yaml to json", "yaml to json converter"],
    relatedTools: ["/json/to-yaml", "/json/formatter"],
    faq: [
      { q: "How do I convert YAML to JSON?", a: "Paste your YAML into the input panel and JSON output appears instantly. Choose 2 or 4 space indentation for the JSON output." },
      { q: "Why convert YAML to JSON?", a: "JSON is the standard format for APIs, JavaScript applications, and many tools that don't accept YAML. Converting lets you use YAML configuration in JSON-only contexts." },
      { q: "Does it handle all YAML features?", a: "It supports standard YAML features including nested objects, arrays, multi-line strings, anchors, and all data types. Advanced YAML features like custom tags are simplified during conversion." },
    ],
    content: `YAML to JSON Converter transforms YAML data into clean, properly indented JSON. Useful when you need to convert Kubernetes manifests, Docker Compose files, or CI/CD configurations into JSON for APIs or other tools.

Paste any valid YAML and get correctly formatted JSON output. Choose between 2-space and 4-space indentation. The converter handles nested objects, arrays, multi-line strings, and all standard YAML data types.

**Key features:** configurable JSON indentation (2/4 spaces), full YAML spec support, one-click copy and download, real-time conversion, and file upload support.

All conversion happens client-side in your browser. No data is ever transmitted to any server.`,
  },
  // ── Post-launch backlog tools ─────────────────────────────────
  {
    name: "Text Diff",
    slug: "text-diff",
    href: "/diff",
    category: "Text",
    description: "Compare two texts and highlight differences",
    keywords: ["text diff", "text compare", "diff tool online", "compare text"],
    relatedTools: [],
    faq: [],
    content: "Text Diff compares two text inputs side by side and highlights additions and deletions. Choose between line-by-line or word-by-word diff modes. All processing is local.",
  },
  {
    name: "URL Encode",
    slug: "url-encode",
    href: "/url/encode",
    category: "URL",
    description: "Percent-encode text for safe use in URLs",
    keywords: ["url encode", "url encoder", "percent encode", "encodeURIComponent"],
    relatedTools: ["/url/decode"],
    faq: [],
    content: "URL Encoder converts text to percent-encoded format safe for use in URLs, query parameters, and form data. Uses encodeURIComponent for full encoding.",
  },
  {
    name: "URL Decode",
    slug: "url-decode",
    href: "/url/decode",
    category: "URL",
    description: "Decode percent-encoded URL strings",
    keywords: ["url decode", "url decoder", "percent decode", "decodeURIComponent"],
    relatedTools: ["/url/encode"],
    faq: [],
    content: "URL Decoder converts percent-encoded strings back to readable text. Handles both encodeURIComponent and encodeURI encoded strings.",
  },
  {
    name: "HTML Encode",
    slug: "html-encode",
    href: "/html/encode",
    category: "HTML",
    description: "Escape special characters to HTML entities",
    keywords: ["html encode", "html entity encode", "html escape", "html special characters"],
    relatedTools: ["/html/decode", "/html/to-markdown"],
    faq: [],
    content: "HTML Entity Encoder converts special characters like <, >, &, and quotes into their HTML entity equivalents. Essential for safely embedding user content in HTML.",
  },
  {
    name: "HTML Decode",
    slug: "html-decode",
    href: "/html/decode",
    category: "HTML",
    description: "Decode HTML entities back to text",
    keywords: ["html decode", "html entity decode", "html unescape", "decode html entities"],
    relatedTools: ["/html/encode", "/html/to-markdown"],
    faq: [],
    content: "HTML Entity Decoder converts HTML entities like &amp;lt; and &amp;amp; back to their original characters. Handles named entities, decimal, and hexadecimal numeric references.",
  },
  {
    name: "Markdown to HTML",
    slug: "markdown-to-html",
    href: "/markdown/to-html",
    category: "Markdown",
    description: "Convert Markdown to HTML",
    keywords: ["markdown to html", "convert markdown to html", "markdown converter", "md to html"],
    relatedTools: ["/html/to-markdown"],
    faq: [],
    content: "Markdown to HTML Converter transforms Markdown syntax into clean HTML. Supports headings, lists, links, images, code blocks, tables, and all standard Markdown features.",
  },
  {
    name: "Regex Tester",
    slug: "regex-tester",
    href: "/regex",
    category: "Text",
    description: "Test regular expressions with live matching",
    keywords: ["regex tester", "regex test online", "regular expression tester", "regex match"],
    relatedTools: [],
    faq: [],
    content: "Regex Tester lets you write and test regular expressions with real-time matching. See all matches highlighted with their positions and captured groups. Supports global, case-insensitive, multiline, and dotAll flags.",
  },
  {
    name: "Hash Generator",
    slug: "hash-generator",
    href: "/hash",
    category: "Crypto",
    description: "Generate SHA-1, SHA-256, and SHA-512 hashes",
    keywords: ["hash generator", "sha256 hash", "sha1 hash", "sha512 hash", "hash online"],
    relatedTools: [],
    faq: [],
    content: "Hash Generator computes SHA-1, SHA-256, and SHA-512 cryptographic hashes of text input using the Web Crypto API. Results are displayed as hexadecimal strings.",
  },
  {
    name: "UUID Generator",
    slug: "uuid-generator",
    href: "/uuid",
    category: "Crypto",
    description: "Generate random v4 UUIDs",
    keywords: ["uuid generator", "uuid v4", "generate uuid online", "random uuid"],
    relatedTools: [],
    faq: [],
    content: "UUID Generator creates cryptographically random v4 UUIDs using the browser's crypto.randomUUID() API. Generate single UUIDs or bulk batches of up to 50 at once.",
  },
  {
    name: "Timestamp Converter",
    slug: "timestamp-converter",
    href: "/timestamp",
    category: "Date",
    description: "Convert Unix timestamps to dates and back",
    keywords: ["unix timestamp converter", "timestamp to date", "epoch converter", "unix time"],
    relatedTools: [],
    faq: [],
    content: "Unix Timestamp Converter translates between Unix timestamps (seconds or milliseconds) and human-readable dates. Auto-detects seconds vs milliseconds. Shows ISO 8601, UTC, local time, and relative time.",
  },
  {
    name: "Color Converter",
    slug: "color-converter",
    href: "/color",
    category: "Design",
    description: "Convert colors between Hex, RGB, and HSL",
    keywords: ["color converter", "hex to rgb", "rgb to hsl", "color picker", "hex to hsl"],
    relatedTools: [],
    faq: [],
    content: "Color Converter translates colors between Hex, RGB, and HSL formats with a live color preview. Enter any format and instantly see all equivalent representations.",
  },
  {
    name: "JWT Decoder",
    slug: "jwt-decoder",
    href: "/jwt/decode",
    category: "Crypto",
    description: "Decode and inspect JWT tokens",
    keywords: ["jwt decoder", "jwt decode online", "json web token decoder", "jwt parser"],
    relatedTools: ["/base64/decode"],
    faq: [],
    content: "JWT Decoder splits a JSON Web Token into its header, payload, and signature parts. Shows decoded JSON, expiration status, and issued-at time. No verification — decoding only.",
  },
  {
    name: "Cron Parser",
    slug: "cron-parser",
    href: "/cron",
    category: "Date",
    description: "Explain cron expressions in plain English",
    keywords: ["cron parser", "cron expression", "crontab guru", "cron schedule"],
    relatedTools: [],
    faq: [],
    content: "Cron Expression Parser converts cron syntax into human-readable descriptions. Includes quick-access buttons for common schedules. Supports standard 5-field cron format.",
  },
  {
    name: "HTML to Markdown",
    slug: "html-to-markdown",
    href: "/html/to-markdown",
    category: "HTML",
    description: "Convert HTML to Markdown",
    keywords: ["html to markdown", "convert html to markdown", "html to md", "turndown"],
    relatedTools: ["/markdown/to-html", "/html/encode"],
    faq: [],
    content: "HTML to Markdown Converter transforms HTML content into clean Markdown syntax. Uses ATX-style headings and fenced code blocks. Handles links, images, lists, tables, and inline formatting.",
  },
];

export const CATEGORIES = [...new Set(TOOLS.map((t) => t.category))];

export function getToolByHref(href: string): Tool | undefined {
  return TOOLS.find((t) => t.href === href);
}
