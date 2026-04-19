import type { Metadata } from "next";
import { JsonMinifierClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/json/minifier")!;

export const metadata: Metadata = {
  title: tool.name,
  description:
    "Minify and compress JSON online. Remove whitespace, reduce file size — fast, private, no signup.",
  keywords: tool.keywords,
};

export default function JsonMinifierPage() {
  return (
    <ToolPageWrapper tool={tool}>
      <JsonMinifierClient />
    </ToolPageWrapper>
  );
}
