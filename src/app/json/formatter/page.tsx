import type { Metadata } from "next";
import { JsonFormatterClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/json/formatter")!;

export const metadata: Metadata = {
  title: tool.name,
  description:
    "Format and beautify JSON online. Validate JSON syntax, pretty-print with configurable indentation — fast, private, no signup.",
  keywords: tool.keywords,
};

export default function JsonFormatterPage() {
  return (
    <ToolPageWrapper tool={tool}>
      <JsonFormatterClient />
    </ToolPageWrapper>
  );
}
