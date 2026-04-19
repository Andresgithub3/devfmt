import type { Metadata } from "next";
import { CronClient } from "./client";

export const metadata: Metadata = {
  title: "Cron Expression Parser",
  description: "Parse cron expressions into human-readable descriptions — fast, private, no signup.",
  keywords: ["cron parser", "cron expression", "crontab guru", "cron schedule"],
};

export default function CronPage() {
  return <CronClient />;
}
