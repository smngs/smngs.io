import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { ArticleHero } from "@/components/UiClientExports";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;

  try {
    const { meta, content } = getPostBySlug(slug);

    return (
      <>
        <ArticleHero
          title={meta.title}
          date={meta.date}
          description={meta.description}
          tags={meta.tags}
        />
        <div className="prose">
          <MDXRemote
            source={content}
            options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }}
          />
        </div>
      </>
    );
  } catch {
    notFound();
  }
}
