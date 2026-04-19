import type { Metadata } from "next";
import { SqlFormatterClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/sql/formatter")!;

export const metadata: Metadata = {
  title: tool.name,
  description:
    "Format and beautify SQL queries online. Supports PostgreSQL, MySQL, SQLite — fast, private, no signup.",
  keywords: tool.keywords,
};

export default function SqlFormatterPage() {
  return (
    <ToolPageWrapper tool={tool}>
      <SqlFormatterClient />
    </ToolPageWrapper>
  );
}
