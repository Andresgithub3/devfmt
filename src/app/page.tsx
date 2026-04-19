import { TOOLS, CATEGORIES } from "@/lib/tools";
import { HomeClient } from "./home-client";

export default function Home() {
  return <HomeClient tools={TOOLS} categories={CATEGORIES} />;
}
