import type { Metadata } from "next";
import { HtmlDecodeClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/html/decode")!;

export const metadata: Metadata = {
  title: "HTML Entity Decoder",
  description: "Decode HTML entities back to text — fast, private, no signup.",
  keywords: ["html decode", "html entity decode", "html unescape", "decode html entities"],
};

export default function HtmlDecodePage() {
  return (
    <ToolPageWrapper tool={tool}>
      <HtmlDecodeClient />
    </ToolPageWrapper>
  );
}
