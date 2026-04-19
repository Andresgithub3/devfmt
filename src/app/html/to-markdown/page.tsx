import type { Metadata } from "next";
import { HtmlToMarkdownClient } from "./client";

export const metadata: Metadata = {
  title: "HTML to Markdown Converter",
  description: "Convert HTML to Markdown online — fast, private, no signup.",
  keywords: ["html to markdown", "convert html to markdown", "html to md", "turndown"],
};

export default function HtmlToMarkdownPage() {
  return <HtmlToMarkdownClient />;
}
