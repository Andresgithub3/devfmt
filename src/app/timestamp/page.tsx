import type { Metadata } from "next";
import { TimestampClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/timestamp")!;

export const metadata: Metadata = {
  title: "Unix Timestamp Converter",
  description: "Convert Unix timestamps to dates and dates to timestamps — fast, private, no signup.",
  keywords: ["unix timestamp converter", "timestamp to date", "epoch converter", "unix time"],
};

export default function TimestampPage() {
  return (
    <ToolPageWrapper tool={tool}>
      <TimestampClient />
    </ToolPageWrapper>
  );
}
