import type { Metadata } from "next";
import { UuidClient } from "./client";

export const metadata: Metadata = {
  title: "UUID Generator",
  description: "Generate v4 UUIDs online — single or bulk. Fast, private, no signup.",
  keywords: ["uuid generator", "uuid v4", "generate uuid online", "random uuid"],
};

export default function UuidPage() {
  return <UuidClient />;
}
