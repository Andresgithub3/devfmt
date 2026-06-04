import type { Metadata } from "next";
import { DiffClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/diff")!;

export const metadata: Metadata = {
  title: "Text Diff & Compare",
  description: "Compare two texts and see the differences highlighted — fast, private, no signup.",
  keywords: ["text diff", "text compare", "diff tool online", "compare text"],
};

export default function DiffPage() {
  return (
    <ToolPageWrapper tool={tool}>
      <DiffClient />
    </ToolPageWrapper>
  );
}
