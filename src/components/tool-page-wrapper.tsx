import type { ReactNode } from "react";
import type { Tool } from "@/lib/tools";
import { ToolSchema } from "./tool-schema";
import { ToolSeoContent } from "./tool-seo-content";

export function ToolPageWrapper({
  tool,
  children,
}: {
  tool: Tool;
  children: ReactNode;
}) {
  return (
    <>
      <ToolSchema tool={tool} />
      {children}
      <ToolSeoContent tool={tool} />
    </>
  );
}
