DevFmt
Build Spec for Claude Code
You are helping me (Andres) build and ship DevFmt, a fast, clean, developer-focused data formatting and conversion toolkit. This document is your single source of truth. Read it fully before writing any code.

0. How You Should Operate
Use TodoWrite to break this spec into tracked tasks. Update status as you go.
Read the frontend-design skill before writing any UI code. Follow its design tokens and constraints.
Use MCPs I have configured. If Google Stitch MCP, shadcn, Vercel, or GitHub MCPs are available, use them.
Pause for manual steps. When I need to do something outside the codebase (register domain, create account, paste API key, configure DNS, etc.), STOP, output a MANUAL STEP REQUIRED block with exact instructions, and wait for confirmation.
Do not invent secrets. Use .env.local with a .env.example containing placeholders.
Test the math. All calculation logic must have unit tests. Run them before declaring features complete.
Commit logically. Conventional commit messages (feat:, chore:, docs:, test:).

1. Project Identity
FieldValueNameDevFmtDomaindevfmt.com (primary). Fallback: devfmt.io, fmtdev.comTagline"Format. Convert. Ship."One-liner"JSON formatter, CSV converter, and developer data tools — fast, private, no signup."VoiceMinimal, technical, fast. Like a Unix manpage that respects your time. No fluff, no marketing speak.AudienceSoftware developers, data engineers, QA engineers, technical PMs. Desktop-primary (they're at their workstations). Global audience.

2. Strategic Context
Why developer tools?

Developer audiences have the highest ad RPMs of any utility tool niche ($20–$50+ RPM)
Session times are longer: devs paste data, format it, review, copy — 60–120 second sessions vs 10 seconds for image converters
Low competition on long-tail: "json to csv nested arrays", "yaml to json converter", "base64 decode url safe"
Developers share tools with colleagues = organic backlinks + word of mouth
Expandable: start with 8 tools, grow to 30+ over time
Zero infrastructure cost: all processing client-side in the browser (no server-side parsing needed)

Targets:

Launch with 8 core formatter/converter tools
Reach 10K monthly visits within 4 months (developer tools rank faster than consumer tools)
Expand to 20+ tools over 6 months
Monetize with AdSense + CodePen/GitHub sponsor sidebar potential


3. Tech Stack (Locked)
Same as other specs: Next.js 15, TypeScript, Tailwind v4, shadcn/ui, Geist fonts, GA4, AdSense, Vercel, pnpm.
Additional dependencies for this project:

js-yaml (YAML parsing)
papaparse (CSV parsing)
sql-formatter (SQL formatting)
jsonpath-plus (JSONPath queries, future tool)

All processing MUST be client-side. No data ever sent to a server. This is a core trust and privacy feature.

4. Design System
4.1 Brand Tokens
COLORS (light mode)
- background:        #FAFAFA
- foreground:        #18181B
- primary:           #8B5CF6 (DevFmt purple — developer/creative)
- primary-foreground:#FFFFFF
- accent:            #06B6D4 (cyan — data/tech accent)
- muted:             #F4F4F5
- muted-foreground:  #71717A
- border:            #E4E4E7
- success:           #22C55E
- destructive:       #EF4444

COLORS (dark mode — DEFAULT for this site, devs prefer dark)
- background:        #09090B
- foreground:        #FAFAFA
- primary:           #A78BFA
- accent:            #22D3EE
- muted:             #18181B
- muted-foreground:  #A1A1AA
- border:            #27272A

TYPOGRAPHY
- All text: Geist Sans for labels, Geist Mono for code/data areas
- Code editor panels: Geist Mono, 14px, 1.5 line-height
4.2 Visual Direction

Dark mode by default. Toggle available but most devs prefer dark.
Two-panel layout: Input (left/top) → Output (right/bottom). Like a code diff view.
Monospace everywhere data is shown. Code blocks with line numbers in the output.
Keyboard-first. Ctrl+V to paste auto-detects format. Ctrl+Shift+C copies output. Tab switches between panels.
Zero chrome. No hero sections, no marketing copy on tool pages. Just the tool.
Reference vibe: transform.tools meets jsonformatter.org but with modern design. Think VS Code's aesthetics in a browser.
Status bar at the bottom of each tool: shows input size (bytes/lines), output size, processing time, detected format.


5. Information Architecture & Routes
/                                     Landing — grid of all tools, search/filter
/json/formatter                       JSON formatter / beautifier
/json/minifier                        JSON minifier / compressor
/json/to-csv                          JSON to CSV converter
/json/to-yaml                         JSON to YAML converter
/csv/to-json                          CSV to JSON converter
/csv/formatter                        CSV viewer / formatter (table view)
/base64/encode                        Base64 encoder
/base64/decode                        Base64 decoder
/sql/formatter                        SQL formatter / beautifier
/yaml/to-json                         YAML to JSON converter
/diff                                 Text diff / compare tool (future)
/about                                About (minimal)
/privacy                              Privacy policy
/sitemap.xml
/robots.txt

6. Tool Specs (8 Launch Tools)
Architecture Pattern
Each tool is a /app/[category]/[tool]/page.tsx server component that renders a <ToolLayout> with:

'use client' inner component for the two-panel editor
Zero-config auto-detection where possible
Copy, download, clear buttons
Status bar with stats

Shared <CodeEditor> component: textarea with monospace font, line numbers (CSS counter), syntax highlighting via simple regex (not a full parser — keep it lightweight). Consider <textarea> with a styled overlay rather than contenteditable.
6.1 JSON Formatter
Input: Raw/minified JSON (paste or upload .json file)
Output: Prettified JSON with configurable indent (2/4/tab)
Features: Syntax validation with error line highlighting, collapsible tree view toggle, path display on hover
Target keywords: "json formatter", "json beautifier", "json pretty print"
6.2 JSON Minifier
Input: Formatted JSON
Output: Minified single-line JSON
Features: Show bytes saved, copy button
Target keywords: "json minifier", "json compressor", "minify json online"
6.3 JSON to CSV
Input: JSON array of objects
Output: CSV with header row
Features: Handle nested objects (dot notation or flatten), delimiter options (comma, tab, semicolon), download as .csv
Target keywords: "json to csv", "convert json to csv online", "json to csv converter"
6.4 JSON to YAML
Input: JSON
Output: YAML
Features: Handle nested structures, proper YAML formatting
Target keywords: "json to yaml", "convert json to yaml"
6.5 CSV to JSON
Input: CSV text or file upload
Output: JSON array of objects
Features: Auto-detect delimiter, header row toggle, type inference (numbers, booleans)
Target keywords: "csv to json", "csv to json converter"
6.6 CSV Viewer / Formatter
Input: CSV text or file upload
Output: Rendered HTML table with sorting, filtering
Features: Column type detection, sortable headers, search/filter row, export cleaned CSV
Target keywords: "csv viewer online", "csv formatter", "view csv file"
6.7 Base64 Encode / Decode
Input: Text or file
Output: Base64 encoded/decoded
Features: URL-safe mode toggle, file upload for binary encoding, auto-detect if input is base64
Target keywords: "base64 encode", "base64 decode", "base64 converter"
6.8 SQL Formatter
Input: Raw SQL query
Output: Formatted SQL with indentation and keyword uppercasing
Features: Dialect selector (PostgreSQL, MySQL, SQLite, Standard), configurable indent, keyword case toggle
Target keywords: "sql formatter", "sql beautifier", "format sql online"

7. SEO Requirements
Same architecture as other specs. Additionally:

SoftwareApplication schema on each tool page
Each tool page gets 200–400 words of "how to use" content below the tool (collapsed by default on desktop, visible on mobile for SEO)
FAQ schema with 3–5 Q&As per tool
Internal linking between related tools (JSON formatter links to JSON minifier, JSON to CSV, etc.)


8. Unique Privacy Feature
Create a privacy banner (not a pop-up — a permanent, subtle footer note):

"Your data never leaves your browser. All formatting and conversion happens locally — we never send, store, or log your input."

This is a genuine differentiator. Most competitors don't make this claim (and some actually do send data server-side). Link to a /privacy page that explains the client-side architecture.

9. Build Milestones
Milestone 1: Scaffold + Core Components

Scaffold project, configure dark-mode-default design system
Build <CodeEditor> component with line numbers, copy, download, clear
Build <ToolLayout> with two-panel layout + status bar
Checkpoint: review editor component

Milestone 2: JSON Tools (3 tools)

JSON Formatter, JSON Minifier, JSON to CSV
Test with edge cases (nested objects, large files, malformed input)
Checkpoint: review all 3 JSON tools

Milestone 3: Remaining Tools (5 tools)

JSON to YAML, CSV to JSON, CSV Viewer, Base64 Encode/Decode, SQL Formatter
Checkpoint: review all tools

Milestone 4: Homepage + SEO + Static Pages

Build tool grid homepage with search
Add all metadata, schema, sitemap
Write supporting content for each tool
About, Privacy, Terms
Lighthouse ≥95
Checkpoint: Lighthouse report

Milestone 5: Monetization + Deploy

AdSense (be careful with placement — devs hate intrusive ads, use sidebar + below-tool only)
Cookie consent
Deploy, connect domain, Search Console
Checkpoint: site is live


10. Post-Launch Backlog (Next 12 Tools)
Document in /docs/CONTENT_BACKLOG.md:

Text diff / compare
URL encode / decode
HTML entity encode / decode
Markdown to HTML
Regex tester
Hash generator (MD5, SHA-1, SHA-256)
UUID generator
Unix timestamp converter
Color converter (hex ↔ RGB ↔ HSL)
JWT decoder
Cron expression parser
HTML to Markdown