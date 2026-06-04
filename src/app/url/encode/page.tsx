import type { Metadata } from "next";
import { UrlEncodeClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/url/encode")!;

export const metadata: Metadata = {
  title: "URL Encoder",
  description: "Encode text for safe use in URLs — fast, private, no signup.",
  keywords: ["url encode", "url encoder", "percent encode", "encodeURIComponent"],
};

export default function UrlEncodePage() {
  return (
    <ToolPageWrapper tool={tool}>
      <UrlEncodeClient />
    </ToolPageWrapper>
  );
}
