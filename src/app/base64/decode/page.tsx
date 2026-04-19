import type { Metadata } from "next";
import { Base64DecodeClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/base64/decode")!;

export const metadata: Metadata = {
  title: tool.name,
  description:
    "Decode Base64 to text online. Auto-detects URL-safe encoding — fast, private, no signup.",
  keywords: tool.keywords,
};

export default function Base64DecodePage() {
  return (
    <ToolPageWrapper tool={tool}>
      <Base64DecodeClient />
    </ToolPageWrapper>
  );
}
