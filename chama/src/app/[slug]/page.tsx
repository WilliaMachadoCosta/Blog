import { getPostBySlug, getAllPosts } from "@/services/postServices";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/buttons/shareButtons";
import { PostContent } from "@/components/container/post-content";
import Image from "next/image";
import type { Metadata } from "next";
import { extractCompanyData } from "@/components/container/companyData";
import SubHeaderClient from "@/components/header/sub-header-client";
import GoogleAd from "@/components/banner/google-ads";
import PostDataInitializer from "@/components/container/postdata";

export const runtime = 'edge';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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
  const imageUrl = post.featuredImage || "https://chamanozap.net/logo.png";

  return {
    title: cleanTitle,
    description: cleanExcerpt,
    keywords: `${cleanTitle}, Chamanozap, Empresa, Atendimento`,
    openGraph: {
      title: cleanTitle,
      description: cleanExcerpt,
      url: canonicalUrl,
      type: "article",
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description: cleanExcerpt,
      images: [imageUrl],
      site: "@SeuTwitter",
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL("https://chamanozap.net"),
    authors: [{ name: post.author }],
    other: {
      "article:published_time": post.date,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const cleanTitle = post.title?.replace(/<[^>]*>/g, "") || "Post";
  const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const excerpt = post.excerpt?.replace(/<[^>]*>/g, "").slice(0, 160) || '';
  const image = post.featuredImage || "https://chamanozap.net/logo.png";
  const company = extractCompanyData(post.content);

  // Geração do schema FAQPage ===
  const faqMatches = [...post.content.matchAll(/<h[2-3]>(Perguntas|FAQ)<\/h[2-3]>([\s\S]*?)(?=<h[2-3]>|$)/gi)];

  const faqStructured = faqMatches.length
    ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [] as any[],
    }
    : null;

  if (faqStructured) {
    faqMatches.forEach(match => {
      const faqHtml = match[2];

      // Captura perguntas e respostas no formato <strong>pergunta</strong> resposta
      const qnaMatches = [...faqHtml.matchAll(/<strong>(.*?)<\/strong>\s*([\s\S]*?)(?=<strong>|$)/gi)];

      qnaMatches.forEach(qna => {
        const question = qna[1].trim();
        let answer = qna[2].trim();
        // Remove tags HTML básicas da resposta para ficar texto puro
        answer = answer.replace(/<\/?[^>]+(>|$)/g, "").trim();

        faqStructured.mainEntity.push({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        });
      });
    });
  }

  return (
    <main className="min-h-screen bg-[#f5f3ef] py-4 sm:py-6 px-2 sm:px-4 overflow-x-hidden">
      {/* BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Blog",
                item: "https://chamanozap.net/blog",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: cleanTitle,
                item: `https://chamanozap.net/${post.slug}`,
              },
            ],
          }),
        }}
      />

      {/* BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: cleanTitle,
            description: excerpt,
            image,
            datePublished: post.date,
            dateModified: post.date,
            author: { "@type": "Person", name: post.author },
            publisher: {
              "@type": "Organization",
              name: "Wmc Webao Suporte Tecnico Manutencao e Desenvolvimento de Sistemas LTDA",
              logo: {
                "@type": "ImageObject",
                url: "https://chamanozap.net/logo.png",
              },
            },
            mainEntityOfPage: `https://chamanozap.net/${post.slug}`,
            ...(company?.nome && {
              about: {
                "@type": "Organization",
                name: company.nome,
              },
              mentions: [
                {
                  "@type": "Organization",
                  name: company.nome,
                },
              ],
            }),
          }),
        }}
      />

      {/* FAQ Structured Data (se existir) */}
      {faqStructured && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructured) }}
        />
      )}

      {/* Conteúdo */}
      <div className="my-6 max-w-2xl mx-auto w-full h-[200px] rounded-lg relative">
        <div className="flex justify-center">
          <GoogleAd className="my-9" />
        </div>
      </div>

      <article className="bg-white max-w-2xl mx-auto rounded-xl shadow-md p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 overflow-hidden">
        <SubHeaderClient company={company} />
        <h1
          className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-black break-words"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />
        <p className="text-xs sm:text-sm text-neutral-900">
          Publicado em <time dateTime={post.date}>{formattedDate}</time> por{" "}
          <span className="font-medium">{post.author}</span>
        </p>

        <PostContent html={sanitizeHtml(post.content)} />
        <ShareButtons />
      </article>

      <PostDataInitializer
        titulo={cleanTitle}
        excerto={excerpt}
        imagemPost={image}
        autor={post.author}
        slug={post.slug}
        empresa={company?.nome}
        telefone={company?.telefone}
        whatsapp={company?.whatsapp}
        site={company?.site}
      />
    </main>
  );
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/class="[^"]*"/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/data-src=/gi, "src=")
    .replace(/<ins(?=[^>]*data-ad-client="ca-pub-[^"]*")[^>]*><\/ins>/gi, "");
}

// export async function generateStaticParams() {
//   const posts = await getAllPosts();
//   return posts.map((post) => ({ slug: post.slug }));
// }

// export const revalidate = 300; // ISR: revalida a cada 5 minutos
