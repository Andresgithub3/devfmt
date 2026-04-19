import type { Metadata } from "next";
import { JsonToYamlClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/json/to-yaml")!;

export const metadata: Metadata = {
  title: tool.name,
  description:
    "Convert JSON to YAML online. Handle nested structures with proper formatting — fast, private, no signup.",
  keywords: tool.keywords,
};

export default function JsonToYamlPage() {
  return (
    <ToolPageWrapper tool={tool}>
      <JsonToYamlClient />
    </ToolPageWrapper>
  );
}
