import { getAllPosts } from "@/lib/blog";
import { ArticleListCard } from "@/components/UiClientExports";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <div className="section">
        <h2>Blog</h2>
      </div>
      <div className="blog-list">
        {posts.length === 0 ? (
          <p>記事はまだありません。</p>
        ) : (
          posts.map((post) => (
            <ArticleListCard
              key={post.slug}
              title={post.title}
              date={post.date}
              description={post.description}
              tags={post.tags}
              href={`/blog/${post.slug}`}
            />
          ))
        )}
      </div>
    </>
  );
}
