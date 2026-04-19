import type { Metadata } from "next";
import { DiffClient } from "./client";

export const metadata: Metadata = {
  title: "Text Diff & Compare",
  description: "Compare two texts and see the differences highlighted — fast, private, no signup.",
  keywords: ["text diff", "text compare", "diff tool online", "compare text"],
};

export default function DiffPage() {
  return <DiffClient />;
}
