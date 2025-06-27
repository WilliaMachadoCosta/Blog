import { getPostBySlug } from "@/services/postServices";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/buttons/shareButtons";
import { PostContent } from "@/components/container/post-content";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: "Post não encontrado | Blog",
      description: "O conteúdo procurado não foi encontrado.",
    };
  }

  return {
    title: post.title.replace(/<[^>]*>/g, ""),
    description: post.excerpt?.replace(/<[^>]*>/g, "").slice(0, 160),
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  const cleanTitle = post.title?.replace(/<[^>]*>/g, "") || "Post";

  return (
    <main className="min-h-screen bg-[#f5f3ef] py-6 px-4">
      <article className="bg-white max-w-2xl mx-auto rounded-xl shadow-md p-6 space-y-6">
        <h1
          className="text-3xl font-bold leading-tight text-black"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />

        <p className="text-sm text-neutral-900 dark:text-neutral-900">
          Publicado em{" "}
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </time>{" "}
          por <span className="font-medium">{post.author}</span>
        </p>

        {post.featuredImage && (
          <Image
            src={post.featuredImage ?? "/placeholder.jpg"}
            alt={cleanTitle}
            width={800}
            height={600}
            className="w-full h-auto rounded-md object-cover max-h-96"
            loading="lazy"
          />
        )}

        <PostContent html={sanitizeHtml(post.content)} />
        <ShareButtons />
      </article>
    </main>
  );
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/class="[^"]*"/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/data-src=/gi, "src=");
}
