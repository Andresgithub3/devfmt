import type { Metadata } from "next";
import { CsvViewerClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/csv/formatter")!;

export const metadata: Metadata = {
  title: tool.name,
  description:
    "View and format CSV files online. Sort columns, filter rows, search data — fast, private, no signup.",
  keywords: tool.keywords,
};

export default function CsvViewerPage() {
  return (
    <ToolPageWrapper tool={tool}>
      <CsvViewerClient />
    </ToolPageWrapper>
  );
}
