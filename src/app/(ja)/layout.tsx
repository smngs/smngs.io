import type { Metadata } from "next";
import { RootShell } from "../RootShell";
import { metadataFor } from "@/lib/site";

export const metadata: Metadata = metadataFor("ja");

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="ja">{children}</RootShell>;
}
