import type { Metadata } from "next";
import { Base64EncodeClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/base64/encode")!;

export const metadata: Metadata = {
  title: tool.name,
  description:
    "Encode text to Base64 online. URL-safe mode, file upload — fast, private, no signup.",
  keywords: tool.keywords,
};

export default function Base64EncodePage() {
  return (
    <ToolPageWrapper tool={tool}>
      <Base64EncodeClient />
    </ToolPageWrapper>
  );
}
