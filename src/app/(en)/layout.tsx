import type { Metadata } from "next";
import { RootShell } from "../RootShell";
import { metadataFor } from "@/lib/site";

export const metadata: Metadata = metadataFor("en");

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
