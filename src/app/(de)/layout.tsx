import type { Metadata } from "next";
import { RootShell } from "../RootShell";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("de");

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="de">{children}</RootShell>;
}
