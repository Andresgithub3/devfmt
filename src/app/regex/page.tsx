import type { Metadata } from "next";
import { RegexClient } from "./client";

export const metadata: Metadata = {
  title: "Regex Tester",
  description: "Test regular expressions with real-time matching and group capture — fast, private, no signup.",
  keywords: ["regex tester", "regex test online", "regular expression tester", "regex match"],
};

export default function RegexPage() {
  return <RegexClient />;
}
