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
    faq: [
      { q: "How do I compare two texts?", a: "Paste your first text into the left panel and the second into the right panel. DevFmt instantly highlights additions in green and deletions in red, with a summary of how many lines or words changed." },
      { q: "What's the difference between line and word diff?", a: "Line mode compares whole lines at a time — best for code and config files. Word mode compares individual words within the text — best for prose and documentation where small edits happen mid-sentence." },
      { q: "Is this tool good for comparing code?", a: "Yes. Line-by-line mode is designed for source code, JSON, logs, and configuration files where you need to spot exactly which lines were added, removed, or modified." },
      { q: "Is my text kept private?", a: "Yes. The comparison runs entirely in your browser using JavaScript. Neither text is ever sent to a server, so you can safely diff sensitive or proprietary content." },
    ],
    content: `Text Diff compares two blocks of text and highlights exactly what changed between them — additions, deletions, and unchanged lines — directly in your browser. Paste your original text on the left and the modified version on the right to see a clear, color-coded comparison.

Switch between line-by-line and word-by-word diff modes depending on what you're comparing. Line mode is ideal for code, config files, and logs where whole lines change. Word mode is better for prose, documentation, and copy edits where you want to see individual word changes within a paragraph.

**Key features:** line and word diff modes, color-coded additions and deletions, addition/deletion counts in the status bar, and instant comparison as you type.

A text diff tool is essential for code review, comparing API responses, spotting unintended changes in configuration, and proofreading document revisions. Because everything runs locally in your browser, you can safely compare sensitive files, contracts, or proprietary code — your text is never uploaded, stored, or logged.`,
  },
  {
    name: "URL Encode",
    slug: "url-encode",
    href: "/url/encode",
    category: "URL",
    description: "Percent-encode text for safe use in URLs",
    keywords: ["url encode", "url encoder", "percent encode", "encodeURIComponent"],
    relatedTools: ["/url/decode"],
    faq: [
      { q: "What is URL encoding?", a: "URL encoding (percent-encoding) replaces characters that aren't allowed in a URL with a % followed by their hexadecimal byte value. For example, a space becomes %20 and an ampersand becomes %26. This lets you safely include arbitrary text in URLs." },
      { q: "When should I URL-encode a value?", a: "Encode any value you place into a query string or path segment, especially if it contains spaces, &, ?, =, /, or non-English characters. Encoding prevents the value from being misinterpreted as part of the URL structure." },
      { q: "What's the difference between encodeURIComponent and encodeURI?", a: "encodeURIComponent (used here) encodes all reserved characters and is meant for individual values like a single query parameter. encodeURI leaves characters like / and ? intact because it's meant for encoding a complete URL." },
      { q: "Is my input sent anywhere?", a: "No. Encoding runs entirely in your browser. Your text never leaves your machine." },
    ],
    content: `URL Encoder converts text into percent-encoded format that's safe to use in URLs, query strings, and form submissions. Characters that have special meaning in a URL — spaces, ampersands, question marks, slashes, and non-ASCII characters — are replaced with %-prefixed hexadecimal codes so they're transmitted correctly.

Paste or type any text into the input panel and the encoded result appears instantly. DevFmt uses JavaScript's encodeURIComponent under the hood, which encodes every reserved character — making it the correct choice for encoding individual query-parameter values rather than a whole URL.

**Key features:** real-time encoding, full UTF-8 support (accented letters, emoji, CJK characters), one-click copy, and a byte/character count in the status bar.

URL encoding (also called percent-encoding) is required whenever you pass data through a URL: building API request links, embedding search terms in a query string, or constructing OAuth redirect URLs. All encoding happens locally in your browser — nothing you type is ever sent to a server.`,
  },
  {
    name: "URL Decode",
    slug: "url-decode",
    href: "/url/decode",
    category: "URL",
    description: "Decode percent-encoded URL strings",
    keywords: ["url decode", "url decoder", "percent decode", "decodeURIComponent"],
    relatedTools: ["/url/encode"],
    faq: [
      { q: "How do I decode a URL?", a: "Paste the percent-encoded string into the input panel. DevFmt instantly replaces every %XX code with its original character and shows the readable result." },
      { q: "What does %20 mean?", a: "%20 is the percent-encoded representation of a space character. Each %XX code is a byte written in hexadecimal — %20 is byte 32, which is a space in ASCII." },
      { q: "Can it decode emoji and accented characters?", a: "Yes. The decoder reconstructs full UTF-8 multi-byte sequences, so encoded emoji (%F0%9F%98%80) and accented letters are decoded back to their original characters." },
      { q: "What if the string is invalid?", a: "If the input contains a malformed percent sequence, the status bar shows an error so you can locate and fix the problem." },
    ],
    content: `URL Decoder converts percent-encoded URL text back into its original, human-readable form. It replaces %-prefixed hexadecimal codes (like %20, %3D, and %E2%9C%93) with the characters they represent, so you can read and inspect encoded URLs, query strings, and form data.

Paste an encoded string into the input panel and the decoded text appears instantly. The decoder handles full UTF-8 sequences, so multi-byte characters such as accented letters, emoji, and non-Latin scripts are reconstructed correctly.

**Key features:** real-time decoding, full UTF-8 support, handles both encodeURIComponent and encodeURI output, one-click copy, and error reporting for malformed sequences.

URL decoding is invaluable when debugging API requests, reading analytics URLs, inspecting redirect parameters, or understanding what a long encoded link actually contains. Because decoding runs locally in your browser, you can safely paste URLs that contain tokens, session IDs, or other sensitive parameters — nothing is uploaded or logged.`,
  },
  {
    name: "HTML Encode",
    slug: "html-encode",
    href: "/html/encode",
    category: "HTML",
    description: "Escape special characters to HTML entities",
    keywords: ["html encode", "html entity encode", "html escape", "html special characters"],
    relatedTools: ["/html/decode", "/html/to-markdown"],
    faq: [
      { q: "What does HTML encoding do?", a: "It replaces characters that have special meaning in HTML — such as <, >, &, and quotes — with entity codes like &lt; and &amp;. This makes the characters display as literal text instead of being parsed as HTML tags." },
      { q: "Why is HTML encoding important for security?", a: "Displaying unescaped user input in a page can allow malicious HTML or scripts to run (a cross-site scripting attack). Encoding the input neutralizes the markup so it's shown as plain text rather than executed." },
      { q: "Which characters get encoded?", a: "The core HTML-significant characters: < becomes &lt;, > becomes &gt;, & becomes &amp;, double quotes become &quot;, and apostrophes become &#39;." },
      { q: "Is my text private?", a: "Yes. Encoding happens entirely in your browser. Nothing you paste is uploaded, stored, or logged." },
    ],
    content: `HTML Entity Encoder converts special characters into their HTML entity equivalents so they display as literal text instead of being interpreted as markup. Characters like <, >, &, ', and " are replaced with safe entities (&lt;, &gt;, &amp;, and so on), preventing the browser from treating them as tags or attributes.

Paste any text or HTML snippet into the input panel and the encoded output appears instantly, ready to paste safely into a web page, template, or documentation.

**Key features:** encodes all HTML-significant characters, real-time conversion, one-click copy and download, and works on full HTML snippets or single characters.

HTML encoding is a fundamental defense against broken layouts and cross-site scripting (XSS): any time you display user-supplied text inside an HTML page, encoding it ensures the content is shown verbatim rather than executed as markup. It's also essential when documenting code examples that contain HTML tags. All encoding runs locally in your browser — your content is never sent to a server.`,
  },
  {
    name: "HTML Decode",
    slug: "html-decode",
    href: "/html/decode",
    category: "HTML",
    description: "Decode HTML entities back to text",
    keywords: ["html decode", "html entity decode", "html unescape", "decode html entities"],
    relatedTools: ["/html/encode", "/html/to-markdown"],
    faq: [
      { q: "How do I decode HTML entities?", a: "Paste text containing entities like &lt; or &#169; into the input panel. DevFmt converts every entity back to its original character and shows the readable result instantly." },
      { q: "Does it handle numeric entities?", a: "Yes. It decodes named entities (&copy;), decimal numeric references (&#169;), and hexadecimal references (&#xA9;) — all three resolve to the same character." },
      { q: "What is a non-breaking space?", a: "The &nbsp; entity represents a non-breaking space — a space that prevents a line break at that point. The decoder converts it back to a regular space character." },
      { q: "Is my content kept private?", a: "Yes. All decoding runs locally in your browser. Nothing is uploaded or logged." },
    ],
    content: `HTML Entity Decoder converts HTML entities back into the characters they represent. Named entities like &amp;, &lt;, and &nbsp;, as well as numeric references in decimal (&#169;) or hexadecimal (&#xA9;) form, are all converted to their original characters.

Paste text containing HTML entities into the input panel and the decoded, readable output appears instantly. This is useful when you've extracted content from HTML source, a database, or an API response and need to see the real characters rather than their encoded form.

**Key features:** decodes named, decimal, and hexadecimal entities, real-time conversion, one-click copy and download, and handles mixed content with both entities and plain text.

HTML decoding is handy for cleaning up scraped web content, debugging template output, reading email HTML, and converting encoded strings stored in databases back to plain text. Because decoding runs entirely in your browser, any content you paste — including data from internal systems — stays private and is never sent to a server.`,
  },
  {
    name: "Markdown to HTML",
    slug: "markdown-to-html",
    href: "/markdown/to-html",
    category: "Markdown",
    description: "Convert Markdown to HTML",
    keywords: ["markdown to html", "convert markdown to html", "markdown converter", "md to html"],
    relatedTools: ["/html/to-markdown"],
    faq: [
      { q: "How do I convert Markdown to HTML?", a: "Paste your Markdown into the input panel. DevFmt converts it to HTML instantly, supporting headings, lists, links, images, tables, and code blocks. Copy or download the HTML output with one click." },
      { q: "What Markdown features are supported?", a: "Standard Markdown: headings, bold and italic, ordered and unordered lists, links, images, blockquotes, inline code, fenced code blocks, and tables." },
      { q: "Can I use the output in a CMS or email?", a: "Yes. The output is clean, standard HTML you can paste into a CMS, email template, or any web page. You may want to add your own CSS for styling." },
      { q: "Is my content private?", a: "Yes. Conversion runs entirely in your browser. Your Markdown is never uploaded or stored." },
    ],
    content: `Markdown to HTML Converter transforms Markdown-formatted text into clean, valid HTML. Headings, bold and italic text, links, images, lists, blockquotes, tables, inline code, and fenced code blocks are all converted to their HTML equivalents, ready to paste into a web page, CMS, or email template.

Type or paste Markdown into the input panel and see the rendered HTML output update in real time. The converter follows standard Markdown conventions, so the output is predictable and portable.

**Key features:** supports headings, lists, links, images, tables, blockquotes, and code blocks; real-time conversion; one-click copy and download; and faithful handling of nested structures.

Markdown is the writing format of choice for README files, documentation, GitHub issues, and static-site content — but many publishing systems need raw HTML. This converter bridges that gap so you can author in Markdown and ship HTML. All conversion runs locally in your browser, so your drafts and documents stay completely private.`,
  },
  {
    name: "Regex Tester",
    slug: "regex-tester",
    href: "/regex",
    category: "Text",
    description: "Test regular expressions with live matching",
    keywords: ["regex tester", "regex test online", "regular expression tester", "regex match"],
    relatedTools: [],
    faq: [
      { q: "How do I test a regular expression?", a: "Type your regex pattern into the pattern field and paste sample text into the test area. Every match is highlighted instantly, and captured groups are listed so you can verify your pattern works as intended." },
      { q: "Which regex flavor does this use?", a: "It uses the JavaScript (ECMAScript) regex engine built into your browser, so results match exactly what you'll get in Node.js and front-end JavaScript code." },
      { q: "What do the g, i, m, and s flags do?", a: "g finds all matches instead of just the first, i makes matching case-insensitive, m makes ^ and $ match line boundaries, and s (dotAll) lets the dot match newline characters." },
      { q: "Are my pattern and text kept private?", a: "Yes. All matching runs locally in your browser. Your regex and test data are never sent to a server." },
    ],
    content: `Regex Tester lets you build and test JavaScript regular expressions against your own sample text with live, highlighted matching. As you type a pattern, every match is highlighted in the test string and the captured groups are listed — so you can see exactly what your expression matches and why.

Enter your pattern, choose your flags, and paste the text you want to test against. Matches update instantly as you edit either the pattern or the text, making it fast to iterate toward the regex you need.

**Key features:** real-time match highlighting, capture-group display, support for the global (g), case-insensitive (i), multiline (m), and dotAll (s) flags, and match count in the status bar.

A regex tester is essential for writing validation rules, search-and-replace patterns, log parsing, and data extraction without trial-and-error in your code editor. Because the tester uses your browser's own JavaScript regex engine, the behavior matches exactly what you'll get in Node.js and browser code — and your patterns and test data never leave your machine.`,
  },
  {
    name: "Hash Generator",
    slug: "hash-generator",
    href: "/hash",
    category: "Crypto",
    description: "Generate SHA-1, SHA-256, and SHA-512 hashes",
    keywords: ["hash generator", "sha256 hash", "sha1 hash", "sha512 hash", "hash online"],
    relatedTools: ["/uuid", "/base64/encode"],
    faq: [
      { q: "How do I generate a hash?", a: "Paste or type your text into the input panel. DevFmt instantly computes the SHA-1, SHA-256, and SHA-512 hashes and displays each as a hexadecimal string you can copy." },
      { q: "Which hash algorithm should I use?", a: "Use SHA-256 or SHA-512 for security-related work. SHA-1 is included for compatibility with legacy systems but is considered cryptographically weak and should not be used for new security purposes." },
      { q: "Why does the same text always give the same hash?", a: "Hash functions are deterministic: identical input always produces identical output. This is what makes hashes useful for verifying integrity and detecting changes." },
      { q: "Is my input sent to a server?", a: "No. Hashing is performed locally using your browser's Web Crypto API, so your text never leaves your machine." },
    ],
    content: `Hash Generator computes cryptographic hashes of your text using the browser's built-in Web Crypto API. Enter any text and instantly get its SHA-1, SHA-256, and SHA-512 digests as hexadecimal strings. A hash is a fixed-length fingerprint of your input: the same input always produces the same hash, and even a tiny change produces a completely different result.

Type or paste text into the input panel and all hashes update in real time. Each digest can be copied with a single click.

**Key features:** SHA-1, SHA-256, and SHA-512 algorithms, real-time hashing, hexadecimal output, one-click copy per hash, and full UTF-8 input support.

Hashes are used for verifying file and data integrity, generating cache keys, creating content fingerprints, and checksumming. Note that SHA-1 is considered cryptographically weak and should not be used for security-critical purposes; prefer SHA-256 or SHA-512 for those. All hashing happens locally in your browser via the Web Crypto API — your input is never transmitted, so you can safely hash sensitive values.`,
  },
  {
    name: "UUID Generator",
    slug: "uuid-generator",
    href: "/uuid",
    category: "Crypto",
    description: "Generate random v4 UUIDs",
    keywords: ["uuid generator", "uuid v4", "generate uuid online", "random uuid"],
    relatedTools: ["/hash"],
    faq: [
      { q: "What is a v4 UUID?", a: "A version 4 UUID is a 128-bit identifier whose bits are almost entirely random. It's written as 32 hexadecimal digits in the pattern 8-4-4-4-12, for example 'f47ac10b-58cc-4372-a567-0e02b2c3d479'." },
      { q: "How do I generate multiple UUIDs?", a: "Set the count and generate up to 50 UUIDs at once. Each one is independently random, and you can copy the whole batch with a single click." },
      { q: "Are these UUIDs truly unique?", a: "They're generated from a cryptographically secure random source, so the probability of a collision is so small it can be treated as effectively zero for practical purposes." },
      { q: "Are the UUIDs generated privately?", a: "Yes. They're created locally in your browser with crypto.randomUUID(). No identifiers are sent to or stored on any server." },
    ],
    content: `UUID Generator creates random version 4 UUIDs (universally unique identifiers) using your browser's cryptographically secure crypto.randomUUID() API. A v4 UUID is a 128-bit identifier — formatted as 32 hexadecimal digits in five hyphen-separated groups — that's random enough to be treated as globally unique without any central coordination.

Generate a single UUID or a batch of up to 50 at once, then copy them with one click. Each refresh produces brand-new identifiers.

**Key features:** cryptographically random v4 UUIDs, single or bulk generation (up to 50), one-click copy, and standard 8-4-4-4-12 formatting.

UUIDs are used as primary keys in databases, unique identifiers for API resources, correlation IDs for distributed tracing, idempotency keys, and file or session names where collisions must be avoided. Because they're generated with a secure random source, the chance of two UUIDs colliding is negligible. Generation happens entirely in your browser, so no identifiers are ever logged or stored on a server.`,
  },
  {
    name: "Timestamp Converter",
    slug: "timestamp-converter",
    href: "/timestamp",
    category: "Date",
    description: "Convert Unix timestamps to dates and back",
    keywords: ["unix timestamp converter", "timestamp to date", "epoch converter", "unix time"],
    relatedTools: ["/cron"],
    faq: [
      { q: "What is a Unix timestamp?", a: "A Unix timestamp is the number of seconds since the Unix epoch — 00:00:00 UTC on January 1, 1970. It's a compact, time-zone-independent way to represent a moment in time." },
      { q: "Does it handle milliseconds?", a: "Yes. The converter auto-detects whether your timestamp is in seconds (10 digits) or milliseconds (13 digits) and converts accordingly." },
      { q: "Can I convert a date back to a timestamp?", a: "Yes. Enter a date and the tool returns its Unix timestamp, so conversion works in both directions." },
      { q: "What time zone is used?", a: "The tool shows the result in UTC, ISO 8601, and your browser's local time zone simultaneously, so you can read whichever you need." },
    ],
    content: `Unix Timestamp Converter translates between Unix timestamps and human-readable dates in both directions. Enter a timestamp to see the corresponding date, or enter a date to get its timestamp. A Unix timestamp is the number of seconds (or milliseconds) elapsed since the Unix epoch — midnight UTC on January 1, 1970.

The converter automatically detects whether your input is in seconds or milliseconds and shows the result in multiple formats at once: ISO 8601, UTC, your local time zone, and a relative description like '3 hours ago'.

**Key features:** seconds and milliseconds auto-detection, ISO 8601 / UTC / local / relative output, two-way conversion, and one-click copy.

Timestamp conversion is a daily need when debugging logs, inspecting API responses, working with database date fields, or setting expiry times for tokens and caches. Many systems store time as Unix timestamps because they're compact and time-zone independent. All conversion runs locally in your browser — nothing you enter is sent to a server.`,
  },
  {
    name: "Color Converter",
    slug: "color-converter",
    href: "/color",
    category: "Design",
    description: "Convert colors between Hex, RGB, and HSL",
    keywords: ["color converter", "hex to rgb", "rgb to hsl", "color picker", "hex to hsl"],
    relatedTools: [],
    faq: [
      { q: "How do I convert a hex color to RGB?", a: "Enter the hex code (for example #8B5CF6) and the tool instantly shows the equivalent RGB and HSL values, plus a live preview of the color." },
      { q: "What is HSL and why use it?", a: "HSL stands for Hue, Saturation, and Lightness. It's an intuitive model for adjusting colors — you can lighten, darken, or desaturate a color by changing a single value, which is harder to do in Hex or RGB." },
      { q: "Can I convert RGB back to hex?", a: "Yes. Enter any RGB value and the tool produces the matching hex code and HSL values automatically. Conversion works from any of the three formats." },
      { q: "Is the conversion done privately?", a: "Yes. All color math runs in your browser. Nothing is uploaded or stored." },
    ],
    content: `Color Converter translates colors between the three formats developers and designers use most: Hex, RGB, and HSL. Enter a color in any one format and instantly see its equivalent in the other two, along with a live preview swatch so you can confirm you have the right color.

Type a hex code like #8B5CF6, an rgb() value, or an hsl() value, and every representation updates together. This makes it easy to copy the exact format your CSS, design tool, or code expects.

**Key features:** Hex, RGB, and HSL conversion in every direction, live color preview, real-time updates across all formats, and one-click copy of any value.

Each color model is suited to different tasks: Hex is compact and ubiquitous in CSS and design handoffs, RGB maps directly to how screens emit light, and HSL (hue, saturation, lightness) makes it intuitive to create tints, shades, and color variations. Converting between them lets you work in whichever model fits the job. All conversion runs locally in your browser — no data is sent anywhere.`,
  },
  {
    name: "JWT Decoder",
    slug: "jwt-decoder",
    href: "/jwt/decode",
    category: "Crypto",
    description: "Decode and inspect JWT tokens",
    keywords: ["jwt decoder", "jwt decode online", "json web token decoder", "jwt parser"],
    relatedTools: ["/base64/decode"],
    faq: [
      { q: "How do I decode a JWT?", a: "Paste the token (three Base64url segments separated by dots) into the input panel. DevFmt decodes the header and payload into readable JSON and shows the expiration status." },
      { q: "Does this verify the token's signature?", a: "No. This tool only decodes the token to show its contents. It does not verify the signature, so it can't confirm the token is authentic. Always verify signatures server-side before trusting a token." },
      { q: "Is it safe to paste a real token here?", a: "Yes. Decoding happens entirely in your browser — the token is never sent to a server. That said, treat production tokens carefully and avoid sharing screenshots that expose them." },
      { q: "What do iat and exp mean?", a: "iat is 'issued at' and exp is 'expiration' — both are Unix timestamps. The decoder converts them to readable dates and flags whether the token has expired." },
    ],
    content: `JWT Decoder splits a JSON Web Token into its three parts — header, payload, and signature — and decodes the Base64url-encoded header and payload into readable JSON. Paste a token and instantly inspect its claims: who issued it, who it's for, when it was issued, and when it expires.

The decoder also surfaces useful derived information such as the token's expiration status and human-readable issued-at and expiry times, so you can quickly tell whether a token is still valid.

**Key features:** decodes header and payload to formatted JSON, shows the signature segment, highlights expiration status, converts iat/exp timestamps to readable dates, and runs entirely client-side.

Important: this tool decodes tokens only — it does not verify the signature. Decoding reveals what a JWT contains, but it does not prove the token is authentic. Never trust a token's claims without verifying its signature on a server using the secret or public key. Because decoding happens entirely in your browser, you can safely inspect tokens that contain sensitive claims — nothing is sent to or logged by any server.`,
  },
  {
    name: "Cron Parser",
    slug: "cron-parser",
    href: "/cron",
    category: "Date",
    description: "Explain cron expressions in plain English",
    keywords: ["cron parser", "cron expression", "crontab guru", "cron schedule"],
    relatedTools: ["/timestamp"],
    faq: [
      { q: "What is a cron expression?", a: "A cron expression is a string of five fields — minute, hour, day-of-month, month, and day-of-week — that defines a recurring schedule. For example, '0 9 * * 1' means 9:00 AM every Monday." },
      { q: "How do I read a cron expression?", a: "Paste it into the input field and the tool describes the schedule in plain English, so you don't have to decode each field manually." },
      { q: "What do the special characters mean?", a: "An asterisk (*) means 'every' value, a comma lists specific values (1,15), a hyphen sets a range (1-5), and a slash defines steps (*/15 means every 15 units)." },
      { q: "Which cron format is supported?", a: "The standard five-field cron format used by Linux crontab and most schedulers. It parses ranges, lists, steps, and wildcards." },
    ],
    content: `Cron Expression Parser translates cron syntax into a plain-English description of when a job will run. Cron expressions are compact but easy to misread — this tool removes the guesswork by explaining exactly what schedule an expression represents.

Enter a standard five-field cron expression (minute, hour, day-of-month, month, day-of-week) and instantly read a clear description such as 'At 2:30 AM, every day' or 'Every 15 minutes, Monday through Friday'. Quick-access buttons let you drop in common schedules to use as a starting point.

**Key features:** plain-English explanation of any 5-field cron expression, quick presets for common schedules, support for ranges, lists, steps, and wildcards, and real-time parsing as you type.

Cron expressions drive scheduled jobs across Linux systems, CI/CD pipelines, serverless functions, and database tasks. A small mistake — like confusing the day-of-month and day-of-week fields — can cause a job to run far too often or not at all. This parser helps you confirm a schedule before you deploy it. All parsing runs locally in your browser.`,
  },
  {
    name: "HTML to Markdown",
    slug: "html-to-markdown",
    href: "/html/to-markdown",
    category: "HTML",
    description: "Convert HTML to Markdown",
    keywords: ["html to markdown", "convert html to markdown", "html to md", "turndown"],
    relatedTools: ["/markdown/to-html", "/html/encode"],
    faq: [
      { q: "How do I convert HTML to Markdown?", a: "Paste your HTML into the input panel. DevFmt converts it to clean Markdown instantly, handling headings, links, images, lists, tables, and code blocks. Copy or download the result with one click." },
      { q: "What Markdown style does it produce?", a: "It uses ATX-style headings (lines starting with #) and fenced code blocks, which are the most portable and widely supported Markdown conventions." },
      { q: "Will it handle tables and nested lists?", a: "Yes. Tables are converted to Markdown pipe tables, and nested lists preserve their indentation and structure." },
      { q: "Is my content kept private?", a: "Yes. Conversion runs entirely in your browser. Your HTML is never sent to a server, stored, or logged." },
    ],
    content: `HTML to Markdown Converter transforms HTML into clean, readable Markdown. Headings, paragraphs, links, images, lists, blockquotes, tables, and code blocks are converted to their Markdown equivalents — turning verbose markup into the lightweight syntax used by README files, documentation, and content management systems.

Paste an HTML snippet or full document fragment into the input panel and the Markdown output appears instantly. The converter produces ATX-style headings (# Heading) and fenced code blocks, which are the most widely supported Markdown conventions.

**Key features:** converts headings, links, images, lists, tables, blockquotes, and inline formatting; ATX headings and fenced code blocks; real-time conversion; and one-click copy and download.

This converter is ideal for migrating content out of a CMS, turning scraped or pasted web content into clean Markdown, or converting rich-text email and documents into a format that's easy to version-control and edit. Because conversion runs entirely in your browser, the content you paste — including internal or proprietary material — is never uploaded or stored.`,
  },
];

export const CATEGORIES = [...new Set(TOOLS.map((t) => t.category))];

export function getToolByHref(href: string): Tool | undefined {
  return TOOLS.find((t) => t.href === href);
}
