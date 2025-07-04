import { getPostBySlug, getAllPosts } from "@/services/postServices";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/buttons/shareButtons";
import { PostContent } from "@/components/container/post-content";
import Image from "next/image";
import type { Metadata } from "next";
import { extractCompanyData } from "@/components/container/companyData";

import Script from 'next/script';

import SubHeaderClient from "@/components/header/sub-header-client";
import GoogleAd from "@/components/banner/google-ads";

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

  const cleanTitle = post.title.replace(/<[^>]*>/g, "");
  const cleanExcerpt = post.excerpt?.replace(/<[^>]*>/g, "").slice(0, 160) || '';
  const canonicalUrl = `https://chamanozap.net/${post.slug}`;
  const imageUrl = post.featuredImage || 'https://chamanozap.net/logo.png';

  return {
    title: cleanTitle,
    description: cleanExcerpt,
    openGraph: {
      title: cleanTitle,
      description: cleanExcerpt,
      url: canonicalUrl,
      type: 'article',
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: cleanExcerpt,
      images: [imageUrl],
      site: '@SeuTwitter',
    },
    alternates: {
      canonical: canonicalUrl,
    },
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
  const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <main className="min-h-screen bg-[#f5f3ef] py-4 sm:py-6 px-2 sm:px-4 overflow-x-hidden">
      {/* Structured Data: BreadcrumbList */}
      <Script id="breadcrumb-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Blog",
              "item": "https://chamanozap.net/blog"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": cleanTitle,
              "item": `https://chamanozap.net/${post.slug}`
            }
          ]
        })}
      </Script>
      {/* Structured Data: BlogPosting */}
      <Script id="blogposting-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": cleanTitle,
          "description": post.excerpt?.replace(/<[^>]*>/g, "").slice(0, 160) || '',
          "image": post.featuredImage || 'https://chamanozap.net/logo.png',
          "datePublished": post.date,
          "dateModified": post.date,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "Wmc Webao Suporte Tecnico Manutencao e Desenvolvimento de Sistemas LTDA",
            "logo": {
              "@type": "ImageObject",
              "url": "https://chamanozap.net/logo.png"
            }
          },
          "mainEntityOfPage": `https://chamanozap.net/${post.slug}`,
          ...(company && company.nome && {
            about: {
              "@type": "Organization",
              name: company.nome
            },
            mentions: [
              {
                "@type": "Organization",
                name: company.nome
              }
            ]
          })
        })}
      </Script>
      <div className="mb-6 max-w-2xl mx-auto bg-gray-300"><GoogleAd /></div>
      <article className="bg-white max-w-2xl mx-auto rounded-xl shadow-md p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 overflow-hidden">

        <SubHeaderClient company={company} />
        <h1
          className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-black break-words"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />

        <p className="text-xs sm:text-sm text-neutral-900 dark:text-neutral-900">
          Publicado em{" "}
          <time dateTime={post.date}>
            {formattedDate}
          </time>{" "}
          por <span className="font-medium">{post.author}</span>
        </p>

        {/* Removido: Imagem destacada do post */}
        {/*
        {post.featuredImage && (
          <Image
            src={post.featuredImage ?? "/placeholder.jpg"}
            alt={cleanTitle}
            width={600}
            height={400}
            className="w-full h-auto rounded-md object-cover max-h-48 sm:max-h-64 md:max-h-96"
            loading="eager"
          />
        )}
        */}

        <PostContent html={sanitizeHtml(post.content)} />
        {/* <PostContent html={(post.content)} /> */}


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
    .replace(/data-src=/gi, "src=")
    // Remove <ins> com data-ad-client="ca-pub-5074393689985715" e data-ad-slot="9365926617"
    .replace(/<ins[^>]*data-ad-client="ca-pub-5074393689985715"[^>]*data-ad-slot="9365926617"[^>]*><\/ins>/gi, "")
    // Caso a ordem dos atributos varie, tente essa regex mais geral:
    .replace(/<ins(?=[^>]*data-ad-client="ca-pub-5074393689985715")(?=[^>]*data-ad-slot="9365926617")[^>]*><\/ins>/gi, "")
    .replace(/<ins(?=[^>]*data-ad-client="ca-pub-5074393689985715")(?=[^>]*data-ad-slot="8056328924")[^>]*><\/ins>/gi, "")
}



// Gera os slugs de todos os posts para SSG
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export const revalidate = 300; // revalida a cada 5 minutos (ISR)
