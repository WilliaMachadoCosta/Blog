import { getPostBySlug } from "@/services/postServices";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/buttons/shareButtons";
import { PostContent } from "@/components/container/post-content";
import Image from "next/image";
import type { Metadata } from "next";
import { extractCompanyData } from "@/components/container/companyData";
import GoogleAdSense from "@/components/banner/GoogleAdSense";
import { getAdConfig, shouldShowAds } from "@/config/ads";

import SubHeaderClient from "@/components/header/sub-header-client";

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
  const company = extractCompanyData(post.content);
  const cleanTitle = post.title?.replace(/<[^>]*>/g, "") || "Post";
  return (
    <main className="min-h-screen bg-[#f5f3ef] py-4 sm:py-6 px-2 sm:px-4 overflow-x-hidden">
      <article className="bg-white max-w-2xl mx-auto rounded-xl shadow-md p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 overflow-hidden">

        <SubHeaderClient company={company} />
        <h1
          className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-black break-words"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />

        <p className="text-xs sm:text-sm text-neutral-900 dark:text-neutral-900">
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
            className="w-full h-auto rounded-md object-cover max-h-48 sm:max-h-64 md:max-h-96"
            loading="lazy"
          />
        )}

        <PostContent html={sanitizeHtml(post.content)} />
        
        {/* Anúncio do Google AdSense */}
        {shouldShowAds() && (
            <div className="my-6">
                <GoogleAdSense 
                    {...getAdConfig('BETWEEN_POSTS')}
                    className="w-full"
                />
            </div>
        )}
        
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
