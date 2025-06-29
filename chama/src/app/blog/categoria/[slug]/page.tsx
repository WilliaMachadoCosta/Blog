import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/services/postServices";
import { getCategoryBySlug } from "@/services/categoryServices";
import { SpinLoader } from "@/components/SpinLoad/SpinLoader";
import CategoryClient from "./CategoryClient";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: "Categoria não encontrada | Blog",
      description: "A categoria procurada não foi encontrada.",
    };
  }

  return {
    title: `${category.name} | Blog`,
    description: category.description || `Posts da categoria ${category.name}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  return (
    <div className="min-h-screen bg-[#f5f3ef] py-4 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <Suspense fallback={<SpinLoader />}>
          <CategoryContent slug={slug} />
        </Suspense>
      </div>
    </div>
  );
}

async function CategoryContent({ slug }: { slug: string }) {
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.id);

  return <CategoryClient category={category} posts={posts} />;
} 