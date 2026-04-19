import type { Metadata } from "next";
import { TimestampClient } from "./client";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter",
  description: "Convert Unix timestamps to dates and dates to timestamps — fast, private, no signup.",
  keywords: ["unix timestamp converter", "timestamp to date", "epoch converter", "unix time"],
};

export default function TimestampPage() {
  return <TimestampClient />;
}
