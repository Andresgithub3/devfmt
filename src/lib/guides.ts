export interface GuideSection {
  heading: string;
  body: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  readingTime: string;
  keywords: string[];
  intro: string[];
  sections: GuideSection[];
  related: string[];
}

export const GUIDES: Guide[] = [
  {
    slug: "json-formatting-best-practices",
    title: "JSON Formatting Best Practices for APIs and Config Files",
    description:
      "Practical JSON formatting guidance: indentation, key ordering, validation, minification, large files, and security for APIs and config.",
    readingTime: "5 min read",
    keywords: [
      "json formatting best practices",
      "json indentation",
      "json validation",
      "json minification",
      "json config files",
      "api json formatting",
      "json syntax errors",
      "pretty print json",
    ],
    intro: [
      "JSON is the default interchange format for web APIs and a common choice for configuration files, yet most teams treat its formatting as an afterthought. The result is diffs that are impossible to review, config files that break in subtle ways, and API payloads that waste bandwidth. Formatting is not cosmetic. Consistent structure is what makes JSON reviewable in version control, debuggable in a terminal, and safe to hand-edit.",
      "This guide covers the formatting decisions that actually matter in production: indentation style, key ordering, validation, when to minify versus pretty-print, how to handle large files, and the security pitfalls that turn a parsing convenience into a vulnerability. The recommendations apply whether you are designing an API response schema or maintaining a sprawling config directory.",
    ],
    sections: [
      {
        heading: "Why Consistent Formatting Matters",
        body: [
          "The strongest argument for consistent JSON formatting is the diff. When a config file is pretty-printed with one key per line and a stable indentation scheme, a version-control diff shows exactly which value changed. When the same file is stored minified on a single line, every edit rewrites the entire line, and code review becomes guesswork. For any JSON a human will read or edit, **one value per line with predictable indentation is the baseline expectation.**",
          "Consistency also reduces cognitive load and merge conflicts. If half your config files use two spaces and the other half use tabs, every contributor reformats on save and floods the history with noise. Pick a single style, enforce it with a formatter in your pre-commit hook or CI pipeline, and the question stops being a recurring debate. The specific style you choose matters far less than choosing one and applying it everywhere.",
        ],
      },
      {
        heading: "Indentation: 2 Spaces, 4 Spaces, or Tabs",
        body: [
          "Two spaces is the de facto standard for JSON and the safest default. It is what most language tooling emits by default, including JavaScript's 'JSON.stringify(value, null, 2)', and it keeps deeply nested structures from marching off the right edge of the screen. JSON nests aggressively, and four-space indentation can push an object five levels deep well past 80 columns, forcing horizontal scrolling that hurts readability.",
          "Four spaces is defensible for shallow, human-authored config where extra visual separation helps, but it offers little benefit once nesting is involved. Tabs are technically valid JSON and let each developer set their own visual width, but they render inconsistently across tools, web views, and pasted snippets, which undermines the consistency you are trying to achieve. **For interchange and most config, use two spaces.** Reserve tabs for repositories that already standardize on them everywhere. Whatever you pick, never mix styles within a single file.",
        ],
      },
      {
        heading: "Key Ordering and Structural Consistency",
        body: [
          "The JSON specification treats object members as unordered, so no parser should depend on key order for correctness. For files under version control, however, a deterministic order is valuable because it keeps diffs minimal and prevents two contributors from producing different serializations of the same logical data. Two common strategies work: sort keys alphabetically for machine-generated output, or follow a deliberate logical grouping (identifiers first, then configuration, then metadata) for hand-written files where alphabetical order would scatter related fields.",
          "Apply the same discipline to value conventions. Decide whether booleans, null, and empty collections are represented explicitly or omitted, and stick to it. Use consistent casing for keys, typically camelCase or snake_case, across an entire API surface rather than switching per endpoint. Avoid duplicate keys entirely: the spec does not define which value wins, and parsers disagree, so a duplicate key is a latent bug waiting for the day you switch libraries.",
        ],
      },
      {
        heading: "Validation and Common Syntax Errors",
        body: [
          "Most broken JSON fails on a small set of recurring mistakes, almost all inherited from JavaScript object-literal habits that JSON does not permit. The top offender is the **trailing comma** after the last element of an array or object, which is legal in modern JavaScript and JSON5 but rejected by strict JSON parsers. Closely behind are single-quoted strings (JSON requires double quotes), unquoted keys (every key must be a quoted string), and stray comments, which JSON has no syntax for at all.",
          "Other frequent failures include unescaped control characters or backslashes inside strings, numbers with leading zeros or a trailing decimal point, and using 'undefined' or 'NaN', none of which are valid JSON values. Validate before you ship. A formatter that parses and re-serializes catches these errors immediately, and pretty-printing on save makes a misplaced bracket visually obvious. DevFmt's JSON Formatter runs entirely in your browser, so you can validate and reformat sensitive payloads without the data ever leaving your machine.",
        ],
      },
      {
        heading: "Minify for Production, Pretty-Print for Development",
        body: [
          "Pretty-printing and minification serve different stages of the lifecycle, and the right answer is to use both. During development and in anything a human reads, including logs, config files, and debugging output, pretty-print with indentation and line breaks. The few extra bytes cost nothing locally and the readability pays for itself every time someone has to inspect the structure.",
          "For data on the wire, **minify**. Stripping insignificant whitespace from API responses meaningfully reduces payload size, and combined with gzip or Brotli compression it lowers bandwidth and latency at scale. The transformation is lossless: a minifier only removes whitespace between tokens, so the parsed result is identical. A practical pattern is to store and edit config in pretty-printed form, then minify as a build step. DevFmt's JSON Minifier does this in-browser, which matters when the payload contains tokens or customer data you would rather not upload to a remote service.",
        ],
      },
      {
        heading: "Large Files, Security, and When to Reach for Alternatives",
        body: [
          "Large JSON files demand different handling. Loading a multi-gigabyte document fully into memory to parse it can exhaust available RAM, so prefer streaming parsers that process the document incrementally, or restructure the data as newline-delimited JSON (one independent object per line) so each record can be read and processed on its own. For data this size, formatting choices barely matter compared to choosing a parsing strategy that does not collapse under the volume.",
          "On security, treat all incoming JSON as untrusted. Never evaluate JSON with a language's code-evaluation facility such as JavaScript's 'eval'; use a real parser. Validate parsed data against an explicit schema before trusting it, since a well-formed document can still carry unexpected types, missing required fields, or values designed to break downstream code. Guard against resource-exhaustion attacks from deeply nested or enormous payloads by enforcing size and depth limits at the boundary.",
          "Finally, JSON is not always the right tool. It has no native comment syntax and no date or integer-versus-float distinction, which makes verbose, heavily annotated configuration awkward. YAML or TOML are often friendlier for human-authored config, while binary formats like Protocol Buffers or MessagePack win for high-throughput internal services. Reach for JSON when broad interoperability and human readability matter most, and reach for something else when its limitations start working against you.",
        ],
      },
    ],
    related: ["/json/formatter", "/json/minifier", "/json/to-yaml"],
  },
  {
    slug: "json-vs-yaml-vs-csv",
    title: "JSON vs YAML vs CSV: Choosing the Right Data Format",
    description:
      "A practical comparison of JSON, YAML, and CSV for developers: strengths, weaknesses, type gotchas, and when to use each format.",
    readingTime: "6 min read",
    keywords: [
      "json vs yaml vs csv",
      "data format comparison",
      "yaml norway problem",
      "json vs yaml config",
      "csv vs json",
      "choosing a data format",
      "yaml type coercion",
      "data serialization formats",
    ],
    intro: [
      "JSON, YAML, and CSV solve overlapping problems in incompatible ways. JSON dominates web APIs, YAML rules configuration files, and CSV remains the lingua franca of tabular data and spreadsheets. Picking the wrong one for a given job leads to brittle parsing, silent data corruption, or files no human can edit.",
      "This guide walks through what each format is, where it shines, where it bites, and how to choose. It also covers what gets lost when you convert between them, because in practice you will convert between them constantly.",
    ],
    sections: [
      {
        heading: "Where Each Format Came From",
        body: [
          "JSON (JavaScript Object Notation) was specified by Douglas Crockford in the early 2000s as a subset of JavaScript object literal syntax. It describes a small set of types: objects, arrays, strings, numbers, booleans, and null. Its grammar fits on a business card, which is precisely why it won as the default API serialization format.",
          "YAML (YAML Ain't Markup Language) arrived around the same time with a different goal: a serialization format optimized for humans to read and write by hand. It is technically a superset of JSON, so any valid JSON is valid YAML, but its native syntax leans on indentation and a rich set of conveniences like comments and anchors.",
          "CSV (comma-separated values) predates both by decades. It had no single authoritative standard until RFC 4180 attempted to codify common practice in 2005, and even that is widely ignored. CSV is not a data structure so much as a convention: rows of fields separated by a delimiter, optionally quoted.",
        ],
      },
      {
        heading: "JSON: The Default for APIs and Interchange",
        body: [
          "JSON's strengths are ubiquity and predictability. Every mainstream language ships a parser, the type model is unambiguous, and parsing is fast and streamable. A string is always a string and a number is always a number, so round-tripping data between services rarely surprises you. For request and response bodies, message queues, log lines, and config consumed by machines rather than edited by humans, JSON is the safe default.",
          "Its weaknesses show up the moment a human has to maintain a JSON file. There are no comments, so you cannot annotate why a setting exists. Strict syntax means a single trailing comma breaks the whole document. It is also verbose: every key is quoted and structure is carried by braces and brackets rather than layout, which makes large nested config tedious to hand-edit. JSON also has no native date type, so timestamps live as strings or numbers by convention, and large integers can exceed what a double-precision float represents safely.",
        ],
      },
      {
        heading: "YAML: Readable Config, With Sharp Edges",
        body: [
          "YAML trades strictness for readability. Structure comes from indentation rather than punctuation, you can write comments with a hash, and you can reuse blocks with anchors and aliases (define a value once with an ampersand, reference it later with an asterisk). This is why Kubernetes manifests, GitHub Actions and GitLab CI pipelines, Ansible playbooks, and Docker Compose files all use YAML. For configuration that humans read and edit daily, it is hard to beat.",
          "The cost is fragility. Because indentation is significant, a stray space or a tab where spaces are expected can change meaning or break parsing entirely, and the error often points at the wrong line. Worse is YAML's implicit type coercion, the infamous 'Norway problem': the country code 'NO' is interpreted as the boolean false, so a list of country codes silently turns Norway into a falsy value. The same trap catches version strings like 1.10 (parsed as the number 1.1, dropping the trailing zero), values like 'on', 'off', and 'yes', and times like 22:22 read as a base-60 number. The defense is to quote any scalar whose literal text matters. YAML's full specification is also large and parsers differ in support, so advanced features do not always travel between tools.",
        ],
      },
      {
        heading: "CSV: Flat, Fast, and Everywhere in Spreadsheets",
        body: [
          "CSV is the right tool for tabular data: a fixed set of columns repeated over many rows. It opens directly in Excel, Google Sheets, and every database import wizard, and it streams beautifully. Because each row is independent, you can process a multi-gigabyte file line by line without loading it into memory, which is something neither JSON nor YAML handles gracefully for large collections. For data exports, analytics dumps, and bulk loads, CSV is usually the fastest path.",
          "Its limitations are structural. CSV has no concept of nesting, so anything hierarchical has to be flattened into columns or stuffed into a cell as encoded text. It carries no type information; every field is just text, and whether 007 is a string or the number 7 is left to the reader. Escaping is genuinely ambiguous in practice: fields containing the delimiter, quotes, or newlines must be quoted and escaped, but tools disagree on the rules, and regional differences mean some locales use semicolons because the comma is a decimal separator. There is also no required header row, so the meaning of each column is a convention you have to trust.",
        ],
      },
      {
        heading: "A Practical Decision Guide",
        body: [
          "Reach for JSON when machines are the primary readers: REST and GraphQL APIs, browser-to-server payloads, message buses, and structured logs. Its unambiguous types and universal parser support make it the lowest-friction choice for data in motion between systems.",
          "Reach for YAML when humans edit the file regularly and structure is nested: application config, infrastructure-as-code, and CI/CD pipelines. The comments and reduced punctuation pay off every time someone opens the file, as long as your team knows to quote ambiguous scalars.",
          "Reach for CSV when the data is genuinely tabular and headed for a spreadsheet, a SQL bulk import, or a streaming pipeline. If your data has no nesting and you care about row-by-row throughput or non-developer consumers, CSV is the pragmatic answer. When you find yourself encoding nested objects into CSV cells, that is the signal you have outgrown it and should move to JSON.",
        ],
      },
      {
        heading: "Converting Between Formats and What You Lose",
        body: [
          "Conversions are common, but they are rarely lossless because the formats do not share a type and structure model. Going from YAML to JSON discards every comment and collapses anchors into their expanded values, so the human-friendly annotations that justified YAML in the first place vanish. Going the other way, JSON to YAML, produces a valid file but reintroduces the coercion risk on any unquoted scalar.",
          "Flattening to CSV is the lossiest step. Nested JSON or YAML objects must be either flattened into dotted column names like address.city or serialized back into a string inside one cell, and arrays of varying length do not map cleanly to fixed columns at all. The reverse, CSV to JSON, is straightforward for flat data but requires you to decide how to re-infer types, since CSV's everything-is-text model means you choose whether 'false' becomes a boolean or stays a string.",
          "When you do need to convert, DevFmt's JSON to YAML, JSON to CSV, CSV to JSON, and YAML to JSON converters run entirely in your browser, so the data never leaves your machine. That matters when you are pasting in config or exports that may contain secrets or customer records. Whatever tool you use, inspect the output rather than trusting the round trip: the loss of comments, the flattening of nesting, and silent type coercion are where conversions quietly go wrong.",
        ],
      },
    ],
    related: ["/json/to-yaml", "/json/to-csv", "/csv/to-json", "/yaml/to-json"],
  },
  {
    slug: "base64-encoding-explained",
    title: "Base64 Encoding Explained: What It Is and When to Use It",
    description:
      "A developer's guide to Base64: how binary-to-text encoding works, real-world uses, URL-safe variants, and why it is not encryption.",
    readingTime: "5 min read",
    keywords: [
      "base64 encoding",
      "binary to text encoding",
      "base64 explained",
      "url-safe base64",
      "data uri base64",
      "base64 vs encryption",
      "base64 padding",
      "encode binary in json",
    ],
    intro: [
      "Base64 is one of those tools that shows up everywhere in software, from email attachments to JSON payloads to JWTs, yet it is frequently misunderstood. Developers reach for it to move binary data through systems that only handle text, but many also mistakenly treat it as a way to hide or protect information.",
      "This guide explains what Base64 actually is, how it works under the hood, where it genuinely belongs in your stack, and the one thing it must never be used for. By the end you will know exactly when reaching for Base64 is the right call and when it is a mistake.",
    ],
    sections: [
      {
        heading: "What Base64 Actually Is",
        body: [
          "Base64 is a binary-to-text encoding scheme. It takes arbitrary binary data, any sequence of bytes, and represents it using a limited alphabet of 64 printable ASCII characters. The point is not to compress data or to secure it, but to make binary content safe to transport through channels that were designed for text and may corrupt or reject raw bytes.",
          "The core mechanic is a 3-to-4 ratio: every 3 bytes of input (24 bits) are re-expressed as 4 Base64 characters. Because each output character carries only 6 bits of information instead of a full 8-bit byte, the encoded result is always larger than the original. The overhead is roughly **33 percent**, so a 1 MB file becomes about 1.33 MB once encoded. That size penalty is the price you pay for text-safety, and it is the single most important practical trade-off to keep in mind.",
        ],
      },
      {
        heading: "How the Encoding Works",
        body: [
          "Conceptually, Base64 ignores byte boundaries and instead regroups the bits. It reads the input as a continuous stream of bits, then slices that stream into 6-bit chunks. Each 6-bit chunk is a number between 0 and 63, and that number is used as an index into the encoding alphabet. The standard alphabet is straightforward: indexes 0 to 25 map to 'A' through 'Z', 26 to 51 map to 'a' through 'z', 52 to 61 map to the digits '0' through '9', and the final two values, 62 and 63, map to '+' and '/'.",
          "Because input is processed in 3-byte blocks but real data is rarely an exact multiple of 3 bytes, Base64 uses the '=' character as padding. When the final block has only 1 leftover byte, the output ends with two '=' characters; when it has 2 leftover bytes, it ends with one '='. The padding keeps the output length a clean multiple of 4 so decoders know exactly where the data ends. For example, the three bytes spelling 'Man' encode to 'TWFu' with no padding, while the single byte 'M' encodes to 'TQ=='.",
        ],
      },
      {
        heading: "Where You Will Actually Use It",
        body: [
          "The most visible use is the data URI, where you embed an image, font, or other asset directly inline in HTML or CSS using a string like 'data:image/png;base64,...'. This saves an HTTP request for small assets, which can be worthwhile for tiny icons. Base64 is also the backbone of MIME, the standard that lets email carry binary attachments over a protocol that historically assumed 7-bit text.",
          "Beyond those, Base64 is the go-to for slipping binary data into formats that are strictly text. JSON has no native binary type, so a common pattern is to encode a small file, a cryptographic key, or an image thumbnail as a Base64 string field. HTTP Basic Authentication encodes the 'username:password' pair as Base64 in the Authorization header. You will also see it used to store small binary blobs in text-based config files, database columns, or environment variables where raw bytes would be awkward or unsafe.",
        ],
      },
      {
        heading: "URL-Safe Base64 and Why It Exists",
        body: [
          "The standard alphabet includes '+' and '/', and the padding character is '='. All three are problematic in certain contexts: '/' is a path separator, '+' is interpreted as a space in query strings, and '=' has meaning in URLs and is illegal in some filenames. Dropping an encoded value straight into a URL or filename can therefore break it or require additional percent-encoding.",
          "URL-safe Base64, defined in RFC 4648, solves this by substituting '-' for '+' and '_' for '/', and typically omitting the '=' padding entirely since the length can be inferred. This variant is what JSON Web Tokens use for their header and payload segments, which is why JWTs travel cleanly in URLs, cookies, and headers. Whenever your encoded output needs to live inside a URL, a query parameter, or a filename, reach for the URL-safe variant rather than the standard one.",
        ],
      },
      {
        heading: "Base64 Is Not Encryption",
        body: [
          "This is the most important point in the entire guide: **Base64 provides zero security**. It is not encryption, not hashing, and not obfuscation in any meaningful sense. There is no key and no secret involved. Anyone who sees a Base64 string can decode it back to the original bytes instantly with a one-line command or any online tool, and many developers can even eyeball common patterns.",
          "Never use Base64 to hide passwords, API keys, tokens, or any sensitive value. Encoding a secret as Base64 in a config file, a cookie, or a request body protects it from absolutely nobody. If you need confidentiality, use real encryption such as AES; if you need integrity, use a MAC or signature. Base64 only ensures that binary data survives a text-only channel intact, which is a transport concern, not a security one. Treat an encoded secret as if it were written in plain text, because effectively it is.",
        ],
      },
      {
        heading: "Practical Tips and When to Avoid It",
        body: [
          "Keep the 33 percent size overhead front of mind. For large files, embedding Base64 inline is usually the wrong choice; serving the raw binary over HTTP and letting the transport layer handle it is more efficient and cacheable. Inlining a multi-megabyte image as a data URI bloats your HTML, defeats caching, and slows initial render. Reserve inline Base64 for genuinely small assets where saving a request outweighs the size cost.",
          "Also be deliberate about which variant you emit and which you accept, since mixing standard and URL-safe alphabets is a common source of decode failures. When you just need to encode or decode a value quickly, DevFmt's Base64 encoder and decoder run entirely in your browser, so the data you paste never leaves your machine, which matters when you are inspecting tokens or payloads that may contain sensitive material. Used for its real purpose, moving binary safely through text channels, Base64 is simple, reliable, and exactly the right tool.",
        ],
      },
    ],
    related: ["/base64/encode", "/base64/decode"],
  },
  {
    slug: "understanding-jwt-tokens",
    title: "Understanding JWTs: Structure, Claims, and Security",
    description:
      "Learn how JWTs work: their three-part structure, standard claims, signing algorithms, and the security pitfalls every backend developer must avoid.",
    readingTime: "6 min read",
    keywords: [
      "json web token",
      "jwt structure",
      "jwt claims",
      "jwt security",
      "jwt signature verification",
      "alg none attack",
      "jwt authentication",
      "base64url encoding",
    ],
    intro: [
      "JSON Web Tokens (JWTs) are everywhere in modern authentication and authorization, yet they are widely misunderstood. Developers often treat them as opaque, encrypted secrets when they are neither opaque nor encrypted. Misreading what a JWT actually guarantees leads directly to serious vulnerabilities.",
      "This guide breaks down what a JWT is, how its three parts fit together, what the standard claims mean, how signing works, and the security rules you must follow. The goal is a precise mental model so you can use JWTs correctly in real backend and auth systems.",
    ],
    sections: [
      {
        heading: "What a JWT Actually Is",
        body: [
          "A JSON Web Token is a compact, URL-safe token format defined by RFC 7519. It packages a set of claims (assertions about a subject, such as a user) into a string that can be passed in HTTP headers, query parameters, or cookies without further encoding. Because it is URL-safe and self-contained, a JWT can carry identity and authorization data between parties without a shared database lookup on every request.",
          "JWTs are most commonly used for authentication and authorization. After a user logs in, a server issues a signed JWT; the client then sends that token on subsequent requests, and the server validates the signature to confirm the token was issued by a trusted party and has not been tampered with. The token is stateless from the server's perspective, which is what makes JWTs attractive for distributed and microservice architectures.",
        ],
      },
      {
        heading: "The Three Parts: Header, Payload, Signature",
        body: [
          "A JWT consists of three parts separated by dots: the header, the payload, and the signature, written as header.payload.signature. The first two parts are JSON objects that are each Base64url-encoded (a URL-safe variant of Base64). The signature is computed over the encoded header and payload. This means a JWT is just text you can split on the dots and decode.",
          "The header describes how the token is signed. It typically contains an 'alg' field naming the signing algorithm (for example 'HS256' or 'RS256') and a 'typ' field, usually set to 'JWT'. The payload holds the claims. The signature is the cryptographic proof binding the header and payload together so they cannot be altered without detection. DevFmt's JWT decoder runs entirely in your browser and shows you these decoded parts directly, so the token is never sent to a server.",
        ],
      },
      {
        heading: "Claims: Standard and Custom",
        body: [
          "The payload is a collection of claims. RFC 7519 defines a set of registered claims with reserved meanings. Common ones include 'iss' (issuer, who created the token), 'sub' (subject, who the token is about), 'aud' (audience, who the token is intended for), 'exp' (expiration time), 'iat' (issued-at time), 'nbf' (not-before time, before which the token is invalid), and 'jti' (a unique token identifier useful for revocation lists). Times are expressed as Unix timestamps.",
          "Beyond the registered claims, you can include custom (private) claims for application-specific data, such as a user's roles, tenant identifier, or permission scopes. There is no fixed schema, but keep the payload small: every claim travels with every request, and oversized tokens bloat headers and can hit size limits.",
        ],
      },
      {
        heading: "How Signing Works",
        body: [
          "Signing is what makes a JWT trustworthy. There are two broad approaches. Symmetric signing, such as HS256 (HMAC with SHA-256), uses a single shared secret to both create and verify the signature. Anyone holding that secret can issue valid tokens, so it suits cases where the same party signs and verifies.",
          "Asymmetric signing, such as RS256 (RSA) or ES256 (ECDSA), uses a private key to sign and a separate public key to verify. The issuer keeps the private key secret, while any number of services can verify tokens using the freely distributable public key. This is the right choice when one authority issues tokens that many independent services must validate, because verifiers never need access to the signing secret.",
        ],
      },
      {
        heading: "Critical Security Rules",
        body: [
          "The single most important fact: the payload is only Base64url-encoded, not encrypted. Anyone who possesses the token can decode and read every claim. **Never put passwords, secrets, or sensitive personal data in a JWT.** Encoding is not encryption; if you need confidentiality, use JWE or transport-level protection and keep secrets out of the token entirely.",
          "Always verify the signature server-side before trusting any claim, and pin the expected algorithm. Two classic attacks target verification. The **'alg: none' attack** exploits libraries that honor a header claiming no signature is required, letting an attacker forge tokens; reject 'none' outright. **Algorithm confusion** occurs when an attacker changes an RS256 token to HS256 and tricks the server into verifying it with the RSA public key (which is not secret) as if it were an HMAC secret; prevent this by configuring your library to accept only the specific algorithm you expect.",
          "Beyond the signature, validate the claims. Check 'exp' to reject expired tokens, confirm 'aud' matches your service so a token minted for another audience cannot be replayed against you, and verify 'iss' is a trusted issuer. Prefer short token lifetimes paired with refresh tokens to limit the blast radius of a leaked token. Remember that decoding a token, such as with DevFmt's decoder, does not verify it; decoding only reveals the contents, while verification requires the key and must happen in your backend.",
        ],
      },
      {
        heading: "Storage and Transport",
        body: [
          "Because a JWT is a bearer token, anyone who holds it can use it, so protecting it in transit and at rest matters as much as signing it. Always transmit tokens over HTTPS so they cannot be intercepted on the wire. Treat every token as a credential for its entire lifetime.",
          "On the client, storage involves real trade-offs. Storing a token in localStorage makes it readable by any JavaScript on the page, so a single cross-site scripting (XSS) flaw can exfiltrate it. Storing it in an httpOnly cookie keeps it out of JavaScript's reach and mitigates XSS theft, but cookies introduce cross-site request forgery (CSRF) concerns that you must counter with SameSite attributes and anti-CSRF tokens. There is no universally correct answer; choose based on your threat model, and combine short lifetimes, strict transport security, and signature plus claim validation to keep JWT-based auth robust.",
        ],
      },
    ],
    related: ["/jwt/decode", "/base64/decode"],
  },
  {
    slug: "regular-expressions-guide",
    title: "A Practical Guide to Regular Expressions",
    description:
      "Learn regex from the ground up: character classes, quantifiers, groups, flags, real examples, and pitfalls to avoid in JavaScript.",
    readingTime: "8 min read",
    keywords: [
      "regular expressions",
      "regex tutorial",
      "javascript regex",
      "regex character classes",
      "regex quantifiers",
      "regex capture groups",
      "greedy vs lazy matching",
      "regex flags",
      "regex best practices",
    ],
    intro: [
      "Regular expressions are a compact language for describing patterns in text. Once you can read them, they turn fiddly string-handling problems into a few characters of declarative code. The catch is that the syntax is terse and easy to misread, which gives regex a reputation for being write-only. It does not have to be that way.",
      "This guide walks through the building blocks you actually use day to day, with a JavaScript focus but ideas that carry across most languages. We cover the core syntax, quantifiers, groups, flags, a handful of realistic patterns, and the traps worth avoiding, with patterns you can try as you read.",
    ],
    sections: [
      {
        heading: "What Regex Is and Where You Use It",
        body: [
          "A regular expression is a pattern that a regex engine compares against a string. If the pattern describes some part of the string you get a match, and often you also get back which characters matched. In JavaScript a pattern is written between slashes, as in /cat/, or built from a string with new RegExp('cat'). The engine then scans your text for that pattern.",
          "The everyday uses fall into a few buckets. **Validation** checks whether input has the right shape, such as confirming a field looks like an email address. **Search and replace** finds every occurrence of a pattern and optionally rewrites it, which powers find-in-files and string.replace. **Parsing and extraction** pulls structured pieces out of semi-structured text, like grabbing all the prices from a page. And **log analysis** filters lines that share a shape, which is why tools like grep are built around regex. If you find yourself writing nested loops over character indexes, a regex is often the clearer answer.",
        ],
      },
      {
        heading: "Core Building Blocks",
        body: [
          "The simplest pattern is a literal: /dog/ matches the letters d, o, g in sequence. Most of regex describes characters more loosely, and character classes are the workhorses. The shorthand \\d matches any digit, \\w a word character (letters, digits, and underscore), and \\s whitespace such as spaces, tabs, and newlines. Their uppercase versions \\D, \\W, and \\S mean the opposite.",
          "You can also define your own class with square brackets. The pattern [aeiou] matches any single vowel, and a range like [a-z] matches any lowercase letter. A leading caret negates the class, so [^0-9] matches any non-digit. The dot, written as ., matches any character except a line break by default.",
          "Anchors pin a pattern to a position rather than a character. The caret ^ asserts the start of the string and the dollar sign $ asserts the end, so /^abc$/ matches only the exact string 'abc'. The word boundary \\b matches the empty position between a word and a non-word character, letting /\\bcat\\b/ match 'cat' as a whole word but not inside 'category'.",
        ],
      },
      {
        heading: "Quantifiers and Greedy vs Lazy Matching",
        body: [
          "Quantifiers say how many times the preceding element may repeat. The star * means zero or more, the plus + means one or more, and the question mark ? means zero or one, making it optional. For precise counts, braces give control: {3} means exactly three, {2,5} between two and five, and {2,} two or more. So \\d{4} matches a four-digit year and \\w+ matches a run of word characters.",
          "By default quantifiers are greedy, meaning they grab as much text as possible and give back only what they must for the rest of the pattern to match. This bites people with delimited content. Against 'a<one>b<two>c', the pattern /<.*>/ matches '<one>b<two>' in one go, because .* consumes everything up to the last >. Appending a ? makes the quantifier lazy, so /<.*?>/ stops at the first > and matches just '<one>'. This single distinction resolves a large share of confusing regex results.",
        ],
      },
      {
        heading: "Groups, Alternation, and Backreferences",
        body: [
          "Parentheses group part of a pattern so a quantifier or alternation applies to the whole thing. They also capture: each pair of parentheses creates a numbered capture group whose matched text you can retrieve afterward. In /(\\d{4})-(\\d{2})-(\\d{2})/ on a date, group 1 holds the year, group 2 the month, and group 3 the day. JavaScript also supports named groups like (?<year>\\d{4}), which read better than counting positions.",
          "When you need grouping but not the captured text, use a non-capturing group written (?:...), which keeps group numbers clean. The pipe | is alternation, meaning logical or, so /(jpe?g|png|gif)/ matches any of those image extensions. Finally, a backreference like \\1 matches the same text a previous group captured, so /(\\w+)\\s+\\1/ finds a word repeated back to back, such as 'the the'.",
        ],
      },
      {
        heading: "Flags That Change the Match",
        body: [
          "Flags are letters appended after the closing slash that adjust how the whole pattern behaves. The g flag is global: without it most operations stop at the first match, and with it methods like replace and matchAll work across every occurrence. The i flag makes matching case-insensitive, so /hello/i matches 'Hello' and 'HELLO'.",
          "The m flag is multiline, changing ^ and $ to match at the start and end of each line rather than the whole string, which is handy for log files. The s flag, called dotAll, lets the dot also match newlines so a pattern can span lines. Flags combine freely, as in /^error/gim. DevFmt's Regex Tester exposes these as checkboxes so you can toggle them and watch the matches update.",
        ],
      },
      {
        heading: "Practical Examples and Common Pitfalls",
        body: [
          "A few concrete patterns show how the pieces fit together. A rough email-like check is /^[\\w.+-]+@[\\w-]+\\.[\\w.-]+$/: name characters, an at sign, a domain, a dot, and a top-level domain. To extract numbers, /\\d+/g with matchAll returns every run of digits, and the backreference pattern above with the i flag finds duplicated words case-insensitively.",
          "The most important pitfall is catastrophic backtracking, the cause of ReDoS denial-of-service bugs. Patterns with nested, overlapping quantifiers such as /(a+)+$/ can take exponential time on certain non-matching inputs as the engine tries every way to split the text. Avoid stacking quantifiers on groups that can match the same characters, and prefer specific classes over broad ones like .* where you can.",
          "Beyond performance, lean toward clarity and break complex patterns into smaller steps. Know when not to reach for regex at all: recursive or nested structures like HTML and JSON are not regular, so a real parser is the right tool. And always test against real sample data, including the awkward edge cases, rather than trusting a pattern that merely looks right. Because DevFmt's Regex Tester runs entirely in your browser's JavaScript engine and never sends your input anywhere, you can safely paste production logs or user data while you refine a pattern.",
        ],
      },
    ],
    related: ["/regex"],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
