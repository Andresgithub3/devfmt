import type { Metadata } from "next";
import { ColorClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/color")!;

export const metadata: Metadata = {
  title: "Color Converter (Hex / RGB / HSL)",
  description: "Convert colors between Hex, RGB, and HSL formats with live preview — fast, private, no signup.",
  keywords: ["color converter", "hex to rgb", "rgb to hsl", "color picker", "hex to hsl"],
};

export default function ColorPage() {
  return (
    <ToolPageWrapper tool={tool}>
      <ColorClient />
    </ToolPageWrapper>
  );
}
