import type { Metadata } from "next";
import { MarkdownToHtmlClient } from "./client";

export const metadata: Metadata = {
  title: "Markdown to HTML Converter",
  description: "Convert Markdown to HTML online — fast, private, no signup.",
  keywords: ["markdown to html", "convert markdown to html", "markdown converter", "md to html"],
};

export default function MarkdownToHtmlPage() {
  return <MarkdownToHtmlClient />;
}
