import type { Metadata } from "next";
import { HashClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/hash")!;

export const metadata: Metadata = {
  title: "Hash Generator (SHA-1, SHA-256, SHA-512)",
  description: "Generate SHA-1, SHA-256, and SHA-512 hashes online — fast, private, no signup.",
  keywords: ["hash generator", "sha256 hash", "sha1 hash", "sha512 hash", "hash online"],
};

export default function HashPage() {
  return (
    <ToolPageWrapper tool={tool}>
      <HashClient />
    </ToolPageWrapper>
  );
}
