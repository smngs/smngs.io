import type { Metadata } from "next";
import { BlogList } from "@/components/BlogList";
import { metadataFor } from "@/lib/site";

export const metadata: Metadata = metadataFor("ja", "/blog");

export default function BlogPage() {
  return <BlogList lang="ja" />;
}
