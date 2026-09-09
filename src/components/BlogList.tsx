import { getAllPosts } from "@/lib/blog";
import { ArticleListCard } from "@/components/UiClientExports";
import { strings, type Lang } from "@/lib/i18n";

export function BlogList({ lang }: { lang: Lang }) {
  const posts = getAllPosts();
  const base = lang === "ja" ? "" : "/en";

  return (
    <>
      <div className="smngs-section">
        <h2>Blog</h2>
      </div>
      <div className="blog-list">
        {posts.length === 0 ? (
          <p>{strings[lang].noPosts}</p>
        ) : (
          posts.map((post) => (
            <ArticleListCard
              key={post.slug}
              title={post.title}
              date={post.date}
              description={post.description}
              tags={post.tags}
              href={`${base}/blog/${post.slug}`}
            />
          ))
        )}
      </div>
    </>
  );
}
