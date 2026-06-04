import type { Metadata } from "next";
import { CronClient } from "./client";
import { ToolPageWrapper } from "@/components/tool-page-wrapper";
import { getToolByHref } from "@/lib/tools";

const tool = getToolByHref("/cron")!;

export const metadata: Metadata = {
  title: "Cron Expression Parser",
  description: "Parse cron expressions into human-readable descriptions — fast, private, no signup.",
  keywords: ["cron parser", "cron expression", "crontab guru", "cron schedule"],
};

export default function CronPage() {
  return (
    <ToolPageWrapper tool={tool}>
      <CronClient />
    </ToolPageWrapper>
  );
}
