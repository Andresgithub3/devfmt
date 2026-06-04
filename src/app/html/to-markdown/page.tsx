import type { Metadata } from "next";
import { HtmlToMarkdownClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/html/to-markdown")!;

export const metadata: Metadata = {
  title: "HTML to Markdown Converter",
  description: "Convert HTML to Markdown online — fast, private, no signup.",
  keywords: ["html to markdown", "convert html to markdown", "html to md", "turndown"],
};

export default function HtmlToMarkdownPage() {
  return (
    <ToolPageWrapper tool={tool}>
      <HtmlToMarkdownClient />
    </ToolPageWrapper>
  );
}
