import type { Metadata } from "next";
import { JsonToCsvClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/json/to-csv")!;

export const metadata: Metadata = {
  title: tool.name,
  description:
    "Convert JSON arrays to CSV online. Handle nested objects, choose delimiters, download as .csv — fast, private, no signup.",
  keywords: tool.keywords,
};

export default function JsonToCsvPage() {
  return (
    <ToolPageWrapper tool={tool}>
      <JsonToCsvClient />
    </ToolPageWrapper>
  );
}
