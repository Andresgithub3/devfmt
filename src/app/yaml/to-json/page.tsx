import type { Metadata } from "next";
import { YamlToJsonClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/yaml/to-json")!;

export const metadata: Metadata = {
  title: tool.name,
  description:
    "Convert YAML to JSON online. Fast, private, no signup — all processing happens in your browser.",
  keywords: tool.keywords,
};

export default function YamlToJsonPage() {
  return (
    <ToolPageWrapper tool={tool}>
      <YamlToJsonClient />
    </ToolPageWrapper>
  );
}
