import type { Metadata } from "next";
import { CsvToJsonClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/csv/to-json")!;

export const metadata: Metadata = {
  title: tool.name,
  description:
    "Convert CSV to JSON online. Auto-detect delimiters, infer types, toggle headers — fast, private, no signup.",
  keywords: tool.keywords,
};

export default function CsvToJsonPage() {
  return (
    <ToolPageWrapper tool={tool}>
      <CsvToJsonClient />
    </ToolPageWrapper>
  );
}
