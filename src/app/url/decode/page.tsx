import type { Metadata } from "next";
import { UrlDecodeClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/url/decode")!;

export const metadata: Metadata = {
  title: "URL Decoder",
  description: "Decode percent-encoded URL strings — fast, private, no signup.",
  keywords: ["url decode", "url decoder", "percent decode", "decodeURIComponent"],
};

export default function UrlDecodePage() {
  return (
    <ToolPageWrapper tool={tool}>
      <UrlDecodeClient />
    </ToolPageWrapper>
  );
}
